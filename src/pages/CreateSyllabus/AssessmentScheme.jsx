import { React, useState } from 'react'


const AssessmentScheme = (props) => {
  const { newObj, setQuiz, setAssignment, setFinal, setFinalTheory, setFinalPractice, setGPA
  } = props;


  const quizChangeHandler = (event) => {
    setQuiz(event.target.value);
  }
  const assignmentChangeHandler = (event) => {
    setAssignment(event.target.value);
  }
  const finalChangeHandler = (event) => {
    setFinal(event.target.value);
  }
  const finalTheoryChangeHandler = (event) => {
    setFinalTheory(event.target.value);
  }
  const finalPracticeChangeHandler = (event) => {
    setFinalPractice(event.target.value);
  }
  const gpaChangeHandler = (event) => {
    setGPA(event.target.value);
  }

  return (

    <>

      <div className='text-center text-white rounded-t-xl font-bold py-1' style={{ backgroundColor: "#2D3748" }}>
        Assessment scheme</div>
        <div className='absolute text-slate-200 rotate-90 left-2/4 ml-[227px] mt-[110px]'>________________________________________________________</div>  
      <div className='pt-2 pb-4 px-4'>
        <div className='flex flex-col gap-y-4 border-b-2 border-solid border-gray-400 pb-4'>
          <div className='flex w-36 justify-between items-center'>
            <label htmlFor="quiz">Quiz* </label>
            <input className='rounded-lg border-black border-2 px-2 py-0.5 w-12 h-7 text-sm'
              type="text" id="quiz" name="quiz" onChange={quizChangeHandler} />
          </div>
          <div className='flex w-36 justify-between items-center '>
            <label htmlFor="quiz">Assignment* </label>
            <input className='rounded-lg border-black border-2 px-2 py-0.5 w-12 text-sm  h-7'
              type="text"
              id="assignment"
              name="assignment"
              onChange={assignmentChangeHandler} />
          </div>
          <div className='flex w-36 justify-between items-center'>
            <label htmlFor="final">Final* </label>
            <input className='rounded-lg border-black border-2 px-2 py-0.5 w-12  text-sm h-7'
              type="text" id="final" name="final" onChange={finalChangeHandler} />
          </div>
        </div>
      </div>


      <div className='pb-4 px-4'>
        <div className='flex justify-between border-b-2 border-solid border-gray-400 pb-4'>
          <div className='flex justify-between items-center' style={{ fontSize: "14px" }}>
            <div className=' flex'>
              <label htmlFor="finalTheory">Final Theory*</label>
              <input className='rounded-lg border-black border-2 px-2 py-0.5 text-sm w-12 h-7 ml-4'
                type="text" id="finalTheory" name="finalTheory" onChange={finalTheoryChangeHandler} />
            </div>

            <div className='ml-16'>
              <label htmlFor="finalPractice">Final Practice*</label>
              <input className='rounded-lg border-black border-2 px-2 py-0.5 text-sm w-12 h-7 ml-4'
                type="text" id="finalPractice" name="finalPractice" onChange={finalPracticeChangeHandler} />
            </div>
          </div>
        </div>
        <div className='font-bold mt-2'>
          Passing criteria
        </div>
        <div className='flex w-36 justify-between items-center mt-2'>
          <label htmlFor="gpa">GPA*</label>
          <input className='rounded-lg border-black border-2 px-2 py-0.5 w-12 h-7 text-sm'
            type="text" id="gpa" name="gpa" onChange={gpaChangeHandler} />
        </div>


      </div>

    </>
  )
}
export default AssessmentScheme
