import React, { useState } from 'react'
import OutlineAPI from './axiosConnection';
import OutGame from './outPS';
import asignmentLab from "/src/assets/icons/lab.png";
import conceptLecture from "/src/assets/icons/lecture.png";
import guideReview from "/src/assets/icons/review.png";
import testQuiz from "/src/assets/icons/quiz.png";
import exam from "/src/assets/icons/exam.png";
import workshop from "/src/assets/icons/workshop.png";
import { Popup } from "./ViewPopup";
import Folder from "/src/assets/icons/Folder.png"
function TrainingMaterial(props) {
    const [material, setMaterial] = OutlineAPI(
        "https://f-m-c-v3.azurewebsites.net/api/unit-detail/" + props.id
    );
    const [showPopup, setShowPopup] = useState(false);
    const [tid, setTid] = useState();
    const [unitTid, setUnitTid] = useState();
    const [materialName, setMaterialName] = useState();
    const togglePopup = (id, unitId, materialName) => {
        if (!showPopup) {
            setTid(id);
            setUnitTid(unitId)
            setMaterialName(materialName)
        }
        // console.log(tid, unitId)
        setShowPopup(!showPopup);
    };
    function icon(icon) {
        switch (icon) {
            case 'Assignment/Lab':
                return <img src={asignmentLab}></img>
                break;
            case 'Concept/Lecture':
                return <img src={conceptLecture}></img>
                break;
            case 'Guide/Review':
                return <img src={guideReview}></img>
                break;
            case 'Seminar/Workshop':
                return <img src={workshop}></img>
                break;
            case 'Test/Quiz':
                return <img src={testQuiz}></img>
                break;
            case 'Exam':
                return <img src={exam}></img>
                break;
        }
    }

    return (
        <div>
            {material.map((material, index) => {
                return <div className='mb-1' key={index}>
                    <div className='space-y-2'>
                        <div className=" bg-slate-200 ml-[130px] mr-[20px] pl-[6px] rounded-lg p-2 flex flex-row justify-between" >
                            <span className=" ml-3 text-xl font-medium">{material.title}</span>
                            <div className="flex">
                                <OutGame id={(material.outputStandardId)}></OutGame>
                                <span className='absolute left-2/3 ml-6 py-2'> {material.duration}mins</span>
                                <span className='absolute left-3/4 mb-3 ml-3 border-2 rounded-xl py-1 px-3 border-orange-500 text-orange-500 '>{material.type ? "Online" : "Offline"}</span>
                                <p className="absolute mt-1 right-32 material-symbols-outlined leading-[31px]"> {icon(material.deliveryTypeName)} </p>
                                <button className='mr-5 mt-1' onClick={e => togglePopup(material.id, material.unitId, material.title)}><img src={Folder}></img></button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            )}
            <hr className='h-1 bg-black'></hr>
            {showPopup && <Popup id={unitTid} idMaterial={tid} materialName={materialName} onClose={togglePopup} />}
        </div>
    )
}

export default TrainingMaterial
