const fs = require('fs');
let data = fs.readFileSync('konstitutsiya.json', 'utf8');
let articles = JSON.parse(data);

for (let key in articles) {
    let text = articles[key];
    // remove lines that look like classification codes (e.g. 1.01.00.00.00)
    text = text.replace(/^[0-9]\.[0-9]{2}\.[0-9]{2}\.[0-9]{2}.*$/gm, '');
    text = text.replace(/^[0-9]{2}\.[0-9]{2}\.[0-9]{2}\.[0-9]{2}.*$/gm, '');
    // remove specific repeating phrases
    text = text.replace(/Ҳужжатга таклиф юборишАудиони тинглашҲужжат элементидан ҳавола олиш/g, '');
    text = text.replace(/Qarang:.*?$/gm, '');
    
    // clean up multiple newlines
    text = text.replace(/\n\s*\n/g, '\n\n').trim();
    
    articles[key] = text;
}

fs.writeFileSync('konstitutsiya.json', JSON.stringify(articles, null, 2));
console.log("Cleaned up konstitutsiya.json");
