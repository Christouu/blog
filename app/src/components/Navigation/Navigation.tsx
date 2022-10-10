import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import Logo from "../../img/logo.png";

const Navigation = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="navigation">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="logo image" />
          </Link>
        </div>
        <div className="links">
          <Link to="/?category=art" className="link">
            <h6>ART</h6>
          </Link>
          <Link to="/?category=science" className="link">
            <h6>SCIENCE</h6>
          </Link>
          <Link to="/?category=technology" className="link">
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link to="/?category=cinema" className="link">
            <h6>CINEMA</h6>
          </Link>
          <Link to="/?category=design" className="link">
            <h6>DESIGN</h6>
          </Link>
          <Link to="/?category=food" className="link">
            <h6>FOOD</h6>
          </Link>
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <NavLink className="link" to="login">
              Login
            </NavLink>
          )}
          <span className="write">
            <Link className="link" to="/write">
              Write
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
