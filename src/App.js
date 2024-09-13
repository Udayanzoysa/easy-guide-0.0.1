import "./App.css";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Resetpassword from "./pages/Resetpassword";
import Forgotpassword from "./pages/Forgotpassword";
import MainLayout from "./Components/MainLayout";
import Enquiries from "./pages/Enquiries";
import Bloglist from "./pages/Bloglist";
import Blogcatlist from "./pages/Blogcatlist";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Colorlist from "./pages/Colotlist";
import Categorylist from "./pages/Categorylist";
import Productlist from "./pages/Productlist";
import Addblog from "./pages/Addblog";
import Addblogcat from "./pages/Addblogcat";
import Addcolor from "./pages/Addcolor";
import Addcat from "./pages/Addcat";
import Addproduct from "./pages/Addproduct";
import ViewOrder from "./pages/ViewOrder";
import useUserLoginInfo from "./hooks/hooks/useLoginInfo";
import {useContext, useEffect} from "react";
import {ToastContainer} from "react-toastify";
import AddTags from "./pages/AddTags";
import AddBrand from "./pages/AddBrand";
import BrandList from "./pages/BrandList";
import TagList from "./pages/TagList";
import ContextProvider, {StoreContext} from "./providers/ContextProvider";
import Profile from "./pages/Profile";
import 'react-toastify/dist/ReactToastify.css';
import Order from "./pages/Order";

function App() {

    return (
      <ContextProvider>
        <Router>
          <AuthProvider />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/reset-password" element={<Resetpassword />} />
            <Route path="/forgot-password" element={<Forgotpassword />} />
            <Route path="/admin" element={<MainLayout />}>
              <Route path=":id" element={<Addproduct />} />
              <Route index element={<Dashboard />} />
              <Route path="enquiries" element={<Enquiries />} />
              <Route path="blog-list" element={<Bloglist />} />
              <Route path="blog" element={<Addblog />} />
              <Route path="blog/:id" element={<Addblog />} />
              <Route path="blog-category-list" element={<Blogcatlist />} />
              <Route path="blog-category" element={<Addblogcat />} />
              <Route path="blog-category/:id" element={<Addblogcat />} />
              <Route path="orders" element={<Orders />} />
              <Route path="customers" element={<Customers />} />
              <Route path="customers/:id" element={<Customers />} />
              <Route path="list-color" element={<Colorlist />} />
              <Route path="color" element={<Addcolor />} />
              <Route path="color/:id" element={<Addcolor />} />
              <Route path="list-category" element={<Categorylist />} />
              <Route path="category" element={<Addcat />} />
              <Route path="category/:id" element={<Addcat />} />
              <Route path="tag" element={<AddTags />} />
              <Route path="tag/:id" element={<AddTags />} />
              <Route path="list-tag" element={<TagList />} />
              <Route path="brand" element={<AddBrand />} />
              <Route path="brand/:id" element={<AddBrand />} />
              <Route path="list-brand" element={<BrandList />} />
              <Route path="list-product" element={<Productlist />} />
              <Route path="order/:id" element={<Order />} />
              <Route path="profile" element={<Profile />} />
              <Route path="product" element={<Addproduct />}>
                <Route path=":id" element={<Addproduct />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </ContextProvider>
    );
}

const AuthProvider = () => {
    const userdetails = useUserLoginInfo()
    const {setValue} = useContext(StoreContext)

    useEffect(() => {
        setValue({path: 'user', data: userdetails})
    }, [userdetails]);

    return (<></>)
}

export default App;
