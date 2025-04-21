import { config } from 'dotenv';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import 'zx/globals';
import { getModId, hasVersion } from './api/helper/getModInfos';
config();
usePwsh();
const FICSIT_TOKEN = process.env.FICSIT_TOKEN;
if (!FICSIT_TOKEN) {
	throw new Error('FICSIT_TOKEN is not set in the environment variables');
}

$.log = (msg) => {
	// @ts-ignore
	if (!msg?.data?.toString) return;
	const date = new Date();
	const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(
		2,
		'0'
	)} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
	// @ts-ignore
	console.log(`[${formattedDate}]: ${msg.data.toString()}`);
};

const modingRootDir = 'E:\\SF_Modding';
const modGroups = [['KBFL', 'KAPI'], ['KPrivateCodeLib', 'KUI'], ['KLib'], ['SatisfactoryPlus']];

const defaultMdDescription = `[PRE-RELEASE-VERSION] Read description in the mod page of SatsifactoryPlus on Ficsit.app for more information.

## Whats in the pre-release version?
- Overhaul of the mod 
- New recipes, Mod API for external mods (KAPI documentation will be available soon for more information context my (Kyrium) on discord)
- New mod settings
- Tier 0-6 

## Contenlib Patch
Currently is not everything implemented in the base mod it's recommended to use the contentlib patch for the mod.
thats avilable on our discord server here: https://discord.com/channels/850965794581512192/959739116910698536/1346565286110953523

## Important
This is a pre-release version of the mod. 
Thats mean this version is not the final version and may contain bugs or incomplete features.

## Known missing features
- Missing localization
- Missing mod settings
- Missing mod icon for signs
- Not implemented MAM research
- And many WIP features
- Faxit is currently not implemented in the mod
`;

for (const group of modGroups) {
	await Promise.allSettled(
		group.map(async (mod) => {
			const uPlugin = JSON.parse(await readFile(join(modingRootDir, 'Mods', mod, `${mod}.uplugin`), 'utf-8'));

			const version = uPlugin.SemVersion;
			console.log(`Mod ${mod} will updated to version:`, version);

			const modId = await getModId(mod);
			const has = await hasVersion(mod, version);
			if (has) {
				console.log(`Mod ${mod} has version ${version}`);
				return mod;
			}

			const archivePath = join(modingRootDir, 'Saved\\ArchivedPlugins', mod, `${mod}.zip`);
			if (!existsSync(archivePath)) {
				throw new Error(`Mod ${mod} archive not found: ${archivePath}`);
			}

			const exe = join(import.meta.dirname, 'exe', 'ficsit_windows_amd64.exe');

			const APIURL = 'https://api.ficsit.app';

			await $`& ${exe} smr upload --api-base ${APIURL} --api-key ${FICSIT_TOKEN} ${modId} ${archivePath} "Fix Dependency version for RP, FF, Fluid Extras to use exact version"`;
			return mod;
		})
	).then((result) => {
		for (const res of result) {
			if (res.status === 'rejected') {
				throw new Error(`Mod upload failed: ${res.reason}`);
			} else {
				console.log(`Mod uploaded successfully: ${res.value}`);
			}
		}
	});
}
