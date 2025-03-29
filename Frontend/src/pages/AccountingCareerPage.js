import React from 'react';
import CareerPageTemplate from '../components/CareerPageTemplate';
import { experienceData } from '../data/experienceData';

const AccountingCareerPage = () => (
  <CareerPageTemplate

    education={["Bachelor's Degree in Accounting", "Certified Public Accountant (CPA)"]}
    skills={["Financial analysis", "Budgeting", "Audit compliance"]}
    experience={experienceData.accountingCareer}
    communityService={["Tax preparation for low-income families"]}
    clubs={["Finance Club", "Accounting Society"]}
  />
);

export default AccountingCareerPage;
