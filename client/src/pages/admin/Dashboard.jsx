import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import BlogTableItem from "../../components/admin/BlogTableItem";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { axios } = useAppContext();

  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/admin/dashboard");
      if (data.success) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message || "Failed to load dashboard data");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="flex-1 p-4 md:p-10">
      {/* Dashboard Cards */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-4 text-light bg-primary p-3 min-w-56 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_1} alt="icon" className="w-12" />
          <div>
            <p className="text-xl font-semibold text-light">
              {dashboardData.blogs}
            </p>
            <p className="text-gray-200">Blogs</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-light bg-primary p-3 min-w-56 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_2} alt="icon" className="w-12" />
          <div>
            <p className="text-xl font-semibold text-light">
              {dashboardData.comments}
            </p>
            <p className="text-gray-200">Comments</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-light bg-primary p-3 min-w-56 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_3} alt="icon" className="w-12" />
          <div>
            <p className="text-xl font-semibold text-light">
              {dashboardData.drafts}
            </p>
            <p className="text-gray-200">Drafts</p>
          </div>
        </div>
      </div>

      {/* Recent Blogs Table */}
      <div>
        <div className="flex items-center gap-3 m-4 mt-6 text-gray-800">
          <img src={assets.dashboard_icon_4} alt="icon" />
          <p className="font-semibold text-lg text-primary">Latest Blogs</p>
        </div>

        <div className="max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide">
          <table className="w-full text-sm text-gray-600">
            <thead className="text-xs bg-gray-200 text-gray-800 text-left uppercase">
              <tr>
                <th className="px-2 py-4">#</th>
                <th className="px-2 py-4">Blog Title</th>
                <th className="px-2 py-4 max-sm:hidden">Date</th>
                <th className="px-2 py-4 max-sm:hidden">Status</th>
                <th className="px-2 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentBlogs.map((blog, index) => (
                <BlogTableItem
                  key={blog._id}
                  blog={blog}
                  fetchBlogs={fetchDashboardData}
                  index={index + 1}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
