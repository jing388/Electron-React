import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './frontend/SignIn/SignIn.tsx';
import ProfileSetUp from './frontend/ProfileSetUp/ProfileSetUp.tsx';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} /> 
        <Route path="/profile-setup" element={<ProfileSetUp />} />
        {/*dito pwede mag add ng ibang links ng ibang file*/ }
      </Routes>
    </Router>
  );
};

export default AppRouter;
