import React, { useState } from 'react';
import Styles from  './LoginFormCompany.module.css';
import {NavLink, useNavigate} from 'react-router-dom'
import NavBar from "../../Layout/NavBar";
import Footer from "../../Layout/Footer";
import axios from 'axios'

const LoginFormCompany = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      setIsLoading(true);
      const response = await axios.post('https://api.joben.am/login_company', formData);
      setSuccessMessage("Successfuly logged in!")
      const { access_token, company: loggedInCompany } = response.data;
      localStorage.setItem('accessToken', access_token);
      localStorage.setItem('company', loggedInCompany)
      navigate('/companyMain')
      
     // Assuming backend returns access_token and refresh_token
      // Handle successful login, maybe store tokens in local storage or state
    } catch (error) {
      setError(error.response.data.detail);
      console.log('An error occurred:', error);
      setSuccessMessage("Login Failed!")
  } finally {
      setIsLoading(false); // Reset loading state
  }
  };

    return (
    <div>
        <NavBar />
    <div className={Styles.body1}>
        <div className={Styles.wrapper}>
            <form action="">
                <h1>Sign in</h1>
                <div className={Styles.input_box}>
                <input type="text" placeholder='Enter email or user name' value={username} onChange={(e)=>setUsername(e.target.value)}required />
                </div>
                <div className={Styles.input_box}>
                <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
                </div>

                <div className={Styles.remember_forgot}>
                <a href="#">Forgot password?</a>
                </div>
               
                <button type="button" onClick={handleLogin}>Login</button>
                {<p>{successMessage}</p>}
                
            
            <div className={Styles.additional_text}>
                <h1>Sign in to</h1>
                <h4>Lorem ipsum is simply</h4>
                <p>If you don't have an account register</p>
                
            </div>
            <div className={Styles.register_link}>
                <p>You can <NavLink to='/register_company'>Register here!</NavLink></p>
            </div>

           <div className={Styles.adding}>
            <p>or continue with</p>
            <div className={Styles.social_icons}>
                        <a href="URL_FOR_FACEBOOK"><i className="fab fa-facebook-f" style={{ color: '#3b5998' }}></i></a>
                        <a href="URL_FOR_APPLE"><i className="fab fa-apple" style={{ color: '#000' }}></i></a>
                        <a href="URL_FOR_GOOGLE"><i className="fab fa-google" style={{ color: '#EA4335' }}></i></a>
            </div>
           </div>
            </form>
        </div>
        </div>
        <Footer />
        </div>
        
        
    );
};

export default LoginFormCompany;