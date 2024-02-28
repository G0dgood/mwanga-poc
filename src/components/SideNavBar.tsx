import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { useIsMobile } from "./resize";
import { useAppSelector } from "../store/useStore";
import { FaTachometerAlt, FaSwatchbook, FaBook, FaUsers, FaPoll } from "react-icons/fa";
import { getUserPrivileges } from "../hooks/auth";




const SideNavBar = () => {
  const toggleState = useAppSelector((state) => state.nav.toggleSideNav);
  const { isSuperAdmin, isSupervisor, isMis, isAgent } = getUserPrivileges();

  // --- SideNav Bubble (States) --- // 
  const [dashboard, setDashboard] = useState(false);
  const [customerBook, setCustomerBook] = useState(false);
  const [setupBook, setSetupBook] = useState(false);
  const [teamMembers, setTeamMembers] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState(false);
  const [dispositionReport, setDispositionReport] = useState(false);
  // const [customerSms, setCustomerSms] = useState(false);
  const [collapse, setCollapse] = useState(false);

  const isMobile = useIsMobile();
  useEffect(() => {
    if (isMobile) {
      setCollapse(true);
    } else {
      setCollapse(false);
    }
  }, [isMobile]);

  return (
    <div
      id={toggleState || collapse ? "collapse-sidenavbar" : "open-sidenavbar"}>
      <Nav className="flex-column nav-menu">
        <NavLink
          to="/dashboard"
          className={
            window.location.pathname === "/dashboard"
              ? "active-here"
              : "nav-link"
          }
          onMouseEnter={() => setDashboard(true)}
          onMouseLeave={() => setDashboard(false)}
        >
          <FaTachometerAlt className="i" />
          <span className="nav-name">Dashboard</span>
          {(dashboard && toggleState) || (dashboard && collapse) ? (
            <div className="sidenav-bubble">
              <p>Dashboard</p>
            </div>
          ) : null}
        </NavLink>

        {isAgent && <NavLink
          to="/customerbook"
          className={
            window.location.pathname === "/customerbook"
              ? "active-here"
              : "nav-link"
          }
          onMouseEnter={() => setCustomerBook(true)}
          onMouseLeave={() => setCustomerBook(false)}>
          <FaBook />
          <span className="nav-name">Customer Book</span>
          {(customerBook && toggleState) ||
            (customerBook && collapse) ? (
            <div className="sidenav-bubble">
              <p>Customer Book</p>
            </div>
          ) : null}
        </NavLink>}


        {(isSuperAdmin || isSupervisor) &&
          <NavLink
            to="/setupbook"
            className={
              window.location.pathname === "/setupbook"
                ? "active-here"
                : "nav-link"
            }
            onMouseEnter={() => setSetupBook(true)}
            onMouseLeave={() => setSetupBook(false)}>
            < FaSwatchbook />
            <span className="nav-name">Setup Book</span>
            {(setupBook && toggleState) ||
              (setupBook && collapse) ? (
              <div className="sidenav-bubble">
                <p>Setup Book</p>
              </div>
            ) : null}
          </NavLink>}


        {isSuperAdmin &&
          <NavLink
            to="/registeredusers"
            className={
              window.location.pathname === "/registeredusers"
                ? "active-here"
                : "nav-link"
            }
            onMouseEnter={() => setRegisteredUsers(true)}
            onMouseLeave={() => setRegisteredUsers(false)}>
            <FaUsers />
            <span className="nav-name">Registered Users</span>
            {(registeredUsers && toggleState) ||
              (registeredUsers && collapse) ? (
              <div className="sidenav-bubble">
                <p>Registered Users</p>
              </div>
            ) : null}
          </NavLink>}

        {/* <NavLink
          to="/allcustomersms"
          className={
            window.location.pathname === "/allcustomersms"
              ? "active-here"
              : "nav-link"
          }
          onMouseEnter={() => setCustomerSms(true)}
          onMouseLeave={() => setCustomerSms(false)}>
          <FaEnvelope />
          <span className="nav-name">Customer SMS</span>
          {(customerSms && toggleState) ||
            (customerSms && collapse && (
              <div className="sidenav-bubble">
                <p>Customer SMS</p>
              </div>
            )): null}
        </NavLink> */}

        {isSupervisor && <NavLink
          to="/teammembers"
          className={
            window.location.pathname === "/teammembers" ? "active-here" : "nav-link"
          }
          onMouseEnter={() => setTeamMembers(true)}
          onMouseLeave={() => setTeamMembers(false)}>
          < FaUsers />
          <span className="nav-name">Team Members</span>
          {(teamMembers && toggleState) ||
            (teamMembers && collapse) ? (
            <div className="sidenav-bubble">
              <p>Team Members</p>
            </div>
          ) : null}
        </NavLink>}

        {(isSuperAdmin || isSupervisor || isMis) && <NavLink
          to="/report"
          className={
            window.location.pathname === "/report" ? "active-here" : "nav-link"
          }
          onMouseEnter={() => setDispositionReport(true)}
          onMouseLeave={() => setDispositionReport(false)}>
          < FaPoll />
          <span className="nav-name">Report</span>
          {(dispositionReport && toggleState) ||
            (dispositionReport && collapse) ? (
            <div className="sidenav-bubble">
              <p>Disposition Report</p>
            </div>
          ) : null}
        </NavLink>}

        {isAgent && <NavLink
          to="/agentreport"
          className={
            window.location.pathname === "/agentreport" ? "active-here" : "nav-link"
          }
          onMouseEnter={() => setDispositionReport(true)}
          onMouseLeave={() => setDispositionReport(false)}>
          < FaPoll />
          <span className="nav-name">Report</span>
          {(dispositionReport && toggleState) ||
            (dispositionReport && collapse) ? (
            <div className="sidenav-bubble">
              <p>Disposition Report</p>
            </div>
          ) : null}
        </NavLink>}

      </Nav>
    </div>
  );
};

export default SideNavBar;
