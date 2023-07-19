import axios from "axios";
import { useEffect, useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { PiNotePencilBold } from "react-icons/pi";

import {
  Button,
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
} from "reactstrap";

const ManageCatComp = (args) => {
  const [categoryDetails, setCategoryDetails] = useState([]);
  const [filteredCategoryDetails, setFilteredCategoryDetails] = useState([]);
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [addCat, setAddCat] = useState("");
  const [updateCat, setUpdateCat] = useState("");
  const [addFilter, setAddFilter] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const addCategoryToggle = () => setModal(!modal);

  const updateCategoryToggle = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setModal2(!modal2);
  };

  let data = JSON.parse(localStorage.getItem("data"));
  let userToken = data.token;

  const handleFilter = (e) => {
    setAddFilter(e.target.value);
    // Filter categoryDetails based on input value
    const filteredCategories = categoryDetails.filter((category) =>
      category.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredCategoryDetails(filteredCategories);
  };

  const fetchCategoryDetails = async () => {
    const apiUrl = "https://be-cafe-server.vercel.app/category/get";

    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };

    try {
      const response = await axios.get(apiUrl, config);
      setCategoryDetails(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };

    try {
      const response = await axios.post(
        "https://be-cafe-server.vercel.app/category/add",
        {
          name: addCat,
        },
        config
      );

      addCategoryToggle();
      await fetchCategoryDetails();

      console.log("API DATA", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };

    try {
      const response = await axios.patch(
        "https://be-cafe-server.vercel.app/category/update",
        { id: selectedCategoryId, name: updateCat },
        config
      );

      updateCategoryToggle();
      await fetchCategoryDetails();

      console.log("API DATA", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setAddCat(e.target.value);
  };
  const handleChange2 = (e) => {
    setUpdateCat(e.target.value);
  };

  useEffect(() => {
    fetchCategoryDetails();
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
          <CardTitle tag="h5">Manage Category</CardTitle>
          <Button
            onClick={() => {
              setAddCat("");
              addCategoryToggle();
            }}
            style={{ background: "#6d7fcc" }}
          >
            Add Category <BsPlusCircle />
          </Button>
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
          {addFilter
            ? filteredCategoryDetails.map((category) => (
                <ListGroupItem
                  style={{ display: "flex", justifyContent: "space-between" }}
                  key={category.id}
                >
                  <div>{category.name}</div>
                  <div onClick={() => updateCategoryToggle(category.id)}>
                    <PiNotePencilBold />
                  </div>
                </ListGroupItem>
              ))
            : categoryDetails.map((category) => (
                <ListGroupItem
                  style={{ display: "flex", justifyContent: "space-between" }}
                  key={category.id}
                >
                  <div>{category.name}</div>
                  <div onClick={() => updateCategoryToggle(category.id)}>
                    <PiNotePencilBold />
                  </div>
                </ListGroupItem>
              ))}
        </ListGroup>
      </Card>

      <Modal isOpen={modal} {...args}>
        <ModalHeader onClick={addCategoryToggle}>Add Category</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Input
                name="category"
                value={addCat}
                placeholder="Category Name"
                type="input"
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            disabled={!addCat}
            color="primary"
            onClick={handleAddCategory}
          >
            Add Category
          </Button>{" "}
          <Button color="secondary" onClick={addCategoryToggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modal2} {...args}>
        <ModalHeader onClick={updateCategoryToggle}>
          Update Category
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Input
                name="category"
                value={updateCat}
                placeholder="Update Category"
                type="input"
                onChange={handleChange2}
                required
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            disabled={!updateCat}
            color="primary"
            onClick={handleUpdateCategory}
          >
            Update Category
          </Button>{" "}
          <Button color="secondary" onClick={updateCategoryToggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ManageCatComp;
