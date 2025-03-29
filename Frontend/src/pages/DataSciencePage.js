import React from 'react';
import ResumeCustomizationTool from '../components/ResumeCustomizationTool';
import resumeContent from '../data/resumeContent';
import "../styles/global.css";

const DataSciencePage    = () => (
  <div>
        
  
    <ResumeCustomizationTool resumeContent={resumeContent} />
  </div>
);

export default DataSciencePage ;


