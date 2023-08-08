import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import Home from './components/Home/Home';
import AboutUs from './components/AboutUs';
import Login from './components/Login';
import Signup from './components/Signup';
import ContactForm from './components/Contact';
import AppHeader from './components/Header/AppHeader';
import Services from './components/Services';
import Billing from './components/Billing';
import ContactDoctor from './pages/Patient/ContactDoc';
import CallPatient from './pages/Doctor/CallPatient';
import ComposeEmail from './pages/Emails/ComposeEmail';
import EmailDashboard from './pages/Emails/EmailDashboard';
import EmailDetails from './pages/Emails/EmailDetails';
import EmailList from './pages/Emails/EmailList';
import PatientProfile from './pages/Patient/PatientProfile';
import BookAppointment from './pages/Patient/BookAppointment';
import Appointments from './pages/Patient/Appointments';
import Profile from './components/Profile/Profile';
import ContactPatientChat from './pages/Doctor/ContactPatientChat';
import MessagesPatient from './pages/Doctor/MessagesPatient';

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Router>
          <AppHeader />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/contactus" element={<ContactForm />} />
            <Route path="/services" element={<Services />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/contactdoctor" element={<ContactDoctor />} />
            <Route path="/compose" element={<ComposeEmail />} />
            <Route path="/email-dashboard" element={<EmailDashboard />} />
            <Route path='/emaillist' element={<EmailList />} />
            <Route path="/emaildetails" element={<EmailDetails />} />
            <Route path="/callpatient" element={<CallPatient />} />
            <Route path="/profile" element={<Profile />} />
            {/* <Route path="/contactpatientchat" element={<ContactPatientChat />} /> */}
            <Route path="/PatientProfile" element={<PatientProfile />} />
            <Route path="/BookAppointment" element={<BookAppointment />} />
            {/* <Route path="/FindDoctor" element={<FindDoctor />} /> */}
            <Route path="/Appointments" element={<Appointments />} />
            {/* <Route path="/DoctorProfile" element={<DoctorProfile />} /> */}
            <Route path="/" element={<ContactPatientChat />} />
            <Route path="/doctor-messages" element={<MessagesPatient />} />

          </Routes>
        </Router>
        </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;