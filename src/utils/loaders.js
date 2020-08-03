import Lazy from './lazy';
/**
 * @namespace Loaders
 */

/**
 * @memberof Loaders
 * @param {Object} firebaseConfig
 * @function loadFirebase
 * @description Método responsável por carregar o firebase e fazer a sua configuração
 * @return {FirebaseInstance}
 */
const loadFirebase = async (firebaseConfig = {}) => {
  if (window.firebase) return;
  const firebaseLoad = new Lazy({
    src: firebaseConfig.cdnFirebase,
    async: true,
    global: 'firebase',
    type: 'script',
  });
  const firestoreLoad = new Lazy({
    src: firebaseConfig.cdnFirestore,
    async: true,
    global: 'firestore',
    type: 'script',
  });

  delete firebaseConfig.cdnFirebase;
  delete firebaseConfig.cdnFirestore;
  const firebase = await firebaseLoad.load();
  await firestoreLoad.load();
  const app = firebase?.initializeApp(firebaseConfig);
  return firebase?.firestore(app);
};

/**
 * @memberof Loaders
 * @param {String} src
 * @param {String} type
 * @param {String} global
 * @param {Function} resolve
 * @function loadFile
 * @description Método responsável por fazer os carregamentos da CDN
 */
const loadFile = async (src = '', type = '', global = '', resolve) => {
  try {
    if (!src || !type) throw new Error('The properties link and type is required.');
    const file = new Lazy({
      src,
      global,
      type,
    });

    const loadModule = await file?.load();
    resolve(loadModule);
  } catch (err) {
    console.error('Ocurred error when loading files, check cdn and version'); // eslint-disable-line
  }
};

/**
 * @memberof Loaders
 * @param {Object} firebaseConfig
 * @function connect
 * @description Método responsável pela instancia do firebase
 */
const connect = async (firebaseConfig = {}) => {
  if (Object.keys(firebaseConfig).length < 1) throw new Error('You need provide a firebase object config. Check docs.');

  const { collection, doc, property } = firebaseConfig.search;

  if (!collection || collection === '' || !doc || doc === '')
    throw new Error('You need provide a search property to use firebase');

  delete firebaseConfig.search;
  const db = await loadFirebase(firebaseConfig);
  const collectionFirebase = await db?.collection(collection)?.doc(doc)?.get();
  const returned = collectionFirebase?.data();
  return returned[property];
};

export { loadFile, connect };
