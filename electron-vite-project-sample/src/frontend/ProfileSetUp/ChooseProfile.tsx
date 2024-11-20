import React, { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EnterPIN from './EnterPIN.tsx'; 
import './ProfileSetUpCSS/ChooseProfile.css';
import ProfileIcon from '../../assets/kapebara.jpg';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

interface Profile {
    id: number;
    name: string;
    role: string;
    image: string;
    email: string;
    phone: string;
}

const ChooseProfile: React.FC = () => {
  const navigate = useNavigate();

  const [profiles] = useState<Profile[]>([
    { id: 1, name: 'Mon Rivamonte', role: 'Admin', image: ProfileIcon, email:'Mon@gmail.com', phone:'+639159015884'},
    { id: 2, name: 'Gwyneth Uy', role: 'CEO', image: ProfileIcon, email:'gwy@gmail.com', phone:'+639090909090'},
    { id: 3, name: 'Ceejay Juliane', role: 'Asawa ng May-ari', image: ProfileIcon, email:'cj@gmail.com', phone:'+639090909090'},
  ]);

  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [isSkipped, setIsSkipped] = useState(false);

  const handleBack = () => {
    navigate('/');
  };

  const clickProfile = (profile: Profile) => {
    setSelectedProfile(profile);
  };

  const closeModal = () => {
    setSelectedProfile(null);
  };

  const goToProfileSetUp = () => {
    navigate('/profile-setup');
  };

  const goToAddExistingProfile = () => {
    navigate('/add-existing-profile');
  };

  const handelSkipped =() =>{
    setIsSkipped(true);
  };

  const createAnotherProfile = () =>{
    navigate('/profile-setup');
  };

  return (
    <div>
        {!isSkipped && (
      <div className="backButton-container">
        <button className="backButton" onClick={handleBack}>
          <ArrowBackIcon />
        </button>
        <p>Back</p>
      </div>
    )}
      <div className={`profile-container ${selectedProfile ? 'blurred' : ''}`}>
        <div className='profile-card-wrapper'>
          <h2>{isSkipped? 'Select your Profile' : 'You are all Set!'}</h2>
          <p className='prompt'>{isSkipped? 'Select a profile to use then enter your PIN' : 'Do you want to create another profile for your staff?'}</p>

          <div className='profile-card-container'>
            {profiles.map(profile => (
              <div key={profile.id} className='choose-profile-card' onClick={() => clickProfile(profile)}>
                <div className='profile-icon' style={{ backgroundImage: `url(${profile.image})` }}></div>
                <div className='profile-info'>
                  <h4>{profile.name}</h4>
                  <p>{profile.role}</p>
                </div>
              </div>
            ))}
            <div className='add-profile-card'>
            <div className='add-icon' onClick={isSkipped? goToAddExistingProfile : goToProfileSetUp}>
              <AddIcon />
            </div>
          </div>
          </div>
          {!isSkipped ? (
            <div className='button-container'>
              <button className='button1' onClick={handelSkipped}>Skip for now</button>
              <button className='button2' onClick={createAnotherProfile}>Create Another</button>
            </div>
          ) : (
            <p className='logout-text'>Sign out Microsoft Account</p>
          )}

        </div>
       
      </div>
      

      {selectedProfile && (
        <div className="modal-overlay">
          <div className="modal-content">
            <EnterPIN profile={selectedProfile} onClose={closeModal} />
          </div>
        </div>
      )}
      
    </div>
  );
};

export default ChooseProfile;
