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
import { loginUser } from "../services/user-services";
import { doLogin } from "../auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import eatingCafe from "../assets/eating.svg";
const Login = () => {
  const navigate = useNavigate();

  const [loginDetail, setLoginDetail] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event, field) => {
    let actualValue = event.target.value;
    setLoginDetail({
      ...loginDetail,
      [field]: actualValue,
    });
  };

  const handleReset = () => {
    setLoginDetail({
      email: "",
      password: "",
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(loginDetail);
    //validation
    if (loginDetail.email.trim() == "" || loginDetail.password.trim() == "") {
      toast.error("Email or Password is required !!");
      return;
    }

    //submit the data to server to generate token
    loginUser(loginDetail)
      .then((data) => {
        console.log(data);

        //save the data to localstorage
        doLogin(data, () => {
          console.log("login detail is saved to localstorage");
          toast.success("Login Successfully !!");
          //redirect to dashboard
          navigate("/dashboard");
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong !!");
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
          <img
            src={eatingCafe}
            alt=""
            style={{
              height: "60vh",
              marginLeft: "100px",
            }}
          />
        </div>
        <div style={{ flex: "1", display: "flex", justifyContent: "center" }}>
          <Card
            style={{
              backgroundColor: "#fff",
              width: "60%",
              height: "60%",
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
              <h3>Login Here!!!</h3>
            </div>
            <hr style={{ border: "0.5px solid #7386d5", opacity: "1" }}></hr>
            <CardBody>
              {/* creating form */}

              <Form onSubmit={handleFormSubmit}>
                <FormGroup style={{ marginTop: "5px" }}>
                  <Label
                    for="email"
                    style={{ color: "#22283f", fontSize: "20px" }}
                  >
                    Email
                  </Label>
                  <Input
                    type="email"
                    placeholder="Enter here"
                    id="email"
                    value={loginDetail.email}
                    onChange={(e) => handleChange(e, "email")}
                    style={{ border: "1px solid #7386d5" }}
                  />
                </FormGroup>
                <FormGroup style={{ marginTop: "5px" }}>
                  <Label
                    for="password"
                    style={{ color: "#22283f", fontSize: "20px" }}
                  >
                    Password
                  </Label>
                  <Input
                    type="password"
                    placeholder="Enter Password"
                    id="password"
                    value={loginDetail.password}
                    onChange={(e) => handleChange(e, "password")}
                    style={{ border: "1px solid #7386d5" }}
                  />
                </FormGroup>

                <Container
                  className="text-center"
                  style={{ marginTop: "30px" }}
                >
                  <Button style={{ backgroundColor: "#22283f" }}>Login</Button>
                  <Button
                    color="danger"
                    type="reset"
                    className="ms-2"
                    onClick={handleReset}
                  >
                    Reset
                  </Button>
                </Container>
              </Form>
            </CardBody>
          </Card>
        </div>
      </div>
    </Base>
  );
};

export default Login;
