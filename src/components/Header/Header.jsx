import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Image from "../Image";
// import accountApi, { getAccount } from "~/redux/actions/account";
// import { logoutAccount } from "~/redux/actions/login";
// import ModalRefreshToken from "../ModalRefreshToken/ModalRefreshToken";
import styles from "./Header.module.scss";
import images from "../../assets/images";
import { logout } from "../../redux/slices/authSlice";

const cx = classNames.bind(styles);

function Header() {
  const dispatch = useDispatch();

  const { token, userDTO } = useSelector((state) => state.auth);
  // const account = useSelector((state) => state.account.account);

  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    // setModalOpen(!modalOpen);
    alert('Modal opened')
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  // const fetchData = async () => {
  //   const acount = await accountApi.getAccount().catch((error) => {
  //     console.log(error);
  //     if (error.status === 401) {
  //       showModal();
  //     }
  //   });
  // };

  useEffect(() => {
    // dispatch(getAccount()); lay acc
    // fetchData(); tim loi~
  }, [dispatch]);

  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        <Image className="logo"
          src={images?.logoPng}
          alt="logo" />

        {/* <Button onClick={showModal}>modal</Button> */}
        <div className={cx("content")}>
          <div className={cx("team")}>
            <Image src={images?.imageHeader} />
            <span className={cx("title")}>uniDate</span>
          </div>
          {token ? (
            <div className={cx("info")}>
              <Image className={cx("user-avatar")} src={userDTO?.image} />
              <div className={cx("name")}>
                <span className={cx("user-name")}>
                  {userDTO?.fullName}

                </span>
                <Link to="/" className={cx("logout")} onClick={handleLogout}>
                  Log out
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {/* <ModalRefreshToken modalOpen={modalOpen} showModal={showModal} /> */}
    </header>
  );
}

export default Header;
