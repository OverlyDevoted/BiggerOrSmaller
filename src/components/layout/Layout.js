import classes from "./Layout.module.css";
import MainNavigation from "./MainNavigation";
import Footer from "./Footer";
function Layout(props) {
  const style = { position: "static" };
  return (
    <div style={{ height: "100%" }}>
      <MainNavigation />
      <main className={classes.main}>
        <MainNavigation style={style} />
        {props.children}
      </main>
      <Footer creatorText={props.creatorText} />
    </div>
  );
}
export default Layout;
