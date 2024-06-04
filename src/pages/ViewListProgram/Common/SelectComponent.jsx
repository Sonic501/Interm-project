import React, { useState } from "react";
import "../../../pages/ViewListProgram/Common/SelectFile.css";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
  display: "block",
};

function SelectComponent(props) {
  const [file, setFile] = useState();
  const onChange = (e) => {
    var files = e.target.files;
    console.log(files);
    let arr = files[0].name.split(".");
    if (arr[1] !== "csv") {
      console.log("file csv");
      props.setError(true);
    } else {
      props.setError(false);
      props.setFileImport(files[0]);
    }
    var filesArr = Array.prototype.slice.call(files);
    console.log(filesArr);
    setFile(files[0]);
  };
  const removeFile = () => {
    setFile();
  };
  return (
    <>
      <div style={styles}>
        <label className="custom-file-upload">
          <input type="file" onChange={onChange} />
          Select
        </label>
        {file && (
          <div className="file-preview" onClick={removeFile}>
            {file.name}
          </div>
        )}
      </div>
    </>
  );
}

export default SelectComponent;
