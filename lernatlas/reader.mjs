let pdfModule,ocrLoading;
const PDF_BASE='https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/';
const TESS_BASE='https://cdn.jsdelivr.net/npm/tesseract.js@6.0.1/dist/';
async function loadOCR(){
  if(window.Tesseract)return window.Tesseract;
  if(!ocrLoading)ocrLoading=new Promise((resolve,reject)=>{const script=document.createElement('script');script.src=TESS_BASE+'tesseract.min.js';script.onload=()=>resolve(window.Tesseract);script.onerror=()=>{ocrLoading=null;reject(new Error('Die Texterkennung konnte nicht geladen werden. Prüfe die Internetverbindung oder füge Text direkt ein.'));};document.head.append(script);});
  return ocrLoading;
}
async function loadPDF(){
  if(!pdfModule){pdfModule=await import(PDF_BASE+'pdf.mjs');pdfModule.GlobalWorkerOptions.workerSrc=PDF_BASE+'pdf.worker.mjs';}
  return pdfModule;
}
export async function readFiles(files,onProgress=()=>{}){
  if(files.length>12)throw new Error('Bitte höchstens 12 Dateien auf einmal einlesen.');
  let worker;
  const ocr=async image=>{
    if(!worker){const t=await loadOCR();worker=await t.createWorker('deu',1,{workerPath:TESS_BASE+'worker.min.js',corePath:'https://cdn.jsdelivr.net/npm/tesseract.js-core@6.0.0',langPath:'https://tessdata.projectnaptha.com/4.0.0',logger:m=>onProgress(`Texterkennung: ${Math.round((m.progress??0)*100)} % · ${m.status==='recognizing text'?'Text wird gelesen':'wird vorbereitet'}`)});}
    const result=await worker.recognize(image);return result.data.text;
  };
  const parts=[];
  try{
    for(const file of files){
      if(file.size>25*1024*1024)throw new Error(`${file.name} ist größer als 25 MB. Bitte verkleinern.`);
      onProgress(`${file.name} wird gelesen …`);
      if(file.type==='text/plain'||/\.(?:txt|md)$/i.test(file.name)){parts.push(`[Datei: ${file.name}]\n${await file.text()}`);continue;}
      if(file.type==='application/pdf'||/\.pdf$/i.test(file.name)){
        const pdf=await loadPDF();const doc=await pdf.getDocument({data:new Uint8Array(await file.arrayBuffer()),isEvalSupported:false}).promise;
        try{
          if(doc.numPages>20)throw new Error('Bitte PDF-Dateien mit höchstens 20 Seiten verwenden. Teile größere Dokumente vorher auf.');
          for(let pageNo=1;pageNo<=doc.numPages;pageNo++){
            onProgress(`${file.name} · Seite ${pageNo} von ${doc.numPages}`);
            const page=await doc.getPage(pageNo);const content=await page.getTextContent();
            let value=content.items.map(item=>item.str+(item.hasEOL?'\n':' ')).join('').trim();
            if(value.replace(/\s/g,'').length<35){
              const base=page.getViewport({scale:1});const scale=Math.min(2,2200/Math.max(base.width,base.height));
              const viewport=page.getViewport({scale});const canvas=document.createElement('canvas');canvas.width=Math.ceil(viewport.width);canvas.height=Math.ceil(viewport.height);
              await page.render({canvasContext:canvas.getContext('2d'),viewport}).promise;
              value=await ocr(canvas);canvas.width=canvas.height=0;
            }
            parts.push(`[Datei: ${file.name} · Seite ${pageNo}]\n${value}`);
            page.cleanup();
          }
        }finally{await doc.destroy();}
        continue;
      }
      if(/^image\/(?:jpeg|png|webp|gif|bmp)$/.test(file.type)){
        const bitmap=await createImageBitmap(file);const scale=Math.min(1,2400/Math.max(bitmap.width,bitmap.height));
        const canvas=document.createElement('canvas');canvas.width=Math.round(bitmap.width*scale);canvas.height=Math.round(bitmap.height*scale);canvas.getContext('2d').drawImage(bitmap,0,0,canvas.width,canvas.height);bitmap.close();
        const result=await ocr(canvas);canvas.width=canvas.height=0;parts.push(`[Datei: ${file.name}]\n${result}`);continue;
      }
      throw new Error(`${file.name}: Unterstützt werden JPG, PNG, WebP, GIF, BMP, PDF und TXT. HEIC bitte als JPG exportieren.`);
    }
  }finally{if(worker)await worker.terminate();}
  return parts.join('\n\n');
}
