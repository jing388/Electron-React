import React, { useState, useRef } from 'react';
import './ProfileSetUpCSS/ProfileSetUp.css';
import './ProfileSetUpCSS/EnterPIN.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const ProfileSetUp = () => {
  const navigate = useNavigate();
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const [showPin, setShowPin] = useState(true);
  const [pinValues, setPinValues] = useState(['', '', '', '']);
  const [errorIndexes, setErrorIndexes] = useState<number[]>([]);
  const [currentView, setCurrentView] = useState<'set-pin' | 'confirm-pin'>('set-pin');
  const [setPin, setSetPin] = useState<string>('');

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
  };

  const handleConfirm = () => {
    if (currentView === 'set-pin') {
      const enteredPin = pinValues.join('');
      if (enteredPin.length === 4) {
        setSetPin(enteredPin);
        setPinValues(['', '', '', '']); 
        setCurrentView('confirm-pin'); 
      } else {
        setErrorIndexes([0, 1, 2, 3]);
        setTimeout(() => {
          setErrorIndexes([]); 
        }, 1000);
      }
    } else if (currentView === 'confirm-pin') {
      const enteredPin = pinValues.join('');
      if (enteredPin === setPin) {

        navigate('/choose-profile');
      } else {
        setErrorIndexes([0, 1, 2, 3]);
        setTimeout(() => {
          setErrorIndexes([]); 
        }, 1000);
        setPinValues(['', '', '', '']); 
      }
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="general-container">
      <div className="backButton-container">
        <button className="backButton" onClick={handleBack}>
          <ArrowBackIcon />
        </button>
        <p>Back</p>
      </div>

      <div className="numberOne">
        <div className="circleNumber">3</div>
      </div>

      <h1 className='h1'>{currentView === 'set-pin' ? 'Set your PIN Code' : 'Confirm your PIN Code'}</h1>
      <p className='p'>
        {currentView === 'set-pin'
          ? "Make sure it's easy to remember"
          : 'Please re-enter your PIN to continue'}
      </p>

      <div className="CodeTextfields">
        {inputRefs.map((ref, index) => (
          <input
            key={index}
            ref={ref}
            type={showPin ? 'password' : 'text'}
            maxLength={1}
            className={`PINTextfield ${errorIndexes.includes(index) ? 'error' : ''} ${pinValues[index] ? 'filled' : ''}`}
            onChange={(e) => handleInputChange(e, index)}
            value={pinValues[index]}
          />
        ))}
      </div>
      <button className="confirm-button" onClick={handleConfirm}>
        {currentView === 'set-pin' ? 'Confirm' : 'Confirm'}
      </button>
    </div>
  );
};

export default ProfileSetUp;
