import { runServer } from "./server";

runServer().catch((err) => {
  console.error(err);
  process.exit(1);
});
