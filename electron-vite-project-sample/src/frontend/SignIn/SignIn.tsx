import React, { useState } from 'react';
import './SignIn.css';
import MSOfficeLogo from '../../assets/msoffice.png'
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';

import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/profile-setup');
  };

  return (
<div className='container-whole'>
    <div className="signin-container">
      <BusinessCenterOutlinedIcon style={{fontSize:'60px'}}/>
      <p className='p1'>CaseMaster</p>
      <p className='p2'>Your go-to Legal Workflow Manager </p>
      <p className='p3'>Putting ease in all your legal workflow—all at one</p>
      <button onClick={handleSignIn} className='signin-button'>
        <img src={MSOfficeLogo}className='logo'/>
         Sign In With <strong>Microsoft</strong>   
    </button>
    </div>
    </div>
  );
};

export default SignIn; 
