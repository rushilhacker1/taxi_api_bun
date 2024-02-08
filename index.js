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
function log(log) {
  console.log(log)
}
function hash(pass) {
  const hasher = new Bun.CryptoHasher("sha256");
  hasher.update(pass);
  const retu = hasher.digest("base64");
  return retu
}

console.log("Hello via Bun!");
const server = Bun.serve({
  development: true,
  port: 80,
  async fetch(req) {
    const url = new URL(req.url);
    const urlParams = new URLSearchParams(url.search);
    switch (url.pathname) {
      case "/customers":
        switch (req.method) {
          case "GET":
            const need = urlParams.get("id");
            if (need == null) {
              const query = db.query("SELECT * FROM Customer")
              log("q")
              return new Response(JSON.stringify(query.values()))
            } else {
            const query = db.query("SELECT * FROM Customer where id = ".concat(need))
            const result = query.values()
            log(result)
            log(need)
            if (result == "[]") {
              throw new Error("undefined");
            } else {
              return new Response(JSON.stringify(result));
            }
          }
          case "PUT":
            const data = await req.json();
            const sql = `
            INSERT INTO Customer (
                image_url, 
                name, 
                email, 
                password, 
                rating, 
                balance, 
                location, 
                destination
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        
        db.run(sql, [
            data.image_url, 
            data.name, 
            data.email, 
            data.password, 
            data.rating, 
            data.balance, 
            data.location, 
            data.destination
        ]);
        }
      case "/":
        return new Response(Bun.file("./public/home.htm"))
      default:
        return new Response(Bun.file("./public/404.htm"))
    }
  },
});
log("app running on port ".concat(port))
log(hash("w"))