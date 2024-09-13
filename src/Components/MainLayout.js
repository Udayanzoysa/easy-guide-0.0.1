import React, {useContext, useEffect, useState} from "react";
import {MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined} from "@ant-design/icons";
import {
    AiOutlineBgColors,
    AiOutlineDashboard,
    AiOutlineShoppingCart,
    AiOutlineTag,
    AiOutlineUser,
} from "react-icons/ai";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Link, Outlet, useNavigate} from "react-router-dom";
import {ImBlog} from "react-icons/im";
import {IoIosNotifications} from "react-icons/io";
import {FaBloggerB, FaClipboardList} from "react-icons/fa";
import {BiCategoryAlt} from "react-icons/bi";
import {TbBrandZhihu} from "react-icons/tb";
import {Avatar, Layout, Menu, theme} from "antd";
import {getAllDocFromCollection, signOut} from "../actions/CommonAction";
import {StoreContext} from "../providers/ContextProvider";

const {Header, Sider, Content} = Layout;
const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {getValue} = useContext(StoreContext)
    const [departments, setDepartments] = useState([]);
    let user = getValue('user')


    const {
        token: {colorBgContainer},
    } = theme.useToken();

    const navigate = useNavigate();

    useEffect(()=>{
        getAllDocFromCollection("department").then((items) => {
          let deps = items?.map((item)=>(item?.id))
          setDepartments(deps)
        });
    },[])

    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo">
            <h2 className="text-white fs-5 text-center py-3 mb-0">
              <span className="sm-logo">Easy Audit</span>
              {/* <span className="lg-logo">Dushan Glass</span> */}
            </h2>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[""]}
            onClick={({ key }) => {
              if (key == "signout") {
              } else {
                navigate(key);
              }
            }}
            items={[
              // {
              //   key: "",
              //   icon: <AiOutlineDashboard className="fs-4" />,
              //   label: "Dashboard",
              // },
              // {
              //   key: "customers",
              //   icon: <AiOutlineUser className="fs-4" />,
              //   label: "Customers",
              // },
              {
                key: "Departments",
                icon: <AiOutlineShoppingCart className="fs-4" />,
                label: "Departments",
                children: [
                  ...departments.map((item) => ({
                    key: item,
                    icon: <AiOutlineShoppingCart className="fs-4" />,
                    label: item,
                  })),
                ],
              },
            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            className="d-flex justify-content-between ps-1 pe-5"
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
            <div className="d-flex gap-4 align-items-center">
              <div className="position-relative">
                <IoIosNotifications className="fs-4" />
                <span className="badge bg-warning rounded-circle p-1 position-absolute">
                  3
                </span>
              </div>

              <div className="d-flex gap-3 align-items-center dropdown">
                <div>
                  {user?.photoURL ? (
                    <Avatar
                      className={"ms-4"}
                      shape="square"
                      src={user?.photoURL}
                      size={35}
                      icon={<UserOutlined />}
                    />
                  ) : (
                    <Avatar
                      className={"ms-4"}
                      shape="square"
                      size={35}
                      icon={<UserOutlined />}
                    />
                  )}

                  {/*<img*/}
                  {/*    width={32}*/}
                  {/*    height={32}*/}
                  {/*    src=""*/}
                  {/*    alt=""*/}
                  {/*/>*/}
                </div>
                <div
                  role="button"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <h5 className="mb-0">
                    {user?.firstName || "" + user?.lastName || ""}
                  </h5>
                  <p className="mb-0">{user?.email || ""}</p>
                </div>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuLink"
                >
                  <li>
                    <Link
                      className="dropdown-item py-1 mb-1"
                      style={{ height: "auto", lineHeight: "20px" }}
                      to="/admin/profile"
                    >
                      View Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item py-1 mb-1"
                      style={{ height: "auto", lineHeight: "20px" }}
                      onClick={() => {
                        signOut(navigate);
                      }}
                      to={""}
                    >
                      Signout
                    </Link>
                  </li>
                </div>
              </div>
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    );
};
export default MainLayout;
