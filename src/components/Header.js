import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

const StyledHeader = styled.nav`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  margin-bottom: -20px;
  font-size: 20px;
`;

function Header(props) {
  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  const title = capitalize(
    props.location.pathname.substring(1, props.location.pathname.length)
  );
  return (
    <StyledHeader>
      <div>
        <span>{props.title || title}</span>
      </div>
    </StyledHeader>
  );
}
export default withRouter(Header);
