/* Custom WiFi NFC Stand — client-side model and QR generation */
'use strict';
const $ = id => document.getElementById(id);
const captions = {de:['GÄSTE-WLAN','NETZWERK','PASSWORT'],en:['GUEST WI-FI','NETWORK','PASSWORD'],fr:['WI-FI INVITÉS','RÉSEAU','MOT DE PASSE'],es:['WI-FI INVITADOS','RED','CONTRASEÑA']};
const encoder = new TextEncoder();
let lastMatrix = null;
function bytes(s){return encoder.encode(s)}
function escWifi(s){return [...s].map(c => ('\\;,:"'.includes(c)?'\\':'')+c).join('')}
function configuration(){return {ssid:$('ssid').value,password:$('password').value,security:$('security').value,language:$('language').value,hidden:$('hidden').checked}}
function validate(c){
 if(!c.ssid || bytes(c.ssid).length>32)throw Error('WLAN-Name muss 1–32 UTF-8-Bytes enthalten.');
 if(c.security!=='nopass' && (bytes(c.password).length<8||bytes(c.password).length>63))throw Error('WLAN-Passwort muss 8–63 UTF-8-Bytes enthalten.');
 if(!captions[c.language])throw Error('Ungültige Sprache.');
 if(!['WPA','nopass'].includes(c.security))throw Error('Ungültiger WLAN-Typ.');
 if(bytes(c.ssid).some(n=>n===0))throw Error('SSID darf keine Nullbytes enthalten.');
}
function wifiText(c){return 'WIFI:T:'+(c.security==='nopass'?'nopass':'WPA')+';S:'+escWifi(c.ssid)+';'+(c.security==='nopass'?'':'P:'+escWifi(c.password)+';')+(c.hidden?'H:true;':'')+';'}
function qrMatrix(c){
 const payload=wifiText(c);
 // QR8bitByte in bundled library handles bytes; binary string correctly encodes UTF-8 accents.
 const raw=Array.from(bytes(payload),b=>String.fromCharCode(b)).join('');
 const qr=new OfflineQRCode(0,OfflineQRECL.Q);qr.addData(raw);qr.make();
 const size=qr.getModuleCount(), border=4, count=size+border*2;
 if(60/count<0.85)throw Error('Der QR-Code wäre für die 0,4-mm-Düse zu fein. Bitte kürzere WLAN-Daten wählen.');
 const matrix=Array.from({length:count},(_,y)=>Array.from({length:count},(_,x)=>y>=border&&x>=border&&y<border+size&&x<border+size&&qr.isDark(y-border,x-border)));
 return matrix;
}
function renderQR(c){const m=qrMatrix(c),n=m.length;lastMatrix=m;let parts=[];for(let y=0;y<n;y++){let x=0;while(x<n){if(!m[y][x]){x++;continue}let from=x;while(x<n&&m[y][x])x++;parts.push(`<rect x="${from}" y="${y}" width="${x-from}" height="1"/>`)}}$('qrPreview').innerHTML=`<svg viewBox="0 0 ${n} ${n}" role="img" aria-label="WLAN-QR-Code" xmlns="http://www.w3.org/2000/svg"><rect width="${n}" height="${n}" fill="white"/><g fill="#0c1626">${parts.join('')}</g></svg>`;return m}
function update(){const c=configuration(),a=captions[c.language];$('prevTitle').textContent=a[0];$('prevNetwork').textContent=a[1];$('prevPassword').textContent=a[2];$('prevSsid').textContent=c.ssid||'—';$('prevPass').textContent=c.security==='nopass'?'—':c.password||'—';$('password').disabled=c.security==='nopass';$('error').hidden=true;try{renderQR(c)}catch(e){$('qrPreview').textContent='QR-Vorschau nicht verfügbar';$('error').textContent=e.message;$('error').hidden=false}}
$('togglePW').addEventListener('click',()=>{$('password').type=$('password').type==='password'?'text':'password';$('togglePW').textContent=$('password').type==='password'?'Anzeigen':'Verbergen'});
['ssid','password','security','language','hidden'].forEach(id=>$(id).addEventListener('input',update));
function qrcodePNG(c){const m=qrMatrix(c),n=m.length,box=12;const canvas=document.createElement('canvas');canvas.width=canvas.height=n*box;const ctx=canvas.getContext('2d',{willReadFrequently:false});ctx.fillStyle='#ffffff';ctx.fillRect(0,0,n*box,n*box);ctx.fillStyle='#000000';for(let y=0;y<n;y++)for(let x=0;x<n;x++)if(m[y][x])ctx.fillRect(x*box,y*box,box,box);return new Promise(resolve=>canvas.toBlob(resolve,'image/png'))}
function downloadBlob(blob,name){const link=document.createElement('a');link.href=URL.createObjectURL(blob);link.download=name;document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(link.href),25000)}
$('saveQR').addEventListener('click',async()=>{try{let c=configuration();validate(c);downloadBlob(await qrcodePNG(c),'WLAN_QR_Code.png');$('status').textContent='QR-Code heruntergeladen.'}catch(e){showError(e)}});
$('copyNFC').addEventListener('click',async()=>{try{let c=configuration();validate(c);await navigator.clipboard.writeText(ntagCommands(c));$('status').textContent='NTAG215-Schreibbefehle kopiert. In NFC Tools bei Fortgeschrittene NFC-Kommandos einfügen.'}catch(e){$('status').textContent='Kopieren nicht erlaubt: Die Befehle stehen auch als Textdatei im Druckpaket.'}});
function showError(e){$('error').textContent=e.message||String(e);$('error').hidden=false;$('status').textContent=''}
// binary STL -> unique vertices and triangles. Vertex welding only on predefined closed meshes.
function readSTL64(b64){let s=atob(b64),buffer=new ArrayBuffer(s.length),u=new Uint8Array(buffer);for(let i=0;i<s.length;i++)u[i]=s.charCodeAt(i);let dv=new DataView(buffer),count=dv.getUint32(80,true),mesh={v:[],f:[]},lookup=new Map();for(let k=0;k<count;k++){let off=84+k*50,tri=[];for(let p=0;p<3;p++){let x=dv.getFloat32(off+12+p*12,true),y=dv.getFloat32(off+16+p*12,true),z=dv.getFloat32(off+20+p*12,true),key=[x,y,z].map(a=>a.toFixed(4)).join(',');let j=lookup.get(key);if(j===undefined){j=mesh.v.length;lookup.set(key,j);mesh.v.push([x,y,z])}tri.push(j)}mesh.f.push(tri)}return mesh}
const baseMeshes={};
function bases(){if(!baseMeshes.panel)for(const name of ['panel','stand','blue'])baseMeshes[name]=readSTL64(window.STAND_MODEL_STL[name]);return baseMeshes}
function emptyMesh(){return {v:[],f:[]}}
// Generate *closed* solid letter/QR meshes from raster masks.
// Top and bottom tessellation share exactly the same grid as the perimeter walls.
// Unlike separate raster-row prisms, there are no air gaps between text strokes.
function rasterSolid(mask, w, h, xLeft, yBottom, step, z0=3.99, z1=4.60){
 const mesh=emptyMesh(), sz=w*h;
 const components=new Int32Array(sz);components.fill(-1);
 const queue=new Int32Array(sz);
 let next=0;
 // Pixel islands must have their own vertices, even if they touch diagonally.
 // Otherwise touching corners can create non-manifold vertices in exported meshes.
 for(let i=0;i<sz;i++){
  if(!mask[i]||components[i]>=0)continue;
  let head=0,tail=1;queue[0]=i;components[i]=next;
  while(head<tail){const v=queue[head++],x=v%w,y=(v/w)|0;
   const nb=[x? v-1:-1,x+1<w?v+1:-1,y?v-w:-1,y+1<h?v+w:-1];
   for(const j of nb)if(j>=0 && mask[j] && components[j]<0){components[j]=next;queue[tail++]=j}
  }
  // Dismiss isolated antialiasing dots too small to survive typical FDM slicing.
  if(tail<4)for(let k=0;k<tail;k++)mask[queue[k]]=0;
  next++;
 }
 // A diagonal touch in a pixel grid is not a real edge connection.  Keep
 // separate corners for the diagonal cells, even if they connect elsewhere.
 const pinch=new Uint8Array((w+1)*(h+1));
 for(let gy=1;gy<h;gy++)for(let gx=1;gx<w;gx++){
  const top=h-gy-1,bot=h-gy;
  const nw=mask[top*w+gx-1],ne=mask[top*w+gx];
  const sw=mask[bot*w+gx-1],se=mask[bot*w+gx];
  if((nw&&se&&!ne&&!sw)||(ne&&sw&&!nw&&!se))pinch[gy*(w+1)+gx]=1;
 }
 const vmap=new Map();
 function vertex(cid,gx,gy,z,owner){
  const isolated=pinch[gy*(w+1)+gx];
  const key=cid+':'+gx+':'+gy+':'+z+(isolated?':'+owner:'');
  let idx=vmap.get(key);
  if(idx===undefined){idx=mesh.v.length;vmap.set(key,idx);mesh.v.push([xLeft+gx*step,yBottom+gy*step,z])}
  return idx;
 }
 function tri(a,b,c){mesh.f.push([a,b,c])}
 for(let py=0;py<h;py++)for(let px=0;px<w;px++){
  const i=py*w+px;if(!mask[i])continue;
  const cid=components[i],gx=px,gy=h-py-1;
  const a=vertex(cid,gx,gy,0,i),b=vertex(cid,gx+1,gy,0,i),c=vertex(cid,gx+1,gy+1,0,i),d=vertex(cid,gx,gy+1,0,i);
  const A=vertex(cid,gx,gy,1,i),B=vertex(cid,gx+1,gy,1,i),C=vertex(cid,gx+1,gy+1,1,i),D=vertex(cid,gx,gy+1,1,i);
  tri(A,B,C);tri(A,C,D);tri(a,c,b);tri(a,d,c);
  if(py===h-1 || !mask[i+w]){tri(a,b,B);tri(a,B,A)} // south
  if(px===w-1 || !mask[i+1]){tri(b,c,C);tri(b,C,B)} // east
  if(py===0 || !mask[i-w]){tri(c,d,D);tri(c,D,C)} // north
  if(px===0 || !mask[i-1]){tri(d,a,A);tri(d,A,D)} // west
 }
 // Align the top of each solid with the native 3MF base, while retaining
 // z-axis coordinates exactly at the same plane for neighboring pixels.
 for(const p of mesh.v)p[2]=p[2] ? z1:z0;
 return mesh;
}
function qrMesh(matrix){
 const n=matrix.length,mask=new Uint8Array(n*n);
 for(let y=0;y<n;y++)for(let x=0;x<n;x++)mask[y*n+x]=matrix[y][x]?1:0;
 const step=60/n;
 return rasterSolid(mask,n,n,-30,127-30,step);
}
function lettersMesh(c){
 let all=emptyMesh(),T=captions[c.language];
 const rows=[[T[0],169,9.4],[T[1],89,4.5],[c.ssid,80,8],[T[2],70,4.5],[c.security==='nopass'?'—':c.password,61,8]];
 const scale=5,w=520,h=90; // 0.2 mm raster, no deliberate inter-row gaps
 for(const [value,centerY,initialSize] of rows){
  const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;
  const ctx=canvas.getContext('2d',{willReadFrequently:true});let size=initialSize;
  ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='#000';
  ctx.font=`800 ${size*scale}px Arial, sans-serif`;
  while(ctx.measureText(value).width>495&&size>1){size*=.94;ctx.font=`800 ${size*scale}px Arial, sans-serif`}
  ctx.fillText(value,w/2,h/2);
  const image=ctx.getImageData(0,0,w,h).data,mask=new Uint8Array(w*h);
  for(let i=0;i<mask.length;i++)mask[i]=image[i*4+3]>=135?1:0;
  const m=rasterSolid(mask,w,h,-w/(2*scale),centerY-h/(2*scale),1/scale);
  all=joinMeshes(all,m);
 }
 return all;
}
function joinMeshes(a,b){let off=a.v.length;return {v:a.v.concat(b.v),f:a.f.concat(b.f.map(tri=>tri.map(i=>i+off)))}}
const xmlEscape=s=>String(s).replace(/[&<>"']/g,t=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[t]));
function mk3mf(meshes){let str=['<?xml version="1.0" encoding="UTF-8"?>','<model unit="millimeter" xml:lang="de-DE" xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02">','<resources><basematerials id="1"><base name="Weiss" displaycolor="#F8F9FC"/><base name="Schwarz" displaycolor="#141B2A"/><base name="Blau" displaycolor="#2567CA"/></basematerials>'];
 for(let [id,name,color] of [[2,'panel',0],[3,'black',1],[4,'blue',2],[5,'stand',0]]){let m=meshes[name];str.push(`<object id="${id}" type="model" name="${name}" pid="1" pindex="${color}"><mesh><vertices>`);for(let p of m.v)str.push(`<vertex x="${p[0].toFixed(4)}" y="${p[1].toFixed(4)}" z="${p[2].toFixed(4)}"/>`);str.push('</vertices><triangles>');for(let f of m.f)str.push(`<triangle v1="${f[0]}" v2="${f[1]}" v3="${f[2]}"/>`);str.push('</triangles></mesh></object>')}
 str.push('<object id="6" type="model" name="WLAN Tafel mehrfarbig"><components><component objectid="2"/><component objectid="3"/><component objectid="4"/></components></object></resources>');str.push('<build><item objectid="6" transform="1 0 0 0 1 0 0 0 1 60 18 0"/><item objectid="5" transform="1 0 0 0 1 0 0 0 1 184 21 0"/></build></model>');
 let zip=new JSZip();zip.file('[Content_Types].xml','<?xml version="1.0"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="model" ContentType="application/vnd.ms-package.3dmanufacturing-3dmodel+xml"/></Types>');zip.file('_rels/.rels','<?xml version="1.0"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Target="/3D/3dmodel.model" Id="rel0" Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel"/></Relationships>');zip.file('3D/3dmodel.model',str.join(''));return zip.generateAsync({type:'uint8array',compression:'DEFLATE',compressionOptions:{level:6}})
}
// STL separate files for other slicers, ASCII output; 3MF preferred for 3 colors.
function meshStl(mesh,name){let arr=[`solid ${name}`];for(const f of mesh.f){let a=mesh.v[f[0]],b=mesh.v[f[1]],c=mesh.v[f[2]];arr.push('facet normal 0 0 0','outer loop',...([a,b,c].map(p=>`vertex ${p[0].toFixed(4)} ${p[1].toFixed(4)} ${p[2].toFixed(4)}`)),'endloop','endfacet')}arr.push(`endsolid ${name}`);return arr.join('\n')}
function tlv(type,payload){let out=new Uint8Array(4+payload.length),v=new DataView(out.buffer);v.setUint16(0,type);v.setUint16(2,payload.length);out.set(payload,4);return out}
function concat(...arrs){let out=new Uint8Array(arrs.reduce((s,a)=>s+a.length,0)),p=0;for(let a of arrs){out.set(a,p);p+=a.length}return out}
function u16(n){return Uint8Array.from([n>>8,n&255])}
function ndefWSC(c){let isOpen=c.security==='nopass';let cred=concat(tlv(0x1026,Uint8Array.from([1])),tlv(0x1045,bytes(c.ssid)),tlv(0x1003,u16(isOpen?1:0x20)),tlv(0x100f,u16(isOpen?1:8)),tlv(0x1027,isOpen?new Uint8Array():bytes(c.password)),tlv(0x1020,Uint8Array.from([255,255,255,255,255,255])));const payload=tlv(0x100e,cred),typ=bytes('application/vnd.wfa.wsc');if(payload.length<256)return concat(Uint8Array.from([0xD2,typ.length,payload.length]),typ,payload);return concat(Uint8Array.from([0xC2,typ.length,0,0,payload.length>>8,payload.length&255]),typ,payload)}
// Type-2 NFC NDEF TLV in pages 04 onwards. NTAG215: 504 user bytes.
function ntagCommands(c){const ndef=ndefWSC(c);const len=ndef.length;let packet= len<=254?concat(Uint8Array.from([0x03,len]),ndef,Uint8Array.from([0xFE])):concat(Uint8Array.from([0x03,0xFF,(len>>8)&255,len&255]),ndef,Uint8Array.from([0xFE]));if(packet.length>504)throw Error('NFC-Daten passen nicht auf NTAG215.');let cmds=[];for(let i=0;i<packet.length;i+=4){const v=Array.from(packet.slice(i,i+4));while(v.length<4)v.push(0);cmds.push('A2:'+(4+i/4).toString(16).padStart(2,'0').toUpperCase()+':'+v.map(n=>n.toString(16).padStart(2,'0').toUpperCase()).join(''))}return cmds.join(', ')}
const howto = c => `CUSTOM WIFI NFC STAND — DRUCKANLEITUNG

MODELL
- Tafel flach mit der beschrifteten Seite nach oben ausrichten.
- Standfuß separat drucken.
- Druckfarben: Weiß (Tafel/Fuß), Schwarz (QR/Schrift), Blau (NFC-Markierung).
- Für Mehrfarbendruck einen einheitlichen Materialtyp verwenden.
- Ausgangsprofil: 0,20 mm Schichthöhe, 3 Wände, 5 Deckschichten, 15 % Gyroid.
- Materialtemperatur und Lüftung nach Filamenthersteller einstellen.
- Stützen bei flacher Ausrichtung deaktivieren; Slicer-Vorschau prüfen.

NFC (OPTIONAL)
- Für NFC-Sticker mit 25 mm Durchmesser; Einlegetasche Ø 26 mm.
- Pause nach Abschluss von Z = 3,2 mm setzen (bei 0,20 mm gewöhnlich nach Schicht 16).
- Den Pausenzeitpunkt anhand der Schichtvorschau verifizieren.
- Sticker flach einsetzen, ohne dass er über den Rand der Tasche hinausragt.
- Die darauffolgende Brücke misst 26 mm; materialabhängige Bridging-Einstellungen prüfen.
- Wärme kann NFC-Sticker beschädigen. Heiße Druckerbauteile nicht berühren.

WLAN UND NFC
- QR-Code: WLAN-Verbindungsdaten für kompatible Smartphone-Kameras.
- NFC_WLAN_WSC.ndef: NDEF-Nachricht im WLAN-WSC-Format.
- NFC_NTAG215_Schreibbefehle.txt: Schreibbefehle für kompatible NFC-Tools.
- Ein WLAN-NFC-Tag verbindet iPhones nicht automatisch mit dem WLAN.

DATENSCHUTZ
Dieses Paket enthält WLAN-Zugangsdaten in Druckmodell und QR-Code.
Persönliche Druckdateien nicht öffentlich teilen.
`;

$('download').addEventListener('click',async()=>{const btn=$('download');btn.disabled=true;$('status').textContent='Erzeuge QR, 3D-Geometrie und Druckdateien lokal …';$('error').hidden=true;try{
 const c=configuration();validate(c);const mat=qrMatrix(c),base=bases();const meshes={panel:base.panel,stand:base.stand,blue:base.blue,black:joinMeshes(qrMesh(mat),lettersMesh(c))};
 const three=await mk3mf(meshes);const qrpng=await qrcodePNG(c);const zip=new JSZip();zip.file('WLAN_Aufsteller_Persoenlich.3mf',three);zip.file('WLAN_QR.png',qrpng);zip.file('WLAN_QR_Inhalt.txt',wifiText(c));zip.file('NFC_WLAN_WSC.ndef',ndefWSC(c));zip.file('NFC_NTAG215_Schreibbefehle.txt',ntagCommands(c));zip.file('Druckanleitung.txt',howto(c));
 const fld=zip.folder('STL_Einzelteile');for(const [name,mesh] of Object.entries(meshes))fld.file(name+'.stl',meshStl(mesh,name));
 const archive=await zip.generateAsync({type:'blob',compression:'DEFLATE',compressionOptions:{level:5}});downloadBlob(archive,'Custom_WiFi_NFC_Stand_Persoenlich.zip');$('status').textContent='Druckpaket erstellt. Vor dem Drucken im Slicer prüfen.';
 }catch(e){showError(e)}finally{btn.disabled=false}});
update();
