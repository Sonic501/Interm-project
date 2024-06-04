
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import React from "react";


function HeaderFooterOnly({ children }) {
  return (
    <div>
      <Header />
      <div className="containers">
        <div className="content">{children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default HeaderFooterOnly;
