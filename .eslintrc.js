module.exports = {
	extends: 'erb',
	env: {
		browser: true,
		node: true
	},
	rules: {
		'arrow-parens': ['off'],
		camelcase: [
			0,
			{
				properties: 'never'
			}
		],
		'compat/compat': 'error',
		'consistent-return': 'off',
		'comma-dangle': 'off',
		'generator-star-spacing': 'off',
		'import/no-unresolved': 'error',
		'import/no-extraneous-dependencies': 'off',
		'import/prefer-default-export': 'off',
		'max-len': [
			'error',
			{
				code: 120
			}
		],
		'newline-before-return': 'error',
		'no-console': 'off',
		'no-use-before-define': 'off',
		'no-multi-assign': 'off',
		'no-multiple-empty-lines': [
			'error',
			{
				max: 1
			}
		],
		'no-trailing-spaces': 'error',
		'no-underscore-dangle': [
			'error',
			{
				allow: ['_id', '_original']
			}
		],
		'no-useless-return': 'error',
		'no-unused-vars': 'error',
		'no-unneeded-ternary': 'error',
		'object-curly-spacing': ['error', 'always'],
		'promise/param-names': 'error',
		'promise/always-return': 'error',
		'promise/catch-or-return': 'error',
		'promise/no-native': 'off',
		'react/sort-comp': [
			'error',
			{
				order: [
					'type-annotations',
					'static-methods',
					'lifecycle',
					'everything-else',
					'render'
				]
			}
		],
		'react/jsx-no-bind': '',
		'react/no-array-index-key': 'off',
		'react/jsx-filename-extension': [
			'error',
			{
				extensions: ['.js', '.jsx']
			}
		],
		'react/prefer-stateless-function': 0,
		'react/destructuring-assignment': 0,
		'react/prop-types': 0,
		'jsx-a11y/anchor-is-valid': 0,
		'jsx-a11y/click-events-have-key-events': 0,
		'jsx-a11y/label-has-for': [
			'error',
			{
				required: {
					some: ['nesting', 'id']
				}
			}
		]
	},
	settings: {
		'import/resolver': {
			webpack: {
				config: require.resolve('./configs/webpack.config.eslint.js')
			}
		}
	}
}
