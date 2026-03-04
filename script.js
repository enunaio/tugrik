/* =============================================
   TUGRIKI — script.js
   ============================================= */

'use strict';

// ── Данные ──────────────────────────────────
let countriesData = [];

// ── Переключение страниц (без анимации) ──────
function switchPage(pageName) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

  const page = document.getElementById(pageName + '-page');
  if (page) page.classList.add('active');

  document.querySelectorAll('.nav-btn').forEach(btn => {
    const onclick = btn.getAttribute('onclick') || '';
    if (onclick.includes(`'${pageName}'`)) btn.classList.add('active');
  });

  if (pageName === 'codes' && countriesData.length === 0) loadCountries();
}

document.addEventListener('DOMContentLoaded', () => switchPage('links'));


/* =============================================
   РАСКЛАДКА — конвертация при неверном языке
   ============================================= */

// EN → RU: пользователь набирает на английской раскладке, а нужно русское
const EN_TO_RU = {
  'q':'й','w':'ц','e':'у','r':'к','t':'е','y':'н','u':'г','i':'ш','o':'щ','p':'з',
  '[':'х',']':'ъ','a':'ф','s':'ы','d':'в','f':'а','g':'п','h':'р','j':'о','k':'л',
  'l':'д',';':'ж',"'":"э",'z':'я','x':'ч','c':'с','v':'м','b':'и','n':'т','m':'ь',
  ',':'б','.':'ю'
};

// RU → EN: пользователь набирает на русской раскладке, а нужно английское
const RU_TO_EN = {
  'й':'q','ц':'w','у':'e','к':'r','е':'t','н':'y','г':'u','ш':'i','щ':'o','з':'p',
  'х':'[','ъ':']','ф':'a','ы':'s','в':'d','а':'f','п':'g','р':'h','о':'j','л':'k',
  'д':'l','ж':';','э':"'",'я':'z','ч':'x','с':'c','м':'v','и':'b','т':'n','ь':'m',
  'б':',','ю':'.'
};

function convertLayout(str) {
  const lower = str.toLowerCase();
  const toRu = lower.split('').map(ch => EN_TO_RU[ch] || ch).join('');
  const toEn = lower.split('').map(ch => RU_TO_EN[ch] || ch).join('');
  return { toRu, toEn };
}


/* =============================================
   ZWNJ
   ============================================= */

function processZWNJ() {
  const input = document.getElementById('zwnjInputData').value;
  if (!input.trim()) {
    setZwnjContent('<div class="empty-message">Введите текст для обработки.</div>');
    return;
  }
  const ZWNJ = '\u200C';
  const result = input.split('').join(ZWNJ);

  setZwnjContent(`
    <div class="zwnj-stats">
      <span>Символов в оригинале: <b>${input.length}</b></span>
      <span>Символов с ZWNJ: <b>${result.length}</b></span>
    </div>
    <div class="zwnj-result-text">${escapeHtml(result)}</div>
  `);

  const btn = document.getElementById('zwnjCopyBtn');
  btn.style.display = 'inline-block';
  btn._resultText = result;
}

function clearZWNJ() {
  document.getElementById('zwnjInputData').value = '';
  setZwnjContent('<div class="empty-message">Результат появится здесь после обработки текста.</div>');
  document.getElementById('zwnjCopyBtn').style.display = 'none';
}

function copyZWNJResult() {
  const btn = document.getElementById('zwnjCopyBtn');
  const text = btn._resultText || '';
  if (!text) return;
  const orig = btn.textContent;
  const done = () => { btn.textContent = '✓ Скопировано!'; setTimeout(() => btn.textContent = orig, 1800); };
  const fail = () => { btn.textContent = 'Ошибка'; setTimeout(() => btn.textContent = orig, 2000); };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done, fail));
  } else {
    fallbackCopy(text, done, fail);
  }
}

function fallbackCopy(text, done, fail) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;opacity:0;';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy') ? done() : fail(); } catch { fail(); }
  document.body.removeChild(ta);
}

function setZwnjContent(html) {
  document.getElementById('zwnjResultsContainer').innerHTML = html;
}


/* =============================================
   СТРАНЫ
   ============================================= */

async function loadCountries() {
  const tbody = document.getElementById('countryTableBody');
  tbody.innerHTML = '<tr><td colspan="8" class="empty-message">Загрузка данных...</td></tr>';
  try {
    const res = await fetch('assets/countries.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    countriesData = await res.json();
    renderCountryTable(countriesData);
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="8" class="empty-message">Ошибка загрузки: ${escapeHtml(err.message)}</td></tr>`;
  }
}

function renderCountryTable(data) {
  document.getElementById('countryCount').textContent = `Всего стран: ${data.length}`;
  const tbody = document.getElementById('countryTableBody');

  if (!data.length) {
    tbody.innerHTML = '<tr><td colspan="8" class="empty-message">Ничего не найдено</td></tr>';
    return;
  }

  tbody.innerHTML = data.map(c => {
    const wiki = c.wiki_url
      ? `<a href="${escapeHtml(c.wiki_url)}" target="_blank" rel="noopener noreferrer" class="wiki-link">🔗 Wiki</a>`
      : '—';
    const copyCell = (val, cls) => {
      const v = val == null ? '' : String(val);
      return `<td class="${cls} cell-with-copy" data-copy="${escapeHtml(v)}">${escapeHtml(v)}<span class="copy-icon" title="Копировать"></span></td>`;
    };
    return `<tr>
      ${copyCell(c.name, 'country-name-ru-col')}
      ${copyCell(c.name_en, 'country-name-en-col')}
      ${copyCell(c.country_code, 'country-abbr-col')}
      ${copyCell(c.abbr, 'country-abbr-col')}
      ${copyCell(c.val, 'country-val-col')}
      ${copyCell(c.code, 'country-code-col')}
      ${copyCell(c.example, 'country-example-col')}
      <td class="country-flag-col">${wiki}</td>
    </tr>`;
  }).join('');

  // Delegate copy clicks
  const tbody2 = document.getElementById('countryTableBody');
  tbody2.onclick = (e) => {
    const icon = e.target.closest('.copy-icon');
    if (!icon) return;
    const cell = icon.closest('.cell-with-copy');
    const text = cell ? (cell.dataset.copy || '') : '';
    if (!text) return;
    const orig = icon.title;
    const done = () => { icon.classList.add('copied'); icon.title = '✓'; setTimeout(() => { icon.classList.remove('copied'); icon.title = orig; }, 1500); };
    const fail = () => { icon.title = '!'; setTimeout(() => icon.title = orig, 1500); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done, fail));
    } else {
      fallbackCopy(text, done, fail);
    }
  };
}

function searchCountries() {
  const raw = (document.getElementById('countrySearch').value || '').trim().toLowerCase();
  if (!raw) { renderCountryTable(countriesData); return; }

  const { toRu, toEn } = convertLayout(raw);

  // Ищем по оригиналу + обе конвертации раскладки
  const queries = [raw];
  if (toRu !== raw) queries.push(toRu);
  if (toEn !== raw && toEn !== toRu) queries.push(toEn);

  const filtered = countriesData.filter(c =>
    queries.some(q =>
      hit(c.name, q) || hit(c.name_en, q) ||
      hit(c.country_code, q) || hit(c.abbr, q) ||
      hit(c.val, q) || hit(c.code, q) ||
      hit(c.example, q) ||
      (Array.isArray(c.aliases) && c.aliases.some(a => hit(a, q)))
    )
  );

  renderCountryTable(filtered);
}

function hit(val, q) {
  return val && String(val).toLowerCase().includes(q);
}

function clearCountrySearch() {
  document.getElementById('countrySearch').value = '';
  renderCountryTable(countriesData);
}


/* =============================================
   УТИЛИТЫ
   ============================================= */

function escapeHtml(str) {
  if (str == null) return '—';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}