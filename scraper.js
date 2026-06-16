const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('lex.html', 'utf8');
const $ = cheerio.load(html);

let articles = {};
let currentArticle = null;
let textBuffer = [];

$('*').each((i, el) => {
    // Only process leaf nodes or nodes where all children are just formatting tags
    if ($(el).children().length === 0 || $(el).find('b, i, strong, span, a').length === $(el).children().length) {
        let text = $(el).text().trim();
        // Lex.uz uses ? instead of ' in some places
        text = text.replace(/\?/g, "'");

        const match = text.match(/^(\d+)-modda\.?$/);
        
        if (match) {
            if (currentArticle) {
                articles[currentArticle] = textBuffer.join('\n\n');
            }
            currentArticle = match[1];
            textBuffer = [];
        } else if (currentArticle) {
            // Check if text is substantial and not just some UI element
            if (text.length > 10 && !text.includes('LexUZ sharhi') && !text.includes('OKOZ:')) {
                // exclude navigation or weird repeating stuff
                if (!textBuffer.includes(text)) {
                    textBuffer.push(text);
                }
            }
        }
    }
});

if (currentArticle) {
    articles[currentArticle] = textBuffer.join('\n\n');
}

console.log("Found articles:", Object.keys(articles).length);
if(articles['1']) console.log("Article 1:", articles['1'].substring(0, 100) + '...');
if(articles['155']) console.log("Article 155:", articles['155'].substring(0, 100) + '...');

fs.writeFileSync('konstitutsiya.json', JSON.stringify(articles, null, 2));
console.log("Saved to konstitutsiya.json");
