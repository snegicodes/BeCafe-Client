import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillPrinter } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

const ManageOrderComp = (args) => {
  const [productArray, setProductArray] = useState([]);
  const [productDetails, setProductDetails] = useState([]);

  const [addName, setAddName] = useState("");
  const [addEmail, setAddEmail] = useState("");
  const [addContact, setAddContact] = useState("");
  const [addPayment, setPayment] = useState("");

  const [prodCategory, setProdCategory] = useState("");
  const [productChange, setProductChange] = useState();
  const [prodPrice, setProdPrice] = useState();
  const [addQuantity, setAddQuantity] = useState();
  const [totalAmount, setTotalAmount] = useState();

  const [productsByCategory, setProductsByCategory] = useState();
  const [productsById, setProductsById] = useState();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([
    { name: "Cash", id: "1" },
    { name: "Credit Card", id: "2" },
    { name: "Debit Card", id: "3" },
  ]);

  let data = JSON.parse(localStorage.getItem("data"));
  let userToken = data.token;

  const fetchCategoryDetails = async () => {
    const apiUrl =
      "https://be-cafe-server.vercel.app/category/get?filterValue=true";

    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };

    try {
      const response = await axios.get(apiUrl, config);
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProductDetails = async () => {
    const apiUrl = "https://be-cafe-server.vercel.app/product/get";

    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };

    try {
      const response = await axios.get(apiUrl, config);
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getProductByCategory = async (prodCat) => {
    const apiUrl = `https://be-cafe-server.vercel.app/product/getByCategoryID/${prodCat}`;

    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };

    try {
      const response = await axios.get(apiUrl, config);
      setProductsByCategory(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const getProductInfoById = async (productId) => {
    const apiUrl = `https://be-cafe-server.vercel.app/product/getByID/${productId}`;

    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };

    try {
      const response = await axios.get(apiUrl, config);
      setProductsById(response.data);
      setProdPrice(response.data.price);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCategoryByID = (categoryID) => {
    const category = categories.find((category) => category.id === categoryID);
    return category ? category.name : "";
  };

  const getProductByID = (productID) => {
    const product = products.find((product) => product.id === productID);
    return product ? product.name : "";
  };

  const resetForm = () => {
    setProductChange("");
    setAddQuantity("");
  };
  const resetForm2 = () => {
    setAddName("");
    setAddEmail("");
    setAddContact("");
    setPayment("");
    setProductsById("");
    setProdCategory("");
    setProductChange("");
    setAddQuantity("");
    setProductArray([]);
    setProductDetails([]);
  };

  const handleNameChange = (e) => {
    setAddName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setAddEmail(e.target.value);
  };
  const handleContactChange = (e) => {
    setAddContact(e.target.value);
  };
  const handlePaymentChange = (e) => {
    setPayment(e.target.value);
  };
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);

    if (value >= 1) {
      setAddQuantity(value);
    }
  };
  const handleProdCategoryChange = (e) => {
    setProdCategory(e.target.value);
    getProductByCategory(e.target.value);
    resetForm();
  };

  const handleProductChange = (e) => {
    setProductChange(e.target.value);
    setAddQuantity(1);
    getProductInfoById(e.target.value);
  };

  const generateReport = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };

    try {
      const calculatedTotalAmount = productDetails.reduce(
        (total, product) => total + product.total,
        0
      );

      const response = await axios.post(
        "https://be-cafe-server.vercel.app/bill/generateReport",
        {
          contactNumber: addContact,
          email: addEmail,
          name: addName,
          paymentMethod: addPayment,
          productDetails: JSON.stringify(productDetails),
          totalAmount: calculatedTotalAmount.toString(),
        },
        config
      );

      resetForm2();
      generatePdf(
        addContact,
        addEmail,
        addName,
        addPayment,
        productDetails,
        addQuantity * prodPrice,
        response.data.uuid
      );

      console.log("API DATA", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const downloadPdf = (data, uuid) => {
    const blob = new Blob([data], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${uuid}.pdf`;
    link.click();
  };

  const generatePdf = async (
    contactNumber,
    email,
    name,
    paymentMethod,
    productDetails,
    totalAmount,
    uuid
  ) => {
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      responseType: "arraybuffer",
    };

    try {
      const response = await axios.post(
        "https://be-cafe-server.vercel.app/bill/getPdf",
        {
          contactNumber: contactNumber,
          email: email,
          name: name,
          paymentMethod: paymentMethod,
          productDetails: productDetails,
          totalAmount: totalAmount,
          uuid: uuid,
        },
        config
      );

      console.log("API DATA", response.data);
      downloadPdf(response.data, uuid);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddBtnClick = () => {
    // Create an object with the desired properties
    const newProduct = {
      prodCategory: getCategoryByID(+prodCategory),
      productChange: getProductByID(+productChange),
      prodPrice: prodPrice,
      addQuantity: addQuantity,
    };

    // Update the productArray state by appending the new object
    setProductArray((prevProductArray) => [...prevProductArray, newProduct]);
  };
  const handleAddBtnClick2 = () => {
    // Create an object with the desired properties

    const newProduct = {
      id: +productChange,
      name: getProductByID(+productChange),
      category: getCategoryByID(+prodCategory),
      quantity: addQuantity.toString(),
      price: prodPrice,
      total: addQuantity * prodPrice,
    };

    // Update the productArray state by appending the new object
    setProductDetails((prevProductDetails) => [
      ...prevProductDetails,
      newProduct,
    ]);
  };

  const handleDeleteProduct = (index) => {
    // Create a copy of the productArray
    const updatedProductArray = [...productArray];
    const updatedProductDetails = [...productDetails];

    // Remove the product object at the specified index
    updatedProductArray.splice(index, 1);
    updatedProductDetails.splice(index, 1);

    // Update the productArray state with the new array
    setProductArray(updatedProductArray);
    setProductDetails(updatedProductDetails);
  };

  useEffect(() => {
    fetchCategoryDetails();
    fetchProductDetails();
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
          <CardTitle tag="h5">Manage Order</CardTitle>
          <Button style={{ background: "#6d7fcc" }} onClick={generateReport}>
            Submit Bill
            <AiFillPrinter
              style={{
                marginBottom: "3px",
                marginLeft: "6px",
                fontSize: "20px",
              }}
            />
          </Button>
        </CardBody>
      </Card>
      <Card
        style={{
          width: "95%",
          marginTop: "10px",
        }}
      >
        <CardBody
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardTitle tag="h5">Customer Details</CardTitle>
          <Form>
            <FormGroup>
              <Input
                name="name"
                value={addName}
                placeholder="Name"
                type="input"
                onChange={handleNameChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                name="email"
                value={addEmail}
                placeholder="Email ID"
                type="email"
                onChange={handleEmailChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                name="contactNo"
                value={addContact}
                placeholder="Contact Number"
                type="tel"
                pattern="[0-9]{10}"
                title="Please enter a 10-digit number"
                onChange={handleContactChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                name="payment"
                value={addPayment}
                placeholder="Payment Method"
                type="select"
                onChange={handlePaymentChange}
                required
              >
                <option hidden disabled selected value="">
                  Payment Methods
                </option>
                {paymentMethods.map((payment) => (
                  <option
                    key={payment.id}
                    label={payment.name}
                    value={payment.name}
                  />
                ))}
              </Input>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
      <Card
        style={{
          width: "95%",
          marginTop: "10px",
        }}
      >
        <CardBody
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardTitle tag="h5">Select Product</CardTitle>
          <Form>
            <FormGroup>
              <Input
                name="ProductCategory"
                value={prodCategory}
                placeholder="Category"
                type="select"
                onChange={handleProdCategoryChange}
                required
              >
                <option hidden disabled selected value="">
                  Category
                </option>
                {categories.map((category) => (
                  <option
                    key={category.id}
                    label={category.name}
                    value={category.id}
                  />
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Input
                name="ProductCategory"
                value={productChange}
                placeholder="Payment Method"
                type="select"
                onChange={handleProductChange}
                required
              >
                <option hidden disabled selected value="">
                  Product
                </option>
                {productsByCategory &&
                  productsByCategory.map((product) => (
                    <option
                      key={product.id}
                      label={product.name}
                      value={product.id}
                    />
                  ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Input
                name="price"
                value={productsById ? productsById.price : ""}
                placeholder="Price"
                type="input"
                readOnly
              />
            </FormGroup>
            <FormGroup>
              <Input
                name="quantity"
                value={addQuantity}
                placeholder="Quantity"
                type="number"
                onChange={handleQuantityChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                name="total"
                value={
                  addQuantity &&
                  productsById &&
                  productsById.price * addQuantity
                }
                placeholder="Total"
                type="input"
                readOnly
              />
            </FormGroup>
            {totalAmount}
            <div>
              <Button
                onClick={() => {
                  handleAddBtnClick();
                  handleAddBtnClick2();
                }}
                style={{ background: "#7386d5" }}
              >
                Add
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
      {/* {JSON.stringify(productArray)} */}

      <Card
        style={{
          width: "95%",
          marginTop: "10px",
        }}
      >
        <ListGroup flush>
          <ListGroupItem
            style={{
              display: "flex",
            }}
          >
            <div style={{ flex: "1" }}>
              <strong>Name</strong>
            </div>
            <div style={{ flex: "1" }}>
              <strong>Category</strong>
            </div>
            <div style={{ flex: "1" }}>
              <strong>Price</strong>
            </div>
            <div style={{ flex: "1" }}>
              <strong>Quantity</strong>
            </div>
            <div style={{ flex: "1" }}>
              <strong>Total</strong>
            </div>
            <div style={{ flex: "1" }}>
              <strong>Delete</strong>
            </div>
          </ListGroupItem>
          {productArray.map((product, index) => (
            <ListGroupItem
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              key={product.id}
            >
              <div style={{ flex: "1" }}>
                {/* {getProductByID(+product.productChange)} */}
                {product.productChange}
              </div>
              <div style={{ flex: "1" }}>
                {/* {getCategoryByID(+product.prodCategory)} */}
                {product.prodCategory}
              </div>
              <div style={{ flex: "1" }}>{product.prodPrice}</div>
              <div style={{ flex: "1" }}>{product.addQuantity}</div>
              <div style={{ flex: "1" }}>
                {product.prodPrice * product.addQuantity}
              </div>
              <div
                style={{
                  flex: "1",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div style={{ marginBottom: "8px", marginLeft: "12px" }}>
                  <MdDelete
                    style={{ fontSize: "17px" }}
                    onClick={() => handleDeleteProduct(index)}
                  />
                </div>
              </div>
            </ListGroupItem>
          ))}
          {/* <ListGroupItem>{JSON.stringify(productDetails)}</ListGroupItem> */}
          {/* {JSON.stringify(categories)} */}
        </ListGroup>
      </Card>
    </div>
  );
};

export default ManageOrderComp;
