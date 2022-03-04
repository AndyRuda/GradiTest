/** @type {import('gatsby').GatsbyConfig} */
module.exports = {
  pathPrefix: "/GradiTest",
  plugins: ["gatsby-plugin-antd","gatsby-plugin-react-helmet", {
    resolve: 'gatsby-plugin-manifest',
    options: {
      "icon": "src/images/icon.png"
    }}, 
    {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }]
};