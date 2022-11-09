require('./setupModuleAliases')(__dirname,
	// {"$dirTest": "./dirTest"}, // To test the secondary method, edit package.json and uncomment this
	)

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
