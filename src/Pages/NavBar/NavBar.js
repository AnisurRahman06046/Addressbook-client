import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    console.log("logout");
    logOut()
      .then(() => {})
      .catch((err) => console.error(err));
  };
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/mycontacts">My Contacts</Link>
            </li>
            {user?.uid ? (
              <>
                <li>
                  <button onClick={handleLogOut}>Log Out</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Log In</Link>
                </li>

                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
