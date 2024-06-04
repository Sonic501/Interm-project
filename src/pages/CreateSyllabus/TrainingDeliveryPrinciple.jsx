import { React, useState, useRef } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TrainingDeliveryPrinciple = (props) => {
  const { setMarkingDes, setOtherDes, setTrainingDes, setReTestDes, setWaiverCriteriaDes
    , trainingDes, reTestDes, markingDes, waiverCriteriaDes, otherDes
  } = props;
  const handleTrainingChange = (html) => {
    setTrainingDes({ trainingDes: html, name: "trainingDes" });
  };
  const handleReTestChange = (html) => {
    setReTestDes({ reTestDes: html, name: "reTestDes" });

  };
  const handleWaiverChange = (html) => {
    setWaiverCriteriaDes({ waiverCriteriaDes: html, name: "waiverCriteriaDes" });

  };

  const handleMarkingChange = (html) => {
    setMarkingDes({ markingDes: html, name: "markingDes" });

  };
  const handleOtherTestChange = (html) => {
    setOtherDes({ otherDes: html, name: "otherDes" });

  };




  const quillModules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' },
      { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ]
  };

  const quillFormats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  const editorStyle = {
    height: '100px',
    width: '740px',

  };

  return (
    <div className='mt-5 pl-7 pb-2 border-b-2 border-r-2 w-[905px] shadow-lg'>
      <div className='  text-center w-[855px] text-white rounded-t-xl  font-bold py-1' style={{ backgroundColor: "#2D3748" }}>Training delivery principle</div>
      <div className='flex items-center shadow-2xl w-[857px] rounded-b-md'>
        <div className='flex flex-col'>
          <div className='flex items-center justify-between my-10'>
            <div className='font-medium mr-10 pl-2'>Training</div> 
            <ReactQuill
              value={trainingDes.trainingDes}
              onChange={handleTrainingChange}
              modules={quillModules}
              formats={quillFormats}
              placeholder="Enter your text here..."
              style={editorStyle}
            />
          </div>

          <div className='flex items-center  my-10'>
            <div className='font-medium  mr-12 pl-2'>Re-test</div>

            <ReactQuill
              value={reTestDes.reTestDes}
              onChange={handleReTestChange}
              modules={quillModules}
              formats={quillFormats}
              placeholder="Enter your text here..."
              style={editorStyle}
            />
          </div>
          <div className='flex items-center  my-10'>
            <div className='font-medium pl-2  mr-10'>Marking</div>

            <ReactQuill
              value={markingDes.markingDes}
              onChange={handleMarkingChange}
              modules={quillModules}
              formats={quillFormats}
              placeholder="Enter your text here..."
              style={editorStyle}
            />
          </div>
          <div className='flex items-center  my-10'>
            <div className='font-medium  pl-2 mr-12'>Waiver</div>

            <ReactQuill
              value={waiverCriteriaDes.waiverCriteriaDes}
              onChange={handleWaiverChange}
              modules={quillModules}
              formats={quillFormats}
              placeholder="Enter your text here..."
              style={editorStyle}
            />
           
          </div>
          <div className='flex items-center  my-10'>
              <div className='font-medium  pl-2 mr-14'>Other</div>

              <ReactQuill
                value={otherDes.otherDes}
                onChange={handleOtherTestChange}
                modules={quillModules}
                formats={quillFormats}
                placeholder="Enter your text here..."
                style={editorStyle}
              />
            </div>
        </div>
        
      </div>
      
    </div>


  )

}
export default TrainingDeliveryPrinciple;