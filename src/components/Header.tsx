import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { FaBars, FaChevronDown, FaPowerOff, FaTools, FaUser } from "react-icons/fa";
import { baseUrl } from "../shared/baseUrl";
import NetworkConnetion from "./NetworkConnetion";
import { useAppDispatch, useAppSelector } from "../store/useStore";
import { toggleSideNav } from "../features/SideNav/navSlice";
import { reset, userprofile } from "../features/Auth/authSlice";
import { ToastContainer } from "react-toastify";
import { logoutUserAction } from "../features/Auth/authService";
import { getUserPrivileges } from "../hooks/auth";
import { useSelector } from "react-redux";
import { setLob } from "../features/Lob/LobSlice";
import { RootState } from "../store/store";
import { pageTitles } from "./data";
import axios from "axios";


const Header = () => {
  const { isSuperAdmin, isSupervisor, isMis } = getUserPrivileges();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [dropDown, setDropDown] = useState(false);
  const newLob = useSelector((state: RootState) => state.lob.currentLob);
  const handleChange = (e: { target: { value: string; }; }) => {
    const selectedLob = JSON.parse(e.target.value);
    dispatch(setLob(selectedLob));
  };

  // @ts-ignore
  const userInfo = JSON.parse(localStorage.getItem("mwanga"));
  const { userprofiledata } = useAppSelector((state: any) => state.auth);
  // isLoadinglogout, 


  useEffect(() => {
    if (!userprofiledata) {
      dispatch(userprofile());
    }

  }, [dispatch, userprofiledata])

  const handleToggle = () => {
    dispatch(toggleSideNav());
  };


  useEffect(() => {
    if (!userInfo || userInfo == null) {
      navigate("/");
    }
  }, [dispatch, navigate, userInfo]);


  const handleLogout = () => {
    const loginFlag = async () => {
      await axios.get(baseUrl + "/api/v1/auth", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
    };
    delete axios.defaults.headers.common['Authorization'];
    dispatch(reset());
    dispatch(logoutUserAction());
    loginFlag();
  };



  useEffect(() => {
    const path = window.location.pathname;
    const title = pageTitles[path] ? `People CRM | ${pageTitles[path]}` : "People CRM | Page";
    document.title = title;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="header" onMouseLeave={() => setDropDown(false)}>
      <NetworkConnetion />
      <ToastContainer position="top-right" />
      <div className="header-container">
        <div className="header-left">
          <i onClick={handleToggle}><FaBars /></i>
          <div>
            <h1 className="people2 ">
              <span className="letter2">Peopl</span>
              <span className="rotate letter6">e</span>
            </h1>
          </div>
        </div>
        {(isSuperAdmin ||
          isMis ||
          isSupervisor) && (
            <div className="lob">
              <label htmlFor="lob">LOB:</label>

              <select className="select" value={JSON.stringify(newLob)} onChange={handleChange}>
                {[
                  { name: "Branch", value: "branch" },
                ].map((item) => (
                  <option key={item.value} value={JSON.stringify(item)}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        <div
          className="d-flex header-user-details"
          onClick={() => setDropDown(!dropDown)} >
          {/* onMouseEnter={() => setDropDown(true)} */}
          <div className="preview-header img-container-header">
            {!userprofiledata?.user?.profilePic ? (
              <  FaUser />
            ) : (
              <img
                crossOrigin="anonymous"
                src={baseUrl + "/" + userprofiledata?.user?.profilePic}
                alt="Profile Pic"
              />
            )}
          </div>
          <span>{userprofiledata?.firstname || userInfo?.firstname}</span>
          <FaChevronDown />
          {dropDown && (
            <div className="dropdown">
              <Nav className="flex-column">
                <NavLink to="/user/settings" className="drop-user-settings ">
                  < FaTools className="i_icons" />
                  Profile
                </NavLink>

                <NavLink
                  to=" "
                  className="drop-logout"
                  onClick={handleLogout} >
                  < FaPowerOff className="i_icons" />
                  Logout
                </NavLink>
              </Nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
