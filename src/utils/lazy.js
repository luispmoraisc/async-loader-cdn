import { createElement } from './utils';
/**
 * @memberof Lazy
 * @constant head
 * @type {HTML}
 * @description elemento head para inserção dos scripts e styles
 */
const head = document.querySelector('head');

/**
 * @memberof Lazy
 * @constant privateProperties
 * @type {WeakMar}
 * @description guarda de forma oculta as propriedades da classe
 */
const privateProperties = new WeakMap();

/**
 * @class Lazy
 * @classdesc responsável por fazer o carregamento assincrono
 * @constructs Lazy
 * @param {Object} options
 * @example const firebase = new Lazy({
 *  src: 'https://www.gstatic.com/firebasejs/6.2.0/firebase-app.js',
 *  global: 'firebase',
 *  async: true,
 *  type: 'script'
 * });
 */
export default class Lazy {
  constructor(options = {}) {
    privateProperties.set(this, {
      _src: options.src || '',
      _global: options.global || '',
      _async: options.async || false,
    });

    this.isLoaded = false;
  }

  checkCacheBurst(str) {
    const check = str.split('?');
    if (check.length > 1) return { type: check[0], date: `?${check[1]}` };
    return { type: check[0], date: '' };
  }

  /**
   * @memberof Lazy
   * @method decisorType
   * @description Método responsável por criar o elemento conforme o type
   * @return {HTMLElement}
   */
  decisorType() {
    const { _src, _async } = privateProperties.get(this);
    if (!_src) throw new Error(`You didn't provide a src`);
    const { type, date } = this.checkCacheBurst(_src.split('.').pop());

    if (type === 'js')
      return createElement('script', { type: 'text/javascript', async: _async, src: `${_src}${date}` });
    else if (type === 'css') return createElement('link', { rel: 'stylesheet', href: `${_src}${date}` });
  }

  /**
   * @memberof Lazy
   * @method loadFile
   * @description Método responsável por criar e fazer o carregamento do ativo
   * @return {Promise}
   */
  loadFile() {
    const { _src } = privateProperties.get(this);

    return new Promise((resolve, reject) => {
      const load = this.decisorType();
      load.onload = () => {
        this.isLoaded = true;
        resolve(load);
      };
      load.onerror = () => {
        this.isLoaded = false;
        reject(new Error(`Failed load ${_src}`));
      };
      head.appendChild(load);
    });
  }

  /**
   * @memberof Lazy
   * @method load
   * @description Método responsável por chamar o loadFile e retornar a instancia do script carregado
   * @return {Promise}
   */
  load() {
    const { _global } = privateProperties.get(this);
    return new Promise((resolve, reject) => {
      if (!this.isLoaded) {
        this.loadFile()
          .then((data) => {
            if (!data) reject(`Failed load`);
            resolve(window[_global]);
          })
          .catch((err) => reject(err));
      } else {
        resolve(window[_global]);
      }
    });
  }
}
