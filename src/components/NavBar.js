import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../css/Nav.css"

function NavBar() {
    const [show, handleShow] = useState(false);
    const navigate = useNavigate();

    useEffect (() => {
        window.addEventListener("scroll", () => {
            handleShow(window.scrollY > 100 ? true : false)
        });
    }, []);

  return (
    <div className={`nav ${show && 'nav__black'}`}>
        <img 
            onClick={() => navigate("/")}
            className='nav__logo'
            src="https://www.freepnglogos.com/uploads/netflix-logo-circle-png-5.png"
            alt="Netflix Logo" />

        <img 
            onClick={() => navigate("/profile")}
            className='nav__avatar'
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117"
            alt="User Avatar Logo" />
    </div>
  )
}

export default NavBar