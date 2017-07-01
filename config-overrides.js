
module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config.resolve.modules = ["node_modules", "src"];
  config.module.rules[3].options.plugins= [
    "transform-decorators-legacy"
  ]
  return config;
};
