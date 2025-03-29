import React from 'react';
import CareerPageTemplate from '../components/CareerPageTemplate';
import { experienceData } from '../data/experienceData';
import "../styles/global.css";

const EarlyCareerPage = () => (
  <CareerPageTemplate
    objective="To leverage my foundational skills and experiences in building a successful career."
    education={["High School Diploma", "Relevant coursework or certifications"]}
    skills={["Time management", "Basic computer skills", "Team collaboration"]}
    experience={experienceData.earlyCareer}
   
    communityService={["Volunteering at local shelters", "Community clean-up events"]}
    clubs={["Debate Club", "Sports Team"]}
  />
);

export default EarlyCareerPage;