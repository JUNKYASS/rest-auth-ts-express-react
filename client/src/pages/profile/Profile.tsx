import React, { useEffect } from 'react';

const Profile: React.FC = () => {
  const handleLogoutClick = () => {
    // fetch('/api/auth/logout') // to do
  };

  return (
    <div>
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
}

export default Profile;