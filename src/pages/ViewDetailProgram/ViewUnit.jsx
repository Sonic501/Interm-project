import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OutlineAPI from './axiosConnection';
import TrainingMaterial from './TrainingMaterial';
function ViewUnit(props) {
  // console.log(props.id)
  const [unit, setUnit] = OutlineAPI(
    "https://f-m-c-v3.azurewebsites.net/api/unit/list-by-session/" + props.id
  );
  return (
    <div className='ml-8'>
      {unit.map((unit, index) =>
        <div key={index}>
          <Accordion sx={{ width: '1200px'}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className='border-2 rounded-xl border-blue-600 text-blue-600' />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
            </AccordionSummary>
            <AccordionDetails>
            <Typography className=" pl-3 font-bold">
                <span className='font-bold'>Unit {unit.unitNumber}</span>
                <span className='pl-16 text-xl font-bold'>{unit.unitTitle}</span><br/>
                <span className="text-sm italic pl-[118px] font-normal ">{unit.duration}hrs</span>
              </Typography>
            </AccordionDetails>
            <TrainingMaterial id={(unit.id)}/>      
          </Accordion>
        </div>
      )}
    </div>
  )
}

export default ViewUnit
