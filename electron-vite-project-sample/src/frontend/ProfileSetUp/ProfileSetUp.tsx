import React, { useState } from 'react';
import './ProfileSetUp.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const ProfileSetUp = () => {

  const navigate = useNavigate();
  
  const handleBack = () => {
   navigate('/');
  };

  return (
<div className='container-whole'>
      <div className='backButton-container'>
        <button className='backButton' onClick={handleBack}>
          <ArrowBackIcon></ArrowBackIcon>
         </button>
         <p>Back</p>
      </div>

    <div className="signin-container">
    
      <div className='profileSetUp'>
        <h1>Profile SetUp</h1>
        <p>Complete simple steps to get started</p>
     </div>

     <div>
        <div className='numberOne'>
          <div className='circleNumber'>1</div>
          <h4>Upload a profile picture</h4>
        </div>
        <div className='numberTwo'>
          <div className='imageHolder'>Attach Image</div>
            <div className='buttonGroup'>
               <button className='uploadImage'>Upload Image</button>
               <p>PNG or JPG files up to 5 mb</p>
               <p>Rcommended size is 256 x 256 px</p>
            </div> 
        </div>

        <div className='numberOne'>
          <div className='circleNumber'>2</div>
          <h4>Enter required information</h4>
        </div>
        <div className='numberTwo'>
          <div className='requiredInfo'>
            <label htmlFor="fullname">Full Name</label>
            <label htmlFor="email">Personal Email</label>
            <label htmlFor="phoneNo">Phone No</label>
          </div>
          <div className='infoTextfields'>
              <input type="text" id="fullName" name="fullname" className='informationTextfield'/>
              <input type="text" id="email" name="email" className='informationTextfield'/>
              <input type="text" id="phoneNo" name="phoneNo" placeholder="+63 |" className='informationTextfield'/>
          </div> 
        </div>

        <button className='nextButton'>Next</button>

     </div>
    </div>
    </div>
  );
};

export default ProfileSetUp; 
