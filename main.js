function getTodayDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

const todayDate = getTodayDate();
const currencyToCountry = new Map([
  ["AED",'ae'],
  ["AMD", 'am'],
  ["AUD", 'au'],
  ["AZN", 'az'],
  ["BGN", 'bg'],
  ["BRL", 'br'],
 ["BYN", 'by'],
 ["GEL", 'ge'],
 ["ZAR", 'za'],
 ["UZS", 'uz'],
 ["UAH", 'ua'],
 ["TRY", 'tr'],
 ["RSD", 'rs'],
 ["RUB", 'ru'],
 ["SEK", 'se'],
 ["SGD", 'sg'],
 ["TJS", 'tj'],
 ["TMT", 'tm'],
 ["ISK", 'is'],
 ["JPY", 'jp'],
 ["KGS", 'kg'],
 ["KRW", 'kr'],
 ["KWD", 'kw'],
 ["KZT", 'kz'],
 ["MDL", 'md'],
 ["NOK", 'no'],
 ["NZD", 'nz'],
 ["PLN", 'pl'],
 ["QAR", 'qa'],
 ["RON", 'ro'],
 ["GBP", 'gb'],
 ["HKD", 'hk'],
 ["HUF", 'hu'],
 ["ILS", 'il'],
 ["INR", 'in'],
 ["IRR", 'ir'],
 ["BRL", 'br'],
 ["BYN", 'by'],
 ["CAD", 'ca'],
 ["CHF", 'ch'],
 ["CNY", 'cn'],
 ["CZK", 'cz'],
 ["DKK", 'dk'],
 ["EGP", 'eg'],
 ["USD",'us'],
 ["EUR",'eu']
  
]);

const modal = document.getElementById('converter-modal');
const openBtn = document.querySelector('.a1');
const closeBtn = document.querySelector('.close-button');

openBtn.addEventListener('click', () => {
  modal.style.display = 'flex';
});


closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

let liveRates = {}; 
fetch(`https://nbg.gov.ge/gw/api/ct/monetarypolicy/currencies/ka/json/?date=${todayDate}`)
  .then(response => response.json())
  .then(data => {
    const tableBody = document.querySelector('#currency-table tbody');
    tableBody.innerHTML = '';


    data[0].currencies.forEach(currency => {
      liveRates['GEL'] = 1;
      liveRates[currency.code] = currency.rate; 
const countryCode = currencyToCountry.get(currency.code);
const flagUrl = countryCode
  ? `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png` 
  : '';     
      const row = `
        <tr>
<td>${currency.code} ${flagUrl ? `<img src="${flagUrl}" width="40px" style="display:flex;">` : ''}</td>
          <td>${currency.name}</td>
          <td>${currency.rate}</td>
          <td>${currency.diff > 0 ? '+' : ''}${currency.diff}</td>
          
        </tr>
      `;
      tableBody.insertAdjacentHTML('beforeend', row);
    });

    populateCurrencySelects();
    function populateCurrencySelects() {
  const fromSelect = document.getElementById('fromCurrency');
  const toSelect = document.getElementById('toCurrency');

  fromSelect.innerHTML = '';
  toSelect.innerHTML = '';

  for (const code in liveRates) {
    const optionFrom = document.createElement('option');
    optionFrom.value = code;
    optionFrom.textContent = code;

    const optionTo = document.createElement('option');
    optionTo.value = code;
    optionTo.textContent = code;

    fromSelect.appendChild(optionFrom);
    toSelect.appendChild(optionTo);
  }

  toSelect.value = 'EUR';
  fromSelect.value = 'USD';
  

  updateCurrencySelects();
}

function updateCurrencySelects() {
  const fromSelect = document.getElementById('fromCurrency');
  const toSelect = document.getElementById('toCurrency');

  const fromVal = fromSelect.value;
  const toVal = toSelect.value;

  // Enable all options first
  for (let option of fromSelect.options) option.disabled = false;
  for (let option of toSelect.options) option.disabled = false;

  // Disable in fromSelect the option selected in toSelect
  if (toVal) {
    for (let option of fromSelect.options) {
      if (option.value === toVal) {
        option.disabled = true;
      }
    }
  }

  // Disable in toSelect the option selected in fromSelect
  if (fromVal) {
    for (let option of toSelect.options) {
      if (option.value === fromVal) {
        option.disabled = true;
      }
    }
  }
}

// Add event listeners for mutual exclusion
document.getElementById('fromCurrency').addEventListener('change', updateCurrencySelects);
document.getElementById('toCurrency').addEventListener('change', updateCurrencySelects);

const fromVal = fromSelect.value;
  const toVal = toSelect.value;

  // Enable all options first
  for (let option of fromSelect.options) option.disabled = false;
  for (let option of toSelect.options) option.disabled = false;

  // Disable in fromSelect the option selected in toSelect
  if (toVal) {
    for (let option of fromSelect.options) {
      if (option.value === toVal) {
        option.disabled = true;
      }
    }
  }

  // Disable in toSelect the option selected in fromSelect
  if (fromVal) {
    for (let option of toSelect.options) {
      if (option.value === fromVal) {
        option.disabled = true;
      }
    }
  }
  })
  .catch(error => {
    console.error('მონაცემების მიღების შეცდომა:', error);
  });
function populateCurrencySelects() {
  const fromSelect = document.getElementById('fromCurrency');
  const toSelect = document.getElementById('toCurrency');

  fromSelect.innerHTML = '';
  toSelect.innerHTML = '';

  for (const code in liveRates) {
    const optionFrom = document.createElement('option');
    optionFrom.value = code;
    optionFrom.textContent = code;

    const optionTo = document.createElement('option');
    optionTo.value = code;
    optionTo.textContent = code;

    fromSelect.appendChild(optionFrom);
    toSelect.appendChild(optionTo);
  }

  toSelect.value = 'EUR';
  fromSelect.value = 'USD'; 
  
}

document.getElementById('convertBtn').addEventListener('click', () => {
  const amount = parseFloat(document.getElementById('amountInput').value);
  const from = document.getElementById('toCurrency').value;
  const to = document.getElementById('fromCurrency').value;

  if (!amount || isNaN(amount)) {
    alert('გთხოვთ, შეიყვანეთ თანხა.');
    return;
  }

  const rateFrom = liveRates[to];
  const rateTo = liveRates[from];

  if (rateFrom && rateTo) {
    const result = (amount / rateFrom) * rateTo;
    document.getElementById('result').textContent = `${amount} ${from} = ${result.toFixed(4)} ${to}`;
  } else {
    alert('ვალუტის კურსი ვერ მოიძებნა.');
  }
});
const searchInput = document.querySelector('.search-box');

searchInput.addEventListener('keyup', () => {
  const filter = searchInput.value.toLowerCase();
  const rows = document.querySelectorAll('#currency-table tbody tr');

  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(filter) ? '' : 'none';
  });
});
