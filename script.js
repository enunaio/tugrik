// === PERFORMANCE OPTIMIZATIONS ===
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
    "code": "+61",
    "abbr": "AU",
    "example": "+61 XXX XXX XXX",
    "val": "AUD",
    "flag": "https://ru.wikipedia.org/wiki/Австралия"
},
{
    "name": "Австрия",
    "code": "+43",
    "abbr": "AT",
    "example": "+43 XXX XXXXXXX",
    "val": "EUR",
    "flag": "https://ru.wikipedia.org/wiki/Австрия"
},
{
    "name": "Азербайджан",
    "code": "+994",
    "abbr": "AZ",
    "example": "+994 XX XXX XX XX",
    "val": "AZN",
    "flag": "https://ru.wikipedia.org/wiki/Азербайджан"
},
{
    "name": "Аландские острова",
    "code": "+35818",
    "abbr": "AX",
    "example": "+35818 XXX XXX",
    "val": "EUR",
    "flag": "https://ru.wikipedia.org/wiki/Аландские_острова"
},
{
    "name": "Албания",
    "code": "+355",
    "abbr": "AL",
    "example": "+355 XX XXX XXXX",
    "val": "ALL",
    "flag": "https://ru.wikipedia.org/wiki/Албания"
},
{
    "name": "Алжир",
    "code": "+213",
    "abbr": "DZ",
    "example": "+213 XXX XXX XXX",
    "val": "DZD",
    "flag": "https://ru.wikipedia.org/wiki/Алжир"
},
{
    "name": "Американское Самоа",
    "code": "+1684",
    "abbr": "AS",
    "example": "+1684 XXX XXXX",
    "val": "USD",
    "flag": "https://ru.wikipedia.org/wiki/Американское_Самоа"
},
{
    "name": "Андорра",
    "code": "+376",
    "abbr": "AD",
    "example": "+376 XXX XXX",
    "val": "EUR",
    "flag": "https://ru.wikipedia.org/wiki/Андорра"
},
{
    "name": "Антарктида",
    "code": "+672",
    "abbr": "AQ",
    "example": "+672 XXX XXX",
    "val": "-",
    "flag": "https://ru.wikipedia.org/wiki/Антарктида"
},
{
    "name": "Аргентина",
    "code": "+54",
    "abbr": "AR",
    "example": "+54 XXX XXX XXXX",
    "val": "ARS",
    "flag": "https://ru.wikipedia.org/wiki/Аргентина"
},
{
    "name": "Армения",
    "code": "+374",
    "abbr": "AM",
    "example": "+374 XX XXX XXX",
    "val": "AMD",
    "flag": "https://ru.wikipedia.org/wiki/Армения"
},
{
    "name": "Афганистан",
    "code": "+93",
    "abbr": "AF",
    "example": "+93 XX XXX XXXX",
    "val": "AFN",
    "flag": "https://ru.wikipedia.org/wiki/Афганистан"
},
{
    "name": "Багамы",
    "code": "+1242",
    "abbr": "BS",
    "example": "+1242 XXX XXXX",
    "val": "BSD",
    "flag": "https://ru.wikipedia.org/wiki/Багамы"
},
{
    "name": "Бангладеш",
    "code": "+880",
    "abbr": "BD",
    "example": "+880 XXXX XXXXXX",
    "val": "BDT",
    "flag": "https://ru.wikipedia.org/wiki/Бангладеш"
},
{
    "name": "Барбадос",
    "code": "+1246",
    "abbr": "BB",
    "example": "+1246 XXX XXXX",
    "val": "BBD",
    "flag": "https://ru.wikipedia.org/wiki/Барбадос"
},
{
    "name": "Бахрейн",
    "code": "+973",
    "abbr": "BH",
    "example": "+973 XXXX XXXX",
    "val": "BHD",
    "flag": "https://ru.wikipedia.org/wiki/Бахрейн"
},
{
    "name": "Беларусь",
    "code": "+375",
    "abbr": "BY",
    "example": "+375 XX XXX XX XX",
    "val": "BYN",
    "flag": "https://ru.wikipedia.org/wiki/Беларусь"
},
{
    "name": "Белиз",
    "code": "+501",
    "abbr": "BZ",
    "example": "+501 XXX XXXX",
    "val": "BZD",
    "flag": "https://ru.wikipedia.org/wiki/Белиз"
},
{
    "name": "Бельгия",
    "code": "+32",
    "abbr": "BE",
    "example": "+32 XXX XX XX XX",
    "val": "EUR",
    "flag": "https://ru.wikipedia.org/wiki/Бельгия"
},
{
    "name": "Бенин",
    "code": "+229",
    "abbr": "BJ",
    "example": "+229 XX XX XX XX",
    "val": "XOF",
    "flag": "https://ru.wikipedia.org/wiki/Бенин"
},
{
    "name": "Болгария",
    "code": "+359",
    "abbr": "BG",
    "example": "+359 XX XXX XXXX",
    "val": "BGN",
    "flag": "https://ru.wikipedia.org/wiki/Болгария"
},
{
    "name": "Боливия",
    "code": "+591",
    "abbr": "BO",
    "example": "+591 X XXX XXXX",
    "val": "BOB",
    "flag": "https://ru.wikipedia.org/wiki/Боливия"
},
{
    "name": "Босния и Герцеговина",
    "code": "+387",
    "abbr": "BA",
    "example": "+387 XX XXX XXX",
    "val": "BAM",
    "flag": "https://ru.wikipedia.org/wiki/Босния_и_Герцеговина"
},
{
    "name": "Ботсвана",
    "code": "+267",
    "abbr": "BW",
    "example": "+267 XX XXX XXX",
    "val": "BWP",
    "flag": "https://ru.wikipedia.org/wiki/Ботсвана"
},
{
    "name": "Бразилия",
    "code": "+55",
    "abbr": "BR",
    "example": "+55 XX XXXXX XXXX",
    "val": "BRL",
    "flag": "https://ru.wikipedia.org/wiki/Бразилия"
},
{
    "name": "Британская территория в Индийском океане",
    "code": "+246",
    "abbr": "IO",
    "example": "+246 XXX XXXX",
    "val": "USD",
    "flag": "https://ru.wikipedia.org/wiki/Британская_территория_в_Индийском_океане"
},
{
    "name": "Буве",
    "code": "+47",
    "abbr": "BV",
    "example": "+47 XXX XX XXX",
    "val": "NOK",
    "flag": "https://ru.wikipedia.org/wiki/Буве"
},
{
    "name": "Буркина-Фасо",
    "code": "+226",
    "abbr": "BF",
    "example": "+226 XX XX XX XX",
    "val": "XOF",
    "flag": "https://ru.wikipedia.org/wiki/Буркина-Фасо"
},
{
    "name": "Бурунди",
    "code": "+257",
    "abbr": "BI",
    "example": "+257 XX XX XX XX",
    "val": "BIF",
    "flag": "https://ru.wikipedia.org/wiki/Бурунди"
},
{
    "name": "Бутан",
    "code": "+975",
    "abbr": "BT",
    "example": "+975 XX XXX XXX",
    "val": "BTN",
    "flag": "https://ru.wikipedia.org/wiki/Бутан"
},
{
    "name": "Вануату",
    "code": "+678",
    "abbr": "VU",
    "example": "+678 XXXXX",
    "val": "VUV",
    "flag": "https://ru.wikipedia.org/wiki/Вануату"
},
{
    "name": "Ватикан",
    "code": "+379",
    "abbr": "VA",
    "example": "+379 XXX XXX XXX",
    "val": "EUR",
    "flag": "https://ru.wikipedia.org/wiki/Ватикан"
},
{
    "name": "Великобритания",
    "code": "+44",
    "abbr": "GB",
    "example": "+44 XXXX XXXXXX",
    "val": "GBP",
    "flag": "https://ru.wikipedia.org/wiki/Великобритания"
},
{
    "name": "Венгрия",
    "code": "+36",
    "abbr": "HU",
    "example": "+36 XX XXX XXXX",
    "val": "HUF",
    "flag": "https://ru.wikipedia.org/wiki/Венгрия"
},
{
    "name": "Венесуэла",
    "code": "+58",
    "abbr": "VE",
    "example": "+58 XXX XXX XXXX",
    "val": "VES",
    "flag": "https://ru.wikipedia.org/wiki/Венесуэла"
},
{
    "name": "Вьетнам",
    "code": "+84",
    "abbr": "VN",
    "example": "+84 XXX XXX XXXX",
    "val": "VND",
    "flag": "https://ru.wikipedia.org/wiki/Вьетнам"
},
{
    "name": "Габон",
    "code": "+241",
    "abbr": "GA",
    "example": "+241 XX XX XX XX",
    "val": "XAF",
    "flag": "https://ru.wikipedia.org/wiki/Габон"
},
{
    "name": "Гаити",
    "code": "+509",
    "abbr": "HT",
    "example": "+509 XXXX XXXX",
    "val": "HTG",
    "flag": "https://ru.wikipedia.org/wiki/Гаити"
},
{
    "name": "Гайана",
    "code": "+592",
    "abbr": "GY",
    "example": "+592 XXX XXXX",
    "val": "GYD",
    "flag": "https://ru.wikipedia.org/wiki/Гайана"
},
{
    "name": "Гамбия",
    "code": "+220",
    "abbr": "GM",
    "example": "+220 XXX XXXX",
    "val": "GMD",
    "flag": "https://ru.wikipedia.org/wiki/Гамбия"
},
{
    "name": "Гана",
    "code": "+233",
    "abbr": "GH",
    "example": "+233 XXX XXX XXX",
    "val": "GHS",
    "flag": "https://ru.wikipedia.org/wiki/Гана"
},
{
    "name": "Гватемала",
    "code": "+502",
    "abbr": "GT",
    "example": "+502 XXXX XXXX",
    "val": "GTQ",
    "flag": "https://ru.wikipedia.org/wiki/Гватемала"
},
{
    "name": "Гвинея",
    "code": "+224",
    "abbr": "GN",
    "example": "+224 XXX XXX XXX",
    "val": "GNF",
    "flag": "https://ru.wikipedia.org/wiki/Гвинея"
},
{
    "name": "Гвинея-Бисау",
    "code": "+245",
    "abbr": "GW",
    "example": "+245 XXX XXXX",
    "val": "XOF",
    "flag": "https://ru.wikipedia.org/wiki/Гвинея-Бисау"
},
{
    "name": "Германия",
    "code": "+49",
    "abbr": "DE",
    "example": "+49 XXX XXXXXXX",
    "val": "EUR",
    "flag": "https://ru.wikipedia.org/wiki/Германия"
},
{
    "name": "Гибралтар",
    "code": "+350",
    "abbr": "GI",
    "example": "+350 XXXX XXXX",
    "val": "GIP",
    "flag": "https://ru.wikipedia.org/wiki/Гибралтар"
},
{
    "name": "Гондурас",
    "code": "+504",
    "abbr": "HN",
    "example": "+504 XXXX XXXX",
    "val": "HNL",
    "flag": "https://ru.wikipedia.org/wiki/Гондурас"
},
{
    "name": "Гренада",
    "code": "+1473",
    "abbr": "GD",
    "example": "+1473 XXX XXXX",
    "val": "XCD",
    "flag": "https://ru.wikipedia.org/wiki/Гренада"
},
{
    "name": "Гренландия",
    "code": "+299",
    "abbr": "GL",
    "example": "+299 XX XX XX",
    "val": "DKK",
    "flag": "https://ru.wikipedia.org/wiki/Гренландия"
},
{
    "name": "Греция",
    "code": "+30",
    "abbr": "GR",
    "example": "+30 XXX XXX XXXX",
    "val": "EUR",
    "flag": "https://ru.wikipedia.org/wiki/Греция"
},
{
    "name": "Грузия",
    "code": "+995",
    "abbr": "GE",
    "example": "+995 XXX XXX XXX",
    "val": "GEL",
    "flag": "https://ru.wikipedia.org/wiki/Грузия"
},
{
    "name": "Гуам",
    "code": "+1671",
    "abbr": "GU",
    "example": "+1671 XXX XXXX",
    "val": "USD",
    "flag": "https://ru.wikipedia.org/wiki/Гуам"
},
{
    "name": "Дания",
    "code": "+45",
    "abbr": "DK",
    "example": "+45 XX XX XX XX",
    "val": "DKK",
    "flag": "https://ru.wikipedia.org/wiki/Дания"
},
{
    "name": "Демократическая Республика Конго",
    "code": "+243",
    "abbr": "CD",
    "example": "+243 XXX XXX XXX",
    "val": "CDF",
    "flag": "https://ru.wikipedia.org/wiki/Демократическая_Республика_Конго"
},
{
    "name": "Джибути",
    "code": "+253",
    "abbr": "DJ",
    "example": "+253 XX XX XX XX",
    "val": "DJF",
    "flag": "https://ru.wikipedia.org/wiki/Джибути"
},
{
    "name": "Доминиканская Республика",
    "code": "+1809",
    "abbr": "DO",
    "example": "+1809 XXX XXXX",
    "val": "DOP",
    "flag": "https://ru.wikipedia.org/wiki/Доминиканская_Республика"
},
{
    "name": "Египет",
    "code": "+20",
    "abbr": "EG",
    "example": "+20 XXX XXX XXXX",
    "val": "EGP",
    "flag": "https://ru.wikipedia.org/wiki/Египет"
},
{
    "name": "Замбия",
    "code": "+260",
    "abbr": "ZM",
    "example": "+260 XX XXX XXXX",
    "val": "ZMW",
    "flag": "https://ru.wikipedia.org/wiki/Замбия"
},
{
    "name": "Зимбабве",
    "code": "+263",
    "abbr": "ZW",
    "example": "+263 XX XXX XXXX",
    "val": "ZWL",
    "flag": "https://ru.wikipedia.org/wiki/Зимбабве"
},
{
    "name": "Израиль",
    "code": "+972",
    "abbr": "IL",
    "example": "+972 XX XXX XXXX",
    "val": "ILS",
    "flag": "https://ru.wikipedia.org/wiki/Израиль"
},
{
    "name": "Индия",
    "code": "+91",
    "abbr": "IN",
    "example": "+91 XXXXX XXXXX",
    "val": "INR",
    "flag": "https://ru.wikipedia.org/wiki/Индия"
},
{
    "name": "Индонезия",
    "code": "+62",
    "abbr": "ID",
    "example": "+62 XXX XXX XXXX",
    "val": "IDR",
    "flag": "https://ru.wikipedia.org/wiki/Индонезия"
},
{
    "name": "Иордания",
    "code": "+962",
    "abbr": "JO",
    "example": "+962 X XXXX XXXX",
    "val": "JOD",
    "flag": "https://ru.wikipedia.org/wiki/Иордания"
},
{
    "name": "Ирак",
    "code": "+964",
    "abbr": "IQ",
    "example": "+964 XXX XXX XXXX",
    "val": "IQD",
    "flag": "https://ru.wikipedia.org/wiki/Ирак"
},
{
    "name": "Иран",
    "code": "+98",
    "abbr": "IR",
    "example": "+98 XXX XXX XXXX",
    "val": "IRR",
    "flag": "https://ru.wikipedia.org/wiki/Иран"
},
{
    "name": "Ирландия",
    "code": "+353",
    "abbr": "IE",
    "example": "+353 XX XXX XXXX",
    "val": "EUR",
    "flag": "https://ru.wikipedia.org/wiki/Ирландия"
},
{
    "name": "Исландия",
    "code": "+354",
    "abbr": "IS",
    "example": "+354 XXX XXXX",
    "val": "ISK",
    "flag": "https://ru.wikipedia.org/wiki/Исландия"
},
{
    "name": "Испания",
    "code": "+34",
    "abbr": "ES",
    "example": "+34 XXX XXX XXX",
    "val": "EUR",
    "flag": "https://ru.wikipedia.org/wiki/Испания"
},
{
    "name": "Италия",
    "code": "+39",
    "abbr": "IT",
    "example": "+39 XXX XXX XXXX",
    "val": "EUR",
    "flag": "https://ru.wikipedia.org/wiki/Италия"
},
{
    "name": "Йемен",
    "code": "+967",
    "abbr": "YE",
    "example": "+967 XXX XXX XXX",
    "val": "YER",
    "flag": "https://ru.wikipedia.org/wiki/Йемен"
},
{
    "name": "Кабо-Верде",
    "code": "+238",
    "abbr": "CV",
    "example": "+238 XXX XX XX",
    "val": "CVE",
    "flag": "https://ru.wikipedia.org/wiki/Кабо-Верде"
},
{
    "name": "Казахстан",
    "code": "+7",
    "abbr": "KZ",
    "example": "+7 XXX XXX XX XX",
    "val": "KZT",
    "flag": "https://ru.wikipedia.org/wiki/Казахстан"
},
{
    "name": "Камерун",
    "code": "+237",
    "abbr": "CM",
    "example": "+237 XXXX XXXX",
    "val": "XAF",
    "flag": "https://ru.wikipedia.org/wiki/Камерун"
},
{
    "name": "Канада",
    "code": "+1",
    "abbr": "CA",
    "example": "+1 XXX XXX XXXX",
    "val": "CAD",
    "flag": "https://ru.wikipedia.org/wiki/Канада"
},
{
    "name": "Катар",
    "code": "+974",
    "abbr": "QA",
    "example": "+974 XXXX XXXX",
    "val": "QAR",
    "flag": "https://ru.wikipedia.org/wiki/Катар"
},
{
    "name": "Кения",
    "code": "+254",
    "abbr": "KE",
    "example": "+254 XXX XXX XXX",
    "val": "KES",
    "flag": "https://ru.wikipedia.org/wiki/Кения"
},
{
    "name": "Кипр",
    "code": "+357",
    "abbr": "CY",
    "example": "+357 XXXX XXXX",
    "val": "EUR",
    "flag": "https://ru.wikipedia.org/wiki/Кипр"
},
{
    "name": "Киргизия",
    "code": "+996",
    "abbr": "KG",
    "example": "+996 XXX XXX XXX",
    "val": "KGS",
    "flag": "https://ru.wikipedia.org/wiki/Киргизия"
},
{
    "name": "Кирибати",
    "code": "+686",
    "abbr": "KI",
    "example": "+686 XXXXX",
    "val": "AUD",
    "flag": "https://ru.wikipedia.org/wiki/Кирибати"
},
{
    "name": "Китай",
    "code": "+86",
    "abbr": "CN",
    "example": "+86 XXX XXXX XXXX",
    "val": "CNY",
    "flag": "https://ru.wikipedia.org/wiki/Китай"
},
{
    "name": "Кокосовые острова",
    "code": "+61",
    "abbr": "CC",
    "example": "+61 X XXXX XXXX",
    "val": "AUD",
    "flag": "https://ru.wikipedia.org/wiki/Кокосовые_острова"
},
{
    "name": "Колумбия",
    "code": "+57",
    "abbr": "CO",
    "example": "+57 XXX XXX XXXX",
    "val": "COP",
    "flag": "https://ru.wikipedia.org/wiki/Колумбия"
},
{
    "name": "Коморы",
    "code": "+269",
    "abbr": "KM",
    "example": "+269 XXX XXXX",
    "val": "KMF",
    "flag": "https://ru.wikipedia.org/wiki/Коморы"
},
{
    "name": "Косово",
    "code": "+383",
    "abbr": "XK",
    "example": "+383 XX XXX XXX",
    "val": "EUR",
    "flag": "https://ru.wikipedia.org/wiki/Косово"
},
{
    "name": "Коста-Рика",
    "code": "+506",
    "abbr": "CR",
    "example": "+506 XXXX XXXX",
    "val": "CRC",
    "flag": "https://ru.wikipedia.org/wiki/Коста-Рика"
},
{
    "name": "Кот-д'Ивуар",
    "code": "+225",
    "abbr": "CI",
    "example": "+225 XX XX XX XX",
    "val": "XOF",
    "flag": "https://ru.wikipedia.org/wiki/Кот-д'Ивуар"
},
{
    "name": "Куба",
    "code": "+53",
    "abbr": "CU",
    "example": "+53 X XXX XXXX",
    "val": "CUP",
    "flag": "https://ru.wikipedia.org/wiki/Куба"
},
{
    "name": "Кувейт",
    "code": "+965",
    "abbr": "KW",
    "example": "+965 XXXX XXXX",
    "val": "KWD",
    "flag": "https://ru.wikipedia.org/wiki/Кувейт"
},
{
    "name": "Латвия",
    "code": "+371",
    "abbr": "LV",
    "example": "+371 XXXX XXXX",
    "val": "EUR",
    "flag": "https://ru.wikipedia.org/wiki/Латвия"
},
{
    "name": "Лесото",
    "code": "+266",
    "abbr": "LS",
    "example": "+266 XX XXX XXX",
    "val": "LSL",
    "flag": "https://ru.wikipedia.org/wiki/Лесото"
},
{
    "name": "Либерия",
    "code": "+231",
    "abbr": "LR",
    "example": "+231 XX XXX XXXX",
    "val": "LRD",
    "flag": "https://ru.wikipedia.org/wiki/Либерия"
},
{
    "name": "Ливан",
    "code": "+961",
    "abbr": "LB",
    "example": "+961 XX XXX XXX",
    "val": "LBP",
    "flag": "https://ru.wikipedia.org/wiki/Ливан"
},
{
    "name": "Ливия",
    "code": "+218",
    "abbr": "LY",
    "example": "+218 XX XXX XXXX",
    "val": "LYD",
    "flag": "https://ru.wikipedia.org/wiki/Ливия"
},
{
    "name": "Литва",
    "code": "+370",
    "abbr": "LT",
    "example": "+370 XXX XXXXX",
    "val": "EUR",
    "flag": "https://ru.wikipedia.org/wiki/Литва"
},
{
    "name": "Лихтенштейн",
    "code": "+423",
    "abbr": "LI",
    "example": "+423 XXX XX XX",
    "val": "CHF",
    "flag": "https://ru.wikipedia.org/wiki/Лихтенштейн"
},
{
    "name": "Люксембург",
    "code": "+352",
    "abbr": "LU",
    "example": "+352 XXX XXX XXX",
    "val": "EUR",
    "flag": "https://ru.wikipedia.org/wiki/Люксембург"
},
{
    "name": "Маврикий",
    "code": "+230",
    "abbr": "MU",
    "example": "+230 XXXX XXXX",
    "val": "MUR",
    "flag": "https://ru.wikipedia.org/wiki/Маврикий"
},
{
    "name": "Мавритания",
    "code": "+222",
    "abbr": "MR",
    "example": "+222 XX XX XX XX",
    "val": "MRU",
    "flag": "https://ru.wikipedia.org/wiki/Мавритания"
},
{
    "name": "Мадагаскар",
    "code": "+261",
    "abbr": "MG",
    "example": "+261 XX XX XXX XX",
    "val": "MGA",
    "flag": "https://ru.wikipedia.org/wiki/Мадагаскар"
},
{
    "name": "Майотта",
    "code": "+262",
    "abbr": "YT",
    "example": "+262 XXX XX XX XX",
    "val": "EUR",
    "flag": "https://ru.wikipedia.org/wiki/Майотта"
},
{
    "name": "Македония",
    "code": "+389",
    "abbr": "MK",
    "example": "+389 XX XXX XXX",
    "val": "MKD",
    "flag": "https://ru.wikipedia.org/wiki/Македония"
},
{
    "name": "Малави",
    "code": "+265",
    "abbr": "MW",
    "example": "+265 XXX XXX XXX",
    "val": "MWK",
    "flag": "https://ru.wikipedia.org/wiki/Малави"
},
{
    "name": "Малайзия",
    "code": "+60",
    "abbr": "MY",
    "example": "+60 XX XXX XXXX",
    "val": "MYR",
    "flag": "https://ru.wikipedia.org/wiki/Малайзия"
},
{
    "name": "Мали",
    "code": "+223",
    "abbr": "ML",
    "example": "+223 XX XX XX XX",
    "val": "XOF",
    "flag": "https://ru.wikipedia.org/wiki/Мали"
},
{
    "name": "Мальдивы",
    "code": "+960",
    "abbr": "MV",
    "example": "+960 XXX XXXX",
    "val": "MVR",
    "flag": "https://ru.wikipedia.org/wiki/Мальдивы"
},
{
    "name": "Мальта",
    "code": "+356",
    "abbr": "MT",
    "example": "+356 XXXX XXXX",
    "val": "EUR",
    "flag": "https://ru.wikipedia.org/wiki/Мальта"
},
{
    "name": "Марокко",
    "code": "+212",
    "abbr": "MA",
    "example": "+212 XXX XXX XXX",
    "val": "MAD",
    "flag": "https://ru.wikipedia.org/wiki/Марокко"
},
{
    "name": "Маршалловы Острова",
    "code": "+692",
    "abbr": "MH",
    "example": "+692 XXX XXXX",
    "val": "USD",
    "flag": "https://ru.wikipedia.org/wiki/Маршалловы_Острова"
},
{
    "name": "Мексика",
    "code": "+52",
    "abbr": "MX",
    "example": "+52 XXX XXX XXXX",
    "val": "MXN",
    "flag": "https://ru.wikipedia.org/wiki/Мексика"
},
{
    "name": "Мозамбик",
    "code": "+258",
    "abbr": "MZ",
    "example": "+258 XX XXX XXXX",
    "val": "MZN",
    "flag": "https://ru.wikipedia.org/wiki/Мозамбик"
},
{
    "name": "Молдова",
    "code": "+373",
    "abbr": "MD",
    "example": "+373 XXXX XXXX",
    "val": "MDL",
    "flag": "https://ru.wikipedia.org/wiki/Молдова"
},
{
    "name": "Монако",
    "code": "+377",
    "abbr": "MC",
    "example": "+377 XX XX XX XX",
    "val": "EUR",
    "flag": "https://ru.wikipedia.org/wiki/Монако"
},
{
    "name": "Монголия",
    "code": "+976",
    "abbr": "MN",
    "example": "+976 XXXX XXXX",
    "val": "MNT",
    "flag": "https://ru.wikipedia.org/wiki/Монголия"
},
{
    "name": "Мьянма",
    "code": "+95",
    "abbr": "MM",
    "example": "+95 XX XXX XXXX",
    "val": "MMK",
    "flag": "https://ru.wikipedia.org/wiki/Мьянма"
},
{
    "name": "Намибия",
    "code": "+264",
    "abbr": "NA",
    "example": "+264 XX XXX XXXX",
    "val": "NAD",
    "flag": "https://ru.wikipedia.org/wiki/Намибия"
},
{
    "name": "Науру",
    "code": "+674",
    "abbr": "NR",
    "example": "+674 XXX XXXX",
    "val": "AUD",
    "flag": "https://ru.wikipedia.org/wiki/Науру"
},
{
    "name": "Непал",
    "code": "+977",
    "abbr": "NP",
    "example": "+977 XXX XXX XXXX",
    "val": "NPR",
    "flag": "https://ru.wikipedia.org/wiki/Непал"
},
{
    "name": "Нигер",
    "code": "+227",
    "abbr": "NE",
    "example": "+227 XX XX XX XX",
    "val": "XOF",
    "flag": "https://ru.wikipedia.org/wiki/Нигер"
},
{
    "name": "Нигерия",
    "code": "+234",
    "abbr": "NG",
    "example": "+234 XXX XXX XXXX",
    "val": "NGN",
    "flag": "https://ru.wikipedia.org/wiki/Нигерия"
},
{
    "name": "Нидерланды",
    "code": "+31",
    "abbr": "NL",
    "example": "+31 X XXXX XXXX",
    "val": "EUR",
    "flag": "https://ru.wikipedia.org/wiki/Нидерланды"
},
{
    "name": "Никарагуа",
    "code": "+505",
    "abbr": "NI",
    "example": "+505 XXXX XXXX",
    "val": "NIO",
    "flag": "https://ru.wikipedia.org/wiki/Никарагуа"
},
{
    "name": "Ниуэ",
    "code": "+683",
    "abbr": "NU",
    "example": "+683 XXXX",
    "val": "NZD",
    "flag": "https://ru.wikipedia.org/wiki/Ниуэ"
},
{
    "name": "Новая Зеландия",
    "code": "+64",
    "abbr": "NZ",
    "example": "+64 XX XXX XXXX",
    "val": "NZD",
    "flag": "https://ru.wikipedia.org/wiki/Новая_Зеландия"
},
{
    "name": "Новая Каледония",
    "code": "+687",
    "abbr": "NC",
    "example": "+687 XX XX XX",
    "val": "XPF",
    "flag": "https://ru.wikipedia.org/wiki/Новая_Каледония"
},
{
    "name": "Норвегия",
    "code": "+47",
    "abbr": "NO",
    "example": "+47 XXX XX XXX",
    "val": "NOK",
    "flag": "https://ru.wikipedia.org/wiki/Норвегия"
},
{
    "name": "Объединенные Арабские Эмираты",
    "code": "+971",
    "abbr": "AE",
    "example": "+971 XX XXX XXXX",
    "val": "AED",
    "flag": "https://ru.wikipedia.org/wiki/Объединенные_Арабские_Эмираты"
},
{
    "name": "Оман",
    "code": "+968",
    "abbr": "OM",
    "example": "+968 XXXX XXXX",
    "val": "OMR",
    "flag": "https://ru.wikipedia.org/wiki/Оман"
},
{
    "name": "Остров Норфолк",
    "code": "+672",
    "abbr": "NF",
    "example": "+672 XXX XXX",
    "val": "AUD",
    "flag": "https://ru.wikipedia.org/wiki/Остров_Норфолк"
},
{
    "name": "Остров Рождества",
    "code": "+61",
    "abbr": "CX",
    "example": "+61 X XXXX XXXX",
    "val": "AUD",
    "flag": "https://ru.wikipedia.org/wiki/Остров_Рождества"
},
{
    "name": "Остров Херд и острова Макдональд",
    "code": "+672",
    "abbr": "HM",
    "example": "+672 XXX XXX",
    "val": "AUD",
    "flag": "https://ru.wikipedia.org/wiki/Остров_Херд_и_острова_Макдональд"
},
{
    "name": "Острова Кука",
    "code": "+682",
    "abbr": "CK",
    "example": "+682 XX XXX",
    "val": "NZD",
    "flag": "https://ru.wikipedia.org/wiki/Острова_Кука"
},
{
    "name": "Пакистан",
    "code": "+92",
    "abbr": "PK",
    "example": "+92 XXX XXX XXXX",
    "val": "PKR",
    "flag": "https://ru.wikipedia.org/wiki/Пакистан"
},
{
    "name": "Палау",
    "code": "+680",
    "abbr": "PW",
    "example": "+680 XXX XXXX",
    "val": "USD",
    "flag": "https://ru.wikipedia.org/wiki/Палау"
},
{
    "name": "Панама",
    "code": "+507",
    "abbr": "PA",
    "example": "+507 XXXX XXXX",
    "val": "PAB",
    "flag": "https://ru.wikipedia.org/wiki/Панама"
},
{
    "name": "Папуа-Новая Гвинея",
    "code": "+675",
    "abbr": "PG",
    "example": "+675 XXX XXXX",
    "val": "PGK",
    "flag": "https://ru.wikipedia.org/wiki/Папуа-Новая_Гвинея"
},
{
    "name": "Парагвай",
    "code": "+595",
    "abbr": "PY",
    "example": "+595 XXX XXX XXX",
    "val": "PYG",
    "flag": "https://ru.wikipedia.org/wiki/Парагвай"
},
{
    "name": "Перу",
    "code": "+51",
    "abbr": "PE",
    "example": "+51 XXX XXX XXX",
    "val": "PEN",
    "flag": "https://ru.wikipedia.org/wiki/Перу"
},
{
    "name": "Питкэрн",
    "code": "+64",
    "abbr": "PN",
    "example": "+64 XXX XXX",
    "val": "NZD",
    "flag": "https://ru.wikipedia.org/wiki/Питкэрн"
},
{
    "name": "Польша",
    "code": "+48",
    "abbr": "PL",
    "example": "+48 XXX XXX XXX",
    "val": "PLN",
    "flag": "https://ru.wikipedia.org/wiki/Польша"
},
{
    "name": "Португалия",
    "code": "+351",
    "abbr": "PT",
    "example": "+351 XXX XXX XXX",
    "val": "EUR",
    "flag": "https://ru.wikipedia.org/wiki/Португалия"
},
{
    "name": "Пуэрто-Рико",
    "code": "+1787",
    "abbr": "PR",
    "example": "+1787 XXX XXXX",
    "val": "USD",
    "flag": "https://ru.wikipedia.org/wiki/Пуэрто-Рико"
},
{
    "name": "Республика Конго",
    "code": "+242",
    "abbr": "CG",
    "example": "+242 XX XXX XXXX",
    "val": "XAF",
    "flag": "https://ru.wikipedia.org/wiki/Республика_Конго"
},
{
    "name": "Реюньон",
    "code": "+262",
    "abbr": "RE",
    "example": "+262 XXX XX XX XX",
    "val": "EUR",
    "flag": "https://ru.wikipedia.org/wiki/Реюньон"
},
{
    "name": "Россия",
    "code": "+7",
    "abbr": "RU",
    "example": "+7 XXX XXX XX XX",
    "val": "RUB",
    "flag": "https://ru.wikipedia.org/wiki/Россия"
},
{
    "name": "Руанда",
    "code": "+250",
    "abbr": "RW",
    "example": "+250 XXX XXX XXX",
    "val": "RWF",
    "flag": "https://ru.wikipedia.org/wiki/Руанда"
},
{
    "name": "Румыния",
    "code": "+40",
    "abbr": "RO",
    "example": "+40 XXX XXX XXX",
    "val": "RON",
    "flag": "https://ru.wikipedia.org/wiki/Румыния"
},
{
    "name": "Сальвадор",
    "code": "+503",
    "abbr": "SV",
    "example": "+503 XXXX XXXX",
    "val": "USD",
    "flag": "https://ru.wikipedia.org/wiki/Сальвадор"
},
{
    "name": "Самоа",
    "code": "+685",
    "abbr": "WS",
    "example": "+685 XXXXX",
    "val": "WST",
    "flag": "https://ru.wikipedia.org/wiki/Самоа"
},
{
    "name": "Сан-Марино",
    "code": "+378",
    "abbr": "SM",
    "example": "+378 XXXX XXXXXX",
    "val": "EUR",
    "flag": "https://ru.wikipedia.org/wiki/Сан-Марино"
},
{
    "name": "Сан-Томе и Принсипи",
    "code": "+239",
    "abbr": "ST",
    "example": "+239 XXX XXXX",
    "val": "STN",
    "flag": "https://ru.wikipedia.org/wiki/Сан-Томе_и_Принсипи"
},
{
    "name": "Саудовская Аравия",
    "code": "+966",
    "abbr": "SA",
    "example": "+966 XX XXX XXXX",
    "val": "SAR",
    "flag": "https://ru.wikipedia.org/wiki/Саудовская_Аравия"
},
{
    "name": "Свазиленд",
    "code": "+268",
    "abbr": "SZ",
    "example": "+268 XX XX XXXX",
    "val": "SZL",
    "flag": "https://ru.wikipedia.org/wiki/Свазиленд"
},
{
    "name": "Северные Марианские острова",
    "code": "+1670",
    "abbr": "MP",
    "example": "+1670 XXX XXXX",
    "val": "USD",
    "flag": "https://ru.wikipedia.org/wiki/Северные_Марианские_острова"
},
{
    "name": "Сейшельские острова",
    "code": "+248",
    "abbr": "SC",
    "example": "+248 X XX XX XX",
    "val": "SCR",
    "flag": "https://ru.wikipedia.org/wiki/Сейшельские_острова"
},
{
    "name": "Сенегал",
    "code": "+221",
    "abbr": "SN",
    "example": "+221 XX XXX XX XX",
    "val": "XOF",
    "flag": "https://ru.wikipedia.org/wiki/Сенегал"
},
{
    "name": "Сент-Елена",
    "code": "+290",
    "abbr": "SH",
    "example": "+290 XXXX",
    "val": "SHP",
    "flag": "https://ru.wikipedia.org/wiki/Сент-Елена"
},
{
    "name": "Сент-Люсия",
    "code": "+1758",
    "abbr": "LC",
    "example": "+1758 XXX XXXX",
    "val": "XCD",
    "flag": "https://ru.wikipedia.org/wiki/Сент-Люсия"
},
{
    "name": "Сент-Пьер и Микелон",
    "code": "+508",
    "abbr": "PM",
    "example": "+508 XX XX XX",
    "val": "EUR",
    "flag": "https://ru.wikipedia.org/wiki/Сент-Пьер_и_Микелон"
},
{
    "name": "Сербия",
    "code": "+381",
    "abbr": "RS",
    "example": "+381 XX XXX XXXX",
    "val": "RSD",
    "flag": "https://ru.wikipedia.org/wiki/Сербия"
},
{
    "name": "Сингапур",
    "code": "+65",
    "abbr": "SG",
    "example": "+65 XXXX XXXX",
    "val": "SGD",
    "flag": "https://ru.wikipedia.org/wiki/Сингапур"
},
{
    "name": "Сирия",
    "code": "+963",
    "abbr": "SY",
    "example": "+963 XXX XXX XXX",
    "val": "SYP",
    "flag": "https://ru.wikipedia.org/wiki/Сирия"
},
{
    "name": "Словакия",
    "code": "+421",
    "abbr": "SK",
    "example": "+421 XXX XXX XXX",
    "val": "EUR",
    "flag": "https://ru.wikipedia.org/wiki/Словакия"
},
{
    "name": "Словения",
    "code": "+386",
    "abbr": "SI",
    "example": "+386 XX XXX XXX",
    "val": "EUR",
    "flag": "https://ru.wikipedia.org/wiki/Словения"
},
{
    "name": "Соединенные Штаты Америки",
    "code": "+1",
    "abbr": "US",
    "example": "+1 XXX XXX XXXX",
    "val": "USD",
    "flag": "https://ru.wikipedia.org/wiki/Соединенные_Штаты_Америки"
},
{
    "name": "Соломоновы Острова",
    "code": "+677",
    "abbr": "SB",
    "example": "+677 XXXXX",
    "val": "SBD",
    "flag": "https://ru.wikipedia.org/wiki/Соломоновы_Острова"
},
{
    "name": "Сомали",
    "code": "+252",
    "abbr": "SO",
    "example": "+252 XX XXX XXXX",
    "val": "SOS",
    "flag": "https://ru.wikipedia.org/wiki/Сомали"
},
{
    "name": "Судан",
    "code": "+249",
    "abbr": "SD",
    "example": "+249 XXX XXX XXX",
    "val": "SDG",
    "flag": "https://ru.wikipedia.org/wiki/Судан"
},
{
    "name": "Суринам",
    "code": "+597",
    "abbr": "SR",
    "example": "+597 XXX XXXX",
    "val": "SRD",
    "flag": "https://ru.wikipedia.org/wiki/Суринам"
},
{
    "name": "Сьерра-Леоне",
    "code": "+232",
    "abbr": "SL",
    "example": "+232 XX XXX XXX",
    "val": "SLE",
    "flag": "https://ru.wikipedia.org/wiki/Сьерра-Леоне"
},
{
    "name": "Таджикистан",
    "code": "+992",
    "abbr": "TJ",
    "example": "+992 XX XXX XXXX",
    "val": "TJS",
    "flag": "https://ru.wikipedia.org/wiki/Таджикистан"
},
{
    "name": "Таиланд",
    "code": "+66",
    "abbr": "TH",
    "example": "+66 XX XXX XXXX",
    "val": "THB",
    "flag": "https://ru.wikipedia.org/wiki/Таиланд"
},
{
    "name": "Танзания",
    "code": "+255",
    "abbr": "TZ",
    "example": "+255 XXX XXX XXX",
    "val": "TZS",
    "flag": "https://ru.wikipedia.org/wiki/Танзания"
},
{
    "name": "Того",
    "code": "+228",
    "abbr": "TG",
    "example": "+228 XX XX XX XX",
    "val": "XOF",
    "flag": "https://ru.wikipedia.org/wiki/Того"
},
{
    "name": "Токелау",
    "code": "+690",
    "abbr": "TK",
    "example": "+690 XXXX",
    "val": "NZD",
    "flag": "https://ru.wikipedia.org/wiki/Токелау"
},
{
    "name": "Тонга",
    "code": "+676",
    "abbr": "TO",
    "example": "+676 XXXXX",
    "val": "TOP",
    "flag": "https://ru.wikipedia.org/wiki/Тонга"
},
{
    "name": "Тринидад и Тобаго",
    "code": "+1868",
    "abbr": "TT",
    "example": "+1868 XXX XXXX",
    "val": "TTD",
    "flag": "https://ru.wikipedia.org/wiki/Тринидад_и_Тобаго"
},
{
    "name": "Тувалу",
    "code": "+688",
    "abbr": "TV",
    "example": "+688 XXXXX",
    "val": "AUD",
    "flag": "https://ru.wikipedia.org/wiki/Тувалу"
},
{
    "name": "Тунис",
    "code": "+216",
    "abbr": "TN",
    "example": "+216 XX XXX XXX",
    "val": "TND",
    "flag": "https://ru.wikipedia.org/wiki/Тунис"
},
{
    "name": "Туркменистан",
    "code": "+993",
    "abbr": "TM",
    "example": "+993 XX XXX XXX",
    "val": "TMT",
    "flag": "https://ru.wikipedia.org/wiki/Туркменистан"
},
{
    "name": "Турция",
    "code": "+90",
    "abbr": "TR",
    "example": "+90 XXX XXX XX XX",
    "val": "TRY",
    "flag": "https://ru.wikipedia.org/wiki/Турция"
},
{
    "name": "Уганда",
    "code": "+256",
    "abbr": "UG",
    "example": "+256 XXX XXX XXX",
    "val": "UGX",
    "flag": "https://ru.wikipedia.org/wiki/Уганда"
},
{
    "name": "Узбекистан",
    "code": "+998",
    "abbr": "UZ",
    "example": "+998 XX XXX XX XX",
    "val": "UZS",
    "flag": "https://ru.wikipedia.org/wiki/Узбекистан"
},
{
    "name": "Украина",
    "code": "+380",
    "abbr": "UA",
    "example": "+380 XX XXX XX XX",
    "val": "UAH",
    "flag": "https://ru.wikipedia.org/wiki/Украина"
},
{
    "name": "Уоллис и Футуна",
    "code": "+681",
    "abbr": "WF",
    "example": "+681 XX XX XX",
    "val": "XPF",
    "flag": "https://ru.wikipedia.org/wiki/Уоллис_и_Футуна"
},
{
    "name": "Уругвай",
    "code": "+598",
    "abbr": "UY",
    "example": "+598 XXXX XXXX",
    "val": "UYU",
    "flag": "https://ru.wikipedia.org/wiki/Уругвай"
},
{
    "name": "Фарерские острова",
    "code": "+298",
    "abbr": "FO",
    "example": "+298 XXX XXX",
    "val": "DKK",
    "flag": "https://ru.wikipedia.org/wiki/Фарерские_острова"
},
{
    "name": "Федеративные Штаты Микронезии",
    "code": "+691",
    "abbr": "FM",
    "example": "+691 XXX XXXX",
    "val": "USD",
    "flag": "https://ru.wikipedia.org/wiki/Федеративные_Штаты_Микронезии"
},
{
    "name": "Фиджи",
    "code": "+679",
    "abbr": "FJ",
    "example": "+679 XXX XXXX",
    "val": "FJD",
    "flag": "https://ru.wikipedia.org/wiki/Фиджи"
},
{
    "name": "Филиппины",
    "code": "+63",
    "abbr": "PH",
    "example": "+63 XXX XXX XXXX",
    "val": "PHP",
    "flag": "https://ru.wikipedia.org/wiki/Филиппины"
},
{
    "name": "Финляндия",
    "code": "+358",
    "abbr": "FI",
    "example": "+358 XX XXX XXXX",
    "val": "EUR",
    "flag": "https://ru.wikipedia.org/wiki/Финляндия"
},
{
    "name": "Фолклендские острова",
    "code": "+500",
    "abbr": "FK",
    "example": "+500 XXXXX",
    "val": "FKP",
    "flag": "https://ru.wikipedia.org/wiki/Фолклендские_острова"
},
{
    "name": "Франция",
    "code": "+33",
    "abbr": "FR",
    "example": "+33 X XX XX XX XX",
    "val": "EUR",
    "flag": "https://ru.wikipedia.org/wiki/Франция"
},
{
    "name": "Французская Гвиана",
    "code": "+594",
    "abbr": "GF",
    "example": "+594 XXXXX XXXX",
    "val": "EUR",
    "flag": "https://ru.wikipedia.org/wiki/Французская_Гвиана"
},
{
    "name": "Французская Полинезия",
    "code": "+689",
    "abbr": "PF",
    "example": "+689 XX XX XX XX",
    "val": "XPF",
    "flag": "https://ru.wikipedia.org/wiki/Французская_Полинезия"
},
{
    "name": "Хорватия",
    "code": "+385",
    "abbr": "HR",
    "example": "+385 XX XXX XXXX",
    "val": "EUR",
    "flag": "https://ru.wikipedia.org/wiki/Хорватия"
},
{
    "name": "Центральноафриканская Республика",
    "code": "+236",
    "abbr": "CF",
    "example": "+236 XX XX XX XX",
    "val": "XAF",
    "flag": "https://ru.wikipedia.org/wiki/Центральноафриканская_Республика"
},
{
    "name": "Чад",
    "code": "+235",
    "abbr": "TD",
    "example": "+235 XX XX XX XX",
    "val": "XAF",
    "flag": "https://ru.wikipedia.org/wiki/Чад"
},
{
    "name": "Черногория",
    "code": "+382",
    "abbr": "ME",
    "example": "+382 XX XXX XXX",
    "val": "EUR",
    "flag": "https://ru.wikipedia.org/wiki/Черногория"
},
{
    "name": "Чехия",
    "code": "+420",
    "abbr": "CZ",
    "example": "+420 XXX XXX XXX",
    "val": "CZK",
    "flag": "https://ru.wikipedia.org/wiki/Чехия"
},
{
    "name": "Чили",
    "code": "+56",
    "abbr": "CL",
    "example": "+56 X XXXX XXXX",
    "val": "CLP",
    "flag": "https://ru.wikipedia.org/wiki/Чили"
},
{
    "name": "Швейцария",
    "code": "+41",
    "abbr": "CH",
    "example": "+41 XX XXX XX XX",
    "val": "CHF",
    "flag": "https://ru.wikipedia.org/wiki/Швейцария"
},
{
    "name": "Швеция",
    "code": "+46",
    "abbr": "SE",
    "example": "+46 XX XXX XX XX",
    "val": "SEK",
    "flag": "https://ru.wikipedia.org/wiki/Швеция"
},
{
    "name": "Шпицберген и Ян-Майен",
    "code": "+4779",
    "abbr": "SJ",
    "example": "+4779 XX XXX",
    "val": "NOK",
    "flag": "https://ru.wikipedia.org/wiki/Шпицберген_и_Ян-Майен"
},
{
    "name": "Шри-Ланка",
    "code": "+94",
    "abbr": "LK",
    "example": "+94 XX XXX XXXX",
    "val": "LKR",
    "flag": "https://ru.wikipedia.org/wiki/Шри-Ланка"
},
{
    "name": "Эквадор",
    "code": "+593",
    "abbr": "EC",
    "example": "+593 XX XXX XXXX",
    "val": "USD",
    "flag": "https://ru.wikipedia.org/wiki/Эквадор"
},
{
    "name": "Экваториальная Гвинея",
    "code": "+240",
    "abbr": "GQ",
    "example": "+240 XXX XXX XXX",
    "val": "XAF",
    "flag": "https://ru.wikipedia.org/wiki/Экваториальная_Гвинея"
},
{
    "name": "Эритрея",
    "code": "+291",
    "abbr": "ER",
    "example": "+291 X XXX XXX",
    "val": "ERN",
    "flag": "https://ru.wikipedia.org/wiki/Эритрея"
},
{
    "name": "Эстония",
    "code": "+372",
    "abbr": "EE",
    "example": "+372 XXXX XXXX",
    "val": "EUR",
    "flag": "https://ru.wikipedia.org/wiki/Эстония"
},
{
    "name": "Эфиопия",
    "code": "+251",
    "abbr": "ET",
    "example": "+251 XX XXX XXXX",
    "val": "ETB",
    "flag": "https://ru.wikipedia.org/wiki/Эфиопия"
},
{
    "name": "Южная Африка",
    "code": "+27",
    "abbr": "ZA",
    "example": "+27 XX XXX XXXX",
    "val": "ZAR",
    "flag": "https://ru.wikipedia.org/wiki/Южная_Африка"
},
{
    "name": "Южная Георгия и Южные Сандвичевы острова",
    "code": "+500",
    "abbr": "GS",
    "example": "+500 XXXXX",
    "val": "GBP",
    "flag": "https://ru.wikipedia.org/wiki/Южная_Георгия_и_Южные_Сандвичевы_острова"
},
{
    "name": "Южная Корея",
    "code": "+82",
    "abbr": "KR",
    "example": "+82 XX XXXX XXXX",
    "val": "KRW",
    "flag": "https://ru.wikipedia.org/wiki/Южная_Корея"
},
{
    "name": "Южный Судан",
    "code": "+211",
    "abbr": "SS",
    "example": "+211 XXX XXX XXX",
    "val": "SSP",
    "flag": "https://ru.wikipedia.org/wiki/Южный_Судан"
},
{
    "name": "Ямайка",
    "code": "+1876",
    "abbr": "JM",
    "example": "+1876 XXX XXXX",
    "val": "JMD",
    "flag": "https://ru.wikipedia.org/wiki/Ямайка"
},
{
    "name": "Япония",
    "code": "+81",
    "abbr": "JP",
    "example": "+81 XX XXXX XXXX",
    "val": "JPY",
    "flag": "https://ru.wikipedia.org/wiki/Япония"
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
            <td class="country-name-col">${escapeHtml(country.name)}</td>
            <td class="country-abbr-col">${escapeHtml(country.abbr)}</td>
            <td class="country-val-col">${escapeHtml(country.val)}</td>
            <td class="country-code-col">${escapeHtml(country.code)}</td>
            <td class="country-example-col">${escapeHtml(country.example)}</td>
            <td class="country-flag-col">
                <a href="${escapeHtml(country.flag)}" class="plain-link" target="_blank" rel="noopener noreferrer">
                    Перейти на wiki
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

// Дебаунсированный поиск стран
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
        country.code.includes(query) ||
        country.abbr.toLowerCase().includes(query)
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
    feedback.textContent = 'Скопировано!';
    
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