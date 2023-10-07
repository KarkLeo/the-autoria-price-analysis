export const parseCars = (html) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const sections = doc.querySelectorAll('section.ticket-item');

  const array = [];

  for (const section of sections) {
    array.push({
      id: section.dataset.advertisementId,
      markName: section.querySelector('div[data-advertisement-data]').dataset.markName,
      modelName: section.querySelector('div[data-advertisement-data]').dataset.modelName,
      year: section.querySelector('div[data-advertisement-data]').dataset.year,
      priceUSD: parseInt(section.querySelector('span[data-currency="USD"]').innerText.replaceAll(' ', '')),
    });
  }

  return array
}