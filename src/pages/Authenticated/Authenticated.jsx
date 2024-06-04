import React, { useState } from "react";
import LayoutAuthen from "./LayoutAuthen/LayoutAuthen";
import Login from "./Login/Login";

function Authenticated() {
    const [reload, setReload] = useState(false);

    return (
        <LayoutAuthen>
            <Login />
        </LayoutAuthen>
    );
}

export default Authenticated;
