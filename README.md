<h1 align="center">
  <img src="https://github.com/luispmoraisc/async-loader-cdn/blob/master/assets/logo.png?raw=true" height="80px"/>
</h1>
<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/luispmoraisc/async-loader-cdn.svg">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/luispmoraisc/async-loader-cdn.svg">
  
  <a href="https://github.com/luispmoraisc/async-loader-cdn/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/luispmoraisc/async-loader-cdn.svg">
  </a>

  <a href="https://github.com/luispmoraisc/async-loader-cdn/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/luispmoraisc/async-loader-cdn.svg">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
</p>

## Instalation

Using npm:

```shell
$ npm i async-loader-cdn
```

## UPDATES

- Change browser support to > 25%
- Resolve fixture head.append to head.appendChild

## What is AsyncLoaderCDN?

The `AsyncLoaderCDN` is a module that exposes a configurable class, where it has just one method: `loader`. This method
is responsible for reading an informed list (either a fixed list or a firebase return), locating the item specified as a
parameter in the method and uploading all necessary files. The load method returns a `Promise` when resolved it contains
the global reference of what was loaded.

As some libraries are very extensive and large, including them in the project even with
[tree shaking](https://webpack.js.org/guides/tree-shaking/),
[code splitting](https://webpack.js.org/guides/code-splitting/), in addition to requiring a more advanced configuration
(just like in the case of webpack) can generate a final large file (like firebase library for example).

With `AsyncLoaderCDN` you can:

- Significantly reduce your work and the size of the generated files.
- Load resources at runtime and asynchronous mode according to the needs of the aplication state (load on demand)
- Distribute several modes with just one instance, it’s no longer necessary other teams from the same ecosystem use
  their resources through the CDN or package managers.
- When creating a new module, simply add it to the list to make it available for the entire ecosystem where it’s
  inserted.
- Make the same modules available with different versions (new features for example), and the user can choose the
  version that suits at the moment.
- If associated with a database (currently connected to Firebase, look at the exemples section) to save the list of
  modules, it’ll eliminate the need to generate a new release if you need to update CDN links or make a new feature
  available.

## How to use

After installing, you can use in the following ways:

### Import

```javascript
import asyncLoader from 'async-loader-cdn';
const list = [
  {
    global: '_',
    name: 'lodash',
    version: '',
    files: ['https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.19/lodash.min.js'],
  },
];

// use async/await
const myLoaders = new asyncLoader(files);
myLoaders
  .load('lodash')
  .then((_) => {
    if (!_) return console.log('erro');
    console.log(_.VERSION);
  })
  .catch((err) => console.log(err));
```

# Important

If you decide to use the list parameter, you need to send a list with this structure (contract):

```javascript
const list = [
  {
    global: String, // global variable name of the module or project. Ex.: '$' if you want to load jQuery
    name: String, // name that asyncLoaderCDN will look for when the load method is called. Ex.: 'jQuery'
    version: <String|Int>, // if you need distribute multiple versions of the same module.
    files: [String],
  },
];
```

## Examples

- Usage with `firebase` [here](https://github.com/luispmoraisc/async-loader-cdn/blob/master/examples/firebase.js)
- Usage with list parameter [here](https://github.com/luispmoraisc/async-loader-cdn/blob/master/examples/list.js)

## How to contribute

To contribute to the project, fork this repository;

- Create a branch with your feature;
- Commit your changes;
- Push to your branch;
- Open a PR for the master;

After the PR is approved and the merge occurs, you can delete your branch.
