import React from 'react';
import { Outlet } from 'react-router';

const Profile = () => {
  return (
    <div className="profile-page">
      <Outlet />
    </div>
  );
};

export default Profile;
