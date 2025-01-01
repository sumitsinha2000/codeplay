import PropTypes from "prop-types";
import Navigation from "./Navigation";
function Header(props) {
  return (
    <header>
      <Navigation />
    </header>
  );
}

Header.propTypes = { headerText: PropTypes.string };

export default Header;
