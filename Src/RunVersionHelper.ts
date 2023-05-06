import { FicsitApiHelper } from "./Lib/FicsitApiHelper"
import * as path           from "path";
import * as FS             from "fs";
import { readFile }        from "fs-extra";
import {
	SemVersionHolder,
	SemVersionUpgradeHolder,
	UPlugin
}                          from "./Types/FicsitApiHelper";
import {
	GeneralConfig,
	VersionControlConfig
}                          from "./Config/ToolConfig";

const jsonFormat = require( 'json-format' );

let ModFolder = path.join( GeneralConfig.ProjectFolder, GeneralConfig.PluginDir )
let ApiHelper = new FicsitApiHelper();
ApiHelper.StartQuery().then( async () => {
	for ( const Data of ApiHelper.GetApiData() ) {
		let Allowed : Boolean = false;

		if( VersionControlConfig.OnlyUseVersionIncrease ) {
			if( VersionControlConfig.VersionIncrease.find( ( s ) => s === Data.mod_reference ) ) {
				Allowed = true;
			}
		}
		else {
			if( !VersionControlConfig.VersionIncrease.find( ( s ) => s === Data.mod_reference ) ) {
				Allowed = true;
			}
		}

		if( Allowed ) {
			let UpgradeInfo : SemVersionUpgradeHolder = VersionControlConfig.ModVersionOverwrite[ Data.mod_reference ] !== undefined ? VersionControlConfig.ModVersionOverwrite[ Data.mod_reference ] : {
				version_Small : true
			}

			ApiHelper.UpgradeSemVersion( Data.mod_reference, UpgradeInfo );
		}
	}

	for ( const Data of ApiHelper.GetApiData() ) {
		let ModDir = path.join( ModFolder, Data.mod_reference );
		let ModUPlugin = path.join( ModDir, `${ Data.mod_reference }${ GeneralConfig.UPluginFileName }` );
		if( FS.existsSync( ModUPlugin ) ) {
			let UPlugin : UPlugin = JSON.parse( ( await readFile( ModUPlugin ) ).toString() ) as UPlugin;
			let ModVersion : SemVersionHolder | undefined = ApiHelper.GetSemVersionByModRef( Data.mod_reference );
			if( ModVersion ) {
				console.log( "Overwrite Modversion: ", Data.mod_reference )
				console.log( "New Modversion: ", ModVersion?.version )
				UPlugin.SemVersion = ApiHelper.ToSemVersionRaw( ModVersion );
				UPlugin.VersionName = UPlugin.SemVersion;
				UPlugin.Version = ModVersion.version_Mayor;

				for ( let idx = 0; idx < UPlugin.Plugins.length; ++idx ) {
					if( UPlugin.Plugins[ idx ].Name === "SML" ) {
						UPlugin.Plugins[ idx ].SemVersion = VersionControlConfig.SMLVersion;
						console.log( "SML", VersionControlConfig.SMLVersion );
						continue
					}

					let version : SemVersionHolder | undefined = ApiHelper.GetSemVersionByModRef( UPlugin.Plugins[ idx ].Name );
					if( version ) {
						if( !VersionControlConfig.UseExactVersion.find( ( s ) => s === UPlugin.Plugins[ idx ].Name ) ) {
							console.log( UPlugin.Plugins[ idx ].Name, ApiHelper.ToSemVersion( version ) );
							UPlugin.Plugins[ idx ].SemVersion = ApiHelper.ToSemVersion( version );
						}
						else {
							console.log( UPlugin.Plugins[ idx ].Name, ApiHelper.ToSemVersionRaw( version ) );
							UPlugin.Plugins[ idx ].SemVersion = ApiHelper.ToSemVersionRaw( version );
						}
					}
				}

				FS.writeFileSync( ModUPlugin, jsonFormat( UPlugin ) )
				console.log( "UPlugin Saved: ", ModUPlugin, Data.mod_reference )
			}
			console.log( "---------------------------------------------------" )
		}
	}
} );