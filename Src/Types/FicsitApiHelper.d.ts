type ModVersion = {
	id : string,
	version : string,
	version_Mayor : number,
	version_Minor : number,
	version_Small : number,
	sml_version : string,
	hash : string,
	approved : boolean,
}

type ModLatestVersions = {
	alpha : ModVersion,
	hasAlpha : boolean,
	beta : ModVersion,
	hasBeta : boolean,
	release : ModVersion,
	hasRelease : boolean,
}

export type ModApiInformation = {
	versions : ModVersion[],
	latestVersions : ModLatestVersions,
	id : string,
	mod_reference : string
	hasRelease : boolean
	latestPublic? : ModVersion
}

export type SemVersionHolder = {
	version : string,
	version_Mayor : number,
	version_Minor : number,
	version_Small : number,
}

export type SemVersionUpgradeHolder = {
	version_Mayor? : boolean,
	version_Minor? : boolean,
	version_Small? : boolean,
}

export type UPlugin = {
	"Plugins" : UPluginPlugin[]
	"Version" : number,
	"VersionName" : string,
	"SemVersion" : string,
}

export type UPluginPlugin = {
	Name : string,
	SemVersion : string,
	bIsOptional : boolean,
	bIsBasePlugin : boolean,
	Enabled : boolean
}