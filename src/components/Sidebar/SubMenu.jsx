import React, { useState } from "react";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
// import { setModeCreate } from "~/redux/actions/mode";
import styles from "./Sidebar.module.scss";

const cx = classNames.bind(styles);

function SubMenu({ item, openNavigation }) {
  // const account = useSelector((state) => state.account.account);
  // const role = useSelector((state) => state.account.role);
  //============================
  //Testing ~~~

  const account = 'Super Admin'
  const role = 'Class Admin'


  //============================
  const dispatch = useDispatch();

  const [openSubNav, setOpenSubNav] = useState(false);
  const toggleSubNav = () => setOpenSubNav(!openSubNav);

  const setMode = () => {
    // dispatch(setModeCreate());
  };

  return (
    <div className={cx("nav-box")}>
      <div
        to={item.path}
        className={
          openNavigation ? cx("nav-item", "nav-item-res") : cx("nav-item")
        }
        onClick={toggleSubNav}
      >
        <NavLink to={item.path} className={cx("nav-title")}>
          <div className={cx("icon")}>{item.icon}</div>
          <div
            className={openNavigation ? cx("title", "display") : cx("title")}
          >
            {item.title}
          </div>
        </NavLink>
        <div
          className={
            openNavigation ? cx("arrow-icon", "display") : cx("arrow-icon")
          }
        >
          {item.subNav && openSubNav ? item.iconClosed : item.iconOpened}
        </div>
      </div>
      {!openNavigation &&
        openSubNav &&
        item.subNav &&
        item.subNav.map((nav, index) => (
          <div key={index}>
            {(account && role === "Super Admin") ||
              (account && role === "Class Admin") ? (
              <NavLink
                to={nav.path}
                className={(nav) => cx("sub-item", { active: nav.isActive })}
                onClick={setMode}
              >
                <div className={cx("icon")}></div>
                <div className={cx("sub-title")}>{nav.title}</div>
              </NavLink>
            ) : (
              <NavLink className={cx("sub-item-disable")}>
                <div className={cx("icon")}></div>
                <div className={cx("sub-title")}>{nav.title}</div>
              </NavLink>
            )}
          </div>
        ))}
    </div>
  );
}



export default SubMenu;
