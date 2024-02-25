import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import logo from "../assets/img/outcess-logo-white.png";
import { baseUrl } from "../shared/baseUrl";
import axios from "axios";
import { FaBook, FaPowerOff, FaSwatchbook, FaTachometerAlt, FaUsers } from "react-icons/fa";

const ReportHeader = ({ title }: any) => {
  const dispatch = useDispatch();
  const [dropDown, setDropDown] = useState(false);


  // const handleLogoutUser = () => {
  //   const loginFlag = async () => {
  //     await axios.get(baseUrl + "/api/v1/auth", {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${userInfo.token}`,
  //       },
  //     });
  //   };
  //   dispatch(logoutUserAction());
  //   loginFlag();
  // };

  return (
    <div id="report-header" onMouseLeave={() => setDropDown(false)}>
      <div className="r-header-sub1">
        {/* <div className="report-logo">
          <img src={logo} alt="Outcess Solutions" />
        </div> */}
        <div>
          <h1 className="people2 ">
            <span className="letter2">Peopl</span>
            <span className="rotate letter6">e</span>
          </h1>
        </div>
        <div
          className="r-header-user-details"
          onClick={() => setDropDown(!dropDown)}
          onMouseEnter={() => setDropDown(true)}>
          <div className="preview-header img-container-header">
            {/* {!data?.user?.profilePic ? (
              <i className="fas fa-user fa-5x" />
            ) : (
              <img
                src={`${baseUrl}/${data?.user?.profilePic}`}
                alt="Profile Pic"
              />
            )} */}
          </div>
          <span>Godwin</span>
          <i className="fas fa-chevron-down" />

          {dropDown && (
            <div className="dropdown">
              <Nav className="flex-column">
                <NavLink to="/Dashboard" className="drop-user-settings">
                  <FaTachometerAlt />
                  Dashboard
                </NavLink>
                <NavLink to="/customerbook" className="drop-user-settings">
                  <i><FaBook />  Customer Book</i>
                </NavLink>

                {/* <NavLink to="/loan-book" className="drop-user-settings">
                  <FaBook />
                  Loan Book
                </NavLink> */}

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

                <NavLink
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
