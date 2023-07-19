import { useState } from "react";
import Base from "../components/Base";
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Row,
  Col,
} from "reactstrap";
import { signUp } from "../services/user-services";
import { toast } from "react-toastify";
import SignUp from "../assets/signup.svg";
const Signup = () => {
  const [data, setData] = useState({
    name: "",
    contactNumber: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });
  const handleChange = (event, property) => {
    setData({ ...data, [property]: event.target.value });
  };
  //resetting the data
  const resetData = () => {
    setData({
      name: "",
      contactNumber: "",
      email: "",
      password: "",
    });
  };

  //submit the form
  const submitForm = (event) => {
    event.preventDefault();
    if (error.isError) {
      toast.error("Form data is invalid !!");
      return;
    }
    console.log(data);
    //data validation

    //call server api for sending data
    signUp(data)
      .then((resp) => {
        console.log(resp);
        console.log("success log");
        toast.success("User is successfully registered!!");
        setData({
          name: "",
          contactNumber: "",
          email: "",
          password: "",
        });
      })
      .catch((error) => {
        console.log(error);
        console.log("Error log");

        //handle errors properly
        setError({
          errors: error,
          isError: true,
        });
      });
  };
  return (
    <Base>
      <div
        style={{
          display: "flex",
          backgroundColor: "#e3e6f6",
          height: "96vh",
          alignItems: "center",
        }}
      >
        <div style={{ flex: "1", display: "flex", justifyContent: "center" }}>
          <Card
            style={{
              backgroundColor: "#fff",
              width: "60%",
              height: "60%",
              marginLeft: "100px",
              padding: "30px",
              border: "0.5px solid #7386d5",
            }}
          >
            <div
              style={{
                textAlign: "center",
                paddingTop: "10px",
                color: "#22283f",
              }}
            >
              <h3>Fill Information to Register!!!</h3>
            </div>
            <hr style={{ border: "1px solid #7386d5", opacity: "1" }}></hr>
            <CardBody>
              {/* creating form */}

              <Form onSubmit={submitForm}>
                {/* Name Field */}

                <FormGroup>
                  <Label for="name" style={{ color: "#22283f" }}>
                    Name
                  </Label>
                  <Input
                    type="text"
                    placeholder="Enter here"
                    id="name"
                    onChange={(e) => handleChange(e, "name")}
                    value={data.name}
                    required
                    minLength={2}
                    style={{ border: "1px solid #7386d5" }}
                  />
                </FormGroup>

                {/* Contact Field */}

                <FormGroup>
                  <Label for="contactNumber" style={{ color: "#22283f" }}>
                    Contact Number
                  </Label>
                  <Input
                    type="tel"
                    placeholder="Enter here"
                    id="contactNumber"
                    onChange={(e) => handleChange(e, "contactNumber")}
                    value={data.contactNumber}
                    required
                    minLength={10}
                    maxLength={10}
                    style={{ border: "1px solid #7386d5" }}
                  />
                </FormGroup>

                {/* Email Field */}

                <FormGroup>
                  <Label for="email" style={{ color: "#22283f" }}>
                    Email
                  </Label>
                  <Input
                    type="email"
                    placeholder="Enter here"
                    id="email"
                    onChange={(e) => handleChange(e, "email")}
                    value={data.email}
                    required
                    style={{ border: "1px solid #7386d5" }}
                  />
                </FormGroup>

                {/* Password Field */}

                <FormGroup>
                  <Label for="pass" style={{ color: "#22283f" }}>
                    Password
                  </Label>
                  <Input
                    type="password"
                    placeholder="Enter Password"
                    id="pass"
                    onChange={(e) => handleChange(e, "password")}
                    value={data.password}
                    required
                    style={{ border: "1px solid #7386d5" }}
                  />
                </FormGroup>

                <Container className="text-center">
                  <Button style={{ backgroundColor: "#22283f" }}>Signup</Button>
                  <Button
                    color="danger"
                    type="reset"
                    className="ms-2"
                    onClick={resetData}
                  >
                    Reset
                  </Button>
                </Container>
              </Form>
            </CardBody>
          </Card>
        </div>
        <div style={{ flex: "1", display: "flex", justifyContent: "center" }}>
          <img
            src={SignUp}
            alt=""
            style={{
              height: "60vh",
            }}
          />
        </div>
      </div>
    </Base>
  );
};

export default Signup;
