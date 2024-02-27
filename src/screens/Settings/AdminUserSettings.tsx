import { useState, useEffect } from "react";
import SideNavBar from "../../components/SideNavBar";
import { Tab, Tabs } from "react-bootstrap";
import { baseUrl } from "../../shared/baseUrl";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getUserProfileId, reset } from "../../features/Auth/authSlice";
import Header from "../../components/Header";
import { useAppDispatch, useAppSelector } from "../../store/useStore";
import { toast } from "react-toastify";
import { customId } from "../../components/TableOptions";
import { getallRoles, getsupervisors } from "../../features/Registration/registrationSlice";

const AdminUserSettings = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userInfo = useAppSelector((state: { auth: any; }) => state.auth)
  const { dataID, isLoadingID, messageID, isErrorID, isSuccessID } = useAppSelector((state: any) => state.auth);
  const { profiledata, profileisLoading, profilemessage, profileisError, profileisSuccess } = useAppSelector((state: any) => state.auth);
  const { resetdata, resetisLoading, resetmessage, resetisError, resetisSuccess } = useAppSelector((state: any) => state.auth);
  const { rolesdata } = useAppSelector((state: any) => state.reg)
  const { getsupervisorsdata } = useAppSelector((state: any) => state.reg);
  const supervisor = getsupervisorsdata?.data
  const allrole = rolesdata?.roles
  const data = dataID?.user

  useEffect(() => {
    dispatch(getsupervisors());
    dispatch(getallRoles());
    // @ts-ignore
    dispatch(getUserProfileId(id));
  }, [dispatch, id]);


  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [input, setInput] = useState<any>({
    userProfileId: "",
    role: "",
    firstname: "",
    lastname: "",
    isActive: false,
    reportsTo: "",
    lob: "",
    userId: ""
  })





  useEffect(() => {
    // dispatch(getUserProfileById());
  }, [dispatch]);
  useEffect(() => {
    setInput((prevState: any) => {
      return ({
        ...prevState,
        userProfileId: id,
        role: data?.role?._id,
        firstname: data?.firstname,
        lastname: data?.lastname,
        currentPassword: data?.currentPassword,
        newPassword: data?.newPassword,
        isActive: Boolean(data?.isActive),
        reportsTo: data?.reportsTo?._id,
        lob: data?.lob,
        userId: data?.userId
      });
    });
  }, [data?.currentPassword, data?.firstname, data?.isActive, data?.lastname, data?.lob, data?.newPassword, data?.reportsTo?._id, data?.role?._id, data?.userId, id]);





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



  // const adminResetPassword = useSelector((state) => state.adminResetPassword);
  // const {
  //   loading: loadingReset,
  //   error: errorReset,
  //   success: successReset,
  // } = adminResetPassword;

  // useEffect(() => { 
  //     if (successUpdate) {
  //       dispatch(reset());
  //       navigate("/registereduser");
  //     } else {
  //       if (!data?.user || data?.user?._id !== userProfileId) {
  //         dispatch(getUserProfileById(userProfileId));
  //       } else {
  //         setFirstName(data.user?.firstname);
  //         setLastName(data.user?.lastname);
  //         setRole(data.user?.role?._id);
  //         setIsActive(data.user?.isActive);
  //         setReportsTo(data.user?.reportsTo?._id);
  //         setLob(data?.user?.lob);
  //         setuserId(data?.user?.userId);
  //       }
  //     }

  //   },  
  //   [
  //     navigate,
  //     userInfo, 
  //     data,
  //     userProfileId,
  //     dispatch,
  //   ]);

  useEffect(() => {
    if (isErrorID) {
      toast.error(messageID, {
        toastId: customId
      });
      dispatch(reset());
    }
  }, [dispatch, isErrorID, messageID]);

  const updateUserHandler = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // dispatch(adminUpdateUser(input));
  };
  const resetPasswordHandler = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // if (newPassword !== confirmPassword) {
    //   setResetMessage("Passwords do not match");
    // } else {
    //   dispatch(adminResetPasswordAction(userProfileId, newPassword));
    // }
  };

  return (
    <div id="screen-wrapper">
      <SideNavBar />
      <Header />
      <main>
        <div className="page-title">
          <h5>Admin - User Settings</h5>
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
                  {data?.firstname || data?.lastname ? (
                    <>
                      {data?.firstname} {data?.lastname}
                    </>
                  ) : (
                    <>----- -----</>
                  )}
                </p>
                <p>
                  {data?.email ? <>{data?.email}</> : <>-----</>}
                </p>
                <p>
                  {data?.contactNo ? (
                    <>{data?.contactNo}</>
                  ) : (
                    <>-----</>
                  )}
                </p>
              </div>
            </div>
            <div className="user-display-second">
              <p>User ID</p>
              <p>
                {data?.userId ? <>{data?.userId}</> : <>-----</>}
              </p>
              <p>Role</p>
              <p>
                {data?.role?.roleName ? (
                  <>{data?.role?.roleName}</>
                ) : (
                  <>-----</>
                )}
              </p>
              <p>L.O.B</p>
              <p>{data?.lob ? <>{data?.lob}</> : <>-----</>}</p>
              <p>Supervisor</p>
              <p>
                {data?.reportsTo?.firstname ? (
                  <>
                    {data?.reportsTo?.firstname}-
                    {data?.reportsTo?.lastname}
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
                        value={input?.userId}
                        onChange={(e) => handleOnChange("userId", e.target.value)}
                      />
                    </div>
                    <div className="form-ctrl">
                      <label>First Name</label>
                      <input
                        type="text"
                        placeholder="Enter user first name"
                        value={input?.firstname}
                        onChange={(e) => handleOnChange("firstname", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="admin-setuser-grid">
                    <div className="form-ctrl">
                      <label>Last Name</label>
                      <input
                        type="text"
                        placeholder="Enter user last name"
                        value={input?.lastname}
                        onChange={(e) => handleOnChange("lastname", e.target.value)}
                      />
                    </div>
                    <div className="form-ctrl">
                      <label>Role</label>
                      <select
                        value={input?.role}
                        onChange={(e) => handleOnChange("role", e.target.value)}>
                        <option>Change user's role</option>
                        {allrole?.map((item: any) => (
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
                        value={input?.reportsTo}
                        onChange={(e) => handleOnChange("reportsTo", e.target.value)}>
                        <option>Change user's role</option>
                        {supervisor?.map((item: any) => (
                          <option key={item?._id} value={item?._id}>
                            {item?.firstname} {item?.lastname}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-ctrl">
                      <label>L.O.B</label>
                      <select
                        value={input?.lob}
                        onChange={(e) => handleOnChange("lob", e.target.value)}>
                        <option>Change LOB</option>
                        {[
                          "Branch",
                        ].map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>))}
                      </select>
                    </div>
                  </div>
                  <div className="form-ctrl">
                    <div className="user-status">
                      {data?.isActive ? (<p>User is Activated, uncheck to de-activate:</p>) :
                        (<p>User is De-activated, check to activate:</p>)}
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          value={input?.isActive}
                          onChange={(e) => handleOnChange("isActive", e.target.value)}
                        />
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </div>
                  <div className="align-right-btn">
                    {/* <button
                      type="submit"
                      className="password"
                      disabled={loadingUpdate && true}>
                      {loadingUpdate ? "Updating..." : "Update"}
                    </button> */}
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
                    {/* <button
                      type="submit"
                      className="btn"
                      disabled={loadingReset && true}>
                      {loadingReset ? "Updating..." : "Update"}
                      
                    </button>   */}
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
