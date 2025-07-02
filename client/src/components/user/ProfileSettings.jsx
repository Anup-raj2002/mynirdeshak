import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useUser } from "../../contexts/UserContext";
import { useUpdateProfile } from "../../queries/useUserQueries";
import { useNotification } from "../../contexts/NotificationContext";

export default function ProfileSettings() {
  const { profile, loading: loadingProfileData } = useUser();
  const updateProfileMutation = useUpdateProfile();
  const { showNotification } = useNotification();

  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    photo: null,
    dob: "",
    fatherName: "",
    motherName: "",
    altPhone: "",
  });
  const [photoPreview, setPhotoPreview] = useState(null);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        contactNumber: profile.contactNumber || "",
        photo: null,
        dob: profile.dob || "",
        fatherName: profile.fatherName || "",
        motherName: profile.motherName || "",
        altPhone: profile.altPhone || "",
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
    if (formData.name !== (profile?.name || "")) updatedData.name = formData.name;
    if (formData.contactNumber !== (profile?.contactNumber || "")) updatedData.contactNumber = formData.contactNumber;
    if (formData.photo) updatedData.photo = formData.photo;
    if (profile?.role === "student") {
      if (formData.dob !== (profile?.dob || "")) updatedData.dob = formData.dob;
      if (formData.fatherName !== (profile?.fatherName || "")) updatedData.fatherName = formData.fatherName;
      if (formData.motherName !== (profile?.motherName || "")) updatedData.motherName = formData.motherName;
      if (formData.altPhone !== (profile?.altPhone || "")) updatedData.altPhone = formData.altPhone;
    }
    if (Object.keys(updatedData).length === 0) {
      showNotification("No changes to save.", "info");
      return;
    }
    updateProfileMutation.mutate(updatedData);
  };

  if (loadingProfileData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-pink-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl font700 text-blue-600"
        >
          Loading profile data...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 px-4 py-8 flex items-center justify-center">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Large Icon (Left) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <div className="w-full h-full min-h-[300px] md:min-h-[400px] bg-white/90 rounded-2xl shadow-xl p-6 md:p-8 border border-blue-100 flex items-center justify-center">
            <motion.div
              animate={{
                y: [0, -10, 0],
                transition: { repeat: Infinity, duration: 2, ease: "easeInOut" }
              }}
            >
              <span className="text-8xl md:text-9xl">📜</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Edit Profile Form (Right) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <motion.form
            onSubmit={handleSubmit}
            className="w-full bg-white/90 rounded-2xl shadow-xl p-6 border border-blue-100 flex flex-col justify-between"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
            }}
            initial="hidden"
            animate="visible"
          >
            <motion.h2
              className="text-2xl font-bold text-gray-900 mb-4 text-center"
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            >
              Edit Profile
            </motion.h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-blue-700" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  disabled={updateProfileMutation.isPending}
                  className="w-full border border-blue-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 bg-white text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-blue-700" htmlFor="contactNumber">
                  Mobile Number
                </label>
                <input
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="Enter your mobile number"
                  type="tel"
                  disabled={updateProfileMutation.isPending}
                  className="w-full border border-blue-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 bg-white text-gray-700"
                />
              </div>
              {profile?.role === "student" && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-blue-700" htmlFor="dob">
                      Date of Birth
                    </label>
                    <input
                      id="dob"
                      name="dob"
                      type="date"
                      value={formData.dob}
                      onChange={handleChange}
                      placeholder="YYYY-MM-DD"
                      disabled={updateProfileMutation.isPending}
                      className="w-full border border-blue-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 bg-white text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-blue-700" htmlFor="fatherName">
                      Father's Name
                    </label>
                    <input
                      id="fatherName"
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleChange}
                      placeholder="Father's Name"
                      disabled={updateProfileMutation.isPending}
                      className="w-full border border-blue-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 bg-white text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-blue-700" htmlFor="motherName">
                      Mother's Name
                    </label>
                    <input
                      id="motherName"
                      name="motherName"
                      value={formData.motherName}
                      onChange={handleChange}
                      placeholder="Mother's Name"
                      disabled={updateProfileMutation.isPending}
                      className="w-full border border-blue-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 bg-white text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-blue-700" htmlFor="altPhone">
                      Alternative Mobile Number
                    </label>
                    <input
                      id="altPhone"
                      name="altPhone"
                      type="tel"
                      value={formData.altPhone}
                      onChange={handleChange}
                      placeholder="Alternative Mobile Number"
                      disabled={updateProfileMutation.isPending}
                      className="w-full border border-blue-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 bg-white text-gray-700"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="mt-6">
              <label className="block text-sm font700 mb-2 text-blue-700" htmlFor="photo-upload">
                Image Preview
              </label>
              <div className="w-40 h-32 bg-gradient-to-r from-blue-100 via-emerald-100 to-pink-100 flex items-center justify-center rounded-xl mb-4 border border-blue-100">
                {photoPreview ? (
                  <motion.img
                    src={photoPreview}
                    alt="Profile Preview"
                    className="w-full h-full object-cover rounded-xl"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                ) : (
                  <motion.span
                    className="text-gray-400 text-3xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    🖼️
                  </motion.span>
                )}
              </div>
              <input
                type="file"
                id="photo-upload"
                name="photo"
                accept="image/*"
                onChange={handleChange}
                className="block w-full border border-blue-200 rounded-lg px-4 py-3 bg-white text-gray-700"
                disabled={updateProfileMutation.isPending}
              />
            </div>

            <div className="mt-6 flex justify-end">
              <motion.button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg w-full md:w-auto font-semibold shadow-md transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                disabled={updateProfileMutation.isPending}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {updateProfileMutation.isPending ? "Saving Changes..." : "Save Changes"}
              </motion.button>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
}
