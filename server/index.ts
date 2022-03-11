import next from 'next';
import { parse } from 'url';
import { Server } from 'socket.io';
import { createServer } from 'http';

const app = next({ dev: true });
const port = 3000
const handler = app.getRequestHandler();

app.prepare().then(() => {
    const server = createServer((req, res) => {
      const parsedUrl = parse(req.url!, true);
      handler(req, res, parsedUrl);
    }).listen(port);

    const io = new Server(server);

    io.on('connect', socket => socket.emit('now', {
      id: socket.id,
      msg: "Hello World"
    }))

  
    console.log(`> Server started on PORT ${port}`);
})