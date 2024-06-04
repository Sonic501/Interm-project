import React from 'react'
import Select from 'react-select';

const TrainerSelect = () => {
    const citiesAndProvinces = [
        { value: "ho chi minh", label: "Ho Chi Minh" },
        { value: "ha noi", label: "Ha Noi" },
        { value: "da nang", label: "Da Nang" },
        { value: "quy nhon", label: "Quy Nhon" },
        { value: "can tho", label: "Can Tho" },
        ];
      return (
        <div>
          <Select 
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              
            }),
          }}
            name="fsu"
            options={citiesAndProvinces}
            className="basic-select"
            classNamePrefix="select"
        />
    </div>
      )
}

export default TrainerSelect