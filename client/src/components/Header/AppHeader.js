import React from 'react';
import Header from './Header';
import PatientHeader from './PatientHeader'; 
import DoctorHeader from './DoctorHeader';
import AuthService from '../../utils/auth';

function AppHeader() {
  const isLoggedIn = AuthService.loggedIn();

  const role = AuthService.getRole()
  console.log("Successful rending for ", role);
  // Conditional rendering based on the user's login state
  return isLoggedIn ? ( role === 'patient' ? <PatientHeader /> : <DoctorHeader />) : <Header />;

  const handleLogout = () => {
    AuthService.logout(); 
    window.location.reload();
  };
}

export default AppHeader;