import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import WebSocket from 'websocket';
import wsConnect from './wsConnect';
import mongo from './mongo';


mongo.connect();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const db = mongoose.connection;
db.once('open', () => {
    console.log("MongoDB connected!");
    wss.on('connection', (ws) => {
        wsConnect.onMessage(ws);
    });
});
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {console.log(`Example app listening on port ${port}!`);});