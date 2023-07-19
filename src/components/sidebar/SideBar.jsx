import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SideBar.css";
import {
  faBoxArchive,
  faChalkboard,
  faListCheck,
  faWallet,
  faUser,
  faPizzaSlice,
} from "@fortawesome/free-solid-svg-icons";
import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

const SideBar = ({ isOpen, toggle }) => {
  const [userDetail, setUserDetail] = useState();
  const [userRole, setUserRole] = useState();

  const getUserDetails = () => {
    const token = JSON.parse(localStorage.getItem("data")).token;
    const decodedToken = jwt_decode(token);
    setUserDetail(decodedToken);
    setUserRole(decodedToken.role);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className={classNames("sidebar", { "is-open": isOpen })}>
      <div className="sidebar-header">
        <span color="info" onClick={toggle} style={{ color: "#fff" }}>
          &times;
        </span>
      </div>
      <div className="side-menu">
        <Nav vertical className="list-unstyled pb-3 ">
          <NavItem style={{ marginBottom: "2px" }}>
            <NavLink tag={Link} to={"/dashboard"} className="f-white">
              <FontAwesomeIcon icon={faChalkboard} className="mr-2" />
              Dashboard
            </NavLink>
          </NavItem>
          <NavItem style={{ marginBottom: "2px" }}>
            <NavLink
              tag={Link}
              to={"/managecategory"}
              className="f-white"
              hidden={userRole === "user"}
            >
              <FontAwesomeIcon icon={faBoxArchive} className="mr-2" />
              Manage Category
            </NavLink>
          </NavItem>
          <NavItem style={{ marginBottom: "2px" }}>
            <NavLink
              tag={Link}
              to={"/manageproduct"}
              className="f-white"
              hidden={userRole === "user"}
            >
              <FontAwesomeIcon icon={faListCheck} className="mr-2" />
              Manage Product
            </NavLink>
          </NavItem>
          <NavItem style={{ marginBottom: "2px" }}>
            <NavLink tag={Link} to={"/manageorder"} className="f-white">
              <FontAwesomeIcon icon={faPizzaSlice} className="mr-2" />
              Manage Order
            </NavLink>
          </NavItem>
          <NavItem style={{ marginBottom: "2px" }}>
            <NavLink tag={Link} to={"/viewbill"} className="f-white">
              <FontAwesomeIcon icon={faWallet} className="mr-2" />
              View Bill
            </NavLink>
          </NavItem>
          <NavItem style={{ marginBottom: "2px" }}>
            <NavLink
              tag={Link}
              to={"/manageuser"}
              className="f-white"
              hidden={userRole === "user"}
            >
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Manage Users
            </NavLink>
          </NavItem>
          {/* <NavItem style={{ marginBottom: "2px" }}>
            {userDetail && userDetail.role}
          </NavItem> */}
        </Nav>
      </div>
    </div>
  );
};

export default SideBar;
