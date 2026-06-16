const axios = require('axios');
const fs = require('fs');

async function downloadLex() {
    try {
        const response = await axios.get('https://lex.uz/docs/-6445145');
        fs.writeFileSync('lex.html', response.data);
        console.log('Downloaded lex.html');
    } catch (e) {
        console.error(e);
    }
}

downloadLex();
