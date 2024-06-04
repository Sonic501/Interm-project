import { useState } from "react";

const SwitchCustom = (props) => { 
  const handleIsOnline = () => {
    props.setIsOn(!props.isOn);
  }
  return (
    <label htmlFor="toggle" className="flex items-center cursor-pointer">
    <div className="relative"> 
        <input
            type="checkbox"
            id="toggle"
            className="sr-only"
            name='type'
            onChange={() => {
              handleIsOnline();
            }}
        />
        <div className={`${props.isOn? ' bg-[#2D3748]' : 'bg-[#D45B13]'} w-24 h-8 rounded-full flex justify-center items-center text-white`}>{props.isOn?'Offline' : ' Online'}</div>
        <div
            className={`dot ml-1 absolute top-2 ${props.isOn? 'bg-white' : ' bg-[#2D3748]'} w-4 h-4 rounded-full transition-transform ${props.isOn ? 'translate-x-[70px]' : ''
                }`}
            
        ></div>
    </div>
</label>)
};

export default SwitchCustom;
