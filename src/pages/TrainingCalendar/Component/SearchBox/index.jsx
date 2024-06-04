import { useDispatch, useSelector } from "react-redux";
import { getCalendarByDay, getCalendarByWeek } from "../../redux/trainingCalenderService";
import Filter from "./Filter";
import Close from "/src/assets/icons/Close";
import Search from "/src/assets/icons/Search";

const SearchBox = ({ keywords, setKeywords }) => {
  const handleKeywords = (e) => {
    if (e.key === "Enter") {
      setKeywords([...keywords, e.target.value]);
      e.target.value = "";
    }
  };

  const handleRemoveKeywords = (keyword) => {
    const newKeywords = keywords.filter((item) => item !== keyword);
    setKeywords(newKeywords);
  };

  const className = {
    container: "flex flex-wrap items-start text-left font-bold w-full mt-5  pl-[30px] font-['Inter']",
    SearchBox:
      "mr-[5px] [box-shadow:0px_0px_0px_1px_black_inset] [box-shadow-width:1px] pl-2.5 bg-white flex items-center " +
      "text-black text-left w-[300px] h-[35px] rounded-[10px] font-['Inter']",
    FilterBtn: `filter flex justify-center items-center text-white text-left font-bold w-[85px] h-[38px] bg-[rgba(45,55,72,1)]/80 rounded-[10px] font-['Inter']`,
    FilterText: "text-sm ml-1 w-9 leading-[normal] h-[17px]",
    ArrayOfKeywords: "flex flex-row my-6 basis-full",
  };

  return (
    <>
      <div className={className.container}>
        <div className={className.SearchBox}>
          <div className="w-full h-6 gap-2.5 flex items-center">
            <Search />
            <input
              className="outline-none text-sm italic m-0 leading-[normal] h-[17px] w-10/12 placeholder:text-sm placeholder:font-bold placeholder:text-black"
              type="text"
              placeholder="Search by..."
              onKeyDown={handleKeywords}
            />
          </div>
        </div>

        <div className={className.FilterBtn}>
          <Filter />
          <p className={className.FilterText}>Filter</p>
        </div>

        <ArrayOfKeywords className={className.ArrayOfKeywords} keywords={keywords} handleRemoveKeywords={handleRemoveKeywords} />
      </div>
    </>
  );
};

const ArrayOfKeywords = ({ keywords, handleRemoveKeywords, ...props }) => {
  const className = {
    container: "inline-block mr-1",
    keywordChip: `flex justify-around items-center py-2 px-[15px] text-white text-left bg-[rgba(71,71,71,1)] rounded-[20px] font-['Inter']`,
    keywordsText: "text-sm italic font-normal align-middle mx-2",
  };

  return (
    <div {...props}>
      {keywords.map((keyword, index) => (
        <div key={index} className={className.container}>
          <div className={className.keywordChip}>
            <p className={className.keywordsText}>{keyword}</p>
            <Close className="w-2 h-2 hover:opacity-80" onClick={(e) => handleRemoveKeywords(keyword)} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchBox;
