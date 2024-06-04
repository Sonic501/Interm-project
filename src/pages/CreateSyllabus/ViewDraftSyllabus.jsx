import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchListSyllabus, viewDetailSyllabus, outputStandardSyllabus, deleteSyllabus } from '../../redux/slices/syllabusSlice';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './datepicker.css';
import Vector from '../ViewSyllabusList/assets/Vector.png';
import Search from '../ViewSyllabusList/assets/search.png';
import CalendarIcon from '../ViewSyllabusList/assets/calendar_today.png';
import SortIcon from '../ViewSyllabusList/assets/sorticon.svg';
import ImportIcon from '../ViewSyllabusList/assets/publish.png';
import AddSyllabus from '../ViewSyllabusList/assets/addsyllabus.png';
import MoreIcon from '../ViewSyllabusList/assets/more_horizontal.png';
import DeleteIcon from '../ViewSyllabusList/assets/deleteicon.svg';
import EditIcon from '../ViewSyllabusList/assets/editicon.svg';
import AddProgramIcon from '../ViewSyllabusList/assets/addpro.svg';
import DuplicateIcon from '../ViewSyllabusList/assets/duplicateicon1.svg';
import PreviousIcon from '../ViewSyllabusList/assets/previousicon.svg';
import NextIcon from '../ViewSyllabusList/assets/next.svg';
import ButtonNextIcon from '../ViewSyllabusList/assets/nexticon.svg';
import DownIcon from '../ViewSyllabusList/assets/downicon.svg';
import Loading from "../../components/Loading/Loading";
import viewSyllabusDetail from '../ViewSyllabus/viewSyllabusDetail';

// import Pagination from '../ViewClass/smalIComponent/Pagination';
// import SetRowsPerPage from '../ViewClass/smalIComponent/SetRowsPerPage';


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
export default function ViewDraftSyllabus() {

  // const [isLoading, setIsLoading] = useState(true);

  


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
  console.log('State12', syllabusList);
  useEffect(() => {
    dispatch(fetchListSyllabus());

    if (error) {
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
  const filterData = (value) => { };

  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      const response = await fetch(`/api/search?q=${query}`);
      const data = await response.json();
      setResults(data);
    }
  };



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

    <div>
      <div className='flex pl-8 mt-9'>
        {/* <div className='w-1/2 flex gap-1.5'>
          <div className='flex gap-2.5 border border-black rounded-[10px] pl-3 py-1 w-1/2 items-center'>
            <img src={Search} alt="" className='h-5 w-5' />
            <input type="text" id="name" placeholder="Search by..." onChange={(e) => setSearch(e.target.value)} onKeyPress={handleKeyPress} className='outline-[#fff] px-2 text-base italic placeholder:text-black placeholder:text-base' />
          </div>
          <div className='flex gap-2.5 border border-black rounded-[10px] pl-3 py-1 w-1/2 items-center'>
            <img src={CalendarIcon} alt="" className='h-5 w-5' />
            <div className='w-full pr-3'>
              <DatePicker selectsRange={true} startDate={startDate}
                endDate={endDate} placeholderText="Created date" onChange={onChangeDateHandler} openToDate={new Date()} dateFormat="dd/MM/yyyy" shouldCloseOnSelect={false}
                className="datepicker w-full outline-[#fff] text-base placeholder:italic placeholder:text-black placeholder:text-base text-center placeholder:text-left" />
            </div>

          </div>
        </div> */}

      </div>
      {/* <div className='flex px-8 gap-3 my-4'>
        {KeywordSearch &&
          keywords?.map((p, index) => {
            return (
              <div key={index} className='flex border rounded-[10px] px-4 py-2 bg-[#474747] text-white italic text-lg'>{p.value} &nbsp; <span onClick={() => handleOnclickDelete(p.id)}>x</span></div>
            );
          })}
      </div> */}
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
            {syllabusList?.syllabusListData?.content?.filter((data) => {
              return search.toLowerCase() === ''
                ? data
                : data.name.toLowerCase().includes(search);
            }).map((data, index) => {
              return (
                <tr key={index} className='border-b-[0.5px] border-[#243c5a] hover:bg-slate-100' onClick={() => handleDeleteSyllabus(data.id)}>
                  <Link key={index} to={`/syllabus/view_syllabus/${data?.id}`}>
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
                    {syllabusList && syllabusList.length > 0 &&
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
                        className="edit" /></button>
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