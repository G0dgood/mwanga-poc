import React, { useState, useEffect } from "react";
import SideNavBar from "../../components/SideNavBar";
import Header from "../../components/Header";
import { Tab, Tabs, Toast } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserPassword,
  updateProfile,
  getUserProfileAction,
} from "../store/actions/userActions";
import {
  PROFILE_UPDATE_RESET,
  USER_UPDATE_PASSWORD_RESET,
} from "../store/constants/userConstants";
import axios from "axios";
import { baseUrl } from "../../shared/baseUrl";

const UserSettings = ({ history }) => {
  // --- Get current state of collapseNav from localStorage --- //
  const [collapseNav, setCollapseNav] = useState(() => {
    return JSON.parse(localStorage.getItem("collapse")) || false;
  });

  const user = JSON.parse(localStorage.getItem("userDetails"));

  const userProfile = useSelector((state) => state.userProfile);
  const { user: data } = userProfile;

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstname, setFirstName] = useState(user?.firstname);
  const [lastname, setLastName] = useState(user?.lastname);
  const [aboutMe, setAboutMe] = useState(user?.aboutMe);

  const [profilePic, setProfilePic] = useState("");
  const [previewImgLoading, setPreviewImgLoading] = useState(false);
  const [imgLocalURL, setImgLocalURL] = useState(null);

  const [resetPassMsg, setResetPassMsg] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [showPasswordToast, setShowPasswordToast] = useState(false);
  const [showProfileToast, setShowProfileToast] = useState(false);
  const [showPassErrorToast, setShowPassErrorToast] = useState(false);

  const dispatch = useDispatch();

  const userUpdatePassword = useSelector((state) => state.userUpdatePassword);
  const { error, success: successChange, loading } = userUpdatePassword;

  const profileUpdate = useSelector((state) => state.profileUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = profileUpdate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    // --- Set state of collapseNav to localStorage on pageLoad --- //
    localStorage.setItem("collapse", JSON.stringify(collapseNav));

    if (userInfo) {
      dispatch(getUserProfileAction());
    } else {
      history.push("/");
    }
  }, [dispatch, history, userInfo, collapseNav, successUpdate]);

  useEffect(() => {
    if (successChange) {
      setShowPasswordToast(true);
      dispatch({
        type: USER_UPDATE_PASSWORD_RESET,
      });
    }
    if (successUpdate) {
      setShowProfileToast(true);
      dispatch({
        type: PROFILE_UPDATE_RESET,
      });
    }
    if (error === "Password Incorrect") {
      setShowPassErrorToast(true);
      dispatch({
        type: USER_UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, successChange, successUpdate, error]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setResetPassMsg("Passwords do not match");
      setShowToast(true) && setShowToast(false);
    } else {
      dispatch(
        updateUserPassword({
          currentPassword,
          newPassword,
        })
      );
    }
  };

  const toggleSideNav = () => {
    setCollapseNav(!collapseNav);
  };

  const profilesubmitHandler = (e) => {
    e.preventDefault();
    //Create Profile Actions
    dispatch(updateProfile(firstname, lastname, aboutMe, profilePic));
  };

  const onChange = (e) => {
    const file = e.target.files[0];
    setImgLocalURL(URL?.createObjectURL(e.target.files[0]));
    const formData = new FormData();
    formData.append("image", file);
    const postImg = async () => {
      try {
        setPreviewImgLoading(true);
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.post(
          baseUrl + "/api/v1/imageupload",
          formData,
          config
        );
        setProfilePic(data.IMAGE);
        setPreviewImgLoading(false);
      } catch (error) {
        console.error(error.message);
        setPreviewImgLoading(false);
      }
    };
    postImg();
  };
  const [resetLOB, setResetLOB] = useState(false);
  return (
    <div id="screen-wrapper">
      <SideNavBar />
      <Header
        toggleSideNav={toggleSideNav}
        setResetLOB={setResetLOB}
        resetLOB={resetLOB}
      />
      <main>
        <div className="page-title">
          <h5>User Settings</h5>
        </div>
        {showProfileToast && (
          <Toast
            className="success-toast"
            onClose={() => setShowProfileToast(false)}
            show={showProfileToast}
            delay={6000}
            autohide>
            <Toast.Body>
              <span>
                <i className="fas fa-exclamation-circle" />
              </span>
              <p>Profile updated successfuly!</p>
              <span onClick={() => setShowProfileToast(false)}>
                <i className="fas fa-times" />
              </span>
            </Toast.Body>
          </Toast>
        )}

        {showPasswordToast && (
          <Toast
            className="success-toast"
            onClose={() => setShowPasswordToast(false)}
            show={showPasswordToast}
            delay={6000}
            autohide>
            <Toast.Body>
              <span>
                <i className="fas fa-exclamation-circle" />
              </span>
              <p>Password updated successfuly!</p>
              <span onClick={() => setShowPasswordToast(false)}>
                <i className="fas fa-times" />
              </span>
            </Toast.Body>
          </Toast>
        )}
        {resetPassMsg && (
          <Toast
            onClose={() => setShowToast(false)}
            show={showToast}
            delay={10000}
            autohide>
            <Toast.Body>
              <span>
                <i className="fas fa-exclamation-circle" />
              </span>
              <p>{resetPassMsg}</p>
              <span onClick={() => setShowToast(false)}>
                <i className="fas fa-times" />
              </span>
            </Toast.Body>
          </Toast>
        )}
        {showPassErrorToast && (
          <Toast
            onClose={() => setShowPassErrorToast(false)}
            show={showToast}
            delay={20000}
            autohide>
            <Toast.Body>
              <span>
                <i className="fas fa-exclamation-circle" />
              </span>
              <p>Password Incorrect</p>
              <span onClick={() => setShowPassErrorToast(false)}>
                <i className="fas fa-times" />
              </span>
            </Toast.Body>
          </Toast>
        )}
        {errorUpdate && (
          <Toast
            onClose={() => setShowToast(false)}
            show={showToast}
            delay={10000}
            autohide>
            <Toast.Body>
              <span>
                <i className="fas fa-exclamation-circle" />
              </span>
              <p>{errorUpdate}</p>
              <span onClick={() => setShowToast(false)}>
                <i className="fas fa-times" />
              </span>
            </Toast.Body>
          </Toast>
        )}
        <div className="user-settings">
          <div className="user-settings-display">
            <div className="user-display-first">
              <div className="preview img-container">
                {!data?.user?.profilePic ? (
                  <i className="fas fa-user fa-5x" />
                ) : (
                  <img
                    src={`${baseUrl}/${data?.user?.profilePic}`}
                    alt="Profile Pic"
                  />
                )}
              </div>
              <div>
                <p>
                  {data?.user?.firstname} {data?.user?.lastname}
                </p>
                <p>{data?.user?.email}</p>
                <p>{data?.user?.contactNo}</p>
              </div>
            </div>
            <div className="user-display-second">
              <p>User ID</p>
              <p>{data?.user?.userId}</p>
              <p>Role</p>
              <p>{data?.user?.role?.roleName}</p>
              <p>Supervisor</p>
              <p>
                {data?.user?.reportsTo?.firstname}{" "}
                {data?.user?.reportsTo?.lastname}
              </p>
              <p>L.O.B</p>
              <p>{data?.user?.lob}</p>
              <p>About</p>
              <p>{data?.user?.aboutMe}</p>
            </div>
          </div>

          <div className="user-settings-edit">
            <Tabs
              justify
              defaultActiveKey="personal-info"
              id="uncontrolled-tab-example"
              className="user-settings-tab">
              <Tab
                eventKey="personal-info"
                tabClassName="active-tab"
                title="Personal Info">
                <form onSubmit={profilesubmitHandler}>
                  <div className="form-ctrl">
                    <label>First Name</label>
                    <input
                      type="text"
                      placeholder="Enter your last name"
                      value={firstname}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="form-ctrl">
                    <label>Last Name</label>
                    <input
                      type="text"
                      placeholder="Enter your last name"
                      value={lastname}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <div className="form-ctrl">
                    <label>About Me</label>
                    <input
                      type="text"
                      placeholder="Enter your last name"
                      value={aboutMe}
                      onChange={(e) => setAboutMe(e.target.value)}
                    />
                  </div>
                  <button
                    className="password"
                    disabled={loadingUpdate && true}
                    onClick={() => setShowToast(true)}
                    type="submit">
                    {loadingUpdate ? "Updating..." : "Update"}
                  </button>
                </form>
              </Tab>

              <Tab
                eventKey="change-avatar"
                tabClassName="active-tab"
                title="Change Avatar">
                <form className="change-avatar" onSubmit={profilesubmitHandler}>
                  {imgLocalURL === null ? (
                    <div className="form-ctrl preview-icon">
                      <i className="fas fa-user fa-5x" />
                    </div>
                  ) : (
                    <div className="form-ctrl preview img-container">
                      <img
                        src={imgLocalURL}
                        alt="Profile Pic"
                        className={previewImgLoading && "dark-img-loading"}
                      />
                    </div>
                  )}
                  <div className="file-input-wrap">
                    <input
                      type="file"
                      accept="image/*"
                      className="custom-file-input"
                      disabled={(loadingUpdate || previewImgLoading) && true}
                      onChange={onChange}
                    />
                  </div>
                  {imgLocalURL !== null && (
                    <input
                      type="submit"
                      disabled={(loadingUpdate || previewImgLoading) && true}
                      value={
                        loadingUpdate || previewImgLoading
                          ? "Please wait..."
                          : "Upload Image"
                      }
                      onClick={() => setShowToast(true)}
                    />
                  )}
                </form>
              </Tab>

              <Tab
                eventKey="reset-password"
                tabClassName="active-tab"
                title="Reset Password">
                <form onSubmit={submitHandler}>
                  <div className="form-ctrl">
                    <label>Old Password</label>
                    <input
                      type="password"
                      placeholder="Enter your current password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-ctrl">
                    <label>New Password</label>
                    <input
                      type="password"
                      placeholder="Enter your new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-ctrl">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      placeholder="Re-enter your new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button
                    className="password"
                    disabled={loading && true}
                    onClick={() => setShowToast(true)}
                    type="submit"
                    value="Update">
                    {loading ? "Updating..." : "Update"}
                  </button>
                </form>
              </Tab>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};
export default UserSettings;
