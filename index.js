
//global variables
const port = process.env.PORT;

//fnctions
function log(log) {
  console.log(log);
}
function hasher(pass) {
  const hasher = new Bun.CryptoHasher("sha256");
  hasher.update(pass);
  const retu = hasher.digest("base64");
  return retu;
}

const server = Bun.serve({
  development: true,
  port: port,

  async fetch(req) {
    const url = new URL(req.url);
    const urlParams = new URLSearchParams(url.search);

    switch (url.pathname) {
          case "/":
            return new Response(Bun.file("./src/html/home.htm"));
          case "/contact":
            return new Response(Bun.file("./src/html/contact_us.htm"));
          case "/favicon.ico":
            return new Response(Bun.file("./public/favicon.ico"));
          default:
            return new Response(Bun.file("./src/html/404.htm"));
        }
    }
  },
);

log(`app running on port ${port} `);
