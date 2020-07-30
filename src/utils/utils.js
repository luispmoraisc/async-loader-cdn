/**
 * @namespace Utils
 */

/**
 * @memberof Utils
 * @param {String} tag
 * @param {Object} attrs
 * @function createElement
 * @description create element html
 * @return {HTML}
 */
const createElement = (tag = 'div', attrs = {}) => {
  try {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      el.setAttribute(k, v);
    }

    return el;
  } catch (err) {
    console.log(err); // eslint-disable-line
    return false;
  }
};

/**
 * @memberof Utils
 * @param {WeakMap} weakMap weakmap to change
 * @param {Object} instance instance of the class
 * @param {Object} properties properties to set
 * @description Método responsável por atualizar as propriedades do weakmap
 * @function setPrivateProperties
 */
const setPrivateProperties = (weakMap, instance = {}, properties = {}) => {
  weakMap.set(instance, {
    ...weakMap.get(instance),
    ...properties,
  });
};

export { createElement, setPrivateProperties };
