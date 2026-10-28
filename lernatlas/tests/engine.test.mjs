import test from 'node:test';
import assert from 'node:assert/strict';
import {deriveKnowledge,sourceSentences,isCorrect,makeMath,recordAttempt,daysUntil,validDate,todayISO,queueExercises,importLesson,validateBackup,makeAIPrompt,parseJSON} from '../engine.mjs';
import {SUBJECTS,DEFAULT_EXAMS,DEMO_UNITS} from '../content.mjs';
import {DEFAULT_BOOKS} from '../books.mjs';
test('Termine behalten Jahr, Reihenfolge und Kalenderdatum',()=>{
  assert.deepEqual(DEFAULT_EXAMS.map(e=>[e.subject,e.date]),[['musik','2026-11-02'],['kunst','2026-11-05'],['geschichte','2026-11-10'],['physik','2026-11-13'],['erdkunde','2026-11-24'],['werte','2026-11-25'],['mathe','2026-12-11']]);
  assert.equal(daysUntil('2026-11-02','2026-10-28'),5);assert.ok(!validDate('2026-02-30'));assert.ok(validDate('2028-02-29'));
  assert.equal(todayISO(new Date('2026-10-27T23:30:00Z')),'2026-10-28');
});
test('Alle Beispielaufgaben sind durch eigenes Material belegt',()=>{
  assert.equal(SUBJECTS.length,10);
  for(const u of DEMO_UNITS){for(const c of [...u.cards,...u.exercises])assert.ok(u.text.includes(c.quote));for(const e of u.exercises){if(e.type==='choice'){assert.ok(e.options.includes(e.answer));assert.equal(new Set(e.options).size,e.options.length);}assert.ok(e.explanation);}}
});
test('Textableitung behält Originalsatz, Lücke und eindeutige Lösung zusammen',()=>{
  const input='[Datei: Test.pdf · Seite 2]\nEin alter Brief ist eine schriftliche Quelle.\nEine Lichtquelle sendet selbst Licht aus.';
  const derived=deriveKnowledge(input,'test');assert.equal(derived.cards.length,2);assert.equal(derived.exercises.length,3);
  for(const e of derived.exercises.filter(e=>e.type==='short'))assert.ok(e.quote.includes(e.answer));
  assert.ok(derived.exercises.every(e=>input.includes(e.quote)));assert.equal(sourceSentences('Kurzer Titel').length,0);
});
test('Antwortkontrolle akzeptiert Varianten, aber keine Teiltreffer oder leeren Antworten',()=>{
  assert.equal(isCorrect({type:'short',answer:'Grün'},' grün. '),true);
  assert.equal(isCorrect({type:'short',answer:'Grün'},'gruen'),true);
  assert.equal(isCorrect({type:'short',answer:'100',aliases:['100 cm']},'100 cm'),true);
  assert.equal(isCorrect({type:'short',answer:'1,5'},'1.50'),true);
  assert.equal(isCorrect({type:'short',answer:'14'},'4'),false);
  assert.equal(isCorrect({type:'short',answer:'0'},''),false);
  assert.equal(isCorrect({type:'self',answer:'Beispiel'},'andere Erklärung'),null);
});
test('Mathegenerator erzeugt wiederholbar richtige Rechenaufgaben',()=>{
  for(let seed=1;seed<=25;seed++){
    for(const topic of ['addition','subtraktion','multiplikation','division','klammern','groessen'])for(const e of makeMath(topic,8,seed)){
      const numbers=e.prompt.match(/\d+/g).map(Number);let expected;
      if(topic==='addition')expected=numbers[0]+numbers[1];
      if(topic==='subtraktion')expected=numbers[0]-numbers[1];
      if(topic==='multiplikation')expected=numbers[0]*numbers[1];
      if(topic==='division')expected=numbers[0]/numbers[1];
      if(topic==='klammern')expected=numbers[0]+numbers[1]*numbers[2];
      if(topic==='groessen')expected=numbers[0]*100+numbers[1];
      assert.equal(Number(e.answer),expected);assert.equal(isCorrect(e,e.answer),true);
    }
  }
  assert.deepEqual(makeMath('mix',8,123),makeMath('mix',8,123));
});
test('Wiederholungen wachsen bei Erfolg und werden nach Fehlern zurückgesetzt',()=>{
  let p=recordAttempt(null,true,'2026-10-28');assert.equal(p.due,'2026-10-29');
  p=recordAttempt(p,true,'2026-10-29');assert.equal(p.due,'2026-11-01');
  p=recordAttempt(p,false,'2026-11-01');assert.equal(p.due,'2026-11-01');assert.equal(p.level,0);assert.equal(p.attempts,3);assert.equal(p.correct,2);
});
test('Ungeprüfte und archivierte Vorschläge erscheinen nie im Training',()=>{
  const base={id:'a',subject:'musik',source:'Test',title:'Test',exercises:[{id:'x',type:'short',answer:'2',prompt:'Wie viele?'}]};
  assert.equal(queueExercises([{...base,reviewed:false}],{}).length,0);
  assert.equal(queueExercises([{...base,reviewed:true,archived:true}],{}).length,0);
  assert.equal(queueExercises([{...base,reviewed:true}],{}).length,1);
  assert.equal(queueExercises([{...base,reviewed:true,demo:true}],{},{includeDemo:false}).length,0);
});
test('KI-Import bindet an vorhandene Quellen, sperrt Training und prüft Antwortoptionen',()=>{
  const source={...DEMO_UNITS[0],reviewed:true};
  const lesson={format:'lernatlas-lesson-v1',title:'Test',sourceIds:[source.id],exercises:[source.exercises[0]],cards:[]};
  const parsed=importLesson(lesson,[source]);assert.equal(parsed.reviewed,false);assert.equal(parsed.evidenceMissing,0);
  assert.throws(()=>importLesson({...lesson,sourceIds:['missing']},[source]));
  assert.throws(()=>importLesson({...lesson,exercises:[{...source.exercises[0],answer:'fehlt'}]},[source]));
  assert.equal(importLesson({...lesson,exercises:[{...source.exercises[0],quote:'erfunden'}]},[source]).evidenceMissing,1);
  assert.ok(makeAIPrompt([source]).includes(source.id));
  assert.deepEqual(parseJSON('```json\n{"a":1}\n```'),{a:1});
});
test('Sicherung validiert Daten und erhält Aufgaben-IDs und Fortschritt',()=>{
  const source={...DEMO_UNITS[0],reviewed:true};const progress=recordAttempt(null,true,'2026-10-28');
  const raw={format:'lernatlas-backup-v1',units:[source],exams:DEFAULT_EXAMS,progress:{[`${source.id}::${source.exercises[0].id}`]:progress},settings:{name:'Test',minutes:15}};
  const result=validateBackup(raw);assert.equal(result.units[0].exercises[0].id,source.exercises[0].id);assert.equal(Object.values(result.progress)[0].due,'2026-10-29');
  assert.throws(()=>validateBackup({...raw,units:[source,source]}));
  assert.throws(()=>validateBackup({...raw,exams:[{id:'a',subject:'musik',date:'2026-02-30'}]}));
  assert.throws(()=>validateBackup({...raw,progress:{a:{...progress,correct:999}}}));
});
test('Richtige Bücherliste wird ohne Schulkodes übernommen und mit Sicherungen erhalten',()=>{
  assert.equal(DEFAULT_BOOKS.length,9);assert.equal(new Set(DEFAULT_BOOKS.map(b=>b.id)).size,9);
  assert.equal(DEFAULT_BOOKS.filter(b=>b.match==='candidate').length,3);
  for(const b of DEFAULT_BOOKS){assert.ok(SUBJECTS.some(s=>s.id===b.subject));assert.ok(b.url.startsWith('https://'));assert.ok(b.isbn);}
  const raw={format:'lernatlas-backup-v1',units:[],exams:DEFAULT_EXAMS,progress:{},settings:{name:'Test',minutes:15},books:DEFAULT_BOOKS};
  const result=validateBackup(raw);assert.equal(result.books.length,9);assert.equal(result.books[0].isbn,DEFAULT_BOOKS[0].isbn);
  assert.throws(()=>validateBackup({...raw,books:[DEFAULT_BOOKS[0],DEFAULT_BOOKS[0]]}));
});
