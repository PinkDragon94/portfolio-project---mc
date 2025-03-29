import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ApplicationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    resume: '',
    coverLetter: ''
  });

  const { resume, coverLetter } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      };

      const body = JSON.stringify({
        job: id,
        resume,
        coverLetter
      });

      await axios.post('http://localhost:5000/api/applications', body, config);
      toast.success('Application submitted successfully');
      navigate(`/jobs/${id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error submitting application');
    }
  };

  return (
    <div className="application-form">
      <h2>Apply for Job</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Resume (URL or text)</label>
          <textarea
            name="resume"
            value={resume}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Cover Letter</label>
          <textarea
            name="coverLetter"
            value={coverLetter}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn">Submit Application</button>
      </form>
    </div>
  );
};

export default ApplicationForm;