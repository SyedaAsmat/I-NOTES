//import React from "react";

const Header = ({handleToggleDarkMode}) => {
    return (
        <div className="header">
            <h1>I-NOTES</h1>
            <button className="toggle-btn" onClick={()=> handleToggleDarkMode(
                (previousDarkMode)=>!previousDarkMode
                )}>Change Mode</button>
        </div>
    );
};

export default Header;