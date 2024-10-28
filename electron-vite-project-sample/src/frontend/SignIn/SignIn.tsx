import React, { useState } from 'react';
import './SignIn.css';
import MSOfficeLogo from '../../assets/msoffice.png'
import ReactDOM from 'react-dom/client'
import ProfileSetUp from '../ProfileSetUp/ProfileSetUp.tsx'

const SignIn = () => {
  const [username, setUsername] = useState('Mon');
  const [password, setPassword] = useState('Mon');

  const handleSignIn = () => {
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <ProfileSetUp />
      </React.StrictMode>,
    );
  };

  return (
<div className='container-whole'>
    <div className="signin-container">
     
      <h1>CaseMaster</h1>
      
      <p className='p2'>Your go-to Legal Workflow Manager </p>
      <button onClick={handleSignIn} className='signin-button'>
        <img src={MSOfficeLogo}className='logo'/>
         Sign In With <strong>Microsoft</strong>   
    </button>
    </div>
    </div>
  );
};

export default SignIn; 
