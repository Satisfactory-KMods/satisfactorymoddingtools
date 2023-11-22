import { UPlugin } from 'Src/Types/FicsitApiHelper';
import { JSON_InformationPatreon } from 'Src/Types/MainConfig';
import * as Compress from 'compressing';
import * as FS from 'fs';
import * as path from 'path';
import * as process from 'process';
import { GeneralConfig, PackHelperConfig } from './Config/ToolConfig';

let ConfigName: string[] = process.argv.splice(2);

const read = async () => {
	for (const mod of ConfigName) {
		let Config = PackHelperConfig.Mods[mod];
		let UPlugin = JSON.parse(
			FS.readFileSync(path.join(GeneralConfig.GameModFolder, Config.MainMod, `${Config.MainMod}.uplugin`)).toString()
		) as UPlugin;
		if (!Config) {
			console.error('Connot find Config for:', process.argv[2]);
			process.exit(0);
		}

		let DevDir = path.join(GeneralConfig.GameModFolder, 'KMod_Devs', 'Patreon', Config.MainMod);
		if (FS.existsSync(DevDir)) {
			FS.rmSync(DevDir, { recursive: true });
		}
		FS.mkdirSync(DevDir, { recursive: true });

		const ZipFileName = `${Config.MainMod}_${UPlugin.SemVersion.replaceAll('.', '')}${Config.SubVersion}.zip`;
		let ZipFile = path.join(DevDir, ZipFileName);
		let InfoJsonFile = path.join(DevDir, 'info.json');
		if (FS.existsSync(ZipFile)) {
			FS.rmSync(ZipFile);
		}

		const ZipStream = new Compress.zip.Stream();
		for (const Mod of Config.Mods) {
			const ModFolder = path.join(GeneralConfig.GameModFolder, Mod);
			if (!FS.existsSync(ModFolder)) {
				console.error('Connot find mod in directory:', ModFolder);
				process.exit(0);
			}
			ZipStream.addEntry(ModFolder);
			console.log('Add to Zip:', ModFolder);
		}

		console.log('Start Packing ', ZipFile);
		const destStream = FS.createWriteStream(ZipFile);
		await new Promise((resolve) => {
			ZipStream.pipe(destStream).on('finish', () => {
				console.log('Finished ', ZipFile);

				let InfoJson: JSON_InformationPatreon = {
					LastVersion: '0.0.0',
					NewVersion: `${UPlugin.SemVersion}${Config.SubVersion}`,
					Roles: PackHelperConfig.Roles,
					FileName: ZipFileName,
					Url: `downloads/${Config.MainMod}/`,
					ChannelId: PackHelperConfig.ChannelId,
					Ref: Config.MainMod,
					ModName: Config.ModName
				};

				FS.writeFileSync(InfoJsonFile, JSON.stringify(InfoJson));
				resolve(null);
			});
		});
	}
};

read();
