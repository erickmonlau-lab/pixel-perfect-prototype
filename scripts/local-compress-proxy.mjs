// Local measurement helper: plain gzip/brotli compression in front of a Nitro
// node-server, which serves SSR HTML uncompressed. Production serves brotli,
// so this keeps harness comparisons on the wire size they see in production.
import http from "node:http";
import zlib from "node:zlib";

const listenPort = Number(process.argv[2] || 3001);
const upstreamPort = Number(process.argv[3] || 3000);

const shouldCompress = (type) =>
  /text\/html|text\/css|application\/javascript|text\/javascript|image\/svg/.test(type || "");

http
  .createServer((req, res) => {
    const accept = String(req.headers["accept-encoding"] || "");
    const upstream = http.request(
      { host: "127.0.0.1", port: upstreamPort, path: req.url, method: req.method, headers: req.headers },
      (up) => {
        const type = up.headers["content-type"];
        if (!shouldCompress(type) || accept === "") {
          res.writeHead(up.statusCode || 500, up.headers);
          up.pipe(res);
          return;
        }
        const headers = { ...up.headers };
        delete headers["content-length"];
        const useBr = /\bbr\b/.test(accept);
        headers["content-encoding"] = useBr ? "br" : "gzip";
        headers.vary = "Accept-Encoding";
        res.writeHead(up.statusCode || 500, headers);
        const zip = useBr
          ? zlib.createBrotliCompress({ params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 5 } })
          : zlib.createGzip({ level: 6 });
        up.pipe(zip).pipe(res);
      },
    );
    upstream.on("error", (e) => {
      res.statusCode = 502;
      res.end(String(e.message));
    });
    req.pipe(upstream);
  })
  .listen(listenPort, "127.0.0.1", () =>
    console.log(`proxy ${listenPort} -> ${upstreamPort}`),
  );
