import React, { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { useUpdateProfile } from "../queries/useUserQueries";
import { useNotification } from "../contexts/NotificationContext";

export default function ProfileSettings() {
  const { profile, loading: loadingProfileData } = useUser();
  const updateProfileMutation = useUpdateProfile();
  const { showNotification } = useNotification();

  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    photo: null,
  });

  const [photoPreview, setPhotoPreview] = useState(null);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        contactNumber: profile.contactNumber || "",
        photo: null,
      });
      setPhotoPreview(profile.photoUrl ? profile.photoUrl : null);
    }
  }, [profile]);

  useEffect(() => {
    if (formData.photo instanceof File) {
      setPhotoPreview(URL.createObjectURL(formData.photo));
    } else if (profile?.photoUrl) {
      setPhotoPreview(profile.photoUrl);
    } else {
      setPhotoPreview(null);
    }
    return () => {
      if (photoPreview && photoPreview.startsWith("blob:")) {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, [formData.photo, profile?.photoUrl]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {};
    if (formData.name !== (profile?.name || ""))
      updatedData.name = formData.name;
    if (formData.contactNumber !== (profile?.contactNumber || ""))
      updatedData.contactNumber = formData.contactNumber;
    if (formData.photo) updatedData.photo = formData.photo;

    if (Object.keys(updatedData).length === 0) {
      showNotification("No changes to save.", "info");
      return;
    }

    updateProfileMutation.mutate(updatedData);
  };

  if (loadingProfileData) {
    return <div>Loading profile data...</div>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 bg-white rounded-xl shadow p-6 mb-6 w-full"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            className="w-full border rounded px-3 py-2"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            disabled={updateProfileMutation.isPending}
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="contactNumber"
          >
            Mobile Number
          </label>
          <input
            id="contactNumber"
            className="w-full border rounded px-3 py-2"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="Enter your mobile number"
            type="tel"
            disabled={updateProfileMutation.isPending}
          />
        </div>
      </div>

      <label
        className="block text-sm font-medium mb-2"
        htmlFor="photo-upload"
      >
        Image Preview
      </label>
      <div className="w-48 h-32 bg-gray-100 flex items-center justify-center rounded mb-4">
        {photoPreview ? (
          <img
            src={photoPreview}
            alt="Profile Preview"
            className="w-full h-full object-cover rounded"
          />
        ) : (
          <span className="text-gray-400 text-3xl">🖼️</span>
        )}
      </div>
      <input
        type="file"
        id="photo-upload"
        name="photo"
        accept="image/*"
        onChange={handleChange}
        className="border rounded px-3 py-2"
        disabled={updateProfileMutation.isPending}
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-8 py-2 rounded w-full sm:w-auto float-right"
        disabled={updateProfileMutation.isPending}
      >
        {updateProfileMutation.isPending ? "Saving Changes..." : "Save Changes"}
      </button>
    </form>
  );
}