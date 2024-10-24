import React, { useState, useEffect } from "react";
import { FaUsers, FaFilm, FaStar, FaChartLine } from "react-icons/fa";
import { getStatistics } from "../../services/UserServices";

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-2xl text-gray-500 uppercase">{title}</p>
        <p className="text-4xl font-semibold text-red-600 ">{value}</p>
      </div>
      <div className="text-red-600 text-3xl">{icon}</div>
    </div>
  </div>
);

const HomeAdmin = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getStatistics();
        setStats(data);
      } catch (err) {
        console.error('Error fetching statistics:', err);
        setError('Failed to load statistics. Please try again later.');
      }
    };

    fetchStats();
  }, []);

  if (!stats) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6 font-semibold">
      <h1 className="text-3xl mb-6">Dashboard Statistics</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Users" value={stats.userStatistics.totalUsers} icon={<FaUsers />} />
        <StatCard title="Total Films" value={stats.contentStatistics.totalFilms} icon={<FaFilm />} />
        <StatCard title="Total Favorites" value={stats.contentStatistics.totalFavorites} icon={<FaStar />} />
        <StatCard title="Total Genres" value={stats.contentStatistics.totalGenres} icon={<FaChartLine />} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md text-gray-500">
          <h2 className="text-2xl mb-4  text-red-600 ">User Breakdown</h2>
          <p>Admins: <span className="text-3xl text-red-600">{stats.userStatistics.totalAdmins}</span> </p>
          <p>Clients: <span className="text-3xl text-red-600">{stats.userStatistics.totalClients}</span></p>
          <p>Subscribed Users: <span className="text-3xl text-red-600">{stats.userStatistics.totalSubscribedUsers}</span></p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md text-gray-500">
          <h2 className="text-2xl mb-4  text-red-600 ">Top Favorite Films</h2>
          <ul>
            {stats.contentStatistics.topFavoriteFilms.map((film, index) => (
              <li key={index}> <span className="underline">{film.title}</span> - <span className="text-3xl text-red-600">{film.favoriteCount}</span> favorite(s)</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md text-gray-500">
        <h2 className="text-2xl mb-4 text-red-600">User Registrations by Month</h2>
        <ul>
          {stats.userStatistics.usersByMonth.map((month, index) => (
            <li key={index}>{month._id}: <span className="text-3xl text-red-600">{month.count}</span> new users</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomeAdmin;