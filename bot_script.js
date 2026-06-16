/**
 * HUQUSHUNOS AI - TELEGRAM BOT
 * @Huquq_shunosbot
 * npm kutubxonasiz, faqat Node.js built-in HTTPS orqali ishlaydi.
 */

'use strict';

const https = require('https');
const fs = require('fs');
const express = require('express');

const BOT_TOKEN = '8991020146:AAEbivf8_yeYB59X8kpiGhj1U58LJGURG28';
const API_BASE = `https://api.telegram.org/bot${BOT_TOKEN}`;

let lastUpdateId = 0;
const userStates = {};
let konstitutsiyaData = null;

try {
    konstitutsiyaData = JSON.parse(fs.readFileSync('konstitutsiya.json', 'utf8'));
} catch (e) {
    console.error("Konstitutsiya bazasi topilmadi!");
}

// ==========================================
// O'ZBEKISTON HUQUQIY MA'LUMOTLAR BAZASI
// ==========================================
const legalDB = [
    {
        keywords: ["bo'shash", "boshash", "ishdan ket", "ariza", "14 kun", "ikki hafta", "ogohlantirish", "bo'shash muddati", "ishdan chiqish"],
        title: "📋 Mehnat Kodeksi — 160-modda",
        answer: `Mehnat kodeksining 160-moddasiga ko'ra:

✅ Xodim o'z xohishi bilan ishdan bo'shash uchun ish beruvchini kamida <b>2 hafta (14 kun)</b> oldin yozma ariza bilan ogohlantirishi shart.

📌 Muhim qoidalar:
• Ogohlantirish muddati ariza topshirilgan kunning <b>ertasidan</b> hisoblanadi
• O'zaro kelishuvga ko'ra muddat <b>qisqartirilishi</b> mumkin
• Sinov muddatida ogohlantirish muddati faqat <b>3 kun</b>

⚠️ Ish beruvchi bu muddatni orttirib yuborolmaydi!`
    },
    {
        keywords: ["ta'til", "tatil", "otpusk", "dam olish", "yillik ta'til", "necha kun dam", "mehnat ta'tili"],
        title: "📋 Mehnat Kodeksi — 216-modda",
        answer: `Mehnat kodeksining 216-moddasiga ko'ra:

✅ Har yili xodimga ish joyi va o'rtacha ish haqi <b>saqlanib</b> asosiy ta'til beriladi.

📌 Ta'til muddatlari:
• Umumiy xodimlar: kamida <b>21 kalendar kun</b>
• Davlat organlari xodimlari: <b>27 kalendar kun</b>
• 18 yoshgacha bo'lgan xodimlar: <b>28 kalendar kun</b>

⚠️ Ta'tilni pul bilan almashtirish FAQAT ishdan bo'shashda amalga oshiriladi!`
    },
    {
        keywords: ["ish haqi", "oylik", "maosh", "kechiksa", "kompensatsiya", "muddati o'tgan", "pul to'lamasa"],
        title: "📋 Mehnat Kodeksi — 233-modda",
        answer: `Mehnat kodeksining 233-moddasiga ko'ra:

✅ Ish haqi kechiktirilganda ish beruvchi <b>moddiy javobgar</b>.

📌 Kompensatsiya qoidalari:
• Har bir kechiktirilgan kun uchun Markaziy bank asosiy stavkasining <b>10%</b>i miqdorida foiz
• Kompensatsiya ish haqi bilan birga to'lanadi
• Xodim sudga ham murojaat qilishi mumkin

⚠️ Ish beruvchiga Ma'muriy javobgarlik ham qo'llanilishi mumkin!`
    },
    {
        keywords: ["aliment", "bola puli", "ajrashish", "nafaqa", "bola ta'minoti", "foiz", "necha foiz"],
        title: "📋 Oila Kodeksi — 99-modda",
        answer: `Oila kodeksining 99-moddasiga ko'ra voyaga yetmagan bolalar uchun aliment:

📌 Aliment miqdorlari:
• <b>1 bola</b> uchun → daromadning <b>1/4 (25%)</b>
• <b>2 bola</b> uchun → daromadning <b>1/3 (33%)</b>
• <b>3 va undan ortiq</b> → daromadning <b>1/2 (50%)</b>

✅ Har bir bolaga minimal aliment: BHMning <b>26.5%</b>idan kam bo'lmaydi (~90 000 so'm)

📌 To'lov usullari:
• Ixtiyoriy kelishuv (notarial tasdiqlangan)
• Sud qarori orqali majburiy undirish`
    },
    {
        keywords: ["nikoh", "turmush", "er-xotin", "nikoh shartnomasi", "mulk bo'lish", "ajrashsam", "agar ajrashsak"],
        title: "📋 Oila Kodeksi — 47-modda",
        answer: `Oila kodeksining 47-moddasiga ko'ra:

✅ Nikoh shartnomasi qachon tuzilishi mumkin:
• Nikohga qadar (FUQS ro'yxatidan oldin)
• Nikoh davomida (istalgan vaqtda)

📌 Majburiy shartlar:
• <b>Yozma shaklda</b> tuzilishi shart
• <b>Notarial tasdiqlash</b> majburiy
• Ikki tomonning ixtiyoriy roziligi kerak

📌 Shartnomada nimalarni belgilash mumkin:
• Amaldagi mulklar ustidan huquqlar
• Kelajakda sotib olinadigan mulklar
• Har birining moliyaviy majburiyatlari`
    },
    {
        keywords: ["qarz", "tilxat", "pul ber", "qarz ol", "tilxat yoz", "qarzim bor", "qarzga"], 
        title: "📋 Fuqarolik Kodeksi — 732–733-moddalar",
        answer: `Fuqarolik kodeksining 733-moddasiga ko'ra:

✅ Qarz shartnomasi qachon yozma bo'lishi shart:
• Summa BHMning <b>10 baravaridan</b> (hozirda ~3 400 000 so'm) oshsa — MAJBURIY yozma

📌 Tilxat haqida:
• Tilxat shartnoma o'rniga o'tadi
• Sudda <b>to'liq yuridik kuchga</b> ega
• Imzolangan tilxat bo'lsa — qarz qaytarish talab qilinishi mumkin

📌 Tilxatda bo'lishi kerak:
• Qarz oluvchi va beruvchining to'liq ismi
• Qarz miqdori (raqamda VA so'zda)
• Qaytarish sanasi
• Imzo va sana`
    },
    {
        keywords: ["ijara", "uy ijar", "kvartira", "xona ijar", "soliq", "ijara shartnomasi", "ro'yxatdan"],
        title: "📋 Fuqarolik Kodeksi + Soliq Kodeksi — Ijara",
        answer: `Uy-joy ijarasi bo'yicha asosiy qoidalar:

✅ Shartnoma talablari:
• Yozma shaklda tuzilishi <b>shart</b>
• <b>ijara.soliq.uz</b> tizimida ro'yxatdan o'tkazilishi majburiy

📌 Ro'yxatdan o'tkazmaslik oqibatlari:
• Ijara beruvchiga <b>ma'muriy jarima</b> qo'llaniladi
• BHMning 5–10 baravari miqdorida jarima

📌 Soliq to'lash:
• Ijara daromadidan <b>12% soliq</b> to'lanadi
• Bir martalik patent (yillik) yoki oyma-oy to'lash mumkin`
    },
    {
        keywords: ["tezlik", "radar", "jarima", "tez yur", "tezlikni oshir", "128", "km/soat"],
        title: "📋 Ma'muriy Javobgarlik Kodeksi — 128-3-modda",
        answer: `MJtKning 128-3-moddasiga ko'ra tezlikni oshirganligi uchun:

📌 Jarima jadval:
• <b>20 km/soatgacha</b> oshirish → BHMning 1x = <b>340 000 so'm</b>
• <b>20–40 km/soat</b> oshirish → BHMning 5x = <b>1 700 000 so'm</b>
• <b>40 km/soatdan ortiq</b> → BHMning 9x = <b>3 060 000 so'm</b> YOKI 2 yilga huquqdan mahrum

⚠️ BHM (Bazaviy hisoblash miqdori) = 340 000 so'm (2024-yil)`
    },
    {
        keywords: ["tonirovka", "oyna qorayt", "parda", "tonirovka jarima", "oyna ruxsat"],
        title: "📋 Ma'muriy Javobgarlik Kodeksi — 126-modda",
        answer: `MJtKning 126-moddasiga ko'ra:

✅ Ruxsatsiz tonirovka (oyna qoraytirish) uchun jarima:
• BHMning <b>25 baravari</b> = <b>8 500 000 so'm</b>

📌 Tonirovka qoidalari:
• Old oyna: tonirovka <b>MUTLAQO mumkin emas</b>
• Yon va orqa oynalar: maxsus ruxsatnoma bilan mumkin
• Ruxsatnoma <b>YOIDA</b> bo'lishi kerak (texosmotrda tekshiriladi)`
    },
    {
        keywords: ["1-modda", "davlat", "suveren", "konstitutsiya 1"],
        title: "📖 Konstitutsiya — 1-modda",
        answer: `O'zbekiston — boshqaruvning respublika shakliga ega bo'lgan suveren, demokratik, huquqiy, ijtimoiy va dunyoviy davlat.
Davlatning "O'zbekiston Respublikasi" va "O'zbekiston" degan nomlari bir xil ma'noni anglatadi.`
    },
    {
        keywords: ["13-modda", "inson huquq", "qadr-qimmat", "konstitutsiya 13"],
        title: "📖 Konstitutsiya — 13-modda",
        answer: `O'zbekiston Respublikasida demokratiya umuminsoniy prinsiplarga asoslanadi, ularga ko'ra inson, uning hayoti, erkinligi, sha'ni, qadr-qimmati va boshqa daxlsiz huquqlari oliy qadriyat hisoblanadi.`
    },
    {
        keywords: ["15-modda", "qonun ustuvorligi", "konstitutsiya 15"],
        title: "📖 Konstitutsiya — 15-modda",
        answer: `O'zbekiston Respublikasida O'zbekiston Respublikasi Konstitutsiyasi va qonunlarining ustunligi so'zsiz tan olinadi. O'zbekiston Respublikasi Konstitutsiyasi mamlakatning butun hududida oliy yuridik kuchga ega, to'g'ridan-to'g'ri amal qiladi va yagona huquqiy makonning asosi bo'lib xizmat qiladi.`
    },
    {
        keywords: ["29-modda", "33-modda", "fikr erkinligi", "so'z erkinligi", "konstitutsiya 33"],
        title: "📖 Konstitutsiya — 33-modda",
        answer: `Har kim fikrlash, so'z va e'tiqod erkinligi huquqiga ega.
Har kim o'zi istagan axborotni izlash, olish va tarqatish huquqiga ega, davlatga qarshi qaratilgan ma'lumotlar va qonunda belgilangan boshqa cheklovlar bundan mustasno.`
    },
    {
        keywords: ["41-modda", "50-modda", "ta'lim", "o'qish huquqi", "konstitutsiya 50"],
        title: "📖 Konstitutsiya — 50-modda (Ta'lim huquqi)",
        answer: `Har kim ta'lim olish huquqiga ega. Davlat bepul umumiy o'rta ta'lim va boshlang'ich hunar ta'limi olishni kafolatlaydi. Maktab ishlari, maktabgacha ta'lim va tarbiya davlat nazoratidadir.`
    },
    {
        keywords: ["mulk", "xususiy mulk", "65-modda", "tadbirkorlik"],
        title: "📖 Konstitutsiya — 65-modda (Mulk huquqi)",
        answer: `Xususiy mulk daxlsizdir. Mulkdor o'z mol-mulkidan qonunda nazarda tutilgan hollardan va tartibdan tashqari hamda sudning qarorisiz mahrum etilishi mumkin emas.`
    }
];

// ==========================================
// TELEGRAM API HELPER FUNKSIYALARI
// ==========================================

function apiRequest(method, body) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(body);
        const options = {
            hostname: 'api.telegram.org',
            port: 443,
            path: `/bot${BOT_TOKEN}/${method}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data)
            }
        };

        const req = https.request(options, (res) => {
            let responseData = '';
            res.on('data', chunk => responseData += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(responseData));
                } catch (e) {
                    reject(e);
                }
            });
        });

        req.on('error', reject);
        req.write(data);
        req.end();
    });
}

async function sendMessage(chatId, text, options = {}) {
    return apiRequest('sendMessage', {
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML',
        ...options
    });
}

async function setMyCommands() {
    return apiRequest('setMyCommands', {
        commands: [
            { command: 'start', description: 'Botni boshlash' },
            { command: 'help', description: 'Yordam va ko\'rsatmalar' },
            { command: 'mehnat', description: 'Mehnat kodeksi — asosiy moddalar' },
            { command: 'oila', description: 'Oila kodeksi — nikoh, aliment' },
            { command: 'fuqarolik', description: 'Fuqarolik kodeksi — qarz, ijara' },
            { command: 'jarima', description: 'Ma\'muriy javobgarlik — jarimalar' },
            { command: 'ariza', description: 'Ishdan bo\'shash arizasi namunasi' },
            { command: 'tilxat', description: 'Qarz tilxati namunasi' }
        ]
    });
}

async function getUpdates(offset) {
    return apiRequest('getUpdates', {
        offset: offset,
        timeout: 30,
        allowed_updates: ['message']
    });
}

// ==========================================
// HUQUQIY JAVOB TIZIMI (QIDIRUV)
// ==========================================
async function getLegalResponse(text) {
    const lowerText = text.toLowerCase();
    
    // Matndan mos kalit so'zlarni qidirish
    for (const item of legalDB) {
        if (item.keywords.some(kw => lowerText.includes(kw))) {
            return `${item.title}\n\n${item.answer}`;
        }
    }
    
    return null;
}

// ==========================================
// BUYRUQ HANDLERLARI
// ==========================================
async function handleStart(chatId, firstName) {
    const msg = `👨‍⚖️ <b>Assalomu alaykum, ${firstName}!</b>

Men <b>Huqushunos AI</b> — O'zbekiston Respublikasi qonunlari bo'yicha maslahat beruvchi sun'iy intellekt botiman.

📚 <b>Quyidagi yo'nalishlarda yordam bera olaman:</b>
• Mehnat huquqi (ta'til, ishdan bo'shash, ish haqi)
• Oila huquqi (aliment, nikoh shartnomasi)
• Fuqarolik huquqi (qarz, ijara, tilxat)
• Ma'muriy javobgarlik (jarimalar)

💬 <b>Qanday foydalanish:</b>
Shunchaki savolingizni yozing yoki /help buyrug'ini bering.

⚠️ <i>Diqqat: Men ma'lumot va maslahat beraman. Muhim huquqiy masalalar uchun professional advokat bilan maslahatlashing.</i>`;

    await sendMessage(chatId, msg, {
        reply_markup: {
            keyboard: [
                ['📖 Konstitutsiya']
            ],
            resize_keyboard: true
        }
    });
}

async function handleHelp(chatId) {
    const msg = `📖 <b>Huqushunos AI — Buyruqlar ro'yxati</b>

/start — Botni qayta ishga tushirish
/help — Ushbu yordam xabari
/mehnat — Mehnat kodeksi asoslari
/oila — Oila kodeksi asoslari
/fuqarolik — Fuqarolik kodeksi asoslari
/jarima — Jarimalar va ma'muriy javobgarlik
/ariza — Ishdan bo'shash arizasi namunasi
/tilxat — Qarz tilxati namunasi

💬 <b>Yoki to'g'ridan-to'g'ri savol bering:</b>
<i>"Ta'til necha kun beriladi?"</i>
<i>"Aliment miqdori qancha?"</i>
<i>"Tonirovka jarimasi necha pul?"</i>`;

    await sendMessage(chatId, msg);
}

async function handleMehnat(chatId) {
    const msg = `⚖️ <b>Mehnat Kodeksi — Asosiy Moddalar</b>

📌 <b>160-modda</b> — Ishdan bo'shash
→ 2 hafta (14 kun) oldin yozma ariza

📌 <b>216-modda</b> — Yillik ta'til
→ Kamida 21 kalendar kun

📌 <b>233-modda</b> — Ish haqi kechikishi
→ Har kechikkan kun uchun kompensatsiya

📌 <b>115-modda</b> — Ish vaqti
→ Haftasiga 40 soatdan ortiq bo'lmasin

📌 <b>137-modda</b> — Qo'shimcha ish haqi
→ Norma oshsa, 1.5–2x miqdorida to'lov

💬 Batafsil ma'lumot uchun savolingizni yozing!`;

    await sendMessage(chatId, msg);
}

async function handleOila(chatId) {
    const msg = `👨‍👩‍👧 <b>Oila Kodeksi — Asosiy Moddalar</b>

📌 <b>99-modda</b> — Aliment
→ 1 bola: 25%, 2 bola: 33%, 3+: 50%

📌 <b>47-modda</b> — Nikoh shartnomasi
→ Yozma + notarial tasdiqlash shart

📌 <b>35-modda</b> — Ajrashish tartibi
→ Bolali oilalar sudda ko'rib chiqiladi

📌 <b>26-modda</b> — Umumiy mulk
→ Nikohda sotib olingan mulk — umumiy

💬 Batafsil ma'lumot uchun savolingizni yozing!`;

    await sendMessage(chatId, msg);
}

async function handleFuqarolik(chatId) {
    const msg = `📝 <b>Fuqarolik Kodeksi — Asosiy Moddalar</b>

📌 <b>732–733-moddalar</b> — Qarz/Tilxat
→ BHM×10 dan oshsa yozma shart

📌 <b>535-modda</b> — Ijara shartnomasi
→ Yozma + soliq organlarida ro'yxat

📌 <b>254-modda</b> — Fuqarolik muddati
→ Umumiy da'vo muddati 3 yil

📌 <b>482-modda</b> — Hadya
→ Ko'chmas mulk hadyasi — yozma + notarius

💬 Batafsil ma'lumot uchun savolingizni yozing!`;

    await sendMessage(chatId, msg);
}

async function handleJarima(chatId) {
    const msg = `🚗 <b>Ma'muriy Javobgarlik — Yo'l Xavfsizligi</b>

📌 <b>128-3-modda</b> — Tezlik oshirish:
→ 20 km/soatgacha: BHM×1 = <b>340 000 so'm</b>
→ 20–40 km/soat: BHM×5 = <b>1 700 000 so'm</b>
→ 40+ km/soat: BHM×9 = <b>3 060 000 so'm</b>

📌 <b>126-modda</b> — Tonirovka:
→ Ruxsatsiz: BHM×25 = <b>8 500 000 so'm</b>

📌 <b>127-modda</b> — Qizil chiroqda o'tish:
→ BHM×5 = <b>1 700 000 so'm</b>

📌 <b>133-modda</b> — Haydovchilik guvohnomasisiz:
→ BHM×5 = <b>1 700 000 so'm</b>

<i>BHM = 340 000 so'm (2024-yil)</i>`;

    await sendMessage(chatId, msg);
}

async function handleAriza(chatId) {
    const today = new Date().toLocaleDateString('uz-UZ', {day:'2-digit', month:'2-digit', year:'numeric'});
    const twoWeeks = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('uz-UZ', {day:'2-digit', month:'2-digit', year:'numeric'});
    
    const msg = `📄 <b>Ishdan bo'shash haqida ariza namunasi</b>

<code>
_________________________________ga
(Tashkilot direktori F.I.Sh.)

_________________________________dan
(Lavozim va F.I.Sh.)


A R I Z A

Mehnat Kodeksining 160-moddasiga
binoan, ${twoWeeks} sanasidan
boshlab, o'z xohishimga ko'ra,
meni ishdan bo'shatishingizni so'rayman.

Sana: ${today}

Imzo: ___________________
</code>

✏️ <i>Ushbu namunani o'z ma'lumotlaringizga moslang va 2 nusxada yozing. Bir nusxasida ish beruvchi "qabul qilindi" degan tamg'a bosishi kerak.</i>`;

    await sendMessage(chatId, msg);
}

async function handleTilxat(chatId) {
    const today = new Date().toLocaleDateString('uz-UZ', {day:'2-digit', month:'2-digit', year:'numeric'});
    
    const msg = `📃 <b>Qarz tilxati namunasi</b>

<code>
T I L X A T

Sana: ${today}
Shahar: ___________________

Men, fuqaro ___________________
(F.I.Sh. va pasport seriya/raqami)

Ushbu tilxatni berdim fuqaro
___________________ga (F.I.Sh.) shuki,
undan ___________________ so'm
(___________________ so'm so'zda)
miqdorida naqd pul qarz oldim.

Ushbu qarzni ___________________
sanasiga qadar to'liq qaytarishga
majburiyat olaman.

Tilxat o'z ixtiyorim bilan, hech
qanday majburlashsiz yozildi.

Imzo: ___________________
</code>

✅ <b>Tilxatda albatta bo'lishi kerak:</b>
• Ikkala tomonning to'liq ismi + pasport ma'lumotlari
• Qarz summasi (raqam VA so'z bilan)
• Qaytarish sanasi
• Qo'l imzo`;

    await sendMessage(chatId, msg);
}

async function handleKonstitutsiya(chatId) {
    userStates[chatId] = 'WAIT_FOR_ARTICLE';
    const msg = `📖 <b>Konstitutsiya</b>

Sizga nechanchi modda kerak? Iltimos, faqat raqam yozib yuboring (masalan: 1 yoki 155).`;
    await sendMessage(chatId, msg);
}

async function handleTadbirkorlik(chatId) {
    await sendMessage(chatId, `🏢 Tadbirkorlik bo'yicha ma'lumotlar tez orada tayyor bo'ladi!`);
}

// ==========================================
// ASOSIY XABAR ISHLOV BERUVCHISI
// ==========================================
async function processMessage(message) {
    const chatId = message.chat.id;
    const text = message.text || '';
    const firstName = message.from.first_name || 'Foydalanuvchi';

    console.log(`[${new Date().toLocaleTimeString()}] @${message.from.username || 'noma\'lum'} (${chatId}): ${text}`);

    // Buyruqlar
    if (text.startsWith('/start')) {
        await handleStart(chatId, firstName);
        return;
    }
    if (text.startsWith('/help')) {
        await handleHelp(chatId);
        return;
    }
    if (text.startsWith('/ariza') || text === "📄 Ishdan bo'shash arizasi") {
        await handleAriza(chatId);
        return;
    }
    if (text.startsWith('/tilxat') || text === '📃 Qarz tilxati' || text === '📃 Tilxat namunasi') {
        await handleTilxat(chatId);
        return;
    }

    if (text.startsWith('/mehnat') || text === '⚖️ Mehnat huquqi') {
        await handleMehnat(chatId);
        return;
    }
    if (text.startsWith('/oila') || text === '👨‍👩‍👧 Oila huquqi') {
        await handleOila(chatId);
        return;
    }
    if (text.startsWith('/fuqarolik') || text === '📝 Fuqarolik huquqi') {
        await handleFuqarolik(chatId);
        return;
    }
    if (text.startsWith('/jarima') || text === '🚗 Jarimalar') {
        await handleJarima(chatId);
        return;
    }
    if (text === '📖 Konstitutsiya') {
        await handleKonstitutsiya(chatId);
        return;
    }
    if (text === '🏢 Tadbirkorlik') {
        await handleTadbirkorlik(chatId);
        return;
    }

    // Agar foydalanuvchi faqat raqam kiritgan bo'lsa (1 dan 155 gacha)
    const exactNumber = parseInt(text.trim());
    if (!isNaN(exactNumber) && exactNumber > 0 && exactNumber <= 155 && text.trim() === exactNumber.toString()) {
        const articleText = konstitutsiyaData ? konstitutsiyaData[exactNumber] : null;
        if (articleText) {
            let msgContent = `📖 <b>O'zbekiston Respublikasi Konstitutsiyasi, ${exactNumber}-modda:</b>\n\n${articleText}`;
            if (msgContent.length > 4096) {
                msgContent = msgContent.substring(0, 4000) + '... (davomi bor)';
            }
            await sendMessage(chatId, msgContent);
            delete userStates[chatId];
            return;
        }
    }

    // Holatni (state) tekshirish (agar avvalgi tekshiruvdan o'tmagan bo'lsa, demak noto'g'ri kiritilgan)
    if (userStates[chatId] === 'WAIT_FOR_ARTICLE') {
        await sendMessage(chatId, `Kechirasiz, noto'g'ri raqam kiritdingiz. 1 dan 155 gacha bo'lgan raqam yuboring.`);
        delete userStates[chatId];
        return;
    }

    // Qolgan barcha matnlar ichki bazadan qidiriladi
    await apiRequest('sendChatAction', { chat_id: chatId, action: 'typing' });
    
    const legalResponse = await getLegalResponse(text);
    if (legalResponse) {
        await sendMessage(chatId, legalResponse);
        return;
    }


    // Topilmadi — ko'mak xabari
    await sendMessage(chatId, `🤔 Ushbu savol bo'yicha aniq ma'lumot topa olmadim.

💡 <b>Quyidagilardan birini sinab ko'ring:</b>
• /mehnat — Mehnat huquqi
• /oila — Oila va aliment
• /fuqarolik — Qarz va ijara
• /jarima — Ma'muriy jarimalar

Yoki savolingizni boshqacha shaklda yozing (masalan: <i>"aliment miqdori"</i>, <i>"ishdan bo'shash muddati"</i>).`);
}

// ==========================================
// LONG-POLLING ASOSIY LOOP
// ==========================================
async function startPolling() {
    console.log('================================================');
    console.log('  HUQUSHUNOS AI TELEGRAM BOT ISHGA TUSHDI');
    console.log('  Bot: @Huquq_shunosbot');
    console.log('  Node.js:', process.version);
    console.log('================================================');

    // Bot buyruqlarini o'rnatish
    try {
        await setMyCommands();
        console.log('[OK] Bot buyruqlari o\'rnatildi.');
    } catch (e) {
        console.log('[OGOHLANTIRISH] Bot buyruqlarini o\'rnatishda xatolik:', e.message);
    }
    console.log('[OK] Xabarlar kutilmoqda...\n');

    // Polling loop
    while (true) {
        try {
            const response = await getUpdates(lastUpdateId + 1);

            if (response.ok && response.result.length > 0) {
                for (const update of response.result) {
                    lastUpdateId = update.update_id;

                    if (update.message && update.message.text) {
                        await processMessage(update.message);
                    }
                }
            }
        } catch (error) {
            console.error('[XATO] Polling xatosi:', error.message);
            // Xato bo'lsa 3 soniya kuting va qayta urinib ko'ring
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
    }
}

// ==========================================
// HOSTING UCHUN DUMMY SERVER (PORT BIND)
// ==========================================
const app = express();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send('Huquqshunos Bot is running!');
});
app.listen(PORT, () => {
    console.log(`Web server is running on port ${PORT} (for hosting compatibility)`);
});

// Botni ishga tushirish
startPolling();
