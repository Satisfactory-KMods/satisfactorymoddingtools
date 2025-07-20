import 'zx/globals'
import { PackHelperConfig } from "./Config/ToolConfig";
import { LogEntry, quotePowerShell } from 'zx'

$.log = (entry: LogEntry) => {
	switch (entry.kind) {
		case 'stdout':
			// for example, apply custom data masker for cmd printing
			process.stdout.write(entry.data.toString())
			break
	  case 'cmd':
		// for example, apply custom data masker for cmd printing
		process.stdout.write(entry.cmd)
		break
	  default:
		log(entry)
	}
  }
$.log.output = process.stdout

$.quote = quotePowerShell
for(const prom of Object.keys(PackHelperConfig.Mods).map((mod) => async () => await $`tsx ./Src/RunPackForMe.ts ${mod}`)) {
	await prom()
}