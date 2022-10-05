import React from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";

const Sidebar = (props) => {
  return (
    <div>
      <div className="proslider_mobile prosideclass">
        <ProSidebar>
          <Menu iconShape="square">
            <MenuItem>a</MenuItem>
            <MenuItem onClick={() => props.history.push("/home")}>
              Dashboard
            </MenuItem>
            <MenuItem onClick={() => props.history.push("/user")}>
             User
            </MenuItem>
            <MenuItem onClick={() => props.history.push("/category")}>
             Category
            </MenuItem>
            <MenuItem onClick={() => props.history.push("/collection")}>
            Collection
            </MenuItem>
           
            <MenuItem onClick={() => props.history.push("/addproduct")}>
            Product
            </MenuItem>
            <MenuItem onClick={() => props.history.push("/coupon")}>
             Coupoun
            </MenuItem>
            
          </Menu>
        </ProSidebar>
      </div>
    </div>
  );
};

export default Sidebar;
