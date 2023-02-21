### Deno keypress reader

Reads key from stdin.

### Try

```deno run https://deno.land/x/keypress@0.0.10/readKeypress_test.ts```

```ts
// CTRL + C keypress
const keypress: Keypress = {
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

Read from Deno.stdin by default:

```ts
import { readKeypress } from "https://deno.land/x/keypress@0.0.10/mod.ts";

for await (const keypress of readKeypress()) {
    console.log(keypress);

    if (keypress.ctrlKey && keypress.key === 'c') {
        Deno.exit(0);
    }
}
```

### New options object


```ts
import { readKeypress } from "https://deno.land/x/keypress@0.0.10/mod.ts";

export const options: KeypressOptions = {
    /**
     * Buffer size
     */
    bufferLength: 1024,
    /**
     * The `cbreak` option can be used to indicate that characters that
     * correspond to a signal should still be generated. When disabling raw
     * mode, this option is ignored. This functionality currently only works on
     * Linux and Mac OS.
     */
    cbreak: false
}

for await (const keypress of readKeypress(Deno.stdin, options)) {
    console.log(keypress);

    if (keypress.ctrlKey && keypress.key === 'c') {
        Deno.exit(0);
    }
}
```

Big thanks to Nathan Rajlich and his https://github.com/TooTallNate/keypress, whitch code for key decode I took to this library.
