import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddEditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    description: '',
    requirements: [],
    expiryDate: ''
  });
  const [currentRequirement, setCurrentRequirement] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      const fetchJob = async () => {
        try {
          setLoading(true);
          const token = localStorage.getItem('token');
          const res = await axios.get(`${process.env.REACT_APP_API_URL}/jobs/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setJob(res.data);
        } catch (err) {
          toast.error(err.response?.data?.message || 'Error fetching job');
        } finally {
          setLoading(false);
        }
      };
      fetchJob();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob(prev => ({ ...prev, [name]: value }));
  };

  const addRequirement = () => {
    if (currentRequirement.trim()) {
      setJob(prev => ({
        ...prev,
        requirements: [...prev.requirements, currentRequirement.trim()]
      }));
      setCurrentRequirement('');
    }
  };

  const removeRequirement = (index) => {
    setJob(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      if (isEditMode) {
        await axios.patch(
          `${process.env.REACT_APP_API_URL}/jobs/${id}`,
          job,
          config
        );
        toast.success('Job updated successfully!');
      } else {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/jobs`,
          job,
          config
        );
        toast.success('Job added successfully!');
        setJob({
          title: '',
          company: '',
          location: '',
          salary: '',
          description: '',
          requirements: [],
          expiryDate: ''
        });
      }

      setTimeout(() => {
        if (isEditMode) {
          navigate(`/jobs/${id}`);
        } else {
          navigate('/');
        }
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving job');
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode) {
    return <div className="container">Loading job details...</div>;
  }

  return (
    <div className="job-form">
      <h2>{isEditMode ? 'Edit Job' : 'Add New Job'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Job Title *</label>
          <input
            type="text"
            name="title"
            value={job.title}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label>Company *</label>
          <input
            type="text"
            name="company"
            value={job.company}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label>Location *</label>
          <input
            type="text"
            name="location"
            value={job.location}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label>Salary</label>
          <input
            type="text"
            name="salary"
            value={job.salary}
            onChange={handleChange}
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label>Description *</label>
          <textarea
            name="description"
            value={job.description}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label>Requirements *</label>
          <div className="requirements-input">
            <input
              type="text"
              value={currentRequirement}
              onChange={(e) => setCurrentRequirement(e.target.value)}
              disabled={loading}
              placeholder="Add a requirement"
            />
            <button
              type="button"
              onClick={addRequirement}
              className="btn btn-small"
              disabled={loading || !currentRequirement.trim()}
            >
              Add
            </button>
          </div>
          {job.requirements.length > 0 && (
            <ul className="requirements-list">
              {job.requirements.map((req, index) => (
                <li key={index}>
                  {req}
                  <button
                    type="button"
                    onClick={() => removeRequirement(index)}
                    className="btn btn-small btn-danger"
                    disabled={loading}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="form-group">
          <label>Expiry Date *</label>
          <input
            type="date"
            name="expiryDate"
            value={job.expiryDate}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Processing...' : isEditMode ? 'Update Job' : 'Post Job'}
        </button>
        <button
          type="button"
          onClick={() => navigate(isEditMode ? `/jobs/${id}` : '/')}
          className="btn btn-secondary"
          disabled={loading}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddEditJob;
       