### Deno keypress reader

Reads key from stdin.

### Try

```deno run --unstable keypress_test.ts```

```ts
// CTRL + C event
const event: IEvent = {
  type: "keypress",
  key: "c",
  code: undefined,
  keyCode: 3,
  sequence: "",
  unicode: "\u0003",
  ctrlKey: true,
  metaKey: false,
  shiftKey: false
}
```

### Usage

```ts
import { keypress, readKeypress } from "./mod.ts";

for await (const event of keypress()) {
    console.log(event);

    if (event.ctrlKey && event.key === 'c') {
        Deno.exit(0);
    }
}

// or

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
