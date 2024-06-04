import { fetchTrainingClassData } from '../../redux/slices/viewClass/classSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImportPopup from './ImportPopup';
import Name from './smalIComponent/Name';
import Pagination from './smalIComponent/Pagination';
import SearchBar from './smalIComponent/SearchBar';
import SetRowsPerPage from './smalIComponent/SetRowsPerPage';
import Loading from '../../components/Loading/Loading';
import TableBody from './Table';
import SearchList from './smalIComponent/SearchList';
import TableHead from './TableHead';
import { initialTrainingClassData, resetList, setQueryParam } from '../../redux/slices/viewClass/initialState';
import { removeAll } from '../../redux/slices/viewClass/searchClassSlice';
import Swal from 'sweetalert2';
import Tooltip from './Tooltip';

const ViewClass = () => {
  const [dataList, setDataList] = useState([]);

  const queryParams = useSelector((state) => state.initialParams);
  //Calling API
  const dispatch = useDispatch();
  const { trainingClassData, loading, error } = useSelector(
    (state) => state.trainingClass
  );

  useEffect(() => {
    dispatch(fetchTrainingClassData(queryParams));
    dispatch(fetchTrainingListProgram());

  }, [dispatch, queryParams]);

  useEffect(() => {
    if (trainingClassData && trainingClassData.content) {
      setDataList(trainingClassData.content);
    }
  }, [trainingClassData]);

  const numberOfPages = trainingClassData?.totalPages;
  const pageNumber = trainingClassData?.pageable?.pageNumber;
  const currentRowsPerPage = trainingClassData?.totalElements;

  if (trainingClassData === 'Class not found') {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Your class is not found!',
    })
    dispatch(removeAll);
    dispatch(setQueryParam(initialTrainingClassData));
  }

  //Changing Calls
  const updateQueryParams = (key, value) => {
    dispatch(setQueryParam({ key, value }));
  };

  //IMPORT POPUP
  const [openImport, setOpenImport] = useState(false);
  const togglePopupImport = () => {
    setOpenImport(!openImport);
  }

  const handleClosePopupImport = () => {
    setOpenImport(false);
  };

  //=============================================//

  //TOOLTIP
  const [openTooltip, setOpenTooltip] = useState(false);
  const togglePopupTooltip = () => {
    setOpenTooltip(!openTooltip);
  }

  const handleClosePopupTooltip = () => {
    setOpenTooltip(false);
  };

  const handleSaveMe = () => {
    dispatch(resetList());
  }

  const [rowsPerPage, setRowsPerPage] = useState(currentRowsPerPage > 10 ? 10 : currentRowsPerPage);

  const handleSetRowsPerPage = (value) => {
    setRowsPerPage(value);
    updateQueryParams('row', value);
    updateQueryParams('page', 0);
  }


  function handleMenuClose() {
    setShowMenu(false);
  }

  const onPageChange = (page) => {
    setCurrentPage(page);
  };


  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Something went wrong</p>;
  }

  return (
    <div className="w-full h-fit">

      {!trainingClassData?.pageable ? (
        <div className='w-full h-screen flex justify-center items-center flex-col'>
          <div> Training class not found</div>

          <div class='button w-40 h-16 bg-blue-500  cursor-pointer select-none
              active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]
              active:border-b-[0px]
              transition-all duration-150 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841]
              rounded-full  border-[1px] border-blue-400 m-10' onClick={handleSaveMe}>
            <span class='flex flex-col justify-center items-center h-full text-white font-bold text-lg '>Save Me</span>
          </div>
        </div>
      ) : (
        <div>
          {openImport && (
            <ImportPopup handleClosePopupImport={handleClosePopupImport} />
          )}

          {openTooltip && (
            <Tooltip handleClosePopupTooltip={handleClosePopupTooltip} updateQueryParams={updateQueryParams} />
          )}

          <Name />
          <SearchBar
            togglePopupImport={togglePopupImport}
            updateQueryParams={updateQueryParams}
            togglePopupTooltip={togglePopupTooltip}
          />
          <SearchList
            updateQueryParams={updateQueryParams}
          />

          <div className="w-full inline-block rounded-lg shadow-2xl border h-3/4 bg-white mt-8">
            <table className="table-fixed border w-full rounded-xl border-collapse">
              <TableHead updateQueryParams={updateQueryParams} />
              <TableBody dataList={dataList} rowsPerPage={rowsPerPage} updateQueryParams={updateQueryParams} />
            </table>
          </div>

          <div className="w-full flex items-center h-16 mt-10">
            <Pagination totalPages={numberOfPages} currentPage={pageNumber + 1} updateQueryParams={updateQueryParams} />

            <SetRowsPerPage rowsPerPage={rowsPerPage} setRowsPerPage={handleSetRowsPerPage} currentTotalElements={currentRowsPerPage} />
          </div>
        </div>
      )}

    </div>
  );
};

export default ViewClass;
