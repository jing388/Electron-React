import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './frontend/SignIn/SignIn.tsx';
import ProfileSetUp from './frontend/ProfileSetUp/ProfileSetUp.tsx';
import ProfileSetUp2 from './frontend/ProfileSetUp/ProfileSetUp2.tsx';
import Profiles from './frontend/ProfileSetUp/Profiles.tsx';
import ChooseProfile from './frontend/ProfileSetUp/ChooseProfile.tsx';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} /> 
        <Route path="/profile-setup" element={<ProfileSetUp />} />
        <Route path="/profile-setup2" element={<ProfileSetUp2 />} />
        <Route path='/profiles' element={<Profiles/>} />
        <Route path='/choose-profile' element={<ChooseProfile/>}/>
        {/*dito pwede mag add ng ibang links ng ibang file*/ }
      </Routes>
    </Router>
  );
};

export default AppRouter;
