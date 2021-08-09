"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = loader;
exports.raw = void 0;

var _loaderUtils = require("loader-utils");

var _schemaUtils = _interopRequireDefault(require("schema-utils"));

var _options = _interopRequireDefault(require("./options.json"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function loader(content) {
  const options = (0, _loaderUtils.getOptions)(this);
  (0, _schemaUtils.default)(_options.default, options, {
    name: "Node Loader for Vue",
    baseDataPath: "options",
  });
  const name = (0, _loaderUtils.interpolateName)(
    this,
    typeof options.name !== "undefined" ? options.name : "[contenthash].[ext]",
    {
      context: this.rootContext,
      content,
    }
  );
  this.emitFile(name, content);
  return `
try {
  require = new Function('return require;')();
  try {
    const process = require('process');  
    const fs = require('fs');
    if (fs.existsSync(__dirname)) {
      process.dlopen(module, __dirname + '/'  + ${JSON.stringify(name)}${
    typeof options.flags !== "undefined"
      ? `, ${JSON.stringify(options.flags)}`
      : ""
  });
    } else {
      process.dlopen(module, '${this.resourcePath}'${
    typeof options.flags !== "undefined"
      ? `, ${JSON.stringify(options.flags)}`
      : ""
  });
    }
  } catch (error) {
    throw new Error('node-loader:\\n' + error);
  }
} catch (error) {
  return;
}
`;
}

const raw = true;
exports.raw = raw;
