import { execute } from '../execute';
import { graphql } from '../types';

export async function getModVersions(mod: string): Promise<string[]> {
	const GetModVersions = graphql(`
		query GetMod($mod: ModReference!) {
			getModByReference(modReference: $mod) {
				versions {
					version
				}
			}
		}
	`);

	const result = await execute(GetModVersions, {
		mod
	});

	if (result.getModByReference) {
		return result.getModByReference.versions.map((v: { version: string }) => v.version);
	} else {
		throw new Error(`Mod ${mod} not found`);
	}
}

export async function hasVersion(mod: string, version: string): Promise<boolean> {
	const versions = await getModVersions(mod);
	return versions.includes(version);
}

export async function getModId(mod: string): Promise<boolean> {
	const GetModId = graphql(`
		query GetModId($mod: ModReference!) {
			getModByReference(modReference: $mod) {
				id
			}
		}
	`);

	const result = await execute(GetModId, {
		mod
	});

	if (result.getModByReference) {
		return result.getModByReference.id;
	} else {
		throw new Error(`Mod ${mod} not found`);
	}
}
