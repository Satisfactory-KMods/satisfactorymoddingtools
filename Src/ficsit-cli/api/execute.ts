import { TypedDocumentString } from './types/graphql';

export async function execute<TResult, TVariables>(
	query: TypedDocumentString<TResult, TVariables>,
	...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
) {
	const response = await fetch('https://api.ficsit.app/v2/query', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json, multipart/mixed'
		},
		body: JSON.stringify({
			query,
			variables
		})
	});

	if (!response.ok) {
		throw new Error('Network response was not ok');
	}

	return (await response.json()).data as TResult;
}
