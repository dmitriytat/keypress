import {keypress} from "./mod.ts";

for await (const event of keypress()) {
    console.log(event);

    if (event.ctrlKey && event.key === 'c') {
        Deno.exit(0);
    }
}
