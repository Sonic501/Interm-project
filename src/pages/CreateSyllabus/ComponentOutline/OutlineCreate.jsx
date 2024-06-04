import React, { useState, useEffect } from 'react'
import '../CreateSyllabus.css';
import SwitchCustom from './Switch';
import DeliveryIcons from './DeliveryType';
import { UploadMaterial } from './index';
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';




const OutlineCreate = (props) => {
    const { newObj, day, setDay, unit, unitDetail,
        deliveryType, outputStandard,
    } = props; 6

    const { token, userDTO } = useSelector((state) => state.auth);
    // console.dir(JSON.stringify(day) + "HUHON");

    const totalUnits = day.reduce((count, day) => {
        return count + day.unitDTOList.length;
    }, 0);

    const [collapseStates, setCollapseStates] = useState(Array(totalUnits).fill(false));
    //colapse unit
    const handleCollapseClick = (index) => {
        setCollapseStates((prevState) => {
            const newStates = [...prevState];
            newStates[index] = !newStates[index];
            return newStates;
        });
    };
    //collapse
    const [totalUnitDuration, setTotalUnitDuration] = useState(0);
    const [isCollapse, setCollapses] = useState(Array(day.length).fill(false));
    useEffect(() => {
        // Update the isCollapse state with a new array that has the same length as the day array
        setCollapses(Array(day.length).fill(false));
    }, [day.length]);



    const toggle = (index) => {
        setCollapses((prevState) => {
            const newStates = [...prevState];
            newStates[index] = !newStates[index];
            return newStates;
        });
    }


    //add new lesson
    const [lessonType, setLessonType] = useState(false);
    const [trainingMaterials, setTrainingMaterials] = useState([]);
    const [isAddLesson, setisAddLesson] = useState(false);
    const [currentUnitIndex, setCurrentUnitIndex] = useState(null);
    const toggleAddLesson = (unitIndex) => {
        setisAddLesson(!isAddLesson);
        setCurrentUnitIndex(unitIndex);
    }

    const [errorMessage, setErrorMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [newLesson, setNewLesson] = useState({
        title: '',
        unitId: 0,
        outputStandardId: 0,
        deliveryTypeName: '',
        duration: 30
    })

    const handleChangeLesson = (e) => {
        setNewLesson({ ...newLesson, [e.target.name]: e.target.value });
    }
    const handleAddLesson = (indexDay, indexUnit, newLesson, typeLesson, trainingMaterials) => {
        //get output standard's name
        if (newLesson.title === '') {
            setIsError(true);
            setErrorMessage("Cannot leave empty field");
            return;
        }
        if (newLesson.outputStandardId === 0) {
            setIsError(true);
            setErrorMessage("Please choose a output standard");
            return;
        }
        if (newLesson.deliveryTypeName === '') {
            setIsError(true);
            setErrorMessage("Please choose a delivery type");
            return;
        }
        setIsError(false);

        const osName = outputStandard?.filter((output) => {
            return newLesson.outputStandardId == output.id;
        })[0]?.standardName;

        const dtId = deliveryType?.filter((dt) => {
            return newLesson.deliveryTypeName === dt.typeName;
        })[0]?.id;

        const updatedUnitList = day[indexDay].unitDTOList?.map((unit, index) => {
            if (index === indexUnit) {
                const newLessonToAdd = {
                    title: newLesson.title,
                    duration: newLesson.duration,
                    type: typeLesson,
                    status: true,
                    deliveryTypeId: dtId,
                    outputStandardId: newLesson.outputStandardId,
                    trainingMaterialDTOList: trainingMaterials
                };
                unit.unitDetailDTOList.push(newLessonToAdd);
            }
            return unit;
        });

        const updatedSessionList = day.map((session, index) => {
            if (index === indexDay) {
                return { ...session, unitDTOList: updatedUnitList };
            }
            return session;
        });

        setDay(updatedSessionList);
        setisAddLesson(false);
        setTrainingMaterials([]);
    }



    //get output standard's code name
    const getOutputCodeName = (id) => {
        const code = outputStandard?.filter((output) => {
            return id == output.id;
        })[0]?.standardCode;
        return code;
    }

    //get delivery type's name
    const getDeliveryTypeName = (id) => {
        const name = deliveryType?.filter((delivery) => {
            return id === delivery.id;
        })[0]?.typeName;
        return name;
    }




    //add day function
    const handleAddDay = () => {
        const newSessionNumber = day.length + 1;
        const newDay = {
            id: day.length + 1,
            sessionNumber: newSessionNumber,
            status: true,
            unitDTOList: []
        };
        setDay([...day, newDay]);
    }


    //add unit function
    const [isAddingUnit, setIsAddingUnit] = useState(false);
    const [currentDayIndex, setCurrentDayIndex] = useState(null);
    const toggleAddUnit = (dayId) => {
        setIsAddingUnit(!isAddingUnit);
        setCurrentDayIndex(dayId);
    }


    const [newUnitToAdd, setNewUnitToAddd] = useState('');

    const handleChangeUnit = (e) => {
        setNewUnitToAddd(e.target.value);
    }

    const handleAddUnit = (indexDay, newUnitToAdd, totalDuration) => {
        const unitInDay = day[indexDay].unitDTOList.length;
        const newUnitList = [...day[indexDay].unitDTOList,
        {
            unitTitle: newUnitToAdd,
            unitNumber: unitInDay + 1,
            duration: totalDuration,
            status: true,
            unitDetailDTOList: []
        }];

        const updatedSessionList = day.map((session, index) => {
            if (index === indexDay) {
                return { ...session, unitDTOList: newUnitList };
            }
            return session;
        })
        setDay(updatedSessionList);
        setIsAddingUnit(false);
    }

    //edit unit
    const [isUpdateUnit, setIsUpdateUnit] = useState(false);
    const [updatedUnitName, setUpdatedUnitName] = useState('');
    const updateUnitName = (newUnitName, indexDay, indexUnit) => {
        const updatedUnitList = day[indexDay].unitDTOList.map((unit, index) => {
            if (index === indexUnit) {
                return { ...unit, unitTitle: newUnitName };
            }
            return unit;
        });

        const updatedSessionList = day.map((session, index) => {
            if (index === indexDay) {
                return { ...session, unitDTOList: updatedUnitList };
            }
            return session;
        });
        setDay(updatedSessionList);
        setIsUpdateUnit(false);
    }

    //adding material
    const [isAddingMaterial, setIsAddingMaterial] = useState(false);
    const [isUpdatingMaterial, setIsUpdatingMaterial] = useState(false);
    const [currentUnitDetail, setCurrentUnitDetail] = useState(0);


    //update allocation




    //sort
    const handleDragEnd = (result, index) => {
        if (!result.destination) return;
        const items = Array.from(day[index].unitDTOList);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        const updatedDay = day.map((d, i) => {
            if (i === index) {
                return {
                    ...d,
                    unitDTOList: items.map((item, index) => ({ ...item, unitNumber: index + 1 })),
                };
            }
            return d;
        });
        setDay(updatedDay);
    };
    return (
        <div className='container 
        bg-white overflow-y-scroll
           col-span-4  max-h-screen h-full 
           '>
            <div className=" shadow-lg rounded-xl">
                <div className='collapsible-list'>
                    {day?.map((session, indexDay) => {
                        return (
                            <div key={indexDay} className='collapsible-item'>
                                <div className='bg-[#2D3748] py-2 text-white mb-[0.5px] flex items-center
                                    cursor-pointer truncate'
                                    onClick={() => toggle(indexDay)}>
                                    <h2 className='collapsible-header pl-5 pr-2 font-semibold'>Day {session.sessionNumber}</h2>
                                    <svg className='pt-[2px]' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 9V11H15V9H5ZM10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z" fill="#E74A3B" />
                                    </svg>
                                </div>
                                <div className={`collapsible-content
                                 ${isCollapse[indexDay] ? 'panel-collapse' : 'panel-collapse panel-close'}`}>
                                    <DragDropContext onDragEnd={(result) => { handleDragEnd(result, indexDay) }}>

                                        <Droppable droppableId="unitDTOList">
                                            {(provided) => (
                                                <div {...provided.droppableProps} ref={provided.innerRef} className='unit-list'>
                                                    {day[indexDay].unitDTOList?.map((u, index) => {
                                                        const totalDuration = (u.unitDetailDTOList.reduce((count, detail) => count + detail.duration, 0)) / 60;
                                                        return (
                                                            <Draggable key={index} draggableId={`unit-${index}`} index={index}>
                                                                {(provided) => (
                                                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} key={index} className='unit-item border-b-[1px] border-b-black pl-6 py-4'>
                                                                        <div className='grid grid-cols-10'>
                                                                            <h3 className='unit-number font-bold col-span-1'>Unit {u.unitNumber}</h3>
                                                                            <div className='unit-title col-span-8'>
                                                                                <div className='flex items-center'>
                                                                                    <div className='mr-3'>
                                                                                        {(currentUnitIndex === index && isUpdateUnit) ?
                                                                                            <form
                                                                                                onKeyDown={(e) => {
                                                                                                    if (e.key == "Enter") {
                                                                                                        updateUnitName(updatedUnitName, indexDay, index);
                                                                                                    }
                                                                                                    if (e.key === "Escape") {
                                                                                                        setIsUpdateUnit(false);
                                                                                                    }
                                                                                                }}
                                                                                                onSubmit={(e) => {
                                                                                                    e.preventDefault();
                                                                                                }}>
                                                                                                <input type="text" className='border-black border-[2px] py-[2px] px-2  rounded-lg '
                                                                                                    name='unitTitle' defaultValue={u.unitTitle} onChange={(e) => {
                                                                                                        setUpdatedUnitName(e.target.value);
                                                                                                    }} />
                                                                                            </form> :
                                                                                            <h3 className='font-bold truncate'>{u.unitTitle}</h3>
                                                                                        }
                                                                                        <span className='italic text-[#323232]'>{totalDuration}hrs</span>
                                                                                    </div>
                                                                                    <button onClick={() => {
                                                                                        setIsUpdateUnit(!isUpdateUnit);
                                                                                        setCurrentUnitIndex(index);
                                                                                    }} className='bg-[#2D3748] h-[35px] px-[15px] rounded-lg '>
                                                                                        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path d="M0 14.25V18H3.75L14.81 6.94L11.06 3.19L0 14.25ZM2.92 16H2V15.08L11.06 6.02L11.98 6.94L2.92 16ZM17.71 2.63L15.37 0.29C15.17 0.09 14.92 0 14.66 0C14.4 0 14.15 0.1 13.96 0.29L12.13 2.12L15.88 5.87L17.71 4.04C18.1 3.65 18.1 3.02 17.71 2.63Z" fill="#F1F1F1" />
                                                                                        </svg>
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                            <div className='drop-down flex justify-center col-span-1 cursor-pointer'
                                                                                onClick={() => handleCollapseClick(index)}>
                                                                                <svg style={!collapseStates[index] ? { transform: 'rotate(0deg)', transition: '0.2s' } : { transform: 'rotate(90deg)', transition: '0.2s' }}
                                                                                    width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <path d="M10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2ZM10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 13L6 9H14L10 13Z" fill="#285D9A" />
                                                                                </svg>
                                                                            </div>
                                                                        </div>
                                                                        <div className='grid grid-cols-10 mt-2'>
                                                                            <div className='col-span-1'></div>
                                                                            <ul className={`section-list col-span-9 w-[96%]
                                                            ${!collapseStates[index] ? 'panel-collapse' : 'panel-collapse panel-close'}`}>
                                                                                {u.unitDetailDTOList?.map((detail, j) => {
                                                                                    return (
                                                                                        <li key={j} className='section-item bg-[#F1F1F1] rounded-lg px-3 mb-1 h-11
                                                                         items-center
                                                                         grid grid-cols-8'>
                                                                                            <h4 className='font-bold col-span-3 truncate'>{detail.title}</h4>
                                                                                            <span className='bg-[#2D3748]  text-white w-[60px] py-[2px] rounded-lg flex justify-center
                                                                         ml-4'>{
                                                                                                    getOutputCodeName(detail.outputStandardId)}</span>
                                                                                            <span className='flex justify-center
                                                                        ml-4'>{detail.duration}mins</span>
                                                                                            <span className={`border-2 h-8 px-2 rounded-3xl flex items-center justify-center
                                                                        ${detail.type ? ' bg-[#2D3748] border-[#2D3748] text-white' : 'border-orange-600  text-orange-600'} 
                                                                        ml-4`}>{detail.type ? 'Offline' : 'Online'}</span>
                                                                                            <span className='flex justify-center
                                                                        ml-4'>
                                                                                                <DeliveryIcons deliveryType={getDeliveryTypeName(detail.deliveryTypeId)} />

                                                                                            </span>
                                                                                            <span className='flex justify-center
                                                                                ml-9'>
                                                                                                <button onClick={() => {
                                                                                                    setIsUpdatingMaterial(!isUpdatingMaterial);
                                                                                                    setCurrentUnitDetail(j);
                                                                                                    setCurrentUnitIndex(index);
                                                                                                    setCurrentDayIndex(indexDay);
                                                                                                }}>
                                                                                                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                        <path d="M18 2H10L8 0H2C0.9 0 0.00999999 0.9 0.00999999 2L0 14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V4C20 2.9 19.1 2 18 2ZM18 14H2V2H7.17L9.17 4H18V14ZM15.5 8.12V11.5H12.5V6.5H13.88L15.5 8.12ZM11 5V13H17V7.5L14.5 5H11Z" fill="#285D9A" />
                                                                                                    </svg>
                                                                                                </button>
                                                                                                {(isUpdatingMaterial && currentUnitDetail === j && currentUnitIndex === index
                                                                                                    && currentDayIndex === indexDay) && <UploadMaterial
                                                                                                        created={true}
                                                                                                        toogle={setIsUpdatingMaterial}
                                                                                                        currentUser={userDTO}
                                                                                                        currentUnit={u}
                                                                                                        currentDay={session}
                                                                                                        currentUnitDetail={detail}
                                                                                                        setDay={setDay}
                                                                                                        indexDay={indexDay}
                                                                                                        indexUnit={index}
                                                                                                        indexUnitDetail={j}
                                                                                                        day={day}
                                                                                                    />}
                                                                                            </span>
                                                                                        </li>
                                                                                    )
                                                                                })}

                                                                            </ul>
                                                                            <div className='col-span-1'></div>
                                                                            {(currentUnitIndex === index && isAddLesson) && (

                                                                                <form className='col-span-9 w-[96%]'

                                                                                    onSubmit={(e) => {
                                                                                        e.preventDefault();
                                                                                    }}
                                                                                >
                                                                                    <div className='section-item bg-[#F1F1F1] h-11 rounded-lg px-3 mb-1
                                                                items-center
                                                                grid grid-cols-8'>
                                                                                        <input type="text" className='col-span-3 rounded-lg h-9 px-2' name='title' onChange={handleChangeLesson} required={true} />
                                                                                        <div className='grid grid-cols-8 col-span-5 ml-4 items-center'>
                                                                                            <select className='w-full rounded-lg h-9 col-span-2 text-sm'
                                                                                                name='outputStandardId'
                                                                                                onChange={handleChangeLesson}
                                                                                            >
                                                                                                {outputStandard?.map(os => {
                                                                                                    return (
                                                                                                        <option value={os.id} key={os.id}>{os.standardName}</option>
                                                                                                    )
                                                                                                })}
                                                                                            </select>
                                                                                            <input className='number-input w-8 rounded-lg h-9  text-center col-span-1 ml-1' name='duration' type='number' defaultValue={30}
                                                                                                onChange={handleChangeLesson} required></input>
                                                                                            <div className=" col-span-2">
                                                                                                {/* SWTICH */}
                                                                                                <SwitchCustom isOn={lessonType} setIsOn={setLessonType} />
                                                                                            </div>
                                                                                            <select className='col-span-2 rounded-lg h-9 text-sm'
                                                                                                name='deliveryTypeName'
                                                                                                onChange={handleChangeLesson}>

                                                                                                {deliveryType?.map((delivery) => {
                                                                                                    return (
                                                                                                        <option key={delivery.id} value={delivery.typeName}>
                                                                                                            {delivery.typeName}
                                                                                                        </option>)
                                                                                                })}

                                                                                            </select>
                                                                                            <span className='flex justify-center
                                                                                '><svg
                                                                                                    onClick={() => {
                                                                                                        setIsAddingMaterial(!isAddingMaterial);
                                                                                                    }}
                                                                                                    className='cursor-pointer'
                                                                                                    width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                    <path d="M18 2H10L8 0H2C0.9 0 0.00999999 0.9 0.00999999 2L0 14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V4C20 2.9 19.1 2 18 2ZM18 14H2V2H7.17L9.17 4H18V14ZM15.5 8.12V11.5H12.5V6.5H13.88L15.5 8.12ZM11 5V13H17V7.5L14.5 5H11Z" fill="#285D9A" />
                                                                                                </svg>
                                                                                                {(isAddingMaterial && !isUpdatingMaterial) && <UploadMaterial
                                                                                                    created={false}
                                                                                                    toogle={setIsAddingMaterial}
                                                                                                    trainingMaterials={trainingMaterials}
                                                                                                    setTrainingMaterials={setTrainingMaterials}
                                                                                                    currentUser={userDTO}
                                                                                                    currentUnit={u}
                                                                                                    currentDay={session}
                                                                                                />}
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                    {isError && (<span className='text-red-600 text-sm'>{errorMessage}</span>)}
                                                                                </form>
                                                                            )}

                                                                        </div>
                                                                        <div className='grid grid-cols-10'>
                                                                            <div className='col-span-1'>
                                                                            </div>
                                                                            <div className='col-span-9'>
                                                                                {(currentUnitIndex === index && isAddLesson) ?
                                                                                    <div className='flex mt-3'>
                                                                                        <svg
                                                                                            onClick={() => {
                                                                                                handleAddLesson(indexDay, index, newLesson, lessonType, trainingMaterials);
                                                                                                setTotalUnitDuration(totalDuration);
                                                                                            }}
                                                                                            className='cursor-pointer'
                                                                                            fill="#2D3748" viewBox="0 0 32 32" width="35" height="35" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M21.82 13.030l-1.002-1.002c-0.185-0.185-0.484-0.185-0.668 0l-6.014 6.013-2.859-2.882c-0.186-0.185-0.484-0.185-0.67 0l-1.002 1.003c-0.185 0.185-0.185 0.484 0 0.668l4.193 4.223c0.185 0.184 0.484 0.184 0.668 0l7.354-7.354c0.186-0.185 0.186-0.484 0-0.669zM16 3c-7.18 0-13 5.82-13 13s5.82 13 13 13 13-5.82 13-13-5.82-13-13-13zM16 26c-5.522 0-10-4.478-10-10 0-5.523 4.478-10 10-10 5.523 0 10 4.477 10 10 0 5.522-4.477 10-10 10z"></path> </svg>
                                                                                        <svg
                                                                                            onClick={() => setisAddLesson(false)}
                                                                                            className='ml-2 cursor-pointer' fill="#2D3748" viewBox="0 0 24 24" width="35" height="35" xmlns="http://www.w3.org/2000/svg"><path d="M9.172 16.242 12 13.414l2.828 2.828 1.414-1.414L13.414 12l2.828-2.828-1.414-1.414L12 10.586 9.172 7.758 7.758 9.172 10.586 12l-2.828 2.828z"></path><path d="M12 22c5.514 0 10-4.486 10-10S17.514 2 12 2 2 6.486 2 12s4.486 10 10 10zm0-18c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8z"></path></svg>
                                                                                    </div>
                                                                                    :
                                                                                    <button className='mt-2'
                                                                                        onClick={() => {
                                                                                            toggleAddLesson(index);
                                                                                        }}>
                                                                                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <rect width="28" height="28" rx="14" fill="#2D3748" />
                                                                                            <g clipPath="url(#clip0_1173_19783)">
                                                                                                <path d="M15 9H13V13H9V15H13V19H15V15H19V13H15V9ZM14 4C8.49 4 4 8.49 4 14C4 19.51 8.49 24 14 24C19.51 24 24 19.51 24 14C24 8.49 19.51 4 14 4ZM14 22C9.59 22 6 18.41 6 14C6 9.59 9.59 6 14 6C18.41 6 22 9.59 22 14C22 18.41 18.41 22 14 22Z" fill="#F1F1F1" />
                                                                                            </g>
                                                                                            <defs>
                                                                                                <clipPath id="clip0_1173_19783">
                                                                                                    <rect width="24" height="24" fill="white" transform="translate(2 2)" />
                                                                                                </clipPath>
                                                                                            </defs>
                                                                                        </svg>

                                                                                    </button>}

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        );
                                                    })}
                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Droppable>
                                    </DragDropContext>
                                    {(currentDayIndex == indexDay && isAddingUnit) &&
                                        <form onSubmit={(e) => {
                                            e.preventDefault();
                                            handleAddUnit(indexDay, newUnitToAdd, totalUnitDuration);
                                        }}>
                                            <div className='unit-item border-b-[1px] border-b-black pl-6 py-4'>
                                                <div className='grid grid-cols-10'>
                                                    <h3 className='unit-number font-bold col-span-1'>Unit {day[indexDay].unitDTOList.length + 1}</h3>
                                                    <div className='unit-title col-span-8'>
                                                        <div className='items-center'>
                                                            <label>Unit name</label><br />
                                                            <input type={'text'} className='border-black border-[2px] py-[2px] px-2 w-3/6  rounded-lg '
                                                                name='unitTitle' onChange={handleChangeUnit} />
                                                            <button type='submit'
                                                                className='bg-[#2D3748] font-semibold text-white px-3 py-1 rounded-lg ml-3'>Create</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>}
                                    <div className='ml-5 mt-5 pb-6 '>
                                        <button onClick={() => { toggleAddUnit(indexDay) }} className='flex items-center bg-[#474747] text-white rounded-lg px-2 py-2'>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11 5H9V9H5V11H9V15H11V11H15V9H11V5ZM10 0C4.49 0 0 4.49 0 10C0 15.51 4.49 20 10 20C15.51 20 20 15.51 20 10C20 4.49 15.51 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z" fill="#F1F1F1" />
                                            </svg>
                                            <span className='ml-1'>Add Unit</span>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        )
                    })}
                </div>

            </div>
            <button onClick={handleAddDay} className='ml-5 mt-5 mb-6 flex items-center bg-[#2D3748] text-white rounded-lg px-2 py-2'>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 5H9V9H5V11H9V15H11V11H15V9H11V5ZM10 0C4.49 0 0 4.49 0 10C0 15.51 4.49 20 10 20C15.51 20 20 15.51 20 10C20 4.49 15.51 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z" fill="#F1F1F1" />
                </svg>
                <span className='ml-1'>Add Day</span>
            </button>
            <div className='w-full h-5 bg-[#2D3748] rounded-b-2xl'></div>
        </div>
    )
}

export default OutlineCreate