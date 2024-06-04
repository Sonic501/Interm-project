import React, { useState } from 'react'
import rightFilterSvg from './resources/right-filter.svg';

const TableHead = (props) => {
  const [dateSortOrder, setDateSortOrder] = useState('asc');
  const [fsuSort, setFsuSort] = useState('asc');
  const [locationSort, setLocationSort] = useState('asc');
  const [attendeeSort, setAttendeeSort] = useState('asc');
  const [createdBySort, setCreatedBySort] = useState('asc');
  const [codeSort, setCodeSort] = useState('asc');
  const [nameSort, setNameSort] = useState('asc');
  const [duration, setDuration] = useState('asc');

  const sortFunction = (sort) => {
  switch (sort) {
    case 'className': 
        setNameSort(nameSort === 'asc' ? 'desc' : 'asc')
        props.updateQueryParams('sort', `className,${nameSort}`);
        break;
    case 'classCode':

        setCodeSort(codeSort === 'asc' ? 'desc' : 'asc')
        props.updateQueryParams('sort', `classCode,${codeSort}`);
      break;
    case 'createdBy':

        setCreatedBySort(createdBySort === 'asc' ? 'desc' : 'asc')
        props.updateQueryParams('sort', `creator, ${createdBySort}`);
      break;
    case 'attendee':

        setAttendeeSort(attendeeSort === 'asc' ? 'desc' : 'asc')
        props.updateQueryParams('sort', `attendee, ${attendeeSort}`);
      break;
    case 'location':

        setLocationSort(locationSort === 'asc' ? 'desc' : 'asc')
        props.updateQueryParams('sort', `location, ${locationSort}`);
      break;
    case 'fsu':

        setFsuSort(fsuSort === 'asc' ? 'desc' : 'asc')
        props.updateQueryParams('sort', `fsu, ${fsuSort}`);
      break;
    case 'createdOn':
        setDateSortOrder(dateSortOrder === 'asc' ? 'desc' : 'asc')
        props.updateQueryParams('sort', `dateCreated,${dateSortOrder}`);
      break;
    case 'duration':
        setDuration(duration === 'asc' ? 'desc' : 'asc')
        props.updateQueryParams('sort', `day,${duration}`);
      break;
    default:
      break;
  }}

  return (
    <thead className="rounded-xl">
    <tr className="bg-[#2D3748] text-white text-left rounded-xl">
      <th
        className="w-[12%] py-2 pl-5 rounded-tl-xl"
        onClick={()=>sortFunction('className')}
      >
        <span className="flex items-center rounded-tl-lg">
          Class
          <img
            src={rightFilterSvg}
            alt="SVG"
            className="h-3 w-3 text-white ml-2 cursor-pointer"
          />
        </span>
      </th>
      <th className="w-[15%] py-2 pl-4 ">
        <span
          className="flex items-center"
          onClick={()=>sortFunction('classCode')}
        >
          Class Code{' '}
          <img
            src={rightFilterSvg}
            alt="SVG"
            className="h-3 w-3 text-white ml-2 cursor-pointer"
          />
        </span>
      </th>
      <th className="w-[8%] py-2 pl-4 " onClick={()=>sortFunction('createdOn')}>
        <span className="flex items-center">
          Created on{' '}
          <img
            src={rightFilterSvg}
            alt="SVG"
            className="h-3 w-3 text-white ml-2 cursor-pointer"
          />
        </span>
      </th>
      <th
        className="w-[8%] py-2 pl-4 "
        onClick={()=>sortFunction('createdBy')}
      >
        <span className="flex items-center">
          Created by{' '}
          <img
            src={rightFilterSvg}
            alt="SVG"
            className="h-3 w-3 text-white ml-2 cursor-pointer"
          />
        </span>
      </th>
      <th
        className="w-[8%] py-2 pl-4 "
        onClick={()=>sortFunction('duration')}
      >
        <span className="flex items-center">
          Duration{' '}
          <img
            src={rightFilterSvg}
            alt="SVG"
            className="h-3 w-3 text-white ml-2 cursor-pointer"
          />
        </span>
      </th>
      <th
        className="w-[14%] py-2 pl-4 "
        onClick={()=>sortFunction('attendee')}
      >
        <span className="flex items-center">
          Attendee{' '}
          <img
            src={rightFilterSvg}
            alt="SVG"
            className="h-3 w-3 text-white ml-2 cursor-pointer"
          />
        </span>
      </th>
      <th
        className="w-[9%] py-2 pl-4 "
        onClick={()=>sortFunction('location')}
      >
        <span className="flex items-center">
          Location{' '}
          <img
            src={rightFilterSvg}
            alt="SVG"
            className="h-3 w-3 text-white ml-2 cursor-pointer"
          />
        </span>
      </th>
      <th className="w-[4%] py-2 pl-4" onClick={()=>sortFunction('fsu')}>
        <span className="flex items-center">
          FSU{' '}
          <img
            src={rightFilterSvg}
            alt="SVG"
            className="h-3 w-3 text-white ml-2 cursor-pointer"
          />
        </span>
      </th>
      <th className="w-[5%] py-2 pr-5 rounded-tr-lg"></th>
    </tr>
  </thead>
  )
}

export default TableHead;