import { connect, loadFile, setPrivateProperties } from './utils';

/**
 * @memberof AsyncLoaderCDN
 * @constant privateProperties
 * @type {WeakMap}
 * @description Propriedades privadas da classe
 */
const privateProperties = new WeakMap();

/**
 * @class AsyncLoaderCDN
 * @classdesc Classe principal responsável pela configuração e carregamento
 * @param {Array} projects Lista de projeto caso não vá utilizar o firebase
 * @param {Object} useFirebase Objeto de configuração do firebase
 * @returns {Object} AsyncLoaderCDN
 * @example const asyncLoader = new AsyncLoaderCDN({
 *  global: '_',
 *  name: 'lodash',
 *  version: '',
 *  files: [
 *    {
 *      file: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.19/lodash.min.js',
 *      type: 'script',
 *    },
 *  ],
 * });
 */
export default class AsyncLoaderCDN {
  constructor(projects = [], useFirebase = false) {
    privateProperties.set(this, {
      _useFirebase: useFirebase,
      _projects: projects,
    });
  }

  /**
   * @memberof AsyncLoaderCDN
   * @description Método responsável por fazer o carregamento dos ativos
   * @param {String} project Nome do modulo
   * @param {String} version Versão do módulo caso utilize versões diferentes
   * @method load
   * @returns {Any} function, object or false
   * @example asyncLoader.load('lodash');
   */
  async load(project = '', version = '') {
    const { _projects, _useFirebase } = privateProperties.get(this);
    let listProjects = _projects;
    if (project === '' || !project) throw new Error('Expected name of the project');

    if (!_projects || (_projects.length <= 0 && _useFirebase)) {
      const list = await connect(_useFirebase);
      listProjects = list;
      setPrivateProperties(privateProperties, this, {
        _projects: _projects.concat(list),
      });
    }
    const projectSchema = listProjects.find((x) => x.name === project && x.version === version);

    if (!projectSchema) throw new Error(`The ${project} module doesn't exist, CDN or version ${version} is incorrect!`);

    const { files, global } = projectSchema;

    const filesToLoad = files.map((item) => {
      const { file, type } = item;
      return new Promise((resolve) => loadFile(file, type, global, resolve));
    });

    return Promise.all(filesToLoad).then((values) => {
      const check = (element) => {
        return element !== false;
      };

      if (values && values.every(check)) {
        return window[global];
      }

      return false;
    });
  }
}
