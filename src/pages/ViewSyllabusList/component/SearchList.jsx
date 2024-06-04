// import { removeItem } from '../../../redux/slices/viewClass/searchClassSlice';
import { removeItem } from '../../../redux/slices/viewSyllabus/searchSyllabusSlice';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import exitSvg from '../../ViewSyllabusList/assets/exit.svg';
const SearchList = (props) => {

  const dispatch = useDispatch();
  const items = useSelector((state) => state.searchSyllabusBar);

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
    props.updateQueryParams('search', items.filter((item) => item.id !== id).map((item) => item.name));
  };

  return (
    <div className="w-full px-10 flex space-x-2 my-4">
    {items.map((item, index) => (
      <button
        className="flex bg-[#474747] h-8 items-center justify-evenly px-4 text-lg text-white rounded-xl space-x-3 mt-2 hover:bg-opacity-75"
        key={index}
      >
        <p className="italic">{item.name}</p>
        <img
          src={exitSvg}
          alt="SVG"
          className="h-3 w-3 text-white mt-1"
          onClick={() => handleRemoveItem(item.id)}
        />
      </button>
    ))}
  </div>
  )
}

export default SearchList