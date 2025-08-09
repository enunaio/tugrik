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

// {
//     // "abbr": "AU",

// },

// === COUNTRY CODES FUNCTIONALITY ===
const countryCodes =
[
  {
    "name": "Афганистан",
    "nameEn": "Afghanistan",
    "abbr": "AF",
    // "abbr333": "AFG",
    "val": "AFN",
    "code": "+93",
    "example": "+93 XX XXX XXXX",
    "aliases": [
      "Afghanistan"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Афганистан"
  },
  {
    "name": "Албания",
    "nameEn": "Albania",
    "abbr": "AL",
    // "abbr333": "ALB",
    "val": "ALL",
    "code": "+355",
    "example": "+355 XX XXX XXXX",
    "aliases": [
      "Albania",
      "Shqipëria"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Албания"
  },
  {
    "name": "Алжир",
    "nameEn": "Algeria",
    "abbr": "DZ",
    // "abbr333": "DZA",
    "val": "DZD",
    "code": "+213",
    "example": "+213 XXX XX XX XX",
    "aliases": [
      "Algeria"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Алжир"
  },
  {
    "name": "American Samoa",
    "nameEn": "American Samoa",
    "abbr": "AS",
    // "abbr333": "ASM",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "American Samoa"
    ],
    "flag": "https://en.wikipedia.org/wiki/American_Samoa"
  },
  {
    "name": "Андорра",
    "nameEn": "Andorra",
    "abbr": "AD",
    // "abbr333": "AND",
    "val": "EUR",
    "code": "+376",
    "example": "+376 XXX XXX",
    "aliases": [
      "Andorra"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Андорра"
  },
  {
    "name": "Ангола",
    "nameEn": "Angola",
    "abbr": "AO",
    // "abbr333": "AGO",
    "val": "AOA",
    "code": "+244",
    "example": "+244 XXX XXX XXX",
    "aliases": [
      "Angola"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Ангола"
  },
  {
    "name": "Anguilla",
    "nameEn": "Anguilla",
    "abbr": "AI",
    // "abbr333": "AIA",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "Anguilla"
    ],
    "flag": "https://en.wikipedia.org/wiki/Anguilla"
  },
  {
    "name": "Antarctica",
    "nameEn": "Antarctica",
    "abbr": "AQ",
    // "abbr333": "ATA",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "Antarctica"
    ],
    "flag": "https://en.wikipedia.org/wiki/Antarctica"
  },
  {
    "name": "Антигуа и Барбуда",
    "nameEn": "Antigua and Barbuda",
    "abbr": "AG",
    // "abbr333": "ATG",
    "val": "XCD",
    "code": "+1268",
    "example": "+1 (268) XXX-XXXX",
    "aliases": [
      "Antigua and Barbuda"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Антигуа_и_Барбуда"
  },
  {
    "name": "Аргентина",
    "nameEn": "Argentina",
    "abbr": "AR",
    // "abbr333": "ARG",
    "val": "ARS",
    "code": "+54",
    "example": "+54 XXX XXX-XXXX",
    "aliases": [
      "Argentina"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Аргентина"
  },
  {
    "name": "Армения",
    "nameEn": "Armenia",
    "abbr": "AM",
    // "abbr333": "ARM",
    "val": "AMD",
    "code": "+374",
    "example": "+374 XX XXX XXX",
    "aliases": [
      "Armenia"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Армения"
  },
  {
    "name": "Aruba",
    "nameEn": "Aruba",
    "abbr": "AW",
    // "abbr333": "ABW",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "Aruba"
    ],
    "flag": "https://en.wikipedia.org/wiki/Aruba"
  },
  {
    "name": "Австралия",
    "nameEn": "Australia",
    "abbr": "AU",
    // "abbr333": "AUS",
    "val": "AUD",
    "code": "+61",
    "example": "+61 X XXXX XXXX",
    "aliases": [
      "Australia"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Австралия"
  },
  {
    "name": "Австрия",
    "nameEn": "Austria",
    "abbr": "AT",
    // "abbr333": "AUT",
    "val": "EUR",
    "code": "+43",
    "example": "+43 XXX XXXXXX",
    "aliases": [
      "Austria",
      "Österreich"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Австрия"
  },
  {
    "name": "Азербайджан",
    "nameEn": "Azerbaijan",
    "abbr": "AZ",
    // "abbr333": "AZE",
    "val": "AZN",
    "code": "+994",
    "example": "+994 XX XXX XX XX",
    "aliases": [
      "Azerbaijan"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Азербайджан"
  },
  {
    "name": "Багамы",
    "nameEn": "Bahamas",
    "abbr": "BS",
    // "abbr333": "BHS",
    "val": "BSD",
    "code": "+1242",
    "example": "+1 (242) XXX-XXXX",
    "aliases": [
      "Bahamas"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Багамы"
  },
  {
    "name": "Бахрейн",
    "nameEn": "Bahrain",
    "abbr": "BH",
    // "abbr333": "BHR",
    "val": "BHD",
    "code": "+973",
    "example": "+973 XXXX XXXX",
    "aliases": [
      "Bahrain"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Бахрейн"
  },
  {
    "name": "Бангладеш",
    "nameEn": "Bangladesh",
    "abbr": "BD",
    // "abbr333": "BGD",
    "val": "BDT",
    "code": "+880",
    "example": "+880 XXXX-XXXXXX",
    "aliases": [
      "Bangladesh"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Бангладеш"
  },
  {
    "name": "Барбадос",
    "nameEn": "Barbados",
    "abbr": "BB",
    // "abbr333": "BRB",
    "val": "BBD",
    "code": "+1246",
    "example": "+1 (246) XXX-XXXX",
    "aliases": [
      "Barbados"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Барбадос"
  },
  {
    "name": "Беларусь",
    "nameEn": "Belarus",
    "abbr": "BY",
    // "abbr333": "BLR",
    "val": "BYN",
    "code": "+375",
    "example": "+375 XX XXX XX XX",
    "aliases": [
      "Belarus",
      "Белоруссия"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Белоруссия"
  },
  {
    "name": "Бельгия",
    "nameEn": "Belgium",
    "abbr": "BE",
    // "abbr333": "BEL",
    "val": "EUR",
    "code": "+32",
    "example": "+32 XXX XX XX XX",
    "aliases": [
      "Belgium",
      "België",
      "Belgique"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Бельгия"
  },
  {
    "name": "Белиз",
    "nameEn": "Belize",
    "abbr": "BZ",
    // "abbr333": "BLZ",
    "val": "BZD",
    "code": "+501",
    "example": "+501 XXX-XXXX",
    "aliases": [
      "Belize"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Белиз"
  },
  {
    "name": "Бенин",
    "nameEn": "Benin",
    "abbr": "BJ",
    // "abbr333": "BEN",
    "val": "XOF",
    "code": "+229",
    "example": "+229 XX XX XX XX",
    "aliases": [
      "Benin"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Бенин"
  },
  {
    "name": "Bermuda",
    "nameEn": "Bermuda",
    "abbr": "BM",
    // "abbr333": "BMU",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "Bermuda"
    ],
    "flag": "https://en.wikipedia.org/wiki/Bermuda"
  },
  {
    "name": "Бутан",
    "nameEn": "Bhutan",
    "abbr": "BT",
    // "abbr333": "BTN",
    "val": "BTN",
    "code": "+975",
    "example": "+975 X XXX XXX",
    "aliases": [
      "Bhutan"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Бутан"
  },
  {
    "name": "Боливия",
    "nameEn": "Bolivia",
    "abbr": "BO",
    // "abbr333": "BOL",
    "val": "BOB",
    "code": "+591",
    "example": "+591 X XXX XXXX",
    "aliases": [
      "Bolivia"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Боливия"
  },
  {
    "name": "Bonaire, Sint Eustatius and Saba",
    "nameEn": "Bonaire, Sint Eustatius and Saba",
    "abbr": "BQ",
    // "abbr333": "BES",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "Bonaire, Sint Eustatius and Saba"
    ],
    "flag": "https://en.wikipedia.org/wiki/Bonaire,_Sint_Eustatius_and_Saba"
  },
  {
    "name": "Босния и Герцеговина",
    "nameEn": "Bosnia and Herzegovina",
    "abbr": "BA",
    // "abbr333": "BIH",
    "val": "BAM",
    "code": "+387",
    "example": "+387 XX XXX XXX",
    "aliases": [
      "Bosnia and Herzegovina",
      "BiH"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Босния_и_Герцеговина"
  },
  {
    "name": "Ботсвана",
    "nameEn": "Botswana",
    "abbr": "BW",
    // "abbr333": "BWA",
    "val": "BWP",
    "code": "+267",
    "example": "+267 XX XXX XXX",
    "aliases": [
      "Botswana"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Ботсвана"
  },
  {
    "name": "Bouvet Island",
    "nameEn": "Bouvet Island",
    "abbr": "BV",
    // "abbr333": "BVT",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "Bouvet Island"
    ],
    "flag": "https://en.wikipedia.org/wiki/Bouvet_Island"
  },
  {
    "name": "Бразилия",
    "nameEn": "Brazil",
    "abbr": "BR",
    // "abbr333": "BRA",
    "val": "BRL",
    "code": "+55",
    "example": "+55 XX XXXXX-XXXX",
    "aliases": [
      "Brazil",
      "Brasil"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Бразилия"
  },
  {
    "name": "British Indian Ocean Territory",
    "nameEn": "British Indian Ocean Territory",
    "abbr": "IO",
    // "abbr333": "IOT",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "British Indian Ocean Territory"
    ],
    "flag": "https://en.wikipedia.org/wiki/British_Indian_Ocean_Territory"
  },
  {
    "name": "Бруней",
    "nameEn": "Brunei",
    "abbr": "BN",
    // "abbr333": "BRN",
    "val": "BND",
    "code": "+673",
    "example": "+673 XXX XXXX",
    "aliases": [
      "Brunei"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Бруней"
  },
  {
    "name": "Болгария",
    "nameEn": "Bulgaria",
    "abbr": "BG",
    // "abbr333": "BGR",
    "val": "BGN",
    "code": "+359",
    "example": "+359 XXX XXX XXX",
    "aliases": [
      "Bulgaria",
      "България"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Болгария"
  },
  {
    "name": "Буркина-Фасо",
    "nameEn": "Burkina Faso",
    "abbr": "BF",
    // "abbr333": "BFA",
    "val": "XOF",
    "code": "+226",
    "example": "+226 XX XX XX XX",
    "aliases": [
      "Burkina Faso"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Буркина-Фасо"
  },
  {
    "name": "Бурунди",
    "nameEn": "Burundi",
    "abbr": "BI",
    // "abbr333": "BDI",
    "val": "BIF",
    "code": "+257",
    "example": "+257 XX XX XX XX",
    "aliases": [
      "Burundi"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Бурунди"
  },
  {
    "name": "Камбоджа",
    "nameEn": "Cambodia",
    "abbr": "KH",
    // "abbr333": "KHM",
    "val": "KHR",
    "code": "+855",
    "example": "+855 XX XXX XXX",
    "aliases": [
      "Cambodia"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Камбоджа"
  },
  {
    "name": "Камерун",
    "nameEn": "Cameroon",
    "abbr": "CM",
    // "abbr333": "CMR",
    "val": "XAF",
    "code": "+237",
    "example": "+237 X XX XX XX XX",
    "aliases": [
      "Cameroon"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Камерун"
  },
  {
    "name": "Канада",
    "nameEn": "Canada",
    "abbr": "CA",
    // "abbr333": "CAN",
    "val": "CAD",
    "code": "+1",
    "example": "+1 (XXX) XXX-XXXX",
    "aliases": [
      "Canada"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Канада"
  },
  {
    "name": "Кабо-Верде",
    "nameEn": "Cape Verde",
    "abbr": "CV",
    // "abbr333": "CPV",
    "val": "CVE",
    "code": "+238",
    "example": "+238 XXX XX XX",
    "aliases": [
      "Cape Verde",
      "Cabo Verde"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Кабо-Верде"
  },
  {
    "name": "Cayman Islands",
    "nameEn": "Cayman Islands",
    "abbr": "KY",
    // "abbr333": "CYM",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "Cayman Islands"
    ],
    "flag": "https://en.wikipedia.org/wiki/Cayman_Islands"
  },
  {
    "name": "ЦАР",
    "nameEn": "Central African Republic",
    "abbr": "CF",
    // "abbr333": "CAF",
    "val": "XAF",
    "code": "+236",
    "example": "+236 XX XX XX XX",
    "aliases": [
      "Central African Republic",
      "CAR"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Центральноафриканская_Республика"
  },
  {
    "name": "Чад",
    "nameEn": "Chad",
    "abbr": "TD",
    // "abbr333": "TCD",
    "val": "XAF",
    "code": "+235",
    "example": "+235 XX XX XX XX",
    "aliases": [
      "Chad",
      "Tchad"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Чад"
  },
  {
    "name": "Чили",
    "nameEn": "Chile",
    "abbr": "CL",
    // "abbr333": "CHL",
    "val": "CLP",
    "code": "+56",
    "example": "+56 X XXXX XXXX",
    "aliases": [
      "Chile"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Чили"
  },
  {
    "name": "Китай",
    "nameEn": "China",
    "abbr": "CN",
    // "abbr333": "CHN",
    "val": "CNY",
    "code": "+86",
    "example": "+86 XXX XXXX XXXX",
    "aliases": [
      "China",
      "中国"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Китай"
  },
  {
    "name": "Christmas Island",
    "nameEn": "Christmas Island",
    "abbr": "CX",
    // "abbr333": "CXR",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "Christmas Island"
    ],
    "flag": "https://en.wikipedia.org/wiki/Christmas_Island"
  },
  {
    "name": "Cocos (Keeling) Islands",
    "nameEn": "Cocos (Keeling) Islands",
    "abbr": "CC",
    // "abbr333": "CCK",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "Cocos (Keeling) Islands"
    ],
    "flag": "https://en.wikipedia.org/wiki/Cocos_(Keeling)_Islands"
  },
  {
    "name": "Колумбия",
    "nameEn": "Colombia",
    "abbr": "CO",
    // "abbr333": "COL",
    "val": "COP",
    "code": "+57",
    "example": "+57 XXX XXX XXXX",
    "aliases": [
      "Colombia"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Колумбия"
  },
  {
    "name": "Коморы",
    "nameEn": "Comoros",
    "abbr": "KM",
    // "abbr333": "COM",
    "val": "KMF",
    "code": "+269",
    "example": "+269 XXX XXXX",
    "aliases": [
      "Comoros"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Коморы"
  },
  {
    "name": "Cook Islands",
    "nameEn": "Cook Islands",
    "abbr": "CK",
    // "abbr333": "COK",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "Cook Islands"
    ],
    "flag": "https://en.wikipedia.org/wiki/Cook_Islands"
  },
  {
    "name": "Коста-Рика",
    "nameEn": "Costa Rica",
    "abbr": "CR",
    // "abbr333": "CRI",
    "val": "CRC",
    "code": "+506",
    "example": "+506 XXXX XXXX",
    "aliases": [
      "Costa Rica"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Коста-Рика"
  },
  {
    "name": "Хорватия",
    "nameEn": "Croatia",
    "abbr": "HR",
    // "abbr333": "HRV",
    "val": "EUR",
    "code": "+385",
    "example": "+385 XX XXX XXX",
    "aliases": [
      "Croatia",
      "Hrvatska"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Хорватия"
  },
  {
    "name": "Куба",
    "nameEn": "Cuba",
    "abbr": "CU",
    // "abbr333": "CUB",
    "val": "CUP",
    "code": "+53",
    "example": "+53 X XXX XXXX",
    "aliases": [
      "Cuba"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Куба"
  },
  {
    "name": "Curaçao",
    "nameEn": "Curaçao",
    "abbr": "CW",
    // "abbr333": "CUW",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "Curaçao"
    ],
    "flag": "https://en.wikipedia.org/wiki/Curaçao"
  },
  {
    "name": "Кипр",
    "nameEn": "Cyprus",
    "abbr": "CY",
    // "abbr333": "CYP",
    "val": "EUR",
    "code": "+357",
    "example": "+357 XX XXX XXX",
    "aliases": [
      "Cyprus",
      "Κύπρος"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Кипр"
  },
  {
    "name": "Чехия",
    "nameEn": "Czech Republic",
    "abbr": "CZ",
    // "abbr333": "CZE",
    "val": "CZK",
    "code": "+420",
    "example": "+420 XXX XXX XXX",
    "aliases": [
      "Czech Republic",
      "Czechia",
      "Česká republika"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Чехия"
  },
  {
    "name": "ДР Конго",
    "nameEn": "Democratic Republic of the Congo",
    "abbr": "CD",
    // "abbr333": "COD",
    "val": "CDF",
    "code": "+243",
    "example": "+243 XXX XXX XXX",
    "aliases": [
      "Democratic Republic of the Congo",
      "Congo-Kinshasa",
      "DRC"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Демократическая_Республика_Конго"
  },
  {
    "name": "Дания",
    "nameEn": "Denmark",
    "abbr": "DK",
    // "abbr333": "DNK",
    "val": "DKK",
    "code": "+45",
    "example": "+45 XX XX XX XX",
    "aliases": [
      "Denmark",
      "Danmark"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Дания"
  },
  {
    "name": "Джибути",
    "nameEn": "Djibouti",
    "abbr": "DJ",
    // "abbr333": "DJI",
    "val": "DJF",
    "code": "+253",
    "example": "+253 XX XX XX XX",
    "aliases": [
      "Djibouti"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Джибути"
  },
  {
    "name": "Доминика",
    "nameEn": "Dominica",
    "abbr": "DM",
    // "abbr333": "DMA",
    "val": "XCD",
    "code": "+1767",
    "example": "+1 (767) XXX-XXXX",
    "aliases": [
      "Dominica"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Доминика"
  },
  {
    "name": "Доминиканская Республика",
    "nameEn": "Dominican Republic",
    "abbr": "DO",
    // "abbr333": "DOM",
    "val": "DOP",
    "code": "+1",
    "example": "+1 (XXX) XXX-XXXX",
    "aliases": [
      "Dominican Republic"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Доминиканская_Республика"
  },
  {
    "name": "Тимор-Лешти",
    "nameEn": "East Timor",
    "abbr": "TL",
    // "abbr333": "TLS",
    "val": "USD",
    "code": "+670",
    "example": "+670 XXX XXXX",
    "aliases": [
      "East Timor",
      "Timor-Leste"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Восточный_Тимор"
  },
  {
    "name": "Эквадор",
    "nameEn": "Ecuador",
    "abbr": "EC",
    // "abbr333": "ECU",
    "val": "USD",
    "code": "+593",
    "example": "+593 XX XXX XXXX",
    "aliases": [
      "Ecuador"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Эквадор"
  },
  {
    "name": "Египет",
    "nameEn": "Egypt",
    "abbr": "EG",
    // "abbr333": "EGY",
    "val": "EGP",
    "code": "+20",
    "example": "+20 XX XXXX XXXX",
    "aliases": [
      "Egypt"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Египет"
  },
  {
    "name": "Сальвадор",
    "nameEn": "El Salvador",
    "abbr": "SV",
    // "abbr333": "SLV",
    "val": "USD",
    "code": "+503",
    "example": "+503 XXXX XXXX",
    "aliases": [
      "El Salvador"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Сальвадор"
  },
  {
    "name": "Экваториальная Гвинея",
    "nameEn": "Equatorial Guinea",
    "abbr": "GQ",
    // "abbr333": "GNQ",
    "val": "XAF",
    "code": "+240",
    "example": "+240 XXX XXX XXX",
    "aliases": [
      "Equatorial Guinea"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Экваториальная_Гвинея"
  },
  {
    "name": "Эритрея",
    "nameEn": "Eritrea",
    "abbr": "ER",
    // "abbr333": "ERI",
    "val": "ERN",
    "code": "+291",
    "example": "+291 X XXX XXX",
    "aliases": [
      "Eritrea"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Эритрея"
  },
  {
    "name": "Эстония",
    "nameEn": "Estonia",
    "abbr": "EE",
    // "abbr333": "EST",
    "val": "EUR",
    "code": "+372",
    "example": "+372 XXXX XXXX",
    "aliases": [
      "Estonia",
      "Eesti"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Эстония"
  },
  {
    "name": "Эсватини",
    "nameEn": "Eswatini",
    "abbr": "SZ",
    // "abbr333": "SWZ",
    "val": "SZL",
    "code": "+268",
    "example": "+268 XX XX XXXX",
    "aliases": [
      "Eswatini",
      "Swaziland"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Эсватини"
  },
  {
    "name": "Эфиопия",
    "nameEn": "Ethiopia",
    "abbr": "ET",
    // "abbr333": "ETH",
    "val": "ETB",
    "code": "+251",
    "example": "+251 XX XXX XXXX",
    "aliases": [
      "Ethiopia"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Эфиопия"
  },
  {
    "name": "Falkland Islands (Malvinas)",
    "nameEn": "Falkland Islands (Malvinas)",
    "abbr": "FK",
    // "abbr333": "FLK",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "Falkland Islands (Malvinas)"
    ],
    "flag": "https://en.wikipedia.org/wiki/Falkland_Islands_(Malvinas)"
  },
  {
    "name": "Faroe Islands",
    "nameEn": "Faroe Islands",
    "abbr": "FO",
    // "abbr333": "FRO",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "Faroe Islands"
    ],
    "flag": "https://en.wikipedia.org/wiki/Faroe_Islands"
  },
  {
    "name": "Фиджи",
    "nameEn": "Fiji",
    "abbr": "FJ",
    // "abbr333": "FJI",
    "val": "FJD",
    "code": "+679",
    "example": "+679 XXX XXXX",
    "aliases": [
      "Fiji"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Фиджи"
  },
  {
    "name": "Финляндия",
    "nameEn": "Finland",
    "abbr": "FI",
    // "abbr333": "FIN",
    "val": "EUR",
    "code": "+358",
    "example": "+358 XX XXX XXXX",
    "aliases": [
      "Finland",
      "Suomi"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Финляндия"
  },
  {
    "name": "Франция",
    "nameEn": "France",
    "abbr": "FR",
    // "abbr333": "FRA",
    "val": "EUR",
    "code": "+33",
    "example": "+33 X XX XX XX XX",
    "aliases": [
      "France"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Франция"
  },
  {
    "name": "French Guiana",
    "nameEn": "French Guiana",
    "abbr": "GF",
    // "abbr333": "GUF",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "French Guiana"
    ],
    "flag": "https://en.wikipedia.org/wiki/French_Guiana"
  },
  {
    "name": "French Polynesia",
    "nameEn": "French Polynesia",
    "abbr": "PF",
    // "abbr333": "PYF",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "French Polynesia"
    ],
    "flag": "https://en.wikipedia.org/wiki/French_Polynesia"
  },
  {
    "name": "French Southern Territories",
    "nameEn": "French Southern Territories",
    "abbr": "TF",
    // "abbr333": "ATF",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "French Southern Territories"
    ],
    "flag": "https://en.wikipedia.org/wiki/French_Southern_Territories"
  },
  {
    "name": "Габон",
    "nameEn": "Gabon",
    "abbr": "GA",
    // "abbr333": "GAB",
    "val": "XAF",
    "code": "+241",
    "example": "+241 X XX XX XX",
    "aliases": [
      "Gabon"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Габон"
  },
  {
    "name": "Гамбия",
    "nameEn": "Gambia",
    "abbr": "GM",
    // "abbr333": "GMB",
    "val": "GMD",
    "code": "+220",
    "example": "+220 XXX XXXX",
    "aliases": [
      "Gambia"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Гамбия"
  },
  {
    "name": "Грузия",
    "nameEn": "Georgia",
    "abbr": "GE",
    // "abbr333": "GEO",
    "val": "GEL",
    "code": "+995",
    "example": "+995 XXX XXX XXX",
    "aliases": [
      "Georgia",
      "საქართველო"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Грузия"
  },
  {
    "name": "Германия",
    "nameEn": "Germany",
    "abbr": "DE",
    // "abbr333": "DEU",
    "val": "EUR",
    "code": "+49",
    "example": "+49 XXX XXXXXXX",
    "aliases": [
      "Germany",
      "Deutschland"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Германия"
  },
  {
    "name": "Гана",
    "nameEn": "Ghana",
    "abbr": "GH",
    // "abbr333": "GHA",
    "val": "GHS",
    "code": "+233",
    "example": "+233 XX XXX XXXX",
    "aliases": [
      "Ghana"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Гана"
  },
  {
    "name": "Gibraltar",
    "nameEn": "Gibraltar",
    "abbr": "GI",
    // "abbr333": "GIB",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "Gibraltar"
    ],
    "flag": "https://en.wikipedia.org/wiki/Gibraltar"
  },
  {
    "name": "Греция",
    "nameEn": "Greece",
    "abbr": "GR",
    // "abbr333": "GRC",
    "val": "EUR",
    "code": "+30",
    "example": "+30 XXX XXX XXXX",
    "aliases": [
      "Greece",
      "Ελλάδα"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Греция"
  },
  {
    "name": "Greenland",
    "nameEn": "Greenland",
    "abbr": "GL",
    // "abbr333": "GRL",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "Greenland"
    ],
    "flag": "https://en.wikipedia.org/wiki/Greenland"
  },
  {
    "name": "Гренада",
    "nameEn": "Grenada",
    "abbr": "GD",
    // "abbr333": "GRD",
    "val": "XCD",
    "code": "+1473",
    "example": "+1 (473) XXX-XXXX",
    "aliases": [
      "Grenada"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Гренада"
  },
  {
    "name": "Guadeloupe",
    "nameEn": "Guadeloupe",
    "abbr": "GP",
    // "abbr333": "GLP",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "Guadeloupe"
    ],
    "flag": "https://en.wikipedia.org/wiki/Guadeloupe"
  },
  {
    "name": "Guam",
    "nameEn": "Guam",
    "abbr": "GU",
    // "abbr333": "GUM",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "Guam"
    ],
    "flag": "https://en.wikipedia.org/wiki/Guam"
  },
  {
    "name": "Гватемала",
    "nameEn": "Guatemala",
    "abbr": "GT",
    // "abbr333": "GTM",
    "val": "GTQ",
    "code": "+502",
    "example": "+502 XXXX XXXX",
    "aliases": [
      "Guatemala"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Гватемала"
  },
  {
    "name": "Guernsey",
    "nameEn": "Guernsey",
    "abbr": "GG",
    // "abbr333": "GGY",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "Guernsey"
    ],
    "flag": "https://en.wikipedia.org/wiki/Guernsey"
  },
  {
    "name": "Гвинея",
    "nameEn": "Guinea",
    "abbr": "GN",
    // "abbr333": "GIN",
    "val": "GNF",
    "code": "+224",
    "example": "+224 XXX XXX XXX",
    "aliases": [
      "Guinea"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Гвинея"
  },
  {
    "name": "Гвинея-Бисау",
    "nameEn": "Guinea-Bissau",
    "abbr": "GW",
    // "abbr333": "GNB",
    "val": "XOF",
    "code": "+245",
    "example": "+245 XXX XXXX",
    "aliases": [
      "Guinea-Bissau"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Гвинея-Бисау"
  },
  {
    "name": "Гайана",
    "nameEn": "Guyana",
    "abbr": "GY",
    // "abbr333": "GUY",
    "val": "GYD",
    "code": "+592",
    "example": "+592 XXX XXXX",
    "aliases": [
      "Guyana"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Гайана"
  },
  {
    "name": "Гаити",
    "nameEn": "Haiti",
    "abbr": "HT",
    // "abbr333": "HTI",
    "val": "HTG",
    "code": "+509",
    "example": "+509 XX XX XXXX",
    "aliases": [
      "Haiti",
      "Haïti"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Гаити"
  },
  {
    "name": "Heard Island and McDonald Islands",
    "nameEn": "Heard Island and McDonald Islands",
    "abbr": "HM",
    // "abbr333": "HMD",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "Heard Island and McDonald Islands"
    ],
    "flag": "https://en.wikipedia.org/wiki/Heard_Island_and_McDonald_Islands"
  },
  {
    "name": "Гондурас",
    "nameEn": "Honduras",
    "abbr": "HN",
    // "abbr333": "HND",
    "val": "HNL",
    "code": "+504",
    "example": "+504 XXXX-XXXX",
    "aliases": [
      "Honduras"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Гондурас"
  },
  {
    "name": "Hong Kong",
    "nameEn": "Hong Kong",
    "abbr": "HK",
    // "abbr333": "HKG",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "Hong Kong"
    ],
    "flag": "https://en.wikipedia.org/wiki/Hong_Kong"
  },
  {
    "name": "Венгрия",
    "nameEn": "Hungary",
    "abbr": "HU",
    // "abbr333": "HUN",
    "val": "HUF",
    "code": "+36",
    "example": "+36 XX XXX XXXX",
    "aliases": [
      "Hungary",
      "Magyarország"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Венгрия"
  },
  {
    "name": "Исландия",
    "nameEn": "Iceland",
    "abbr": "IS",
    // "abbr333": "ISL",
    "val": "ISK",
    "code": "+354",
    "example": "+354 XXX XXXX",
    "aliases": [
      "Iceland",
      "Ísland"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Исландия"
  },
  {
    "name": "Индия",
    "nameEn": "India",
    "abbr": "IN",
    // "abbr333": "IND",
    "val": "INR",
    "code": "+91",
    "example": "+91 XXXXX XXXXX",
    "aliases": [
      "India",
      "भारत"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Индия"
  },
  {
    "name": "Индонезия",
    "nameEn": "Indonesia",
    "abbr": "ID",
    // "abbr333": "IDN",
    "val": "IDR",
    "code": "+62",
    "example": "+62 XXX-XXX-XXXX",
    "aliases": [
      "Indonesia"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Индонезия"
  },
  {
    "name": "Иран",
    "nameEn": "Iran",
    "abbr": "IR",
    // "abbr333": "IRN",
    "val": "IRR",
    "code": "+98",
    "example": "+98 XXX XXX XXXX",
    "aliases": [
      "Iran"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Иран"
  },
  {
    "name": "Ирак",
    "nameEn": "Iraq",
    "abbr": "IQ",
    // "abbr333": "IRQ",
    "val": "IQD",
    "code": "+964",
    "example": "+964 XXX XXX XXXX",
    "aliases": [
      "Iraq"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Ирак"
  },
  {
    "name": "Ирландия",
    "nameEn": "Ireland",
    "abbr": "IE",
    // "abbr333": "IRL",
    "val": "EUR",
    "code": "+353",
    "example": "+353 XX XXX XXXX",
    "aliases": [
      "Ireland",
      "Éire"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Ирландия"
  },
  {
    "name": "Isle of Man",
    "nameEn": "Isle of Man",
    "abbr": "IM",
    // "abbr333": "IMN",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "Isle of Man"
    ],
    "flag": "https://en.wikipedia.org/wiki/Isle_of_Man"
  },
  {
    "name": "Израиль",
    "nameEn": "Israel",
    "abbr": "IL",
    // "abbr333": "ISR",
    "val": "ILS",
    "code": "+972",
    "example": "+972 XX-XXX-XXXX",
    "aliases": [
      "Israel"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Израиль"
  },
  {
    "name": "Италия",
    "nameEn": "Italy",
    "abbr": "IT",
    // "abbr333": "ITA",
    "val": "EUR",
    "code": "+39",
    "example": "+39 XXX XXX XXXX",
    "aliases": [
      "Italy",
      "Italia"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Италия"
  },
  {
    "name": "Кот-д'Ивуар",
    "nameEn": "Ivory Coast",
    "abbr": "CI",
    // "abbr333": "CIV",
    "val": "XOF",
    "code": "+225",
    "example": "+225 XX XX XX XX",
    "aliases": [
      "Ivory Coast",
      "Côte d'Ivoire"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Кот-д'Ивуар"
  },
  {
    "name": "Ямайка",
    "nameEn": "Jamaica",
    "abbr": "JM",
    // "abbr333": "JAM",
    "val": "JMD",
    "code": "+1876",
    "example": "+1 (876) XXX-XXXX",
    "aliases": [
      "Jamaica"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Ямайка"
  },
  {
    "name": "Япония",
    "nameEn": "Japan",
    "abbr": "JP",
    // "abbr333": "JPN",
    "val": "JPY",
    "code": "+81",
    "example": "+81 XX XXXX XXXX",
    "aliases": [
      "Japan",
      "日本"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Япония"
  },
  {
    "name": "Jersey",
    "nameEn": "Jersey",
    "abbr": "JE",
    // "abbr333": "JEY",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "Jersey"
    ],
    "flag": "https://en.wikipedia.org/wiki/Jersey"
  },
  {
    "name": "Иордания",
    "nameEn": "Jordan",
    "abbr": "JO",
    // "abbr333": "JOR",
    "val": "JOD",
    "code": "+962",
    "example": "+962 X XXXX XXXX",
    "aliases": [
      "Jordan"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Иордания"
  },
  {
    "name": "Казахстан",
    "nameEn": "Kazakhstan",
    "abbr": "KZ",
    // "abbr333": "KAZ",
    "val": "KZT",
    "code": "+7",
    "example": "+7 XXX XXX XX XX",
    "aliases": [
      "Kazakhstan",
      "Қазақстан"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Казахстан"
  },
  {
    "name": "Кения",
    "nameEn": "Kenya",
    "abbr": "KE",
    // "abbr333": "KEN",
    "val": "KES",
    "code": "+254",
    "example": "+254 XXX XXXXXX",
    "aliases": [
      "Kenya"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Кения"
  },
  {
    "name": "Кирибати",
    "nameEn": "Kiribati",
    "abbr": "KI",
    // "abbr333": "KIR",
    "val": "AUD",
    "code": "+686",
    "example": "+686 XXXXX",
    "aliases": [
      "Kiribati"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Кирибати"
  },
  {
    "name": "Кувейт",
    "nameEn": "Kuwait",
    "abbr": "KW",
    // "abbr333": "KWT",
    "val": "KWD",
    "code": "+965",
    "example": "+965 XXXX XXXX",
    "aliases": [
      "Kuwait"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Кувейт"
  },
  {
    "name": "Киргизия",
    "nameEn": "Kyrgyzstan",
    "abbr": "KG",
    // "abbr333": "KGZ",
    "val": "KGS",
    "code": "+996",
    "example": "+996 XXX XXX XXX",
    "aliases": [
      "Kyrgyzstan",
      "Кыргызстан"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Киргизия"
  },
  {
    "name": "Лаос",
    "nameEn": "Laos",
    "abbr": "LA",
    // "abbr333": "LAO",
    "val": "LAK",
    "code": "+856",
    "example": "+856 XX XXX XXX",
    "aliases": [
      "Laos"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Лаос"
  },
  {
    "name": "Латвия",
    "nameEn": "Latvia",
    "abbr": "LV",
    // "abbr333": "LVA",
    "val": "EUR",
    "code": "+371",
    "example": "+371 XX XXX XXX",
    "aliases": [
      "Latvia",
      "Latvija"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Латвия"
  },
  {
    "name": "Ливан",
    "nameEn": "Lebanon",
    "abbr": "LB",
    // "abbr333": "LBN",
    "val": "LBP",
    "code": "+961",
    "example": "+961 XX XXX XXX",
    "aliases": [
      "Lebanon"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Ливан"
  },
  {
    "name": "Лесото",
    "nameEn": "Lesotho",
    "abbr": "LS",
    // "abbr333": "LSO",
    "val": "LSL",
    "code": "+266",
    "example": "+266 XX XXX XXX",
    "aliases": [
      "Lesotho"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Лесото"
  },
  {
    "name": "Либерия",
    "nameEn": "Liberia",
    "abbr": "LR",
    // "abbr333": "LBR",
    "val": "LRD",
    "code": "+231",
    "example": "+231 XX XXX XXX",
    "aliases": [
      "Liberia"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Либерия"
  },
  {
    "name": "Ливия",
    "nameEn": "Libya",
    "abbr": "LY",
    // "abbr333": "LBY",
    "val": "LYD",
    "code": "+218",
    "example": "+218 XX XXX XXXX",
    "aliases": [
      "Libya"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Ливия"
  },
  {
    "name": "Лихтенштейн",
    "nameEn": "Liechtenstein",
    "abbr": "LI",
    // "abbr333": "LIE",
    "val": "CHF",
    "code": "+423",
    "example": "+423 XXX XXXX",
    "aliases": [
      "Liechtenstein"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Лихтенштейн"
  },
  {
    "name": "Литва",
    "nameEn": "Lithuania",
    "abbr": "LT",
    // "abbr333": "LTU",
    "val": "EUR",
    "code": "+370",
    "example": "+370 XXX XXXXX",
    "aliases": [
      "Lithuania",
      "Lietuva"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Литва"
  },
  {
    "name": "Люксембург",
    "nameEn": "Luxembourg",
    "abbr": "LU",
    // "abbr333": "LUX",
    "val": "EUR",
    "code": "+352",
    "example": "+352 XXX XXX XXX",
    "aliases": [
      "Luxembourg",
      "Lëtzebuerg"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Люксембург"
  },
  {
    "name": "Macao",
    "nameEn": "Macao",
    "abbr": "MO",
    // "abbr333": "MAC",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "Macao"
    ],
    "flag": "https://en.wikipedia.org/wiki/Macao"
  },
  {
    "name": "Мадагаскар",
    "nameEn": "Madagascar",
    "abbr": "MG",
    // "abbr333": "MDG",
    "val": "MGA",
    "code": "+261",
    "example": "+261 XX XX XXX XX",
    "aliases": [
      "Madagascar"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Мадагаскар"
  },
  {
    "name": "Малави",
    "nameEn": "Malawi",
    "abbr": "MW",
    // "abbr333": "MWI",
    "val": "MWK",
    "code": "+265",
    "example": "+265 X XXX XXXX",
    "aliases": [
      "Malawi"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Малави"
  },
  {
    "name": "Малайзия",
    "nameEn": "Malaysia",
    "abbr": "MY",
    // "abbr333": "MYS",
    "val": "MYR",
    "code": "+60",
    "example": "+60 XX-XXX XXXX",
    "aliases": [
      "Malaysia"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Малайзия"
  },
  {
    "name": "Мальдивы",
    "nameEn": "Maldives",
    "abbr": "MV",
    // "abbr333": "MDV",
    "val": "MVR",
    "code": "+960",
    "example": "+960 XXX-XXXX",
    "aliases": [
      "Maldives"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Мальдивы"
  },
  {
    "name": "Мали",
    "nameEn": "Mali",
    "abbr": "ML",
    // "abbr333": "MLI",
    "val": "XOF",
    "code": "+223",
    "example": "+223 XX XX XX XX",
    "aliases": [
      "Mali"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Мали"
  },
  {
    "name": "Мальта",
    "nameEn": "Malta",
    "abbr": "MT",
    // "abbr333": "MLT",
    "val": "EUR",
    "code": "+356",
    "example": "+356 XXXX XXXX",
    "aliases": [
      "Malta"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Мальта"
  },
  {
    "name": "Маршалловы Острова",
    "nameEn": "Marshall Islands",
    "abbr": "MH",
    // "abbr333": "MHL",
    "val": "USD",
    "code": "+692",
    "example": "+692 XXX-XXXX",
    "aliases": [
      "Marshall Islands"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Маршалловы_Острова"
  },
  {
    "name": "Martinique",
    "nameEn": "Martinique",
    "abbr": "MQ",
    // "abbr333": "MTQ",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "Martinique"
    ],
    "flag": "https://en.wikipedia.org/wiki/Martinique"
  },
  {
    "name": "Мавритания",
    "nameEn": "Mauritania",
    "abbr": "MR",
    // "abbr333": "MRT",
    "val": "MRU",
    "code": "+222",
    "example": "+222 XX XX XX XX",
    "aliases": [
      "Mauritania"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Мавритания"
  },
  {
    "name": "Маврикий",
    "nameEn": "Mauritius",
    "abbr": "MU",
    // "abbr333": "MUS",
    "val": "MUR",
    "code": "+230",
    "example": "+230 XXX XXXX",
    "aliases": [
      "Mauritius"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Маврикий"
  },
  {
    "name": "Mayotte",
    "nameEn": "Mayotte",
    "abbr": "YT",
    // "abbr333": "MYT",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "Mayotte"
    ],
    "flag": "https://en.wikipedia.org/wiki/Mayotte"
  },
  {
    "name": "Мексика",
    "nameEn": "Mexico",
    "abbr": "MX",
    // "abbr333": "MEX",
    "val": "MXN",
    "code": "+52",
    "example": "+52 XXX XXX XXXX",
    "aliases": [
      "Mexico",
      "México"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Мексика"
  },
  {
    "name": "Микронезия",
    "nameEn": "Micronesia",
    "abbr": "FM",
    // "abbr333": "FSM",
    "val": "USD",
    "code": "+691",
    "example": "+691 XXX XXXX",
    "aliases": [
      "Micronesia",
      "FSM"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Федеративные_Штаты_Микронезии"
  },
  {
    "name": "Молдова",
    "nameEn": "Moldova",
    "abbr": "MD",
    // "abbr333": "MDA",
    "val": "MDL",
    "code": "+373",
    "example": "+373 XXXX XXXX",
    "aliases": [
      "Moldova"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Молдова"
  },
  {
    "name": "Монако",
    "nameEn": "Monaco",
    "abbr": "MC",
    // "abbr333": "MCO",
    "val": "EUR",
    "code": "+377",
    "example": "+377 XX XX XX XX",
    "aliases": [
      "Monaco"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Монако"
  },
  {
    "name": "Монголия",
    "nameEn": "Mongolia",
    "abbr": "MN",
    // "abbr333": "MNG",
    "val": "MNT",
    "code": "+976",
    "example": "+976 XXXX XXXX",
    "aliases": [
      "Mongolia",
      "Монгол Улс"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Монголия"
  },
  {
    "name": "Черногория",
    "nameEn": "Montenegro",
    "abbr": "ME",
    // "abbr333": "MNE",
    "val": "EUR",
    "code": "+382",
    "example": "+382 XX XXX XXX",
    "aliases": [
      "Montenegro",
      "Црна Гора"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Черногория"
  },
  {
    "name": "Montserrat",
    "nameEn": "Montserrat",
    "abbr": "MS",
    // "abbr333": "MSR",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "Montserrat"
    ],
    "flag": "https://en.wikipedia.org/wiki/Montserrat"
  },
  {
    "name": "Марокко",
    "nameEn": "Morocco",
    "abbr": "MA",
    // "abbr333": "MAR",
    "val": "MAD",
    "code": "+212",
    "example": "+212 XXX-XXXXXX",
    "aliases": [
      "Morocco"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Марокко"
  },
  {
    "name": "Мозамбик",
    "nameEn": "Mozambique",
    "abbr": "MZ",
    // "abbr333": "MOZ",
    "val": "MZN",
    "code": "+258",
    "example": "+258 XX XXX XXXX",
    "aliases": [
      "Mozambique"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Мозамбик"
  },
  {
    "name": "Мьянма",
    "nameEn": "Myanmar",
    "abbr": "MM",
    // "abbr333": "MMR",
    "val": "MMK",
    "code": "+95",
    "example": "+95 X XXX XXXX",
    "aliases": [
      "Myanmar",
      "Burma"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Мьянма"
  },
  {
    "name": "Намибия",
    "nameEn": "Namibia",
    "abbr": "NA",
    // "abbr333": "NAM",
    "val": "NAD",
    "code": "+264",
    "example": "+264 XX XXX XXXX",
    "aliases": [
      "Namibia"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Намибия"
  },
  {
    "name": "Науру",
    "nameEn": "Nauru",
    "abbr": "NR",
    // "abbr333": "NRU",
    "val": "AUD",
    "code": "+674",
    "example": "+674 XXX XXXX",
    "aliases": [
      "Nauru"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Науру"
  },
  {
    "name": "Непал",
    "nameEn": "Nepal",
    "abbr": "NP",
    // "abbr333": "NPL",
    "val": "NPR",
    "code": "+977",
    "example": "+977 XXX-XXX-XXXX",
    "aliases": [
      "Nepal",
      "नेपाल"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Непал"
  },
  {
    "name": "Нидерланды",
    "nameEn": "Netherlands",
    "abbr": "NL",
    // "abbr333": "NLD",
    "val": "EUR",
    "code": "+31",
    "example": "+31 X XXXX XXXX",
    "aliases": [
      "Netherlands",
      "Nederland"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Нидерланды"
  },
  {
    "name": "New Caledonia",
    "nameEn": "New Caledonia",
    "abbr": "NC",
    // "abbr333": "NCL",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "New Caledonia"
    ],
    "flag": "https://en.wikipedia.org/wiki/New_Caledonia"
  },
  {
    "name": "Новая Зеландия",
    "nameEn": "New Zealand",
    "abbr": "NZ",
    // "abbr333": "NZL",
    "val": "NZD",
    "code": "+64",
    "example": "+64 XX XXX XXXX",
    "aliases": [
      "New Zealand",
      "Aotearoa"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Новая_Зеландия"
  },
  {
    "name": "Никарагуа",
    "nameEn": "Nicaragua",
    "abbr": "NI",
    // "abbr333": "NIC",
    "val": "NIO",
    "code": "+505",
    "example": "+505 XXXX XXXX",
    "aliases": [
      "Nicaragua"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Никарагуа"
  },
  {
    "name": "Нигер",
    "nameEn": "Niger",
    "abbr": "NE",
    // "abbr333": "NER",
    "val": "XOF",
    "code": "+227",
    "example": "+227 XX XX XX XX",
    "aliases": [
      "Niger"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Нигер"
  },
  {
    "name": "Нигерия",
    "nameEn": "Nigeria",
    "abbr": "NG",
    // "abbr333": "NGA",
    "val": "NGN",
    "code": "+234",
    "example": "+234 XXX XXX XXXX",
    "aliases": [
      "Nigeria"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Нигерия"
  },
  {
    "name": "Niue",
    "nameEn": "Niue",
    "abbr": "NU",
    // "abbr333": "NIU",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "Niue"
    ],
    "flag": "https://en.wikipedia.org/wiki/Niue"
  },
  {
    "name": "Norfolk Island",
    "nameEn": "Norfolk Island",
    "abbr": "NF",
    // "abbr333": "NFK",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "Norfolk Island"
    ],
    "flag": "https://en.wikipedia.org/wiki/Norfolk_Island"
  },
  {
    "name": "КНДР",
    "nameEn": "North Korea",
    "abbr": "KP",
    // "abbr333": "PRK",
    "val": "KPW",
    "code": "+850",
    "example": "+850 XXX XXX XXXX",
    "aliases": [
      "North Korea",
      "조선민주주의인민공화국"
    ],
    "flag": "https://ru.wikipedia.org/wiki/КНДР"
  },
  {
    "name": "Северная Македония",
    "nameEn": "North Macedonia",
    "abbr": "MK",
    // "abbr333": "MKD",
    "val": "MKD",
    "code": "+389",
    "example": "+389 XX XXX XXX",
    "aliases": [
      "North Macedonia",
      "Macedonia"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Северная_Македония"
  },
  {
    "name": "Northern Mariana Islands",
    "nameEn": "Northern Mariana Islands",
    "abbr": "MP",
    // "abbr333": "MNP",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "Northern Mariana Islands"
    ],
    "flag": "https://en.wikipedia.org/wiki/Northern_Mariana_Islands"
  },
  {
    "name": "Норвегия",
    "nameEn": "Norway",
    "abbr": "NO",
    // "abbr333": "NOR",
    "val": "NOK",
    "code": "+47",
    "example": "+47 XXX XX XXX",
    "aliases": [
      "Norway",
      "Norge"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Норвегия"
  },
  {
    "name": "Оман",
    "nameEn": "Oman",
    "abbr": "OM",
    // "abbr333": "OMN",
    "val": "OMR",
    "code": "+968",
    "example": "+968 XXXX XXXX",
    "aliases": [
      "Oman"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Оман"
  },
  {
    "name": "Пакистан",
    "nameEn": "Pakistan",
    "abbr": "PK",
    // "abbr333": "PAK",
    "val": "PKR",
    "code": "+92",
    "example": "+92 XXX XXX XXXX",
    "aliases": [
      "Pakistan",
      "پاکستان"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Пакистан"
  },
  {
    "name": "Палау",
    "nameEn": "Palau",
    "abbr": "PW",
    // "abbr333": "PLW",
    "val": "USD",
    "code": "+680",
    "example": "+680 XXX XXXX",
    "aliases": [
      "Palau"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Палау"
  },
  {
    "name": "Palestine, State of",
    "nameEn": "Palestine, State of",
    "abbr": "PS",
    // "abbr333": "PSE",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "Palestine, State of"
    ],
    "flag": "https://en.wikipedia.org/wiki/Palestine,_State_of"
  },
  {
    "name": "Панама",
    "nameEn": "Panama",
    "abbr": "PA",
    // "abbr333": "PAN",
    "val": "PAB",
    "code": "+507",
    "example": "+507 XXXX-XXXX",
    "aliases": [
      "Panama",
      "Panamá"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Панама"
  },
  {
    "name": "Папуа — Новая Гвинея",
    "nameEn": "Papua New Guinea",
    "abbr": "PG",
    // "abbr333": "PNG",
    "val": "PGK",
    "code": "+675",
    "example": "+675 XXXX XXXX",
    "aliases": [
      "Papua New Guinea",
      "PNG"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Папуа_—_Новая_Гвинея"
  },
  {
    "name": "Парагвай",
    "nameEn": "Paraguay",
    "abbr": "PY",
    // "abbr333": "PRY",
    "val": "PYG",
    "code": "+595",
    "example": "+595 XXX XXX XXX",
    "aliases": [
      "Paraguay"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Парагвай"
  },
  {
    "name": "Перу",
    "nameEn": "Peru",
    "abbr": "PE",
    // "abbr333": "PER",
    "val": "PEN",
    "code": "+51",
    "example": "+51 XXX XXX XXX",
    "aliases": [
      "Peru",
      "Perú"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Перу"
  },
  {
    "name": "Филиппины",
    "nameEn": "Philippines",
    "abbr": "PH",
    // "abbr333": "PHL",
    "val": "PHP",
    "code": "+63",
    "example": "+63 XXX XXX XXXX",
    "aliases": [
      "Philippines"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Филиппины"
  },
  {
    "name": "Pitcairn",
    "nameEn": "Pitcairn",
    "abbr": "PN",
    // "abbr333": "PCN",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "Pitcairn"
    ],
    "flag": "https://en.wikipedia.org/wiki/Pitcairn"
  },
  {
    "name": "Польша",
    "nameEn": "Poland",
    "abbr": "PL",
    // "abbr333": "POL",
    "val": "PLN",
    "code": "+48",
    "example": "+48 XXX XXX XXX",
    "aliases": [
      "Poland",
      "Polska"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Польша"
  },
  {
    "name": "Португалия",
    "nameEn": "Portugal",
    "abbr": "PT",
    // "abbr333": "PRT",
    "val": "EUR",
    "code": "+351",
    "example": "+351 XXX XXX XXX",
    "aliases": [
      "Portugal"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Португалия"
  },
  {
    "name": "Puerto Rico",
    "nameEn": "Puerto Rico",
    "abbr": "PR",
    // "abbr333": "PRI",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "Puerto Rico"
    ],
    "flag": "https://en.wikipedia.org/wiki/Puerto_Rico"
  },
  {
    "name": "Катар",
    "nameEn": "Qatar",
    "abbr": "QA",
    // "abbr333": "QAT",
    "val": "QAR",
    "code": "+974",
    "example": "+974 XXXX XXXX",
    "aliases": [
      "Qatar"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Катар"
  },
  {
    "name": "Республика Конго",
    "nameEn": "Republic of the Congo",
    "abbr": "CG",
    // "abbr333": "COG",
    "val": "XAF",
    "code": "+242",
    "example": "+242 XX XXX XXXX",
    "aliases": [
      "Republic of the Congo",
      "Congo-Brazzaville"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Республика_Конго"
  },
  {
    "name": "Румыния",
    "nameEn": "Romania",
    "abbr": "RO",
    // "abbr333": "ROU",
    "val": "RON",
    "code": "+40",
    "example": "+40 XXX XXX XXX",
    "aliases": [
      "Romania",
      "România"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Румыния"
  },
  {
    "name": "Россия",
    "nameEn": "Russia",
    "abbr": "RU",
    // "abbr333": "RUS",
    "val": "RUB",
    "code": "+7",
    "example": "+7 XXX XXX-XX-XX",
    "aliases": [
      "Russia",
      "Россия",
      "Russian Federation"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Россия"
  },
  {
    "name": "Руанда",
    "nameEn": "Rwanda",
    "abbr": "RW",
    // "abbr333": "RWA",
    "val": "RWF",
    "code": "+250",
    "example": "+250 XXX XXX XXX",
    "aliases": [
      "Rwanda"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Руанда"
  },
  {
    "name": "Réunion",
    "nameEn": "Réunion",
    "abbr": "RE",
    // "abbr333": "REU",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "Réunion"
    ],
    "flag": "https://en.wikipedia.org/wiki/Réunion"
  },
  {
    "name": "Saint Barthélemy",
    "nameEn": "Saint Barthélemy",
    "abbr": "BL",
    // "abbr333": "BLM",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "Saint Barthélemy"
    ],
    "flag": "https://en.wikipedia.org/wiki/Saint_Barthélemy"
  },
  {
    "name": "Saint Helena, Ascension and Tristan da Cunha",
    "nameEn": "Saint Helena, Ascension and Tristan da Cunha",
    "abbr": "SH",
    // "abbr333": "SHN",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "Saint Helena, Ascension and Tristan da Cunha"
    ],
    "flag": "https://en.wikipedia.org/wiki/Saint_Helena,_Ascension_and_Tristan_da_Cunha"
  },
  {
    "name": "Сент-Китс и Невис",
    "nameEn": "Saint Kitts and Nevis",
    "abbr": "KN",
    // "abbr333": "KNA",
    "val": "XCD",
    "code": "+1869",
    "example": "+1 (869) XXX-XXXX",
    "aliases": [
      "Saint Kitts and Nevis"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Сент-Китс_и_Невис"
  },
  {
    "name": "Сент-Люсия",
    "nameEn": "Saint Lucia",
    "abbr": "LC",
    // "abbr333": "LCA",
    "val": "XCD",
    "code": "+1758",
    "example": "+1 (758) XXX-XXXX",
    "aliases": [
      "Saint Lucia"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Сент-Люсия"
  },
  {
    "name": "Saint Martin (French part)",
    "nameEn": "Saint Martin (French part)",
    "abbr": "MF",
    // "abbr333": "MAF",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "Saint Martin (French part)"
    ],
    "flag": "https://en.wikipedia.org/wiki/Saint_Martin_(French_part)"
  },
  {
    "name": "Saint Pierre and Miquelon",
    "nameEn": "Saint Pierre and Miquelon",
    "abbr": "PM",
    // "abbr333": "SPM",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "Saint Pierre and Miquelon"
    ],
    "flag": "https://en.wikipedia.org/wiki/Saint_Pierre_and_Miquelon"
  },
  {
    "name": "Сент-Винсент и Гренадины",
    "nameEn": "Saint Vincent and the Grenadines",
    "abbr": "VC",
    // "abbr333": "VCT",
    "val": "XCD",
    "code": "+1784",
    "example": "+1 (784) XXX-XXXX",
    "aliases": [
      "Saint Vincent and the Grenadines"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Сент-Винсент_и_Гренадины"
  },
  {
    "name": "Самоа",
    "nameEn": "Samoa",
    "abbr": "WS",
    // "abbr333": "WSM",
    "val": "WST",
    "code": "+685",
    "example": "+685 XXXXX",
    "aliases": [
      "Samoa"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Самоа"
  },
  {
    "name": "Сан-Марино",
    "nameEn": "San Marino",
    "abbr": "SM",
    // "abbr333": "SMR",
    "val": "EUR",
    "code": "+378",
    "example": "+378 XXXX XXXXXX",
    "aliases": [
      "San Marino"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Сан-Марино"
  },
  {
    "name": "Саудовская Аравия",
    "nameEn": "Saudi Arabia",
    "abbr": "SA",
    // "abbr333": "SAU",
    "val": "SAR",
    "code": "+966",
    "example": "+966 XX XXX XXXX",
    "aliases": [
      "Saudi Arabia"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Саудовская_Аравия"
  },
  {
    "name": "Сенегал",
    "nameEn": "Senegal",
    "abbr": "SN",
    // "abbr333": "SEN",
    "val": "XOF",
    "code": "+221",
    "example": "+221 XX XXX XX XX",
    "aliases": [
      "Senegal"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Сенегал"
  },
  {
    "name": "Сербия",
    "nameEn": "Serbia",
    "abbr": "RS",
    // "abbr333": "SRB",
    "val": "RSD",
    "code": "+381",
    "example": "+381 XX XXX XXXX",
    "aliases": [
      "Serbia",
      "Србија"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Сербия"
  },
  {
    "name": "Сейшелы",
    "nameEn": "Seychelles",
    "abbr": "SC",
    // "abbr333": "SYC",
    "val": "SCR",
    "code": "+248",
    "example": "+248 X XX XX XX",
    "aliases": [
      "Seychelles"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Сейшелы"
  },
  {
    "name": "Сьерра-Леоне",
    "nameEn": "Sierra Leone",
    "abbr": "SL",
    // "abbr333": "SLE",
    "val": "SLL",
    "code": "+232",
    "example": "+232 XX XXX XXX",
    "aliases": [
      "Sierra Leone"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Сьерра-Леоне"
  },
  {
    "name": "Сингапур",
    "nameEn": "Singapore",
    "abbr": "SG",
    // "abbr333": "SGP",
    "val": "SGD",
    "code": "+65",
    "example": "+65 XXXX XXXX",
    "aliases": [
      "Singapore"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Сингапур"
  },
  {
    "name": "Sint Maarten (Dutch part)",
    "nameEn": "Sint Maarten (Dutch part)",
    "abbr": "SX",
    // "abbr333": "SXM",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "Sint Maarten (Dutch part)"
    ],
    "flag": "https://en.wikipedia.org/wiki/Sint_Maarten_(Dutch_part)"
  },
  {
    "name": "Словакия",
    "nameEn": "Slovakia",
    "abbr": "SK",
    // "abbr333": "SVK",
    "val": "EUR",
    "code": "+421",
    "example": "+421 XXX XXX XXX",
    "aliases": [
      "Slovakia",
      "Slovensko"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Словакия"
  },
  {
    "name": "Словения",
    "nameEn": "Slovenia",
    "abbr": "SI",
    // "abbr333": "SVN",
    "val": "EUR",
    "code": "+386",
    "example": "+386 XX XXX XXX",
    "aliases": [
      "Slovenia",
      "Slovenija"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Словения"
  },
  {
    "name": "Соломоновы Острова",
    "nameEn": "Solomon Islands",
    "abbr": "SB",
    // "abbr333": "SLB",
    "val": "SBD",
    "code": "+677",
    "example": "+677 XXXXX",
    "aliases": [
      "Solomon Islands"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Соломоновы_Острова"
  },
  {
    "name": "Сомали",
    "nameEn": "Somalia",
    "abbr": "SO",
    // "abbr333": "SOM",
    "val": "SOS",
    "code": "+252",
    "example": "+252 XX XXX XXX",
    "aliases": [
      "Somalia"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Сомали"
  },
  {
    "name": "ЮАР",
    "nameEn": "South Africa",
    "abbr": "ZA",
    // "abbr333": "ZAF",
    "val": "ZAR",
    "code": "+27",
    "example": "+27 XX XXX XXXX",
    "aliases": [
      "South Africa"
    ],
    "flag": "https://ru.wikipedia.org/wiki/ЮАР"
  },
  {
    "name": "South Georgia and the South Sandwich Islands",
    "nameEn": "South Georgia and the South Sandwich Islands",
    "abbr": "GS",
    // "abbr333": "SGS",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "South Georgia and the South Sandwich Islands"
    ],
    "flag": "https://en.wikipedia.org/wiki/South_Georgia_and_the_South_Sandwich_Islands"
  },
  {
    "name": "Южная Корея",
    "nameEn": "South Korea",
    "abbr": "KR",
    // "abbr333": "KOR",
    "val": "KRW",
    "code": "+82",
    "example": "+82 XX XXXX XXXX",
    "aliases": [
      "South Korea",
      "대한민국"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Республика_Корея"
  },
  {
    "name": "Южный Судан",
    "nameEn": "South Sudan",
    "abbr": "SS",
    // "abbr333": "SSD",
    "val": "SSP",
    "code": "+211",
    "example": "+211 XXX XXX XXX",
    "aliases": [
      "South Sudan"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Южный_Судан"
  },
  {
    "name": "Испания",
    "nameEn": "Spain",
    "abbr": "ES",
    // "abbr333": "ESP",
    "val": "EUR",
    "code": "+34",
    "example": "+34 XXX XXX XXX",
    "aliases": [
      "Spain",
      "España"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Испания"
  },
  {
    "name": "Шри-Ланка",
    "nameEn": "Sri Lanka",
    "abbr": "LK",
    // "abbr333": "LKA",
    "val": "LKR",
    "code": "+94",
    "example": "+94 XX XXX XXXX",
    "aliases": [
      "Sri Lanka",
      "ශ්‍රී ලංකා"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Шри-Ланка"
  },
  {
    "name": "Судан",
    "nameEn": "Sudan",
    "abbr": "SD",
    // "abbr333": "SDN",
    "val": "SDG",
    "code": "+249",
    "example": "+249 XXX XXX XXX",
    "aliases": [
      "Sudan"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Судан"
  },
  {
    "name": "Суринам",
    "nameEn": "Suriname",
    "abbr": "SR",
    // "abbr333": "SUR",
    "val": "SRD",
    "code": "+597",
    "example": "+597 XXX-XXXX",
    "aliases": [
      "Suriname"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Суринам"
  },
  {
    "name": "Svalbard and Jan Mayen",
    "nameEn": "Svalbard and Jan Mayen",
    "abbr": "SJ",
    // "abbr333": "SJM",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "Svalbard and Jan Mayen"
    ],
    "flag": "https://en.wikipedia.org/wiki/Svalbard_and_Jan_Mayen"
  },
  {
    "name": "Швеция",
    "nameEn": "Sweden",
    "abbr": "SE",
    // "abbr333": "SWE",
    "val": "SEK",
    "code": "+46",
    "example": "+46 XX XXX XX XX",
    "aliases": [
      "Sweden",
      "Sverige"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Швеция"
  },
  {
    "name": "Швейцария",
    "nameEn": "Switzerland",
    "abbr": "CH",
    // "abbr333": "CHE",
    "val": "CHF",
    "code": "+41",
    "example": "+41 XX XXX XX XX",
    "aliases": [
      "Switzerland",
      "Schweiz",
      "Suisse",
      "Svizzera"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Швейцария"
  },
  {
    "name": "Сирия",
    "nameEn": "Syria",
    "abbr": "SY",
    // "abbr333": "SYR",
    "val": "SYP",
    "code": "+963",
    "example": "+963 XXX XXX XXX",
    "aliases": [
      "Syria"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Сирия"
  },
  {
    "name": "Сан-Томе и Принсипи",
    "nameEn": "São Tomé and Príncipe",
    "abbr": "ST",
    // "abbr333": "STP",
    "val": "STN",
    "code": "+239",
    "example": "+239 XXX XXXX",
    "aliases": [
      "São Tomé and Príncipe"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Сан-Томе_и_Принсипи"
  },
  {
    "name": "Taiwan, Province of China",
    "nameEn": "Taiwan, Province of China",
    "abbr": "TW",
    // "abbr333": "TWN",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "Taiwan, Province of China"
    ],
    "flag": "https://en.wikipedia.org/wiki/Taiwan,_Province_of_China"
  },
  {
    "name": "Таджикистан",
    "nameEn": "Tajikistan",
    "abbr": "TJ",
    // "abbr333": "TJK",
    "val": "TJS",
    "code": "+992",
    "example": "+992 XXX XXX XXX",
    "aliases": [
      "Tajikistan",
      "Тоҷикистон"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Таджикистан"
  },
  {
    "name": "Танзания",
    "nameEn": "Tanzania",
    "abbr": "TZ",
    // "abbr333": "TZA",
    "val": "TZS",
    "code": "+255",
    "example": "+255 XXX XXX XXX",
    "aliases": [
      "Tanzania"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Танзания"
  },
  {
    "name": "Таиланд",
    "nameEn": "Thailand",
    "abbr": "TH",
    // "abbr333": "THA",
    "val": "THB",
    "code": "+66",
    "example": "+66 XX XXX XXXX",
    "aliases": [
      "Thailand",
      "ประเทศไทย"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Таиланд"
  },
  {
    "name": "Того",
    "nameEn": "Togo",
    "abbr": "TG",
    // "abbr333": "TGO",
    "val": "XOF",
    "code": "+228",
    "example": "+228 XX XX XX XX",
    "aliases": [
      "Togo"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Того"
  },
  {
    "name": "Tokelau",
    "nameEn": "Tokelau",
    "abbr": "TK",
    // "abbr333": "TKL",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "Tokelau"
    ],
    "flag": "https://en.wikipedia.org/wiki/Tokelau"
  },
  {
    "name": "Тонга",
    "nameEn": "Tonga",
    "abbr": "TO",
    // "abbr333": "TON",
    "val": "TOP",
    "code": "+676",
    "example": "+676 XXXXX",
    "aliases": [
      "Tonga"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Тонга"
  },
  {
    "name": "Тринидад и Тобаго",
    "nameEn": "Trinidad and Tobago",
    "abbr": "TT",
    // "abbr333": "TTO",
    "val": "TTD",
    "code": "+1868",
    "example": "+1 (868) XXX-XXXX",
    "aliases": [
      "Trinidad and Tobago"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Тринидад_и_Тобаго"
  },
  {
    "name": "Тунис",
    "nameEn": "Tunisia",
    "abbr": "TN",
    // "abbr333": "TUN",
    "val": "TND",
    "code": "+216",
    "example": "+216 XX XXX XXX",
    "aliases": [
      "Tunisia"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Тунис"
  },
  {
    "name": "Турция",
    "nameEn": "Turkey",
    "abbr": "TR",
    // "abbr333": "TUR",
    "val": "TRY",
    "code": "+90",
    "example": "+90 XXX XXX XX XX",
    "aliases": [
      "Turkey",
      "Türkiye"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Турция"
  },
  {
    "name": "Туркменистан",
    "nameEn": "Turkmenistan",
    "abbr": "TM",
    // "abbr333": "TKM",
    "val": "TMT",
    "code": "+993",
    "example": "+993 XX XXX XXX",
    "aliases": [
      "Turkmenistan",
      "Türkmenistan"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Туркменистан"
  },
  {
    "name": "Turks and Caicos Islands",
    "nameEn": "Turks and Caicos Islands",
    "abbr": "TC",
    // "abbr333": "TCA",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "Turks and Caicos Islands"
    ],
    "flag": "https://en.wikipedia.org/wiki/Turks_and_Caicos_Islands"
  },
  {
    "name": "Тувалу",
    "nameEn": "Tuvalu",
    "abbr": "TV",
    // "abbr333": "TUV",
    "val": "AUD",
    "code": "+688",
    "example": "+688 XXXXX",
    "aliases": [
      "Tuvalu"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Тувалу"
  },
  {
    "name": "Уганда",
    "nameEn": "Uganda",
    "abbr": "UG",
    // "abbr333": "UGA",
    "val": "UGX",
    "code": "+256",
    "example": "+256 XXX XXXXXX",
    "aliases": [
      "Uganda"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Уганда"
  },
  {
    "name": "Украина",
    "nameEn": "Ukraine",
    "abbr": "UA",
    // "abbr333": "UKR",
    "val": "UAH",
    "code": "+380",
    "example": "+380 XX XXX XX XX",
    "aliases": [
      "Ukraine",
      "Україна"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Украина"
  },
  {
    "name": "ОАЭ",
    "nameEn": "United Arab Emirates",
    "abbr": "AE",
    // "abbr333": "ARE",
    "val": "AED",
    "code": "+971",
    "example": "+971 XX XXX XXXX",
    "aliases": [
      "United Arab Emirates",
      "UAE"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Объединённые_Арабские_Эмираты"
  },
  {
    "name": "Великобритания",
    "nameEn": "United Kingdom",
    "abbr": "GB",
    // "abbr333": "GBR",
    "val": "GBP",
    "code": "+44",
    "example": "+44 XXXX XXXXXX",
    "aliases": [
      "United Kingdom",
      "UK",
      "Britain",
      "England"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Великобритания"
  },
  {
    "name": "США",
    "nameEn": "United States",
    "abbr": "US",
    // "abbr333": "USA",
    "val": "USD",
    "code": "+1",
    "example": "+1 (XXX) XXX-XXXX",
    "aliases": [
      "United States",
      "USA",
      "America"
    ],
    "flag": "https://ru.wikipedia.org/wiki/США"
  },
  {
    "name": "United States Minor Outlying Islands",
    "nameEn": "United States Minor Outlying Islands",
    "abbr": "UM",
    // "abbr333": "UMI",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "United States Minor Outlying Islands"
    ],
    "flag": "https://en.wikipedia.org/wiki/United_States_Minor_Outlying_Islands"
  },
  {
    "name": "Уругвай",
    "nameEn": "Uruguay",
    "abbr": "UY",
    // "abbr333": "URY",
    "val": "UYU",
    "code": "+598",
    "example": "+598 XXXX XXXX",
    "aliases": [
      "Uruguay"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Уругвай"
  },
  {
    "name": "Узбекистан",
    "nameEn": "Uzbekistan",
    "abbr": "UZ",
    // "abbr333": "UZB",
    "val": "UZS",
    "code": "+998",
    "example": "+998 XX XXX XX XX",
    "aliases": [
      "Uzbekistan",
      "O'zbekiston"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Узбекистан"
  },
  {
    "name": "Вануату",
    "nameEn": "Vanuatu",
    "abbr": "VU",
    // "abbr333": "VUT",
    "val": "VUV",
    "code": "+678",
    "example": "+678 XXXXX",
    "aliases": [
      "Vanuatu"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Вануату"
  },
  {
    "name": "Ватикан",
    "nameEn": "Vatican City",
    "abbr": "VA",
    // "abbr333": "VAT",
    "val": "EUR",
    "code": "+39",
    "example": "+39 06 XXXX XXXX",
    "aliases": [
      "Vatican City",
      "Holy See"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Ватикан"
  },
  {
    "name": "Венесуэла",
    "nameEn": "Venezuela",
    "abbr": "VE",
    // "abbr333": "VEN",
    "val": "VED",
    "code": "+58",
    "example": "+58 XXX-XXXXXXX",
    "aliases": [
      "Venezuela"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Венесуэла"
  },
  {
    "name": "Вьетнам",
    "nameEn": "Vietnam",
    "abbr": "VN",
    // "abbr333": "VNM",
    "val": "VND",
    "code": "+84",
    "example": "+84 XXX XXX XXX",
    "aliases": [
      "Vietnam",
      "Việt Nam"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Вьетнам"
  },
  {
    "name": "Virgin Islands, British",
    "nameEn": "Virgin Islands, British",
    "abbr": "VG",
    // "abbr333": "VGB",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "Virgin Islands, British"
    ],
    "flag": "https://en.wikipedia.org/wiki/Virgin_Islands,_British"
  },
  {
    "name": "Virgin Islands, U.S.",
    "nameEn": "Virgin Islands, U.S.",
    "abbr": "VI",
    // "abbr333": "VIR",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "Virgin Islands, U.S."
    ],
    "flag": "https://en.wikipedia.org/wiki/Virgin_Islands,_U.S."
  },
  {
    "name": "Wallis and Futuna",
    "nameEn": "Wallis and Futuna",
    "abbr": "WF",
    // "abbr333": "WLF",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "Wallis and Futuna"
    ],
    "flag": "https://en.wikipedia.org/wiki/Wallis_and_Futuna"
  },
  {
    "name": "Western Sahara",
    "nameEn": "Western Sahara",
    "abbr": "EH",
    // "abbr333": "ESH",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "Western Sahara"
    ],
    "flag": "https://en.wikipedia.org/wiki/Western_Sahara"
  },
  {
    "name": "Йемен",
    "nameEn": "Yemen",
    "abbr": "YE",
    // "abbr333": "YEM",
    "val": "YER",
    "code": "+967",
    "example": "+967 X XXX XXX",
    "aliases": [
      "Yemen"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Йемен"
  },
  {
    "name": "Замбия",
    "nameEn": "Zambia",
    "abbr": "ZM",
    // "abbr333": "ZMB",
    "val": "ZMW",
    "code": "+260",
    "example": "+260 XX XXX XXXX",
    "aliases": [
      "Zambia"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Замбия"
  },
  {
    "name": "Зимбабве",
    "nameEn": "Zimbabwe",
    "abbr": "ZW",
    // "abbr333": "ZWE",
    "val": "ZWL",
    "code": "+263",
    "example": "+263 X XXX XXXX",
    "aliases": [
      "Zimbabwe"
    ],
    "flag": "https://ru.wikipedia.org/wiki/Зимбабве"
  },
  {
    "name": "Åland Islands",
    "nameEn": "Åland Islands",
    "abbr": "AX",
    // "abbr333": "ALA",
    "val": "N/A",
    "code": "N/A",
    "example": "N/A",
    "aliases": [
      "Åland Islands"
    ],
    "flag": "https://en.wikipedia.org/wiki/Åland_Islands"
  }
]

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