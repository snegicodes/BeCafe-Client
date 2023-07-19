import Base from "../components/Base";
import ViewBillComp from "../components/ViewBillComp";
import SideBar from "../components/sidebar/SideBar";

const ViewBill = () => {
  return (
    <Base>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <SideBar />
        </div>

        <div style={{flex:6}}><ViewBillComp/></div>
        {/* <div style={{ flex: 4 }}>View Bill</div> */}
      </div>
    </Base>
  );
};

export default ViewBill;
