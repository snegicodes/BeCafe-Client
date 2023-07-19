import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ManageCategory from "./pages/ManageCategory";
import Dashboard from "./pages/Dashboard";
import ManageProduct from "./pages/ManageProduct";
import ManageOrder from "./pages/ManageOrder";
import ViewBill from "./pages/ViewBill";
import ManageUser from "./pages/ManageUser";
import "./App.css";
function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/managecategory" element={<ManageCategory />} />
        <Route path="/manageproduct" element={<ManageProduct />} />
        <Route path="/manageorder" element={<ManageOrder />} />
        <Route path="/viewbill" element={<ViewBill />} />
        <Route path="/manageUser" element={<ManageUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
