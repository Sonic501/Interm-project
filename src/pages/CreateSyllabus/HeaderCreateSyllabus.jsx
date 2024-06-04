import React from 'react'

const HeaderCreateSyllabus = (props) => {
    const {
        name,code,version,setSyllabusName,setCode,handleValidation,errors,setErrors
    } = props;
    
  return (
    <div className='syllabus_details_content_header'>
      <div className="syllabus_details_content_header_class_name">
            <p className="syllabus_details_content_header_class_name_title">
              Syllabus Name*{" "}
            </p>
            <div className="syllabus_details_content_header_class_name_input">
              <input
                type="text"
                placeholder="Class name"
                className="class_name"
                name="name"
                value={name}
                onChange={(e) => setSyllabusName(e.target.value)}
                onBlur={(e) => handleValidation(e)}
                onFocus={() => setErrors("")}
              />
              {errors.name === "name" && (
                <p className="syllabus_input_errors ">{errors.error}</p>
              )}
            </div>
          </div>

          <div className="syllabus_details_content_header_class_name_code">
            <p className="syllabus_details_content_header_class_name_title">
              Code:
            </p>
            <div className="flex-col">
              <input
                type="text"
                maxLength={5}
                className="syllabus_details_content_header_class_name_content"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                }}
                name="code"
                onFocus={() => setErrors("")}
                onBlur={(e) => handleValidation(e)}
              />
              {errors.name === "code" && (
                <p className="syllabus_input_errors">{errors.error}</p>
              )}
            </div>
          </div>
          <div className="syllabus_details_content_header_class_name_code">
            <p className="syllabus_details_content_header_class_name_title">
              Version:
            </p>
            <p className="syllabus_details_content_header_class_name_content_version">
              {version}
            </p>
          </div>
    </div>
  )
}

export default HeaderCreateSyllabus
