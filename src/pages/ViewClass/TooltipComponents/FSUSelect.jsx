import React from 'react'
import Select from 'react-select';

const FSUSelect = () => {
  const citiesAndProvinces = [
    { value: "1", label: "1" },
    ];
  return (
    <div>
      <Select
        name="fsu"
        options={citiesAndProvinces}
        className="basic-select"
        classNamePrefix="select"
    />
</div>
  )
}

export default FSUSelect