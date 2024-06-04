import { handleClassName } from "../../redux/slices/createClass/searchProgramSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const CreateClass = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [classNames, setClassNames] = useState("");
  const handleClassNameChange = (event) => {
    setClassNames(event.target.value);
    dispatch(handleClassName(event.target.value));
  };
  function handleForm() {
    console.log("class Name", classNames);
    Navigate("/class/create_class/searchPro");
  }
  return (
    <>
      <div className="headerr p-[20px_30px_20px_30px] bg-[#2D3748] mt-0.5">
        <h1 className="text-white text-[24px] font-medium tracking-[0.2em]">
          Class
        </h1>
      </div>
      <div className="search-container mt-5 ml-[30px]">
        <form onSubmit={handleForm}>
          <label className="font-normal text-[14px]">Class name </label>
          <br />
          <input
            required
            value={classNames}
            onChange={handleClassNameChange}
            className="w-[376px] h-9 border-[#000000] border-2 rounded-xl p-4"
            type="text"
            placeholder="Type class name"
          />
          <input
            className="ml-[5px] bg-[#2D3748] rounded-xl border-2 border-[#2D3748]
             text-white font-bold text-[14ox] w-[67px] h-[35px]"
            type="submit"
            value="create"
          />
          <br />
        </form>
      </div>
      <div className="w-[1172px] h-[0.2px] mt-[20px] bg-[#000000]"> </div>
    </>
  );
};

export default CreateClass;
