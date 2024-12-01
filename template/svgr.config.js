const componentTemplate = (variables, context) => {
  // const mapping = {
  //   COMPONENT_NAME: variables.componentName,
  //   JSX: variables.jsx,
  //   EXPORTS: variables.exports,
  //   NEWLINE: "\n"
  // };

  return context.tpl(`
  ${variables.imports};

  const ${variables.componentName} = (${variables.props}) => (
    ${variables.jsx}
  );

  ${variables.exports};
  `);

  // /**
  //  * API Docs: https://babeljs.io/docs/en/babel-template#api
  //  */
  // const typeScriptTpl = context.tpl(code);

  // return typeScriptTpl(mapping);
};

module.exports = {
  typescript: true,
  icon: true,
  native: true,
  memo: false,
  // jsxRuntime: "classic",
  svgProps: {
    // width: "inherit",
    // height: "inherit"
  },
  replaceAttrValues: {
    // "#00164E": "currentColor"
  },
  plugins: [
    // Clean SVG files using SVGO
    '@svgr/plugin-svgo',
    // Generate JSX
    '@svgr/plugin-jsx',
    // Format the result using Prettier
    '@svgr/plugin-prettier',
  ],
  svgoConfig: {
    plugins: [
      // {
      //   "name": "preset-default",
      //   "params": {
      //     "overrides": {
      //       "removeTitle": false
      //     }
      //   }
      // }
    ],
  },
  // template: componentTemplate
};
