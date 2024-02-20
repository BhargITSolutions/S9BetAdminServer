import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import the js-cookie library
// import Dashboard from './Dashboard';
import axios from 'axios'

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setisError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [geoLocationn, setGeoLocation] = useState('')
    const [userIP, setuserIP] = useState('')

    const navigate = useNavigate();

    const handleRoute = () => {
        window.location.reload();
        navigate('/dashboard')
        // return redirect('/dashboard');
    };
    useEffect(()=>{
        fetchLoc()
    }, [geoLocationn])
const fetchLoc = async () =>{

     // Fetch user's IP address from an external service
     const responseIP = await fetch("https://api.ipify.org/?format=json");
     const resultIP = await responseIP.json();
     const userIP = resultIP.ip;
     console.log("USER IP IS : "+ userIP)
     setuserIP(userIP)

     const geo = axios.get (`http://ip-api.com/json/${userIP}`).then((response)=> {
        console.log("Geo location : "+JSON.stringify(response.data))
        const locationSend = `${response.data.city}/${response.data.regionName}/${response.data.country}/${response.data.zip}`;

        console.log("Geo location : "+JSON.stringify(locationSend));
        setGeoLocation(locationSend)

     })
     console.log("GEO fucntion : "+geo)
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        // Set loading state to true
        setIsLoading(true);
      
        try {
          
          // Send login request with username, password, and userIP
          const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: username, password, userIP, geoLocationn }),
          });
      
          if (response.ok) {
            const responseData = await response.json();

            if(responseData.data.roleId < 8){

                console.log("Response is : " + JSON.stringify(responseData));
          
                // Cookies handle
                Cookies.set('userName', JSON.stringify(responseData.data.UserName));
                Cookies.set('id', responseData.data.Id);
                Cookies.set('fullName', responseData.data.FullName);
                Cookies.set('roleId', responseData.data.roleId);
                
                // Successful login, handle accordingly
                handleRoute();
                
            } else {
                setisError('You are not authorized')
            }
          } else {
            handleError();
            console.error('Login failed');
          }
        } catch (error) {
          console.error('Error during login:', error);
        } finally {
          // Set loading state back to false after the request is completed
          setIsLoading(false);
        }
      };

    const handleError = () => {
        setisError('Invalid Login Id or Password');
    };

    return (
        <>
            {isLoading && <div className="spinner" id="loader-1" style={{ display: 'block' }}></div>}
            <div className="bg_login">
                <div id="wrapper1">
                    <div className="logo">
                        <img src="/images/4bet.png" alt="..." />
                    </div>
                    <div id="login" className="form">
                        <section className="login_content">
                            <form onSubmit={handleSubmit} acceptCharset="utf-8" autoComplete="off">
                                <span style={{ color: 'red', fontWeight: 'bold' }} id="error" >
                                    {isError}
                                </span>
                                <div>
                                    <label> Username</label>
                                    <div className="linput">
                                        <input
                                            type="text"
                                            name="email"
                                            style={{ paddingLeft: 10, fontWeight: 'bold' }}
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            className="form-control"
                                            placeholder="username"
                                            required={1}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label> Password</label>
                                    <div className="linput">
                                        <input
                                            type="password"
                                            name="password"
                                            style={{ paddingLeft: 10, fontWeight: 'bold' }}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="form-control"
                                            placeholder="Password"
                                            required={1}
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>
                                <div className="checkbox">
                                    <label>
                                        <input type="checkbox" name="remember" id="remember" />
                                        Remember me
                                    </label>
                                    <a style={{ color: '#232323' }} href="" className="download-apk-btn">
                                        <i className="fa fa-android" />
                                    </a>
                                </div>
                                <div>
                                    <button type="submit" className="btn btn-default submit">
                                        Log in
                                    </button>
                                    <h6 style={{ color: '#000', fontWeight: 'bold' }} id="loginMessage">
                                        -
                                    </h6>
                                </div>
                                <div className="clearfix" />
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
