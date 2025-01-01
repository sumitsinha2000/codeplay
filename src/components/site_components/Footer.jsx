import PropTypes from "prop-types";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa6";

function Footer(props) {
  return (
    <footer className="fixed left-0 z-20  border-t  py-6  md:px-8 md:py-0  bottom-0 w-full bg-secondary">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center leading-loose text-muted-foreground md:text-left text-base">
          &copy; Copyright{/* */} {props.author}, {props.dateText}
        </p>
        <div className="social-icons flex flex-row justify-between ">
          <ul className="list-none flex flex-row justify-between h-full gap-4">
            <li className="h-8 w-8">
              <a href={props.linkfb} target="_new">
                <FaFacebook size="1.5rem" title="facebook" color="olive" />
              </a>
            </li>
            <li className="h-8 w-8">
              <a href={props.linkInsta} target="_new">
                <FaInstagram size="1.5rem" title="instagram" color="olive" />
              </a>
            </li>
            <li className="h-8 w-8">
              <a href={props.linkIn} target="_new">
                <FaLinkedin size="1.5rem" title="linked in" color="olive" />
              </a>
            </li>
            <li className="h-8 w-8">
              <a href={props.linkGit} target="_new">
                <FaGithub size="1.5rem" title="github" color="olive" />
              </a>
            </li>
            <li className="h-8 w-8">
              <a href={props.linkYt} target="_new">
                <FaYoutube size="1.5rem" title="youtube" color="olive" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  author: PropTypes.string,
  dateText: PropTypes.string,
  linkfb: PropTypes.string,
  linkInsta: PropTypes.string,
  linkIn: PropTypes.string,
  linkGit: PropTypes.string,
  linkYt: PropTypes.string,
};

export default Footer;
