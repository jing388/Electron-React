import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './frontend/SignIn/SignIn.tsx';
import ProfileSetUp from './frontend/ProfileSetUp/ProfileSetUp.tsx';
import ChooseProfile from './frontend/ProfileSetUp/ChooseProfile.tsx';
import SetUpPIN from './frontend/ProfileSetUp/SetUpPIN.tsx';
import AddExistingProfile from './frontend/ProfileSetUp/AddExistingProfile.tsx';
import LoginExistingProfile from './frontend/ProfileSetUp/LoginExistingProfile.tsx';
import ExistingProfilePIN from './frontend/ProfileSetUp/ExistingProfilePIN.tsx';
import TwoStepVerification from './frontend/ProfileSetUp/TwoStepVerification.tsx';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} /> 
        <Route path="/profile-setup" element={<ProfileSetUp />} />
        <Route path='/choose-profile' element={<ChooseProfile/>}/>
        <Route path='/set-up-pin' element={<SetUpPIN/>}/>
        <Route path='/add-existing-profile' element={<AddExistingProfile/>}/>
        <Route path='/login-existing-profile' element={<LoginExistingProfile/>}/>
        <Route path='/existing-profile-pin' element={<ExistingProfilePIN/>}/>
        <Route path='/two-step-verification' element={<TwoStepVerification/>}/>
        {/*dito pwede mag add ng ibang links ng ibang file*/ }
      </Routes>
    </Router>
  );
};

export default AppRouter;
