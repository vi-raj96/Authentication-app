import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../Message';


function Home() {

    const [userDetails,setUserDetails] = useState({});

    const Navigate = useNavigate();

    const fetchUserDetails = async (userDetails) => {
        try {
            const url = "http://localhost:9090/home";
            const response = await fetch(url, {
                headers: {
                    'Authorization': userDetails.jwtToken
                },
            });
            const result = await response.json();
            console.log(result);
        } catch (err) {
            handleError(err);
        }
    }

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('loggedInUser');
        handleSuccess('Logout successfully!!!');
        setTimeout(() => {
          Navigate('/login');
        }, 1000)
    }

    useEffect(() => {
      const userInfo = localStorage.getItem('loggedInUser');
      console.log(userInfo)
      const userData = JSON.parse(userInfo);
      console.log(userData)
      setUserDetails(userData)
      fetchUserDetails(userData);
    }, []);

  return (
    <div>
    <div className="homeContainer">
      <div className="avatar-container">
        <img src="https://media.istockphoto.com/id/1130074510/vector/businessman-avatar-profile-picture-icon-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=5u1JJPFC0l2Pzuhc5-Xk9wvAy_P32X9alUUPHXY9fwo=" alt={`${userDetails.name}'s Avatar`} className="avatar" />
      </div>
        <h3> Welcome {userDetails.name}</h3>
        <hr className="divider"/>
        <div className="user-info">
          <p>Name: {userDetails.name}</p>
          <p>Email: {userDetails.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
    </div>
      <ToastContainer />
    </div>
  );
}

export default Home;
