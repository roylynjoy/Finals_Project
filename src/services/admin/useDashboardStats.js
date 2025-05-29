import { useState, useEffect } from 'react';

const useDashboardStats = (baseURL) => {
  const [companies, setCompanies] = useState([]);
  const [coordinators, setCoordinators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [compRes, usersRes] = await Promise.all([
          fetch(`${baseURL}/companies`),
          fetch(`${baseURL}/users`)
        ]);
        const compData = await compRes.json();
        const userData = await usersRes.json();
        setCompanies(compData);
        setCoordinators(userData.filter(user => user.role === 'Coordinator'));
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [baseURL]);

  return { companies, coordinators, loading };
};

export default useDashboardStats;
