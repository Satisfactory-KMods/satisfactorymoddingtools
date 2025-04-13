import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	schema: 'https://api.ficsit.app/v2/query',
	documents: ['Src/ficsit-cli/**/*.ts'],
	ignoreNoDocuments: true,
	generates: {
		'./Src/ficsit-cli/api/types/': {
			preset: 'client',
			config: {
				documentMode: 'string'
			}
		},
		'./Src/ficsit-cli/api/schema.graphql': {
			plugins: ['schema-ast'],
			config: {
				includeDirectives: true
			}
		}
	}
};

export default config;
