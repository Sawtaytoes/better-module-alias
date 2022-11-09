require('./setupModuleAliases')(__dirname)


// This test is in ./tests/dirTest1
// By only requiring $test1, we are sure the package is correctly updating the path.
const assert = require('assert')
const text1 = require('$test1')
assert.equal(text1, 'It works - 1', "Directory aliasing isn't functioning correctly.")

// This test is in ./tests/dirTest1
// By only requiring $test2, we are sure the package is correctly updating the path.
require('./setupModuleAliases')(__dirname, {"$test2": "./tests/dirTest2"})
const text2 = require('$test2')
assert.equal(text2, 'It works - 2', "Directory aliasing isn't functioning correctly.")

console.info('All tests passing!')
		