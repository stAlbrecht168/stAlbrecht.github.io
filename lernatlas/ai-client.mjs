import {AI_APP_URL} from './ai-config.mjs';
import {AI_LIMITS,validateAIAnalysis} from './ai-contract.mjs';
export class AISetupError extends Error {constructor(message='Die direkte ChatGPT-Anbindung ist noch nicht eingerichtet.'){super(message);this.name='AISetupError';}}
let statusPromise;
export function getAIAppURL(){return AI_APP_URL&&/^https:\/\//.test(AI_APP_URL)?AI_APP_URL:'';}
export function needsAIAppNavigation(){const target=getAIAppURL();return !!target&&new URL(target).origin!==location.origin;}
export async function getAIStatus(refresh=false){
  if(refresh)statusPromise=null;
  if(!statusPromise)statusPromise=(async()=>{
    if(needsAIAppNavigation())return {connected:false,reason:'open_private_app',url:getAIAppURL()};
    try{const response=await fetch(new URL('./api/status',location.href),{credentials:'same-origin',headers:{accept:'application/json'},signal:AbortSignal.timeout(6000)});if(!response.ok||!response.headers.get('content-type')?.includes('application/json'))return {connected:false,reason:'setup_required'};const result=await response.json();return {connected:result.connected===true,reason:result.connected?'ready':result.reason||'setup_required'};}catch{return {connected:false,reason:'unavailable'};}
  })();return statusPromise;
}
function aiDataURL(blob){return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=()=>reject(new Error('Diese Datei konnte nicht gelesen werden. Bitte erneut auswählen.'));reader.readAsDataURL(blob);});}
async function aiImage(file){
  const bitmap=await createImageBitmap(file);const scale=Math.min(1,2200/Math.max(bitmap.width,bitmap.height));
  const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(bitmap.width*scale));canvas.height=Math.max(1,Math.round(bitmap.height*scale));
  const context=canvas.getContext('2d');context.fillStyle='#fff';context.fillRect(0,0,canvas.width,canvas.height);context.drawImage(bitmap,0,0,canvas.width,canvas.height);bitmap.close();
  const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/jpeg',.88));canvas.width=canvas.height=0;if(!blob)throw new Error('Das Foto konnte nicht vorbereitet werden. Bitte als JPG speichern und erneut auswählen.');return blob;
}
export async function prepareAIDocuments(files,text='',onProgress=()=>{}){
  if(files.length>AI_LIMITS.maxFiles)throw new Error(`Bitte höchstens ${AI_LIMITS.maxFiles} Seiten oder Dateien auf einmal hinzufügen.`);
  if(text.length>AI_LIMITS.maxText)throw new Error('Bitte den Text auf mehrere Lernpakete aufteilen.');
  const documents=[];let bytes=0;
  for(const file of files){
    onProgress(`${file.name} wird vorbereitet …`);
    if(file.size>25*1024*1024)throw new Error(`${file.name} ist zu groß. Bitte eine Datei unter 25 MB auswählen.`);
    if(file.type==='text/plain'||/\.(?:txt|md)$/i.test(file.name)){const value=await file.text();if(value.length>AI_LIMITS.maxText)throw new Error('Bitte diese Textdatei aufteilen.');bytes+=new TextEncoder().encode(value).length;documents.push({name:file.name.slice(0,200),mimeType:'text/plain',text:value});}
    else{
      let blob,mimeType;
      if(/^image\/(?:jpeg|png|webp|gif|bmp)$/.test(file.type)){blob=await aiImage(file);mimeType='image/jpeg';}
      else if(file.type==='application/pdf'||/\.pdf$/i.test(file.name)){blob=file;mimeType='application/pdf';}
      else throw new Error(`${file.name}: Bitte ein Foto als JPG/PNG/WebP, eine PDF oder Text auswählen. HEIC vorher als JPG exportieren.`);
      if(blob.size>AI_LIMITS.maxFileBytes)throw new Error('Bitte die PDF in kleinere Teile unter 8 MB aufteilen.');
      bytes+=blob.size;documents.push({name:file.name.slice(0,200),mimeType,dataUrl:await aiDataURL(new Blob([blob],{type:mimeType}))});
    }
    if(bytes>AI_LIMITS.maxTotalBytes)throw new Error('Bitte weniger Seiten auf einmal hinzufügen. Das Lernpaket darf höchstens 8 MB umfassen.');
  }
  if(text.trim()){bytes+=new TextEncoder().encode(text).length;documents.push({name:'Eingefügter Unterrichtstext',mimeType:'text/plain',text:text.trim()});}
  if(!documents.length)throw new Error('Bitte zuerst Fotos/PDFs auswählen oder Unterrichtstext einfügen.');
  if(bytes>AI_LIMITS.maxTotalBytes)throw new Error('Bitte weniger Seiten auf einmal hinzufügen.');
  return documents;
}
export async function analyzeWithChatGPT({files=[],text='',hint={},books=[],signal,onProgress=()=>{}}={}){
  const status=await getAIStatus();if(!status.connected)throw new AISetupError();
  const documents=await prepareAIDocuments(files,text,onProgress);
  onProgress('ChatGPT liest die Seiten und erstellt dein Lernpaket …');
  const response=await fetch(new URL('./api/analyze',location.href),{method:'POST',credentials:'same-origin',headers:{'content-type':'application/json',accept:'application/json'},body:JSON.stringify({documents,hint}),signal});
  let result;try{result=await response.json();}catch{throw new Error('Die Auswertung konnte nicht gelesen werden. Deine ausgewählten Dateien bleiben erhalten.');}
  if(!response.ok){if(response.status===503||response.status===401)throw new AISetupError(result.error);throw new Error(result.error||'ChatGPT konnte die Seiten gerade nicht auswerten. Bitte erneut versuchen.');}
  return {analysis:validateAIAnalysis(result.analysis,books),metadata:result.metadata??{}};
}
