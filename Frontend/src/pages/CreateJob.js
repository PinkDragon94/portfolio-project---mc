import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createJob } from '../../redux/features/jobBoard/jobBoardSlice';
import "../styles/global.css";
const CreateJob = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [company, setCompany] = useState('');
    const [location, setLocation] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createJob({ title, description, company, location }));
        setTitle('');
        setDescription('');
        setCompany('');
        setLocation('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Job</h2>
            <input
                type="text"
                placeholder="Job Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
            />
            <button type="submit">Create Job</button>
        </form>
    );
};

export default CreateJob;
