
import React, { useState, useEffect } from "react";
import { onJobPostUpdate } from "../socketClient";

const JobBoard = async () => {
  try {
    const jobs = await getJobs();
    const jobList = jobs.map(job => JobCard(job)).join("");
    const { getJobs } = require("../utils/api");
    const JobCard = require("./JobCard");
    return `
      <div class="job-board">
        <h2>Available Jobs</h2>
        <div class="job-list">${jobList}</div>
      </div>
    `;
  } catch (error) {
    return `<p>Error loading jobs.</p>`;
  }
};


  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    onJobPostUpdate((job) => {
      setJobs((prevJobs) => [job, ...prevJobs]);
    });
  }, []);

  return (
    <div>
      <h2>Job Board</h2>
      {jobs.map((job, index) => (
        <div key={index}>
          <h3>{job.title}</h3>
          <p>{job.description}</p>
        </div>
      ))}
    </div>
  );

module.exports = JobBoard;



  