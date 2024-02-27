import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";

import { baseUrl } from "../shared/baseUrl";
import { FaBook, FaChevronDown, FaSwatchbook, FaTachometerAlt, FaUser, FaUsers } from "react-icons/fa";
import { userInfo } from "../hooks/config";

const ReportHeader = ({ title }: any) => {

  const [dropDown, setDropDown] = useState(false);




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
          <div className="preview-header img-container-header">
            {userInfo?.profilePic ? (
              <  FaUser />
            ) : (
              <img
                src={`${baseUrl}/+ ${userInfo?.profilePic}`}
                alt="Profile Pic"
              />
            )}
          </div>
          <span>Godwin</span>
          <  FaChevronDown />

          {dropDown && (
            <div className="dropdown">
              <Nav className="flex-column">
                <NavLink to="/Dashboard" className="drop-user-settings ">
                  <FaTachometerAlt />
                  Dashboard
                </NavLink>
                <NavLink to="/customerbook" className="drop-user-settings">
                  <FaBook className="i_icons " />
                  Customer Book
                </NavLink>



                <NavLink
                  to="/setupcustomerbook"
                  className="drop-user-settings">
                  <FaSwatchbook />
                  Setup Book
                </NavLink>

                <NavLink to="/team" className="drop-user-settings">
                  <FaUsers />
                  Team Members
                </NavLink>

                <NavLink to="/registereduser" className="drop-user-settings">
                  <FaUsers />
                  Registered Users
                </NavLink>

                {/* <NavLink
                  to="/"
                  className="drop-logout"
                >
                  <FaPowerOff />
                  Logout
                </NavLink> */}
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
