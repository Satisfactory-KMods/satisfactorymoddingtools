export type HeaderPatch_Replace = {
	Find: string;
	Replace: string;
};

export type HeaderPatch_Includer = {
	ClassFileName: string;
	Include: string;
	After: string;
	If: string;
};

export type HeaderPatch_Append = {
	Find: string;
	Append: string;
};

export type HeaderPatch_Append = {
	ClassFileName: string;
	Class: string;
	Function: string;
	Template: string;
	FunctionContent: string[];
};

export type HeaderPatch_Config = {
	AutoAppender: HeaderPatch_Append[];
	AutoReplacer: HeaderPatch_Replace[];
	FunctionOverwrite: HeaderPatch_FunctionOverwrite[];
	Includer: HeaderPatch_Includer[];
};
