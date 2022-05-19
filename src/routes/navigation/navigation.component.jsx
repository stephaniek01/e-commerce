import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon";
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";

import "./navigation.styles.scss";

import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  const signOutHandler = async () => {
    await signOutUser();
    setCurrentUser(null);
  }

  return (
    <Fragment>
      <div className="navigation">
        <Link to="/" className="logo-container">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link to="/shop" className="nav-link">
            Shop
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutHandler}>Sign Out</span>
          ) : (
            <Link to="/auth" className="nav-link">
              Sign In
            </Link>
          )}
          <CartIcon />
        </div>
         {isCartOpen && <CartDropDown />}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
