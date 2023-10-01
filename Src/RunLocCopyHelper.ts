import * as FS from 'fs';
import * as FSE from 'fs-extra';
import * as path from 'path';
import { LocalizationConfig } from './Config/ToolConfig';

let FromDir = LocalizationConfig.CopyOption.From;
let ToDir = LocalizationConfig.CopyOption.To;

let TargetDirScan = FS.readdirSync(ToDir);

for (const File of TargetDirScan) {
	let FullPath = path.join(ToDir, File);
	let Stats = FS.statSync(FullPath);
	if (!Stats.isFile()) {
		let TargetDirDirScan = FS.readdirSync(FullPath);
		for (const Local of TargetDirDirScan) {
			let FullLocPath = path.join(FullPath, Local);
			if (FS.existsSync(FullLocPath)) {
				let PoFile = path.join(FromDir, Local, File, 'en', `${File}.po`);
				let TargetPoFile = path.join(FullLocPath, `${File}.po`);
				if (FS.existsSync(PoFile)) {
					FSE.copySync(PoFile, TargetPoFile, {
						overwrite: true
					});
					console.log('Copy: ', PoFile, ' >>> ', TargetPoFile);
				}
			}
		}
	}
}
