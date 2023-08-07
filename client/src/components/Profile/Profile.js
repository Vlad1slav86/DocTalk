import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Avatar,
  Button,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { gql, useQuery } from "@apollo/client";
import EditProfileForm from "./EditProfileForm";
import EditProfile from "./EditProfile.js";
import AuthService from "../../utils/auth";
// Hardcoded profile image URL
const hardcodedProfileImage = "/path/to/hardcoded/image.jpg";
export const QUERY_PROFILE_USER = gql`
  query getUserProfile {
    loggedInUser {
      _id
      username
      email
      firstName
      lastName
      patient
      doctor
    }
  }
`;

const Profile = () => {
  const [editOpen, setEditOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { loading, error, data } = useQuery(QUERY_PROFILE_USER, {
    context: {
      headers: {
        authorization: `Bearer ${AuthService.getToken()}`,
      },
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const profileUser = data.loggedInUser;

  const handleEditOpen = () => {
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleSave = (formData) => {
    setUser(formData);
    setEditOpen(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <Dialog open={editOpen} onClose={handleEditClose} maxWidth="xs">
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        {/* Pass profileUser to the EditProfileForm */}
        <EditProfileForm user={profileUser} onSave={handleSave} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEditClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>

    <Avatar src={profileUser.profileImage} alt={`${profileUser.firstName} ${profileUser.lastName}`} sx={{ width: 150, height: 150, my: 2 }} />
    <Typography variant="h4">{`${profileUser.firstName} ${profileUser.lastName}`}</Typography>
    <Typography variant="body1">{`Email: ${profileUser.email}`}</Typography>
    <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={handleEditOpen}>
      Edit Profile
    </Button>
    <Divider sx={{ my: 2, width: "100%" }} />
  </Box>
);
};

export default Profile;
