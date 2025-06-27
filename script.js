let parsedData = [];

function parseData() {
    const inputData = document.getElementById('inputData').value.trim();
    const separator = document.getElementById('separator').value || '|';
    
    if (!inputData) {
        alert('Пожалуйста, введите данные для разбора');
        return;
    }
    
    const lines = inputData.split('\n').filter(line => line.trim());
    parsedData = [];
    
    lines.forEach((line, index) => {
        // Удаляем номер строки в начале (например "1. ")
        const cleanLine = line.replace(/^\d+\.\s*/, '');
        const parts = cleanLine.split(separator);
        
        // Правильное распределение по колонкам согласно вашему примеру:
        // 0: Имя (Alyssa Hsiao)
        // 1: Логин (xtdelsew@lamesamail.com) 
        // 2: Пароль (iB871HQO74)
        // 3: Логин от почты (xtdelsew@lamesamail.com)
        // 4: Пароль от почты (qvhcerufX9931)
        // 5: Пустое поле
        // 6: Номер аккаунта (61569830679878)
        // 7: Юзер агент (Mozilla/5.0...)
        // 8: Токен для автозалива (EAABsbCS1iHg...)
        // 9: Куки ([{"domain":".facebook.com"...}])
        // 10+: Прочее (все остальное)
        
        parsedData.push({
            number: index + 1,
            name: parts[0] || '',
            login: parts[1] || '',
            password: parts[2] || '',
            emailLogin: parts[3] || '',
            emailPassword: parts[4] || '',
            accountNumber: parts[6] || '', // Пропускаем parts[5] (пустое поле)
            userAgent: parts[7] || '',
            autoFillToken: parts[8] || '',
            cookies: parts[9] || '',
            other: parts.length > 10 ? parts.slice(10).join(separator) : (parts[5] || '') // Включаем parts[5] в прочее если есть
        });
    });
    
    displayResults();
}

function displayResults() {
    const container = document.getElementById('resultsContainer');
    const downloadBtn = document.getElementById('downloadBtn');
    
    if (parsedData.length === 0) {
        container.innerHTML = '<div class="empty-message">Данные не найдены</div>';
        downloadBtn.style.display = 'none';
        return;
    }
    
    let html = `
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
    `;
    
    parsedData.forEach(account => {
        html += `
            <tr>
                <td class="row-number">${account.number}</td>
                <td class="name-col cell-with-copy" title="${escapeHtml(account.name)}">
                    ${truncateText(account.name, 15)}
                    <span class="copy-icon" onclick="copyToClipboard('${escapeForJs(account.name)}', this)"></span>
                </td>
                <td class="login-col cell-with-copy" title="${escapeHtml(account.login)}">
                    ${truncateText(account.login, 25)}
                    <span class="copy-icon" onclick="copyToClipboard('${escapeForJs(account.login)}', this)"></span>
                </td>
                <td class="password-col cell-with-copy" title="${escapeHtml(account.password)}">
                    ${truncateText(account.password, 15)}
                    <span class="copy-icon" onclick="copyToClipboard('${escapeForJs(account.password)}', this)"></span>
                </td>
                <td class="email-login-col cell-with-copy" title="${escapeHtml(account.emailLogin)}">
                    ${truncateText(account.emailLogin, 25)}
                    <span class="copy-icon" onclick="copyToClipboard('${escapeForJs(account.emailLogin)}', this)"></span>
                </td>
                <td class="email-password-col cell-with-copy" title="${escapeHtml(account.emailPassword)}">
                    ${truncateText(account.emailPassword, 15)}
                    <span class="copy-icon" onclick="copyToClipboard('${escapeForJs(account.emailPassword)}', this)"></span>
                </td>
                <td class="account-number-col cell-with-copy" title="${escapeHtml(account.accountNumber)}">
                    ${truncateText(account.accountNumber, 18)}
                    <span class="copy-icon" onclick="copyToClipboard('${escapeForJs(account.accountNumber)}', this)"></span>
                </td>
                <td class="user-agent-col cell-with-copy">
                    ${escapeHtml(account.userAgent)}
                    <span class="copy-icon" onclick="copyToClipboardSafe(${account.number}, 'userAgent', this)"></span>
                </td>
                <td class="token-col cell-with-copy">
                    ${escapeHtml(account.autoFillToken)}
                    <span class="copy-icon" onclick="copyToClipboardSafe(${account.number}, 'autoFillToken', this)"></span>
                </td>
                <td class="cookies-col cell-with-copy">
                    ${escapeHtml(account.cookies)}
                    <span class="copy-icon" onclick="copyToClipboardSafe(${account.number}, 'cookies', this)"></span>
                </td>
                <td class="other-col cell-with-copy">
                    ${escapeHtml(account.other)}
                    <span class="copy-icon" onclick="copyToClipboardSafe(${account.number}, 'other', this)"></span>
                </td>
            </tr>
        `;
    });
    
    html += `
                </tbody>
            </table>
        </div>
    `;
    
    container.innerHTML = html;
    downloadBtn.style.display = 'inline-block';
}

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

function escapeForJs(text) {
    if (!text) return '';
    return text.replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r');
}

function copyToClipboard(text, iconElement) {
    if (!text) return;
    
    navigator.clipboard.writeText(text).then(() => {
        // Показываем feedback
        const feedback = document.createElement('span');
        feedback.className = 'copy-feedback show';
        feedback.textContent = 'Скопировано!';
        
        const cell = iconElement.parentElement;
        cell.appendChild(feedback);
        
        // Убираем feedback через 1.5 секунды
        setTimeout(() => {
            if (feedback.parentElement) {
                feedback.parentElement.removeChild(feedback);
            }
        }, 1500);
    }).catch(err => {
        console.error('Ошибка копирования: ', err);
        // Fallback для старых браузеров
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            // Показываем feedback
            const feedback = document.createElement('span');
            feedback.className = 'copy-feedback show';
            feedback.textContent = 'Скопировано!';
            
            const cell = iconElement.parentElement;
            cell.appendChild(feedback);
            
            setTimeout(() => {
                if (feedback.parentElement) {
                    feedback.parentElement.removeChild(feedback);
                }
            }, 1500);
        } catch (err) {
            alert('Не удалось скопировать текст');
        }
        document.body.removeChild(textArea);
    });
}

function copyToClipboardSafe(accountNumber, fieldName, iconElement) {
    // Находим данные безопасно через индекс
    const accountData = parsedData.find(account => account.number === accountNumber);
    if (!accountData) return;
    
    const text = accountData[fieldName] || '';
    if (!text) return;
    
    navigator.clipboard.writeText(text).then(() => {
        // Показываем feedback
        const feedback = document.createElement('span');
        feedback.className = 'copy-feedback show';
        feedback.textContent = 'Скопировано!';
        
        const cell = iconElement.parentElement;
        cell.appendChild(feedback);
        
        // Убираем feedback через 1.5 секунды
        setTimeout(() => {
            if (feedback.parentElement) {
                feedback.parentElement.removeChild(feedback);
            }
        }, 1500);
    }).catch(err => {
        console.error('Ошибка копирования: ', err);
        // Fallback для старых браузеров
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            // Показываем feedback
            const feedback = document.createElement('span');
            feedback.className = 'copy-feedback show';
            feedback.textContent = 'Скопировано!';
            
            const cell = iconElement.parentElement;
            cell.appendChild(feedback);
            
            setTimeout(() => {
                if (feedback.parentElement) {
                    feedback.parentElement.removeChild(feedback);
                }
            }, 1500);
        } catch (err) {
            alert('Не удалось скопировать текст');
        }
        document.body.removeChild(textArea);
    });
}

function clearData() {
    document.getElementById('inputData').value = '';
    document.getElementById('resultsContainer').innerHTML = '<div class="empty-message">Данные не загружены. Вставьте текст выше и нажмите "Разобрать".</div>';
    document.getElementById('downloadBtn').style.display = 'none';
    parsedData = [];
}

function downloadExcel() {
    if (parsedData.length === 0) {
        alert('Нет данных для скачивания');
        return;
    }
    
    // Подготавливаем данные для Excel
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
    
    // Создаем книгу Excel
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelData);
    
    // Автоматически подбираем ширину колонок
    const colWidths = [];
    const headers = Object.keys(excelData[0]);
    headers.forEach((header, index) => {
        let maxWidth = header.length;
        excelData.forEach(row => {
            const cellValue = String(row[header] || '');
            if (cellValue.length > maxWidth) {
                maxWidth = Math.min(cellValue.length, 50); // Максимум 50 символов
            }
        });
        colWidths.push({ wch: maxWidth + 2 });
    });
    ws['!cols'] = colWidths;
    
    // Добавляем лист в книгу
    XLSX.utils.book_append_sheet(wb, ws, 'Аккаунты');
    
    // Скачиваем файл
    const fileName = `accounts_${new Date().toISOString().slice(0, 10)}.xlsx`;
    XLSX.writeFile(wb, fileName);
}