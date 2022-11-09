_[`better-module-alias`](https://www.npmjs.com/package/better-module-alias) is an improved version of the fantastic [`module-alias`](https://github.com/ilearnio/module-alias) package._

# Better Module Alias
Fix the issue of having to do relative paths like:
```
require('../../../../some/deep/module')
```

Instead, make your code look like:
```
require('$utils/some/deep/module')
```

## How do I use it?

### package.json
_This package uses the same `package.json` formatting as [`module-alias`](https://github.com/ilearnio/module-alias)._

In your `package.json`, add a `_moduleAliases` object formatted like this:

```json
{
  "_moduleAliases": {
    "$tests": "./tests",
    "$utils": "./utils",
  },
}
```


- _**NOTE:** Prefixing with `$` is considered a best-practice so it doesn't interfere with `@`-scoped npm packages._
- _**NOTE:** We prefix a `$` so it's obvious which imports are from npm packages and which come from `better-module-alias`._

### Node.js
_**NOTE:** `better-module-alias` has to be imported before any `$` imports in your root code file, or it won't work._

If you want to use `better-module-alias` in Node.js, you'll need to import this package at the top of the file that gets run in your `node` command such as `./index.js`.

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

An *alternative* way is to call the betterModuleAlias function, and pass the aliases as the second argument.
```js
require('better-module-alias')(__dirname, {
  $tests: './tests',
  $utils: './utils',
})
```

import betterModuleAlias from 'better-module-alias'
betterModuleAlias(__dirname)
```

#### Examples

##### Will work:
```js
// index.js
require('better-module-alias')(__dirname)
const someModule = require('$utils/someModule')
```

##### Won't work:
```js
// index.js
const someModule = require('$utils/someModule')
require('better-module-alias')(__dirname)
```

#### Issues with `fs`

Libraries like `fs` won't work with `better-module-alias` because it's overriding the `require` functionality of CommonJS, not file lookups in other libraries. The way to get around that is by using `require.resolve`.

Where you might have done:
```js
fs.readFile(
  '../../../../some/deep/module',
  callback,
)
```

You can use `require.resolve` to do this instead:
```js
fs.readFile(
  require.resolve('$utils/some/deep/module'),
  callback,
)
```

That'll allow you to get the same functionality without having to have 2 ways of writing the same code.

### Webpack
Webpack has a built in support for aliases and custom modules directories.

Add this code to your Webpack config to get it working with `better-module-alias`:

```js
const packageJson = require('./package.json')

const webpackConfig = {
  // ...
  resolve: {
    alias: {
      ...packageJson._moduleAliases,
    },
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
