import React from "react";

function Button({ onClick, children }) {
    return <button type="submit" onClick={onClick}>{children}</button>;
}

export default Button;
