import {readKeypress} from "./mod.ts";

while (true) {
    const events = await readKeypress();

    events.forEach(event => {
        console.log(event);

        if (event.ctrlKey && event.key === 'c') {
            Deno.exit(0);
        }
    })
}
