import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PendingCard from './PendingCard';

const PendingApplicationsList = () => {
  const [applications, setApplications] = useState([]);

  const URL = 'http://localhost:5000/api/v1/pendingapplication';

  const getApplications = async () => {
    try {
      const response = await axios.get(URL);
      const data = response.data;
      setApplications(data.pendingApplications);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApplications();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Pending Applications</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-16">
        {applications.map((application, index) => (
          <PendingCard key={index} application={application} />
        ))}
      </div>
    </div>
  );
};

export default PendingApplicationsList;
