import React from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { Link } from 'react-router-dom';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Auth from '../utils/auth';
import Footer from './Footer';

export default function Login() {

  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER);

  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const { data } = await loginUser({
        variables: {
          email: formData.get("email"),
          password: formData.get("password"),
        },
      });
      try {
        const user = data.login.user;
        if (user.doctor === true || user.doctor === 'true') {
          Auth.setRole('doctor');
          // localStorage.setItem('user_type', 'doctor');
        } else if (user.patient === true || user.patient === 'true') {
          // localStorage.setItem('user_type', 'patient');
          Auth.setRole('patient');

        }
        else {
          // localStorage.setItem('user_type', null);
          Auth.setRole(null);

        }
      } catch (error) {
        Auth.setRole(null);
      }

      const token = data.login.token;
      console.log(token);
      Auth.login(token);

    } catch (error) {

      console.log('Login error:', error.message);
    }
  };

  return (
    <div>

      <Container component="main" maxWidth="xs">
        {data ? (
          <p>
            {/* Success! Redirecting{' '} */}
            <Link to="/">Home.</Link>
          </p>) :
          (<Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>)}
      </Container>
      <Footer />
    </div>
  );
}