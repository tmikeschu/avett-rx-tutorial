export default function main(): void {
  if (typeof window === "undefined") {
    /* eslint-disable @typescript-eslint/no-var-requires */
    const { server } = require("./server");
    server.listen();
  } else {
    const { worker } = require("./browser");
    /* eslint-enable @typescript-eslint/no-var-requires */
    worker.start();
  }
}
