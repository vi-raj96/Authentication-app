import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../Message';


function Signup() {

    const [signupInfo,setSignupInfo] = useState({
        name : "",
        email : "",
        password : ""
    })

    const Navigate = useNavigate();

    const handleChange = (e) =>{
        const { name, value } = e.target;
        console.log(name, value);
        const tempSignupInfo = {...signupInfo};
        tempSignupInfo[name]=value;
        setSignupInfo(tempSignupInfo);
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
        if (!name) {
            return handleError('Name is required')
        }
        if (!email) {
            return handleError('Email is required')
        }
        if (!password) {
            return handleError('Password is required')
        }
        try {
            const url = "https://authentication-app-api-sigma.vercel.app/auth/signup";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    Navigate('/login')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError(err);
        }
    }

  return (
    <div>
    <div className="container">
        <h1>Sign up</h1>
        <form onSubmit={handleSignup}>
            <div>
                <label htmlFor="name">Name</label>
                <input
                    type="string"
                    name="name"
                    autoFocus
                    placeholder="Enter your name..."
                    value={signupInfo.name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email..."
                    value={signupInfo.email}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password..."
                    value={signupInfo.password}
                    onChange={handleChange}
                />
            </div>
            <button type="sumbit">Submit</button>
            <span>Already have an account ?
                    <Link to="/login">Login</Link>
            </span>
        </form>
    </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
