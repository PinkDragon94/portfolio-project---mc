import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/jobs/${id}`);
        setJob(res.data);
        setLoading(false);
      } catch (err) {
        setError('Job not found');
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${id}`);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="container">Loading...</div>;
  if (error) return <div className="container">{error}</div>;

  return (
    <div className="job-details">
      <h2>{job.title}</h2>
      <h3>{job.company} - {job.location}</h3>
      {job.salary && <p><strong>Salary:</strong> {job.salary}</p>}
      <p><strong>Posted:</strong> {new Date(job.postedDate).toLocaleDateString()}</p>
      <p><strong>Expires:</strong> {new Date(job.expiryDate).toLocaleDateString()}</p>
      
      <div className="job-description">
        <h4>Job Description</h4>
        <p>{job.description}</p>
      </div>
      
      <div className="job-requirements">
        <h4>Requirements</h4>
        <ul>
          {job.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      </div>
      
      <div className="job-actions">
        <Link to={`/edit/${job._id}`} className="btn btn-secondary">Edit</Link>
        <button onClick={handleDelete} className="btn btn-danger">Delete</button>
        <Link to="/" className="btn">Back to Jobs</Link>
      </div>
    </div>
  );
};

export default JobDetails;