import { NavLink } from "react-router-dom";
const Nav = () => {
  const handleActvie = ({ isActive }) => {
    return isActive ? "h4 mt-5 mx-2 active-link" : "h4 mt-5 mx-2";
  };
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <span>
          <NavLink className="navbar-brand" to="/">
            首頁
          </NavLink>
        </span>

        <span>
          <NavLink className={handleActvie} to="/login">
            登入
          </NavLink>
        </span>

        <span className="btn btn-outline-dark position-relative" type="submit">
          <NavLink className={handleActvie} to="/checkout">
            結帳
          </NavLink>
          <span className="badge text-bg-danger position-absolute top-0 start-100 translate-middle"></span>
        </span>
      </div>
    </nav>
  );
};

export default Nav;
