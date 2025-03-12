import React, { useState } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  ProSidebarProvider,
} from "react-pro-sidebar";


import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";

import "./SideBar.css"; // Import custom styles

const SideBar = () => {
  const [menuCollapse, setMenuCollapse] = useState(false);

  const menuIconClick = () => {
    setMenuCollapse(!menuCollapse);
  };

  return (
    <ProSidebarProvider>
      <div id="sidebar-container">
        <Sidebar collapsed={menuCollapse}>
          <Menu>
            {/* Toggle Button */}
            <MenuItem onClick={menuIconClick} icon={menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}>
              {menuCollapse ? "Expand" : "Collapse"}
            </MenuItem>

            <MenuItem icon={<FiHome />}>Home</MenuItem>
            <MenuItem icon={<FaList />}>Category</MenuItem>
            <MenuItem icon={<FaRegHeart />}>Favourite</MenuItem>
            <MenuItem icon={<RiPencilLine />}>Author</MenuItem>
            <MenuItem icon={<BiCog />}>Settings</MenuItem>

            <SubMenu label="More Options">
              <MenuItem>Option 1</MenuItem>
              <MenuItem>Option 2</MenuItem>
            </SubMenu>
          </Menu>

          {/* Sidebar Footer */}
          <Menu>
            <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </ProSidebarProvider>
  );
};

export default SideBar;
