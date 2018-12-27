# js-to-file

[![npm version](https://img.shields.io/npm/v/js-to-file.svg)](https://www.npmjs.com/package/js-to-file)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Evaluate js and output result to file

## Install

```sh
$ npm install --save-dev js-to-file
```

## Usage

```
$ js2file templates/ --outDir dist --ext html
```

## Example

```js
// templates/home.js
exports.default = () => "<h1>Hello World</h1>";
```

```html
// dist/home.html
<h1>Hello World</h1>
```
