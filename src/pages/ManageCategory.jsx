import Base from "../components/Base";
import ManageCatComp from "../components/ManageCatComp";
import SideBar from "../components/sidebar/SideBar";

const ManageCategory = () => {
  return (
    <Base>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <SideBar />
        </div>

        <div style={{ flex: 4 }}>
          <ManageCatComp />
        </div>
      </div>
    </Base>
  );
};

export default ManageCategory;
