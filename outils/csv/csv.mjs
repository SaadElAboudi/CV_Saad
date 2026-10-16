export function detectDelimiter(text){let quoted=false;const counts={',':0,';':0,'\t':0};for(let i=0;i<text.length;i++){const c=text[i];if(c==='"'){if(quoted&&text[i+1]==='"')i++;else quoted=!quoted;}else if(!quoted){if(c==='\n'||c==='\r')break;if(c in counts)counts[c]++;}}return Object.keys(counts).sort((a,b)=>counts[b]-counts[a])[0];}
export function parseCSV(input,delimiter=','){
 if(typeof input!=='string'||input.length>5*1024*1024)throw Error('Fichier limité à 5 Mo.');if(![',',';','\t'].includes(delimiter))throw Error('Séparateur non pris en charge.');
 const text=input.replace(/^\uFEFF/,''),rows=[];let row=[],field='',quoted=false,closed=false;
 const cell=()=>{row.push(field);field='';closed=false;};const record=()=>{cell();rows.push(row);row=[];if(rows.length>50001)throw Error('Maximum : 50 000 lignes de données.');};
 for(let i=0;i<text.length;i++){const c=text[i];if(quoted){if(c==='"'){if(text[i+1]==='"'){field+='"';i++;}else{quoted=false;closed=true;}}else field+=c;continue;}
  if(c===delimiter){cell();continue;}if(c==='\n'||c==='\r'){record();if(c==='\r'&&text[i+1]==='\n')i++;continue;}
  if(closed)throw Error('Caractère inattendu après un champ entre guillemets.');if(c==='"'){if(field)throw Error('Guillemet inattendu dans un champ.');quoted=true;}else field+=c;
 }
 if(quoted)throw Error('Un champ entre guillemets n’est pas fermé.');if(field||row.length||closed)record();return rows;
}
const encode=(row,delimiter)=>row.map(value=>value.includes(delimiter)||/["\r\n]/.test(value)?'"'+value.replace(/"/g,'""')+'"':value).join(delimiter);
export function cleanCSV(text,{delimiter='auto',trim=true,deduplicate=true}={}){
 const sep=delimiter==='auto'?detectDelimiter(text):delimiter,parsed=parseCSV(text,sep);if(!parsed.length)throw Error('Le fichier est vide.');
 const header=parsed[0].map(v=>trim?v.trim():v);if(header.some(v=>!v)||new Set(header).size!==header.length)throw Error('Les noms de colonnes doivent être renseignés et distincts.');
 const rows=[],seen=new Set();let emptyRows=0,duplicates=0,trimmedCells=0;
 for(let i=1;i<parsed.length;i++){
  const raw=parsed[i],row=raw.map(v=>{const next=trim?v.trim():v;if(next!==v)trimmedCells++;return next;});
  if(row.every(v=>v==='')){emptyRows++;continue;}if(row.length!==header.length)throw Error(`Enregistrement ${i+1} : ${row.length} colonnes au lieu de ${header.length}. Vérifiez le séparateur ou le fichier.`);
  const key=JSON.stringify(row);if(deduplicate&&seen.has(key)){duplicates++;continue;}seen.add(key);rows.push(row);
 }
 return {header,rows,delimiter:sep,inputRows:parsed.length-1,emptyRows,duplicates,trimmedCells,csv:[header,...rows].map(r=>encode(r,sep)).join('\r\n')+'\r\n'};
}
