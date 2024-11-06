import React, { useRef, useState } from 'react';
import './EnterPIN.css';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

interface ProfileModalProps {
  profile: { id: number; name: string; role: string; image: string; email: string; phone: string; };
  onClose: () => void;
}

const EnterPIN: React.FC<ProfileModalProps> = ({ profile, onClose }) => {
  const navigate = useNavigate();
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const [pinValues, setPinValues] = useState(['', '', '', '']);
  const [showPin, setShowPin] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentView, setCurrentView] = useState<'enter' | 'forgot' | 'confirm' | 'new-password-section' | 'success'>('enter');
  const [recoveryMethod, setRecoveryMethod] = useState<'email' | 'sms'>('email');

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
        onClose();
        navigate('/choose-profile'); 
      } else {
        setErrorMessage('Incorrect PIN. Please try again.');
        setPinValues(['', '', '', '']);
        inputRefs.forEach(ref => {
          if (ref.current) {
            ref.current.value = ''; 
          }
        });
      }
    }
  };

  const toggleVisibility = () => {
    setShowPin((prevShowPin) => !prevShowPin);
  };

  const openForgotPin = () => {
    setCurrentView('forgot');
  };

  const goToConfirm = () => {
    setCurrentView('confirm');
  };


  const goToNewPassword = () => {
    setCurrentView('new-password-section');
  };

  const goToSuccess = () => {
    setCurrentView('success');
  };

  const goToProfiles = () => {
    onClose();
    navigate('/choose-profile'); 
  };


  const handleRecoveryMethodChange = (method: 'email' | 'sms') => {
    setRecoveryMethod(method);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}><CloseIcon /></button>
        

        {currentView === 'forgot' ? (
          <div className="forgot-pin-section">
            <div className="profile-modal-icon" style={{ backgroundImage: `url(${profile.image})` }}></div>
            <p className='staff-name'>{profile.name}</p>
            <h2>Forgot your PIN?</h2>
            <p className='secondary-text'>Choose how you want to recover your account.</p>
            <div className="radio-group">
              <label>
                <input type='radio' name='sendCode' value='email' checked= {recoveryMethod === 'email'} onChange={()=> handleRecoveryMethodChange('email')}/>
                  Send code via email <strong>{profile.email}</strong>
              </label>
              <label>
                <input type='radio' name='sendCode' value='sms' checked= {recoveryMethod === 'sms'} onChange={()=> handleRecoveryMethodChange('sms')}/>
                  Send code through text <strong>{profile.phone}</strong>
              </label>
              </div>
              <div className='confirm-button-div'>
              <button onClick={goToConfirm} className='button3'>Continue</button> 
              </div>
          </div>
        ) : currentView === 'confirm' ? (
          <div className="confirm-pin-section">
            <h2>Enter security code</h2>
            {recoveryMethod === 'email' ? (
              <p>Please check your email (<strong>{profile.email}</strong>)</p>
            ) : (
              <p>Please check your SMS (<strong>{profile.phone}</strong>)</p>
            )}
            <p>for a message with your code.</p>
            <p>Your code is 6 numbers long.</p>
            <div className="get-code">
              <input type='tel' className='recovery-code-input'></input>
            </div>
            <div className='resend-code-div'>
              <p>Didn't get code? <strong className='resend-code'>Resend Code</strong></p>
            </div>
            <div className='confirm-button-div'>
            <button onClick={goToNewPassword} className='button3'>Continue</button>
            </div>
          </div>
        ) : currentView === 'new-password-section' ? (
          <div className="confirm-pin-section">
            <h2>Set a New PIN</h2>
            <p>Avoid using easy to guess PIN such as 1234, 1111</p>
            <p>or your birthdate.</p>
            <div className="code-input-field">
              <div>
                  <label htmlFor='new-password' className='label-left'>New PIN</label>
                  <input type='password' className='new-password' name='new-pass' id='new-password'></input>
              </div>
              <div>
                  <label htmlFor='retype-new-password' className='label-left'>Verify New PIN</label>
                  <input type='password' className='retype-password' name='retype-pass' id='retype-new-password'></input>
              </div>
            </div>
            <div className='confirm-button-div'>
            <button onClick={goToSuccess} className='button3'>Submit</button>
            </div>
          </div>
        ) : currentView === 'success' ? (
          <div className="confirm-pin-section">
            <ThumbUpOffAltIcon style={{fontSize:'60px'}} className='like-icon'></ThumbUpOffAltIcon>
            <h2>Success!</h2>
            <p>Your profile PIN has been</p>
            <p>successfully changed.</p>
            <div className="code-input-field">
              
            </div>
            <div className='confirm-button-div'>
            <button onClick={goToProfiles} className='go-back-to-profile-button'>Go back to Profile</button>
            </div>
          </div>
        ) : (
          <div className="enter-pin-section">
            <h2>Hey there!</h2>
            <p className='secondary-text'>Enter PIN to access this account!</p>
            <div className="CodeTextfields">
              {inputRefs.map((ref, index) => (
                <input
                  key={index}
                  ref={ref}
                  type={showPin ? "password" : "tel"}
                  maxLength={1}
                  className={`PINTextfield ${pinValues[index] ? 'filled' : ''}`}
                  onChange={(e) => handleInputChange(e, index)}
                />
              ))}
              <button onClick={toggleVisibility} className="visibilityToggle">
                {showPin ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
              </button>
            </div>
            <p>Forgot PIN? <strong onClick={openForgotPin} className='show-forgotPIN'>Click here for help</strong></p>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnterPIN;
