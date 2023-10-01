import { SemVersionUpgradeHolder } from 'Src/Types/FicsitApiHelper';

export type MainConfig_General = {
	ProjectFolder: string;
	ModPluginDir: string;
	PluginDir: string;
	CPPSourceDir: string;
	ContentDir: string;
	UPluginFileName: string;
	GameModFolder: string;
};

export type MainConfig_Localization_CopyHelper = {
	From: string;
	To: string;
};

export type MainConfig_Localization = {
	CopyFrom: string;
	LocPath: string;
	CopyOption: MainConfig_Localization_CopyHelper;
};

export type MainConfig_VersionControl = {
	SMLVersion: string;
	OnlyUseVersionIncrease: boolean;
	ModVersionOverwrite: Record<string, SemVersionUpgradeHolder>;
	VersionIncrease: string[];
	UseExactVersion: string[];
	FicsitUserToQuery: string[];
};

export type MainConfig_Upgrade = {
	PatchBlueprints: boolean;
	UsedBranchIdx: number;
	GithubHeaderBranches: string[];
	PluginsToCopy: string[];
};

export type JSON_InformationPatreon = {
	LastVersion: string;
	NewVersion: string;
	Roles: string[];
	FileName: string;
	Url: string;
	ChannelId: string;
	Ref: string;
	ModName: string;
};

export type MainConfig_PackHelper = {
	ChannelId: string;
	Roles: string[];
	Mods: Record<string, PackHelper_Element>;
};

export type PackHelper_Element = {
	SubVersion: string;
	MainMod: string;
	ModName: string;
	Mods: string[];
};

export type MainConfig = {
	General: MainConfig_General;
	Localization: MainConfig_Localization;
	VersionControl: MainConfig_VersionControl;
	Upgrade: MainConfig_Upgrade;
	PackHelper: MainConfig_PackHelper;
};
