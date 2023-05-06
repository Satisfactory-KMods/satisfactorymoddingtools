import * as path           from "path";
import * as FS             from "fs";
import * as Compress	   from "compressing"
import {
	GeneralConfig,
} from "./Config/ToolConfig";

let TargetDirScan = FS.readdirSync( GeneralConfig.GameModFolder  );

let DevDir = path.join( GeneralConfig.GameModFolder, "KMod_Devs", "Public" );
if( FS.existsSync( DevDir ) ) {
	FS.rmSync( DevDir, {recursive:true} );
}
FS.mkdirSync( DevDir, {recursive:true} );

let StreamCount = 0;
let StreamCountFinished = 0;
for( const File of TargetDirScan ) {
	const ZipFile = path.join( DevDir, `${File}.zip` );
	if( FS.existsSync( ZipFile ) ) {
		FS.rmSync( ZipFile );
	}
}

TargetDirScan = FS.readdirSync( GeneralConfig.GameModFolder  );
for( const File of TargetDirScan ) {
	const ZipFile = path.join( DevDir, `${File}.zip` );
	let FullPath = path.join( GeneralConfig.GameModFolder , File );
	let Stats = FS.statSync( FullPath );

	if( !Stats.isFile() && File !== "KMod_Devs" ) {
		const ZipStream = new Compress.zip.Stream();

		let Files = FS.readdirSync( FullPath );
		for( const ZipFile of Files ) {
			ZipStream.addEntry( path.join( FullPath, ZipFile ) );
		}

		const destStream = FS.createWriteStream( ZipFile );
		ZipStream.pipe( destStream ).on( "finish", () => {
			StreamCountFinished++;
			console.log( "Finished ", StreamCountFinished, " of ", StreamCount );
		});
		StreamCount++;
	}
}