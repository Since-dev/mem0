const tsParser = require('@typescript-eslint/parser');
const n8nNodesBase = require('eslint-plugin-n8n-nodes-base');

module.exports = [
	{
		ignores: ['eslint.config.js', '**/*.js', '**/node_modules/**', '**/dist/**'],
	},
	{
		files: ['package.json', 'credentials/**/*.ts', 'nodes/**/*.ts'],
		languageOptions: {
			parser: tsParser,
			parserOptions: { sourceType: 'module', extraFileExtensions: ['.json'] },
		},
		plugins: { 'n8n-nodes-base': n8nNodesBase },
	},
	{
		files: ['package.json'],
		rules: {
			...n8nNodesBase.configs.community.rules,
			'n8n-nodes-base/community-package-json-name-still-default': 'off',
			'n8n-nodes-base/community-package-json-license-not-default': 'off',
		},
	},
	{
		files: ['credentials/**/*.ts'],
		rules: {
			...n8nNodesBase.configs.credentials.rules,
			// This rule only applies to nodes in n8n's main repository (where
			// documentationUrl is an internal docs slug). Community nodes use a
			// full external URL, so it is disabled here.
			'n8n-nodes-base/cred-class-field-documentation-url-miscased': 'off',
		},
	},
	{
		files: ['nodes/**/*.ts'],
		rules: {
			...n8nNodesBase.configs.nodes.rules,
			// Superseded by the verification scanner's `@n8n/community-nodes`
			// node-connection-type-literal rule, which requires
			// NodeConnectionTypes.Main instead of the 'main' string literal.
			// n8n's own scanner disables these two, so we match it.
			'n8n-nodes-base/node-class-description-inputs-wrong-regular-node': 'off',
			'n8n-nodes-base/node-class-description-outputs-wrong': 'off',
		},
	},
];
