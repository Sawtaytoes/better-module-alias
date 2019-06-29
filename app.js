require('./setupModuleAliases')(__dirname)

const assert = require('assert')
const text = require('$dirTest')

assert
.equal(
	text,
	'It works!',
	"Directory aliasing isn't functioning correctly.",
)

console
.info('All tests passing!')
