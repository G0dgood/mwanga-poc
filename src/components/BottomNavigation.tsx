import { useState } from 'react'
import { MdInsights } from 'react-icons/md'
import { NavLink, useLocation } from 'react-router-dom';
import { HiOutlineCalendar } from 'react-icons/hi';
import { BiHome } from 'react-icons/bi';
import { LuUsers } from 'react-icons/lu';
import { HiOutlineRectangleStack } from 'react-icons/hi2';
import { getUserPrivileges } from '../hooks/auth';
import { FaBook, FaPoll, FaSwatchbook, FaTachometerAlt, FaUsers } from 'react-icons/fa';


const BottomNavigation = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const {
    isSuperAdmin,
    isSupervisor,

  } = getUserPrivileges();

  const { pathname } = useLocation();

  return (
    <div className="footer">
      <div className="footer_container">

        <div className={pathname === "/dashboard" ? 'footerOption-active' : "footerOption"}>
          <NavLink to="/dashboard" className={({ isActive }) =>
            [
              "nav-link",
              isActive ? "active" : null,
            ]
              .filter(Boolean)
              .join(" ")
          }  >
            <FaTachometerAlt className="footerOption_icon" />
          </NavLink>
          <h4 className="footerOption_title">Dashboard</h4>
        </div>
        {/* {(isSuperAdmin) && */}
        <div className={pathname === "/customerbook" ? 'footerOption-active' : "footerOption"}>
          <NavLink to="/customerbook" className={({ isActive }) =>
            [
              "nav-link",
              isActive ? "active" : null,
            ]
              .filter(Boolean)
              .join(" ")
          }  >

            <FaSwatchbook className="footerOption_icon" />
          </NavLink>
          <h4 className="footerOption_title">Customer Book</h4>
        </div>
        {/* // } */}
        {/* {(isSupervisor) && */}
        <div className={pathname === "/setupbook" ? 'footerOption-active' : "footerOption"}>
          <NavLink to="/setupbook" className={({ isActive }) =>
            [
              "nav-link",
              isActive ? "active" : null,
            ]
              .filter(Boolean)
              .join(" ")
          }  >

            <FaBook size={25} className="footerOption_icon" />
          </NavLink>
          <h4 className="footerOption_title">Setup Book</h4>
        </div>
        {/* } */}


        {/* {(isSuperAdmin) && */}
        <div className={pathname === "/registeredusers" ? 'footerOption-active' : "footerOption"}>
          <NavLink to="/registeredusers" className={({ isActive }) =>
            [
              "nav-link",
              isActive ? "active" : null,
            ]
              .filter(Boolean)
              .join(" ")
          }  >
            <FaUsers size={25} className="footerOption_icon" />
          </NavLink>
          <h4 className="footerOption_title">Registered Users</h4>
        </div>
        {/* } */}

        {/* {(isSupervisor) && */}
        <div className={pathname === "/report" ? 'footerOption-active' : "footerOption"}>
          <NavLink to="/report" className={({ isActive }) =>
            [
              "nav-link",
              isActive ? "active" : null,
            ]
              .filter(Boolean)
              .join(" ")
          }  >
            <FaPoll size={25} className="footerOption_icon" />
          </NavLink>
          <h4 className="footerOption_title">Report</h4>
        </div>
        {/* } */}
      </div>
    </div>
  )
}

export default BottomNavigation