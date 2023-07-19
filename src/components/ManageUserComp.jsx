import axios from "axios";
import { useEffect, useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

const ManageUserComp = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [filteredUserDetails, setFilteredUserDetails] = useState([]);
  const [addFilter, setAddFilter] = useState("");

  let data = JSON.parse(localStorage.getItem("data"));
  let userToken = data.token;

  const handleFilter = (e) => {
    setAddFilter(e.target.value);
    const filteredUsers = userDetails.filter((user) =>
      user.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredUserDetails(filteredUsers);
  };

  const handleToggle = (userId, userStatus) => {
    console.log("1", userId, userStatus, typeof userStatus);
    updateUserStatus(userId, !userStatus);
  };

  const updateUserStatus = async (userId, status) => {
    // console.log("2", userId, status, typeof status);
    status = status.toString();
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };

    try {
      const response = await axios.patch(
        "https://be-cafe-server.vercel.app/user/update",
        {
          id: userId,
          status: status,
        },
        config
      );
      await fetchUserDetails();
      console.log("API DATA", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserDetails = async () => {
    const apiUrl = "https://be-cafe-server.vercel.app/user/get";

    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };

    try {
      const response = await axios.get(apiUrl, config);
      setUserDetails(response.data);
      console.log("User Detail", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);
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
          <CardTitle tag="h5">Manage Users</CardTitle>
        </CardBody>
      </Card>

      <Card
        style={{
          width: "95%",
          marginTop: "10px",
        }}
      >
        <input
          style={{
            border: "none",
            padding: "5px",
          }}
          type="text"
          placeholder="Filter"
          onChange={handleFilter}
        />
      </Card>

      <Card
        style={{
          width: "95%",
          marginTop: "10px",
        }}
      >
        <ListGroup flush>
          <ListGroupItem
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <div style={{ flex: "1" }}>
              <strong>Name</strong>
            </div>
            <div style={{ flex: "1" }}>
              <strong>Email</strong>
            </div>
            <div style={{ flex: "1" }}>
              <strong>Contact No.</strong>
            </div>
            <div style={{ flex: "1" }}>
              <strong>Action</strong>
            </div>
          </ListGroupItem>
          {/* <ListGroupItem>{JSON.stringify(userDetails)}</ListGroupItem> */}
          <ListGroup flush>
            {addFilter
              ? filteredUserDetails.map((user) => (
                  <ListGroupItem
                    style={{ display: "flex", justifyContent: "space-between" }}
                    key={user.id}
                  >
                    <div style={{ flex: "1" }}>{user.name}</div>
                    <div style={{ flex: "1" }}>{user.email}</div>
                    <div style={{ flex: "1" }}>{user.phone}</div>
                    <div style={{ flex: "1" }}>
                      <Form>
                        <FormGroup switch disabled>
                          <Input
                            type="switch"
                            checked={user.status === "true"}
                            onChange={() => {
                              console.log(user.id, "-", user.status);
                              handleToggle(user.id, user.status === "true");
                            }}
                          />
                        </FormGroup>
                      </Form>
                    </div>
                  </ListGroupItem>
                ))
              : userDetails.map((user) => (
                  <ListGroupItem
                    style={{ display: "flex", justifyContent: "space-between" }}
                    key={user.id}
                  >
                    <div style={{ flex: "1" }}>{user.name}</div>
                    <div style={{ flex: "1" }}>{user.email}</div>
                    <div style={{ flex: "1" }}>{user.phone}</div>

                    <div style={{ flex: "1" }}>
                      <Form>
                        <FormGroup switch disabled>
                          <Input
                            type="switch"
                            checked={user.status === "true"}
                            onChange={() => {
                              //   console.log(user.id, "-", user.status);
                              handleToggle(user.id, user.status === "true");
                            }}
                          />
                        </FormGroup>
                      </Form>
                    </div>
                  </ListGroupItem>
                ))}
          </ListGroup>
        </ListGroup>
      </Card>
    </div>
  );
};

export default ManageUserComp;
