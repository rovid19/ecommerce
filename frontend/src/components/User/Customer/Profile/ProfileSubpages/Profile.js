import React from "react";
import { useState, useEffect } from "react";
import Img from "../../../../../assets/user.png";
import Loader from "../../../../../assets/svg-loaders/three-dots.svg";
import axios from "axios";
import StoreSavedModal from "../../../Dashboard/StoreEdit/Modals/StoreSavedModal";
import { useDispatch, useSelector } from "react-redux";
import { switchValue } from "../../../../../app/features/getUserTrigger";
import { setUserProfileSavedModal } from "../../../../../app/features/User/profileSavedModal.js";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [newEmail, setNewEmail] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [newUsername, setNewUsername] = useState(null);

  const user = useSelector((state) => state.user.value);
  const getUserTrigger = useSelector((state) => state.getUserTrigger.value);
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;
  const profileSavedModal = useSelector(
    (state) => state.profileSavedModal.value
  );
  const dispatch = useDispatch();

  function handlePhotoUpload(e) {
    setIsLoading(true);
    const file = e.target.files;
    const formData = new FormData();
    formData.append("photo", file[0]);
    console.log(file[0]);

    axios
      .post("/api/store/upload-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(({ data }) => {
        setProfilePhoto(data);
        setIsLoading(false);
      });
  }

  function handleProfileChanges(e) {
    e.preventDefault();
    axios
      .post("/api/customer/save-profile-changes", {
        profilePhoto: profilePhoto ? profilePhoto : "",
        newEmail: newEmail ? newEmail : "",
        newPassword: newPassword ? newPassword : "",
        newUsername: newUsername ? newUsername : "",
      })
      .then(() => {
        dispatch(switchValue(!getUserTrigger));
        dispatch(setUserProfileSavedModal(true));
      });
  }

  useEffect(() => {
    if (user._id === id) {
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div className="h-full w-full flex items-center justify-center">
      {profileSavedModal && <StoreSavedModal />}
      <form className="w-[50%] h-full fl2" onSubmit={handleProfileChanges}>
        <div className="h-[30%] w-full flex justify-center items-center p-2">
          <label className="h-full w-[30%] mt-4">
            {isLoading ? (
              <img
                src={Loader}
                className="h-full w-full object-cover rounded-full cursor-pointer"
              />
            ) : (
              <>
                <input
                  type="file"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
                <img
                  src={
                    profilePhoto
                      ? profilePhoto
                      : user.profilePicture
                      ? user.profilePicture
                      : Img
                  }
                  className="h-full w-full object-cover rounded-full cursor-pointer mt-2"
                />
              </>
            )}
          </label>
        </div>
        <div className="h-[30%] w-full fl2    ">
          <h1 className="text-gray-300">Enter new account information.</h1>
          <input
            type="text"
            placeholder="New Email"
            className="h-[20%] w-[65%] bg-gray-100 mt-1 rounded-md p-2"
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="New Username"
            className="h-[20%] w-[65%] bg-gray-100 mt-1 rounded-md p-2"
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="New Password"
            className="h-[20%] w-[65%] bg-gray-100 mt-1 rounded-md p-2"
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="w-full h-[20%] flex justify-center ">
          <button className="bg-orange-500 h-[35%] w-[50%] text-white rounded-md hover:w-[65%] transition-all ">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
