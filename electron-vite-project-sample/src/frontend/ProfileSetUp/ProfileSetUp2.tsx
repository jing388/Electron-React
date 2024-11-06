import React, { useRef, useState} from 'react';
import './ProfileSetUp2.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

const ProfileSetUp = () => {

  const navigate = useNavigate();
  const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];
  const [pinValues, setPinValues] = useState(['','','','']);   
  const [showPin, setShowPin] = useState(true);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index:number) =>{
        const {value} = e.target;
        const newPinValues = [...pinValues];
        

        if(/^\d$/.test(value)){
            
            newPinValues[index] = value;
            

           if (index < inputRefs.length -1){
            inputRefs[index + 1].current?.focus();
           }
        } else {
            newPinValues[index]='';
        }
        setPinValues(newPinValues);     
        };

    const toggleVisibility = () => {
        setShowPin((prevShowPin) => !prevShowPin);
    }

  const handleBack = () => {
   navigate('/profile-setup');
  };

    const showProfiles = () =>{
      navigate('/profiles');
    };

  return (
<div className='container-whole2'>
      <div className='backButton-container'>
        <button className='backButton' onClick={handleBack}>
          <ArrowBackIcon></ArrowBackIcon>
         </button>
         <p>Back</p>
      </div>

    <div className="signin-container2">
     <div>
        <div className='numberThree'>
          <div className='circleNumber'>3</div>
          <h2>Set your PIN code</h2>
          <p className='text2'>Make sure it's easy to remember!</p>
        </div>

          <div className='CodeTextfields'>
            {inputRefs.map((ref, index) =>
             <input key = {index} ref = {ref} type={showPin? "password" : "tel"} maxLength= {1} className={`PINTextfield ${pinValues[index]? 'filled' :''}`} onChange={(e) => handleInputChange(e, index)}/>
            )}

            <button onClick={toggleVisibility} className='visibilityToggle'>
              {showPin ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
            </button>
          </div> 
          <div className='confirm-button-container'>
          <button className='confirmButton' onClick={showProfiles}>Confirm</button>
          </div>
          
        </div>


     </div>
    </div>

  );
};

export default ProfileSetUp; 
