import React, { useEffect, useState } from "react";
import { Link, NavLink as ReactLink, useNavigate } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { doLogout, getCurrentUserDetail, isLoggedIn } from "../auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot } from "@fortawesome/free-solid-svg-icons";

const CustomNavbar = ({ home }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const [login, setLogin] = useState(false);

  const [user, setUser] = useState(undefined);

  useEffect(() => {
    setLogin(isLoggedIn);
    setUser(getCurrentUserDetail());
  }, [login]);
  const toggle = () => setIsOpen(!isOpen);

  const logout = () => {
    doLogout(() => {
      //logged out
      setLogin(false);
      navigate("/");
    });
  };
  return (
    <div>
      <Navbar
        style={{ backgroundColor: "#7386d5" }}
        dark
        expand="md"
        fixed=""
        className="px-5"
      >
        <NavbarBrand href="/">
          <FontAwesomeIcon
            icon={faMugHot}
            style={{
              marginRight: "10px",
              fontSize: "20px",
              marginBottom: "1px",
            }}
          />
          BeCafe
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar></Nav>
          <Nav navbar>
            {login && (
              <>
                <NavItem>
                  <NavLink tag={Link} to={"/dashboard"} hidden={!home}>
                    Dashboard
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={logout}>Logout</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink>
                    <div>{user.sub}</div>
                  </NavLink>
                </NavItem>
              </>
            )}
            {!login && (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to="/login">
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to="/signup">
                    Signup
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default CustomNavbar;
