import Select from 'react-select';

const LocationAutocomplete = (props) => {
  
  const location = [
    { value: "1", label: "Ho Chi Minh" },
    { value: "2", label: "Ha Noi" },
    { value: "3", label: "Da Nang" },
    { value: "4", label: "Can Tho" },
    ];

    return (
      <div>
       <Select
          isMulti
          options={location}
          name="location"
          className="w-full bg-white border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-base leading-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm sm:leading-5"
          onChange={props.setLocation}
          classNamePrefix="select"
          placeholder="Choose a location..."
/>

      </div>
    );
};

export default LocationAutocomplete;