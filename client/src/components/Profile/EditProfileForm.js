import React, { useState } from "react";
import {
  Box,
  Avatar,
  Button,
  Divider,
  TextField,
  IconButton,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

const EditProfileForm = ({ user, onSave }) => {
  const [formData, setFormData] = useState(user);
  const [imageFile, setImageFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const handleSave = async () => {
    try {
      if (!imageFile) {
        // If no new image selected, save only the form data
        onSave(formData);
      } else {
        // Prepare a FormData object to send both form data and image file
        const formDataWithImage = new FormData();
        formDataWithImage.append("image", imageFile);
        for (const key in formData) {
          formDataWithImage.append(key, formData[key]);
        }

        await onSave(formDataWithImage);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: '100%' }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: 400}}>
        <Avatar
          src={formData.profileImage}
          alt={formData.name}
          sx={{ width: 150, height: 150, my: 2 }}
        />
        <input
          accept="image/*"
          id="profile-image-input"
          type="file"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        <label htmlFor="profile-image-input">
          <IconButton color="primary" aria-label="upload profile picture" component="span">
            <PhotoCameraIcon />
          </IconButton>
        </label>
        <TextField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          sx={{ my: 2, width: "100%" }}
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          sx={{ my: 2, width: "100%" }}
        />
        <TextField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          sx={{ my: 2, width: "100%" }}
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          sx={{ my: 2, width: "100%" }}
        />
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
        <Divider sx={{ my: 2, width: "100%" }} />
      </Box>
    </Box>
  );
};

export default EditProfileForm;
