import Logo from "../../img/logo.png";

const Footer = () => {
  return (
    <footer>
      <img src={Logo} alt="footer logo" />
      <span>
        Made with <b>React.js</b>
      </span>
    </footer>
  );
};

export default Footer;
