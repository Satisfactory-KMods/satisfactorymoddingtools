let obj: { string: string };
obj = {
	string: `void AFGBuildable::PostEditChangeProperty(FPropertyChangedEvent& PropertyChangedEvent)
{
\tSuper::PostEditChangeProperty(PropertyChangedEvent);
\tif( PropertyChangedEvent.GetPropertyName() == GET_MEMBER_NAME_CHECKED( AFGBuildable, mInstanceData) )
\t{
\t\tmInstanceDataCDO = mInstanceData;
\t}
\t
\tif( PropertyChangedEvent.GetPropertyName() == GET_MEMBER_NAME_CHECKED( AFGBuildable, mBuildableSparseDataEditorObject) )
\t{
\t\tmBuildableSparseDataCDO = mBuildableSparseDataEditorObject;
\t}
}`
};

obj.string = `/**<KMods>*/${obj.string}/**</KMods>*/`;
let OutString = JSON.stringify(obj);
//OutString = OutString.replaceAll("\\t", "");
OutString = OutString.replaceAll('\\n', '\\r\\n');
console.log(OutString);
