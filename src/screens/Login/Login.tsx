import React, { useState, useEffect } from "react";
import { Carousel, Spinner } from "react-bootstrap";
import first from "../../assets/img/wall-img1.jpeg";
import second from "../../assets/img/wall-img2.jpeg";
import third from "../../assets/img/wall-img3.jpeg";
import fourth from "../../assets/img/wall-img4.jpeg";
import fifth from "../../assets/img/wall-img5.jpeg";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/useStore";
import { login, reset } from "../../features/Auth/authSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { customId } from "../../components/TableOptions";

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const [userId, setUserId] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [showPassword, setShowPassword] = useState<any>(false);
  const { user, isLoading, isError, message } = useAppSelector((state: { auth: any; }) => state.auth)


  useEffect(() => {
    if (user) {
      // navigate("/dashboard");
      window.location.replace("/dashboard");
    }
  }, [navigate, user]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values = { userId: userId, password: password };
    // @ts-ignore
    dispatch(login(values));
  };



  // Error Handling Effect
  useEffect(() => {
    if (isError) {
      // Display an error toast with the message and reset the state 
      toast.error(message, {
        toastId: customId
      });
      dispatch(reset());
    }
  }, [dispatch, isError, message]);


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
        <Carousel.Item interval={50000}>
          <img className="d-block w-100" src={fifth} alt="Fifth" />
        </Carousel.Item>
      </Carousel>

      <div className="login-container">
        <ToastContainer position="top-right" />
        <div className="login-content-layout">
          <div className="login-content-grid">
            <div className="logo-section">

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

                  <span id="i-FaEye" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isLoading && true}
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
