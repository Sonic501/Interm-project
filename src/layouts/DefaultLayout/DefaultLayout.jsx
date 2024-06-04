import React from "react";
import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";


const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx("wrapper")}>
            <Header />
            <div className={cx("containers")}>
                <Sidebar />
                <div className={cx("content")}>{children}</div>
            </div>
            <Footer />
        </div>
    );
}



export default DefaultLayout;
