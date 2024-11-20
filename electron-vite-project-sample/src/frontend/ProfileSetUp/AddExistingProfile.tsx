import React, { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './ProfileSetUpCSS/AddExistingProfile.css';
import { useNavigate } from 'react-router-dom';
import { constants } from 'original-fs';


const ChooseProfile: React.FC = () => {
const navigate = useNavigate();

const handleBack = () => {
  navigate('/');
}
const loginExistingProfile = () => {
  navigate('/login-existing-profile');
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
        <h1>What would you like to do?</h1>
        <p className='p'>To continue, choose an option to either create a new one or</p>
        <p className='p'>log into an existing profile.</p>
        <div className='button-container'>
        <button className='new-profile-button'>Set up a New Profile</button>
        <button className='existing-profile-button' onClick={loginExistingProfile}>Add an Existing Profile</button>
        </div>
      </div>
      
    </div>
  );
};

export default ChooseProfile;
