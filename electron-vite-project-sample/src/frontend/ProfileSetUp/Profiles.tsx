import React, { useState } from 'react';
import './Profiles.css';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './ProfileSetUp.css';
import ProfileIcon from '../../assets/kapebara.jpg'
import { useNavigate } from 'react-router-dom';

const Profiles = () => {
 
    const navigate = useNavigate();

  const [profiles, setProfiles] = useState([
    { id: 1, name: 'Mon', role: 'Admin', image: ProfileIcon },
    {id: 2, name: 'Gwyneth', role:'CEO', image: ProfileIcon},
    {id: 3, name: 'Ceejay', role: 'Staff', image: ProfileIcon}
  ]);

  const [newName, setNewName] = useState('');
  const [newImage, setNewImage] = useState('');


  {/*const addProfile = () => {

    if (newName && newImage) {
      const newProfile = {
        id: profiles.length + 1,
        name: newName,
        role: 'Staff',
        image: newImage
      };
      setProfiles([...profiles, newProfile]);
      setNewName('');
      setNewImage('');
    } else {
     
    }
  };*/}

  const handleBack = () => {
    navigate('/');
  };

  const goToProfiles = () =>{
    navigate('/choose-profile');
  };

  return (
    <div className='profile-container'>
      <div className='backButton-container'>
        <button className='backButton' onClick={handleBack}>
          <ArrowBackIcon />
        </button>
        <p>Back</p>
      </div>

      <div>
        <h2>You're all set!</h2>
        <p className='prompt'>Do you want to create another profile for your staff?</p>

        <div className='profile-card-container'>
          {profiles.map(profile => (
            <div key={profile.id} className='profile-card'>
              <div className='profile-icon' style={{ backgroundImage: `url(${profile.image})` }}></div>
              <div className='profile-info'>
                <h4>{profile.name}</h4>
                <p>{profile.role}</p>
              </div>
            </div>
          ))}
          <div className='add-profile-card'>
            <div className='add-icon'>
              <AddIcon />
            </div>
          </div>
        </div>
        <div className='button-container'>
          <button className='button1' onClick={goToProfiles}>Skip for now</button>
          <button className='button2'>Create Another</button>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
