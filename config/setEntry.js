const modules = require('./entries');

module.exports = () => {
  const objEntry = {};
  modules.forEach((module) => {
    objEntry[module.chunkName] = module.entryJS;
  });

  return objEntry;
};
