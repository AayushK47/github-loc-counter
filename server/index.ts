import next from 'next';
import { parse } from 'url';
import { Server } from 'socket.io';
import { createServer } from 'http';

import { cloneRepos, scanFiles, fetchLoc, removeRepos } from '../utils/core';

const app = next({ dev: true });
const port = 3000;
const handler = app.getRequestHandler();

app.prepare().then(() => {
    const server = createServer((req, res) => {
      const parsedUrl = parse(req.url!, true);
      handler(req, res, parsedUrl);
    }).listen(port);

    const io = new Server(server);
    let username: string;
    io.on('connect', (socket) => {
      socket.on('start', async (data) => {
		username = data;
		socket.emit('progress', 'Cloning the repositories...');
		await cloneRepos(username);
		console.log('cloning complete');
		socket.emit('progress', 'Scanning your projects...');
		const files = await scanFiles(username);
		socket.emit('progress', 'Counting the lines of code...');
		const loc = await fetchLoc(files);
		socket.emit('finish', loc);
		removeRepos(username);
      });
    });

    console.log(`> Server started on PORT ${port}`);
});