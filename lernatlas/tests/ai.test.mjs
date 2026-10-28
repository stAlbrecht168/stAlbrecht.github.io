import test from 'node:test';
import assert from 'node:assert/strict';
import {validateAIAnalysis,createAIUnit,ANALYSIS_SCHEMA} from '../ai-contract.mjs';
import {handleAIRequest,validateAIRequest,buildAIRequest} from '../server/ai-api.mjs';
import {DEFAULT_BOOKS} from '../books.mjs';
import {DEMO_UNITS} from '../content.mjs';
const source=DEMO_UNITS[0];
const analysis=()=>({status:'ready',subject:'musik',bookId:'book-musik',title:'Notenwerte und Takt',source:'Musikmappe',transcription:source.text,summary:['Eine ganze Note dauert vier Viertelschläge.'],clarification:'',cards:structuredClone(source.cards),exercises:structuredClone(source.exercises)});
const documents=[{name:'Musikseite',mimeType:'text/plain',text:source.text}];
const env={OPENAI_API_KEY:'test-key-not-real'};
const request=(path='/api/analyze',body={documents},headers={})=>new Request('https://lernatlas.example'+path,{method:path.endsWith('status')?'GET':'POST',headers:{'oai-authenticated-user-id':'test-user','content-type':'application/json',origin:'https://lernatlas.example',...headers},...(path.endsWith('status')?{}:{body:JSON.stringify(body)})});
const fakeOutput=raw=>Response.json({status:'completed',output:[{type:'message',content:[{type:'output_text',text:JSON.stringify(raw)}]}]});
test('ChatGPT-Paket erkennt Fach und Buch ohne Pflichtmetadaten und behält Quellenbelege',()=>{
  const checked=validateAIAnalysis(analysis(),DEFAULT_BOOKS);const unit=createAIUnit(checked,{metadata:{model:'test-model'}});
  assert.equal(unit.subject,'musik');assert.equal(unit.bookId,'book-musik');assert.equal(unit.origin,'ai');assert.equal(unit.reviewed,false);assert.equal(unit.ai.model,'test-model');assert.ok(unit.exercises.length);
  assert.throws(()=>validateAIAnalysis({...analysis(),bookId:'book-mathe'},DEFAULT_BOOKS));
  assert.throws(()=>validateAIAnalysis({...analysis(),cards:[{question:'Was?',answer:'Text',quote:'Nicht im Material'}]},DEFAULT_BOOKS));
  assert.deepEqual(validateAIAnalysis({status:'needs_clarification',clarification:'Bitte fotografiere die Seite vollständig.'},DEFAULT_BOOKS),{status:'needs_clarification',clarification:'Bitte fotografiere die Seite vollständig.'});
});
test('Dokumentvalidierung blockiert falsche Dateidaten, leeren Inhalt und zu viele Dateien',()=>{
  assert.equal(validateAIRequest({documents,hint:{subject:'musik'}}).hint.subject,'musik');
  assert.throws(()=>validateAIRequest({documents:[]}));
  assert.throws(()=>validateAIRequest({documents:Array(8).fill(documents[0])}));
  assert.throws(()=>validateAIRequest({documents:[{name:'Test',mimeType:'application/pdf',dataUrl:'https://example.com/test.pdf'}]}));
  assert.throws(()=>validateAIRequest({documents:[{name:'Test',mimeType:'image/jpeg',dataUrl:'data:image/jpeg;base64,broken'}]}));
  assert.throws(()=>validateAIRequest({documents:[{name:'Test',mimeType:'text/html',text:'<script>text</script>'}]}));
});
test('API-Aufruf verwendet Servermodell, JSON-Schema, Bilder/PDF und store false',()=>{
  const input=validateAIRequest({documents:[documents[0],{name:'Seite.jpg',mimeType:'image/jpeg',dataUrl:'data:image/jpeg;base64,/9j/'},{name:'Buch.pdf',mimeType:'application/pdf',dataUrl:'data:application/pdf;base64,JVBERg=='}]});
  const body=buildAIRequest(input,'test-model');assert.equal(body.model,'test-model');assert.equal(body.store,false);assert.equal(body.text.format.schema,ANALYSIS_SCHEMA);assert.equal(body.text.format.strict,true);
  const content=body.input[1].content;assert.ok(content.some(x=>x.type==='input_image'));assert.ok(content.some(x=>x.type==='input_file'));assert.ok(!JSON.stringify(body).includes(env.OPENAI_API_KEY));
});
test('Unangemeldete und fremde Origins rufen OpenAI niemals auf',async()=>{
  let calls=0;const deps={fetch:()=>{calls++;throw new Error('Nicht aufrufen');}};
  const anonymous=new Request('https://lernatlas.example/api/analyze',{method:'POST',body:'{}',headers:{'content-type':'application/json'}});
  assert.equal((await handleAIRequest(anonymous,env,deps)).status,401);
  assert.equal((await handleAIRequest(request('/api/analyze',{documents},{origin:'https://other.example'}),env,deps)).status,403);assert.equal(calls,0);
});
test('Fehlende Einrichtung liefert ehrlichen Status und keinen lokalen Aufgabenersatz',async()=>{
  let calls=0;const deps={fetch:()=>{calls++;}};
  const status=await handleAIRequest(request('/api/status'),{},deps);assert.deepEqual(await status.json(),{connected:false,reason:'setup_required'});
  const result=await handleAIRequest(request(),{},deps);assert.equal(result.status,503);assert.ok((await result.json()).error.includes('einmalig'));assert.equal(calls,0);
});
test('Erfolgreiche Serverauswertung gibt geprüftes Paket zurück, niemals den API-Schlüssel',async()=>{
  let called=false;
  const result=await handleAIRequest(request(),env,{fetch:async(url,options)=>{called=true;assert.equal(url,'https://api.openai.com/v1/responses');assert.equal(options.headers.authorization,`Bearer ${env.OPENAI_API_KEY}`);const body=JSON.parse(options.body);assert.equal(body.store,false);return fakeOutput(analysis());}});
  assert.equal(result.status,200);const value=await result.json();assert.equal(value.analysis.subject,'musik');assert.equal(value.analysis.exercises.length,4);assert.ok(called);assert.ok(!JSON.stringify(value).includes(env.OPENAI_API_KEY));assert.equal(result.headers.get('cache-control'),'no-store');
});
test('Unvollständige, verweigerte oder unbelegte Antworten werden nicht als Lernpaket gespeichert',async()=>{
  for(const output of [Response.json({status:'incomplete',output:[]}),Response.json({status:'completed',output:[{type:'message',content:[{type:'refusal',refusal:'Keine Antwort'}]}]}),fakeOutput({...analysis(),exercises:[{...analysis().exercises[0],quote:'Nicht im Material'}]})]){
    const result=await handleAIRequest(request(),env,{fetch:async()=>output});assert.ok(result.status>=400);assert.ok((await result.json()).error);
  }
});
test('API-Fehler enthalten keine rohen Anbieterantworten oder Zugangsdaten',async()=>{
  const result=await handleAIRequest(request(),env,{fetch:async()=>new Response('sensitive provider diagnostics test-key-not-real',{status:429})});assert.equal(result.status,429);const body=await result.text();assert.ok(body.includes('Kontingent'));assert.ok(!body.includes(env.OPENAI_API_KEY));assert.ok(!body.includes('sensitive provider'));
});
