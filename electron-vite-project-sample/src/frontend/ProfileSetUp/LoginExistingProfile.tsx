import React, { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './ProfileSetUpCSS/AddExistingProfile.css';
import { useNavigate } from 'react-router-dom';


const ChooseProfile: React.FC = () => {
const navigate = useNavigate();
const handleBack = () => {
  navigate('/');
}

const continueButton = () => {
  navigate('/existing-profile-pin');
};


  return (
    <div>
       <div className="backButton-container">
        <button className="backButton" onClick={handleBack}>
          <ArrowBackIcon />
        </button>
        <p>Back</p>
      </div>
      <div className='add-existing-profile-container'>
        <h1>Log in to existing profile</h1>
        <p className='secondary-text-existing-profile'>Use your email or phone to log your profile</p>
        <input className='input-email-phone'/>
        <div className='existing-profile-action-container'>
          <p>Set up New Profile</p>
        <button className='continue-button' onClick={continueButton}>Continue</button>
        </div>
      </div>
      
    </div>
  );
};

export default ChooseProfile;
