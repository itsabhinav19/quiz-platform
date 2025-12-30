// import React, { useState } from 'react'
// import './LoginSignup.css'
// import user_icon from '../Assets/person.png'
// import email_icon from '../Assets/email.png'
// import password_icon from '../Assets/password.png'

// const LoginSignup = () =>{

//     const [action,setAction]= useState("Sign Up");
//     return(
//         <div>
//             <div className="container">
//                 <div className="header">
//                     <div className="text">{action}</div>
//                     <div className="underline"></div>
//                 </div>
//                 <div className="inputs">
//                     {action==="Sign Up"?<div className="input">
//                         <img src={user_icon} alt="" />
//                         <input type="text" placeholder="Name"/>
//                     </div>:null}
//                     <div className="input">
//                         <img src={email_icon} alt="" />
//                         <input type="email" placeholder="Email Id" />
//                     </div>
//                     <div className="input">
//                         <img src={password_icon} alt="" />
//                         <input type="password" placeholder="Password"/>
//                     </div>
//                 </div>
//                 {action==="Sign Up"?<div></div>:<div className="forgot-password">Lost Password? <span>Click here!</span></div>}
                
//             <div className="submit-container">
//                 <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
//                 <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
//             </div>
//             </div>
            
//         </div>
//     )
// }

// export default LoginSignup

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginSignup.css";
import bgImage from "../../Assets/background2.jpg";
import user_icon from "../../Assets/person.png";
import email_icon from "../../Assets/email.png";
import password_icon from "../../Assets/password.png";

const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    // const url =
    //   action === "Login"
    //     ? "http://localhost:5000/api/auth/login"
    //     : "http://localhost:5000/api/auth/register";
    const url =
    action === "Login"
      ? `${import.meta.env.VITE_API_URL}/auth/login`
      : `${import.meta.env.VITE_API_URL}/auth/register`;

    const body =
      action === "Login"
        ? { email: formData.email, password: formData.password }
        : { name: formData.name, email: formData.email, password: formData.password };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Authentication failed");
        return;
      }

      // save token
      localStorage.setItem("token", data.token);

      // redirect to quiz
      navigate("/quiz");
    } catch (err) {
      setMessage("Server error");
    }
  };

  return (
    <div className="auth-bg" 
    style={{ backgroundImage: `url{${bgImage}}`}}>
      <div className="container">
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>

        <div className="inputs">
          {action === "Sign Up" && (
            <div className="input">
              <img src={user_icon} alt="" />
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="input">
            <img src={email_icon} alt="" />
            <input
              type="email"
              name="email"
              placeholder="Email Id"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="input">
            <img src={password_icon} alt="" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>

        {action === "Login" && (
          <div className="forgot-password">
            Lost Password? <span>Click here!</span>
          </div>
        )}

        {message && (
          <p style={{ textAlign: "center", color: "red" }}>{message}</p>
        )}

<div className="submit-container">
        <button
          className={action === "Sign Up" ? "submit" : "submit gray"}
          onClick={() => {
            if (action === "Sign Up") {
              handleSubmit();
            } else {
              setAction("Sign Up");
              setMessage("");
            }
          }}
        >
          Sign Up
        </button>

        <button
          className={action === "Login" ? "submit" : "submit gray"}
          onClick={() => {
            if (action === "Login") {
              handleSubmit();
            } else {
              setAction("Login");
              setMessage("");
            }
          }}
        >
          Login
        </button>
      </div>

        {/* <button className="submit" onClick={handleSubmit}>
          {action}
        </button> */}
      </div>
    </div>
  );
};

export default LoginSignup;
