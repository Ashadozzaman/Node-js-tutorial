// Simple Node js server
const http = require("http");
const syntex = require("./syntex");

const server = http.createServer((req, res) => {
  console.log(req.method, req.url);
  syntex();
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
