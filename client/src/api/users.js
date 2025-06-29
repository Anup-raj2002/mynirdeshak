import axiosInstance from "./axiosInstance";

export const getProfile = async () => {
  const response = await axiosInstance.get("/auth/profile");
  return response.data;
};

export const updateProfile = async (profileData) => {
  const formData = new FormData();
  if (profileData.name) formData.append("name", profileData.name);
  if (profileData.contactNumber) formData.append("contactNumber", profileData.contactNumber);
  if (profileData.photo) formData.append("photo", profileData.photo);
  const response = await axiosInstance.patch("/auth/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const addUser = async (userData) => {
  const response = await axiosInstance.post("/auth/users", userData);
  return response.data;
};

export const updateUser = async (userData) => {
  const response = await axiosInstance.patch("/auth/users", userData);
  return response.data;
};

export const deleteUser = async (profileUID) => {
  const response = await axiosInstance.delete("/auth/users", {
    data: { profileUID },
  });
  return response.data;
};

export const getUsers = async (params = {}) => {
  const response = await axiosInstance.get("/auth/users", { params });
  return response.data;
};