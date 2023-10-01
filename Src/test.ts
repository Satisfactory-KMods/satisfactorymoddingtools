import * as FS from 'fs';

let File = 'C:\\Users\\olli1\\Downloads\\SMMDebug_2022-12-29_21-58-46\\FactoryGame.log';
let Content = FS.readFileSync(File).toString();
let NewContent: string[] = [];

for (const Line of Content.split('\\n')) {
	if (!Line.includes('LogKPCL')) {
		NewContent.push(Line);
	}
}

FS.writeFileSync(File, NewContent.join('\\n'));
