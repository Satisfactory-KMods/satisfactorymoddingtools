import { createWriteStream, existsSync } from "fs";
import { join } from "path";
import * as Compress from "compressing";
import { mkdir, readdir, rm, writeFile } from "fs/promises";
import { GeneralConfig, PackHelperConfig } from "./Config/ToolConfig";

// create folder for working and target
const sourcePath = join(GeneralConfig.ProjectFolder, "Saved/ArchivedPlugins");
const workingDir = join(GeneralConfig.ProjectFolder, "KMod_Devs", "working");
const targetDir = join(GeneralConfig.ProjectFolder, "KMod_Devs", "public");
const target: string | undefined = process.argv.splice(2).at(0);
if (!target) {
	console.error("No target specified");
	process.exit(0);
}

const settings = PackHelperConfig.Mods[target];
if (!settings) {
	console.error(`No Settings for ${target} specified`);
	process.exit(0);
}

if (existsSync(workingDir)) {
	await rm(workingDir, { recursive: true });
}

if (existsSync(targetDir)) {
	await rm(targetDir, { recursive: true });
}

mkdir(targetDir, { recursive: true });
mkdir(workingDir, { recursive: true });

async function writeZip(zipStream: Compress.zip.Stream, target: string) {
	return new Promise<void>((resolve, reject) => {
		const destStream = createWriteStream(target);
		zipStream.pipe(destStream).on("finish", resolve).on("error", reject);
	});
}

async function unzipFile(file: Compress.sourceType, target: string) {
	return Compress.zip.uncompress(file, target);
}

const foundMods = new Set<string>();

const stream = new Compress.zip.Stream();

for (const r of ["Windows", "WindowsServer", "LinuxServer"]) {
	const dir = join(workingDir, r);
	for (const file of await readdir(sourcePath, { withFileTypes: true })) {
		if (
			!file.isFile() &&
			file.name !== "KMod_Devs" &&
			settings.Mods.some((r) => r.toLowerCase() === file.name.toLowerCase())
		) {
			const fullPath = join(sourcePath, file.name);
			const modFiles = join(fullPath, `${file.name}-${r}.zip`);
			const target = join(dir, file.name);

			if (!existsSync(modFiles)) {
				throw new Error(`Not all files found for ${modFiles}`);
			}

			if (!existsSync(target)) {
				await mkdir(target, { recursive: true });
			}

			await unzipFile(modFiles, target);

			console.log({ r, target });
			stream.addEntry(target);
		}

		foundMods.add(file.name.toLowerCase());

		//let Files = readdir(fullPath, { withFileTypes: true });
		//for (const zipFile of Files) {
		//	zipStream.addEntry(join(fullPath, zipFile));
		//}
		//const destStream = fs.createWriteStream(zipFile);
		//zipStream.pipe(destStream).on('finish', () => {
		//	streamCountFinished++;
		//	console.log('Finished ', streamCountFinished, ' of ', streamCount, File);
		//});
		//streamCount++;
	}

	const target = join(
		targetDir,
		`${settings.MainMod}-${r}.${settings.SubVersion}.zip`,
	);
	await Compress.zip.compressDir(dir, target);
	//await writeZip(stream, target);
	console.log(`Finished ${target}`);
	stream.unpipe();
	stream.compose;
}

if (settings.Mods.some((r) => !foundMods.has(r.toLowerCase()))) {
	console.error(settings.Mods.filter((r) => !foundMods.has(r.toLowerCase())));
	throw new Error("Not all mods found");
}

const lastSubVersionNum = Number(
	settings.SubVersion.substring(settings.SubVersion.lastIndexOf("-") + 1),
);
const newSubVersionNum =
	settings.SubVersion.substring(0, settings.SubVersion.lastIndexOf("-") + 1) +
	(lastSubVersionNum + 1).toString();
const config = await (await import(join("Files/Config/Config.json"))).default;
if (config) {
	config.PackHelper.Mods[target].SubVersion = newSubVersionNum;
	await writeFile(
		join("Files/Config/Config.json"),
		JSON.stringify(config, null, 4),
	);
}
