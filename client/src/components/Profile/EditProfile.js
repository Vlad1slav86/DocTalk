import React from "react";
import { gql, useMutation } from "@apollo/client";
import EditProfileForm from "./EditProfileForm";

const UPDATE_PROFILE = gql`
  mutation UpdateProfile($input: UserProfileInput!) {
    updateProfile(input: $input) {
      _id
      username
      email
      firstName
      lastName
      profileImage
    }
  }
`;

const ProfileEdit = () => {
  const [updateProfile] = useMutation(UPDATE_PROFILE);

  const handleSave = async (formData) => {
    try {
      const input = {
        username: formData.username,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        profileImage: formData.image,
      };

      const { data } = await updateProfile({ variables: { input } });
      console.log("Profile updated:", data.updateProfile);
      // Handle successful profile update
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Assume you have the 'user' data from your context or Apollo query
  const user = {
    _id: "user_id",
    username: "username",
    email: "email@example.com",
    firstName: "John",
    lastName: "Doe",
    profileImage: "/path/to/profile/image.jpg",
  };

  return (
    <EditProfileForm user={user} onSave={handleSave} />
  );
};

export default ProfileEdit;
