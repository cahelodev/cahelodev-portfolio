import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const mimeTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".jpg", "image/jpeg"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
]);

function sendJson(response, status, payload) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(payload));
}

async function serveStatic(pathname, response, method) {
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(pathname);
  } catch {
    sendJson(response, 400, { error: "Invalid URL." });
    return;
  }

  const filePath = resolve(root, `.${decodedPath === "/" ? "/index.html" : decodedPath}`);
  const fileRelativePath = relative(root, filePath);
  const imageRelativePath = relative(resolve(root, "img"), filePath);
  const isPublicRootFile = ["index.html", "styles.css", "app.js"].includes(fileRelativePath);
  const isPublicImage =
    imageRelativePath !== ".." &&
    !imageRelativePath.startsWith(`..${sep}`) &&
    !imageRelativePath.startsWith(sep);

  if (!isPublicRootFile && !isPublicImage) {
    sendJson(response, 404, { error: "Not found." });
    return;
  }

  try {
    const fileStats = await stat(filePath);
    if (!fileStats.isFile()) {
      sendJson(response, 404, { error: "Not found." });
      return;
    }

    response.writeHead(200, {
      "Content-Length": fileStats.size,
      "Content-Type": mimeTypes.get(extname(filePath)) || "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
    });

    if (method === "HEAD") {
      response.end();
      return;
    }

    createReadStream(filePath).pipe(response);
  } catch (error) {
    if (error.code === "ENOENT" || error.code === "ENOTDIR") {
      sendJson(response, 404, { error: "Not found." });
      return;
    }
    throw error;
  }
}

const server = createServer(async (request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.setHeader("Allow", "GET, HEAD");
    sendJson(response, 405, { error: "Method not allowed." });
    return;
  }

  const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);
  try {
    await serveStatic(url.pathname, response, request.method);
  } catch (error) {
    console.error("Static file could not be served:", error);
    if (!response.headersSent) {
      sendJson(response, 500, { error: "Unable to serve this page." });
    } else {
      response.destroy(error);
    }
  }
});

const port = Number(process.env.PORT || 4173);
server.listen(port, () => {
  console.log(`Website available at http://localhost:${port}`);
});
