import {
	gql,
	request
} from "graphql-request";
import {
	ModApiInformation,
	ModVersion,
	SemVersionHolder,
	SemVersionUpgradeHolder
} from "../Types/FicsitApiHelper";
import {
	VersionControlConfig
} from "./../Config/ToolConfig";

export class FicsitApiHelper {
	private FicsitApi = "https://api.ficsit.app/v2/query";
	private ApiData : ModApiInformation[] = [];
	private VersionMap : Record<string, SemVersionHolder> = {};

	public GetApiData() : ModApiInformation[] {
		return this.ApiData;
	}

	public GetSemVersionByModRef( ModRef : string ) : SemVersionHolder | undefined {
		return this.VersionMap[ ModRef ];
	}

	public SetSemVersionByModRef( ModRef : string, NewSem : SemVersionHolder ) : void {
		this.VersionMap[ ModRef ] = NewSem;
	}

	public ToSemVersion( Sem : SemVersionHolder ) : string {
		return `^${ Sem.version_Mayor }.${ Sem.version_Minor }.${ Sem.version_Small }`;
	}

	public ToSemVersionRaw( Sem : SemVersionHolder ) : string {
		return `${ Sem.version_Mayor }.${ Sem.version_Minor }.${ Sem.version_Small }`;
	}

	public UpgradeSemVersion( ModRef : string, UpgradeSem : SemVersionUpgradeHolder ) : void {
		let Sem = this.GetSemVersionByModRef( ModRef );
		if( Sem ) {
			Sem.version_Mayor += UpgradeSem.version_Mayor ? 1 : 0;
			Sem.version_Minor += UpgradeSem.version_Minor ? 1 : 0;
			Sem.version_Small += UpgradeSem.version_Small ? 1 : 0;

			if( UpgradeSem.version_Mayor ) {
				Sem.version_Minor = 0;
				Sem.version_Small = 0;
			}

			if( UpgradeSem.version_Minor ) {
				Sem.version_Small = 0;
			}

			Sem.version = this.ToSemVersionRaw( Sem );
			this.SetSemVersionByModRef( ModRef, Sem );
		}
	}

	public StringVersionToVersionNumber( Version : string ) : number {
		return Number( Version.replace( /\D/g, '' ) );
	}

	public async StartQuery() : Promise<void> {
		for ( const User of VersionControlConfig.FicsitUserToQuery ) {
			console.log( "Query for user:", User )
			let Request = await request( this.FicsitApi, this.GetGraph( User ) )
				.catch( e => {
					console.log( "Ficsit GraphQL failed", e )
				} );

			if( Request && Request.getUser ) {
				for ( const ModInfo of Request.getUser.mods ) {
					let NewArrayElement : ModApiInformation = {} as ModApiInformation;

					NewArrayElement.latestVersions = {
						alpha : {} as ModVersion,
						hasAlpha : false,
						beta : {} as ModVersion,
						hasBeta : false,
						release : {} as ModVersion,
						hasRelease : false
					};

					NewArrayElement.latestVersions.alpha = ModInfo.mod.latestVersions.alpha;
					NewArrayElement.latestVersions.beta = ModInfo.mod.latestVersions.beta;
					NewArrayElement.latestVersions.release = ModInfo.mod.latestVersions.release;

					NewArrayElement.latestVersions.hasAlpha = ModInfo.mod.latestVersions.alpha !== null;
					NewArrayElement.latestVersions.hasBeta = ModInfo.mod.latestVersions.beta !== undefined;
					NewArrayElement.latestVersions.hasRelease = ModInfo.mod.latestVersions.release !== undefined;

					NewArrayElement.versions = []
					NewArrayElement.id = ModInfo.mod.id
					NewArrayElement.mod_reference = ModInfo.mod.mod_reference

					if( NewArrayElement.latestVersions.hasAlpha ) {
						let VersionArray = NewArrayElement.latestVersions.alpha.version.split( "." );
						NewArrayElement.latestVersions.alpha.version_Mayor = Number( this.StringVersionToVersionNumber( VersionArray[ 0 ] ) );
						NewArrayElement.latestVersions.alpha.version_Minor = Number( this.StringVersionToVersionNumber( VersionArray[ 1 ] ) );
						NewArrayElement.latestVersions.alpha.version_Small = Number( this.StringVersionToVersionNumber( VersionArray[ 2 ] ) );
					}

					if( NewArrayElement.latestVersions.hasBeta ) {
						let VersionArray = NewArrayElement.latestVersions.beta.version.split( "." );
						NewArrayElement.latestVersions.beta.version_Mayor = Number( this.StringVersionToVersionNumber( VersionArray[ 0 ] ) );
						NewArrayElement.latestVersions.beta.version_Minor = Number( this.StringVersionToVersionNumber( VersionArray[ 1 ] ) );
						NewArrayElement.latestVersions.beta.version_Small = Number( this.StringVersionToVersionNumber( VersionArray[ 2 ] ) );
					}

					if( NewArrayElement.latestVersions.hasRelease ) {
						let VersionArray = NewArrayElement.latestVersions.release.version.split( "." );
						NewArrayElement.latestVersions.release.version_Mayor = Number( this.StringVersionToVersionNumber( VersionArray[ 0 ] ) );
						NewArrayElement.latestVersions.release.version_Minor = Number( this.StringVersionToVersionNumber( VersionArray[ 1 ] ) );
						NewArrayElement.latestVersions.release.version_Small = Number( this.StringVersionToVersionNumber( VersionArray[ 2 ] ) );
					}

					for ( const ModV of ModInfo.mod.versions ) {
						let VersionArray = ModV.version.split( "." );
						NewArrayElement.versions.push( {
							id : ModV.id,
							version : ModV.version,
							version_Mayor : this.StringVersionToVersionNumber( VersionArray[ 0 ] ),
							version_Minor : this.StringVersionToVersionNumber( VersionArray[ 1 ] ),
							version_Small : this.StringVersionToVersionNumber( VersionArray[ 2 ] ),
							sml_version : ModV.sml_version,
							hash : ModV.hash,
							approved : ModV.approved,
						} as ModVersion );
					}

					NewArrayElement.hasRelease = NewArrayElement.versions.length > 0;
					if( NewArrayElement.hasRelease ) {
						NewArrayElement.latestPublic = NewArrayElement.versions[ 0 ];
						let SemVersion = {
							version : NewArrayElement.latestPublic.version,
							version_Mayor : NewArrayElement.latestPublic.version_Mayor,
							version_Minor : NewArrayElement.latestPublic.version_Minor,
							version_Small : NewArrayElement.latestPublic.version_Small
						} as SemVersionHolder;
						this.VersionMap[ NewArrayElement.mod_reference ] = SemVersion;
					}

					this.ApiData.push( NewArrayElement );
				}
			}
		}
	}

	private GetGraph( User : string ) {
		return gql`query { 
        getUser(userId: "${ User }") {
          mods {
              mod {
                latestVersions {
                  alpha {
                    id
                    version
                    sml_version
                    hash
                    approved
                  }
                }
                versions {
                  id
                  version
                  sml_version
                  hash
                  approved
                }
                id
                mod_reference
              }
            }
          }
        }`
	}
}