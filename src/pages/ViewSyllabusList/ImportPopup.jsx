
import axios from 'axios';
import { useState } from 'react';
import 'animate.css';
import { useDispatch } from 'react-redux';
import { uploadSyllabus } from '../../redux/slices/viewSyllabus/syllabusSlice';
import { useSelector } from 'react-redux';

const ImportPopup = (props) => {

  const [message, setMessage] = useState({
    message: '',
    state: '',
  });

  const dispatch = useDispatch();

  const {token} = useSelector(state => state.auth)
  const [file , setFile] = useState({});

  const handleSyllabusCodeChange = () => {
        setSyllabusCodeChecked(!syllabusCodeChecked);
      };
    
  const handleSyllabusNameChange = () => {
        setSyllabusNameChecked(!syllabusNameChecked);
      };
    
  const [selectedRadio, setSelectedRadio] = useState('Allow');
    
  const handleRadioChange = (event) => {
        setSelectedRadio(event.target.value);
      }
      
  const [syllabusCodeChecked, setSyllabusCodeChecked] = useState(true);
  const [syllabusNameChecked, setSyllabusNameChecked] = useState(false);

  const handleDownloadTemplate = async () => {
    try {
      const response = await axios({
        url: 'https://f-m-c-v3.azurewebsites.net/api/syllabus/get-template-file',
        method: 'GET',
        responseType: 'arraybuffer',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'syllabus-format.csv');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      throw new Error(error.response.data);
    }
  };


  const readCSVFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        const contents = reader.result;
        resolve(contents);
      };
  
      reader.onerror = () => {
        reader.abort();
        reject(new Error('Unable to read file'));
      };
  
      const filenameParts = file.name.split('.');
      const fileExtension = filenameParts[filenameParts.length - 1].toLowerCase();
  
      if (fileExtension === 'csv' && file.type === 'text/csv') {
        reader.readAsText(file);
      } else {
        reject(new Error('File type not supported'));
      }
    });
  };
  
  const importCsv = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv';
  
    fileInput.onchange = (event) => {
      const file = event.target.files[0];
  
      readCSVFile(file)
        .then((contents) => {
          setMessage({ message: `Successfully imported data from file: ${file.name}`, state: true });
          setFile(contents);
        })
        .catch((error) => {
          setMessage({ message: `File not supported`, state: false });
        });
    };
  
    fileInput.click();
  };
  
  function handleUpload() {
    dispatch(
      uploadSyllabus({
        method: 'POST',
        url: 'https://f-m-c-v3.azurewebsites.net/api/syllabus/read-file',
        data: {
          file: file,
        },
      })
    );
  }
  
  

  return (
    <div> 
    <div className=' fixed h-screen w-screen bg-black bg-opacity-70 top-0 left-0 flex justify-center items-center z-30'>
    <div className='w-[38rem] absolute z-40 animate__bounceIn animate__animated animate__faster'>
      <div className='flex items-center justify-center font-bold rounded-t-[10px] bg-[#2D3748] text-white text-xl py-3'>Import Syllabus</div>
      <div className=' bg-white border rounded-b-[10px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]'>
        <div className='flex pt-4 ml-5 mr-5 border-b border-[#ACACAC]'>
          <div className='w-1/3 text-lg font-bold'>Import setting</div>
          <div className='w-2/3 text-lg'>
            <div className='flex mb-4'>
              <div className='w-44 text-[#1E1F20]'>File (csv) <span className='text-[#FD5656]'>*</span></div>
              <div 
                className='flex cursor-pointer items-center justify-center rounded-[5px] bg-[#2D3748] text-white px-6 py-[1.5px]'
                onClick={() => importCsv()}
              >Select</div>
            </div>
            <div className='flex mb-4'>
              <div className='w-44 text-[#1E1F20]'>Encoding type</div>
              <select className='border border-[#ACACAC] rounded-[5px] pl-2.5 py-1'>
                  <option>Auto detect</option>
                  <option>The second option</option>
              </select>
            </div>
            <div className='flex mb-4'>
              <div className='w-44 text-[#1E1F20]'>Column seperator</div>
              <select className='border border-[#ACACAC] rounded-[5px] pl-2.5 py-1'>
                  <option>Comma</option>
                  <option>The second option</option>
              </select>
            </div>
            <div className='flex mb-4'>
              <div className='w-44 text-[#1E1F20]'>Import template</div>
              <button className='text-[#285D9A] cursor-pointer underline underline-offset-4'
              onClick={() => handleDownloadTemplate()}>
                Download
                </button>
            </div>
          </div>
        </div>
        <div className='flex pt-4 border-b ml-5 mr-5 border-[#ACACAC]'>
          <div className='w-1/3 text-lg font-bold'>Duplicate control</div>
          <div className='w-2/3 text-lg'>
            <div className='flex mb-1'>
              <div className='w-44 text-[#1E1F20]'>Scanning</div>                            
            </div>
            <div className='flex items-center mb-2'>
              <div className="flex items-center mr-4">
                <input
                  checked={syllabusCodeChecked}
                  id="checkbox"
                  type="checkbox"
                  value=""
                  className="w-5 h-5 accent-[#2D3748]"
                  onChange={handleSyllabusCodeChange}
                />
                <label htmlFor="checkbox" className="ml-2">
                  Class code
                </label>
              </div>
              <div className="flex items-center mr-4">
                <input
                  checked={syllabusNameChecked}
                  id="checkbox1"
                  type="checkbox"
                  value=""
                  className="w-5 h-5 accent-[#2D3748]"
                  onChange={handleSyllabusNameChange}
                />
                <label htmlFor="checkbox1" className="ml-2">
                  Class name
                </label>
              </div>
            </div>
            <div className='flex mb-4'>
              <div className='w-44 text-[#1E1F20]'>Duplicate handle</div>
            </div>
            <div className='flex mb-4 gap-4'>
              <div class="flex items-center gap-2">
                <input type="radio" id="radio" value="Allow" checked={selectedRadio === 'Allow'} onChange={handleRadioChange} className='w-6 h-6 accent-[#2D3748]'/>
                <label for="radio" class="container">Allow</label>
              </div>
              <div class="flex items-center gap-2">
                <input type="radio" id="radio1" value="Replace" checked={selectedRadio === 'Replace'} onChange={handleRadioChange} className='w-6 h-6 accent-[#2D3748]'/>
                <label for="radio1" class="container">Replace</label>
              </div>
              <div class="flex items-center gap-2">
                <input type="radio" id="radio2" value="Skip" checked={selectedRadio === 'Skip'} onChange={handleRadioChange} className='w-6 h-6 accent-[#2D3748]'/>
                <label for="radio2" class="container">Skip</label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center w-full h-10 mt-3">
          {message.state === true && (
            <svg className="w-6 h-6 text-green-500 mr-2 animate__animated  animate__rubberBand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          )}
          {message.state === false && (
            <svg className="w-6 h-6 text-red-500 mr-2 animate__animated animate__headShake" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12" y2="16" />
            </svg>
          )}
          <div className={message.state === true ? "text-green-500 animate__animated  animate__rubberBand"  : 
          message.state === false ? "text-red-500 animate__animated animate__headShake" : ""}>{message.message}</div>
        </div>
        <div className='flex items-center justify-end gap-6 text-lg font-bold mt-5 mb-5 pr-5 bg-white'>
              <button className="text-[#E74A3B] underline underline-offset-4" onClick={props.handleClosePopupImport}>
                <p>Cancel</p>
              </button>
              <div 
                  className='flex cursor-pointer items-center justify-center font-bold rounded-[10px] bg-[#2D3748] text-white px-6 py-1.5'
                  onClick={() => handleUpload()}
                  >Import</div>
        </div>
      </div>
    </div>
  </div>
  </div>
  )

  }
export default ImportPopup