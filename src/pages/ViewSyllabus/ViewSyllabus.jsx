import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchListSyllabus, viewDetailSyllabus, outputStandardSyllabus, deleteSyllabus } from '../../redux/slices/viewSyllabus/syllabusSlice';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './datepicker.css';  
import Vector from '../ViewSyllabus/assets/Vector.png';
import Search from '../ViewSyllabus/assets/search.png';
import CalendarIcon from '../ViewSyllabus/assets/calendar_today.png';
import SortIcon from '../ViewSyllabus/assets/sorticon.svg';  
import ImportIcon from '../ViewSyllabus/assets/publish.png';  
import AddSyllabus from '../ViewSyllabus/assets/addsyllabus.png';  
import MoreIcon from '../ViewSyllabus/assets/more_horizontal.png';   
import DeleteIcon from '../ViewSyllabus/assets/deleteicon.svg';  
import EditIcon from '../ViewSyllabus/assets/editicon.svg';  
import AddProgramIcon from '../ViewSyllabus/assets/addpro.svg';  
import DuplicateIcon from '../ViewSyllabus/assets/duplicateicon1.svg';  
import PreviousIcon from '../ViewSyllabus/assets/previousicon.svg';  
import NextIcon from '../ViewSyllabus/assets/next.svg';  
import ButtonNextIcon from '../ViewSyllabus/assets/nexticon.svg';  
import DownIcon from '../ViewSyllabus/assets/downicon.svg';  
import Loading from '../../components/Loading/Loading';
import Pagination from '../ViewClass/smalIComponent/Pagination';
import SetRowsPerPage from '../ViewClass/smalIComponent/SetRowsPerPage';


const KeywordSearch = [
  {
    id: 1,
    value: "foundation"
  },
  {
    id: 2,
    value: "HaNTT2"
  }
]

const OutputStandard = [
  {
    output: "H4SD"
  },
  {
    output: "K6SD"
  },
  {
    output: "H6SD"
  }
]
export default function ViewSyllabus() { 
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const onChangeDateHandler = (value) => {
    setStartDate(value[0]);
    setEndDate(value[1]);
  };
  const togglePopup = () => {
    setOpen(!open);
  } 

  const [selectedRow, setSelectedRow] = useState(null);
  const handleRowClick = (index) => {
    if (selectedRow === index) {
      setSelectedRow(null);
    } else {
      setSelectedRow(index);
    }
  };

  const [openImport, setOpenImport] = useState(false);
  const togglePopupImport = () => {
    setOpenImport(!openImport);
  } 

  const handleClosePopupImport = () => {
    setOpenImport(false);
  };

  const [keywords, setKeywords] = useState(KeywordSearch);
  const handleOnclickDelete = (id) => {
    setKeywords(keywords.filter((p) => p.id !== id));
  }

  const handleDeleteSyllabus = (id) => {  
    console.log('>>>>>>', id);
    setList(lists.filter((data) => data.id !== id));
  }

  
  const queryParams = useSelector((state) => state.initialParams);
  console.log('Test initialParams', queryParams);
  const dispatch = useDispatch();
  const { syllabusList, loading, success, error } = useSelector((state) => state);
  console.log('State12',syllabusList);
	useEffect(() => {
		dispatch(fetchListSyllabus());
    if(error) {
      console.log(error)
    }

	}, [dispatch, error]);

  const onDeleteSyllabus = (id) => {
    console.log('>>>>>>', id);
    if (
      window.confirm("Are you sure that you wanted to delete that syllabus")
    ) {
      dispatch(deleteSyllabus(id));
    }
  };
  const filterData = (value) => {};

  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      const response = await fetch(`/api/search?q=${query}`);
      const data = await response.json();
      setResults(data);
    }                                                                                                                                                                                                                                                 
  };

  if(syllabusList.loading) {
    return <Loading/>
  }


  const handleSetRowsPerPage = (value) => {
    setRowsPerPage(value);
    updateQueryParams('row', value);
    updateQueryParams('page', 0);
  }

  const numberOfPages = syllabusList?.syllabusListData.totalPages;
  const pageNumber = syllabusList?.syllabusListData.pageable?.pageNumber;
  const currentRowsPerPage = syllabusList?.syllabusListData.totalElements;

  return <div className='relative'>
    <div className='flex flex-row text-3xl font-semibold px-8 py-4 border-b border-[#2D3748] text-[#2D3748]'>Syllabus</div>
    {openImport && (
      <div className='fixed h-screen w-screen bg-black bg-opacity-70 top-0 left-0 flex justify-center items-center z-50'>
        <div className='w-[38rem] absolute  z-40'>
          <div className='flex items-center justify-center font-bold rounded-t-[10px] bg-[#2D3748] text-white text-xl py-3'>Import Syllabus</div>
          <div className=' bg-white border rounded-b-[10px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]'>
            <div className='flex pt-4 ml-5 mr-5 border-b border-[#ACACAC]'>
              <div className='w-1/3 text-lg font-bold'>Import setting</div>
              <div className='w-2/3 text-lg'>
                <div className='flex mb-4'>
                  <div className='w-44 text-[#1E1F20]'>File (csv) <span className='text-[#FD5656]'>*</span></div>
                  <div className='flex items-center justify-center rounded-[5px] bg-[#2D3748] text-white px-6 py-[1.5px]'>Select</div>
                </div>
                <div className='flex mb-4'>
                  <div className='w-44 text-[#1E1F20]'>Encoding type</div>
                  <select className='border border-[#ACACAC] rounded-[5px] pl-2.5 py-1'>
                      <option>Auto detect</option>
                      <option>The second option</option>
                  </select>
                </div>
                <div className='flex mb-4'>
                  <div className='w-44 text-[#1E1F20]'>Column seperator</div>
                  <select className='border border-[#ACACAC] rounded-[5px] pl-2.5 py-1'>
                      <option>Comma</option>
                      <option>The second option</option>
                  </select>
                </div>
                <div className='flex mb-4'>
                  <div className='w-44 text-[#1E1F20]'>Import template</div>
                  <div className='text-[#285D9A] underline underline-offset-4'>Download</div>
                </div>
              </div>
            </div>
            <div className='flex pt-4 border-b ml-5 mr-5 border-[#ACACAC]'>
              <div className='w-1/3 text-lg font-bold'>Duplicate control</div>
              <div className='w-2/3 text-lg'>
                <div className='flex mb-4'>
                  <div className='w-44 text-[#1E1F20]'>Scanning</div>                            
                </div>
                <div className='flex mb-4 gap-4'>
                  <div class="flex items-center mr-4">
                      <input checked id="checkbox" type="checkbox" value="" class="w-5 h-5 accent-[#2D3748]"/>
                      <label for="checkbox" class="ml-2">Syllabus code</label>
                  </div>
                  <div class="flex items-center mr-4">
                      <input id="checkbox1" type="checkbox" value="" class="w-5 h-5 accent-[#2D3748]"/>
                      <label for="checkbox1" class="ml-2">Syllabus name</label>
                  </div>
                </div>
                <div className='flex mb-4'>
                  <div className='w-44 text-[#1E1F20]'>Duplicate handle</div>
                </div>
                <div className='flex mb-4 gap-4'>
                  <div class="flex items-center gap-2">
                    <input type="radio" id="radio" checked="checked" name="radio" className='w-6 h-6 accent-[#2D3748]'/>
                    <label for="radio" class="container">Allow
                    </label>
                  </div>
                  <div class="flex items-center gap-2">
                    <input type="radio" id="radio1" name="radio" className='w-6 h-6 accent-[#2D3748]'/>
                    <label for="radio1" class="container">Replace
                    </label>
                  </div>
                  <div class="flex items-center gap-2">
                    <input type="radio" id="radio2" name="radio" className='w-6 h-6 accent-[#2D3748]'/>
                    <label for="radio2" class="container">Skip
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex items-center justify-end gap-6 text-lg font-bold mt-5 mb-5 pr-5 bg-white'>
                  <button className="text-[#E74A3B] underline underline-offset-4" onClick={handleClosePopupImport}>
                    <p>Cancel</p>
                  </button>
                  <div className='flex items-center justify-center font-bold rounded-[10px] bg-[#2D3748] text-white px-6 py-1.5'>Import</div>
            </div>
          </div>
        </div>
      </div>
      )}
    <div>
      <div className='flex pl-8 mt-9'>
        <div className='w-1/2 flex gap-1.5'>
          <div className='flex gap-2.5 border border-black rounded-[10px] pl-3 py-1 w-1/2 items-center'>
            <img src={Search} alt="" className='h-5 w-5'/>
            <input type="text" id="name" placeholder="Search by..." onChange={(e) => setSearch(e.target.value)} onKeyPress={handleKeyPress} className='outline-[#fff] px-2 text-base italic placeholder:text-black placeholder:text-base'/>
          </div>
          <div className='flex gap-2.5 border border-black rounded-[10px] pl-3 py-1 w-1/2 items-center'>
            <img src={CalendarIcon} alt="" className='h-5 w-5'/>
            <div className='w-full pr-3'>
              <DatePicker selectsRange={true} startDate={startDate} 
              endDate={endDate} placeholderText="Created date" onChange={onChangeDateHandler} openToDate={new Date()} dateFormat="dd/MM/yyyy" shouldCloseOnSelect={false} 
              className="datepicker w-full outline-[#fff] text-base placeholder:italic placeholder:text-black placeholder:text-base text-center placeholder:text-left"/>
            </div>
            
          </div>
        </div>
        <div className='w-1/2 gap-1.5 flex justify-end items-center pr-8'>
          <button className="flex bg-[#D45B13] h-12 justify-center items-center px-2.5 text-lg text-white rounded-xl space-x-2" onClick={togglePopupImport}>
            <img src={ImportIcon} alt="PNG" className="h-5 w-5 text-white " />
            <p>Import</p>
          </button>
          <Link to={`/createSyllabus`}>
          <button className="flex bg-[#2D3748] h-12 justify-center items-center px-2.5 text-lg text-white rounded-xl space-x-2">
            <img src={AddSyllabus} alt="PNF" className="h-5 w-5 text-white " />
            <p>Add Syllabus</p>
          </button>
          </Link>
        </div>
      </div>
      <div className='flex px-8 gap-3 my-4'>
          {KeywordSearch &&
            keywords?.map((p, index) => {
            return (
              <div key={index} className='flex border rounded-[10px] px-4 py-2 bg-[#474747] text-white italic text-lg'>{p.value} &nbsp; <span onClick={() => handleOnclickDelete(p.id)}>x</span></div>
            );
          })}
      </div>
      <div>
        <table className="table-auto w-full">
          <thead className='bg-[#2D3748] text-white text-lg rounded-[10px]'>
            <tr>
              <th className="pl-8 py-3 rounded-tl-xl">
                <div className='flex items-center gap-2'>
                  <p>Syllabus</p>
                  <img src={SortIcon} alt="SVG" className="h-4 w-4 text-white pr-1" />
                </div>
              </th>
              <th className="w-[8%] text-left px-4 py-3">
                <div className='flex items-center gap-2'>
                  <p>Code</p>
                  <img src={SortIcon} alt="SVG" className="h-4 w-4 text-white pr-1" />
                </div>
              </th>
              <th className="w-[12%] text-left px-4 py-3">
                <div className='flex items-center gap-2'>
                  <p>Created on</p>
                  <img src={SortIcon} alt="SVG" className="h-4 w-4 text-white pr-1" />
                </div>
              </th>
              <th className="w-[14%] text-left px-4 py-3">
                <div className='flex items-center gap-2'>
                  <p>Created by</p>
                  <img src={SortIcon} alt="SVG" className="h-4 w-4 text-white pr-1" />
                </div>
              </th>
              <th className="w-[10%] text-left px-4 py-3">
                <div className='flex items-center gap-2'>
                  <p>Duration</p>
                  <img src={SortIcon} alt="SVG" className="h-4 w-4 text-white pr-1" />
                </div>
              </th>
              <th className="w-[25%] text-left px-4 py-3">
                <div className='flex items-center gap-2'>
                  <p>Output standard</p>
                </div>
              </th>
              <th className="w-[5%] text-left px-4 py-3 rounded-tr-xl"></th>
            </tr>
          </thead>
        
          <tbody className='text-lg shadow-[0_20px_40px_rgba(0,0,0,0.16)]'>
           {syllabusList &&
            syllabusList?.syllabusListData.content.filter((data) => {
              return search.toLowerCase() === '' 
              ? data 
              : data.name.toLowerCase().includes(search);
            }).map((data, index) => {
              return (   
                <tr key={index} className='border-b-[0.5px] border-[#243c5a] hover:bg-slate-100' onClick={() => handleDeleteSyllabus(data.id)}>
                <Link key={index} to={`/syllabus/${data?.id}`}>
                <td className="px-8 py-4 font-bold">{data.name}</td>
                </Link>
                <td className="px-4 py-4">{data.code}</td>
                <td className="px-4 py-4">{new Date(data.dateCreated).toLocaleDateString('en-GB')}</td>
                <td className="px-4 py-4">{data.creatorName}</td>
                <td className="px-4 py-4">{data.day} days</td>
                <td className="flex items-center px-4 py-4 gap-1">
                  {/* {OutputStandard &&
                  OutputStandard.map((ouput, index) => {
                    return (
                      <div key={index} className='flex flex-wrap justify-center items-center rounded-[50px] px-6 bg-[#2D3748] text-white'>
                      {ouput.output}
                      </div>
                    );
                  })} */}
                  {syllabusList && syllabusList.length >0 &&
                  syllabusList.outputStandardSyllabusData.map((ouput, index) => {
                    return (
                      <div key={index} className='flex flex-wrap justify-center items-center rounded-[50px] px-6 bg-[#2D3748] text-white'>
                      {ouput.standardCode}
                      </div>
                    );
                  })}
                </td>
              <td key={data.id} className="px-4 py-4">      
                <div className='relative'>
                <button onClick={() => handleRowClick(index)}><img src={MoreIcon}
                            class="edit" /></button>
                {selectedRow === index && (
                  <div className='absolute right-10 -top-[50%] z-20'>
                  <div className='w-64 bg-white mt-8 ml-8 rounded-[10px] shadow-[0_20px_40px_rgba(0,0,0,0.16)]'>
                    <div className='flex items-center gap-2 p-4 cursor-pointer'>
                        <img src={AddProgramIcon} alt="SVG" className="h-6 w-6.5 text-white pr-1" />
                        <p className=' text-[#2C5282] font-normal text-lg'>Add training program</p>
                    </div>
                    <div className='flex items-center gap-2 px-4 pb-4 cursor-pointer'>
                        <img src={EditIcon} alt="SVG" className="h-6 w-6.5 text-white pr-1" />
                        <p className=' text-[#2C5282] font-normal text-lg'>Edit syllabus</p>
                    </div>
                    <div className='flex items-center gap-2 px-4 cursor-pointer'>
                        <img src={DuplicateIcon} alt="SVG" className="h-6 w-6.5 text-white pr-1" />
                        <p className=' text-[#2C5282] font-normal text-lg'>Duplicate syllabus</p>
                    </div>
                    {/* <button className='flex items-center gap-2 p-4 cursor-pointer' onClick={() => onDeleteSyllabus(data.id)}> */}
                    <button className='flex items-center gap-2 p-4 cursor-pointer' onClick={() => dispatch(deleteSyllabus(data.id))}>
                        <img src={DeleteIcon} alt="SVG" className="h-6 w-6.5 text-white pr-1" />
                        <p className=' text-[#2C5282] font-normal text-lg'>Delete syllabus</p>
                    </button>
                  </div>
                  </div>
                )}
                </div>
              </td>  
              </tr>
              );
        })}
          </tbody>
        </table>
        <div className='flex justify-center items-center text-[#285D9A] mt-8 font-bold text-base gap-1.5'>
          <div>
            <img src={PreviousIcon} alt="SVG" className="h-5 w-5 mr-3" />
          </div>
          <div className='border rounded-full px-4 py-2 bg-[#E2E8F0] hover:bg-[#285D9A] hover:text-white'>1</div>
          <div className='border rounded-full px-4 py-2 bg-[#285D9A] text-white'>2</div>
          <div className='border rounded-full px-4 py-2 bg-[#E2E8F0] hover:bg-[#285D9A] hover:text-white'>3</div>
          <div>
            <img src={MoreIcon} alt="SVG" />
          </div>
          <div className='border rounded-full px-3 py-2 bg-[#E2E8F0] mr-3 hover:bg-[#285D9A] hover:text-white'>10</div>
          <div>
            <img src={NextIcon} alt="SVG" className="h-5 w-5 mr-4" />
          </div>
          <div>
            <img src={ButtonNextIcon} alt="SVG" className="h-5 w-5" />
          </div>
        </div>
        <div className='flex items-center justify-end text-base pr-8 -mt-8'>
          <div className='text-[#2D3748] mr-4 font-normal'>Rows per page</div>
          <div className='font-bold text-[#285D9A] mr-2'>10</div>
          <div className='flex items-center justify-center'>
            <img src={DownIcon} alt="SVG" className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  </div>;
};