import * as Fs                from "fs";
import * as Path              from "path";
import { HeaderPatch_Config } from "../Types/HeaderUpdate";
import { GeneralConfig }      from "./../Config/ToolConfig";

export class HeaderPatcher {

	private Config : HeaderPatch_Config = {} as HeaderPatch_Config;

	public async Start() {
		this.Config = JSON.parse( Fs.readFileSync( "Files/HeaderPatch.json" ).toString() );
		this.ReadDirAndOverwrite( Path.join( GeneralConfig.ProjectFolder, GeneralConfig.CPPSourceDir ) );
	}

	private ReadDirAndOverwrite( DirPath : string ) {
		if( !Fs.existsSync( DirPath ) ) {
			return;
		}
		//console.log( "Start: ReadDirAndOverwrite - ", DirPath );

		let ScannedDir = Fs.readdirSync( DirPath );
		for ( const File of ScannedDir ) {
			let FilePath = Path.join( DirPath, File );
			let Stats = Fs.statSync( FilePath );
			if( Stats.isDirectory() ) {
				this.ReadDirAndOverwrite( FilePath );
			}
			else if( Stats.isFile() ) {
				//console.log( "Start: Read and write file - ", FilePath );
				let Content = Fs.readFileSync( FilePath ).toString();
				let Lines = Content.split( /\r?\n/ );
				let FileHasUpdated = false;

				for ( let Idx = 0; Idx < Lines.length; ++Idx ) {
					for ( const Appender of this.Config.AutoAppender ) {
						for ( const Replacer of this.Config.AutoReplacer ) {
							if( Lines[ Idx ].includes( Replacer.Find ) && !Lines[ Idx ].includes( "KMods" ) ) {
								console.log( "-------------------------------------" );
								Lines[ Idx ] = Lines[ Idx ].replaceAll( Replacer.Find, Replacer.Replace );
								console.log( "Replace [", Idx, "]", Replacer.Find, "of file", File );
								console.log( Replacer.Find, " > ", Replacer.Replace );
								FileHasUpdated = true;
							}
						}

						if( Lines[ Idx ].includes( Appender.Find ) && !Lines[ Idx ].includes( Appender.Append ) && !Lines[ Idx ].includes( "KMods" ) ) {
							Lines[ Idx ] = `${ Lines[ Idx ] }${ Appender.Append }`;
							console.log( "-------------------------------------" );
							console.log( "Append to line [", Idx, "] of file", File );
							console.log( Lines[ Idx ] );
							FileHasUpdated = true;
						}
					}
				}

				for( const OverwriteData of this.Config.Includer ) {
					if( OverwriteData.ClassFileName === File ) {
						let Added = false;
						for ( let Idx = 0; Idx < Lines.length; ++Idx ) {
							let IncludeString = `#include "${ OverwriteData.Include }"`;
							if( Lines[Idx].includes( "include" ) && Lines[Idx].includes( OverwriteData.After ) && !Content.includes( IncludeString ) && !Added ) {
								Idx++;

								if( OverwriteData.If !== "" ) {
									Lines.splice( Idx + 1, 0, `#if ${OverwriteData.If}` );
									Idx++;
								}

								Lines.splice( Idx + 1, 0, `/**<KMods>*/${ OverwriteData.If !== "" ? "\t" : ""}${IncludeString}/**</KMods>*/` );

								if( OverwriteData.If !== "" ) {
									Idx++;
									Lines.splice( Idx + 1, 0, `#endif` );
								}

								Content = Lines.join( '\r\n' );
								console.log( IncludeString, " <<< Added <<< ", OverwriteData.ClassFileName );
								Added = true;
								FileHasUpdated = true;
							}
						}
					}
				}

				for( const OverwriteData of this.Config.FunctionOverwrite ) {
					if( OverwriteData.ClassFileName === File ) {
						let FunctionName = OverwriteData.Template.replaceAll( "{Class}", OverwriteData.Class ).replaceAll( "{Function}", OverwriteData.Function );

						let LinesCopy = Lines;
						let LinesToRemove: number = 0;
						let BeginCount = 0;
						let HasBegun = false;
						let HasFinished = false;
						let BegunIndex = -1;
						for ( let Idx = 0; Idx < Lines.length; ++Idx ) {
							if( Lines[ Idx ].includes( FunctionName ) || HasBegun ) {
								if( !HasBegun ) {
									BegunIndex = Idx;
								}

								if( Lines[ Idx ].includes( "{" ) ) {
									BeginCount++;
								}

								if( Lines[ Idx ].includes( "}" ) ) {
									BeginCount--;
								}

								HasFinished = BeginCount == 0;

								if( HasBegun ) {
									LinesToRemove++;
								}

								HasBegun = true;

								if( HasFinished ) {
									LinesCopy[ BegunIndex ] = `/**<KMods>*/${ FunctionName } {`;
									LinesCopy.splice( BegunIndex + 1, LinesToRemove );
									BegunIndex++;
									for( let Idx = 0; Idx < OverwriteData.FunctionContent.length; Idx++ ) {
										LinesCopy.splice(BegunIndex, 0, OverwriteData.FunctionContent[Idx]);
										BegunIndex++;
									}
									LinesCopy.splice(BegunIndex, 0, `}; /**</KMods>*/`);
									console.log( FunctionName, " <<< Changed" )
									FileHasUpdated = true;
									break;
								}
							}
						}
						Lines = LinesCopy;
					}
				}

				Content = Lines.join( '\r\n' );

				if( FileHasUpdated ) {
					Fs.writeFileSync( FilePath, Content )
					console.log( "Updated content for ", FilePath );
					console.log( "-------------------------------------" );
				}
			}
		}
	}
}