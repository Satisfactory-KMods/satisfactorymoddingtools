import * as fs from 'fs';
import * as fse from 'fs-extra';
import { mkdirSync } from 'fs-extra';
import * as Ini from 'ini';
import * as path from 'path';
import { GeneralConfig, LocalizationConfig } from './../Config/ToolConfig';

// read out all Directorys
let LocalizationDirectory: string = path.join(GeneralConfig.ProjectFolder, LocalizationConfig.CopyFrom);

fs.readdir(LocalizationDirectory, (Err, Files) => {
	if (!Err) {
		for (const ModDir of Files) {
			let ModLocalizationDirectory = path.join(LocalizationDirectory, ModDir);
			let ModLocalizationDirectoryStat = fs.statSync(ModLocalizationDirectory);

			// Check if its really a Directory
			if (ModLocalizationDirectoryStat.isDirectory()) {
				let ModPluginPath: string = path.join(GeneralConfig.ProjectFolder, GeneralConfig.ModPluginDir.replaceAll('ModRef', ModDir));
				if (fs.existsSync(ModPluginPath)) {
					let EngineIni: string = path.join(ModPluginPath, 'Config', 'Engine.ini');
					let PluginSettingsIni: string = path.join(ModPluginPath, 'Config', 'PluginSettings.ini');
					let ModPluginLocalizationDir: string = path.join(ModPluginPath, 'Localization');
					let ModResourceDir: string = path.join(ModPluginPath, 'Resources');
					let ModConfigDir: string = path.join(ModPluginPath, 'Config');

					// Check if all directorys are created
					if (!fs.existsSync(ModConfigDir)) {
						mkdirSync(ModConfigDir);
					}

					if (!fs.existsSync(PluginSettingsIni)) {
						fse.copySync('Files/PluginSettings.ini', PluginSettingsIni, { overwrite: false });
					}

					if (!fs.existsSync(EngineIni)) {
						let EngineIniData = {
							Internationalization: {
								LocalizationPaths: LocalizationConfig.LocPath.replaceAll('ModRef', ModDir)
							}
						};
						fs.writeFileSync(EngineIni, Ini.stringify(EngineIniData));
					}

					// Check if all directorys are created
					if (!fs.existsSync(ModResourceDir)) {
						mkdirSync(ModResourceDir);
					}

					// recreate LocDir
					if (fs.existsSync(ModPluginLocalizationDir)) {
						fs.rmSync(ModPluginLocalizationDir, { recursive: true });
						mkdirSync(ModPluginLocalizationDir);
					} else {
						mkdirSync(ModPluginLocalizationDir);
					}

					// Copy data to plugin
					fse.copySync(ModLocalizationDirectory, path.join(ModPluginLocalizationDir, ModDir), { overwrite: true });
					console.log('Copy: ', ModLocalizationDirectory, ' | To: ', path.join(ModPluginLocalizationDir, ModDir));
				}
			}
		}
	}
});
