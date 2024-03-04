import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'

const port = process.env.PORT || 80;


function log(log:string) {
    console.log(log);
  }
  function hasher(pass:string) {
    const hasher = new Bun.CryptoHasher("sha256");
    hasher.update(pass);
    const retu = hasher.digest("base64");
    return retu;
  }

const app = new Hono()

app.use('/favicon.ico', serveStatic({ path: './public/favicon.ico' }))
app.use('/', serveStatic({path: './src/html/home.htm'}))
app.use('/contect', serveStatic({path: './src/html/'}))
app.get('*', serveStatic({ path: './src/html/404.htm' }))


const server = Bun.serve({
    port:port,
    development: true,
    fetch: app.fetch
})

log(`app running on port ${port} `);
