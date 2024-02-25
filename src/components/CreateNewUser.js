import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { userRegisterAction } from "../store/actions/userActions";
import { Toast } from "react-bootstrap";
import { baseUrl } from "../shared/baseUrl";
import { USER_REGISTER_RESET } from "../store/constants/userConstants";

const CreateNewUser = ({ errorRegister, loadingRegister, successRegister }) => {
  const dispatch = useDispatch();

  const [showToast, setShowToast] = useState(false);

  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [password, setPassword] = useState("123456");
  const [reportsTo, setReportsTo] = useState("");
  const [lob, setLob] = useState("");
  const [role, setRole] = useState("");

  const [allRoles, setAllRoles] = useState([]);
  const [allSupervisors, setAllSupervisors] = useState([]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const createdBy = userInfo.firstname + " (" + userInfo.role + ")";
  const profilePic = "";

  useEffect(() => {
    if (successRegister) {
      dispatch({
        type: USER_REGISTER_RESET,
      });
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    async function fetchSupervisors() {
      const request = await axios.get(
        baseUrl + "/api/v1/users/supervisors",
        config
      );
      setAllSupervisors(request?.data?.data);
      return request;
    }
    async function fetchRoles() {
      const request = await axios.get(baseUrl + "/api/v1/roles", config);
      setAllRoles(request?.data?.roles);
      return request;
    }

    fetchSupervisors();
    fetchRoles();
  }, [successRegister, dispatch, userInfo]);

  const createUserHandler = (e) => {
    e.preventDefault();
    setShowToast(true);
    dispatch(
      userRegisterAction(
        firstname,
        middlename,
        lastname,
        email,
        userId,
        contactNo,
        password,
        reportsTo,
        lob,
        role,
        createdBy,
        profilePic
      )
    );
  };

  return (
    <>
      <form onSubmit={createUserHandler}>
        {errorRegister && (
          <Toast
            show={showToast}
            onClose={() => setShowToast(false)}
            delay={6000}
            autohide>
            <Toast.Body>
              <span>
                <i className="fas fa-exclamation-circle" />
              </span>
              <p>{errorRegister}</p>
              <span onClick={() => setShowToast(false)}>
                <i className="fas fa-times" />
              </span>
            </Toast.Body>
          </Toast>
        )}
        <div className="create-user-form-grid">
          <div className="form-ctrl">
            <label>First name</label>
            <input
              type="text"
              placeholder="Enter user's first name"
              required
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div className="form-ctrl">
            <label>Last Name</label>
            <input
              type="text"
              placeholder="Enter user's last name"
              required
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div className="form-ctrl">
            <label>Middle Name</label>
            <input
              type="text"
              placeholder="Enter user's middle name"
              value={middlename}
              onChange={(e) => setMiddlename(e.target.value)}
            />
          </div>
          <div className="form-ctrl">
            <label>Agent ID</label>
            <input
              type="text"
              placeholder="Enter user's ID"
              required
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <div className="form-ctrl">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter user's email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-ctrl">
            <label>Contact No</label>
            <input
              type="text"
              placeholder="Enter user's phone number"
              required
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
            />
          </div>
          <div className="form-ctrl">
            <label>Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required>
              <option>Select user's role</option>
              {allRoles?.map((item) => (
                <option key={item?._id} value={item?._id}>
                  {item?.roleDescription}
                </option>
              ))}
            </select>
          </div>
          <div className="form-ctrl">
            <label>LOB</label>
            <select
              value={lob}
              onChange={(e) => setLob(e.target.value)}
              required>
              <option>Select user's LOB</option>
              <option value="Access">Access</option>
              <option value="Access Card">Access Card</option>
              <option value="Aura">Aura</option>
              <option value="Branch">Branch</option>
              <option value="Fairmoney">Fair Money</option>
              <option value="Airtel-Outbound">Airtel Outbound</option>
              <option value="Voisa">Voisa</option>
              <option value="outcess_chat">Outcess Chat</option>
              <option value="Mantrac">Mantrac</option>
              <option value="Airtel-NIN">Airtel-NIN</option>
            </select>
          </div>
          <div className="form-ctrl">
            <label>Supervisor</label>
            <select
              value={reportsTo}
              onChange={(e) => setReportsTo(e.target.value)}
              required>
              <option>Select user's supervisor</option>
              {allSupervisors.map((item) => (
                <option key={item?._id} value={item?._id}>
                  {item?.firstname} {item?.lastname}
                </option>
              ))}
            </select>
          </div>
          <div className="form-ctrl">
            <label>Default Password</label>
            <input
              type="text"
              placeholder="Enter user's default password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="disposition-btn">
          <input
            type="submit"
            disabled={loadingRegister && true}
            value={loadingRegister ? "Creating..." : "Create"}
          />
        </div>
      </form>
    </>
  );
};

export default CreateNewUser;
