import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from "axios";
import Swal from "sweetalert2";
import { fetchListSyllabus, duplicateSyllabus, deleteSyllabus } from '../../redux/slices/viewSyllabus/syllabusSlice';
import { initialSyllabusData, resetListSyllabus, setQueryParamSyllabus } from '../../redux/slices/viewSyllabus/initialState';
import { removeAll } from '../../redux/slices/viewSyllabus/searchSyllabusSlice';
import SortIcon from '../ViewSyllabusList/assets/sorticon.svg';
import MoreIcon from '../ViewSyllabusList/assets/more_horizontal.png';
import DeleteIcon from '../ViewSyllabusList/assets/deleteicon.svg';
import AddProgramIcon from '../ViewSyllabusList/assets/addpro.svg';
import DuplicateIcon from '../ViewSyllabusList/assets/duplicateicon1.svg';
import Loading from "../../components/Loading/Loading";
import SetRowsPerPage from './component/SetRowsPerPage';
import Pagination from './component/Pagination';
import ImportPopup from './ImportPopup';
import SearchList from './component/SearchList';
import SearchSyllabusBar from './component/SearchBar';

export default function ViewSyllabus() {
  const [selectedRow, setSelectedRow] = useState(null);
  const handleRowClick = (index) => {
    if (selectedRow === index) {
      setSelectedRow(null);
    } else {
      setSelectedRow(index);
    }
  };

  const {token, permission} = useSelector(state => state.auth)

  const [openImport, setOpenImport] = useState(false);
  const togglePopupImport = () => {
    setOpenImport(!openImport);
  }

  const handleClosePopupImport = () => {
    setOpenImport(false);
  };

  const togglePopupTooltip = () => {
    setOpenTooltip(!openTooltip);
  }

  const queryParams = useSelector((state) => state.initialSyllabusParamsTest);
  const dispatch = useDispatch();
  const { syllabusList, error } = useSelector((state) => state);
  useEffect(() => {
    dispatch(fetchListSyllabus({queryParams, token}));
    if (error) {
      console.log(error)
    }
  }, [dispatch, queryParams]);

  function handleDuplicateSyllabus(data) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mx-2',
        cancelButton: 'bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mx-2',
      },
      buttonsStyling: false,
    });
    
    swalWithBootstrapButtons
      .fire({
        title: `Are you sure you want to dupplicate ${data.name}?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, dupplicate it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await axios({
              url: `https://f-m-c-v3.azurewebsites.net/api/syllabus/duplicate/${data.id}`,
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            // props.updateQueryParams('page', '0');
            swalWithBootstrapButtons.fire('Duplicated', `${data.name} has been duplicated.`, 'success');
            dispatch(fetchListSyllabus(queryParams)); 
          } catch (error) {
            swalWithBootstrapButtons.fire('Error', `Failed to duplicate ${data.name}: ${error.message}`, 'error');
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('Cancelled', `${data.name} has not been duplicated.`, 'error');
        }
      });
  }

  function handleDeleteSyllabus(data) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mx-2',
        cancelButton: 'bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mx-2',
      },
      buttonsStyling: false,
    });
  
    swalWithBootstrapButtons
      .fire({
        title: `Are you sure you want to delete ${data.name}?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await axios({
              url: `https://f-m-c-v3.azurewebsites.net/api/syllabus/delete/${data.id}`,
              method: 'PUT',
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            console.log(response.status);
            if (response === true) {
              // props.updateQueryParams('page', '0');
              swalWithBootstrapButtons.fire('Deleted', `${data.name} has been deleted.`, 'success');
              dispatch(fetchListSyllabus(queryParams)); 
            } else {
              swalWithBootstrapButtons.fire('Error', `Failed to delete ${data.name}.`, 'error');
            }
          } catch (error) {
            console.log(error);
            swalWithBootstrapButtons.fire('Error', `Failed to delete ${data.name}.`, 'error');
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('Cancelled', `${data.name} has not been deleted.`, 'error');
        }
      });
  }

  const numberOfPages = syllabusList?.syllabusListData.totalPages;
  const pageNumber = syllabusList?.syllabusListData.pageable?.pageNumber;
  const currentRowsPerPage = syllabusList?.syllabusListData.totalElements;
  const [rowsPerPage, setRowsPerPage] = useState(currentRowsPerPage > 10 ? 10 : currentRowsPerPage);

  const updateQueryParams = (key, value) => {
    dispatch(setQueryParamSyllabus({ key, value }));
  };

  const handleSetRowsPerPage = (value) => {
    setRowsPerPage(value);
    updateQueryParams('row', value);
    updateQueryParams('page', 0);
  }

  return <div className='relative'>
    <div className='flex flex-row text-3xl font-semibold px-8 py-4 border-b border-[#2D3748] text-[#2D3748]'>Syllabus</div>
    {openImport && (
      <ImportPopup handleClosePopupImport={handleClosePopupImport} />
      )}
      
    <SearchSyllabusBar 
    togglePopupImport={togglePopupImport}
    updateQueryParams={updateQueryParams}
    togglePopupTooltip={togglePopupTooltip}
    />

    <SearchList
            updateQueryParams={updateQueryParams}
    />
    <div>
      {syllabusList.loading && <Loading />}
      {!syllabusList.loading && (
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
           {syllabusList?.syllabusListData?.content?.slice(0, rowsPerPage).map((data, index) => {
              return (   
                <tr key={index} className='border-b-[0.5px] border-[#243c5a] hover:bg-slate-100'>
                <Link key={index} to={`/syllabus/view_syllabus/${data?.id}`}>
                <td className="px-8 py-4 font-bold">{data.name}</td>
                </Link>
                <td className="px-4 py-4">{data.code}</td>
                <td className="px-4 py-4">{new Date(data.dateCreated).toLocaleDateString('en-GB')}</td>
                <td className="px-4 py-4">{data.creatorName}</td>
                <td className="px-4 py-4">{data.day} days</td>
                <td className="flex items-center px-4 py-4 gap-1">
                {data.outputStandardCodeList.map((code) => (
                  <div key={code} className='flex flex-wrap justify-center items-center rounded-[50px] px-6 bg-[#2D3748] text-white'>
                    {code}
                  </div>
                ))}
                </td>
              <td key={data.id} className="px-4 py-4">   
              {permission.syllabusPermission !== "View" && (   
                <div className='relative'>
                <button onClick={() => handleRowClick(index)}><img src={MoreIcon}
                            className="edit" /></button>
                {selectedRow === index && (
                  <div className='absolute right-10 -top-[50%] z-20'>
                  <div className='w-64 bg-white mt-8 ml-8 rounded-[10px] shadow-[0_20px_40px_rgba(0,0,0,0.16)]'>
                    <div className='flex items-center gap-2 p-4 hover:bg-blue-100 cursor-pointer w-full'>
                        <img src={AddProgramIcon} alt="SVG" className="h-6 w-6.5 text-white pr-1" />
                        <p className=' text-[#2C5282] font-normal text-lg'>Add training program</p>
                    </div>
                    <button className='flex items-center gap-2 px-4 py-1 cursor-pointer hover:bg-blue-100 w-full' onClick={() => handleDuplicateSyllabus(data)}>
                        <img src={DuplicateIcon} alt="SVG" className="h-6 w-6.5 text-white pr-1" />
                        <p className=' text-[#2C5282] font-normal text-lg'>Duplicate syllabus</p>
                    </button>
                    <button className='flex items-center gap-2 p-4 cursor-pointer hover:bg-blue-100 w-full' onClick={() => handleDeleteSyllabus(data)}>
                        <img src={DeleteIcon} alt="SVG" className="h-6 w-6.5 text-white pr-1" />
                        <p className=' text-[#2C5282] font-normal text-lg'>Delete syllabus</p>
                    </button>
                  </div>
                  </div>
                )}
                </div>
              )}
              </td>  
              </tr>
              );
        })}
          </tbody>
        </table>
        <div className="w-full flex items-center h-16 mt-10">
          <Pagination totalPages={numberOfPages} currentPage={pageNumber+1} updateQueryParams={updateQueryParams}/>
          <SetRowsPerPage rowsPerPage={rowsPerPage} setRowsPerPage={handleSetRowsPerPage} currentTotalElements={currentRowsPerPage}/>
        </div>
      </div>
      )}
    </div>
  </div>;
};
