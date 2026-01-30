const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const statusText = document.getElementById('status');
const questionText = document.getElementById('question');

let scaleMultiplier = 1;
let noClickCount = 0;
let clickHistory = [];

const phrases = [
    "Помилка доступу!",
    "Нейромережа каже: Спробуй ще раз",
    "Як 28 січня? Тобі потрібен чай і кнопка ТАК",
    "Lora не приймає таку відповідь",
    "Біологом клянусь, ти тиснеш не туди!",
    "Фурі-порно завантажиться, якщо натиснеш НІ ще раз!",
    "Хтось би вже натиснув ТАК...",
    "Перезавантаж систему і спробуй знову",
    "Ти ж хочеш бути моєю Валентинкою?",
    "Натисни ТАК, будь ласка!",
    "Ти промахнулась!",
    "Спробуй ще раз, я вірю в тебе!",
    "Ти ж не хочеш мене засмутити?",
    "Давай спробуємо ще разок!",
    "Снайпер Трампа і то влучніший",
    "Епштейн би не схвалив твою відповідь",
    "My little pony плаче через тебе",
    "Фуррі фембой чекає на твою відповідь",
    "Помилка 404: Твоє 'Ні' не знайдено в моєму датасеті",
    "Запит відхилено Модель навчена тільки на позитивні відповіді",
    "Якщо натиснеш 'Ні' мамин чай не допоможе!",
    "Попередження: відмова призведе до завантаження 10 ГБ фурі-порно на твій планшет!",
    "Фурі-порно завантажується... 1%... 5%..."
];
let phraseIndex = 0;

noBtn.addEventListener('click', () => {
    noClickCount++;
    const timestamp = new Date().toLocaleString('uk-UA');
    
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
    const timestamp = new Date().toLocaleString('uk-UA');
    
    // Записуємо фінальну відповідь "ТАК"
    clickHistory.push({
        answer: 'ТАК',
        time: timestamp,
        clickNumber: noClickCount + 1
    });
    
    // Формуємо детальний звіт
    const report = {
        finalAnswer: "KIRA IS MY VALENTINE ❤️",
        totalNoClicks: noClickCount,
        totalClicks: noClickCount + 1,
        finalTime: timestamp,
        clickHistory: clickHistory,
        detailedReport: clickHistory.map(item => 
            `${item.clickNumber}. ${item.answer} - ${item.time}${item.phrase ? ' (показано: "' + item.phrase + '")' : ''}`
        ).join('\n')
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
        <p>Yeeey! Ви успішно встановили Neural Link!<br>До зустрічі в школі!</p>
        <p style="font-size: 0.8rem; color: #94a3b8; margin-top: 20px;">
            Статистика: ${noClickCount} спроб відмовити 😄
        </p>
    `;
});