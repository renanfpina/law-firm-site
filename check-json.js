const fs = require("fs");
const txt = fs.readFileSync("c:/Users/pinaren/projects/law-firm-site/assets/i18n/pt-br.json","utf8");
const lines = txt.split("\n");
for(let i=0; i<lines.length-1; i++){
  const cur = lines[i].trimEnd();
  const next = lines[i+1].trimEnd();
  const curEnds = cur.endsWith("}") || cur.endsWith('"');
  const nextStarts = next.trimStart().startsWith('"');
  if(curEnds && nextStarts){
    const noComma = !cur.endsWith("},") && !cur.endsWith('",') && !cur.endsWith("{");
    if(noComma) {
      console.log("Possible missing comma at line " + (i+1) + ": " + cur);
      console.log("  next: " + next);
    }
  }
}
