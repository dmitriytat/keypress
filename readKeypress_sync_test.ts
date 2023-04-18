import { readKeypressSync } from "./mod.ts";

for (const keypress of readKeypressSync()) {
    console.log(keypress);

    if (keypress.ctrlKey && keypress.key === 'c') {
        Deno.exit(0);
    }
}