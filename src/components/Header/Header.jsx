import { useContext } from "react";
import "./Header.module.scss";
import { Context } from "../../Context";

const Header = () => {
  const context = useContext(Context)
  return (
    <header>
      <h2>React Form Builder</h2>
      <button onClick={() => context.setPreview(true)}>Preview Form</button>
    </header>
  );
};

export default Header;
