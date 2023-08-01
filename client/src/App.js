import Login from './components/Login';
import Signup from './components/Signup'; 
import ContactForm from './components/Contact';
import React from "react";
import AppHeader from "./components/Header/AppHeader";
import AboutUs from "./components/AboutUs";
import Home from "./components/Home/Home";
import Services from "./components/Services";
import Billing from "./components/Billing";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient,InMemoryCache,ApolloProvider,createHttpLink} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

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
    <>
      <ApolloProvider client={client}>
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
            
          </Routes>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;