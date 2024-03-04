import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { baseUrl } from "../shared/baseUrl";
import { FaBook, FaChevronDown, FaPowerOff, FaSwatchbook, FaTachometerAlt, FaUser, FaUsers } from "react-icons/fa";
import { getUserPrivileges } from "../hooks/auth";
import { useAppDispatch, useAppSelector } from "../store/useStore";
import { logoutUserAction } from "../features/Auth/authService";
import axios from "axios";
import { reset, userprofile } from "../features/Auth/authSlice";


const ReportHeader = ({ title }: any) => {
  // @ts-ignore
  const userInfo = JSON.parse(localStorage.getItem("mwanga"));
  const { isSuperAdmin, isSupervisor, isAgent } = getUserPrivileges();
  const [dropDown, setDropDown] = useState(false);
  const dispatch = useAppDispatch();
  const { userprofiledata } = useAppSelector((state: any) => state.auth);




  useEffect(() => {
    dispatch(userprofile());
  }, [dispatch])




  const handleLogout = () => {
    const loginFlag = async () => {
      await axios.get(baseUrl + "/api/v1/auth", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
    };
    dispatch(reset());
    dispatch(logoutUserAction());
    loginFlag();
  };

  return (
    <div id="report-header" onMouseLeave={() => setDropDown(false)}>
      <div className="r-header-sub1">
        <div>
          <h1 className="people2 ">
            <span className="letter21">Peopl</span>
            <span className="rotate letter6">e</span>
          </h1>
        </div>
        <div
          className="r-header-user-details"
          onClick={() => setDropDown(!dropDown)}
          onMouseEnter={() => setDropDown(true)}>
          <div className="preview-header img-container-header">r
            {!userprofiledata?.user?.profilePic ? (
              < FaUser />
            ) : (
              <img
                crossOrigin="anonymous"
                src={baseUrl + "/" + userprofiledata?.user?.profilePic}
                alt="Profile Pic"
              />
            )}
          </div>
          <span>{userprofiledata?.firstname || userInfo?.firstname}</span>
          <  FaChevronDown />

          {dropDown && (
            <div className="dropdown">
              <Nav className="flex-column">

                <NavLink to="/dashboard" className="drop-user-settings ">
                  <FaTachometerAlt />

                  Dashboard

                </NavLink>
                {isAgent && <NavLink to="/customerbook" className="drop-user-settings">
                  <FaBook className="i_icons " />

                  Customer Book
                </NavLink>}


                {(isSuperAdmin || isSupervisor) &&
                  <NavLink
                    to="/setupbook"
                    className="drop-user-settings">
                    <FaSwatchbook />
                    Setup Book
                  </NavLink>}

                {isSupervisor && <NavLink to="/teammembers" className="drop-user-settings">
                  <FaUsers />
                  Team Members
                </NavLink>
                }

                {isSuperAdmin &&
                  <NavLink to="/registeredusers" className="drop-user-settings">
                    <FaUsers />
                    Registered Users
                  </NavLink>
                }
                <NavLink
                  onClick={handleLogout}
                  to="/"
                  className="drop-logout"
                >

                  <FaPowerOff />
                  Logout
                </NavLink>
              </Nav>
            </div>
          )}
        </div>
      </div>
      <div className="r-header-sub2">
        <h5>{title}</h5>
      </div>
    </div>
  );
};

export default ReportHeader;
