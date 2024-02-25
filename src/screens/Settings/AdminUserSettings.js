import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserProfileByIdAction,
  adminUpdateUserAction,
  adminResetPasswordAction,
} from "../store/actions/userActions";
import {
  ADMIN_UPDATE_USER_RESET,
  USER_PROFILE_ID_RESET,
} from "../store/constants/userConstants";
import axios from "axios";
import SideNavBar from "../../components/SideNavBar";
import Header from "../../components/Header";
import { Tab, Tabs, Toast } from "react-bootstrap";
import { baseUrl } from "../../shared/baseUrl";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AdminUserSettings = () => {
  const { id } = useParams();
  const userProfileId = id;

  // const userProfile = useSelector(state => state.userProfile)
  // const { user: profile } = userProfile

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showToast, setShowToast] = useState(false);

  // --- Get current state of collapseNav from localStorage --- //
  const [collapseNav, setCollapseNav] = useState(() => {
    return JSON.parse(localStorage.getItem("collapse")) || false;
  });

  const [role, setRole] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [reportsTo, setReportsTo] = useState("");
  const [lob, setLob] = useState("");
  const [userId, setuserId] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [resetMessage, setResetMessage] = useState(null);

  const [allRoles, setAllRoles] = useState([]);
  const [allSupervisors, setAllSupervisors] = useState([]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const getUserProfileId = useSelector((state) => state.getUserProfileId);
  const { user: data } = getUserProfileId;

  const adminUpdateUser = useSelector((state) => state.adminUpdateUser);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = adminUpdateUser;

  const adminResetPassword = useSelector((state) => state.adminResetPassword);
  const {
    loading: loadingReset,
    error: errorReset,
    success: successReset,
  } = adminResetPassword;

  useEffect(() => {
    // --- Set state of collapseNav to localStorage on pageLoad --- //
    localStorage.setItem("collapse", JSON?.stringify(collapseNav));

    if (userInfo && userInfo?.role === "admin") {
      if (successUpdate) {
        dispatch({
          type: USER_PROFILE_ID_RESET,
        });
        dispatch({
          type: ADMIN_UPDATE_USER_RESET,
        });
        navigate("/registereduser");
      } else {
        if (!data?.user || data?.user?._id !== userProfileId) {
          dispatch(getUserProfileByIdAction(userProfileId));
        } else {
          setFirstName(data.user?.firstname);
          setLastName(data.user?.lastname);
          setRole(data.user?.role?._id);
          setIsActive(data.user?.isActive);
          setReportsTo(data.user?.reportsTo?._id);
          setLob(data?.user?.lob);
          setuserId(data?.user?.userId);
        }
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      async function fetchRoles() {
        const request = await axios.get(baseUrl + "/api/v1/roles", config);
        setAllRoles(request?.data?.roles);
        return request;
      }
      async function fetchSupervisors() {
        const request = await axios.get(
          baseUrl + "/api/v1/users/supervisors",
          config
        );
        setAllSupervisors(request?.data?.data);
        return request;
      }
      fetchRoles();
      fetchSupervisors();
    } else {
      navigate("/");
    }
  }, [
    navigate,
    collapseNav,
    userInfo,
    successUpdate,
    data,
    userProfileId,
    dispatch,
  ]);

  const toggleSideNav = () => {
    setCollapseNav(!collapseNav);
  };

  const updateUserHandler = (e) => {
    e.preventDefault();
    dispatch(
      adminUpdateUserAction(
        userProfileId,
        role,
        firstname,
        lastname,
        isActive,
        reportsTo,
        lob,
        userId
      )
    );
  };

  const resetPasswordHandler = (e) => {
    e.preventDefault();
    setShowToast(true);

    if (newPassword !== confirmPassword) {
      setResetMessage("Passwords do not match");
    } else {
      dispatch(adminResetPasswordAction(userProfileId, newPassword));
    }
  };
  const [resetLOB, setResetLOB] = useState(false);
  return (
    <div id="screen-wrapper">
      <SideNavBar />
      <Header />
      <main>
        <div className="page-title">
          <h5>Admin - User Settings</h5>
        </div>

        {errorUpdate && (
          <Toast
            show={showToast}
            className="success-toast"
            onClose={() => setShowToast(false)}
            delay={6000}
            autohide>
            <Toast.Body>
              <span>
                <i className="fas fa-check-circle" />
              </span>
              <p>{errorUpdate}</p>
              <span onClick={() => setShowToast(false)}>
                <i className="fas fa-times" />
              </span>
            </Toast.Body>
          </Toast>
        )}
        {successReset && (
          <Toast
            show={showToast}
            className="success-toast"
            onClose={() => setShowToast(false)}
            delay={6000}
            autohide>
            <Toast.Body>
              <span>
                <i className="fas fa-check-circle" />
              </span>
              <p>Password updated successfuly!</p>
              <span onClick={() => setShowToast(false)}>
                <i className="fas fa-times" />
              </span>
            </Toast.Body>
          </Toast>
        )}
        {resetMessage && (
          <Toast show={showToast}>
            <Toast.Body>
              <span>
                <i className="fas fa-exclamation-circle" />
              </span>
              <p>{resetMessage}</p>
              <span onClick={() => setShowToast(false)}>
                <i className="fas fa-times" />
              </span>
            </Toast.Body>
          </Toast>
        )}
        {errorReset && (
          <Toast show={showToast}>
            <Toast.Body>
              <span>
                <i className="fas fa-exclamation-circle" />
              </span>
              <p>{errorReset}</p>
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
                  {data?.user?.firstname || data?.user?.lastname ? (
                    <>
                      {data?.user?.firstname} {data?.user?.lastname}
                    </>
                  ) : (
                    <>----- -----</>
                  )}
                </p>
                <p>
                  {data?.user?.email ? <>{data?.user?.email}</> : <>-----</>}
                </p>
                <p>
                  {data?.user?.contactNo ? (
                    <>{data?.user?.contactNo}</>
                  ) : (
                    <>-----</>
                  )}
                </p>
              </div>
            </div>
            <div className="user-display-second">
              <p>User ID</p>
              <p>
                {data?.user?.userId ? <>{data?.user?.userId}</> : <>-----</>}
              </p>
              <p>Role</p>
              <p>
                {data?.user?.role?.roleName ? (
                  <>{data?.user?.role?.roleName}</>
                ) : (
                  <>-----</>
                )}
              </p>
              <p>L.O.B</p>
              <p>{data?.user?.lob ? <>{data?.user?.lob}</> : <>-----</>}</p>
              <p>Supervisor</p>
              <p>
                {data?.user?.reportsTo?.firstname ? (
                  <>
                    {data?.user?.reportsTo?.firstname}
                    {data?.user?.reportsTo?.lastname}
                  </>
                ) : (
                  <>---- ----</>
                )}
              </p>
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
                <form onSubmit={updateUserHandler}>
                  <div className="admin-setuser-grid">
                    <div className="form-ctrl">
                      <label>Agent ID</label>
                      <input
                        type="text"
                        placeholder="Enter agent id"
                        value={userId}
                        onChange={(e) => setuserId(e.target.value)}
                      />
                    </div>
                    <div className="form-ctrl">
                      <label>First Name</label>
                      <input
                        type="text"
                        placeholder="Enter user first name"
                        value={firstname}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="admin-setuser-grid">
                    <div className="form-ctrl">
                      <label>Last Name</label>
                      <input
                        type="text"
                        placeholder="Enter user last name"
                        value={lastname}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                    <div className="form-ctrl">
                      <label>Role</label>
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}>
                        <option>Change user's role</option>
                        {allRoles?.map((item) => (
                          <option key={item?._id} value={item?._id}>
                            {item?.roleDescription}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="admin-setuser-grid">
                    <div className="form-ctrl">
                      <label>Supervisor</label>
                      <select
                        value={reportsTo}
                        onChange={(e) => setReportsTo(e.target.value)}>
                        <option>Change user's role</option>
                        {allSupervisors?.map((item) => (
                          <option key={item?._id} value={item?._id}>
                            {item?.firstname} {item?.lastname}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-ctrl">
                      <label>L.O.B</label>
                      <select
                        value={lob}
                        onChange={(e) => setLob(e.target.value)}>
                        <option>Change LOB</option>
                        {[
                          "Access",
                          "Access Card",
                          "Aura",
                          "Branch",
                          "Fairmoney",
                          "Airtel-Outbound",
                          "Voisa",
                          "Outcess Chat",
                          "Mantrac",
                          "Airtel-NIN",
                        ].map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-ctrl">
                    <div className="user-status">
                      {data?.user?.isActive ? (
                        <p>User is Activated, uncheck to de-activate:</p>
                      ) : (
                        <p>User is De-activated, check to activate:</p>
                      )}
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={isActive}
                          onChange={(e) => setIsActive(e.target.checked)}
                        />
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </div>
                  <div className="align-right-btn">
                    <button
                      type="submit"
                      className="password"
                      disabled={loadingUpdate && true}>
                      {loadingUpdate ? "Updating..." : "Update"}
                    </button>
                  </div>
                </form>
              </Tab>
              <Tab
                eventKey="reset-password"
                tabClassName="active-tab"
                title="Reset Password">
                <form onSubmit={resetPasswordHandler}>
                  <div className="form-ctrl">
                    <label className="required">New Password</label>
                    <input
                      type="password"
                      placeholder="Enter your new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-ctrl">
                    <label className="required">Confirm Password</label>
                    <input
                      type="password"
                      placeholder="Re-enter your new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <div className="align-right-btn">
                    <button
                      type="submit"
                      className="password"
                      disabled={loadingReset && true}>
                      {loadingReset ? "Updating..." : "Update"}
                    </button>
                  </div>
                </form>
              </Tab>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminUserSettings;
