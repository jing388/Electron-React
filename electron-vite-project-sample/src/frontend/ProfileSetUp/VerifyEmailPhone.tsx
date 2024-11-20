import React, { useState } from 'react';
import './ProfileSetUpCSS/EnterPIN.css';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom'; 

interface ProfileModalProps {
  onClose: () => void;
}

const VerifyEmailPhone: React.FC<ProfileModalProps> = ({ onClose }) => {
  const [currentView, setCurrentView] = useState<'email' | 'phone'>('email');
  const navigate = useNavigate(); 

  const handleSwitchView = () => {
    setCurrentView((prevView) => (prevView === 'email' ? 'phone' : 'email'));
  };

  const handleContinue = () => {
  
    navigate('/set-up-pin');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          <CloseIcon />
        </button>
        <div className='verification-title-container'>
          <h2 className='verification-title'>
            {currentView === 'email' ? 'Verify your email' : 'Verify your phone'}
          </h2>
        </div>
        {currentView === 'phone' ? (
          <div className='verification-container-container'>
            <div>
              <p className='secondary-text'>To Continue, please enter 4 digit code that has</p>
              <p className='secondary-text'>been sent to <strong>(0909090909)</strong></p>
            </div>
            <input type='text' className='input-verification-code'></input>
            <div className='verify-method-container'>
              <div className='verify-method'>
                <p>Resend Code</p>
                <p onClick={handleSwitchView} style={{ cursor: 'pointer', color: '#517FD3' }}>
                  Verify email instead
                </p>
              </div>
              <button className='continue-button' onClick={handleContinue}>Continue</button>
            </div>
          </div>
        ) : (
          <div className='verification-container-container'>
            <div>
              <p className='secondary-text'>To Continue, please enter 4 digit code that has</p>
              <p className='secondary-text'>been sent to <strong>(******@gmail.com)</strong></p>
            </div>
            <input type='text' className='input-verification-code'></input>
            <div className='verify-method-container'>
              <div className='verify-method'>
                <p>Resend Code</p>
                <p onClick={handleSwitchView} style={{ cursor: 'pointer', color: '#517FD3' }}>
                  Verify phone instead
                </p>
              </div>
              <button className='continue-button' onClick={handleContinue}>Continue</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPhone;
