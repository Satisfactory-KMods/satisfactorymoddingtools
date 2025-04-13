/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  AnnouncementID: { input: any; output: any; }
  Date: { input: any; output: any; }
  GuideID: { input: any; output: any; }
  ModID: { input: any; output: any; }
  ModReference: { input: any; output: any; }
  SMLVersionID: { input: any; output: any; }
  SatisfactoryVersionID: { input: any; output: any; }
  TagID: { input: any; output: any; }
  TagName: { input: any; output: any; }
  Upload: { input: any; output: any; }
  UserID: { input: any; output: any; }
  VersionID: { input: any; output: any; }
  VirustotalHash: { input: any; output: any; }
  VirustotalID: { input: any; output: any; }
};

export type Announcement = {
  __typename?: 'Announcement';
  id: Scalars['AnnouncementID']['output'];
  importance: AnnouncementImportance;
  message: Scalars['String']['output'];
};

export enum AnnouncementImportance {
  Alert = 'Alert',
  Fix = 'Fix',
  Info = 'Info',
  Warning = 'Warning'
}

export type Compatibility = {
  __typename?: 'Compatibility';
  note?: Maybe<Scalars['String']['output']>;
  state: CompatibilityState;
};

export type CompatibilityInfo = {
  __typename?: 'CompatibilityInfo';
  EA: Compatibility;
  EXP: Compatibility;
};

export type CompatibilityInfoInput = {
  EA: CompatibilityInput;
  EXP: CompatibilityInput;
};

export type CompatibilityInput = {
  note?: InputMaybe<Scalars['String']['input']>;
  state: CompatibilityState;
};

export enum CompatibilityState {
  Broken = 'Broken',
  Damaged = 'Damaged',
  Works = 'Works'
}

export type CreateVersionResponse = {
  __typename?: 'CreateVersionResponse';
  auto_approved: Scalars['Boolean']['output'];
  version?: Maybe<Version>;
};

export type GetGuides = {
  __typename?: 'GetGuides';
  count: Scalars['Int']['output'];
  guides: Array<Guide>;
};

export type GetMods = {
  __typename?: 'GetMods';
  count: Scalars['Int']['output'];
  mods: Array<Mod>;
};

export type GetMyMods = {
  __typename?: 'GetMyMods';
  count: Scalars['Int']['output'];
  mods: Array<Mod>;
};

export type GetMyVersions = {
  __typename?: 'GetMyVersions';
  count: Scalars['Int']['output'];
  versions: Array<Version>;
};

export type GetSmlVersions = {
  __typename?: 'GetSMLVersions';
  count: Scalars['Int']['output'];
  sml_versions: Array<SmlVersion>;
};

export type GetVersions = {
  __typename?: 'GetVersions';
  count: Scalars['Int']['output'];
  versions: Array<Version>;
};

export type Group = {
  __typename?: 'Group';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Guide = {
  __typename?: 'Guide';
  created_at: Scalars['Date']['output'];
  guide: Scalars['String']['output'];
  id: Scalars['GuideID']['output'];
  name: Scalars['String']['output'];
  short_description: Scalars['String']['output'];
  tags: Array<Tag>;
  updated_at: Scalars['Date']['output'];
  user: User;
  user_id: Scalars['UserID']['output'];
  views: Scalars['Int']['output'];
};

export enum GuideFields {
  CreatedAt = 'created_at',
  Name = 'name',
  UpdatedAt = 'updated_at',
  Views = 'views'
}

export type GuideFilter = {
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Order>;
  order_by?: InputMaybe<GuideFields>;
  search?: InputMaybe<Scalars['String']['input']>;
  tagIDs?: InputMaybe<Array<Scalars['TagID']['input']>>;
};

export type LatestVersions = {
  __typename?: 'LatestVersions';
  alpha?: Maybe<Version>;
  beta?: Maybe<Version>;
  release?: Maybe<Version>;
};

export type Mod = {
  __typename?: 'Mod';
  approved: Scalars['Boolean']['output'];
  authors: Array<UserMod>;
  compatibility?: Maybe<CompatibilityInfo>;
  created_at: Scalars['Date']['output'];
  creator_id: Scalars['UserID']['output'];
  downloads: Scalars['Int']['output'];
  full_description?: Maybe<Scalars['String']['output']>;
  hidden: Scalars['Boolean']['output'];
  hotness: Scalars['Int']['output'];
  id: Scalars['ModID']['output'];
  last_version_date?: Maybe<Scalars['Date']['output']>;
  latestVersions: LatestVersions;
  logo?: Maybe<Scalars['String']['output']>;
  logo_thumbhash?: Maybe<Scalars['String']['output']>;
  mod_reference: Scalars['ModReference']['output'];
  name: Scalars['String']['output'];
  popularity: Scalars['Int']['output'];
  short_description: Scalars['String']['output'];
  source_url?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Array<Tag>>;
  toggle_explicit_content: Scalars['Boolean']['output'];
  toggle_network_use: Scalars['Boolean']['output'];
  updated_at: Scalars['Date']['output'];
  version?: Maybe<Version>;
  versions: Array<Version>;
  views: Scalars['Int']['output'];
};


export type ModVersionArgs = {
  version: Scalars['String']['input'];
};


export type ModVersionsArgs = {
  filter?: InputMaybe<VersionFilter>;
};

export enum ModFields {
  CreatedAt = 'created_at',
  Downloads = 'downloads',
  Hotness = 'hotness',
  LastVersionDate = 'last_version_date',
  Name = 'name',
  Popularity = 'popularity',
  Search = 'search',
  UpdatedAt = 'updated_at',
  Views = 'views'
}

export type ModFilter = {
  hidden?: InputMaybe<Scalars['Boolean']['input']>;
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Order>;
  order_by?: InputMaybe<ModFields>;
  references?: InputMaybe<Array<Scalars['String']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
  tagIDs?: InputMaybe<Array<Scalars['TagID']['input']>>;
};

export type ModVersion = {
  __typename?: 'ModVersion';
  id: Scalars['ModID']['output'];
  mod_reference: Scalars['ModReference']['output'];
  versions: Array<Version>;
};

export type ModVersionConstraint = {
  modIdOrReference: Scalars['String']['input'];
  version: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  approveMod: Scalars['Boolean']['output'];
  approveVersion: Scalars['Boolean']['output'];
  createAnnouncement?: Maybe<Announcement>;
  createGuide?: Maybe<Guide>;
  createMod?: Maybe<Mod>;
  createMultipleTags: Array<Tag>;
  createSatisfactoryVersion: SatisfactoryVersion;
  createTag?: Maybe<Tag>;
  createVersion: Scalars['VersionID']['output'];
  deleteAnnouncement: Scalars['Boolean']['output'];
  deleteGuide: Scalars['Boolean']['output'];
  deleteMod: Scalars['Boolean']['output'];
  deleteSatisfactoryVersion: Scalars['Boolean']['output'];
  deleteTag: Scalars['Boolean']['output'];
  deleteVersion: Scalars['Boolean']['output'];
  denyMod: Scalars['Boolean']['output'];
  denyVersion: Scalars['Boolean']['output'];
  discourseSSO?: Maybe<Scalars['String']['output']>;
  finalizeCreateVersion: Scalars['Boolean']['output'];
  logout: Scalars['Boolean']['output'];
  oAuthFacebook?: Maybe<UserSession>;
  oAuthGithub?: Maybe<UserSession>;
  oAuthGoogle?: Maybe<UserSession>;
  updateAnnouncement: Announcement;
  updateGuide: Guide;
  updateMod: Mod;
  updateModCompatibility: Scalars['Boolean']['output'];
  updateMultipleModCompatibilities: Scalars['Boolean']['output'];
  updateSatisfactoryVersion: SatisfactoryVersion;
  updateTag: Tag;
  updateUser: User;
  updateVersion: Version;
  uploadVersionPart: Scalars['Boolean']['output'];
};


export type MutationApproveModArgs = {
  modId: Scalars['ModID']['input'];
};


export type MutationApproveVersionArgs = {
  versionId: Scalars['VersionID']['input'];
};


export type MutationCreateAnnouncementArgs = {
  announcement: NewAnnouncement;
};


export type MutationCreateGuideArgs = {
  guide: NewGuide;
};


export type MutationCreateModArgs = {
  mod: NewMod;
};


export type MutationCreateMultipleTagsArgs = {
  tagNames: Array<NewTag>;
};


export type MutationCreateSatisfactoryVersionArgs = {
  input: NewSatisfactoryVersion;
};


export type MutationCreateTagArgs = {
  description: Scalars['String']['input'];
  tagName: Scalars['TagName']['input'];
};


export type MutationCreateVersionArgs = {
  modId: Scalars['ModID']['input'];
};


export type MutationDeleteAnnouncementArgs = {
  announcementId: Scalars['AnnouncementID']['input'];
};


export type MutationDeleteGuideArgs = {
  guideId: Scalars['GuideID']['input'];
};


export type MutationDeleteModArgs = {
  modId: Scalars['ModID']['input'];
};


export type MutationDeleteSatisfactoryVersionArgs = {
  id: Scalars['SatisfactoryVersionID']['input'];
};


export type MutationDeleteTagArgs = {
  tagID: Scalars['TagID']['input'];
};


export type MutationDeleteVersionArgs = {
  versionId: Scalars['VersionID']['input'];
};


export type MutationDenyModArgs = {
  modId: Scalars['ModID']['input'];
};


export type MutationDenyVersionArgs = {
  versionId: Scalars['VersionID']['input'];
};


export type MutationDiscourseSsoArgs = {
  sig: Scalars['String']['input'];
  sso: Scalars['String']['input'];
};


export type MutationFinalizeCreateVersionArgs = {
  modId: Scalars['ModID']['input'];
  version: NewVersion;
  versionId: Scalars['VersionID']['input'];
};


export type MutationOAuthFacebookArgs = {
  code: Scalars['String']['input'];
  state: Scalars['String']['input'];
};


export type MutationOAuthGithubArgs = {
  code: Scalars['String']['input'];
  state: Scalars['String']['input'];
};


export type MutationOAuthGoogleArgs = {
  code: Scalars['String']['input'];
  state: Scalars['String']['input'];
};


export type MutationUpdateAnnouncementArgs = {
  announcement: UpdateAnnouncement;
  announcementId: Scalars['AnnouncementID']['input'];
};


export type MutationUpdateGuideArgs = {
  guide: UpdateGuide;
  guideId: Scalars['GuideID']['input'];
};


export type MutationUpdateModArgs = {
  mod: UpdateMod;
  modId: Scalars['ModID']['input'];
};


export type MutationUpdateModCompatibilityArgs = {
  compatibility: CompatibilityInfoInput;
  modId: Scalars['ModID']['input'];
};


export type MutationUpdateMultipleModCompatibilitiesArgs = {
  compatibility: CompatibilityInfoInput;
  modIDs: Array<Scalars['ModID']['input']>;
};


export type MutationUpdateSatisfactoryVersionArgs = {
  id: Scalars['SatisfactoryVersionID']['input'];
  input: UpdateSatisfactoryVersion;
};


export type MutationUpdateTagArgs = {
  NewName: Scalars['TagName']['input'];
  description: Scalars['String']['input'];
  tagID: Scalars['TagID']['input'];
};


export type MutationUpdateUserArgs = {
  input: UpdateUser;
  userId: Scalars['UserID']['input'];
};


export type MutationUpdateVersionArgs = {
  version: UpdateVersion;
  versionId: Scalars['VersionID']['input'];
};


export type MutationUploadVersionPartArgs = {
  file: Scalars['Upload']['input'];
  modId: Scalars['ModID']['input'];
  part: Scalars['Int']['input'];
  versionId: Scalars['VersionID']['input'];
};

export type NewAnnouncement = {
  importance: AnnouncementImportance;
  message: Scalars['String']['input'];
};

export type NewGuide = {
  guide: Scalars['String']['input'];
  name: Scalars['String']['input'];
  short_description: Scalars['String']['input'];
  tagIDs?: InputMaybe<Array<Scalars['TagID']['input']>>;
};

export type NewMod = {
  full_description?: InputMaybe<Scalars['String']['input']>;
  hidden?: InputMaybe<Scalars['Boolean']['input']>;
  logo?: InputMaybe<Scalars['Upload']['input']>;
  mod_reference: Scalars['ModReference']['input'];
  name: Scalars['String']['input'];
  short_description: Scalars['String']['input'];
  source_url?: InputMaybe<Scalars['String']['input']>;
  tagIDs?: InputMaybe<Array<Scalars['TagID']['input']>>;
  toggle_explicit_content?: InputMaybe<Scalars['Boolean']['input']>;
  toggle_network_use?: InputMaybe<Scalars['Boolean']['input']>;
};

export type NewSatisfactoryVersion = {
  engine_version: Scalars['String']['input'];
  version: Scalars['Int']['input'];
};

export type NewTag = {
  description: Scalars['String']['input'];
  name: Scalars['TagName']['input'];
};

export type NewVersion = {
  changelog: Scalars['String']['input'];
  stability: VersionStabilities;
};

export type OAuthOptions = {
  __typename?: 'OAuthOptions';
  facebook: Scalars['String']['output'];
  github: Scalars['String']['output'];
  google: Scalars['String']['output'];
};

export enum Order {
  Asc = 'asc',
  Desc = 'desc'
}

export type Query = {
  __typename?: 'Query';
  checkVersionUploadState?: Maybe<CreateVersionResponse>;
  getAnnouncement?: Maybe<Announcement>;
  getAnnouncements: Array<Announcement>;
  getAnnouncementsByImportance: Array<Announcement>;
  getGuide?: Maybe<Guide>;
  getGuides: GetGuides;
  getMe?: Maybe<User>;
  getMod?: Maybe<Mod>;
  getModAssetList: Array<Scalars['String']['output']>;
  getModByIdOrReference?: Maybe<Mod>;
  getModByReference?: Maybe<Mod>;
  getMods: GetMods;
  getMyMods: GetMyMods;
  getMyUnapprovedMods: GetMyMods;
  getMyUnapprovedVersions: GetMyVersions;
  getMyVersions: GetMyVersions;
  getOAuthOptions: OAuthOptions;
  /** @deprecated SML is now a mod */
  getSMLVersion?: Maybe<SmlVersion>;
  /** @deprecated SML is now a mod */
  getSMLVersions: GetSmlVersions;
  getSatisfactoryVersion?: Maybe<SatisfactoryVersion>;
  getSatisfactoryVersions: Array<SatisfactoryVersion>;
  getTag?: Maybe<Tag>;
  getTags: Array<Tag>;
  getUnapprovedMods: GetMods;
  getUnapprovedVersions: GetVersions;
  getUser?: Maybe<User>;
  getUsers: Array<Maybe<User>>;
  getVersion?: Maybe<Version>;
  getVersions: GetVersions;
  resolveModVersions: Array<ModVersion>;
};


export type QueryCheckVersionUploadStateArgs = {
  modId: Scalars['ModID']['input'];
  versionId: Scalars['VersionID']['input'];
};


export type QueryGetAnnouncementArgs = {
  announcementId: Scalars['AnnouncementID']['input'];
};


export type QueryGetAnnouncementsByImportanceArgs = {
  importance: AnnouncementImportance;
};


export type QueryGetGuideArgs = {
  guideId: Scalars['GuideID']['input'];
};


export type QueryGetGuidesArgs = {
  filter?: InputMaybe<GuideFilter>;
};


export type QueryGetModArgs = {
  modId: Scalars['ModID']['input'];
};


export type QueryGetModAssetListArgs = {
  modReference: Scalars['ModID']['input'];
};


export type QueryGetModByIdOrReferenceArgs = {
  modIdOrReference: Scalars['String']['input'];
};


export type QueryGetModByReferenceArgs = {
  modReference: Scalars['ModReference']['input'];
};


export type QueryGetModsArgs = {
  filter?: InputMaybe<ModFilter>;
};


export type QueryGetMyModsArgs = {
  filter?: InputMaybe<ModFilter>;
};


export type QueryGetMyUnapprovedModsArgs = {
  filter?: InputMaybe<ModFilter>;
};


export type QueryGetMyUnapprovedVersionsArgs = {
  filter?: InputMaybe<VersionFilter>;
};


export type QueryGetMyVersionsArgs = {
  filter?: InputMaybe<VersionFilter>;
};


export type QueryGetOAuthOptionsArgs = {
  callback_url: Scalars['String']['input'];
};


export type QueryGetSmlVersionArgs = {
  smlVersionID: Scalars['SMLVersionID']['input'];
};


export type QueryGetSmlVersionsArgs = {
  filter?: InputMaybe<SmlVersionFilter>;
};


export type QueryGetSatisfactoryVersionArgs = {
  id: Scalars['SatisfactoryVersionID']['input'];
};


export type QueryGetTagArgs = {
  tagID: Scalars['TagID']['input'];
};


export type QueryGetTagsArgs = {
  filter?: InputMaybe<TagFilter>;
};


export type QueryGetUnapprovedModsArgs = {
  filter?: InputMaybe<ModFilter>;
};


export type QueryGetUnapprovedVersionsArgs = {
  filter?: InputMaybe<VersionFilter>;
};


export type QueryGetUserArgs = {
  userId: Scalars['UserID']['input'];
};


export type QueryGetUsersArgs = {
  userIds: Array<Scalars['UserID']['input']>;
};


export type QueryGetVersionArgs = {
  versionId: Scalars['VersionID']['input'];
};


export type QueryGetVersionsArgs = {
  filter?: InputMaybe<VersionFilter>;
};


export type QueryResolveModVersionsArgs = {
  filter: Array<ModVersionConstraint>;
};

export type SmlVersion = {
  __typename?: 'SMLVersion';
  bootstrap_version?: Maybe<Scalars['String']['output']>;
  changelog: Scalars['String']['output'];
  created_at: Scalars['Date']['output'];
  date: Scalars['Date']['output'];
  engine_version: Scalars['String']['output'];
  id: Scalars['SMLVersionID']['output'];
  link: Scalars['String']['output'];
  satisfactory_version: Scalars['Int']['output'];
  stability: VersionStabilities;
  targets: Array<Maybe<SmlVersionTarget>>;
  updated_at: Scalars['Date']['output'];
  version: Scalars['String']['output'];
};

export enum SmlVersionFields {
  CreatedAt = 'created_at',
  Date = 'date',
  Name = 'name',
  SatisfactoryVersion = 'satisfactory_version',
  UpdatedAt = 'updated_at'
}

export type SmlVersionFilter = {
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Order>;
  order_by?: InputMaybe<SmlVersionFields>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type SmlVersionTarget = {
  __typename?: 'SMLVersionTarget';
  VersionID: Scalars['SMLVersionID']['output'];
  link: Scalars['String']['output'];
  targetName: TargetName;
};

export type SatisfactoryVersion = {
  __typename?: 'SatisfactoryVersion';
  engine_version: Scalars['String']['output'];
  id: Scalars['SatisfactoryVersionID']['output'];
  version: Scalars['Int']['output'];
};

export type Tag = {
  __typename?: 'Tag';
  description: Scalars['String']['output'];
  id: Scalars['TagID']['output'];
  name: Scalars['TagName']['output'];
};

export type TagFilter = {
  ids?: InputMaybe<Array<Scalars['TagID']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Order>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export enum TargetName {
  LinuxServer = 'LinuxServer',
  Windows = 'Windows',
  WindowsServer = 'WindowsServer'
}

export type UpdateAnnouncement = {
  importance?: InputMaybe<AnnouncementImportance>;
  message?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateGuide = {
  guide?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  short_description?: InputMaybe<Scalars['String']['input']>;
  tagIDs?: InputMaybe<Array<Scalars['TagID']['input']>>;
};

export type UpdateMod = {
  authors?: InputMaybe<Array<UpdateUserMod>>;
  compatibility?: InputMaybe<CompatibilityInfoInput>;
  full_description?: InputMaybe<Scalars['String']['input']>;
  hidden?: InputMaybe<Scalars['Boolean']['input']>;
  logo?: InputMaybe<Scalars['Upload']['input']>;
  mod_reference?: InputMaybe<Scalars['ModReference']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  short_description?: InputMaybe<Scalars['String']['input']>;
  source_url?: InputMaybe<Scalars['String']['input']>;
  tagIDs?: InputMaybe<Array<Scalars['TagID']['input']>>;
  toggle_explicit_content?: InputMaybe<Scalars['Boolean']['input']>;
  toggle_network_use?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateSatisfactoryVersion = {
  engine_version?: InputMaybe<Scalars['String']['input']>;
  version?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateUser = {
  avatar?: InputMaybe<Scalars['Upload']['input']>;
  groups?: InputMaybe<Array<Scalars['String']['input']>>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserMod = {
  role: Scalars['String']['input'];
  user_id: Scalars['UserID']['input'];
};

export type UpdateVersion = {
  changelog?: InputMaybe<Scalars['String']['input']>;
  stability?: InputMaybe<VersionStabilities>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  avatar_thumbhash?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['Date']['output'];
  email?: Maybe<Scalars['String']['output']>;
  facebook_id?: Maybe<Scalars['String']['output']>;
  github_id?: Maybe<Scalars['String']['output']>;
  google_id?: Maybe<Scalars['String']['output']>;
  groups: Array<Group>;
  guides: Array<Guide>;
  id: Scalars['UserID']['output'];
  mods: Array<UserMod>;
  roles: UserRoles;
  username: Scalars['String']['output'];
};

export type UserMod = {
  __typename?: 'UserMod';
  mod: Mod;
  mod_id: Scalars['ModID']['output'];
  role: Scalars['String']['output'];
  user: User;
  user_id: Scalars['UserID']['output'];
};

export type UserRoles = {
  __typename?: 'UserRoles';
  approveMods: Scalars['Boolean']['output'];
  approveVersions: Scalars['Boolean']['output'];
  deleteContent: Scalars['Boolean']['output'];
  editAnyModCompatibility: Scalars['Boolean']['output'];
  editBootstrapVersions: Scalars['Boolean']['output'];
  editContent: Scalars['Boolean']['output'];
  editSatisfactoryVersions: Scalars['Boolean']['output'];
  editUsers: Scalars['Boolean']['output'];
};

export type UserSession = {
  __typename?: 'UserSession';
  token: Scalars['String']['output'];
};

export type Version = {
  __typename?: 'Version';
  approved: Scalars['Boolean']['output'];
  changelog: Scalars['String']['output'];
  created_at: Scalars['Date']['output'];
  dependencies: Array<VersionDependency>;
  downloads: Scalars['Int']['output'];
  game_version: Scalars['String']['output'];
  hash?: Maybe<Scalars['String']['output']>;
  id: Scalars['VersionID']['output'];
  link: Scalars['String']['output'];
  metadata?: Maybe<Scalars['String']['output']>;
  mod: Mod;
  mod_id: Scalars['ModID']['output'];
  required_on_remote: Scalars['Boolean']['output'];
  size?: Maybe<Scalars['Int']['output']>;
  sml_version: Scalars['String']['output'];
  stability: VersionStabilities;
  targets: Array<Maybe<VersionTarget>>;
  updated_at: Scalars['Date']['output'];
  version: Scalars['String']['output'];
  virustotal_results: Array<VirustotalResult>;
};

export type VersionDependency = {
  __typename?: 'VersionDependency';
  condition: Scalars['String']['output'];
  mod?: Maybe<Mod>;
  /** @deprecated soon will return actual mod id instead of reference. use mod_reference field instead! */
  mod_id: Scalars['ModID']['output'];
  mod_reference: Scalars['String']['output'];
  optional: Scalars['Boolean']['output'];
  version?: Maybe<Version>;
  version_id: Scalars['VersionID']['output'];
};

export enum VersionFields {
  CreatedAt = 'created_at',
  Downloads = 'downloads',
  UpdatedAt = 'updated_at'
}

export type VersionFilter = {
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Order>;
  order_by?: InputMaybe<VersionFields>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export enum VersionStabilities {
  Alpha = 'alpha',
  Beta = 'beta',
  Release = 'release'
}

export type VersionTarget = {
  __typename?: 'VersionTarget';
  VersionID: Scalars['VersionID']['output'];
  hash?: Maybe<Scalars['String']['output']>;
  link: Scalars['String']['output'];
  size?: Maybe<Scalars['Int']['output']>;
  targetName: TargetName;
};

export type VirustotalResult = {
  __typename?: 'VirustotalResult';
  created_at: Scalars['Date']['output'];
  file_name: Scalars['String']['output'];
  hash: Scalars['VirustotalHash']['output'];
  id?: Maybe<Scalars['VirustotalID']['output']>;
  safe: Scalars['Boolean']['output'];
  updated_at?: Maybe<Scalars['Date']['output']>;
  version_id: Scalars['String']['output'];
};

export type GetModQueryVariables = Exact<{
  mod: Scalars['ModReference']['input'];
}>;


export type GetModQuery = { __typename?: 'Query', getModByReference?: { __typename?: 'Mod', versions: Array<{ __typename?: 'Version', version: string }> } | null };

export type GetModIdQueryVariables = Exact<{
  mod: Scalars['ModReference']['input'];
}>;


export type GetModIdQuery = { __typename?: 'Query', getModByReference?: { __typename?: 'Mod', id: any } | null };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const GetModDocument = new TypedDocumentString(`
    query GetMod($mod: ModReference!) {
  getModByReference(modReference: $mod) {
    versions {
      version
    }
  }
}
    `) as unknown as TypedDocumentString<GetModQuery, GetModQueryVariables>;
export const GetModIdDocument = new TypedDocumentString(`
    query GetModId($mod: ModReference!) {
  getModByReference(modReference: $mod) {
    id
  }
}
    `) as unknown as TypedDocumentString<GetModIdQuery, GetModIdQueryVariables>;