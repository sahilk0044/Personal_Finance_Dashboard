import API from "./api";

export const getProfile = async () => {
  const { data } = await API.get(
    "/auth/profile"
  );

  return data;
};

export const updateProfile = async (
  profileData
) => {
  const { data } = await API.put(
    "/auth/profile",
    profileData
  );

  return data;
};

export const updatePassword = async (
  passwordData
) => {
  const { data } = await API.put(
    "/auth/change-password",
    passwordData
  );

  return data;
};