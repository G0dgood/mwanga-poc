import { useState, useEffect } from "react";
import SideNavBar from "../../components/SideNavBar";
import { Tab, Tabs } from "react-bootstrap";
import { baseUrl } from "../../shared/baseUrl";
import { useParams } from "react-router-dom";
import { adminupdatePassword, adminupdateprofile, getUserProfileId, reset } from "../../features/Auth/authSlice";
import Header from "../../components/Header";
import { useAppDispatch, useAppSelector } from "../../store/useStore";
import { toast } from "react-toastify";
import { customId } from "../../components/TableOptions";
import { getallRoles, getsupervisors } from "../../features/Registration/registrationSlice";
import { FaUser } from "react-icons/fa";

const AdminUserSettings = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { dataID, messageID, isErrorID, isSuccessID } = useAppSelector((state: any) => state.auth);

  const { adupdateisLoading, adupdatemessage, adupdateisError, adupdateisSuccess } = useAppSelector((state: any) => state.auth);
  const { adminresetisLoading, adminresetmessage, adminresetisError, adminresetisSuccess } = useAppSelector((state: any) => state.auth);
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
    if (isSuccessID) {
      // @ts-ignore
      dispatch(getUserProfileId(id));
    }
  }, [dispatch, id, isSuccessID]);


  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [input, setInput] = useState({
    userProfileId: "",
    role: "",
    firstname: "",
    lastname: "",
    isActive: false,
    reportsTo: "",
    lob: "",
    userId: "",
  })



  useEffect(() => {
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
    if (adupdateisSuccess) {
      toast.success("Profile Updated", { toastId: customId });
    }
    if (adminresetisSuccess) {
      toast.success("Passwords Updated", { toastId: customId });
    }
    if (adupdateisError) {
      toast.error(adupdatemessage, { toastId: customId });
    }
    if (adminresetisError) {
      toast.error(adminresetmessage, { toastId: customId });
    }
    dispatch(reset());
  }, [dispatch, adupdateisSuccess, adupdateisError, adupdatemessage, adminresetisError, adminresetmessage, adminresetisSuccess]);






  useEffect(() => {
    if (isErrorID) {
      toast.error(messageID, {
        toastId: customId
      });
      dispatch(reset());
    }
  }, [dispatch, isErrorID, messageID]);

  const updateUserHandler = (e: { preventDefault: () => void; }) => {
    const value = { input, id }
    e.preventDefault();
    // @ts-ignore
    dispatch(adminupdateprofile(value));
  };
  const resetPasswordHandler = (e: { preventDefault: () => void; }) => {
    const value = { newPassword, id }
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match", { toastId: customId });
    } else {
      // @ts-ignore
      dispatch(adminupdatePassword(value));
    }
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
                  <  FaUser size={80} color="gray" />
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
                          // @ts-ignore
                          checked={input?.isActive}
                          onChange={(e) => handleOnChange("isActive", e.target.checked)}
                        />
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </div>
                  <div className="align-right-btn">
                    <button
                      type="submit"
                      className="btn"
                      disabled={adupdateisLoading && true}>
                      {adupdateisLoading ? "Updating..." : "Update"}
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
                      className="btn"
                      disabled={adminresetisLoading && true}>
                      {adminresetisLoading ? "Updating..." : "Update"}

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