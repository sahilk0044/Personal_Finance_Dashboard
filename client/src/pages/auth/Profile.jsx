import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../../components/layout/MainLayout";

import toast from "react-hot-toast";

import {
  getProfile,
  updateProfile,
  updatePassword,
} from "../../services/profileService";

const Profile = () => {

  const [loading,
    setLoading] =
    useState(true);

  const [profile,
    setProfile] =
    useState(null);

  const [formData,
    setFormData] =
    useState({
      name: "",
      avatar: "",
    });

  const [passwordData,
    setPasswordData] =
    useState({
      currentPassword: "",
      newPassword: "",
    });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile =
    async () => {
      try {

        const data =
          await getProfile();

        setProfile(
          data.user
        );

        setFormData({
          name:
            data.user.name,
          avatar:
            data.user.avatar,
        });

      } catch (error) {

        toast.error(
          "Failed to load profile"
        );

      } finally {
        setLoading(false);
      }
    };

  const handleProfileChange =
    (e) => {
      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value,
      });
    };

  const handlePasswordChange =
    (e) => {
      setPasswordData({
        ...passwordData,
        [e.target.name]:
          e.target.value,
      });
    };

  const saveProfile =
    async (e) => {
      e.preventDefault();

      try {

        await updateProfile(
          formData
        );

        toast.success(
          "Profile updated"
        );

        fetchProfile();

      } catch (error) {

        toast.error(
          "Failed to update profile"
        );

      }
    };

  const changePassword =
    async (e) => {

      e.preventDefault();

      try {

        await updatePassword(
          passwordData
        );

        toast.success(
          "Password updated"
        );

        setPasswordData({
          currentPassword: "",
          newPassword: "",
        });

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message ||
          "Failed to update password"
        );

      }
    };

  if (loading) {
    return (
      <MainLayout>
        Loading...
      </MainLayout>
    );
  }

  return (
  <MainLayout>

    <div className="max-w-7xl mx-auto">

      {/* Profile Header */}

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 mb-8">

        <div className="flex flex-col md:flex-row items-center gap-6">

          <img
            src={
              formData.avatar ||
              `https://ui-avatars.com/api/?name=${profile.name}&background=4f46e5&color=fff`
            }
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-indigo-100"
          />

          <div className="text-center md:text-left">

            <h1 className="text-3xl font-bold text-slate-800">
              {profile.name}
            </h1>

            <p className="text-slate-500 mt-1">
              {profile.email}
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">

              <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                {profile.role}
              </span>

              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                Active Account
              </span>

            </div>

          </div>

        </div>

      </div>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Edit Profile */}

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">

          <h2 className="text-2xl font-bold mb-6">
            Personal Information
          </h2>

          <form
            onSubmit={saveProfile}
            className="space-y-5"
          >

            <div>

              <label className="block text-sm font-medium text-slate-700 mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleProfileChange}
                className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              />

            </div>

            <div>

              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                value={profile.email}
                disabled
                className="w-full border border-slate-200 bg-slate-100 rounded-xl p-3 cursor-not-allowed"
              />

            </div>

            <div>

              <label className="block text-sm font-medium text-slate-700 mb-2">
                Avatar URL
              </label>

              <input
                type="text"
                name="avatar"
                value={formData.avatar}
                onChange={handleProfileChange}
                placeholder="https://..."
                className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              />

            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition"
            >
              Save Changes
            </button>

          </form>

        </div>

        {/* Change Password */}

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">

          <h2 className="text-2xl font-bold mb-6">
            Security Settings
          </h2>

          <form
            onSubmit={changePassword}
            className="space-y-5"
          >

            <div>

              <label className="block text-sm font-medium text-slate-700 mb-2">
                Current Password
              </label>

              <input
                type="password"
                name="currentPassword"
                value={
                  passwordData.currentPassword
                }
                onChange={
                  handlePasswordChange
                }
                className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-red-500 outline-none"
              />

            </div>

            <div>

              <label className="block text-sm font-medium text-slate-700 mb-2">
                New Password
              </label>

              <input
                type="password"
                name="newPassword"
                value={
                  passwordData.newPassword
                }
                onChange={
                  handlePasswordChange
                }
                className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-red-500 outline-none"
              />

            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition"
            >
              Change Password
            </button>

          </form>

        </div>

      </div>

      {/* Account Information */}

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 mt-8">

        <h2 className="text-2xl font-bold mb-6">
          Account Information
        </h2>

        <div className="grid sm:grid-cols-2 gap-6">

          <div>

            <p className="text-slate-500 text-sm">
              Account Role
            </p>

            <p className="font-semibold text-lg mt-1">
              {profile.role}
            </p>

          </div>

          <div>

            <p className="text-slate-500 text-sm">
              Member Since
            </p>

            <p className="font-semibold text-lg mt-1">
              {new Date(
                profile.createdAt
              ).toLocaleDateString()}
            </p>

          </div>

          <div>

            <p className="text-slate-500 text-sm">
              Last Login
            </p>

            <p className="font-semibold text-lg mt-1">
              {profile.lastLogin
                ? new Date(
                    profile.lastLogin
                  ).toLocaleString()
                : "Never"}
            </p>

          </div>

          <div>

            <p className="text-slate-500 text-sm">
              Account Status
            </p>

            <p className="font-semibold text-green-600 text-lg mt-1">
              Active
            </p>

          </div>

        </div>

      </div>

    </div>

  </MainLayout>
);
};

export default Profile;