import React, { useRef, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './ProfileSetUpCSS/TwoStepVerification.css';
import { useNavigate } from 'react-router-dom';


const ChooseProfile = () => {
    const [currentView, setCurrentView] = useState<'email' | 'phone'>('email');
    const navigate = useNavigate(); 
  
    const handleSwitchView = () => {
      setCurrentView((prevView) => (prevView === 'email' ? 'phone' : 'email'));
    };
  
    const handleContinue = () => {
    
    
    };

    const handleBack = () => {
        navigate('/profile-setup');
    }
  
    return (
      <div >
        <div>
        <div className="backButton-container">
        <button className="backButton" onClick={handleBack}>
          <ArrowBackIcon />
        </button>
             <p>Back</p>
         </div>
          <div className='verification-titleholder-container'>
            <h2 className='verification-title'>
                2-Step Verification
            </h2>
          </div>
          {currentView === 'phone' ? (
            <div className='verification-container-container'>
              <div className='secondary-text-container'>
                <p className='secondary-text'>A SMS with 6 digit verification code </p>
                <p className='secondary-text'>was just sent to <strong>(0909090909)</strong></p>
              </div>
              <input type='text' className='input-verification-code'></input>
              <div className='verification-method-container'>
                <div className='verification-method'>
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
              <div className='secondary-text-container'>
                <p className='secondary-text'>An email with 6 digit verification code </p>
                <p className='secondary-text'>was just sent to <strong>(******@gmail.com)</strong></p>
              </div>
              <input type='text' className='input-verification-code'></input>
              <div className='verification-method-container'>
                <div className='verification-method'>
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

export default ChooseProfile;
