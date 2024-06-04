import React, { useState } from 'react';
import svgImage from '../resources/search.svg';
import filterSvg from '../resources/filter.svg';
import importSvg from '../resources/import.svg';
import addSvg from '../resources/add.svg';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../../redux/slices/viewClass/searchClassSlice';
import { useNavigate } from 'react-router-dom';

const SearchBar = (props) => {
    const [newItem, setNewItem] = useState('');
    const searchList = useSelector((state) => state.searchBar);
    const dispatch = useDispatch();
    const nav = useNavigate();
    const { permission } = useSelector((state) => state.auth);


    const handleToCreateClass = () => {
      nav('/class/create_class');
    }
    

    const handleEnterPress = (event) => {
        if (event.key === 'Enter' && newItem !== '') {
        const newId =
            searchList.length > 0 ? searchList[searchList.length - 1].id + 1 : 1;
            const newItemObj = { id: newId, name: newItem };
            dispatch(addItem(newItemObj));
            props.updateQueryParams('search', searchList.map((item) => item.name) + ',' + newItem);
            setNewItem('');
  }
};


  return (
    <div className="w-full flex justify-between px-10">
        <div className="w-1/2 flex items-center">
          <div className="relative flex items-center mt-2 w-[60%]">
            <input
              type="text"
              placeholder="Search by..."
              className="w-full z-0 pr-4 py-2 mt-6 my-4 pl-12 leading-tight focus:outline-none focus:border-indigo-500 border-[0.1rem] border-black rounded-xl placeholder-gray-800 placeholder:italic"
              value={newItem}
              onChange={(event) => setNewItem(event.target.value)}
              onKeyPress={handleEnterPress}
              maxLength="100"
            />
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 top-2 ">
              <img src={svgImage} alt="SVG" className="h-5 w-5" />
            </span>
          </div>

          <button
          onClick={props.togglePopupTooltip}
          className="flex bg-[#2D3748] h-12 ml-2 items-center justify-center w-28 text-lg text-white rounded-xl space-x-2 mt-3 hover:bg-opacity-75">
            <img src={filterSvg} alt="SVG" className="h-5 w-5 text-white " />
            <p>Filter</p>
          </button>
        </div>
          {permission.syllabusPermission !== "View" && (
        <div className="w-1/2 flex justify-end items-center">
          <button onClick={props.togglePopupImport} className="flex bg-[#D45B13] h-12 ml-2  items-center justify-center w-28 text-lg text-white rounded-xl space-x-2 mt-3 hover:bg-opacity-75">
            <img src={importSvg} alt="SVG" className="h-5 w-5 text-white " />
            <p>Import</p>
          </button>
          
           <button 
            className="flex bg-[#2D3748] h-12 ml-2  items-center justify-center w-32 text-lg text-white rounded-xl space-x-2 mt-3 hover:bg-opacity-75"
            onClick={() => handleToCreateClass()}>
            <img src={addSvg} alt="SVG" className="h-5 w-5 text-white " />
            <p>Add Class</p>
          </button>
        </div>
          )}
      </div>
  )
}

export default SearchBar