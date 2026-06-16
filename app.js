// ==========================================
// HUQUSHUNOS AI - CLIENT-SIDE CORE LOGIC
// ==========================================

// --- 1. UZBEKISTAN LEGAL KNOWLEDGE BASE & AI ENGINE ---
const legalDatabase = {
    // Categories and articles
    categories: [
        { id: 'mehnat', name: 'Mehnat kodeksi' },
        { id: 'oila', name: 'Oila kodeksi' },
        { id: 'fuqarolik', name: 'Fuqarolik kodeksi' },
        { id: 'ma\'muriy', name: 'Ma\'muriy javobgarlik' },
        { id: 'konstitutsiya', name: 'Konstitutsiya' }
    ],
    
    laws: [
        {
            id: 'm-160',
            category: 'mehnat',
            title: 'Mehnat shartnomasini xodimning tashabbusi bilan bekor qilish (160-modda)',
            code: 'Mehnat kodeksi, 160-modda',
            summary: 'Xodim mehnat shartnomasini ikki hafta oldin ish beruvchini yozma ravishda ogohlantirgan holda bekor qilishga haqli.',
            details: 'Mehnat kodeksining 160-moddasiga ko\'ra, xodim o\'z tashabbusi bilan ishdan bo\'shamoqchi bo\'lsa, ish beruvchini kamida 2 hafta (14 kun) oldin yozma ariza bilan ogohlantirishi shart. Ogohlantirish muddati ariza topshirilgan kunning ertasidan boshlab hisoblanadi. O\'zaro kelishuvga ko\'ra, ushbu muddat qisqartirilishi ham mumkin. Sinov muddati davrida esa ogohlantirish muddati 3 kunni tashkil etadi.',
            keywords: ['bo\'shash', 'boshash', 'ishdan ketish', 'ariza yozish', 'necha kun', 'ikki hafta', '14 kun', 'ogohlantirish', 'bo\'shash muddati']
        },
        {
            id: 'm-216',
            category: 'mehnat',
            title: 'Yillik mehnat ta\'tili muddati (216, 217-moddalar)',
            code: 'Mehnat kodeksi, 216-modda',
            summary: 'Xodimlarga har yili asosiy mehnat ta\'tili beriladi. Uning eng kam muddati 21 kalendar kunidir.',
            details: 'Yangi Mehnat kodeksining 216-moddasiga asosan, xodimlarga har yili ish joyi va o\'rtacha ish haqi saqlangan holda asosiy mehnat ta\'tili beriladi. Eng kam yillik asosiy mehnat ta\'tili muddati 21 kalendar kunni tashkil etadi (eski kodeksda 15 ish kuni edi). Davlat hokimiyati va boshqaruvi organlari xodimlari uchun esa yillik uzaytirilgan mehnat ta\'tili muddati 27 kalendar kun etib belgilangan.',
            keywords: ['ta\'til', 'tatil', 'otpusk', 'necha kun', 'asosiy ta\'til', 'dam olish', 'necha kun dam']
        },
        {
            id: 'm-233',
            category: 'mehnat',
            title: 'Muddati o\'tgan ish haqi uchun kompensatsiya to\'lash (233-modda)',
            code: 'Mehnat kodeksi, 233-modda',
            summary: 'Ish beruvchi ish haqini to\'lashni kechiktirsa, har bir kechiktirilgan kun uchun kompensatsiya to\'laydi.',
            details: 'Mehnat kodeksining 233-moddasiga binoan, ish beruvchi ish haqini to\'lash kechiktirilganligi uchun xodim oldida moddiy javobgarlik kiritadi. Xususan, ish haqini to\'lash muddati buzilgan taqdirda, ish beruvchi uni har bir kechiktirilgan kun uchun O\'zbekiston Respublikasi Markaziy bankining qayta moliyalash stavkasining (hozirda asosiy stavka) 10 foizi miqdorida foizlar (kompensatsiya) bilan birga to\'lashi shart.',
            keywords: ['oylik', 'ish haqi', 'kechiksa', 'kompensatsiya', 'pul to\'lash', 'maosh', 'oylik kechikishi']
        },
        {
            id: 'o-96',
            category: 'oila',
            title: 'Ota-onaning voyaga yetmagan bolalariga aliment to\'lash majburiyati (96, 99-moddalar)',
            code: 'Oila kodeksi, 96-modda',
            summary: 'Ota-ona voyaga yetmagan bolalariga ta\'minot berishi shart. Buni bajarmasa, aliment undiriladi.',
            details: 'Oila kodeksining 99-moddasiga ko\'ra, agar voyaga yetmagan bolalarga ta\'minot berish haqida ota-ona o\'rtasida ixtiyoriy kelishuv bo\'lmasa, aliment sud tomonidan quyidagi miqdorlarda undiriladi:\n- 1 ta bola uchun: daromadning 1/4 qismi (25%)\n- 2 ta bola uchun: daromadning 1/3 qismi (33.3%)\n- 3 ta va undan ko\'p bola uchun: daromadning yarmi (50%)\nShuningdek, har bir bola uchun undiriladigan aliment miqdori qonun hujjatlari bilan belgilangan mehnatga haq to\'lash eng kam miqdorining 26.5 foizidan kam bo\'lmasligi kerak.',
            keywords: ['aliment', 'bola puli', 'ajrashish', 'sud', 'foiz', 'aliment miqdori', 'aliment necha pul', 'bola ta\'minoti']
        },
        {
            id: 'o-47',
            category: 'oila',
            title: 'Nikoh shartnomasi tuzish tartibi (47, 48-moddalar)',
            code: 'Oila kodeksi, 47-modda',
            summary: 'Nikoh shartnomasi er va xotinning nikoh davridagi va/yoki er-xotin ajralgan taqdirdagi mulkiy huquqlarini belgilaydi.',
            details: 'Nikoh shartnomasi nikoh davlat ro\'yxatiga olingunga qadar ham, nikoh davrida ham tuzilishi mumkin. U yozma shaklda tuziladi va majburiy tarzda notarial tasdiqlanishi shart. Nikoh shartnomasida er-xotinning amaldagi va kelajakda sotib oladigan mulklariga nisbatan umumiy birgalikdagi, ulushli yoki alohida egalik qilish tartibini belgilash mumkin.',
            keywords: ['nikoh shartnomasi', 'shartnoma', 'mulk', 'er-xotin', 'notarius', 'nikohdan oldin']
        },
        {
            id: 'f-732',
            category: 'fuqarolik',
            title: 'Qarz shartnomasi va tilxat (732, 733-moddalar)',
            code: 'Fuqarolik kodeksi, 732-modda',
            summary: 'Qarz shartnomasi pul yoki boshqa ashyolarni topshirish bilan tuziladi. Muayyan miqdordan oshganda yozma bo\'lishi shart.',
            details: 'Fuqarolik kodeksining 733-moddasiga binoan, fuqarolar o\'rtasidagi qarz shartnomasi, agar bu summa bazaviy hisoblash miqdorining (BHM) 10 baravaridan oshsa, majburiy ravishda yozma shaklda tuzilishi shart. Qarz olganligini tasdiqlash uchun qarz oluvchi tomonidan berilgan tilxat (rasmiy imzolangan) yozma shartnoma o\'rniga o\'tadi va sudda to\'liq yuridik kuchga ega bo\'ladi.',
            keywords: ['qarz', 'tilxat', 'pul berish', 'foiz', 'sudga berish', 'tilxat yozish', 'qarz shartnomasi']
        },
        {
            id: 'f-535',
            category: 'fuqarolik',
            title: 'Turar-joyni ijaraga berish shartnomasi (535, 574-moddalar)',
            code: 'Fuqarolik kodeksi, 574-modda',
            summary: 'Uy-joy ijarasi shartnomasi yozma shaklda tuziladi va soliq organlarida ro\'yxatdan o\'tkaziladi.',
            details: 'Fuqarolik kodeksi hamda Soliq kodeksi talablariga muvofiq, ko\'chmas mulk (uy, kvartira, noturar bino) ijarasi shartnomasi yozma shaklda tuzilishi shart. Shuningdek, uy-joy ijarasi shartnomalari majburiy tarzda Davlat soliq xizmati organlarida (ijara.soliq.uz tizimi orqali) hisobga qo\'yilishi lozim. Hisobga qo\'yilmagan ijara shartnomasi ma\'muriy jarimaga sabab bo\'ladi.',
            keywords: ['ijara', 'uy ijarasi', 'kvartira', 'soliq', 'ijara.soliq.uz', 'ijara shartnomasi', 'ro\'yxatdan o\'tkazish']
        },
        {
            id: 'm-128',
            category: 'ma\'muriy',
            title: 'Tezlikni oshirganlik uchun jarimalar (128-3-modda)',
            code: 'MJtK, 128-3-modda',
            summary: 'Belgilangan tezlikni oshirish miqdoriga qarab BHM baravarida jarimalar qo\'llaniladi.',
            details: 'Ma\'muriy javobgarlik to\'g\'risidagi kodeksning 128-3-moddasiga ko\'ra, transport vositalari haydovchilarining belgilangan tezlikni oshirganligi uchun quyidagi jarimalar qo\'llaniladi:\n- Tezlikni 20 km/soatgacha oshirish: BHMning 1 baravari (340 000 so\'m)\n- Tezlikni 20 dan 40 km/soatgacha oshirish: BHMning 5 baravari (1 700 000 so\'m)\n- Tezlikni 40 km/soatdan ortiq oshirish: BHMning 9 baravari (3 060 000 so\'m) yoki 2 yil muddatga haydash huquqidan mahrum qilish.',
            keywords: ['tezlik', 'radarga tushish', 'jarima', 'radar', 'tez yurish', 'bhm', '128-modda']
        },
        {
            id: 'm-126',
            category: 'ma\'muriy',
            title: 'Ruxsatsiz tonirovka qilish jarimasi (126-modda)',
            code: 'MJtK, 126-modda',
            summary: 'Oynalarni qoraytirish (tonirovka) uchun ruxsatnoma bo\'lmagan holatdagi jarimalar.',
            details: 'MJtKning 126-moddasiga ko\'ra, tegishli ruxsatnomasiz transport vositalarining oynalarini qoraytirganlik (tonirovka) yoki oynalariga yorug\'lik o\'tkazuvchanligini kamaytiradigan pardalar o\'rnatganlik uchun BHMning 25 baravari (8 500 000 so\'m) miqdorida jarima solishga sabab bo\'ladi. Agar tonirovka ruxsatnomasi mavjud bo\'lsa (orqa va yon oynalar uchun bepul yoki pullik ruxsatnoma olingan bo\'lsa), javobgarlik bo\'lmaydi.',
            keywords: ['tonirovka', 'oyna qoraytirish', 'ruxsatnoma', 'tonirovka jarimasi', 'tonirovka narxi', 'parda taqish']
        },
        {
            id: 'm-128-4',
            category: 'ma\'muriy',
            title: 'Svetoforning taqiqlovchi signaliga bo\'ysunmaslik (128-4-modda)',
            code: 'MJtK, 128-4-modda',
            summary: 'Svetoforning qizil chirog\'ida yoki chorrahadan o\'tish qoidalarini buzganlik uchun jarima.',
            details: 'Ma\'muriy javobgarlik to\'g\'risidagi kodeksning 128-4-moddasiga ko\'ra, svetoforning taqiqlovchi signalida yoki yo\'l harakatini tartibga soluvchining taqiqlovchi ishorasida to\'xtash chizig\'ini bosib o\'tish BHMning yarim baravari (hozirda 170 000 so\'m) miqdorida jarima solishga sabab bo\'ladi. Qizil chiroqdan o\'tib ketish esa BHMning 2 baravari (680 000 so\'m) miqdorida jarimaga sabab bo\'ladi.',
            keywords: ['qizil chiroq', 'svetofor', 'jarima', 'qizildan o\'tish', 'stop chiziq', 'kamera']
        },
        {
            id: 'm-135',
            category: 'ma\'muriy',
            title: 'Hujjatlarsiz transport boshqarish (135-modda)',
            code: 'MJtK, 135-modda',
            summary: 'Haydovchilik guvohnomasi yoki boshqa hujjatlarsiz mashina haydash jarimaga tortiladi.',
            details: 'MJtKning 135-moddasiga binoan, transport vositasini boshqarish huquqini beruvchi hujjatlari (prava), sug\'urta polisi yoki transport vositasini ro\'yxatdan o\'tkazganlik haqidagi hujjatlari yonida bo\'lmagan shaxslarning transport vositalarini boshqarishi BHMning 1 baravari (340 000 so\'m) miqdorida jarimaga sabab bo\'ladi. Umuman boshqarish huquqi bo\'lmagan (prava olmagan) shaxs haydasa BHMning 5 baravari (1 700 000 so\'m) jarima solinadi.',
            keywords: ['prava', 'hujjatsiz', 'sug\'urta', 'texpasport', 'pravasiz haydash', '135-modda']
        },
        {
            id: 'm-115',
            category: 'mehnat',
            title: 'Ish vaqtining normal davomiyligi (115-modda)',
            code: 'Mehnat kodeksi, 115-modda',
            summary: 'Xodimlar uchun haftalik ish vaqti 40 soatdan oshmasligi kerak.',
            details: 'Mehnat kodeksining 115-moddasiga asosan, xodimning ish vaqti haftasiga 40 soatdan oshmasligi lozim. Olti kunlik ish haftasida har kungi ishning davomiyligi 7 soatdan, besh kunlik ish haftasida esa 8 soatdan oshib ketishi mumkin emas. Ish vaqtidan tashqari ishlar faqat xodimning roziligi bilan va ikki hissa miqdorida haq to\'lash orqali amalga oshiriladi.',
            keywords: ['ish vaqti', '40 soat', 'soat', 'ish vaqtidan tashqari', 'perebotka', 'qancha ishlash']
        },
        {
            id: 'f-985',
            category: 'fuqarolik',
            title: 'Yetkazilgan zararni qoplash (985-modda)',
            code: 'Fuqarolik kodeksi, 985-modda',
            summary: 'Shaxsga yoki mol-mulkka yetkazilgan zarar uni yetkazgan shaxs tomonidan to\'liq qoplanishi shart.',
            details: 'Fuqarolik kodeksining 985-moddasiga asosan, g\'ayriqonuniy harakat (harakatsizlik) tufayli fuqaroning shaxsiga yoki mol-mulkiga yetkazilgan zarar, shuningdek yuridik shaxsga yetkazilgan zarar, uni yetkazgan shaxs tomonidan to\'liq hajmda qoplanishi lozim. Zarar yetkazgan shaxs o\'zining aybi yo\'qligini isbotlasa, zararni qoplashdan ozod qilinishi mumkin.',
            keywords: ['zarar', 'zararni qoplash', 'tovon puli', 'aybdor', 'kompensatsiya', 'mulkga zarar']
        },
        {
            id: 'k-1',
            category: 'konstitutsiya',
            title: 'Davlat suvereniteti (1-modda)',
            code: 'Konstitutsiya, 1-modda',
            summary: 'O\'zbekiston - boshqaruvning respublika shakliga ega bo\'lgan suveren, demokratik, huquqiy, ijtimoiy va dunyoviy davlat.',
            details: 'O\'zbekiston Respublikasi Konstitutsiyasining 1-moddasida O\'zbekistonning davlat tuzumi belgilab qo\'yilgan. Unga ko\'ra O\'zbekiston - suveren, demokratik, huquqiy, ijtimoiy va dunyoviy davlatdir. Davlatning "O\'zbekiston Respublikasi" va "O\'zbekiston" degan nomlari bir xil ma\'noni anglatadi.',
            keywords: ['konstitutsiya', 'suverenitet', 'demokratik', 'huquqiy davlat', '1-modda']
        },
        {
            id: 'k-13',
            category: 'konstitutsiya',
            title: 'Inson huquqlari va erkinliklari (13-modda)',
            code: 'Konstitutsiya, 13-modda',
            summary: 'O\'zbekistonda inson, uning hayoti, erkinligi, sha\'ni, qadr-qimmati va huquqlari oliy qadriyatdir.',
            details: 'Konstitutsiyaning 13-moddasiga binoan, O\'zbekiston Respublikasida demokratiya umuminsoniy prinsiplarga asoslanadi. Bu prinsiplarga ko\'ra inson, uning hayoti, erkinligi, sha\'ni, qadr-qimmati va boshqa daxlsiz huquqlari oliy qadriyat hisoblanadi. Davlat o\'z faoliyatini inson va jamiyat farovonligini ko\'zlab, ijtimoiy adolat va qonuniylik prinsiplari asosida amalga oshiradi.',
            keywords: ['inson huquqlari', 'erkinlik', 'qadr-qimmat', 'oliy qadriyat', 'demokratiya', '13-modda']
        },
        {
            id: 'k-29',
            category: 'konstitutsiya',
            title: 'Fikr va so\'z erkinligi (33-modda)',
            code: 'Konstitutsiya, 33-modda',
            summary: 'Har kim fikrlash, so\'z va e\'tiqod erkinligiga ega.',
            details: 'Konstitutsiyamizning 33-moddasiga asosan (Yangi tahrirda), har kim fikrlash, so\'z va e\'tiqod erkinligiga ega. Har kim o\'zi istagan axborotni izlash, olish va tarqatish huquqiga ega. Ammo bu huquqlar faqatgina qonunga muvofiq va davlat siri yoki boshqa sirlarni saqlash maqsadidagina cheklanishi mumkin.',
            keywords: ['so\'z erkinligi', 'fikr erkinligi', 'axborot', 'matbuot', 'erkinlik', '33-modda']
        }
    ]
};

// Simple conversational QA matches
const conversationalQA = [
    {
        triggers: ['salom', 'assalom', 'assalomu alaykum', 'qalesiz', 'assalomu'],
        response: 'Assalomu alaykum! Huqushunos AI tizimiga xush kelibsiz. Sizga O\'zbekiston Respublikasi qonunchiligi bo\'yicha qanday yordam bera olaman?'
    },
    {
        triggers: ['rahmat', 'tashakkur', 'sog\' bo\'ling', 'yordam uchun'],
        response: 'Arzimaydi! Sizga yordam berganimdan xursandman. Savollaringiz bo\'lsa, bemalol murojaat qilishingiz mumkin. Sog\' bo\'ling!'
    },
    {
        triggers: ['nima qila olasan', 'qanday yordam', 'nima ish', 'vazifang', 'kimsa', 'kimsan'],
        response: 'Men O\'zbekiston Respublikasining Mehnat, Fuqarolik, Oila va Ma\'muriy kodekslari bo\'yicha maslahatlar bera olaman, shuningdek, ishdan bo\'shash arizasi, qarz tilxati va uy ijarasi shartnomalari uchun hujjat andozalarini shakllantira olaman.'
    }
];

// AI Chat logic: keyword matching
function getAIResponse(userMessage) {
    const message = userMessage.toLowerCase().trim();
    
    // 1. Check conversational QA
    for (const qa of conversationalQA) {
        if (qa.triggers.some(trigger => message.includes(trigger))) {
            return {
                text: qa.response,
                found: true
            };
        }
    }
    
    // 2. Search in legal database using keyword score
    let bestMatch = null;
    let highestScore = 0;
    
    for (const law of legalDatabase.laws) {
        let score = 0;
        for (const kw of law.keywords) {
            if (message.includes(kw)) {
                score += 2; // Exact keyword match
            }
        }
        
        // Check partial string matching in title and summary
        const words = message.split(' ');
        words.forEach(word => {
            if (word.length > 3) {
                if (law.title.toLowerCase().includes(word)) score += 1;
                if (law.summary.toLowerCase().includes(word)) score += 1;
                if (law.details.toLowerCase().includes(word)) score += 1;
            }
        });
        
        if (score > highestScore) {
            highestScore = score;
            bestMatch = law;
        }
    }
    
    if (bestMatch && highestScore >= 2) {
        return {
            text: `📝 <strong>${bestMatch.title}</strong> (${bestMatch.code}):\n\n${bestMatch.details}\n\n💡 <em>Qisqacha mazmuni: ${bestMatch.summary}</em>`,
            lawId: bestMatch.id,
            found: true
        };
    }
    
    // 3. Fallback response
    return {
        text: `Kechirasiz, ushbu savol bo'yicha aniq ma'lumot topa olmadim. Savolingizni boshqacha shakllantirib ko'ring yoki boshqa huquqiy mavzu haqida so'rang (masalan: "aliment miqdori", "ishdan bo'shash muddati", "tonirovka jarimasi").`,
        found: false
    };
}


// --- 2. DOCUMENT GENERATOR TEMPLATES ---
const docTemplates = {
    resignation: {
        title: "Ishdan bo'shash haqida ariza",
        fields: [
            { id: 'companyName', label: 'Tashkilot/Kompaniya nomi', type: 'text', placeholder: '"Universal Tech" MChJ', default: '"Smart Solutions" MChJ' },
            { id: 'directorName', label: 'Direktorning F.I.Sh.', type: 'text', placeholder: 'A.B. Karimovga', default: 'N.A. Alimovga' },
            { id: 'employeePosition', label: 'Sizning lavozimingiz', type: 'text', placeholder: 'Katta dasturchi', default: 'Yetakchi mutaxassis' },
            { id: 'employeeName', label: 'Sizning F.I.Sh.', type: 'text', placeholder: 'Ergashev Davron', default: 'Karimov Sanjarbek Otabekovich' },
            { id: 'resignDate', label: 'Bo\'shash sanasi', type: 'date', default: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] }, // Default 14 days later
            { id: 'reason', label: 'Sababi', type: 'select', options: [
                { value: 'o\'z xohishimga ko\'ra', label: 'O\'z xohishim bilan' },
                { value: 'sog\'ligim yomonlashganligi sababli', label: 'Sog\'liq sababli' },
                { value: 'boshqa ishga o\'tayotganligim munosabati bilan', label: 'Boshqa ishga o\'tayotganlik sababli' }
            ], default: 'o\'z xohishimga ko\'ra' }
        ],
        templateFn: function(data) {
            return `
                                                        ${data.companyName} direktori
                                                        ${data.directorName}ga
                                                        ${data.employeePosition}
                                                        ${data.employeeName}dan
            
            
                                              A R I Z A
            
            
            Mening yozgan ushbu arizamni qabul qilishingizni hamda men bilan tuzilgan mehnat shartnomasini O'zbekiston Respublikasi Mehnat Kodeksining 160-moddasiga binoan, ${data.resignDate} kunidan boshlab xodimning tashabbusi bilan (${data.reason}) bekor qilishingizni so'rayman.
            
            
            Sana: ${new Date().toLocaleDateString('uz-UZ')}
            
            Imzo: ___________________
            `;
        }
    },
    rent: {
        title: "Turar-joy ijarasi shartnomasi",
        fields: [
            { id: 'landlordName', label: 'Ijara beruvchi F.I.Sh.', type: 'text', placeholder: 'Valiyev Hasan', default: 'Sobirov Rustam Jalolovich' },
            { id: 'tenantName', label: 'Ijara oluvchi F.I.Sh.', type: 'text', placeholder: 'Rahimov Nodir', default: 'Rustamov Bobur Farhodovich' },
            { id: 'address', label: 'Uy manzili', type: 'text', placeholder: 'Toshkent sh., Chilonzor 5-daha, 12-uy, 45-xonadon', default: 'Toshkent sh., Yunusobod tumani, 4-mavze, 21-uy, 15-xonadon' },
            { id: 'price', label: 'Ijara haqi (oylik, so\'m)', type: 'number', placeholder: '4000000', default: '3500000' },
            { id: 'startDate', label: 'Boshlanish sanasi', type: 'date', default: new Date().toISOString().split('T')[0] },
            { id: 'endDate', label: 'Tugash sanasi', type: 'date', default: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] } // Default 1 year
        ],
        templateFn: function(data) {
            return `
                                     TURAR-JOY IJARA SHARTNOMASI
            
            Toshkent sh.                                              Sana: ${data.startDate}
            
            Bizki, bir tomondan Fuqaro ${data.landlordName} (kelgusida "Ijara beruvchi") va ikkinchi tomondan Fuqaro ${data.tenantName} (kelgusida "Ijara oluvchi") quyidagilar to'g'risida ushbu shartnomani tuzdik:
            
            1. SHARTNOMA MAVZUSI
            1.1. Ijara beruvchi o'ziga xususiy mulk huquqi asosida tegishli bo'lgan ${data.address} manzilida joylashgan uy-joyni Ijara oluvchiga vaqtincha yashash uchun ijaraga beradi.
            
            2. IJARAGA BERISH MUDDATI VA TO'LOVLAR
            2.1. Ijara muddati ${data.startDate} dan boshlab ${data.endDate} gacha belgilandi.
            2.2. Tomonlar ijara haqini har oyda ${Number(data.price).toLocaleString('uz-UZ')} so'm miqdorida belgiladilar. To'lov har oyning 5-sanasidan kechiktirilmay to'lanadi.
            2.3. Ushbu shartnoma qonunchilikka binoan Davlat soliq idoralarida ro'yxatdan o'tkazilishi shart.
            
            3. TOMONLARNING IMZOLARI VA PASPORT MA'LUMOTLARI
            
            Ijara beruvchi:                                        Ijara oluvchi:
            ${data.landlordName}                                   ${data.tenantName}
            Imzo: _________________                                Imzo: _________________
            `;
        }
    },
    receipt: {
        title: "Qarz olganlik to'g'risida tilxat",
        fields: [
            { id: 'creditorName', label: 'Qarz beruvchi F.I.Sh.', type: 'text', placeholder: 'Karimov Anvar', default: 'Usmonov Jaloliddin Komilovich' },
            { id: 'debtorName', label: 'Qarz oluvchi F.I.Sh.', type: 'text', placeholder: 'Nazarov Umid', default: 'Normatov Dostonbek Sharifovich' },
            { id: 'amount', label: 'Qarz summasi (so\'m)', type: 'number', placeholder: '10000000', default: '15000000' },
            { id: 'amountText', label: 'Qarz summasi (so\'z bilan)', type: 'text', placeholder: 'o\'n million so\'m', default: 'o\'n besh million so\'m' },
            { id: 'returnDate', label: 'Qaytarish sanasi', type: 'date', default: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] } // Default 3 months
        ],
        templateFn: function(data) {
            return `
                                              T I L X A T
                                      (Qarz olganlik to'g'risida)
            
            Toshkent sh.                                              Sana: ${new Date().toLocaleDateString('uz-UZ')}
            
            Men - Fuqaro ${data.debtorName} (pasport/ID: AA1234567), ushbu tilxatni berdim Fuqaro ${data.creditorName}ga (pasport/ID: AB9876543) shuki, undan naqd shaklda ${Number(data.amount).toLocaleString('uz-UZ')} (${data.amountText}) so'm pul mablag'ini qarzga oldim.
            
            Men ushbu qarz pul mablag'ini kelishilgan muddatda - ya'ni ${data.returnDate} kunidan kechiktirmasdan to'liq va butun holatda ${data.creditorName}ga qaytarib berish majburiyatini olaman.
            
            Ushbu tilxat mening o'z xohishim bilan, hech qanday majburlashlarsiz, sog'lom fikr va aqlim joyida bo'lgan holda yozildi. Fuqarolik kodeksining 733-moddasiga muvofiq, ushbu tilxat qarz shartnomasi o'rniga o'tadi va yuridik kuchga ega.
            
            Tilxatni o'z qo'lim bilan yozdim va imzoladim:
            
            Qarz oluvchi: ${data.debtorName}
            Imzo: _________________
            `;
        }
    }
};


// --- 3. TELEGRAM BOT REAL CODE EXPORT (STANDALONE SCRIPT) ---
const telegramBotStandaloneCode = `/**
 * HUQUSHUNOS AI - TELEGRAM BOT SCRIPT
 * Kutubxonalar: npm install telegraf dotenv
 * Ishga tushirish: node bot_script.js
 */

const { Telegraf } = require('telegraf');
require('dotenv').config();

// Tokenni (.env) fayldan yoki muhitdan o'qish
const BOT_TOKEN = process.env.BOT_TOKEN || 'SIZNING_BOT_TOKENINGIZ';
const bot = new Telegraf(BOT_TOKEN);

// Huquqiy Ma'lumotlar Bazasi
const laws = [
    {
        title: "Ishdan bo'shash tartibi (Mehnat kodeksi 160-modda)",
        keywords: ['bo\\\'shash', 'ishdan ketish', 'ariza', '14 kun', 'ikki hafta'],
        answer: "Xodim o'z xohishi bilan ishdan bo'shash uchun ish beruvchini kamida 2 hafta (14 kun) oldin yozma ariza bilan ogohlantirishi lozim (Mehnat kodeksi, 160-modda). Sinov muddati davrida 3 kun oldin ogohlantiriladi."
    },
    {
        title: "Aliment miqdori (Oila kodeksi 99-modda)",
        keywords: ['aliment', 'bola puli', 'ajrashish', 'ta\'minot'],
        answer: "Voyaga yetmagan bolalar uchun aliment miqdori: 1 ta bolaga daromadning 1/4 (25%), 2 ta bolaga 1/3 (33.3%), 3 ta va undan ortig'iga yarmi (50%) miqdorida undiriladi."
    },
    {
        title: "Qarz va Tilxat (Fuqarolik kodeksi 733-modda)",
        keywords: ['qarz', 'tilxat', 'tilxat yozish'],
        answer: "Qarz summasi BHMning 10 baravaridan (hozirda 3.4 mln so'mdan) oshsa, shartnoma yozma shaklda tuzilishi shart. Tilxat shartnoma o'rniga o'tuvchi yuridik hujjatdir."
    },
    {
        title: "Tonirovka jarimasi (MJtK 126-modda)",
        keywords: ['tonirovka', 'oyna qoraytirish', 'jarima'],
        answer: "Tegishli ruxsatnomasiz oynalarni qoraytirish (tonirovka) BHMning 25 baravari (8 500 000 so'm) miqdorida jarimaga sabab bo'ladi."
    }
];

// Start buyrug'i
bot.start((ctx) => {
    ctx.reply(
        \`Assalomu alaykum, \${ctx.from.first_name}! Men Huqushunos AI botiman.\\n\\nMen sizga O'zbekiston qonunlari bo'yicha maslahat bera olaman. Savolingizni yozib yuboring (masalan: "ishdan bo'shash tartibi", "aliment qancha bo'ladi").\`
    );
});

// Yordam buyrug'i
bot.help((ctx) => {
    ctx.reply("Menga qonunchilikka oid savol yuboring, men kalit so'zlarni tahlil qilib sizga javob qaytaraman.");
});

// Xabarlarni qabul qilish va tahlil qilish
bot.on('text', (ctx) => {
    const text = ctx.message.text.toLowerCase();
    let found = false;

    for (const law of laws) {
        if (law.keywords.some(kw => text.includes(kw))) {
            ctx.reply(\`📝 \${law.title}:\\n\\n\${law.answer}\`);
            found = true;
            break;
        }
    }

    if (!found) {
        ctx.reply("Kechirasiz, ushbu savol bo'yicha ma'lumot topilmadi. Kalit so'zlarni o'zgartirib ko'ring (masalan: aliment, tonirovka, qarz).");
    }
});

// Botni ishga tushirish
bot.launch().then(() => {
    console.log('Huqushunos AI Telegram Boti ishga tushdi...');
});

// Xavfsiz to'xtatish
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
`;


// --- 4. APP STATE AND CONTROLLERS ---
document.addEventListener('DOMContentLoaded', () => {
    // Current Active Tab & Doc
    let currentTab = 'chat';
    let currentDoc = 'resignation';
    
    // Bot Simulator state
    let botSimulatorActive = false;
    let botSimulatorInterval = null;
    let botTokenInput = '';
    
    // DOM Elements
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const menuItems = document.querySelectorAll('.menu-item');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const globalSearch = document.getElementById('globalSearch');
    
    // Chat Elements
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const chatMessages = document.getElementById('chatMessages');
    const suggestBtns = document.querySelectorAll('.suggest-btn');
    
    // Document Generator Elements
    const docTypeBtns = document.querySelectorAll('.doc-type-btn');
    const docForm = document.getElementById('docForm');
    const formTitle = document.getElementById('formTitle');
    const paperPreview = document.getElementById('paperPreview');
    const previewDocBtn = document.getElementById('previewDocBtn');
    const generateDocBtn = document.getElementById('generateDocBtn');
    
    // Modal Elements
    const docModal = document.getElementById('docModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalPaper = document.getElementById('modalPaper');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const printDocBtn = document.getElementById('printDocBtn');
    const copyDocBtn = document.getElementById('copyDocBtn');
    
    // Library Elements
    const libraryGrid = document.getElementById('libraryGrid');
    const libCatBtns = document.querySelectorAll('.lib-cat-btn');
    
    // Telegram Bot Elements
    const botToken = document.getElementById('botToken');
    const toggleTokenVisibility = document.getElementById('toggleTokenVisibility');
    const startBotBtn = document.getElementById('startBotBtn');
    const stopBotBtn = document.getElementById('stopBotBtn');
    const botStatusBadge = document.getElementById('botStatusBadge');
    const consoleBox = document.getElementById('consoleBox');
    const clearLogsBtn = document.getElementById('clearLogsBtn');
    const exportBotCodeBtn = document.getElementById('exportBotCodeBtn');
    
    
    // ==========================================
    // THEME & NAVIGATION CONTROLLERS
    // ==========================================
    
    // Theme toggle
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        themeToggleBtn.innerHTML = isLight 
            ? `<i class="fa-solid fa-sun"></i> <span>Kunduzgi rejim</span>` 
            : `<i class="fa-solid fa-moon"></i> <span>Tungi rejim</span>`;
        addConsoleLog(`[Tizim] Vizual rejim o'zgartirildi: ${isLight ? 'Kunduzgi' : 'Tungi'}`, 'info');
    });
    
    // Tab switching
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const tabId = item.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
    
    function switchTab(tabId) {
        currentTab = tabId;
        
        // Update menu buttons
        menuItems.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
        });
        
        // Update tab panes
        tabPanes.forEach(pane => {
            pane.classList.remove('active');
        });
        
        const activePane = document.getElementById(`${tabId}Tab` || `${tabId}-settingsTab`);
        if (activePane) {
            activePane.classList.add('active');
        } else {
            // Fallback for ID names mismatch
            const fallbackPane = document.getElementById(`${tabId}-settingsTab`) || document.getElementById(`${tabId}Tab`);
            if (fallbackPane) fallbackPane.classList.add('active');
        }
        
        // Extra initializations
        if (tabId === 'docs') {
            loadDocForm(currentDoc);
        } else if (tabId === 'library') {
            renderLibrary();
        }
    }
    
    // Global search input redirects to library and filters
    globalSearch.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            const query = globalSearch.value.trim();
            if (query.length > 0) {
                switchTab('library');
                renderLibrary(query);
                // Highlight search in library
                libCatBtns.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-category') === 'all'));
            }
        }
    });


    // ==========================================
    // CHATBOT SYSTEM CONTROLLER
    // ==========================================
    
    // Handle message sending
    function handleSendMessage() {
        const query = chatInput.value.trim();
        if (!query) return;
        
        // Clear input & auto resize
        chatInput.value = '';
        chatInput.style.height = 'auto';
        
        // Add User Message
        appendMessage(query, 'user');
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Add typing effect loader
        const typingId = appendTypingIndicator();
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Simulate thinking delay (700ms - 1500ms)
        setTimeout(() => {
            removeTypingIndicator(typingId);
            const response = getAIResponse(query);
            appendMessage(response.text, 'system');
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 700 + Math.random() * 800);
    }
    
    sendBtn.addEventListener('click', handleSendMessage);
    
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    });
    
    // Textarea auto-resize
    chatInput.addEventListener('input', () => {
        chatInput.style.height = 'auto';
        chatInput.style.height = (chatInput.scrollHeight) + 'px';
    });
    
    // Click suggested questions
    suggestBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const query = btn.getAttribute('data-query');
            chatInput.value = query;
            handleSendMessage();
        });
    });
    
    function appendMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = sender === 'system' 
            ? `<i class="fa-solid fa-robot"></i>` 
            : `<i class="fa-solid fa-user"></i>`;
            
        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        
        // Parse HTML tags correctly (safe because it only contains database outputs and bold tags)
        bubble.innerHTML = text.replace(/\n/g, '<br>');
        
        msgDiv.appendChild(avatar);
        msgDiv.appendChild(bubble);
        chatMessages.appendChild(msgDiv);
    }
    
    function appendTypingIndicator() {
        const id = 'typing_' + Date.now();
        const msgDiv = document.createElement('div');
        msgDiv.className = `message system-message typing-indicator-msg`;
        msgDiv.id = id;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = `<i class="fa-solid fa-robot"></i>`;
            
        const bubble = document.createElement('div');
        bubble.className = 'message-bubble typing-bubble';
        bubble.innerHTML = `<div class="dots-loading"><span></span><span></span><span></span></div>`;
        
        msgDiv.appendChild(avatar);
        msgDiv.appendChild(bubble);
        chatMessages.appendChild(msgDiv);
        return id;
    }
    
    function removeTypingIndicator(id) {
        const indicator = document.getElementById(id);
        if (indicator) {
            indicator.remove();
        }
    }


    // ==========================================
    // DOCUMENT GENERATOR CONTROLLER
    // ==========================================
    
    // Switch document types
    docTypeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            docTypeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentDoc = btn.getAttribute('data-doc');
            loadDocForm(currentDoc);
        });
    });
    
    function loadDocForm(docType) {
        const docInfo = docTemplates[docType];
        if (!docInfo) return;
        
        formTitle.textContent = `${docInfo.title} ma'lumotlari`;
        docForm.innerHTML = ''; // Clear form
        
        docInfo.fields.forEach(field => {
            const group = document.createElement('div');
            group.className = 'form-group';
            
            const label = document.createElement('label');
            label.setAttribute('for', field.id);
            label.textContent = field.label;
            group.appendChild(label);
            
            let input;
            if (field.type === 'select') {
                input = document.createElement('select');
                input.id = field.id;
                field.options.forEach(opt => {
                    const option = document.createElement('option');
                    option.value = opt.value;
                    option.textContent = opt.label;
                    input.appendChild(option);
                });
            } else {
                input = document.createElement('input');
                input.type = field.type;
                input.id = field.id;
                input.placeholder = field.placeholder || '';
            }
            
            input.value = field.default || '';
            // Live update preview on inputs
            input.addEventListener('input', updatePaperPreview);
            
            group.appendChild(input);
            docForm.appendChild(group);
        });
        
        updatePaperPreview();
    }
    
    function getFormData() {
        const docInfo = docTemplates[currentDoc];
        if (!docInfo) return {};
        
        const data = {};
        docInfo.fields.forEach(field => {
            const input = document.getElementById(field.id);
            if (input) {
                data[field.id] = input.value;
            }
        });
        return data;
    }
    
    function updatePaperPreview() {
        const docInfo = docTemplates[currentDoc];
        if (!docInfo) return;
        
        const data = getFormData();
        const content = docInfo.templateFn(data);
        paperPreview.textContent = content.trim();
    }
    
    // Preview Modal triggers
    previewDocBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const docInfo = docTemplates[currentDoc];
        const data = getFormData();
        const content = docInfo.templateFn(data);
        
        modalTitle.textContent = docInfo.title;
        modalPaper.textContent = content.trim();
        docModal.classList.add('active');
    });
    
    // Close modal
    closeModalBtn.addEventListener('click', () => {
        docModal.classList.remove('active');
    });
    
    docModal.addEventListener('click', (e) => {
        if (e.target === docModal) {
            docModal.classList.remove('active');
        }
    });
    
    // Download action
    generateDocBtn.addEventListener('click', (e) => {
        e.preventDefault();
        downloadDocText();
    });
    
    function downloadDocText() {
        const docInfo = docTemplates[currentDoc];
        const data = getFormData();
        const content = docInfo.templateFn(data);
        
        const element = document.createElement("a");
        const file = new Blob([content.trim()], {type: 'text/plain;charset=utf-8'});
        element.href = URL.createObjectURL(file);
        element.download = `${docInfo.title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        addConsoleLog(`[Tizim] Hujjat muvaffaqiyatli yuklab olindi: ${docInfo.title}`, 'success');
    }
    
    // Modal buttons actions
    printDocBtn.addEventListener('click', () => {
        const text = modalPaper.textContent;
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
            <head>
                <title>${modalTitle.textContent}</title>
                <style>
                    body {
                        font-family: 'Times New Roman', Times, serif;
                        font-size: 14pt;
                        line-height: 1.5;
                        padding: 2cm;
                        white-space: pre-line;
                    }
                </style>
            </head>
            <body>${text}</body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    });
    
    copyDocBtn.addEventListener('click', () => {
        const text = modalPaper.textContent;
        navigator.clipboard.writeText(text).then(() => {
            const originalText = copyDocBtn.innerHTML;
            copyDocBtn.innerHTML = `<i class="fa-solid fa-check"></i> Nusxalandi!`;
            setTimeout(() => {
                copyDocBtn.innerHTML = originalText;
            }, 2000);
        });
    });


    // ==========================================
    // LAWS LIBRARY CONTROLLER
    // ==========================================
    
    // Category click
    libCatBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            libCatBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-category');
            renderLibrary(null, category);
        });
    });
    
    function renderLibrary(searchQuery = null, filterCategory = 'all') {
        libraryGrid.innerHTML = '';
        
        let filteredLaws = legalDatabase.laws;
        
        // Filter by Category
        if (filterCategory !== 'all') {
            filteredLaws = filteredLaws.filter(law => law.category === filterCategory);
        }
        
        // Filter by Search Query
        if (searchQuery) {
            const query = searchQuery.toLowerCase().trim();
            filteredLaws = filteredLaws.filter(law => 
                law.title.toLowerCase().includes(query) || 
                law.summary.toLowerCase().includes(query) || 
                law.code.toLowerCase().includes(query) || 
                law.keywords.some(kw => kw.includes(query))
            );
        }
        
        if (filteredLaws.length === 0) {
            libraryGrid.innerHTML = `
                <div style="grid-column: span 2; text-align: center; padding: 40px; color: var(--text-secondary);">
                    <i class="fa-solid fa-folder-open" style="font-size: 40px; margin-bottom: 16px; color: var(--text-muted);"></i>
                    <p>Hech qanday ma'lumot topilmadi. Boshqa kalit so'zlar orqali qidirib ko'ring.</p>
                </div>
            `;
            return;
        }
        
        filteredLaws.forEach(law => {
            const card = document.createElement('div');
            card.className = 'law-card';
            
            const categoryObj = legalDatabase.categories.find(c => c.id === law.category);
            const categoryName = categoryObj ? categoryObj.name : 'Qonun hujjatlari';
            
            let iconClass = 'fa-solid fa-gavel';
            if (law.category === 'mehnat') iconClass = 'fa-solid fa-briefcase';
            if (law.category === 'oila') iconClass = 'fa-solid fa-people-roof';
            if (law.category === 'fuqarolik') iconClass = 'fa-solid fa-handshake';
            if (law.category === 'ma\'muriy') iconClass = 'fa-solid fa-car-burst';
            if (law.category === 'konstitutsiya') iconClass = 'fa-solid fa-book-open-reader';
            
            card.innerHTML = `
                <div>
                    <div class="law-card-header">
                        <span class="badge">${categoryName}</span>
                        <div class="icon"><i class="${iconClass}"></i></div>
                    </div>
                    <h3>${law.title}</h3>
                    <p>${law.summary}</p>
                </div>
                <button class="btn-card-action" data-law-id="${law.id}">
                    Batafsil o'qish <i class="fa-solid fa-arrow-right-long"></i>
                </button>
            `;
            
            // Add click event for details
            card.querySelector('.btn-card-action').addEventListener('click', () => {
                showLawDetailsModal(law);
            });
            
            libraryGrid.appendChild(card);
        });
    }
    
    function showLawDetailsModal(law) {
        modalTitle.textContent = law.title;
        modalPaper.innerHTML = `
            <div style="font-family: var(--font-body); color: var(--text-primary); line-height: 1.8; text-align: left; white-space: normal;">
                <p style="background-color: var(--bg-tertiary); padding: 8px 14px; border-radius: 6px; font-weight: 600; font-size: 13px; color: var(--primary-light); display: inline-block; margin-bottom: 20px;">
                    <i class="fa-solid fa-book"></i> Hujjat: ${law.code}
                </p>
                <h4 style="font-size: 16px; font-weight: 700; margin-bottom: 12px; font-family: var(--font-heading);">Asosiy tafsilotlar:</h4>
                <p style="font-size: 15px; margin-bottom: 24px; color: var(--text-primary);">${law.details.replace(/\n/g, '<br>')}</p>
                
                <h4 style="font-size: 16px; font-weight: 700; margin-bottom: 12px; font-family: var(--font-heading);">Muhim xulosa:</h4>
                <p style="font-size: 14px; padding: 14px; background-color: rgba(99, 102, 241, 0.06); border-left: 4px solid var(--primary); border-radius: 4px; color: var(--text-secondary); italic;">
                    ${law.summary}
                </p>
            </div>
        `;
        docModal.classList.add('active');
        
        // Hide print and copy buttons for raw articles
        printDocBtn.style.display = 'none';
        copyDocBtn.style.display = 'none';
        
        // Restore buttons when modal closes
        const cleanup = () => {
            printDocBtn.style.display = 'flex';
            copyDocBtn.style.display = 'flex';
            closeModalBtn.removeEventListener('click', cleanup);
            docModal.removeEventListener('click', cleanupOutside);
        };
        const cleanupOutside = (e) => {
            if (e.target === docModal) cleanup();
        };
        closeModalBtn.addEventListener('click', cleanup);
        docModal.addEventListener('click', cleanupOutside);
    }


    // ==========================================
    // TELEGRAM BOT RUNNER SIMULATION
    // ==========================================
    
    // Toggle Token visibility
    toggleTokenVisibility.addEventListener('click', () => {
        const isPassword = botToken.type === 'password';
        botToken.type = isPassword ? 'text' : 'password';
        toggleTokenVisibility.innerHTML = isPassword 
            ? `<i class="fa-solid fa-eye-slash"></i>` 
            : `<i class="fa-solid fa-eye"></i>`;
    });
    
    // Clear logs
    clearLogsBtn.addEventListener('click', () => {
        consoleBox.innerHTML = '<div class="console-line system">[Tizim] Konsol loglari tozalandi.</div>';
    });
    
    function addConsoleLog(text, type = 'info') {
        const line = document.createElement('div');
        const now = new Date();
        const timeStr = `[${now.toTimeString().split(' ')[0]}]`;
        line.className = `console-line ${type}`;
        line.textContent = `${timeStr} ${text}`;
        consoleBox.appendChild(line);
        consoleBox.scrollTop = consoleBox.scrollHeight;
    }
    
    // Export code file
    exportBotCodeBtn.addEventListener('click', () => {
        const element = document.createElement("a");
        const file = new Blob([telegramBotStandaloneCode.trim()], {type: 'text/javascript;charset=utf-8'});
        element.href = URL.createObjectURL(file);
        element.download = "bot_script.js";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        addConsoleLog("[Tizim] Standalone Telegram Bot kodi yuklab olindi (bot_script.js).", 'success');
    });
    
    // Start / Stop Bot
    startBotBtn.addEventListener('click', () => {
        const token = botToken.value.trim();
        if (!token) {
            alert('Iltimos, Telegram Bot Tokeningizni kiriting!');
            addConsoleLog("[Xato] Token kiritilmadi. Botni ishga tushirib bo'lmaydi.", 'error');
            return;
        }
        
        botTokenInput = token;
        startBotBtn.disabled = true;
        startBotBtn.classList.add('disabled');
        botToken.disabled = true;
        
        addConsoleLog("[Bot] Telegram bot ishga tushmoqda...", 'info');
        addConsoleLog(`[Bot] Server bilan bog'lanish... token: ${token.substring(0, 8)}...*****`, 'info');
        
        setTimeout(() => {
            botSimulatorActive = true;
            
            // UI State change
            botStatusBadge.className = 'status-badge running';
            botStatusBadge.innerHTML = `<i class="fa-solid fa-spinner"></i> Faol`;
            stopBotBtn.disabled = false;
            stopBotBtn.classList.remove('disabled');
            
            addConsoleLog("[Bot] @HuquqMaslahatchiBot muvaffaqiyatli ishga tushdi!", 'success');
            addConsoleLog("[Bot] Polling xizmati faol. Telegram xabarlarini tinglash boshlandi...", 'success');
            
            // Start simulation interval
            startLogsSimulation();
            
        }, 1200);
    });
    
    stopBotBtn.addEventListener('click', () => {
        if (!botSimulatorActive) return;
        
        clearInterval(botSimulatorInterval);
        botSimulatorActive = false;
        
        botStatusBadge.className = 'status-badge stopped';
        botStatusBadge.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Faol emas`;
        
        startBotBtn.disabled = false;
        startBotBtn.classList.remove('disabled');
        botToken.disabled = false;
        stopBotBtn.disabled = true;
        stopBotBtn.classList.add('disabled');
        
        addConsoleLog("[Bot] Polling to'xtatildi. Telegram bot aloqadan uzildi.", 'error');
        addConsoleLog("[Tizim] Bot muvaffaqiyatli to'xtatildi.", 'system');
    });
    
    // Simulation of incoming Telegram messages
    const mockUsers = ['@Jasur_Dev', '@Dilnoza_R', '@Azizbek_HR', '@Malika_Law', '@Nodirbek_94'];
    const mockQueries = [
        { q: 'Ishdan bo\'shamoqchi edim arizani qachon yozaman?', r: 'Mehnat kodeksining 160-moddasi yuborildi (14 kunlik ogohlantirish).' },
        { q: 'Aliment miqdorini hisoblab bering', r: 'Oila kodeksining 99-moddasi yuborildi (Bolalar ta\'minoti va foiz stavkalari).' },
        { q: 'Tonirovka jarimasi qancha bo\'ldi', r: 'MJtK 126-moddasi yuborildi (Ruxsatsiz oyna qoraytirish jarimalari).' },
        { q: 'Qarz berganda tilxat yozish shartmi?', r: 'Fuqarolik kodeksining 733-moddasi yuborildi (BHM 10 baravaridan ortiq bo\'lsa yozma shart).' }
    ];
    
    function startLogsSimulation() {
        if (botSimulatorInterval) clearInterval(botSimulatorInterval);
        
        botSimulatorInterval = setInterval(() => {
            const user = mockUsers[Math.floor(Math.random() * mockUsers.length)];
            const queryObj = mockQueries[Math.floor(Math.random() * mockQueries.length)];
            
            addConsoleLog(`[Telegram User ${user}] Savol: "${queryObj.q}"`, 'info');
            setTimeout(() => {
                if (botSimulatorActive) {
                    addConsoleLog(`[Telegram Bot] Javob: ${queryObj.r}`, 'success');
                }
            }, 600);
            
        }, 6000 + Math.random() * 5000); // simulation interval: 6-11 seconds
    }
});
