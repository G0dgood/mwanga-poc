import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./screens/Login/Login";
import Report from "./screens/Branch/Page/Report/Report"
import Dashboard from "./screens/Branch/Page/Dashboard/Dashboard";
import CustomerBook from "./screens/Branch/Page/CustomerBook";
import RegisteredUsers from "./screens/Register/RegisteredUsers";
import SetupBook from "./screens/Branch/Page/SetupBook";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import UserSettings from "./screens/UserProfile/UserSettings";
import AdminUserSettings from "./screens/Settings/AdminUserSettings";
import TeamMembers from "./screens/Branch/TeamMembers/TeamMembers";
import AgentReport from "./screens/Branch/Page/Report/AgentReport";

function App() {
  // Assuming currentLob is available from Redux state or some context
  const currentLob = useSelector((state: RootState) => state.lob.currentLob);

  const lobName = currentLob ? currentLob.name : null;



  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="user/settings" element={<UserSettings />} />
        <Route path="user/:id/settings" element={<AdminUserSettings />} />

        {lobName === 'Branch' && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/setupbook" element={<SetupBook />} />
            <Route path="/report" element={<Report />} />
            <Route path="/agentreport" element={<AgentReport />} />
            <Route path="/customerbook" element={<CustomerBook />} />
            <Route path="/teammembers" element={<TeamMembers />} />
            <Route path="/registeredusers" element={<RegisteredUsers />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
