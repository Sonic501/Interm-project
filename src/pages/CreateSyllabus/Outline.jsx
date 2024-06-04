import './CreateSyllabus.css';

import { AlertDay, UploadMaterial, AlertLearningHours, OutlineCreate, OutlineAllocation} from './ComponentOutline';
const Outline = (props) => {
    const {newObj, day, setDay, unit, setUnit, unitDetail, trainingMaterial, deliveryType,
        outputStandard, allocationData, setAllocationData
    } = props;
   
    

    return (
        <>
            <div className=' '>
                <div className='grid grid-cols-6'>
                        <OutlineCreate 
                        newObj={newObj}
                         day={day}
                         setDay={setDay}
                         unit={unit}
                         setUnit={setUnit}
                         unitDetail={unitDetail}
                         trainingMaterial={trainingMaterial}
                         deliveryType={deliveryType}
                         outputStandard={outputStandard}/>

                    <div className='ml-20 col-span-2 w-3/5'>
                        <OutlineAllocation 
                        deliveryType={deliveryType}
                        day={day}
                        />
                    </div>
                </div>

            </div >
           
        </>
    )
}

export default Outline