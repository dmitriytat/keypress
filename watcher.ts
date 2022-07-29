import { decodeKeypress, Keypress } from "./mod.ts";

class KeypressWatcher implements AsyncIterable<Keypress> {
  // @ts-ignore
  private closingPromiseResolve: (value: number) => void;
  private closingPromise;

  constructor(
    private reader: Deno.Reader & Deno.Closer & { rid: number },
    private bufferLength: number,
  ) {
    if (!Deno.isatty(reader.rid)) {
      throw new Error("Keypress can be read only under TTY.");
    }

    this.closingPromise = new Promise((resolve) => {
      this.closingPromiseResolve = resolve;
    });
  }

  /** Stops watching the input. */
  close(): void {
    this.closingPromiseResolve(-1);
  }

  [Symbol.asyncIterator](): AsyncIterator<Keypress> {
    // @ts-ignore
    const that = this;

    return {
      async next() {
        const buffer = new Uint8Array(that.bufferLength);
        // @ts-ignore
        Deno.setRaw(that.reader.rid, true);
        const length = <number> await Promise.race([
          that.reader.read(buffer),
          that.closingPromise,
        ]);
        // @ts-ignore
        Deno.setRaw(that.reader.rid, false);

        if (length === -1) {
          that.reader.close();
          return Promise.resolve({ value: undefined, done: true });
        }

        const [event] = decodeKeypress(buffer.subarray(0, length));

        return Promise.resolve({
          value: event,
          done: false,
        });
      },
    };
  }
}

export function watchKeypress(
  reader: Deno.Reader & Deno.Closer & { rid: number } = Deno.stdin,
  bufferLength = 1024,
): KeypressWatcher {
  return new KeypressWatcher(reader, bufferLength);
}
