import React from "react";
import HeaderFooterOnly from "../../../layouts/HeaderFooterOnly/HeaderFooterOnly";
import "./LayoutAuthen.scss";

function LayoutAuthen({ children }) {
    return (
        <HeaderFooterOnly>
            <div className="layoutAuthen-ui">{children}</div>
        </HeaderFooterOnly>
    );
}

export default LayoutAuthen;
