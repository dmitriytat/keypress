### Deno keypress reader

Reads key from stdin.

### Try

```deno run --unstable test.ts```

### Usage

```ts
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
```


Big thanks to Nathan Rajlich and his https://github.com/TooTallNate/keypress, whitch code for key decode I took to this library.
