const parser = {
  id: (section) => {
    try {
      return section.dataset.advertisementId
    } catch (e) {
      console.log('Error with parse id', section, e)
      return null
    }
  },
  markName: (section) => {
    try {
      return section.querySelector('div[data-advertisement-data]').dataset.markName
    } catch (e) {
      console.log('Error with parse markName', section, e)
      return null
    }
  },
  modelName: (section) => {
    try {
      return section.querySelector('div[data-advertisement-data]').dataset.modelName
    } catch (e) {
      console.log('Error with parse modelName', section, e)
      return null
    }
  },
  year: (section) => {
    try {
      return section.querySelector('div[data-advertisement-data]').dataset.year
    } catch (e) {
      console.log('Error with parse year', section, e)
      return null
    }
  },
  priceUSD: (section) => {
    try {
      return parseInt(section.querySelector('span[data-currency="USD"]').innerText.replaceAll(' ', ''))
    } catch (e) {
      console.log('Error with parse priceUSD', section, e)
      return null
    }
  },
  date: (section) => {
    try {
      return section.querySelector('.generateDate').textContent.trim()
    } catch (e) {
      console.log('Error with parse date', section, e)
      return null
    }
  },
  mileage: (section) => {
    try {
      const mileageString = section.querySelector('.item-char.js-race').textContent.trim();
      return mileageString.includes('без пробігу') ? 0 : parseInt(mileageString.replace(/[^0-9]/g, ''))
    } catch (e) {
      console.log('Error with parse mileage', section, e)
      return null
    }
  },
  location: (section) => {
    try {
      return section.querySelector('.item-char.js-location').textContent.trim().split(" ")[0]
    } catch (e) {
      console.log('Error with parse location', section, e)
      return null
    }
  },
  fuelType: (section) => {
    try {
      const fuelTypeAndEngine = section.querySelector('.item-char .icon-fuel, .item-char .icon-battery').parentNode.textContent.trim().split(', ');
      return fuelTypeAndEngine[0].includes("л.") ? null : fuelTypeAndEngine[0]
    } catch (e) {
      console.log('Error with parse fuelType', section, e)
      return null
    }
  },
  engineDisplacement: (section) => {
    try {
      const fuelTypeAndEngine = section.querySelector('.item-char .icon-fuel, .item-char .icon-battery').parentNode.textContent.trim().split(', ');
      return fuelTypeAndEngine[1]
        ? parseFloat(fuelTypeAndEngine[1].replace(' л.', ''))
        : fuelTypeAndEngine[0].includes("л.")
          ? parseFloat(fuelTypeAndEngine[0].replace(' л.', ''))
          : null
    } catch (e) {
      console.log('Error with parse engineDisplacement', section, e)
      return null
    }
  },
  transmissionType: (section) => {
    try {
      return section.querySelector('.item-char .icon-transmission,.item-char .icon-akp').parentNode.textContent.trim()
    } catch (e) {
      console.log('Error with parse transmissionType', section, e)
      return null
    }
  }
}
export const parseCars = (html) => {
  const pageParser = new DOMParser();
  const doc = pageParser.parseFromString(html, 'text/html');

  const sections = doc.querySelectorAll('section.ticket-item');

  const array = [];

  for (const section of sections) {
    array.push({
      id: parser.id(section),
      markName: parser.markName(section),
      modelName: parser.modelName(section),
      year: parser.year(section),
      priceUSD: parser.priceUSD(section),
      date: parser.date(section),
      mileage: parser.mileage(section),
      location: parser.location(section),
      fuelType: parser.fuelType(section),
      engineDisplacement: parser.engineDisplacement(section),
      transmissionType: parser.transmissionType(section),
    });
  }


  return array
}

