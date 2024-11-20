import React, { useRef, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './ProfileSetUpCSS/AddExistingProfile.css';
import { useNavigate } from 'react-router-dom';


const ChooseProfile = () => {
const navigate = useNavigate();
const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const [pinValues, setPinValues] = useState(['', '', '', '']);
  const [showPin] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorBorder, setErrorBorder] = useState(false);

  const temporaryPin = ['1', '2', '3', '4'];


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    const newPinValues = [...pinValues];

    if (/^\d$/.test(value)) {
      newPinValues[index] = value;

      if (index < inputRefs.length - 1) {
        inputRefs[index + 1].current?.focus();
      }
    } else {
      newPinValues[index] = '';
    }
    setPinValues(newPinValues);

    if (index === 3) {
      if (newPinValues.every((value, i) => value === temporaryPin[i])) {
        navigate('/two-step-verification'); 
      } else {
        setErrorMessage('Incorrect PIN. Please try again.');
        setErrorBorder(true);
        setPinValues(['', '', '', '']);

        inputRefs.forEach(ref => {
          if (ref.current) {
            ref.current.value = ''; 
          }
        });

        setTimeout(() => {
          setErrorBorder(false);
          setErrorMessage('');
        }, 500);

      }
      inputRefs[index].current?.blur(); 
    }
  };


const handleBack = () => {
  navigate('/');
}

  return (
    <div>
       <div className="backButton-container">
        <button className="backButton" onClick={handleBack}>
          <ArrowBackIcon />
        </button>
        <p>Back</p>
      </div>
      <div className='add-existing-profile-container'>
        <div className='profile-icon'></div>
        <p className='profile-name'>Atty. Richard Tobusa</p>
        <h1 className='header'>Enter your PIN</h1>
        <div>
        <div className="CodeTextfields">
              {inputRefs.map((ref, index) => (
                <input
                  key={index}
                  ref={ref}
                  type={showPin ? "password" : "tel"}
                  maxLength={1}
                  className={`PINTextfield ${pinValues[index] ? 'filled' : ''} ${errorMessage ? 'error' : ''}`}
                  onChange={(e) => handleInputChange(e, index)}
                />
              ))}
            </div>
            <p>Forgot PIN? <strong className='forgot-pin'>Click here for help</strong></p>
        </div>
      </div>
      
    </div>
  );
};

export default ChooseProfile;
