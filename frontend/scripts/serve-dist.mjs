import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "../dist");
const types = new Map([
  [".html", "text/html"],
  [".js", "text/javascript"],
  [".css", "text/css"],
  [".svg", "image/svg+xml"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"]
]);

http.createServer((req, res) => {
  const requestPath = decodeURIComponent((req.url ?? "/").split("?")[0]);
  let filePath = requestPath === "/" ? path.join(root, "index.html") : path.join(root, requestPath);
  if (!filePath.startsWith(root)) filePath = path.join(root, "index.html");
  fs.stat(filePath, (statError, stat) => {
    if (statError || stat.isDirectory()) filePath = path.join(root, "index.html");
    fs.readFile(filePath, (readError, data) => {
      if (readError) {
        res.writeHead(404);
        res.end("not found");
        return;
      }
      res.writeHead(200, { "content-type": types.get(path.extname(filePath)) ?? "application/octet-stream" });
      res.end(data);
    });
  });
}).listen(5173, "0.0.0.0");
