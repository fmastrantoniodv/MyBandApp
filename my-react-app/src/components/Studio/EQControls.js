import React, { useState, useEffect } from 'react';
import knobSvg from '../../img/knob.svg'

export default function EQControls({ sample }) {
  const [lowFrequency, setLowFrequency] = useState(sample.channelConfig.EQ.low);
  const [midFrequency, setMidFrequency] = useState(sample.channelConfig.EQ.mid);
  const [highFrequency, setHighFrequency] = useState(sample.channelConfig.EQ.high);

  const handleLowFrequencyChange = (e) => {
    sample.waveformComponent.backend.filters[0].gain.value = e.target.value
    sample.channelConfig.EQ.low = parseFloat(e.target.value)
    setLowFrequency(parseFloat(e.target.value));
  };

  const handleMidFrequencyChange = (e) => {
    sample.waveformComponent.backend.filters[1].gain.value = e.target.value
    sample.channelConfig.EQ.mid = parseFloat(e.target.value)
    setMidFrequency(parseFloat(e.target.value));
  };

  const handleHighFrequencyChange = (e) => {
    sample.waveformComponent.backend.filters[2].gain.value = e.target.value
    sample.channelConfig.EQ.high = parseFloat(e.target.value)
    setHighFrequency(parseFloat(e.target.value));
  };

  return (
    <div className='audio-controls-eq'>
      <div className='eq-container'>
        <div className='eq-parameter'>
          <label>Bajos</label>
          <EQKnob 
            value={lowFrequency}
            handleOnChange={handleLowFrequencyChange}>
          </EQKnob>
        </div>
        <div className='eq-parameter'>
          <label>Medios</label>
          <EQKnob 
            value={midFrequency}
            handleOnChange={handleMidFrequencyChange}>
          </EQKnob>
        </div>
        <div className='eq-parameter'>
          <label>Agudos</label>
          <EQKnob 
            value={highFrequency}
            handleOnChange={handleHighFrequencyChange}>
          </EQKnob>
        </div>
      </div>
    </div>
  );
}

function EQKnob({ value, handleOnChange }) {
  const rangoDeg = 195;
  const rangoTotal = 40;

  const [rotateDegValue, setRotateDegValue] = useState('')
  
  useEffect(()=>{
    setRotateDegValue((rangoDeg / rangoTotal) * value)    
  }, [value])
  
  return (
    <div className='eq-knob-container'>
      <input
        className='eq-knob-input'
        type="range"
        min="-30"
        max="10"
        step="1"
        value={value}
        onChange={handleOnChange}
      />
      <div className='eq-knob-svg'>
        <img 
          src={knobSvg} 
          alt="perilla eq"
          style={{
            position: "absolute",
            transform: "rotate("+rotateDegValue+"deg)"
          }}
        ></img>
      </div>
      <span>{value > 0 ? "+"+value : value}</span>
    </div>
  )
}
