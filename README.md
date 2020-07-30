<h1 align="center">
    Async Loader CDN
</h1>

<img src="https://github.com/luispmoraisc/async-loader-cdn/assets/logo.png" height="300px"/>

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

<p align="center">
  <a href="#-instalation">Instalation</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-what-is-async-load-cdn">Why is AsyncLoaderCDN?</a>
  <a href="#-how-to-use">How to use</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-license">License</a>
</p>

## Instalation

Using npm:

```shell
$ npm i async-loader-cdn
```

## What is AsyncLoaderCDN

As some libraries are very extensive and large, including them in the project even with “tree shaking”, “code
splitting”, in addition to requiring a more advanced configuration (just like in the case of webpack) can generate a
final large file (like firebase library for example).

With AsyncLoaderCDN you can:

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

### Required

```javascript
const asyncLoader = require('async-loader-cdn');
```

### Import

```javascript
import asyncLoader from 'async-loader-cdn';
```
