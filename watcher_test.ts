import { watchKeypress } from "./watcher.ts";

const watcher = watchKeypress();

setTimeout(() => {
  console.log("closing watcher");
  watcher.close();
}, 3000);

for await (const keypress of watcher) {
  console.log(keypress);
}
