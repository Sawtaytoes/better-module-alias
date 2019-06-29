// This package takes inspiration from module-alias
// https://github.com/ilearnio/module-alias

const globalModuleAlternative = require('module')
const path = require('path')

// Guard against poorly mocked module constructors
const Module = (
	module.constructor.length > 1
	? module.constructor
	: globalModuleAlternative
)

const moduleAliases = {}
const moduleAliasNames = []

const getBasePathFromFilePath = (
	filepath => (
		filepath
		.replace(
			/^(.+)[\\/]node_modules$/,
			'$1',
		)
	)
)

const getModifiedRequest = ({
	alias,
	parentModule,
	requestedFilePath,
}) => {
	const parentFilePath = (
		parentModule
		.paths
		.find(filePath => (
			moduleAliases[
				getBasePathFromFilePath(
					filePath
				)
			]
		))
	)

	if (!parentFilePath) {
		throw new Error(
			`The file at '${requestedFilePath}' does not exist.`
			.concat('\n\n')
			.concat('Verify these paths:')
			.concat('\n')
			.concat(
				JSON
				.stringify(
					moduleAliases,
					null,
					2,
				)
			)
		)
	}

	const basePath = (
		getBasePathFromFilePath(
			parentFilePath
		)
	)

	const aliasTarget = (
		moduleAliases[basePath][alias]
	)

	return (
		requestedFilePath
		.replace(
			alias,
			aliasTarget,
		)
	)
}

const originalResolveFilename = (
	Module
	._resolveFilename
)

Module
._resolveFilename = (
	function(requestedFilePath, parentModule, isMain) {
		const alias = (
			moduleAliasNames
			.find(alias => (
				requestedFilePath
				.includes(alias)
			))
		)

		const modifiedFilePath = (
			alias
			? (
				getModifiedRequest({
					alias,
					requestedFilePath,
					parentModule,
				})
			)
			: requestedFilePath
		)

		return (
			originalResolveFilename
			.call(
				this,
				modifiedFilePath,
				parentModule,
				isMain,
			)
		)
	}
)

const addModuleAliases = (
	(basePath, aliases) => {
		Object
		.keys(aliases)
		.map(alias => ({
			alias,
			filePath: (
				path
				.join(
					basePath,
					aliases[alias],
				)
			),
		}))
		.forEach(({ alias, filePath }) => {
			if (!moduleAliases[basePath]) {
				moduleAliases[basePath] = {}
			}

			moduleAliases[basePath][alias] = filePath

			!(
				moduleAliasNames
				.includes(alias)
			)
			&& (
				moduleAliasNames
				.push(alias)
			)
			&& (
				moduleAliasNames
				.sort()
			)
		})
	}
)

const getAliasList = (
	basePath => (
		require(
			basePath
			.concat('/package.json')
		)
		._moduleAliases
	)
)

const setupModuleAliases = (
	basePath => {
		addModuleAliases(
			basePath,
			getAliasList(
				basePath
			),
		)
	}
)

module.exports = setupModuleAliases
