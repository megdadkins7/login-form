import React from "react";
import { withRouter } from "react-router-dom";

function Header(props) {
  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  const title = capitalize(
    props.location.pathname.substring(1, props.location.pathname.length)
  );
  return (
    <nav>
      <div>
        <span>{props.title || title}</span>
      </div>
    </nav>
  );
}
export default withRouter(Header);
