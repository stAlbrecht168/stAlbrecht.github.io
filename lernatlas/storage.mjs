const NAME='lernatlas-v1';
let connection;
export function openDB(){
  if(connection) return connection;
  connection=new Promise((resolve,reject)=>{
    const request=indexedDB.open(NAME,1);
    request.onupgradeneeded=()=>{const db=request.result;db.createObjectStore('state');db.createObjectStore('attachments',{keyPath:'id'});};
    request.onsuccess=()=>resolve(request.result);
    request.onerror=()=>reject(new Error('Der Browser konnte den lokalen Speicher nicht öffnen. Verwende einen normalen Tab und prüfe die Speichereinstellungen.'));
  });return connection;
}
async function read(store,key){const db=await openDB();return new Promise((resolve,reject)=>{const req=db.transaction(store).objectStore(store).get(key);req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);});}
export const loadState=()=>read('state','current');
// Save state and newly added originals atomically. Report errors instead of silently losing data.
export async function saveState(state,attachments=[]){const db=await openDB();return new Promise((resolve,reject)=>{const tx=db.transaction(['state','attachments'],'readwrite');tx.objectStore('state').put(state,'current');for(const attachment of attachments)tx.objectStore('attachments').put(attachment);tx.oncomplete=resolve;tx.onerror=()=>reject(new Error('Speichern fehlgeschlagen. Möglicherweise ist der Gerätespeicher voll. Erstelle eine Sicherung, bevor du den Tab schließt.'));tx.onabort=()=>reject(new Error('Speichern wurde abgebrochen. Bitte sichere deine Daten.'));});}
export async function allAttachments(){const db=await openDB();return new Promise((resolve,reject)=>{const req=db.transaction('attachments').objectStore('attachments').getAll();req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);});}
export async function attachmentsFor(unitId){return (await allAttachments()).filter(a=>a.unitId===unitId);}
export async function blobToData(blob){return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=()=>reject(new Error('Originaldatei konnte nicht gesichert werden.'));reader.readAsDataURL(blob);});}
export function dataToBlob(data){
  if(typeof data!=='string'||data.length>60000000)throw new Error('Ungültige Originaldatei in der Sicherung.');
  const match=data.match(/^data:(image\/(?:jpeg|png|webp|gif|bmp)|application\/pdf|text\/plain);base64,([A-Za-z0-9+/=\r\n]+)$/);
  if(!match)throw new Error('Dieser Dateityp kann nicht importiert werden.');
  const binary=atob(match[2]);return new Blob([Uint8Array.from(binary,c=>c.charCodeAt(0))],{type:match[1]});
}
