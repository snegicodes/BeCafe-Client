import { useEffect, useState } from "react";
import Base from "../components/Base";
import DashboardComp from "../components/DashboardComp";
import SideBar from "../components/sidebar/SideBar";
import axios from "axios";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState();

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("data"));
    let userToken = data.token;

    const apiUrl = "https://be-cafe-server.vercel.app/dashboard/details";

    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };

    axios
      .get(apiUrl, config)
      .then((response) => {
        setDashboardData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <Base>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <SideBar />
        </div>

        <div style={{ flex: 4 }}>
          <DashboardComp dashboardData={dashboardData} />
        </div>
      </div>
    </Base>
  );
};

export default Dashboard;
