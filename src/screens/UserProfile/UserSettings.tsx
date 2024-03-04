import { useState, useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import axios from "axios";
import Header from "../../components/Header";
import SideNavBar from "../../components/SideNavBar";
import { useAppDispatch, useAppSelector } from "../../store/useStore";
import { baseUrl } from "../../shared/baseUrl";
import { reset, updatePassword, updateProfile, userprofile } from "../../features/Auth/authSlice";
import { toast } from 'react-toastify';
import { customId } from "../../components/TableOptions";
import { config } from "../../hooks/config";
import { FaUser } from "react-icons/fa";


const UserSettings = () => {
  // @ts-ignore  
  const user = JSON.parse(localStorage.getItem("mwanga"));
  const dispatch = useAppDispatch();
  const { userprofiledata } = useAppSelector((state: any) => state.auth);
  const { user: data } = userprofiledata;
  const { profileisLoading, profilemessage, profileisError, profileisSuccess } = useAppSelector((state: any) => state.auth);
  const { resetisLoading, resetmessage, resetisError, resetisSuccess } = useAppSelector((state: any) => state.auth);

  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [profilePic, setProfilePic] = useState("");
  const [previewImgLoading, setPreviewImgLoading] = useState(false);
  const [imgLocalURL, setImgLocalURL] = useState<string | null>(null);




  const [input, setInput] = useState<any>({
    firstname: "",
    lastname: "",
    currentPassword: "",
    newPassword: "",
    aboutMe: "",
    profilePic: "",
  })





  useEffect(() => {
    dispatch(userprofile());
  }, [dispatch]);
  useEffect(() => {
    setInput((prevState: any) => {
      return ({
        ...prevState,
        firstname: data?.firstname,
        lastname: data?.lastname,
        currentPassword: data?.currentPassword,
        newPassword: data?.newPassword,
        aboutMe: data?.aboutMe,
        profilePic: data?.profilePic,
      });
    });
  }, [data?.firstname, data?.lastname, data?.currentPassword, data?.newPassword, data?.profilePic, setInput, data?.aboutMe]);





  const handleOnChange = (input: any, value: any) => {
    setInput((prevState: any) => ({
      ...prevState,
      [input]: value,
    }));
  };




  useEffect(() => {
    if (profileisSuccess) {
      toast.success("Profile Updated", { toastId: customId });
    }
    if (resetisSuccess) {
      toast.success("Passwords Updated", { toastId: customId });
    }
    if (profileisError) {
      toast.error(profilemessage, { toastId: customId });
    }
    if (resetisError) {
      toast.error(resetmessage, { toastId: customId });
    }
    dispatch(reset());
  }, [dispatch, profileisSuccess, profileisError, profilemessage, resetisError, resetmessage, resetisSuccess]);



  const submitHandler = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (input.newPassword !== confirmPassword) {
      toast.error("Passwords do not match", { toastId: customId });
    } else {
      const newPassword = {
        "currentPassword": input.currentPassword,
        "newPassword": input.newPassword
      };
      // @ts-ignore
      dispatch(updatePassword(newPassword)
      );
    }
  };



  const profilesubmitHandler = (e: any) => {
    e.preventDefault();
    //Create Profile Actions
    const value = {
      "firstName": input?.firstname,
      "lastname": input?.lastname,
      "currentPassword": input?.currentPassword,
      "newPassword": input?.newPassword,
      "aboutMe": input?.aboutMe,
      "profilePic": profilePic,
    }
    // @ts-ignore
    dispatch(updateProfile(value));
  };

  const onChange = (e: any) => {
    const file = e.target.files[0];
    // @ts-ignore
    setImgLocalURL(URL?.createObjectURL(e.target.files[0]));
    const formData = new FormData();
    formData.append("image", file);
    const postImg = async () => {
      try {
        setPreviewImgLoading(true);
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.post(
          baseUrl + "/api/v1/imageupload",
          formData,
          config
        );
        setProfilePic(data.IMAGE);
        setPreviewImgLoading(false);
      } catch (error: any) {
        console.error(error.message);
        setPreviewImgLoading(false);
      }
    };
    postImg();
  };



  return (
    <div id="screen-wrapper">
      <SideNavBar />
      <Header
      />
      <main>
        <div className="page-title">
          <h5>User Settings</h5>
        </div>
        <div className="user-settings">
          <div className="user-settings-display">
            <div className="user-display-first">
              <div className="preview img-container">
                {!data?.profilePic ? (
                  <i className="fas fa-user fa-5x" />
                ) : (
                  <img
                    src={`${baseUrl}/${data?.profilePic}`}
                    alt="Profile Pic"
                  />
                )}
              </div>
              <div>
                <p>
                  {data?.firstname} {data?.lastname}
                </p>
                <p>{data?.email}</p>
                <p>{data?.contactNo}</p>
              </div>
            </div>
            <div className="user-display-second">
              <p>User ID</p>
              <p>{data?.userId}</p>
              <p>Role</p>
              <p>{data?.role?.roleName}</p>
              <p>Supervisor</p>
              <p>
                {data?.reportsTo?.firstname}{" "}
                {data?.reportsTo?.lastname}
              </p>
              <p>L.O.B</p>
              <p>{data?.lob}</p>
              <p>About</p>
              <p>{data?.aboutMe}</p>
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
                      value={input?.firstname}
                      onChange={(e) => handleOnChange("firstname", e.target.value)}
                    />
                  </div>
                  <div className="form-ctrl">
                    <label>Last Name</label>
                    <input
                      type="text"
                      placeholder="Enter your last name"
                      value={input?.lastname}
                      onChange={(e) => handleOnChange("lastname", e.target.value)}
                    />
                  </div>
                  <div className="form-ctrl">
                    <label>About Me</label>
                    <input
                      type="text"
                      placeholder="Enter your last name"
                      value={input?.aboutMe}
                      onChange={(e) => handleOnChange("aboutMe", e.target.value)}
                    />
                  </div>
                  <button
                    className="password"
                    disabled={profileisLoading && true}
                    type="submit">
                    {profileisLoading ? "Updating..." : "Update"}
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
                      <  FaUser />
                    </div>
                  ) : (
                    <div className="form-ctrl preview img-container">
                      <img
                        src={imgLocalURL}
                        alt="Profile Pic"
                        className={previewImgLoading ? "dark-img-loading" : ""}
                      />
                    </div>
                  )}
                  <div className="file-input-wrap">
                    <input
                      type="file"
                      accept="image/*"
                      className="custom-file-input"
                      disabled={(profileisLoading || previewImgLoading) && true}
                      // @ts-ignore
                      onChange={onChange}
                    />
                  </div>
                  {imgLocalURL !== null && (
                    <input
                      type="submit"
                      disabled={(profileisLoading || previewImgLoading) && true}
                      value={
                        profileisLoading || previewImgLoading
                          ? "Please wait..."
                          : "Upload Image"
                      }
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
                      value={input?.currentPassword}
                      onChange={(e) => handleOnChange("currentPassword", e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-ctrl">
                    <label>New Password</label>
                    <input
                      type="password"
                      placeholder="Enter your new password"
                      value={input?.newPassword}
                      onChange={(e) => handleOnChange("newPassword", e.target.value)}
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
                    className="btn"
                    disabled={resetisLoading && true}
                    type="submit"
                    value="Update">
                    {resetisLoading ? "Updating..." : "Update"}
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
