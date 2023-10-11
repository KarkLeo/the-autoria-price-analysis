import React from 'react'
import { MODE, ModeTranslate, STEPS } from '../constants'
import './HeadToolset.css'

export const HeadToolset = ({ mode, step, setMode, setStep }) => {
  return (
    <div className='head-toolset'>
      <div className='head-toolset__item'>
        <span className='head-toolset__label'>Вид:</span>
        <div className='head-toolset__buttons-set'>
          {MODE.map((item) => (
            <button
              className='head-toolset__button-item'
              key={item}
              onClick={() => setMode(item)}
              disabled={item === mode}
            >
              {ModeTranslate[item]}
            </button>
          ))}
        </div>
      </div>
      {mode !== MODE[3] && (
        <div className='head-toolset__item'>
          <span className='head-toolset__label'>Шаг шкали($):</span>
          <div className='head-toolset__buttons-set'>
            {STEPS.map((item) => (
              <button
                className='head-toolset__button-item'
                key={item}
                onClick={() => setStep(item)}
                disabled={item === step}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
