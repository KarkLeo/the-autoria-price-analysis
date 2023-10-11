import React from 'react'
import './InfoBlock.css'

const Price = ({ price }) => {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price)

  return <span className='price'>{formattedPrice}</span>
}

export const InfoBlock = ({
  average = null,
  median = null,
  standardDeviation = null,
  quartile1 = null,
  quartile3 = null,
}) => {
  return (
    <div className='info-block__wrap'>
      <div className='info-block__group'>
        <p className='info-block__item info-block__item--yellow'>
          Медіана{' '}
          <span
            className='info-block__tooltip'
            data-tooltip={`
        Медіана показує значення, яке розбиває кількість оголошень на дві рівні частини. Показує загальну тенденцію. Показник не враховує аномальні значення, тому він є більш точним.
      `}
          >
            i
          </span>
          : <Price price={median} />
        </p>
        <p className='info-block__item info-block__item--yellow-dashed'>
          1 квартиль{' '}
          <span
            className='info-block__tooltip'
            data-tooltip={`
        1 квартиль показує значення еквивалентне 1/4 кількість оголошень. Тобто, до цієї цифри входить 25% оголошень. Оголошення з ціною нижче цього значення можна вважати більш виключними.
      `}
          >
            i
          </span>
          : <Price price={quartile1} />
        </p>
        <p className='info-block__item info-block__item--yellow-dashed'>
          3 квартиль{' '}
          <span
            className='info-block__tooltip'
            data-tooltip={`
        3 квартиль показує значення еквивалентне 3/4 кількість оголошень. Тобто, до цієї цифри входить 75% оголошень. Оголошення з ціною вище цього значення можна вважати більш виключними.
      `}
          >
            i
          </span>
          : <Price price={quartile3} />
        </p>
        <p className='info-block__item'>
          Міжквартильний розмах{' '}
          <span
            className='info-block__tooltip'
            data-tooltip={`
        Міжквартильний розмах показує різницю між 3 квартилем та 1 квартилем. Це показує розмах значень, які використовуються в 50% оголошень. Якщо міжквартильний розмах великий, то це може означати, що вибірка містить аномальні значення.
      `}
          >
            i
          </span>
          : <Price price={quartile3 - quartile1} />
        </p>
      </div>
      <div className='info-block__group'>
        <p className='info-block__item info-block__item--red'>
          Середнє значення{' '}
          <span
            className='info-block__tooltip'
            data-tooltip={`
        Середнє значення показує середнє арифметичне всіх значень. Показує загальну тенденцію. Якщо середнє значення відрізняється від медіани, то це може означати, що вибірка містить аномальні значення.
      `}
          >
            i
          </span>
          : <Price price={average} />
        </p>
        <p className='info-block__item'>
          Стандартне відхилення{' '}
          <span
            className='info-block__tooltip'
            data-tooltip={`
        Стандартне відхилення показує наскільки значення розподілені навколо середнього значення. Чим більше стандартне відхилення, тим більше розбіжностей в значеннях. Якщо стандартне відхилення велике, то це може означати, що вибірка містить аномальні значення.
      `}
          >
            i
          </span>
          : <Price price={standardDeviation} />
        </p>
        <p className='info-block__item info-block__item--red-dashed'>
          Мінімальне значення (68%){' '}
          <span
            className='info-block__tooltip'
            data-tooltip={`
        Мінімальне значення показує значення, яке входить в 68% оголошень. Оголошення з ціною нижче цього значення можна вважати аномальними. Якщо мінімальне значення виходить за межі вибірки і ви вокористовували обмеження ціни, то це може означати, що вибірка може недостовірно відображати суттєвість ринку.
      `}
          >
            i
          </span>
          : <Price price={average - standardDeviation} />
        </p>
        <p className='info-block__item info-block__item--red-dashed'>
          Максимальне значення (68%){' '}
          <span
            className='info-block__tooltip'
            data-tooltip={`
        Максимальне значення показує значення, яке входить в 68% оголошень. Оголошення з ціною вище цього значення можна вважати аномальними. Якщо максимальне значення виходить за межі вибірки і ви вокористовували обмеження ціни, то це може означати, що вибірка може недостовірно відображати суттєвість ринку.
      `}
          >
            i
          </span>
          : <Price price={average + standardDeviation} />
        </p>
      </div>
    </div>
  )
}
