import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../../ViewSyllabusList/datepicker.css';
import svgImage from '../../ViewSyllabusList/assets/search.svg';
import ImportIcon from '../../ViewSyllabusList/assets/publish.png';
import CalendarIcon from '../../ViewSyllabusList/assets/calendar_today.png';
import addSvg from '../../ViewSyllabusList/assets/add.svg';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../../redux/slices/viewSyllabus/searchSyllabusSlice';
import { Link } from 'react-router-dom';
import {formatDate} from './formatDate';

const SearchSyllabusBar = (props) => {
    const [newItem, setNewItem] = useState('');
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const onChangeDateHandler = (value) => {
      setStartDate(value[0]);
      setEndDate(value[1]);
      if (value[0] && value[1]) {
        props.updateQueryParams('fromDate', formatDate(value[0]));
        props.updateQueryParams('toDate', formatDate(value[1]));
      } else {
        props.updateQueryParams('fromDate', "");
        props.updateQueryParams('toDate', "");
      }
    };

    const searchListSyllabus = useSelector((state) => state.searchSyllabusBar);
    const dispatch = useDispatch();

    const handleEnterPress = (event) => {
        if (event.key === 'Enter' && newItem !== '') {
        const newId =
        searchListSyllabus.length > 0 ? searchListSyllabus[searchListSyllabus.length - 1].id + 1 : 1;
            const newItemObj = { id: newId, name: newItem };
            dispatch(addItem(newItemObj));
            props.updateQueryParams('search', searchListSyllabus.map((item) => item.name) + ',' + newItem);
            setNewItem('');
      }
    };

  return (
    <div className="w-full flex justify-between pl-8 mt-9">
        <div className="w-1/2 flex items-center gap-1.5">
          <div className="relative flex items-center w-1/2">
            <input
              type="text"
              placeholder="Search by..."
              className="w-full z-0 pr-4 py-2.5 pl-12 leading-tight focus:outline-none  border-[0.1rem] border-black rounded-xl placeholder-gray-800 placeholder:italic"
              value={newItem}
              onChange={(event) => setNewItem(event.target.value)}
              onKeyPress={handleEnterPress}
              maxLength="100"
            />
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 top-2 ">
              <img src={svgImage} alt="SVG" className="h-5 w-5" />
            </span>
          </div>
          <div className='flex gap-2.5 border border-black rounded-[10px] pl-3 py-1 w-1/2 items-center'>
            <img src={CalendarIcon} alt="" className='h-5 w-5'/>
            <div className='w-full pr-3'>
              <DatePicker selectsRange={true} startDate={startDate} 
              endDate={endDate} placeholderText="Created date" onChange={onChangeDateHandler} openToDate={new Date()} dateFormat="dd/MM/yyyy" shouldCloseOnSelect={false} 
              className="datepicker py-1 w-full outline-[#fff] text-base placeholder:italic placeholder:text-black placeholder:text-base text-center placeholder:text-left"/>
            </div>
          </div>
        </div>
        <div className="w-1/2 gap-1.5 flex justify-end items-center pr-8">
          <button className="flex bg-[#D45B13] h-12 justify-center items-center px-2.5 text-lg text-white rounded-xl space-x-2" onClick={props.togglePopupImport}>
            <img src={ImportIcon} alt="PNG" className="h-5 w-5 text-white " />
            <p>Import</p>
          </button>
          <Link to={`/syllabus/create_syllabus`}>
          <button className="flex bg-[#2D3748] h-12 justify-center items-center px-2.5 text-lg text-white rounded-xl space-x-2">
            <img src={addSvg} alt="PNF" className="h-5 w-5 text-white " />
            <p>Add Syllabus</p>
          </button>
          </Link>
        </div>
      </div>
  )
}

export default SearchSyllabusBar