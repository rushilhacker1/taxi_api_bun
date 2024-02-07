//imports
import { Database } from "bun:sqlite";

//db init
const db = new Database("mydb.sqlite", { create: true });
db.exec("PRAGMA journal_mode = WAL;");
db.run(`CREATE TABLE IF NOT EXISTS Customer (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image_url VARCHAR(1000),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(1100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    rating INTEGER NOT NULL,
    balance INTEGER NOT NULL,
    location VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL
)`)
db.run(`
CREATE TABLE IF NOT EXISTS Driver (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image_url VARCHAR(1000),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(1100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    rating INTEGER NOT NULL,
    status VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL
)
`)

//global variables
const port = 3000 | process.env.PORT

//fnctions
function log(log){
    console.log(log)
}
function hash(pass){
  const hasher = new Bun.CryptoHasher("sha256");
  hasher.update(pass);
  const retu = hasher.digest("base64");
return retu
}

console.log("Hello via Bun!");
const server = Bun.serve({
  development: true,
  port: 80,
    fetch(req) {
      const url = new URL(req.url);
      const urlParams = new URLSearchParams(url.search);
      switch (url.pathname) {
        case "/get":
          return new Response("okokokokooooookokoo")
        case "/":
          return new Response(Bun.file("./public/home.htm"))
        default:
          return new Response(Bun.file("./public/404.htm"))
      }
    },
  });
log("app running on port ".concat(port))
log(hash("w"))