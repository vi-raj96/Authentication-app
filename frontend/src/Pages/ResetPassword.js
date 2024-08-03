import { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../Message';


function ResetPassword() {

    const [password,setNewPassword] = useState('')
    const location = useLocation();
    const email = location.state?.email || "vijayrajak891@gmail.com";
    const otp = location.state?.otp || "4444";

    const Navigate = useNavigate();

    const handleChange = (e) =>{
        setNewPassword(e.target.value);
    }

    const handleNewPassword= async (e) => {
        e.preventDefault();
        if (!password) {
          return handleError('Password is required')
        }
        try {
            const url = "http://localhost:9090/auth/reset-password";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, otp, password })
            });
            const result = await response.json();
            if (result.success) {
                handleSuccess(result.message);
                setTimeout(() => {
                    Navigate('/login')
                }, 1000)
            } else {
                handleError(result.message);
            }
        } catch (err) {
            handleError(err.message);
        }
    }

  return (
    <div>
    <div className="container">
        <h1>Reset Password</h1>
        <form onSubmit={handleNewPassword}>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Enter your new password.."
                    value={password}
                    onChange={handleChange}
                />
            </div>
            <button type="sumbit">Reset Password</button>
        </form>
    </div>
      <ToastContainer />
    </div>
  );
}

export default ResetPassword;
