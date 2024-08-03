import { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../Message';


function VerifyOTP() {

    const [otp, setOTP] = useState('');
    const location = useLocation();
    const email = location.state?.email || "vijayrajak891@gmail.com";

    const Navigate = useNavigate();

    const handleChange = (e) =>{
        setOTP(e.target.value);
    }

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        if (!otp) {
          return handleError('OTP is required')
        }
        try {
            const url = "https://authentication-app-api-sigma.vercel.app/auth/verify-otp";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, otp })
            });
            const result = await response.json();
            if (result.success) {
                handleSuccess(result.message);
                setTimeout(() => {
                    Navigate('/reset-password', { state: { email, otp } });
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
        <h1>Enter OTP</h1>
        <form onSubmit={handleVerifyOTP}>
            <div>
                <label htmlFor="otp">OTP</label>
                <input
                    type="text"
                    name="otp"
                    placeholder="Enter the OTP sent to your email.."
                    value={otp}
                    onChange={handleChange}
                />
            </div>
            <button type="sumbit">Verify OTP</button>
        </form>
    </div>
      <ToastContainer />
    </div>
  );
}

export default VerifyOTP;
