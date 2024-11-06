import React, { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EnterPIN from './EnterPIN.tsx'; 
import './ChooseProfile.css';
import ProfileIcon from '../../assets/kapebara.jpg';
import { useNavigate } from 'react-router-dom';

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
    { id: 1, name: 'Mon', role: 'Admin', image: ProfileIcon, email:'Mon@gmail.com', phone:'+639159015884'},
    { id: 2, name: 'Gwyneth', role: 'CEO', image: ProfileIcon, email:'gwy@gmail.com', phone:'+639090909090'},
    { id: 3, name: 'Ceejay', role: 'Staff', image: ProfileIcon, email:'cj@gmail.com', phone:'+639090909090'},
  ]);

  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  const handleBack = () => {
    navigate('/');
  };

  const clickProfile = (profile: Profile) => {
    setSelectedProfile(profile);
  };

  const closeModal = () => {
    setSelectedProfile(null);
  };

  return (
    <div>
        <div className='backButton-container'>
          <button className='backButton' onClick={handleBack}>
            <ArrowBackIcon />
          </button>
          <p>Back</p>
        </div>
      <div className={`profile-container ${selectedProfile ? 'blurred' : ''}`}>
        

        <div>
          <h2>Select your profile</h2>
          <p className='prompt'>Select a profile to use then enter your PIN</p>

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
          </div>
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
