import React from 'react';
import { OutlineAllocation } from './ComponentOutline';
import ReactQuill from 'react-quill';

const General = (props) => {
  const {
    attendeeNumber, setAttendeeNumber, technicalRequirement, setTechnicalReq,
    courseObjective, setCourseObj, errors, setErrors, handleValidation,
    deliveryType, day,syllabusLevel, setSyllabusLevel
  } = props;

  //SyllabusLevel
  const listLevel = [
    {

      id: 1,
      level: 1,
    },
    {
      id: 2,
      level: 2,
    },
    {
      id: 3,
      level: 3,
    },
    {

      id: 4,
      level: "All level",
    },
  ];





  //ReactQuillModule
  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["clean"],
    ],
  };

  //HandleFunction
  const handleCrouseObjChange = (html) => {
    setCourseObj({ courseObjective: html, name: "courseObjective" });
  };




  return (
    <div className="General_content">
      <div className="General_content_item_container">
        <div className="General_content_item_body">
          <div className="General_content_header">
            <div className="General_content_item">
              <h5
                className="min-w-[37px] max-w-[190px] h-[17px] font-bold text-sm text-black">
                Level
              </h5>
              <select
                className="flex flex-row  justify-between  items-center gap-[10px] w-[242px] h-[35px] bg-white border border-black  rounded-[10px] italic  font-normal text-base text-black pl-[5px]"
                name="level"
                id="level"
                onChange={(e) => setSyllabusLevel(e.target.value)}>
                {listLevel.map((item, index) => (
                  <option key={item.id} value={item.level}>
                    {item.level}
                  </option>
                ))}
              </select>
            </div>
            <div className="General_content_item">
              <h5 className="General_content_text">
                Attendee number
              </h5>
              <div className="flex-row block ">
                <input
                  className="General_content_input"
                  name="AttendeeNumb"

                  type="number"
                  min="0"
                  value={attendeeNumber}
                  onChange={(e) => setAttendeeNumber(e.target.value)}
                  onBlur={(e) => handleValidation(e)}
                  onFocus={() => setErrors("")}
                />
                {errors.name === "AttendeeNumb" && (
                  <p className="syllabus_input_errors">{errors.error}</p>
                )}
              </div>
            </div>
          </div>
          <div className="General_content_textarea">
            <h4 className="General_content_text">
              Technical Requirement(s)
            </h4>
            <textarea
              className="General_content_textarea_Technical"
              name="technicalRequirement"
              value={technicalRequirement}
              onChange={(e) => setTechnicalReq(e.target.value)}
              onBlur={(e) => handleValidation(e)}
              onFocus={() => setErrors("")}
            ></textarea>
            {errors.name === "technicalRequirement" && (
              <p className="syllabus_input_errors">{errors.error}</p>
            )}
          </div>
          <div className="General_content_textarea">
            <h4 className="General_content_text">
              Course Objectives
            </h4>
            <div id="editor">
              <ReactQuill
                theme="snow"
                name="courseObj"
                modules={modules}
                value={courseObjective.courseObjective}
                onChange={handleCrouseObjChange}

              />

            </div>

          </div>
        </div>
      </div>
      <div className='ml-10 col-span-2 w-fit'>
        <OutlineAllocation
          deliveryType={deliveryType}
          day={day} />
      </div>
    </div>
  );
}

export default General;
