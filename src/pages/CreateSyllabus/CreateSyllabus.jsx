import React, { useState, useEffect } from "react";
import ProgressBar from "./progressBar/progressBar";
import Content from "./content";
import Button from "@mui/material/Button";
import "./content2.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  addDraft,
  addSyllabus,
} from "./createSyllabusFunction";
import Swal from "sweetalert2";
import { DeleteIcon, CopyIcon, EditIcon } from "./Icons";
import { Badge } from "reactstrap";
import { Modal, Pagination } from "@mui/material";
import { Card } from "@mui/material";
import styled from "styled-components";
import DraftModal from "./DraftModal";



function CreateSyllabus() {


  const [list, setList] = useState([]);
  const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiaWF0IjoxNjc4OTUzNjMyLCJleHAiOjE3NDIwNjc1MzZ9.oNbSE1phniTjfoBldw2ZfMJrjF4GsL1aqZr6HaDF21tD5c3DbQZaTnryLeRaLbu3DZlhRZSBXsZdIzroOWDsXQ';

  const [value, setValue] = useState(0);
  const [color, setColor] = useState("");
  const [tabs, setTabs] = useState("General");
  const [click, setClick] = useState("");
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  const dispatch = useDispatch();

  useEffect(() => {
    const url = "https://f-m-c-v3.azurewebsites.net/api/syllabus/list?fromDate=2000-03-13&toDate=3000-03-13&search=&page=0&row=100&sort=name%2Casc";
    // const url = "https://f-m-c-v3.azurewebsites.net/api/syllabus/list?fromDate=2000-03-13&toDate=3000-03-13&search=Tr%C6%B0%C6%A1ng%20Qu%E1%BB%91c%20B%E1%BA%A3o&page=0&row=10&sort=name%2Casc"
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: '*/*'
    };

    fetch(url, { headers })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`API request failed with status code ${response.status}`);
        }
      })
      .then(data => {
        // Do something with the data
        setList(data)
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  }, [])

  useEffect(() => {
    if (value === 0) {
      setColor("#2D3748");
      setTabs("General");
    } else if (value <= 40) {
      setColor("#285D9A");
      setTabs("Outline");
    } else if (value <= 64) {
      setColor("#D55B13");
      setTabs("Others");
    }
  }, [value]);

  console.log(click);
  const NewCard = styled(Card)`
  position: absolute;
  width: 800px;
  top: 12%;
  left: 23%;
  border-radius: 12px !important;
`;
  const handleSubmit = (obj) => {
    console.log(obj);
    if (
      obj.name === "" ||
      obj.technicalRequirement === "" ||
      obj.courseObjective === "" ||
      obj.code === ""
    ) {
      Swal.fire({ title: "Please check our input!", icon: "warning" });
      setClick("");
    } else {
      Swal.fire({
        title: "Do you want to save the changes?",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#285D9A",
        cancelButtonColor: "#e74a3b",
        confirmButtonText: "Yes, save it!",
        background: "white",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(addSyllabus(obj));
        } else if (result.dismiss) {
          setClick("");
          setValue(value)
          console.log(setValue);
        }
      });
    }
  };
  const handleSaveAsDraft = (obj) => {
    console.log(obj);
    if (obj.name === "") {
      Swal.fire({ title: "Syllabus Name can not null!", icon: "warning" });
      setClick("");
    } else {
      Swal.fire({
        title: "Do you want to save as draft?",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#285D9A",
        cancelButtonColor: "#e74a3b",
        confirmButtonText: "Yes, save it!",
        background: "#fff",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(addDraft(obj));
        } else if (result.dismiss) {
          setClick("");
          setValue(value);
        }
      });
    }
  };

  const handleDraftOpen = () => {
    setIsModalOpened(true);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;
  const totalPages = Math.ceil(list.content?.length / ITEMS_PER_PAGE);


  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentListItems = list.content?.slice(startIndex, endIndex);
  return (
    <>

      <div className="syllabus">
        <div className="syllabus_header">
          <div className="syllabus_header_progressBar">
            <ProgressBar value={value} color={color} />
          </div>
          <div className="syllabus_header_draft">
            <Button
              className="syllabus_header_draft_button"
              onClick={handleDraftOpen}
            >
              <CopyIcon />
              Draft
            </Button>

          </div>
          <div className="syllabus_draft_list">
            
            <DraftModal
              value={value}
              color={color}
              handleDraftOpen={handleDraftOpen}
              isModalOpened={isModalOpened}
              currentListItems={currentListItems}
              startIndex={startIndex}
              setIsModalOpened={setIsModalOpened}
              totalPages={totalPages}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          </div>
        </div>
        <div className="syllabus_body">
          <Content
            handleSubmit={handleSubmit}
            handleSaveAsDraft={handleSaveAsDraft}
            click={click}
            tabs={tabs}
          />
        </div>
        <div className="action_button">
          <div className="action_button_left">
            {value > 0 ? (
              <Button
                className="previous"
                onClick={() => setValue(value > 0 ? value - 24 : value)}
              >
                Pervious
              </Button>
            ) : (
              ""
            )}
          </div>

          <div className="action_button_right">
            <Button className="cancel" onClick={() => setValue(0)}>
              Cancel
            </Button>
            <Button
              className="save_as_draft"
              onClick={() => setClick("saveAsDraft")}
            >
              Save as draft
            </Button>
            {value < 40 ? (
              <Button className="next" onClick={() => setValue(value + 24)}>
                Next
              </Button>
            ) : (
              <Button className="next" onClick={() => setClick("save")}>
                Save
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateSyllabus;
