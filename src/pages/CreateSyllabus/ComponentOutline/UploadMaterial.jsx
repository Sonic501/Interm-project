import { React, useState, useRef, useEffect } from 'react'
import { storage } from "../../ViewSyllabus/OutlineDetails/firebase";
import {
    uploadBytes,
    ref,
    listAll,
    getDownloadURL,
    deleteObject,
    uploadBytesResumable,
} from "firebase/storage";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
const UploadMaterial = (props) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDate.getDate()).slice(-2);

    const formattedDate = `${year}-${month}-${day}`

    const [isUpdated, setIsUpdated] = useState(false);

    const fileListRef = ref(storage, `units/Unit Detail ${props.indexUnitDetail}/`);
    const updateInputRef = useRef(null);
    

    const handleFileUpload =  (event) => {
        setIsUpdated(false);
        const files = Array.from(event.target.files);
        if (files == null) return;
        //upload to firebase
        files.forEach( async (file) => {
            const fileRef = ref(
                storage,
                `units/Unit Detail ${props.indexUnitDetail}/${file.name}`
            );
            await uploadBytes(fileRef, file);
            // Get the download URL of the uploaded file
        const downloadURL = await getDownloadURL(fileRef);
            const newMaterial = {
                uploadDate: formattedDate,
                data: downloadURL,
                name: file.name,
                type: file.type,
                size: file.size,
                status: true
            };
            if (props.created) {
                props.currentUnitDetail.trainingMaterialDTOList.push(newMaterial);
                
            }
            else {
                props.setTrainingMaterials(prev => [...prev, newMaterial]);
                console.log(newMaterial);
            }
        });
        toast.success('Upload Success !', {
            position: toast.POSITION.TOP_RIGHT
        });
        setIsUpdated(true);
    }
    console.dir(JSON.stringify(props.trainingMaterials) + "MY MAT");

    //Edit name of the material's name when unit detail is created
    const [isEdit, setIsEdit] = useState(false);
    const [currentMaterial, setCurrentMaterial] = useState(null);
    const [newMaterialName, setNewMaterialName] = useState(null);
    const updateMaterialName = (newName, indexMaterial) => {
        const updatedMaterial = props.currentUnitDetail.trainingMaterialDTOList?.map((material, index) => {
            if (indexMaterial === index) {
                return { ...material, name: newName };
            }
            return material;
        });

        const updatedDay = props.day?.map((session, index) => {
            if (index === props.indexDay) {
                const updatedUnitList = session.unitDTOList.map((unit, unitIndex) => {
                    if (unitIndex === props.indexUnit) {
                        const updatedDetailList = unit.unitDetailDTOList.map((detail, detailIndex) => {
                            if (detailIndex === props.indexUnitDetail) {
                                return { ...detail, trainingMaterialDTOList: updatedMaterial };
                            }
                            return detail;
                        });
                        return { ...unit, unitDetailDTOList: updatedDetailList };
                    }
                    return unit;
                });
                return { ...session, unitDTOList: updatedUnitList };
            }
            return session;
        });

        props.setDay(updatedDay);
        setIsEdit(false);
    };

    //delete material when unit detail is created
    const deleteMaterial = (indexMaterial) => {
        const updatedMaterial = props.currentUnitDetail.trainingMaterialDTOList?.filter((material, index) => {
            return indexMaterial !== index;
        });

        const updatedDay = props.day?.map((session, index) => {
            if (index === props.indexDay) {
                const updatedUnitList = session.unitDTOList.map((unit, unitIndex) => {
                    if (unitIndex === props.indexUnit) {
                        const updatedDetailList = unit.unitDetailDTOList.map((detail, detailIndex) => {
                            if (detailIndex === props.indexUnitDetail) {
                                return { ...detail, trainingMaterialDTOList: updatedMaterial };
                            }
                            return detail;
                        });
                        return { ...unit, unitDetailDTOList: updatedDetailList };
                    }
                    return unit;
                });
                return { ...session, unitDTOList: updatedUnitList };
            }
            return session;
        });

        props.setDay(updatedDay);
    };

    //edit material's name when creating unit detial
    const [isEditCreate, setIsEditCreate] = useState(false);
    const [currentEditCreate, setCurrentEditCreate] = useState(null);
    const [newNameCreate, setNewNameCreate] = useState(null);



    const updateCreateMaterialName = (newName, indexMaterial) => {
        const updateMaterialName = props.trainingMaterials?.map((material, index) => {
            if (index === indexMaterial) {
                return { ...material, name: newName };
            }
            return material
        })
        props.setTrainingMaterials(updateMaterialName)
        setIsEditCreate(false);
    }

    const deleteMaterialCreate = (indexMaterial) => {
        const updatedMaterial = props.trainingMaterials?.filter((material, index) => {
            return index !== indexMaterial;
        })
        props.setTrainingMaterials(updatedMaterial);
    }
    return (
        <div>
            <ToastContainer />
            <div className='bg-black h-screen w-screen fixed z-10 top-0  left-0 bg-opacity-10 flex items-center justify-center'>
                <div className='w-6/12 bg-white  relative rounded-3xl pb-6'>
                    <div className='bg-[#2D3748] w-full h-11 flex items-center justify-between rounded-t-2xl'>
                        <div className='text-white font-semibold ml-6 '>Day {props.currentDay.sessionNumber}</div>
                        <button onClick={() => {
                            props.toogle(false);
                        }}>
                            <svg className='mr-6' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM13.59 5L10 8.59L6.41 5L5 6.41L8.59 10L5 13.59L6.41 15L10 11.41L13.59 15L15 13.59L11.41 10L15 6.41L13.59 5Z" fill="white" />
                            </svg>
                        </button>

                    </div>
                    <div className='ml-6 my-3'>
                        <span className='font-bold'>Unit {props.currentUnit.unitNumber}</span>
                        <span className='ml-6 font-bold'>{props.currentUnit.unitTitle}</span>
                    </div>

                    <div className='bg-[#F1F1F1] ml-6 mr-6 rounded-lg py-3'>
                        <div className='ml-4 font-bold w-1/2'>{props.created && props.currentUnitDetail.title}</div>
                        {
                            props.created ?
                                props.currentUnitDetail.trainingMaterialDTOList?.map((material, index) => {
                                    return (
                                        <div className='flex justify-between' key={index}>
                                            {(isEdit && currentMaterial === index) ?
                                                <form
                                                    onSubmit={(e) => {
                                                        e.preventDefault();
                                                    }}>
                                                    <input type={'text'} className='border-black border-[2px] py-[2px] ml-4 px-2 w-full  rounded-lg '
                                                        name='unitTitle'
                                                        defaultValue={material.name}
                                                        onChange={(e) => {
                                                            setNewMaterialName(e.target.value);
                                                        }} /></form> :
                                                <a className='ml-4 text-[#0C4DA2] underline w-1/2 truncate whitespace-normal' href={material.data}>{material.name}</a>
                                            }
                                            <div className='flex items-center'>
                                                <span className='mr-4 text-[#323232] italic font-thin'>by {props.currentUser.fullName} on {material.uploadDate}</span>
                                                {(isEdit && currentMaterial === index) ?
                                                    <svg
                                                        onClick={() => {
                                                            updateMaterialName(newMaterialName, index);
                                                        }}
                                                        width="19" height="18" className='mr-4 cursor-pointer' viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M7.41 1.42L5.99 0L2.82 3.17L1.41 1.75L0 3.16L2.82 6L7.41 1.42Z" fill="#285D9A" />
                                                    </svg>
                                                    :
                                                    <svg
                                                        onClick={() => {
                                                            setIsEdit(!isEdit);
                                                            setCurrentMaterial(index);
                                                        }}
                                                        className='mr-4 cursor-pointer' width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M0 14.25V18H3.75L14.81 6.94L11.06 3.19L0 14.25ZM2.92 16H2V15.08L11.06 6.02L11.98 6.94L2.92 16ZM17.71 2.63L15.37 0.29C15.17 0.09 14.92 0 14.66 0C14.4 0 14.15 0.1 13.96 0.29L12.13 2.12L15.88 5.87L17.71 4.04C18.1 3.65 18.1 3.02 17.71 2.63Z" fill="#285D9A" />
                                                    </svg>}
                                                {(isEdit && currentMaterial === index) ? <svg
                                                    onClick={() => { setIsEdit(false) }}
                                                    className='mr-4 cursor-pointer'
                                                    viewBox="0 0 1000 1000" width="19" height="18" fill="none" xmlns="http://www.w3.org/2000/svg" ><path d="M960 780.736 691.008 512 960 243.264 780.736 64 512 332.864 243.136 64 64 243.264 332.736 512 64 780.736 243.136 960 512 691.136 780.736 960z" fill="#285D9A" /></svg> :
                                                    <svg
                                                        onClick={() => {
                                                            deleteMaterial(index);
                                                        }}
                                                        className='mr-4 cursor-pointer' width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M9.12 7.47L7 9.59L4.87 7.47L3.46 8.88L5.59 11L3.47 13.12L4.88 14.53L7 12.41L9.12 14.53L10.53 13.12L8.41 11L10.53 8.88L9.12 7.47ZM10.5 1L9.5 0H4.5L3.5 1H0V3H14V1H10.5ZM1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM3 6H11V16H3V6Z" fill="#285D9A" />
                                                    </svg>}

                                            </div>
                                        </div>
                                    )
                                })
                                :
                                props.trainingMaterials?.map((material, index) => {
                                    return (
                                        <div className='flex justify-between' key={index}>
                                            {(isEditCreate && currentEditCreate === index) ?

                                                <input type={'text'} className='border-black border-[2px] py-[2px] ml-4 px-2  rounded-lg '
                                                    name='unitTitle'
                                                    defaultValue={material.name}
                                                    onChange={(e) => {
                                                        setNewNameCreate(e.target.value);
                                                    }} /> :
                                                <a className='ml-4 text-[#0C4DA2] underline w-1/2 truncate whitespace-normal' href={material.data}>{material.name}</a>
                                            }
                                            <div className='flex items-center'>
                                                <span className='mr-4 text-[#323232] italic font-thin'>by {props.currentUser.fullName} on {material.uploadDate}</span>
                                                {(isEditCreate && currentEditCreate === index) ?
                                                    <svg
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            updateCreateMaterialName(newNameCreate, index);
                                                        }}
                                                        width="19" height="18" className='mr-4 cursor-pointer' viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M7.41 1.42L5.99 0L2.82 3.17L1.41 1.75L0 3.16L2.82 6L7.41 1.42Z" fill="#285D9A" />
                                                    </svg>
                                                    :
                                                    <svg
                                                        onClick={() => {
                                                            setCurrentEditCreate(index);
                                                            setIsEditCreate(!isEditCreate);
                                                        }}
                                                        className='mr-4 cursor-pointer' width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M0 14.25V18H3.75L14.81 6.94L11.06 3.19L0 14.25ZM2.92 16H2V15.08L11.06 6.02L11.98 6.94L2.92 16ZM17.71 2.63L15.37 0.29C15.17 0.09 14.92 0 14.66 0C14.4 0 14.15 0.1 13.96 0.29L12.13 2.12L15.88 5.87L17.71 4.04C18.1 3.65 18.1 3.02 17.71 2.63Z" fill="#285D9A" />
                                                    </svg>
                                                }
                                                {(isEditCreate && currentEditCreate === index)
                                                    ?
                                                    <svg
                                                        onClick={() => { setIsEditCreate(false) }}
                                                        className='mr-4 cursor-pointer'
                                                        viewBox="0 0 1000 1000" width="19" height="18" fill="none" xmlns="http://www.w3.org/2000/svg" ><path d="M960 780.736 691.008 512 960 243.264 780.736 64 512 332.864 243.136 64 64 243.264 332.736 512 64 780.736 243.136 960 512 691.136 780.736 960z" fill="#285D9A" /></svg>
                                                    :
                                                    <svg
                                                        onClick={() => {
                                                            deleteMaterialCreate(index);
                                                        }}
                                                        className='mr-4 cursor-pointer' width="19" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M9.12 7.47L7 9.59L4.87 7.47L3.46 8.88L5.59 11L3.47 13.12L4.88 14.53L7 12.41L9.12 14.53L10.53 13.12L8.41 11L10.53 8.88L9.12 7.47ZM10.5 1L9.5 0H4.5L3.5 1H0V3H14V1H10.5ZM1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM3 6H11V16H3V6Z" fill="#285D9A" />
                                                    </svg>
                                                }

                                            </div>
                                        </div>
                                    )
                                })
                        }


                    </div>


                    <div className='flex justify-center mt-5'
                    >
                        <label htmlFor='file-input' className='bg-[#2D3748] text-white py-2 px-5 font-semibold rounded-xl cursor-pointer'>
                            Upload new
                        </label>
                        <input id='file-input' className='hidden' type='file' multiple={true} onChange={handleFileUpload} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadMaterial