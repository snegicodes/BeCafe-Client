import Base from "../components/Base";
import ManageOrderComp from "../components/ManageOrderComp";
import SideBar from "../components/sidebar/SideBar";

const ManageOrder = () => {
  return (
    <Base>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <SideBar />
        </div>

        <div style={{ flex: 4 }}>
          <ManageOrderComp />
        </div>
      </div>
    </Base>
  );
};

export default ManageOrder;
