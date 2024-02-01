import { useState } from "react";
import '../styles/Collapse.scss';
import imgFleche from '../images/Vector.png';

const Collapse = ({
  title,
  content,
  content2,
  content3,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  const setToggle = () => {
    setCollapsed(!collapsed);
  };
  
  return (
    <div className="Collapse">
      <button className="btnCollapse">
        {title}
        <img
          src={imgFleche}
          className={`imgCollapse ${collapsed ? "collapsed" : ""}`}
          alt="Fleche"
          onClick={setToggle}
        />
      </button>
        <div className={`content ${collapsed ? "collapsed" : ""}`}>
          <ul>
            <li>{content}</li>
            <li>{content2}</li>
            <li>{content3}</li>
          </ul>
        </div>
    </div>
  );
};

export default Collapse;