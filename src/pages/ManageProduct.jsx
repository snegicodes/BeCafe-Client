import Base from "../components/Base";
import ManageProductComp from "../components/ManageProductComp";
import SideBar from "../components/sidebar/SideBar";

const ManageProduct = () => {
  return (
    <Base>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <SideBar />
        </div>

        <div style={{ flex: 4 }}>
          <ManageProductComp />
        </div>
      </div>
    </Base>
  );
};

export default ManageProduct;
