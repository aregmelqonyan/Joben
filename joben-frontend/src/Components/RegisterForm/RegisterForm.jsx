import React, { useState } from 'react';
import Styles from './RegisterForm.module.css';
import NavBar from '../../Layout/NavBar';
import Footer from '../../Layout/Footer';
import {NavLink, useNavigate} from 'react-router-dom'
import axios from 'axios'

const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState); // Toggle the current state
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(prevState => !prevState); // Toggle the current state
    };

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [contact_info, setContact_info] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    localStorage.setItem("storedEmail", email)

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
          const verification_code = '';
          const response = await axios.post('https://api.joben.am/register', { username, email, contact_info, password, verification_code });
          setSuccessMessage("Registered Successfully!")
          navigate('/verify');
        } catch (error) {
          setError(error.response.data.detail);
          setSuccessMessage("Registration Failed!")
        }
      };

    return (
        <div>
            <NavBar />
            <div className={Styles.body2}>
                <div className={Styles.wrapper}>
                    <form action="" method='post' onSubmit={handleRegister}>
                        <h1>Sign Up</h1>
                        <div className={Styles.input_box}>
                            <input type="text" placeholder='Enter email' value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>
                        <div className={Styles.input_box}>
                            <input type="text" placeholder='Create User name' value={username} onChange={e => setUsername(e.target.value)} required />
                        </div>
                        <div className={Styles.input_box}>
                            <input type="tel" placeholder='Contact number' pattern='^(?:\+374\d{8}|0\d{8,9})$' value={contact_info} onChange={e => setContact_info(e.target.value)} required />
                        </div>
                        <div className={Styles.input_box}>
                            <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />

                            <i
                                className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`} // Corrected class
                                onClick={togglePasswordVisibility}
                                style={{ color: '#3b5998' }}
                            ></i>
                        </div>
                        <div className={Styles.input_box}>
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Confirm Password"
                                required
                            />
                            <i
                                className={`fas ${showConfirmPassword ? 'fa-eye' : 'fa-eye-slash'}`} // Corrected class
                                onClick={toggleConfirmPasswordVisibility}
                                style={{ color: '#3b5998' }}
                            ></i>
                        </div>
                        <button type="submit" method="post">Register</button>
                        {<p>{successMessage}</p>}
                        <div className={Styles.additional_text}>
                            <h1>Sign Up to</h1>
                            <h4>Lorem ipsum is simply</h4>
                            <p>If you already have an account register</p>
                        </div>
                        <div className={Styles.register_link}>
                            <p>You can <NavLink to='/login'>login here!</NavLink></p>
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

export default RegisterForm;
