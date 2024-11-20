import React, { useRef, useState } from 'react';
import './ProfileSetUpCSS/EnterPIN.css';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';

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
  const [currentView, setCurrentView] = useState<'default' | 'email' | 'phone' | 'forgot-pin-verification-method' | 'new-password-section' | 'email-method'| 'phone-method' | 'success'>('default');
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
        setCurrentView('email');
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
  const backtToProfile = () => {
    navigate('/choose-profile');
  }

  const handleForgotPinClick = () => {
    setCurrentView('forgot-pin-verification-method');
  };

  const handleNewPIN = () => {
    setCurrentView('new-password-section');
  };
  const handleSuccess= () => {
    setCurrentView('success');
  };

  const handleVerificationMethod = () => {
    const selectedMethod = document.querySelector('input[name="verification-method"]:checked')?.id;
    if (selectedMethod === 'email-verification') {
      setCurrentView('email-method');
    } else if (selectedMethod === 'phone-verification') {
      setCurrentView('phone-method');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
          {currentView !== 'success' && (
            <button className="close-button" onClick={onClose}>
               <CloseIcon />
           </button>
           )}
        {(currentView === 'default' || currentView === 'forgot-pin-verification-method') && (
          <div className='profile-name'>
            <div
              className="profile-modal-icon"
              style={{ backgroundImage: `url(${profile.image})` }}
            ></div>
            <p className='staff-name'>{profile.name}</p>
            {currentView === 'forgot-pin-verification-method' ? (
              <>
                <h2>Forgot your PIN?</h2>
                <p>Choose how you want to recover your account</p>
              </>
            ) : (
              <h2>Enter your PIN</h2>
            )}
          </div>
        )}

        {(currentView === 'email' || currentView === 'phone') ? (
          <div className="2-steps-verify">
            <div className="enter-pin-secondary-text-container">
              <h2>2-step verification</h2>
              <p className="secondary-text">
                {currentView === 'email' ? 'An email' : 'A SMS'} with a 6-digit verification code
              </p>
              <p className="secondary-text">
                was just sent to <strong>{currentView === 'email' ? '(******@gmail.com)' : '(0909090909)'}</strong>
              </p>
            </div>
            <input type="text" className="input-verification-code" />
            <div className="verification-method-container-container">
              <div className="verification-method">
                <p>Resend Code</p>
                <p
                  style={{ cursor: 'pointer', color: '#517FD3' }}
                  onClick={() => setCurrentView(currentView === 'email' ? 'phone' : 'email')}
                >
                  Verify {currentView === 'email' ? 'phone' : 'email'} instead
                </p>
              </div>
              <button className="continue-button">Continue</button>
            </div>
          </div>
        ) : (currentView === 'email-method' || currentView === 'phone-method') ? (
          <div className="2-steps-verify">
            <div className="enter-pin-secondary-text-container">
              <h2>2-step verification</h2>
              <p className="secondary-text">
                {currentView === 'email-method' ? 'An email' : 'A SMS'} with a 6-digit verification code
              </p>
              <p className="secondary-text">
                was just sent to <strong>{currentView === 'email-method' ? '(******@gmail.com)' : '(0909090909)'}</strong>
              </p>
            </div>
            <input type="text" className="input-verification-code" />
            <div className="verification-method-container-container">
              <div className="verification-method">
                <p>Resend Code</p>
                <p
                  style={{ cursor: 'pointer', color: '#517FD3' }}
                  onClick={() => setCurrentView(currentView === 'email-method' ? 'phone-method' : 'email-method')}
                >
                  Verify {currentView === 'email-method' ? 'phone' : 'email'} instead
                </p>
              </div>
              <button className="continue-button" onClick={handleNewPIN}>Continue</button>
            </div>
          </div>
        ) : currentView === 'forgot-pin-verification-method' ? (
          <div>
            <div className="verification-method-options"> 
              <div className="radio-button">
                <input
                  type="radio"
                  id="email-verification"
                  name="verification-method"
                />
                <label htmlFor="email-verification">Send code via email (******@gmail.com)</label>
              </div>

              <div className="radio-button">
                <input
                  type="radio"
                  id="phone-verification"
                  name="verification-method"
                />
                <label htmlFor="phone-verification">Send code via phone (0909090909)</label>
              </div>
              <button className='continue-button' onClick={handleVerificationMethod}>Confirm</button>
            </div>
          </div>
        ) : currentView === 'new-password-section' ? (
          <div className="confirm-pin-section">
            <div className='set-new-pin'>
            <h2>Set a New PIN</h2>
            <p>Avoid using easy to guess PIN such as 1234,</p>
            <p> 1111 or your birthdate.</p>
            </div>
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
            <div className='new-pin-section-button'>
            <button className='continue-button' onClick={handleSuccess}>Submit</button>
            </div>
          </div>
        ) : currentView === 'success' ? (
          <div className="success-pin-section">
            <GppGoodOutlinedIcon style={{ fontSize: '60px', marginTop:'40px'}}/>
            <div className='primary-text-success'>
            <h2 >Your PIN has been</h2>
            <h2>reset successfully!</h2>
            </div>
            <div className='secondary-text-success'>
            <p>PIN successfully changed</p>
            <p>Go back to Select Profile to sign in</p>
            </div>
            <button className='back-to-profile' onClick={backtToProfile}>Back to select profile</button>
          </div>
        ) : (
          <div className="enter-pin-section">
            <div className="CodeTextfields">
              {inputRefs.map((ref, index) => (
                <input
                  key={index}
                  ref={ref}
                  type={showPin ? 'password' : 'tel'}
                  maxLength={1}
                  className={`PINTextfield ${pinValues[index] ? 'filled' : ''} ${errorMessage ? 'error' : ''}`}
                  onChange={(e) => handleInputChange(e, index)}
                />
              ))}
            </div>
            <div className="resend-code">
              <p onClick={handleForgotPinClick}>
                Forgot PIN? <span style={{ color: ' #5e7e6f' }}>Click here</span>
              </p>
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnterPIN;
