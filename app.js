require('./setupModuleAliases')(__dirname)


// This test is in ./tests/dirTest1
// By only requiring $test1, we are sure the package is correctly updating the path.
const assert = require('assert')
const text1 = require('$test1')
assert.equal(text1, 'It works - 1', "Directory aliasing is not working from the package.json")

// This test is in ./tests/dirTest1
// By only requiring $test2, we are sure the package is correctly updating the path.
require('./setupModuleAliases')(__dirname, {"$test2": "./tests/dirTest2"})
const text2 = require('$test2')
assert.equal(text2, 'It works - 2', "Directory aliasing is not working from the alias object (second argument)")


// This test is in ./tests/mid$test
// This will ensure module aliases are not read in the MIDDLE of the path; only the beginning.
require('./setupModuleAliases')(__dirname, {"$": "./this-should-not-be-found"})
const text3 = require('./tests/mid$test')
assert.equal(text3, 'It works - mid$test', "Directory aliasing is not working from the alias object (second argument)")

console.info('All tests passing!')
		