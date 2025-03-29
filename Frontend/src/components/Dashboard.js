import React, { useEffect, useState } from "react";
import { getUserProfile } from "../utils/api";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserProfile().then((data) => setUser(data));
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome {user.name}</h1>
      <p>Your email: {user.email}</p>
    </div>
  );
};

export default Dashboard;
