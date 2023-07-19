import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardCard from "./DashboardCard";
import { Card, CardBody, CardTitle } from "reactstrap";

const DashboardComp = (props) => {
  const { dashboardData } = props;
  console.log("props: ", dashboardData);

  return (
    <div>
      <Card
        style={{
          width: "95%",
          marginTop: "10px",
        }}
      >
        <CardBody
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <CardTitle tag="h5">Dashboard</CardTitle>
        </CardBody>
      </Card>
      {dashboardData ? (
        <div
          style={{
            width: "95%",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <div>
            <DashboardCard
              type={dashboardData.category}
              name={"Categories"}
              path={"/managecategory"}
            />
          </div>
          <div>
            <DashboardCard
              type={dashboardData.product}
              name={"Products"}
              path={"/manageproduct"}
            />
          </div>
          <div>
            <DashboardCard
              type={dashboardData.bill}
              name={"Bills"}
              path={"/viewbill"}
            />
          </div>
        </div>
      ) : (
        <div>Loading dashboard data...</div>
      )}
    </div>
  );
};

export default DashboardComp;
