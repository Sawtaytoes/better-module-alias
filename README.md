# Better Module Aliases
A forked and improved version of the fantastic [`module-alias`](https://github.com/ilearnio/module-alias) package designed to include support for package linking in `node_modules/`.

This fixes the issue of having to do `require('../../../../some/deep/module')`.

Instead, this package lets you do `require('$utils/some/deep/module')`.

## How to use it?

In your `package.json`, add an object formatted like this:

```json
{
  "_moduleAliases": {
    "$tests": "./tests"
    "$utils": "./utils"
  },
}
```

_**NOTE:** Using `$` is a way of namespacing imports so you can easily know which ones were configured from `better-module-alias`._

_**NOTE:** Using `$` is considered a best-practice so it doesn't interfere with `@`-scoped npm packages._

Before doing anything, you will need to import `better-module-alias` at the top of your `index.js` file:

```js
require('better-module-alias')(__dirname)

// or

import betterModuleAlias from 'better-module-alias'
betterModuleAlias(__dirname)
```

When you want to require an aliased file, do it like so:

```js
const someModule = require('$utils/someModule')

// or

import someModule from '$utils/someModule'
```

##  Usage with WebPack
Webpack has a built in support for aliases and custom modules directories.

Add this code to your Webpack config:

```js
const packageJson = require('./package.json')

module.exports = {
  // ...
  resolve: {
    alias: packageJson._moduleAliases || {},
  },
  // ...
}
```

## FAQ

### Why this version?

Because I fixed an issue inherit in the original `module-alias` where you can't use `npm link` or `yarn link` with other packages also using `module-alias`. This also fixes the issue where you might be using `module-alias` in your main package, but also one in `node_modules/`.

### Why not make a PR in the original `module-alias`?

I did, and it wasn't accepted.

`module-alias` works by also going into subdirectories and linking up packages in `node_modules` as well when linking.

Instead of going through that,

### What about `app-module-path`?

I used to use `app-module-path` in the past and suffered less issues than `module-alias`, but it also didn't do what I needed. Instead, I created this library.
