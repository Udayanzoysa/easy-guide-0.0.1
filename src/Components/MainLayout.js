import React, {useContext, useState} from "react";
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
import {signOut} from "../actions/CommonAction";
import {StoreContext} from "../providers/ContextProvider";

const {Header, Sider, Content} = Layout;
const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {getValue} = useContext(StoreContext)
    let user = getValue('user')
    console.log(user, 'usr')

    const {
        token: {colorBgContainer},
    } = theme.useToken();

    const navigate = useNavigate();

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">
                    <h2 className="text-white fs-5 text-center py-3 mb-0">
                        <span className="sm-logo">DGC</span>
                        <span className="lg-logo">Dushan Glass</span>
                    </h2>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[""]}
                    onClick={({key}) => {
                        if (key == "signout") {
                        } else {
                            navigate(key);
                        }
                    }}
                    items={[
                        {
                            key: "",
                            icon: <AiOutlineDashboard className="fs-4"/>,
                            label: "Dashboard",
                        },
                        {
                            key: "customers",
                            icon: <AiOutlineUser className="fs-4"/>,
                            label: "Customers",
                        },
                        {
                            key: "Catalog",
                            icon: <AiOutlineShoppingCart className="fs-4"/>,
                            label: "Catalog",
                            children: [
                                {
                                    key: "product",
                                    icon: <AiOutlineShoppingCart className="fs-4"/>,
                                    label: "Add Product",
                                },
                                {
                                    key: "list-product",
                                    icon: <AiOutlineShoppingCart className="fs-4"/>,
                                    label: "Product List",
                                },
                                {
                                    key: "category",
                                    icon: <BiCategoryAlt className="fs-4"/>,
                                    label: "Category",
                                },
                                {
                                    key: "list-category",
                                    icon: <BiCategoryAlt className="fs-4"/>,
                                    label: "Category List",
                                },
                                {
                                    key: "tag",
                                    icon: <AiOutlineTag className="fs-4"/>,
                                    label: "Add Tag",
                                },
                                {
                                    key: "list-tag",
                                    icon: <AiOutlineTag className="fs-4"/>,
                                    label: "Tag List",
                                },
                                {
                                    key: "brand",
                                    icon: <TbBrandZhihu className="fs-4"/>,
                                    label: "Add Brand",
                                },
                                {
                                    key: "list-brand",
                                    icon: <TbBrandZhihu className="fs-4"/>,
                                    label: "Brand List",
                                },
                                {
                                    key: "color",
                                    icon: <AiOutlineBgColors className="fs-4"/>,
                                    label: "Color",
                                },
                                {
                                    key: "list-color",
                                    icon: <AiOutlineBgColors className="fs-4"/>,
                                    label: "Color List",
                                },
                            ],
                        },
                        {
                            key: "orders",
                            icon: <FaClipboardList className="fs-4"/>,
                            label: "Orders",
                        },
                        {
                            key: "blogs",
                            icon: <FaBloggerB className="fs-4"/>,
                            label: "Blogs",
                            children: [
                                {
                                    key: "blog",
                                    icon: <ImBlog className="fs-4"/>,
                                    label: "Add Blog",
                                },
                                {
                                    key: "blog-list",
                                    icon: <FaBloggerB className="fs-4"/>,
                                    label: "Blog List",
                                },
                                {
                                    key: "blog-category",
                                    icon: <ImBlog className="fs-4"/>,
                                    label: "Add Blog Category",
                                },
                                {
                                    key: "blog-category-list",
                                    icon: <FaBloggerB className="fs-4"/>,
                                    label: "Blog Category List",
                                },
                            ],
                        },
                        {
                            key: "enquiries",
                            icon: <FaClipboardList className="fs-4"/>,
                            label: "Enquiries",
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
                            <IoIosNotifications className="fs-4"/>
                            <span className="badge bg-warning rounded-circle p-1 position-absolute">
                3
              </span>
                        </div>

                        <div className="d-flex gap-3 align-items-center dropdown">
                            <div>
                                {
                                    user?.photoURL ?
                                        <Avatar className={'ms-4'} shape="square" src={user?.photoURL} size={35}
                                                icon={<UserOutlined/>}/> :
                                        <Avatar className={'ms-4'} shape="square" size={35} icon={<UserOutlined/>}/>
                                }

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
                                <h5 className="mb-0">{user?.firstName || '' + user?.lastName || ''}</h5>
                                <p className="mb-0">{user?.email || ''}</p>
                            </div>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <li>
                                    <Link
                                        className="dropdown-item py-1 mb-1"
                                        style={{height: "auto", lineHeight: "20px"}}
                                        to="/admin/profile"
                                    >
                                        View Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="dropdown-item py-1 mb-1"
                                        style={{height: "auto", lineHeight: "20px"}}
                                        onClick={() => {
                                            signOut(navigate)
                                        }}
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
                    <ToastContainer
                        position="top-right"
                        autoClose={250}
                        hideProgressBar={false}
                        newestOnTop={true}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        theme="light"
                    />
                    <Outlet/>
                </Content>
            </Layout>
        </Layout>
    );
};
export default MainLayout;
