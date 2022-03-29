// const {injectBabelPlugin} = require('react-app-rewired');
// const rewireLess = require("./rewire-less");
const modifyVars = {
    '@card-head-padding': '8px',
    '@card-inner-head-padding': '6px',
    '@card-padding-base': '12px',
    '@card-padding-wider': '16px',
};
//
// module.exports = function override(config, env) {
//     config = injectBabelPlugin(
//         ['import', {libraryName: 'antd', libraryDirectory: 'es', style: true}],
//         config,
//     );
//     config = rewireLess.withLoaderOptions({
//         modifyVars,
//         javascriptEnabled: true
//     })(config, env);
//     return config;
// };
const {
    override,
    fixBabelImports,
    addLessLoader,
} = require("customize-cra");
module.exports = override(
    fixBabelImports("import", {
        libraryName: "antd", libraryDirectory: "es", style: true // change importing css to less
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars
    })
);
