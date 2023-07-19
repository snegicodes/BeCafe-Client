import { Link } from "react-router-dom";
import { Button, Card, CardText, CardTitle } from "reactstrap";

const DashboardCard = (props) => {
  const { type, name, path } = props;
  return (
    <div>
      <Card
        body
        className="my-2"
        style={{
          width: "18rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CardTitle tag="h6">Number of {name}</CardTitle>
        <CardText>
          <h4>{type}</h4>
        </CardText>
        <Button color="primary">
          <Link to={path} style={{ color: "white", textDecoration: "none" }}>
            View {name}
          </Link>
        </Button>
      </Card>
    </div>
  );
};

export default DashboardCard;
