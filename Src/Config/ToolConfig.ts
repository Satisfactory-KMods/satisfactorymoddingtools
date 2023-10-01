import {
	MainConfig,
	MainConfig_General,
	MainConfig_Localization,
	MainConfig_PackHelper,
	MainConfig_Upgrade,
	MainConfig_VersionControl
} from 'Src/Types/MainConfig';
import * as FS from 'fs';
import * as process from 'process';

const ConfigPath = 'Files/Config/Config.json';

if (!FS.existsSync(ConfigPath)) {
	console.error('Cannot found config >>>', ConfigPath, '<<<');
	process.exit();
}

const CFG = JSON.parse(FS.readFileSync('Files/Config/Config.json').toString()) as MainConfig;
export const ToolConfig: MainConfig = CFG;
export const VersionControlConfig: MainConfig_VersionControl = CFG.VersionControl;
export const GeneralConfig: MainConfig_General = CFG.General;
export const LocalizationConfig: MainConfig_Localization = CFG.Localization;
export const UpgradeConfig: MainConfig_Upgrade = CFG.Upgrade;
export const PackHelperConfig: MainConfig_PackHelper = CFG.PackHelper;
