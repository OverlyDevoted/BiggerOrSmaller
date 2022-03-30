import classes from "./Footer.module.css";
function Footer(props) {
  return <footer className={classes.footer}>{props.creatorText}</footer>;
}
export default Footer;
