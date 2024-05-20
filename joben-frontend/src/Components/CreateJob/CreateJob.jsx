import React, { useState } from 'react';
import styles from './CreateJob.module.css'; 
import NavBar from '../../Layout/NavBar';
import NavBarCompany from '../../Layout/NavBarCompany';
import NavBarUser from '../../Layout/NavBarUser';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CreateJob()  {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    company_name: '',
    location: '',
    salary: '',
    job_type: '',
    industry: '',
    level: '',
    education_level: '',
    required_skills: '',
    deadline: '',
    contact_information: '',
    remote_work: '',
  });


  const navigate = useNavigate();
  const [showFirstFields, setShowFirstFields] = useState(true); // Initially show the first fields
  const [showSecondFields, setShowSecondFields] = useState(false);

  const [successMessage, setSuccessMessage] = useState('');
  const accessToken = localStorage.getItem('accessToken');
  const company = localStorage.getItem('company');
  const handleSubmit = async (e) => { // Make the function asynchronous
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        return;
    }
      const response = await axios.post('https://api.joben.am/jobs/', formData, {
        headers: {
        Authorization: `Bearer ${accessToken}`,
        }
    }); // Adjust the URL and method as per your backend API
      console.log(response.data); // Log the response for debugging
      setSuccessMessage('Successful Application');
      setFormData({
        title: '',
        description: '',
        company_name: '',
        location: '',
        salary: '',
        job_type: '',
        industry: '',
        level: '',
        education_level: '',
        required_skills: '',
        deadline: '',
        contact_information: '',
        remote_work: '',
      });
      navigate('/jobs')
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    setTimeout(() => {
      setSuccessMessage('');
    }, 5000); 
  };

  const ShowSecondFields = () => {
    setShowFirstFields(false);
    setShowSecondFields(true);
  }

  const handleInputChange = (e) => {
    const { name, value} = e.target;

    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      {(!accessToken && !company) && <NavBar />}
      {(accessToken && !company) && <NavBarUser />}
      {(accessToken && company) && <NavBarCompany />}
      <div className={styles.app}>
        <div className={styles.applicationBox}>
          <h2>Application Form</h2>
          <form onSubmit={handleSubmit}>
            {showFirstFields && (
              <div className="first-div">
                <div className={styles.userBox}>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                  <label>title</label>
                </div>
                <div className={styles.userBox}>
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                  <label>Description</label>
                </div>
                <div className={styles.userBox}>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  />
                  <label>Location</label>
                </div>
                <div className={styles.userBox}>
                  <input
                    type="text"
                    name="job_type"
                    value={formData.job_type}
                    onChange={handleInputChange}
                    required
                  />
                  <label>Job Type</label>
                </div>
                <div className={styles.userBox}>
                  <input
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    required
                  />
                  <label>Industry</label>
                </div>
                <button name='Next Fields' className={styles.next_button} onClick={ShowSecondFields}>Next</button>
              </div>
            )}
          
            {showSecondFields && (
              <div className={styles.second_div}>
                <div className={styles.userBox}>
                  <input
                    type="text"
                    name="level"
                    value={formData.level}
                    onChange={handleInputChange}
                    required
                  />
                  <label>Job Level</label>
                </div>
                <div className={styles.userBox}>
                  <input
                    type="text"
                    name="education_level"
                    value={formData.education_level}
                    onChange={handleInputChange}
                    required
                  />
                  <label>Education Level</label>
                </div>
                <div className={styles.userBox}>
                  <input
                    type="text"
                    name="required_skills"
                    value={formData.required_skills}
                    onChange={handleInputChange}
                    required
                  />
                  <label>Skills</label>
                </div>
                <div className={styles.userBox}>
                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.userBox}>
                  <input
                    type="tel"
                    name="contact_information"
                    value={formData.contact_information}
                    onChange={handleInputChange}
                    required
                  />
                  <label>Contact</label>
                </div>
                <div className={styles.userBox}>
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                    required
                  />
                  <label>Salary</label>
                </div>
                <label htmlFor='remoteWork'>RemoteWork</label><br></br>
                <div className={styles.userBox}>
                  <select
                    id="remoteWork"
                    name="remoteWork"
                    value={formData.remoteWork}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
            )}
            <button type="submit" className={styles.button}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Submit
            </button>
            {successMessage && <p>{successMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};
