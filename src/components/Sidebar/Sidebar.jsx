import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import SubMenu from "./SubMenu";
import { MenuCollapseIcon, MenuOpenIcon } from "../Icons";
import { SidebarDataClassAdmin, SidebarDataStudent, SidebarDataSuperAdmin, SidebarDataTrainer } from "../../assets/data/SidebarData";
import { useSelector } from "react-redux";



const cx = classNames.bind(styles);

function Sidebar() {

  const [openNavigation, setOpenNavigation] = useState(false);
  const toggleNavigation = () => setOpenNavigation(!openNavigation);
  // console.log(SidebarData)

  const { userDTO } = useSelector(state => state.auth)

  let sidebarList = []
  switch (userDTO?.roleName) {
    case 'Super Admin':
      sidebarList = SidebarDataSuperAdmin
      break;
    case 'Class Admin':
      sidebarList = SidebarDataClassAdmin
      break;
    case 'Trainer':
      sidebarList = SidebarDataTrainer
      break;
    case 'Student':
      sidebarList = SidebarDataStudent
      break;
  }

  // console.log(sidebarList)

  return (
    <div
      className={
        openNavigation ? cx("sidebar", "sidebar-respon") : cx("sidebar")
      }
    >
      <div className={cx("top-bar")}>
        {openNavigation ? (
          <span onClick={toggleNavigation}>
            <MenuCollapseIcon />
          </span>
        ) : (
          <span onClick={toggleNavigation}>
            <MenuOpenIcon />
          </span>
        )}
      </div>
      {sidebarList?.map((item, index) => (
        <SubMenu key={index} item={item} openNavigation={openNavigation} />
      ))}
    </div>
  );
}

export default Sidebar;
