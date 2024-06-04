import React from 'react'
import lastPageSvg from '../resources/last_page.svg';
import moreHorizontalSvg from '../resources/more_horizontal.svg';
import arrowBackSvg from '../resources/arrow_back_ios.svg';
import arrowForwardSvg from '../resources/arrow_forward_ios.svg';

const Pagination = (props) => {

  const handlePreviousPage = () => {
    props.updateQueryParams('page', props.currentPage - 2)
  }

  const handleNextPage = () => {
    props.updateQueryParams('page', props.currentPage)
  }

  const handleLastPage = () => {
    props.updateQueryParams('page', props.totalPages - 1)
  }

  const handleFirstPage = () => {
    props.updateQueryParams('page', 0)
  }

  const handleSpecificPage = (number) => {
    props.updateQueryParams('page', number - 1)
  }

  const activeClass = "mx-1 flex h-9 w-9 items-center justify-center rounded-full bg-blue-800 p-0 text-lg font-bold transition duration-150 ease-in-out text-white button-active";
  const inactiveClass = "mx-1 flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 p-0 text-lg font-bold transition duration-150 ease-in-out text-blue-900";


  return (
    <nav className="mx-auto pl-32">
    {props.totalPages === 1 ? (
       <ul className="flex">
         <li>
           <a className={activeClass} href="#">1</a>
         </li>
       </ul>
    ) : (
      <ul className="flex">
        {props.currentPage === 1 ? null : 
          (<li>
            <a
              className="mx-1 flex h-10 w-10 items-center justify-center rounded-full  bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
              href="#"
              aria-label="Previous"
              onClick={handlePreviousPage}
            >
              <span className="material-icons text-sm">
                <img src={arrowBackSvg} alt="" className="w-10 h-10" />
              </span>
            </a>
          </li>)
        }
        {[...Array(props.totalPages)].map((_, i) => (
          <li key={i}>
            <a
              className={i + 1 === props.currentPage ? activeClass : inactiveClass}
              href="#"
              onClick={() => handleSpecificPage(i + 1)}
            >
              {i + 1}
            </a>
          </li>
        ))}
        {props.currentPage === props.totalPages ? null : 
          (<li>
            <a
              className="mx-1 flex h-10 w-10 items-center justify-center rounded-full bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
              href="#"
              aria-label="Next"
              onClick={handleNextPage}
            >
              <span className="material-icons text-sm">
                <img src={arrowForwardSvg} alt="" className="w-10 h-10" />
              </span>
            </a>
          </li>)
        }
        <li>
          <a
            className="mx-1 flex h-10 w-10 items-center justify-center rounded-full bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
            href="#"
            onClick={handleLastPage}
            aria-label="Last Page">
            <span className="material-icons text-sm">
              <img src={lastPageSvg} alt="" className="w-10 h-10" />
            </span>
          </a>
        </li>
      </ul>
    )}
  </nav>
  )
}

export default Pagination;