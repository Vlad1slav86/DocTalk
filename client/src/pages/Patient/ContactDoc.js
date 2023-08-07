import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import Auth from "../../utils/auth";
import { ADD_MESSAGE } from "../../utils/mutations";
import { useMutation } from '@apollo/client';
// import { DOC_CB } from '../utils/mutations';

export default function ContactDoctor() {
  const [formState, setFormState] = useState({ firstName: '', lastName: '', phonenumber: '', email: '', message: ''});
  // const [name, setName] = useState("");
  // const [phonenumber, setPhoneNumber] = useState("");
  // const [email, setEmail] = useState("");
  // const [message, setMessage] = useState("");

  const [addMessage] = useMutation(ADD_MESSAGE);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    console.log(formState);
  };
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const {data} = await addMessage({
      variables: {
        messageData:{...formState, patient: Auth.getProfile().data._id }
      },
    });
    console.log(data);

  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <img
        src="/images/hero.jpg"
        alt="contact"
        style={{ width: '100%', maxWidth: '800px', height: 'auto', marginBottom: '20px' }}
      />
      <Box sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
        <Typography variant="h4" align="center" mb={2}>
          Doctor Callback
        </Typography>

        <Box component="form" onSubmit={handleFormSubmit} noValidate sx={{ mt: 1 }}>
        {/* <form onSubmit={handleSubmit}> */}

          <TextField
            fullWidth
            label="First Name"
            value={formState.firstName}
            name="firstName"
            // onChange={(e) => setName(e.target.value)}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Last Name"
            value={formState.lastName}
            name="lastName"
            // onChange={(e) => setName(e.target.value)}
            onChange={handleChange}
            margin="normal"
            required
          />          
          <TextField
            fullWidth
            label="Phone Number"
            value={formState.phonenumber}
            name="phonenumber"
            // onChange={(e) => setPhoneNumber(e.target.value)}
            onChange={handleChange}
            margin="normal"
            required
            type="string"
          />
          <TextField
            fullWidth
            label="Email"
            value={formState.email}
            name="email"
            // onChange={(e) => setEmail(e.target.value)}
            onChange={handleChange}
            margin="normal"
            required
            type="string"
          />                   
          <TextField
            fullWidth
            label="Message"
            value={formState.message}
            name="message"
            onChange={handleChange}
            // onChange={(e) => setMessage(e.target.value)}
            margin="normal"
            required
            multiline
            rows={4}
          />
          <Button variant="contained" type="submit"  sx={{ mt: 2 }}>
            Submit
          </Button>
        {/* </form> */}
        </Box>
      </Box>
    </Box>
  );
}