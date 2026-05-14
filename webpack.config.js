const defaultConfig = require("@wordpress/scripts/config/webpack.config"); 

const plugins = defaultConfig.plugins.filter((p) => {
  if (
    Object.values(p).length === 2 &&
    Object.values(p)?.[1]["filename"] &&
    Object.values(p)?.[1]["filename"] === "[name]-rtl.css"
  ) {
    return false;
  }
  return true;
});

module.exports = {
  ...defaultConfig,
  entry: {
    ...defaultConfig.entry(),
    admin: "./src/admin.js",
    public: "./src/public.js",
    dashboard: "./src/dashboard/admin.js",
  },
  plugins: [...plugins],
};