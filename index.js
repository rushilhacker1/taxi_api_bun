//imports
const { MongoClient } = require("mongodb");

//db init
const uri =
  "mongodb+srv://rushil:ankurrushil1@cluster0.uizpbcq.mongodb.net/?retryWrites=true&w=majority";
// db.run(`
// CREATE TABLE IF NOT EXISTS Driver (
// id INTEGER PRIMARY KEY AUTOINCREMENT,
// image_url VARCHAR(1000),
// name VARCHAR(100) NOT NULL,
// email VARCHAR(1100) NOT NULL UNIQUE,
// password VARCHAR(100) NOT NULL,
// rating INTEGER NOT NULL,
// status VARCHAR(100) NOT NULL,
// location VARCHAR(100) NOT NULL,
// destination VARCHAR(100) NOT NULL
// )
// `)

//global variables
const port = 80 | process.env.PORT;
const client = new MongoClient(uri);

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
      case "/customers":
        switch (req.method) {
          case "GET":
            const need = urlParams.get("id");
            if (need == null) {
              const query = db.query("SELECT * FROM Customer");
              return new Response(JSON.stringify(query.values()));
            } else {
              const query = db.query(
                "SELECT * FROM Customer where id = ".concat(need)
              );
              const result = query.get();
              if (result == null) {
                throw new Error("undefined");
              } else {
                return new Response(JSON.stringify(result));
              }
            }

          case "PUT":
            const data = await req.json();
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
});

log(`app running on port ${port} `);
