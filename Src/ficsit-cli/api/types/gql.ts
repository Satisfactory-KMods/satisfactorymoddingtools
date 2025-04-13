/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n\t\tquery GetMod($mod: ModReference!) {\n\t\t\tgetModByReference(modReference: $mod) {\n\t\t\t\tversions {\n\t\t\t\t\tversion\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t": typeof types.GetModDocument,
    "\n\t\tquery GetModId($mod: ModReference!) {\n\t\t\tgetModByReference(modReference: $mod) {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t": typeof types.GetModIdDocument,
};
const documents: Documents = {
    "\n\t\tquery GetMod($mod: ModReference!) {\n\t\t\tgetModByReference(modReference: $mod) {\n\t\t\t\tversions {\n\t\t\t\t\tversion\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t": types.GetModDocument,
    "\n\t\tquery GetModId($mod: ModReference!) {\n\t\t\tgetModByReference(modReference: $mod) {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t": types.GetModIdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\tquery GetMod($mod: ModReference!) {\n\t\t\tgetModByReference(modReference: $mod) {\n\t\t\t\tversions {\n\t\t\t\t\tversion\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"): typeof import('./graphql').GetModDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\tquery GetModId($mod: ModReference!) {\n\t\t\tgetModByReference(modReference: $mod) {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t"): typeof import('./graphql').GetModIdDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
