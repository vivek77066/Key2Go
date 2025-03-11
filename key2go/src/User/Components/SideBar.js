import React, { useState } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";

import "react-pro-sidebar/dist/css/styles.css";
import "./SideBar.css"; // Import the custom CSS file

const SideBar = () => {
  const [menuCollapse, setMenuCollapse] = useState(false);

  const menuIconClick = () => {
    setMenuCollapse(!menuCollapse);
  };

  return (
    <div id="sidebar-container">
      <ProSidebar collapsed={menuCollapse}>
        <SidebarHeader>
          <div className="menu-toggle" onClick={menuIconClick}>
            {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
          </div>
        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape="square">
            <MenuItem active={true} icon={<FiHome />}>Home</MenuItem>
            <MenuItem icon={<FaList />}>Category</MenuItem>
            <MenuItem icon={<FaRegHeart />}>Favourite</MenuItem>
            <MenuItem icon={<RiPencilLine />}>Author</MenuItem>
            <MenuItem icon={<BiCog />}>Settings</MenuItem>
          </Menu>
        </SidebarContent>
        <SidebarFooter>
          <Menu iconShape="round">
            <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    </div>
  );
};

export default SideBar;
