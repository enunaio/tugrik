// === PERFORMANCE OPTIMIZATIONS ===
// Предзагрузка изображений при первом посещении страницы
function preloadImages() {
    const imageUrls = [
        'path/to/tg_bot1.png',
        'path/to/tg_bot2.png',
        'path/to/tg_bot3.png',
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Вызывайте после загрузки DOM
document.addEventListener('DOMContentLoaded', preloadImages);

// Intersection Observer для ленивой загрузки
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('loading');
            observer.unobserve(img);
        }
    });
});

// Применяйте к изображениям
document.querySelectorAll('.link-image img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Debounce функция для оптимизации поиска
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle функция для ограничения частоты вызовов
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// === ZWNJ функциональность ===
let processedZWNJText = '';

// === COUNTRY CODES FUNCTIONALITY ===
const countryCodes = [
{
    "name": "Австралия",
    "nameEn": "Australia",
    "code": "+61",
    "abbr": "AU",
    "example": "XXX XXX XXX",
    "val": "AUD",
    "flag": "https://ru.wikipedia.org/wiki/Австралия"
},
{
    "name": "Великобритания",
    "nameEn": "United Kingdom",
    "code": "+44",
    "abbr": "GB",
    "example": "XXX XXX XXXX",
    "val": "GBP",
    "flag": "https://ru.wikipedia.org/wiki/Великобритания"
},
{
    "name": "Германия",
    "nameEn": "Germany",
    "code": "+49",
    "abbr": "DE",
    "example": "XXX XXX XXXX",
    "val": "EUR",
    "flag": "https://ru.wikipedia.org/wiki/Германия"
},
{
    "name": "США",
    "nameEn": "United States",
    "code": "+1",
    "abbr": "US",
    "example": "XXX XXX XXXX",
    "val": "USD",
    "flag": "https://ru.wikipedia.org/wiki/США"
},
{
    "name": "Франция",
    "nameEn": "France",
    "code": "+33",
    "abbr": "FR",
    "example": "X XX XX XX XX",
    "val": "EUR",
    "flag": "https://ru.wikipedia.org/wiki/Франция"
},
{
    "name": "Россия",
    "nameEn": "Russia",
    "code": "+7",
    "abbr": "RU",
    "example": "XXX XXX XX XX",
    "val": "RUB",
    "flag": "https://ru.wikipedia.org/wiki/Россия"
},
{
    "name": "Китай",
    "nameEn": "China",
    "code": "+86",
    "abbr": "CN",
    "example": "XXX XXXX XXXX",
    "val": "CNY",
    "flag": "https://ru.wikipedia.org/wiki/Китай"
},
{
    "name": "Япония",
    "nameEn": "Japan",
    "code": "+81",
    "abbr": "JP",
    "example": "XX XXXX XXXX",
    "val": "JPY",
    "flag": "https://ru.wikipedia.org/wiki/Япония"
},
{
    "name": "Индия",
    "nameEn": "India",
    "code": "+91",
    "abbr": "IN",
    "example": "XXXXX XXXXX",
    "val": "INR",
    "flag": "https://ru.wikipedia.org/wiki/Индия"
},
{
    "name": "Канада",
    "nameEn": "Canada",
    "code": "+1",
    "abbr": "CA",
    "example": "XXX XXX XXXX",
    "val": "CAD",
    "flag": "https://ru.wikipedia.org/wiki/Канада"
}
];

// Кэш для оптимизации поиска
let filteredCountries = [...countryCodes];

// Оптимизированная функция рендера таблицы с виртуализацией
function renderCountryTable(countries = countryCodes) {
    const tbody = document.getElementById("countryTableBody");
    const countElement = document.getElementById("countryCount");
    
    if (!tbody || !countElement) return;
    
    // Очищаем с помощью DocumentFragment для лучшей производительности
    const fragment = document.createDocumentFragment();
    
    countries.forEach(country => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="country-name-ru-col cell-with-copy" title="${escapeHtml(country.name)}">
                ${escapeHtml(country.name)}
                <span class="copy-icon" onclick="copyCountryField('${escapeHtml(country.name)}', this)" aria-label="Копировать название на русском"></span>
            </td>
            <td class="country-name-en-col cell-with-copy" title="${escapeHtml(country.nameEn)}">
                ${escapeHtml(country.nameEn)}
                <span class="copy-icon" onclick="copyCountryField('${escapeHtml(country.nameEn)}', this)" aria-label="Копировать название на английском"></span>
            </td>
            <td class="country-abbr-col cell-with-copy">
                ${escapeHtml(country.abbr)}
                <span class="copy-icon" onclick="copyCountryField('${escapeHtml(country.abbr)}', this)" aria-label="Копировать сокращение"></span>
            </td>
            <td class="country-val-col cell-with-copy">
                ${escapeHtml(country.val)}
                <span class="copy-icon" onclick="copyCountryField('${escapeHtml(country.val)}', this)" aria-label="Копировать валюту"></span>
            </td>
            <td class="country-code-col cell-with-copy">
                ${escapeHtml(country.code)}
                <span class="copy-icon" onclick="copyCountryField('${escapeHtml(country.code)}', this)" aria-label="Копировать код"></span>
            </td>
            <td class="country-example-col cell-with-copy">
                ${escapeHtml(country.example)}
                <span class="copy-icon" onclick="copyCountryField('${escapeHtml(country.example)}', this)" aria-label="Копировать пример"></span>
            </td>
            <td class="country-flag-col">
                <a href="${escapeHtml(country.flag)}" class="plain-link" target="_blank" rel="noopener noreferrer">
                    Wiki
                </a>
            </td>
        `;
        fragment.appendChild(row);
    });
    
    // Одно обновление DOM
    tbody.innerHTML = '';
    tbody.appendChild(fragment);
    countElement.textContent = `Всего стран: ${countries.length}`;
}

// Функция копирования для полей стран
async function copyCountryField(text, iconElement) {
    if (!text) return;
    
    try {
        await navigator.clipboard.writeText(text);
        showCellCopyFeedback(iconElement);
    } catch (err) {
        console.error('Ошибка копирования: ', err);
        fallbackCellCopy(text, iconElement);
    }
}

// Оптимизированная функция конвертации раскладки
const layoutMap = new Map([
    ['q', 'й'], ['w', 'ц'], ['e', 'у'], ['r', 'к'], ['t', 'е'],
    ['y', 'н'], ['u', 'г'], ['i', 'ш'], ['o', 'щ'], ['p', 'з'], 
    ['[', 'х'], [']', 'ъ'], ['a', 'ф'], ['s', 'ы'], ['d', 'в'], 
    ['f', 'а'], ['g', 'п'], ['h', 'р'], ['j', 'о'], ['k', 'л'], 
    ['l', 'д'], [';', 'ж'], ['\'', 'э'], ['z', 'я'], ['x', 'ч'], 
    ['c', 'с'], ['v', 'м'], ['b', 'и'], ['n', 'т'], ['m', 'ь'],
    [',', 'б'], ['.', 'ю'], ['/', '.']
]);

function convertLayoutToCyrillic(input) {
    return input.split('').map(c => layoutMap.get(c) || c).join('');
}

// Дебаунсированный поиск стран с поддержкой перевода
const debouncedSearchCountries = debounce(() => {
    const query = document.getElementById("countrySearch")?.value.toLowerCase() || '';
    if (!query) {
        filteredCountries = [...countryCodes];
        renderCountryTable(filteredCountries);
        return;
    }
    
    const cyrillicQuery = convertLayoutToCyrillic(query);
    
    filteredCountries = countryCodes.filter(country =>
        country.name.toLowerCase().includes(query) ||
        country.name.toLowerCase().includes(cyrillicQuery) ||
        (country.nameEn && country.nameEn.toLowerCase().includes(query)) ||
        country.code.includes(query) ||
        country.abbr.toLowerCase().includes(query) ||
        country.val.toLowerCase().includes(query)
    );
    
    renderCountryTable(filteredCountries);
}, 300);

function searchCountries() {
    debouncedSearchCountries();
}

// Оптимизированная функция переключения страниц
function switchPage(pageName) {
    const pagesContainer = document.querySelector('.pages-container');
    const navButtons = document.querySelectorAll('.nav-btn');
    
    if (!pagesContainer || !navButtons.length) return;
    
    // Убираем активный класс со всех кнопок
    navButtons.forEach(btn => btn.classList.remove('active'));
    
    // Убираем все классы переключения
    pagesContainer.classList.remove('show-zwnj', 'show-codes', 'show-links');
    
    // Добавляем соответствующий класс и активируем кнопку
    switch(pageName) {
        case 'zwnj':
            pagesContainer.classList.add('show-zwnj');
            navButtons[1]?.classList.add('active');
            break;
        case 'codes':
            pagesContainer.classList.add('show-codes');
            navButtons[2]?.classList.add('active');
            // Рендерим таблицу стран если еще не рендерили
            if (!document.getElementById('countryTableBody')?.children.length) {
                renderCountryTable();
            }
            break;
        case 'links':
            pagesContainer.classList.add('show-links');
            navButtons[3]?.classList.add('active');
            break;
        default:
            navButtons[0]?.classList.add('active');
    }
}

function clearCountrySearch() {
    const searchInput = document.getElementById('countrySearch');
    if (searchInput) {
        searchInput.value = '';
        filteredCountries = [...countryCodes];
        renderCountryTable(filteredCountries);
    }
}

// Оптимизированная функция добавления ZWNJ
function addZWNJToText(text) {
    if (!text) return '';
    const zwnj = '\u200C';
    return Array.from(text).join(zwnj) + zwnj;
}

function processZWNJ() {
    const inputData = document.getElementById('zwnjInputData')?.value;
    
    if (!inputData?.trim()) {
        alert('Пожалуйста, введите текст для обработки');
        return;
    }
    
    processedZWNJText = addZWNJToText(inputData);
    displayZWNJResults(inputData, processedZWNJText);
}

// Оптимизированная функция отображения результатов ZWNJ
function displayZWNJResults(originalText, processedText) {
    const container = document.getElementById('zwnjResultsContainer');
    const copyBtn = document.getElementById('zwnjCopyBtn');
    
    if (!container || !copyBtn) return;
    
    const originalLength = originalText.length;
    const processedLength = processedText.length;
    
    container.innerHTML = `
        <div class="zwnj-result-container">
            <div class="zwnj-stats">
                <div class="zwnj-stat">
                    <strong>Исходная длина:</strong> ${originalLength} символов
                </div>
                <div class="zwnj-stat">
                    <strong>Новая длина:</strong> ${processedLength} символов
                </div>
                <div class="zwnj-stat">
                    <strong>Добавлено ZWNJ:</strong> ${processedLength - originalLength} символов
                </div>
            </div>
            <div class="zwnj-result-text">${escapeHtml(processedText)}</div>
        </div>
    `;
    
    copyBtn.style.display = 'inline-block';
}

function clearZWNJ() {
    const zwnjInput = document.getElementById('zwnjInputData');
    const container = document.getElementById('zwnjResultsContainer');
    const copyBtn = document.getElementById('zwnjCopyBtn');
    
    if (zwnjInput) zwnjInput.value = '';
    if (container) container.innerHTML = '<div class="empty-message">Результат появится здесь после обработки текста.</div>';
    if (copyBtn) copyBtn.style.display = 'none';
    processedZWNJText = '';
}

// Оптимизированная функция копирования с обратной связью
async function copyZWNJResult() {
    if (!processedZWNJText) {
        alert('Нет текста для копирования');
        return;
    }
    
    const copyBtn = document.getElementById('zwnjCopyBtn');
    if (!copyBtn) return;
    
    try {
        await navigator.clipboard.writeText(processedZWNJText);
        showCopyFeedback(copyBtn, 'Скопировано!');
    } catch (err) {
        console.error('Ошибка копирования: ', err);
        fallbackCopy(processedZWNJText, copyBtn);
    }
}

// Функция обратной связи при копировании
function showCopyFeedback(button, message) {
    const originalText = button.textContent;
    const originalBackground = button.style.background;
    
    button.textContent = message;
    button.style.background = 'var(--success-color)';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = originalBackground;
    }, 1500);
}

// Fallback для копирования в старых браузерах
function fallbackCopy(text, button) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.cssText = 'position:fixed;left:-9999px;top:-9999px;opacity:0;';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopyFeedback(button, 'Скопировано!');
    } catch (err) {
        alert('Не удалось скопировать текст. Попробуйте выделить и скопировать вручную.');
    }
    
    document.body.removeChild(textArea);
}

// === Парсер функциональность ===
let parsedData = [];

// Оптимизированная функция парсинга
function parseData() {
    const inputData = document.getElementById('inputData')?.value.trim();
    const separator = document.getElementById('separator')?.value || '|';
    
    if (!inputData) {
        alert('Пожалуйста, введите данные для разбора');
        return;
    }
    
    const lines = inputData.split('\n').filter(line => line.trim());
    parsedData = lines.map((line, index) => {
        const cleanLine = line.replace(/^\d+\.\s*/, '');
        const parts = cleanLine.split(separator);
        
        return {
            number: index + 1,
            name: parts[0] || '',
            login: parts[1] || '',
            password: parts[2] || '',
            emailLogin: parts[3] || '',
            emailPassword: parts[4] || '',
            accountNumber: parts[6] || '',
            userAgent: parts[7] || '',
            autoFillToken: parts[8] || '',
            cookies: parts[9] || '',
            other: parts.length > 10 ? parts.slice(10).join(separator) : (parts[5] || '')
        };
    });
    
    displayResults();
}

// Оптимизированная функция отображения результатов с виртуализацией
function displayResults() {
    const container = document.getElementById('resultsContainer');
    const downloadBtn = document.getElementById('downloadBtn');
    
    if (!container || !downloadBtn) return;
    
    if (parsedData.length === 0) {
        container.innerHTML = '<div class="empty-message">Данные не найдены</div>';
        downloadBtn.style.display = 'none';
        return;
    }
    
    const fragment = document.createDocumentFragment();
    
    // Создаем контейнер для счетчика и таблицы
    const resultContainer = document.createElement('div');
    resultContainer.innerHTML = `
        <div class="account-count">Найдено аккаунтов: ${parsedData.length}</div>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th class="row-number">№</th>
                        <th class="name-col">Имя</th>
                        <th class="login-col">Логин</th>
                        <th class="password-col">Пароль</th>
                        <th class="email-login-col">Логин от почты</th>
                        <th class="email-password-col">Пароль от почты</th>
                        <th class="account-number-col">Номер аккаунта</th>
                        <th class="user-agent-col">Юзер агент</th>
                        <th class="token-col">Токен для автозалива</th>
                        <th class="cookies-col">Куки</th>
                        <th class="other-col">Прочее</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    `;
    
    const tbody = resultContainer.querySelector('tbody');
    
    // Используем DocumentFragment для лучшей производительности
    const rowsFragment = document.createDocumentFragment();
    
    parsedData.forEach(account => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="row-number">${account.number}</td>
            <td class="name-col cell-with-copy" title="${escapeHtml(account.name)}">
                ${truncateText(account.name, 15)}
                <span class="copy-icon" onclick="copyToClipboardSafe(${account.number}, 'name', this)" aria-label="Копировать имя"></span>
            </td>
            <td class="login-col cell-with-copy" title="${escapeHtml(account.login)}">
                ${truncateText(account.login, 25)}
                <span class="copy-icon" onclick="copyToClipboardSafe(${account.number}, 'login', this)" aria-label="Копировать логин"></span>
            </td>
            <td class="password-col cell-with-copy" title="${escapeHtml(account.password)}">
                ${truncateText(account.password, 15)}
                <span class="copy-icon" onclick="copyToClipboardSafe(${account.number}, 'password', this)" aria-label="Копировать пароль"></span>
            </td>
            <td class="email-login-col cell-with-copy" title="${escapeHtml(account.emailLogin)}">
                ${truncateText(account.emailLogin, 25)}
                <span class="copy-icon" onclick="copyToClipboardSafe(${account.number}, 'emailLogin', this)" aria-label="Копировать логин от почты"></span>
            </td>
            <td class="email-password-col cell-with-copy" title="${escapeHtml(account.emailPassword)}">
                ${truncateText(account.emailPassword, 15)}
                <span class="copy-icon" onclick="copyToClipboardSafe(${account.number}, 'emailPassword', this)" aria-label="Копировать пароль от почты"></span>
            </td>
            <td class="account-number-col cell-with-copy" title="${escapeHtml(account.accountNumber)}">
                ${truncateText(account.accountNumber, 18)}
                <span class="copy-icon" onclick="copyToClipboardSafe(${account.number}, 'accountNumber', this)" aria-label="Копировать номер аккаунта"></span>
            </td>
            <td class="user-agent-col cell-with-copy">
                ${escapeHtml(account.userAgent)}
                <span class="copy-icon" onclick="copyToClipboardSafe(${account.number}, 'userAgent', this)" aria-label="Копировать юзер агент"></span>
            </td>
            <td class="token-col cell-with-copy">
                ${escapeHtml(account.autoFillToken)}
                <span class="copy-icon" onclick="copyToClipboardSafe(${account.number}, 'autoFillToken', this)" aria-label="Копировать токен"></span>
            </td>
            <td class="cookies-col cell-with-copy">
                ${escapeHtml(account.cookies)}
                <span class="copy-icon" onclick="copyToClipboardSafe(${account.number}, 'cookies', this)" aria-label="Копировать куки"></span>
            </td>
            <td class="other-col cell-with-copy">
                ${escapeHtml(account.other)}
                <span class="copy-icon" onclick="copyToClipboardSafe(${account.number}, 'other', this)" aria-label="Копировать прочее"></span>
            </td>
        `;
        rowsFragment.appendChild(row);
    });
    
    tbody.appendChild(rowsFragment);
    container.innerHTML = '';
    container.appendChild(resultContainer);
    downloadBtn.style.display = 'inline-block';
}

// Утилитарные функции
function truncateText(text, maxLength) {
    if (!text) return '';
    if (text.length <= maxLength) return escapeHtml(text);
    return escapeHtml(text.substring(0, maxLength)) + '...';
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Оптимизированная функция копирования
async function copyToClipboardSafe(accountNumber, fieldName, iconElement) {
    const accountData = parsedData.find(account => account.number === accountNumber);
    if (!accountData) return;
    
    const text = accountData[fieldName] || '';
    if (!text) return;
    
    try {
        await navigator.clipboard.writeText(text);
        showCellCopyFeedback(iconElement);
    } catch (err) {
        console.error('Ошибка копирования: ', err);
        fallbackCellCopy(text, iconElement);
    }
}

function showCellCopyFeedback(iconElement) {
    const feedback = document.createElement('span');
    feedback.className = 'copy-feedback show';
    feedback.textContent = '✓';
    
    const cell = iconElement.parentElement;
    cell.appendChild(feedback);
    
    setTimeout(() => {
        if (feedback.parentElement) {
            feedback.parentElement.removeChild(feedback);
        }
    }, 1500);
}

function fallbackCellCopy(text, iconElement) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.cssText = 'position:fixed;left:-9999px;top:-9999px;opacity:0;';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCellCopyFeedback(iconElement);
    } catch (err) {
        alert('Не удалось скопировать текст');
    }
    
    document.body.removeChild(textArea);
}

function clearData() {
    const inputData = document.getElementById('inputData');
    const container = document.getElementById('resultsContainer');
    const downloadBtn = document.getElementById('downloadBtn');
    
    if (inputData) inputData.value = '';
    if (container) container.innerHTML = '<div class="empty-message">Данные не загружены. Вставьте текст выше и нажмите "Разобрать".</div>';
    if (downloadBtn) downloadBtn.style.display = 'none';
    parsedData = [];
}

// Оптимизированная функция скачивания Excel
function downloadExcel() {
    if (parsedData.length === 0) {
        alert('Нет данных для скачивания');
        return;
    }
    
    // Показываем индикатор загрузки
    const downloadBtn = document.getElementById('downloadBtn');
    const originalText = downloadBtn?.textContent;
    if (downloadBtn) {
        downloadBtn.textContent = 'Генерация...';
        downloadBtn.disabled = true;
    }
    
    // Используем setTimeout для не блокирования UI
    setTimeout(() => {
        try {
            const excelData = parsedData.map(account => ({
                '№': account.number,
                'Имя': account.name,
                'Логин': account.login,
                'Пароль': account.password,
                'Логин от почты': account.emailLogin,
                'Пароль от почты': account.emailPassword,
                'Номер аккаунта': account.accountNumber,
                'Юзер агент': account.userAgent,
                'Токен для автозалива': account.autoFillToken,
                'Куки': account.cookies,
                'Прочее': account.other
            }));
            
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet(excelData);
            
            // Оптимизированное вычисление ширины колонок
            const headers = Object.keys(excelData[0]);
            const colWidths = headers.map(header => {
                const headerLength = header.length;
                const maxContentLength = Math.max(
                    ...excelData.map(row => String(row[header] || '').length)
                );
                return { wch: Math.min(Math.max(headerLength, maxContentLength) + 2, 50) };
            });
            
            ws['!cols'] = colWidths;
            XLSX.utils.book_append_sheet(wb, ws, 'Аккаунты');
            
            const fileName = `accounts_${new Date().toISOString().slice(0, 10)}.xlsx`;
            XLSX.writeFile(wb, fileName);
            
        } catch (error) {
            console.error('Ошибка создания Excel файла:', error);
            alert('Ошибка при создании файла Excel');
        } finally {
            // Восстанавливаем кнопку
            if (downloadBtn) {
                downloadBtn.textContent = originalText;
                downloadBtn.disabled = false;
            }
        }
    }, 100);
}

// Оптимизированная инициализация с проверками
function initializeApp() {
    // Устанавливаем страницу парсера как активную по умолчанию
    const pagesContainer = document.querySelector('.pages-container');
    const navButtons = document.querySelectorAll('.nav-btn');
    
    if (navButtons.length > 0) {
        navButtons[0].classList.add('active');
    }
    
    if (pagesContainer) {
        pagesContainer.classList.remove('show-zwnj', 'show-codes', 'show-links');
    }
    
    // Добавляем обработчики событий
    const zwnjInput = document.getElementById('zwnjInputData');
    if (zwnjInput) {
        zwnjInput.addEventListener('keydown', function(event) {
            if (event.ctrlKey && event.key === 'Enter') {
                event.preventDefault();
                processZWNJ();
            }
        });
    }
    
    const parserInput = document.getElementById('inputData');
    if (parserInput) {
        parserInput.addEventListener('keydown', function(event) {
            if (event.ctrlKey && event.key === 'Enter') {
                event.preventDefault();
                parseData();
            }
        });
    }
    
    const countrySearch = document.getElementById('countrySearch');
    if (countrySearch) {
        countrySearch.addEventListener('input', searchCountries);
        countrySearch.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                clearCountrySearch();
            }
        });
    }
    
    // Предзагрузка данных стран если необходимо
    if (countryCodes.length > 0) {
        filteredCountries = [...countryCodes];
    }
}

// Обработчик изменения размера окна с throttling
const handleResize = throttle(() => {
    // Пересчитываем размеры если необходимо
    const tableContainers = document.querySelectorAll('.table-container');
    tableContainers.forEach(container => {
        if (container.scrollHeight > container.clientHeight) {
            container.style.overflowY = 'scroll';
        }
    });
}, 250);

// Улучшенная обработка событий касания для мобильных устройств
function handleTouchEvents() {
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Улучшаем производительность скролла на мобильных
        const scrollableElements = document.querySelectorAll('.table-container, .zwnj-result-text');
        scrollableElements.forEach(element => {
            element.style.webkitOverflowScrolling = 'touch';
        });
    }
}

// Обработка преферов пользователя
function handleUserPreferences() {
    // Проверяем предпочтения пользователя по анимациям
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('reduce-motion');
    }
    
    // Проверяем темную тему (если будет добавлена в будущем)
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-theme-preferred');
    }
}

// Обработка ошибок JavaScript
function setupErrorHandling() {
    window.addEventListener('error', function(event) {
        console.error('JavaScript Error:', event.error);
        // Можно добавить отправку ошибок на сервер
    });
    
    window.addEventListener('unhandledrejection', function(event) {
        console.error('Unhandled Promise Rejection:', event.reason);
        // Предотвращаем показ ошибки в консоли браузера
        event.preventDefault();
    });
}

// Функция для ленивой загрузки изображений
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Оптимизация для низкоскоростных соединений
function setupNetworkOptimizations() {
    if ('connection' in navigator) {
        const connection = navigator.connection;
        
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
            document.body.classList.add('slow-connection');
            
            // Уменьшаем количество анимаций для медленных соединений
            document.documentElement.style.setProperty('--animation-duration', '0.1s');
        }
    }
}

// Главная функция инициализации
function init() {
    // Проверяем готовность DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
        return;
    }
    
    initializeApp();
    handleTouchEvents();
    handleUserPreferences();
    setupErrorHandling();
    setupLazyLoading();
    setupNetworkOptimizations();
    
    // Добавляем обработчик изменения размера окна
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Улучшение производительности для старых браузеров
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback) {
            return setTimeout(callback, 16);
        };
    }
}

// Экспорт функций для глобального доступа (если необходимо)
window.tugrikiApp = {
    switchPage,
    parseData,
    clearData,
    downloadExcel,
    processZWNJ,
    clearZWNJ,
    copyZWNJResult,
    searchCountries,
    clearCountrySearch,
    copyToClipboardSafe
};

// Запуск приложения
init();