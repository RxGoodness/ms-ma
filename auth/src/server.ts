// import { createServer } from "http";
// import app from "./app";
// import { config } from "./config/env";

// const server = createServer(app);
// const { LOCAL_PORT, PORT } = config;

// const port = PORT || LOCAL_PORT;
// server.listen(port, () => {
//   console.log(`server running on *::${port}`);
// });

import app from './app';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Auth service is running on port ${PORT}`);
});
