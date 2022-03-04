import * as React from "react";

const IndexPage = () => {
  // Redirect to "/product/free-trainer-3-mmw.js";
  React.useEffect(() => {
    window.location.pathname = "/product/free-trainer-3-mmw.js";
  }, []);

  return null;
};

export default IndexPage;
