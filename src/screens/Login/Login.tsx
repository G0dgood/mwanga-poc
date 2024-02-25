import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Carousel, Spinner, Toast } from "react-bootstrap";
import first from "../../assets/img/wall-img1.jpeg";
import second from "../../assets/img/wall-img2.jpeg";
import third from "../../assets/img/wall-img3.jpeg";
import fourth from "../../assets/img/wall-img4.jpeg";
import fifth from "../../assets/img/wall-img5.jpeg";
import logo from "../../assets/img/outcess-logo-white.png";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/useStore";
import { login } from "../../features/Auth/authSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  const [userId, setUserId] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [showPassword, setShowPassword] = useState<any>(false);

  const [showToast, setShowToast] = useState(false);

  const { user, isLoading, isError, message } = useAppSelector((state: { auth: any; }) => state.auth)


  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate, user]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values = { userId: userId, password: password };
    // @ts-ignore
    dispatch(login(values));
  };






  return (
    <div id="login-wrapper">
      <Carousel fade>
        <Carousel.Item interval={50000}>
          <img className="d-block w-100" src={first} alt="First" />
        </Carousel.Item>
        <Carousel.Item interval={50000}>
          <img className="d-block w-100" src={second} alt="Second" />
        </Carousel.Item>
        <Carousel.Item interval={50000}>
          <img className="d-block w-100" src={fourth} alt="Third" />
        </Carousel.Item>
        <Carousel.Item interval={50000}>
          <img className="d-block w-100" src={third} alt="Fourth" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={fifth} alt="Fifth" />
        </Carousel.Item>
      </Carousel>

      <div className="login-container">
        <div className="login-content-layout">
          {isError && (
            <Toast
              onClose={() => setShowToast(false)}
              show={showToast}
              delay={4000}
              autohide>
              <Toast.Body>
                <span>
                  <i className="fas fa-exclamation-circle" />
                </span>
                <p>{message}</p>
                <span onClick={() => setShowToast(false)}>
                  <i className="fas fa-times" />
                </span>
              </Toast.Body>
            </Toast>
          )}

          <div className="login-content-grid">
            <div className="logo-section">
              {/* <div>
                <img src={logo} className="d-block w-100" alt="Outcess Logo" />
              </div> */}
              <h1 className="people">
                <span className="letter1">Peopl</span>
                <span className="rotate letter6">e</span>
              </h1>
              <h1 className="people_p">CRM</h1>
            </div>

            <div className="login-form-container">
              <p>Sign in</p>
              <form onSubmit={submitHandler}>
                <div className="form-ctrl">
                  <label>Agent ID</label>
                  <input
                    type="text"
                    placeholder="Enter your Agent ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                  />
                </div>
                <div className="form-ctrl">
                  <label>Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <span id="i" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isLoading && true}
                  onClick={() => setShowToast(true)}
                >

                  {isLoading ? (
                    <Spinner animation="border" />
                  ) : "Sign-in "}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
