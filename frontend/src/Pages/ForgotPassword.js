import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../Message';


function ForgotPassword() {

    const [email,setEmail] = useState()
    // const [timer, setTimer] = useState(20);
    // const [showResendButton, setShowResendButton] = useState(false);

    const Navigate = useNavigate();

    const handleChange = (e) =>{
        setEmail(e.target.value);
    }

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        // setShowResendButton(false);
        // setTimer(20);
        if (!email) {
          return handleError('Email is required')
        }
        try {
            const url = "http://localhost:9090/auth/forgot-password";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email})
            });
            const result = await response.json();
            const { success, message} = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    Navigate('/verify-otp', { state: { email } })
                }, 1000)
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError(err);
        }
    }

    // useEffect(() => {
    //     let interval;
    //     if (timer > 0) {
    //         interval = setInterval(() => {
    //             setTimer((prev) => prev - 1);
    //         }, 1000);
    //     } else {
    //         setShowResendButton(true);
    //     }
    //     return () => clearInterval(interval);
    // }, [timer]);

  return (
    <div>
    <div className="container">
        <h1>Forgot Password</h1>
        <form onSubmit={handleForgotPassword}>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email..."
                    value={email}
                    onChange={handleChange}
                />
            </div>
            <button type="sumbit">Send OTP</button>
            {/* {showResendButton ? (
                <button onClick={handleForgotPassword}>Resend OTP</button>
            ) : (
                <p>Resend OTP in {timer} seconds</p>
            )} */}
        </form>
    </div>
      <ToastContainer />
    </div>
  );
}

export default ForgotPassword;
