import React, { useState, useRef } from 'react';
import './ProfileSetUpCSS/ProfileSetUp.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import gavelImage from '../../assets/pngtree-hammer-law-wooden-judge-gavel-hammer-and-base-3d-render-png-image_11588870.png';
import VerifyEmailPhone from './VerifyEmailPhone'; 

const ProfileSetUp = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false); 


  const handleUploadImage = () => {
    fileInputRef.current?.click();
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleNext = () => {
    // Show the modal instead of navigating to a new page
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={`container-whole ${isModalOpen ? 'blur-background' : ''}`}>
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
            <div className='imageHolder' style={{backgroundImage: `url(${gavelImage})`}}></div>
            <div className='buttonGroup'>
              <button className='uploadImage' onClick={handleUploadImage}>Upload Image</button>
              <button className='removeImage' onClick={handleUploadImage}>Remove</button>
              <p>PNG or JPG files up to 5 mb</p>
              <p>Recommended size is 256 x 256 px</p>
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

          <button className='nextButton' onClick={handleNext}>Next</button>
        </div>
      </div>

      {/* Render the modal if it's open */}
      {isModalOpen && (
        <VerifyEmailPhone
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ProfileSetUp;
