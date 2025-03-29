import React from 'react';
import CareerPageTemplate from '../components/CareerPageTemplate';
import { experienceData } from '../data/experienceData';

const SoftwareEngineeringPage = () => (
  <CareerPageTemplate
    objective="Build and maintain high-quality software solutions."
    education={["Bachelor's in Computer Science", "Online courses in Full Stack Development"]}
    skills={["JavaScript", "React", "Node.js", "MongoDB"]}
    communityService={["Code Mentor at Coding Bootcamp"]}
    clubs={["Tech Innovators Club"]}
    experience={experienceData.softwareCareer}
    projects={["Project A", "Project B", "Project C"]}
  />
);

export default SoftwareEngineeringPage;

