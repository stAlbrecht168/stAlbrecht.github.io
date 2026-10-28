import {SUBJECT_IDS,uid,normalize,validateExercise} from './engine.mjs';
export const AI_LIMITS={maxFiles:6,maxFileBytes:8*1024*1024,maxTotalBytes:8*1024*1024,maxRequestBytes:12*1024*1024,maxText:30000};
const aiString={type:'string'};
const aiStringList={type:'array',items:aiString};
export const ANALYSIS_SCHEMA={
  type:'object',additionalProperties:false,
  properties:{status:{type:'string',enum:['ready','needs_clarification']},subject:{type:'string',enum:[...SUBJECT_IDS,'unknown']},bookId:aiString,title:aiString,source:aiString,transcription:aiString,summary:aiStringList,clarification:aiString,
    cards:{type:'array',items:{type:'object',additionalProperties:false,properties:{question:aiString,answer:aiString,quote:aiString},required:['question','answer','quote']}},
    exercises:{type:'array',items:{type:'object',additionalProperties:false,properties:{type:{type:'string',enum:['short','choice','self']},prompt:aiString,options:aiStringList,answer:aiString,aliases:aiStringList,explanation:aiString,hint:aiString,quote:aiString},required:['type','prompt','options','answer','aliases','explanation','hint','quote']}}
  },required:['status','subject','bookId','title','source','transcription','summary','clarification','cards','exercises']
};
function aiBound(value,label,max,optional=false){if(optional&&(value==null||value===''))return '';if(typeof value!=='string'||!value.trim()||value.length>max)throw new Error(`${label} ist unvollständig oder zu lang. Bitte die Auswertung erneut starten.`);return value.trim();}
export function validateAIAnalysis(raw,books=[]){
  if(raw?.status==='needs_clarification')return {status:'needs_clarification',clarification:aiBound(raw.clarification,'Rückfrage',1000)};
  if(raw?.status!=='ready'||!SUBJECT_IDS.includes(raw.subject))throw new Error('ChatGPT konnte das Fach noch nicht eindeutig zuordnen. Bitte die Seiten getrennt nach Fach hinzufügen.');
  const transcription=aiBound(raw.transcription,'Erkannter Unterrichtstext',AI_LIMITS.maxText);
  const bookId=typeof raw.bookId==='string'?raw.bookId:'';
  if(bookId){const book=books.find(b=>b.id===bookId);if(!book||book.subject!==raw.subject)throw new Error('Die Buchzuordnung ist noch nicht eindeutig. Bitte die Auswertung erneut starten.');}
  if(!Array.isArray(raw.cards)||raw.cards.length<1||raw.cards.length>12||!Array.isArray(raw.exercises)||raw.exercises.length<1||raw.exercises.length>16)throw new Error('ChatGPT hat noch kein vollständiges Lernpaket geliefert. Bitte erneut versuchen.');
  const content=normalize(transcription);
  const exercises=raw.exercises.map(validateExercise);
  const cards=raw.cards.map(c=>({id:uid(),question:aiBound(c.question,'Kartenfrage',2000),answer:aiBound(c.answer,'Kartenantwort',4000),quote:aiBound(c.quote,'Kartenbeleg',2000)}));
  if([...exercises,...cards].some(item=>!item.quote||!content.includes(normalize(item.quote))))throw new Error('Ein Quellenbeleg passt noch nicht zum erkannten Text. Bitte die Auswertung erneut starten.');
  if(!Array.isArray(raw.summary)||raw.summary.length>8)throw new Error('Die Zusammenfassung konnte nicht gelesen werden.');
  return {status:'ready',subject:raw.subject,bookId,title:aiBound(raw.title,'Thema',150),source:aiBound(raw.source,'Quelle',1000,true),transcription,summary:raw.summary.map(v=>aiBound(v,'Merksatz',800)),clarification:'',cards,exercises};
}
export function createAIUnit(analysis,{id=uid(),files=[],existing=null,metadata={}}={}){
  if(analysis.status!=='ready')throw new Error('Das Material muss zuerst ausgewertet werden.');
  return {id,subject:analysis.subject,bookId:analysis.bookId,title:analysis.title,source:analysis.source||files.map(f=>f.name).join(', ').slice(0,1000)||'Unterrichtsmaterial · mit ChatGPT ausgewertet',text:analysis.transcription,cards:analysis.cards,exercises:analysis.exercises,summary:analysis.summary,origin:'ai',reviewed:false,demo:false,createdAt:existing?.createdAt||new Date().toISOString(),ai:{provider:'OpenAI',model:typeof metadata.model==='string'?metadata.model:'',generatedAt:new Date().toISOString()}};
}
