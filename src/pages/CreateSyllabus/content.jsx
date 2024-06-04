import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import { NewTab, NewTabContext, NewTabList } from "./styleContent";
import TabPanel from "@mui/lab/TabPanel";
import "quill/dist/quill.snow.css";
import "./content2.scss";
import { useDispatch, useSelector } from "react-redux";
import Outline from "./Outline";
import axios from 'axios';
import SwitchCustom from '../CreateSyllabus/ComponentOutline/Switch';
import 'react-quill/dist/quill.snow.css';
import Others from "./Others";
import { OutlineAllocation } from "./ComponentOutline";
import General from "./General";
import HeaderCreateSyllabus from "./HeaderCreateSyllabus";


function Content(props) {
  const { tabs, handleSubmit, handleSaveAsDraft, click } = props;

  const [name, setSyllabusName] = useState("");
  const [code, setCode] = useState("");
  const version = "1.0";
  const [syllabusLevel, setSyllabusLevel] = useState("");
  const [attendeeNumber, setAttendeeNumber] = useState("");
  const [technicalRequirement, setTechnicalReq] = useState("");
  const [courseObjective, setCourseObj] = useState({
    courseObjective: "",
    name: "courseObjective",
  });


  const [errors, setErrors] = useState({ name: "", value: "", error: "" });

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



  //Handle Function
  const handleCrouseObjChange = (html) => {
    setCourseObj({ courseObjective: html, name: "courseObjective" });
  };

  const handleValidation = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const error = { name: name, value: value, error: "" };
    setErrors(error);
    switch (name) {
      case "name":
        if (!value.length > 0) {
          setErrors({
            name: name,
            value: value,
            error: "Please input name of syllabus",
          });
        } else {
          setErrors("");
        }
        break;
      case "technicalRequirement":
        if (!value.length > 0) {
          setErrors({
            name: name,
            value: value,
            error: "Please input technical requirement",
          });
        } else {
          setErrors("");
        }
        break;
      case "code":
        if (!value.length > 0) {
          setErrors({
            name: name,
            value: value,
            error: "Please input code",
          });
        } else {
          setErrors("");
        }
        break;
      case "AttendeeNumb":
        if (!value.length > 0) {
          setErrors({
            name: name,
            value: value,
            error: "Please input Attendee Number",
          });
        } else {
          setErrors("");
        }
        break;
      default:
        break;
    }
  };
  console.log(errors);

  //OUTLINE_HD
  const { token } = useSelector(state => state.auth)
  function fetchData(endpoint, token) {
    const [data, setData] = useState([]);

    useEffect(() => {
      const fetchAxiosData = async () => {
        const headers = {
          Authorization: `Bearer ${token}`,
          Accept: '*/*'
        };
        try {
          const response = await axios.get(endpoint, { headers });
          setData(response);
        } catch (err) {
          console.error(err);
        }
      };
      fetchAxiosData();
    }, []);

    // Return the state value directly
    return [data, setData];
  }
  const [day, setDay] = useState([]);
  const [unit, setUnit] = useState([]);
  const [unitDetail, setUnitDetail] = useState([]);
  const [trainingMaterial, setTrainingMaterial] = useState([]);

  const [deliveryType, setDeliveryType] = fetchData('https://f-m-c-v3.azurewebsites.net/api/delivery', token);
  const [outputStandard, setOutputStandard] = fetchData('https://f-m-c-v3.azurewebsites.net/api/osd', token);
  //TIME ALLOCATION

  const [quiz, setQuiz] = useState('');
  const [assignment, setAssignment] = useState('');
  const [final, setFinal] = useState('');
  const [error, setError] = useState('');
  const [finalTheory, setFinalTheory] = useState('');
  const [finalPractice, setFinalPractice] = useState('');
  const [gpa, setGPA] = useState('');
  const [trainingDes, setTrainingDes] = useState(
    {
      trainingDes: "",
      name: "trainingDes",
    }
  );
  const [reTestDes, setReTestDes] = useState({
    reTestDes: "",
    name: "reTestDes",
  })
  const [markingDes, setMarkingDes] = useState({
    markingDes: "",
    name: "markingDes",
  })
  const [waiverCriteriaDes, setWaiverCriteriaDes] = useState({
    waiverCriteriaDes: "",
    name: "waiverCriteriaDes",
  })
  const [otherDes, setOtherDes] = useState({
    otherDes: "",
    name: "otherDes",
  })


  //SYLLABUS TO ADD
  const newObj = {
    name: name,
    code: code,
    level: syllabusLevel,
    version: version,
    attendee: attendeeNumber,
    hour: 0,
    day: 0,
    technicalRequirements: technicalRequirement,
    courseObjectives: `${courseObjective.courseObjective}`,
    dateCreated: "2023-03-13",
    lastDateModified: "2023-03-13",
    quiz: quiz,
    assignment: assignment,
    finalExam: final,
    finalTheory: finalTheory,
    finalPractice: finalPractice,
    gpa: gpa,
    trainingDes: `${trainingDes.trainingDes}`,
    reTestDes: `${reTestDes.reTestDes}`,
    markingDes: `${markingDes.markingDes}`,
    waiverCriteriaDes: `${waiverCriteriaDes.waiverCriteriaDes}`,
    otherDes: `${otherDes.otherDes}`,
    state: true,
    status: true,
    sessionDTOList: day

  };
  if (click === "save") {
    handleSubmit(newObj);
  }
  if (click === "saveAsDraft") {
    handleSaveAsDraft(newObj);
  }

  console.log(newObj);

  return (
    <>
      <div className="syllabus_details_content">
      <HeaderCreateSyllabus
          name = {name}
          code = {code}
          version = {version}
          setSyllabusName = {setSyllabusName}
          setCode = {setCode}
          handleValidation  = {handleValidation}
          errors = {errors}
          setErrors = {setErrors}
        />
        <div
          className={
            tabs === "Outline"
              ? "syllabus_details_content_body_outline"
              : tabs === "Others"
                ? "syllabus_details_content_body_others"
                : "syllabus_details_content_body"
          }
        >
          <NewTabContext value={tabs}>
            <NewTabList>
              <NewTab label="General" value="General" />
              <NewTab label="Outline" value="Outline" />
              <NewTab label="Others" value="Others" />
            </NewTabList>
            <TabPanel value="General">
              <General
                day={day}
                attendeeNumber={attendeeNumber}
                setAttendeeNumber={setAttendeeNumber}
                technicalRequirement={technicalRequirement}
                setTechnicalReq={setTechnicalReq}
                courseObjective={courseObjective}
                setCourseObj={setCourseObj}
                errors={errors}
                setErrors={setErrors}
                handleValidation={handleValidation}
                deliveryType={deliveryType}
                syllabusLevel = {syllabusLevel}
                setSyllabusLevel = {setSyllabusLevel}
              />
            
            </TabPanel>

            <TabPanel value="Outline">
              {/* {OUTLINE22} */}
              <Outline
                newObj={newObj}
                setDay={setDay}
                day={day}
                unit={unit}
                setUnit={setUnit}
                unitDetail={unitDetail}
                trainingMaterial={trainingMaterial}
                deliveryType={deliveryType}
                outputStandard={outputStandard}
              />
            </TabPanel>
            <TabPanel value="Others">
              {/* other */}
              <Others
                newObj={newObj}
                setQuiz={setQuiz}
                setAssignment={setAssignment}
                setFinal={setFinal}
                setFinalTheory={setFinalTheory}
                setFinalPractice={setFinalPractice}
                setGPA={setGPA}
                setMarkingDes={setMarkingDes}
                setOtherDes={setOtherDes}
                setTrainingDes={setTrainingDes}
                setReTestDes={setReTestDes}
                setWaiverCriteriaDes={setWaiverCriteriaDes}

                trainingDes={trainingDes}
                reTestDes={reTestDes}
                markingDes={markingDes}
                waiverCriteriaDes={waiverCriteriaDes}
                otherDes={otherDes}
              />
            </TabPanel>
          </NewTabContext>
        </div>
      </div>
    </>
  );
}
export default Content;
