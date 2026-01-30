const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const statusText = document.getElementById('status');
const questionText = document.getElementById('question');

let scaleMultiplier = 1;
let noClickCount = 0;
let clickHistory = [];

const phrases = [
    "My little pony плаче через тебе",
    "Помилка доступу!",
    "Нейромережа каже: Спробуй ще раз",
    "Як 28 січня? Тобі потрібен чай і кнопка ТАК",
    "Попередження: відмова призведе до завантаження 10 ГБ фурі-порно на твій планшет!",
    "Фурі-порно завантажується... 1%... 5%...",
    "Епштейн би не схвалив твою відповідь",
    "Ти ж хочеш бути моєю Валентинкою?",
    "Lora не приймає таку відповідь",
    "Біологом клянусь, ти тиснеш не туди!",
    "Якщо натиснеш 'Ні' мамин чай не допоможе!",
    "Фурі-порно завантажиться, якщо натиснеш НІ ще раз!",
    "Хтось би вже натиснув ТАК...",
    "Помилка 404: Твоє 'Ні' не знайдено в моєму датасеті",
    "Перезавантаж систему і спробуй знову",
    "Натисни ТАК, будь ласка!",
    "Ти промахнулась!",
    "Спробуй ще раз, я вірю в тебе!",
    "Ти ж не хочеш мене засмутити?",
    "Давай спробуємо ще разок!",
    "Снайпер Трампа і то влучніший",
    "Фуррі фембой чекає на твою відповідь",
    "Запит відхилено Модель навчена тільки на позитивні відповіді",
];
let phraseIndex = 0;

// Функція для збору інформації про пристрій
function getDeviceInfo() {
    return {
        // Браузер
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        
        // Екран
        screenWidth: screen.width,
        screenHeight: screen.height,
        screenColorDepth: screen.colorDepth,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        
        // Пристрій
        deviceMemory: navigator.deviceMemory || 'невідомо',
        hardwareConcurrency: navigator.hardwareConcurrency || 'невідомо',
        
        // Мережа
        connectionType: navigator.connection?.effectiveType || 'невідомо',
        connectionDownlink: navigator.connection?.downlink || 'невідомо',
        
        // Операційна система (визначається з userAgent)
        os: getOS(),
        browser: getBrowser(),
        isMobile: /Mobile|Android|iPhone|iPad|iPod/i.test(navigator.userAgent),
        isTablet: /iPad|Android/i.test(navigator.userAgent) && !/Mobile/i.test(navigator.userAgent),
        
        // Часова зона
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        timezoneOffset: new Date().getTimezoneOffset(),
        
        // Підтримка функцій
        touchSupport: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
        cookiesEnabled: navigator.cookieEnabled,
        
        // Додаткова інформація
        referrer: document.referrer || 'прямий перехід',
        currentURL: window.location.href
    };
}

// Визначення операційної системи
function getOS() {
    const ua = navigator.userAgent;
    if (ua.includes('Win')) return 'Windows';
    if (ua.includes('Mac')) return 'macOS';
    if (ua.includes('Linux')) return 'Linux';
    if (ua.includes('Android')) return 'Android';
    if (ua.includes('iPhone') || ua.includes('iPad')) return 'iOS';
    return 'Невідомо';
}

// Визначення браузера
function getBrowser() {
    const ua = navigator.userAgent;
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('SamsungBrowser')) return 'Samsung Internet';
    if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera';
    if (ua.includes('Trident')) return 'Internet Explorer';
    if (ua.includes('Edge')) return 'Edge';
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Safari')) return 'Safari';
    return 'Невідомо';
}

noBtn.addEventListener('click', () => {
    noClickCount++;
    const timestamp = new Date().toLocaleString('uk-UA', { 
        timeZone: 'Europe/Kyiv',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    // Записуємо кожне натискання "НІ"
    clickHistory.push({
        answer: 'НІ',
        phrase: phrases[phraseIndex],
        time: timestamp,
        clickNumber: noClickCount
    });
    
    scaleMultiplier += 0.5;
    
    const newPadding = 10 * scaleMultiplier;
    const newFontSize = 16 * scaleMultiplier;
    
    yesBtn.style.padding = `${newPadding}px ${newPadding * 2}px`;
    yesBtn.style.fontSize = `${newFontSize}px`;
    
    statusText.innerText = phrases[phraseIndex];
    phraseIndex = (phraseIndex + 1) % phrases.length;

    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 50);
    noBtn.style.position = 'absolute';
    noBtn.style.left = x + 'px';
    noBtn.style.top = y + 'px';
});

yesBtn.addEventListener('click', () => {
    const timestamp = new Date().toLocaleString('uk-UA', { 
        timeZone: 'Europe/Kyiv',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    // Записуємо фінальну відповідь "ТАК"
    clickHistory.push({
        answer: 'ТАК',
        time: timestamp,
        clickNumber: noClickCount + 1
    });
    
    // Збираємо інформацію про пристрій
    const deviceInfo = getDeviceInfo();
    
    // Формуємо детальний звіт
    const report = {
        "🎉 РЕЗУЛЬТАТ": "KIRA IS MY VALENTINE ❤️",
        "⏰ Український час": timestamp,
        "📊 Кількість НІ": noClickCount,
        "🔢 Всього кліків": noClickCount + 1,
        
        // Інформація про пристрій
        "📱 ТИП ПРИСТРОЮ": deviceInfo.isMobile ? 'Мобільний' : (deviceInfo.isTablet ? 'Планшет' : 'Комп\'ютер'),
        "💻 Операційна система": deviceInfo.os,
        "🌐 Браузер": deviceInfo.browser,
        "📐 Розмір екрану": `${deviceInfo.screenWidth}x${deviceInfo.screenHeight}`,
        "🖼️ Розмір вікна": `${deviceInfo.windowWidth}x${deviceInfo.windowHeight}`,
        "🌍 Мова": deviceInfo.language,
        "🕐 Часовий пояс": deviceInfo.timezone,
        "📡 Тип з'єднання": deviceInfo.connectionType,
        "👆 Підтримка тачскріну": deviceInfo.touchSupport ? 'Так' : 'Ні',
        "🍪 Cookies увімкнені": deviceInfo.cookiesEnabled ? 'Так' : 'Ні',
        
        // Детальна історія
        "📜 Детальна історія": clickHistory.map(item => 
            `${item.clickNumber}. ${item.answer} - ${item.time}${item.phrase ? ' (показано: "' + item.phrase + '")' : ''}`
        ).join('\n'),
        
        // Технічні деталі (для детального аналізу)
        "🔧 User Agent": deviceInfo.userAgent,
        "💾 Пам'ять пристрою": deviceInfo.deviceMemory + ' GB',
        "⚙️ Кількість ядер": deviceInfo.hardwareConcurrency,
        "🔗 Посилання": deviceInfo.referrer,
        "📍 URL сторінки": deviceInfo.currentURL
    };
    
    // Відправка на Formspree
    fetch('https://formspree.io/f/xrekyvqa', {
        method: 'POST',
        body: JSON.stringify(report),
        headers: { 'Content-Type': 'application/json' }
    }).then(response => {
        console.log('Дані відправлено!', response);
    }).catch(error => {
        console.error('Помилка:', error);
    });

    document.getElementById('main-card').innerHTML = `
        <h1 style="color: #f472b6;">Dataset Complete! ❤️</h1>
        <p>Yeeey! Я знаю, що ти не хочеш мене засмутити!<br>До зустрічі в школі!</p>
        <p style="font-size: 0.8rem; color: #94a3b8; margin-top: 20px;">
            Статистика: ${noClickCount} спроб відмовити 😄
        </p>
    `;
});