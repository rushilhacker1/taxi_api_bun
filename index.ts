
const app = new Hono()

const server = bun.server({
    port:80,
    fetch: app.fetch()
})