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
import { fetchUserData } from "../../../../../app/features/User/userSlice";
import ManageFollowers from "./ManageFollowers";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [newEmail, setNewEmail] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [newUsername, setNewUsername] = useState(null);
  const [manageFollowersVisible, setManageFollowersVisible] = useState(false);

  const user = useSelector((state) => state.userData.value.user);
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
        dispatch(fetchUserData());
        dispatch(setUserProfileSavedModal(true));
      });
  }

  return (
    <div className="h-full w-full flex items-center bg-neutral-800 justify-center relative ">
      {manageFollowersVisible && (
        <ManageFollowers
          setManageFollowersVisible={setManageFollowersVisible}
        />
      )}
      {profileSavedModal && <StoreSavedModal />}
      <form
        className="lg:w-[50%] w-full h-full fl2"
        onSubmit={handleProfileChanges}
      >
        <div className="h-[30%] w-full flex justify-center items-center p-2">
          <label className="h-full w-[40%] md:w-[30%] mt-4">
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
                  className="h-full w-full object-cover rounded-full cursor-pointer mt-2 shadow-xl"
                />
              </>
            )}
          </label>
        </div>
        <div className="h-[30%] w-full fl2  mt-2 lg:mt-0 ">
          <h1 className="text-neutral-600">
            You can change your account information here
          </h1>
          <input
            type="text"
            placeholder="New Email"
            className="h-[20%] w-[80%] md:w-[65%] bg-neutral-900 mt-1 rounded-md p-2 text-neutral-400"
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="New Username"
            className="h-[20%] w-[80%] md:w-[65%] bg-neutral-900 mt-1 rounded-md p-2 text-neutral-400"
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="New Password"
            className="h-[20%] w-[80%] md:w-[65%] bg-neutral-900 mt-1 rounded-md p-2 text-neutral-400"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            className="h-[20%] bg-neutral-700 w-[70%] md:w-[65%] rounded-md text-neutral-200 mt-1 hover:bg-orange-500 hover:text-white"
            onClick={(e) => {
              e.preventDefault();
              setManageFollowersVisible(true);
            }}
          >
            Manage followers/followings
          </button>
        </div>

        <div className="w-full h-[20%] flex justify-center mt-6">
          <button className="bg-orange-500 h-[35%] w-[50%] text-white rounded-md hover:w-[65%] transition-all  ">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
