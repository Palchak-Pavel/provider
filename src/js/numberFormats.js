const numberFormat = new Intl.NumberFormat('ru-Ru', {maximumSignificantDigits: 3});
const usdFormat = new Intl.NumberFormat('ru-Ru', { style: 'currency', currency: 'USD' });
const rubFormat = new Intl.NumberFormat('ru-Ru', { style: 'currency', currency: 'RUB' });

export {numberFormat, usdFormat, rubFormat}
