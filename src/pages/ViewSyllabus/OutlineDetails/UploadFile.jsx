import React, { useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import { useState } from "react";
import edit from "../assetsSyllabus/edit.png";
import deleteButton from "../assetsSyllabus/delete-forever.png";
import { toast, ToastContainer } from "react-toastify";
import closeButton from "../assetsSyllabus/cancel.png";
import "react-toastify/dist/ReactToastify.css";
import { storage } from "./firebase";
import {
  uploadBytes,
  ref,
  listAll,
  getDownloadURL,
  deleteObject,
  uploadBytesResumable,
} from "firebase/storage";
import { IconButton } from "@mui/material";
import axios from "axios";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

const UploadFile = ({ unitDetail, day, unit, setShowPopup, showPopup }) => {
  const [fileList, setFileList] = useState([]);
  const { userDTO, token } = useSelector((state) => state.auth);

  const [selectedFile, setSelectedFile] = useState(null);

  const {permission} = useSelector((state) => state.auth);

  useEffect(() => {
    const storedFiles = localStorage.getItem(`files-${unitDetail.id}`);
    if (storedFiles) {
      setFileList(JSON.parse(storedFiles));
    } else {
      axios
        .get(
          `https://f-m-c-v3.azurewebsites.net/api/training-material/get-all/${unitDetail.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "*/*",
            },
          }
        )
        .then((response) => {
          setFileList(response);
          localStorage.setItem(`files-${unitDetail.id}`, JSON.stringify(response));
        });
    }
  }, [unitDetail.id, token]);

  const handleUploadFile = async (e) => {
    const temp = e.target.files[0];
    if (temp == null) return;

    try {
      const fileRef = ref(
        storage,
        `units/Unit Detail ${unitDetail.id}/${temp.name}`
      );
      await uploadBytes(fileRef, temp);
      toast.success("Upload succeeded !", {
        position: toast.POSITION.TOP_CENTER,
      });

      const downloadURL = await getDownloadURL(fileRef);

      const newFile = [
        {
          uploadDate: moment(new Date()).format("YYYY-MM-DD"),
          data: downloadURL,
          name: temp.name,
          type: "",
          size: temp.size,
          status: true,
          unitDetailId: unitDetail.id,
          unitDetailTitle: unitDetail.title,
          userId: userDTO.id,
          userName: userDTO.fullName,
        },
      ];
      setFileList([...fileList, ...newFile]); // Update state with new file list
      axios.post(
        `https://f-m-c-v3.azurewebsites.net/api/training-material/upload-file/${unitDetail.id}`,
        newFile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "*/*",
          },
        }
      );
      // Get the updated file list from the backend API
    } catch (error) {
      toast.error(`Error uploading file: ${error.message}`, {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  };

  const handleDeleteFile = async (file) => {
    try {
      setFileList((prevFileList) =>
        prevFileList.filter((f) => f.id !== file.id)
      );
      const fileRef = ref(
        storage,
        `units/Unit Detail ${unitDetail.id}/${file.name}`
      );
      const res = await axios.put(
        `https://f-m-c-v3.azurewebsites.net/api/training-material/delete/${file.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "*/*",
          },
        }
      );
      await deleteObject(fileRef);

      toast.success("File deleted successfully", {
        position: toast.POSITION.TOP_CENTER,
      });

      setFileList((prev) =>
        prev.filter((fileItem) => fileItem.name !== file.name)
      );
    } catch (error) {
      // toast.error(`Error deleting file: ${error.message}`, {
      //   position: toast.POSITION.TOP_LEFT,
      // });
    }
  };



  const handleUpdateFile = async (fileToUpdate, e) => {
    try {
      const newFile = e.target.files[0];
        const fileRef = ref(
          storage,
          `units/Unit Detail ${unitDetail.id}/${newFile.name}`
        );
        await uploadBytes(fileRef, newFile);
        const downloadURL = await getDownloadURL(fileRef);
        const updatedFile = {
          id:fileToUpdate.id,
          uploadDate: moment(new Date()).format("YYYY-MM-DD"),
          data: downloadURL,
          name: newFile.name,
          type: "",
          size: newFile.size,
          status: true,
          unitDetailId: unitDetail.id,
          unitDetailTitle: unitDetail.title,
          userId: userDTO.id,
          userName: userDTO.fullName,
        };

        console.log(updatedFile);
        setFileList((prevFileList) =>
        prevFileList.map((f) => {
          if (f.id === fileToUpdate.id) {
            return updatedFile;
          }
          return f;
        })
      );
axios.put(
        `https://f-m-c-v3.azurewebsites.net/api/training-material/${fileToUpdate.id}`,
        updatedFile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "*/*",
          },
        }
      );
      toast.success("File updated successfully", {
        position: toast.POSITION.TOP_CENTER,
      });  
    } catch (error) {
      toast.error(`Error updating file: ${error.message}`, {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="bg-black h-screen w-screen fixed z-10 top-0  left-0 bg-opacity-10 flex items-center justify-center ">
        <div className="w-6/12 bg-white  relative rounded-box  ">
          <div className="h-[40px] flex justify-between items-center rounded-t-box pl-3 pr-3 w-full bg-[#2D3748] text-[#ffffff]">
            <h1 className="">Day {day.sessionNumber}</h1>
            <button
              onClick={() => {
                setShowPopup(false);
              }}
            >
              <img src={closeButton} className="" />
            </button>
          </div>
          <div className="h-[200px] overflow-y-auto">
            <div className="flex font-extrabold ml-[25px] mb-[10px] mt-[10px]">
              <div className="pr-[20px]">Unit {unit.unitNumber}</div>
              <div className="">{unitDetail.title}</div>
            </div>

            <div className="text-center">
              <div className="w-11/12 m-auto rounded-md bg-[#f1f1f1] ">
                <div className="font-extrabold pt-3 ml-3 flex justify-start">
                  {unitDetail.title}
                </div>
                <div className="flex flex-col justify-between mx-[30px]">
                  {fileList?.map((file) => (
                    <div
                      key={file.id}
                      className="flex flex-row justify-between items-center"
                    >
                      <a
                        href={file.data}
                        download
                        target="_blank"
                        className="text-blue-400 underline text-[15px] w-[150px]"
                      >
                        {file.name}
                      </a>
                      <div className="text-[15px] font-[Inter]">
                        by {file.userName} on {file.uploadDate}
                      </div>
                      <div>
                        <Button component="label">
                          <input
                            type="file"
                            hidden
                            onChange={(e) => handleUpdateFile(file, e)}
                          />

                          <img src={edit} />
                        </Button>
                        <IconButton onClick={() => handleDeleteFile(file)}>
                          <img src={deleteButton} />
                        </IconButton>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center mt-3 mb-3">
              {permission.syllabusPermission !== "View" && (
                <Button
                  variant="contained"
                  component="label"
                  sx={{
                    backgroundColor: "#2D3748",
                    width: "110px",
                    height: "37px",
                    textTransform: "none",
                    borderRadius: "10px",
                    margin: "0 auto",
                  }}
                  // onClick={uploadFile}
                >
                  Upload new
                  <input
                    hidden
                    multiple
                    type="file"
                    onChange={(e) => {
                      handleUploadFile(e);
                    }}
                  />
                </Button>
              )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadFile;