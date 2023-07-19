import Base from "../components/Base";
import ManageUserComp from "../components/ManageUserComp";
import SideBar from "../components/sidebar/SideBar";

const ManageUser = () => {
  return (
    <Base>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <SideBar />
        </div>

        <div style={{ flex: 4 }}>
          <ManageUserComp />
        </div>
      </div>
    </Base>
  );
};

export default ManageUser;
