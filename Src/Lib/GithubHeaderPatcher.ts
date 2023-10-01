import decompress from 'decompress';
import * as Fs from 'fs';
import * as Fse from 'fs-extra';
import * as Downloader from 'nodejs-file-downloader';
import * as Path from 'path';
import { GeneralConfig, UpgradeConfig } from './../Config/ToolConfig';
import { HeaderPatcher } from './HeaderPatcher';

export class GithubHeaderPatcher {
	private GithubDownloadUrl: string = 'https://github.com/satisfactorymodding/SatisfactoryModLoader/archive/refs/heads/Branch.zip';
	private ZipFileName: string = 'SatisfactoryModLoader-Branch.zip';
	private TempDirectory: string = 'SatisfactoryModLoader-Branch';
	private ZipDirName: string = 'Temp';
	private GithubBranch: string = '';

	public async Start() {
		this.GithubBranch = UpgradeConfig.GithubHeaderBranches[UpgradeConfig.UsedBranchIdx];
		this.GithubDownloadUrl = this.GithubDownloadUrl.replaceAll('Branch', this.GithubBranch);
		this.ZipFileName = this.ZipFileName.replaceAll('Branch', this.GithubBranch);
		this.ZipFileName = Path.join(this.ZipDirName, this.ZipFileName);
		this.TempDirectory = this.TempDirectory.replaceAll('Branch', this.GithubBranch);
		this.TempDirectory = Path.join(this.ZipDirName, this.TempDirectory);
		this.WipeFolder(this.ZipDirName);

		console.log('Start Download:', this.GithubDownloadUrl);
		const Download = new Downloader.default({
			url: this.GithubDownloadUrl,
			directory: this.ZipDirName,
			onProgress: function (percentage, chunk, remainingSize) {}
		});

		try {
			await Download.download();

			let Patcher = new HeaderPatcher();
			console.log('Download Finished');

			console.log('Unzip ', this.ZipFileName, ' To ', this.ZipDirName);
			await decompress(this.ZipFileName, this.ZipDirName);
			this.WipeFile(this.ZipFileName);

			let TargetSourceFolder = Path.join(GeneralConfig.ProjectFolder, GeneralConfig.CPPSourceDir);
			let TargetContentFolder = Path.join(GeneralConfig.ProjectFolder, GeneralConfig.ContentDir);
			let PluginFolder = Path.join(GeneralConfig.ProjectFolder, GeneralConfig.PluginDir);

			await this.CopyFromTemp(['Source'], TargetSourceFolder);

			if (UpgradeConfig.PatchBlueprints) {
				await this.CopyFromTemp(['Content'], TargetContentFolder);
			}

			for (const PluginName of UpgradeConfig.PluginsToCopy) {
				let Folder = Path.join(PluginFolder, PluginName);
				await this.CopyFromTemp(['Plugins', PluginName], Folder);
			}

			this.WipeFolder(this.ZipDirName, false);

			console.log('Start Patcher');
			await Patcher.Start();
		} catch (error) {
			console.log('Process Failed: ', error);
		}
	}

	private WipeFolder(Path: string, Recreate: boolean = true): void {
		if (Fs.existsSync(Path)) {
			console.log('Remove Dir: ', Path);
			Fs.rmSync(Path, { recursive: true });
		}
		if (Recreate) {
			console.log('Create Dir: ', Path);
			Fs.mkdirSync(Path, { recursive: true });
		}
	}

	private WipeFile(Path: string): void {
		if (Fs.existsSync(Path)) {
			console.log('Remove File: ', Path);
			Fs.rmSync(Path, { recursive: true });
		}
	}

	private async CopyFromTemp(TempDir: string[], Folder: string) {
		let From = Path.join(this.TempDirectory, ...TempDir);
		if (Fs.existsSync(From)) {
			console.log('Copy:', From, ' >>> ', Folder);
			this.WipeFolder(Folder, true);
			await Fse.copy(From, Folder)
				.catch((e) => {
					console.log('Something goes wrong while copy to the target direction >>>', Folder, '<<<');
					this.WipeFolder(this.ZipDirName, false);
				})
				.finally(() => {
					console.log('Copied:', From, ' >>> ', Folder);
				});
		}
	}
}
