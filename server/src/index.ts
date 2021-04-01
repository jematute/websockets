import * as fs from 'fs';
import express from "express";
import ws from "ws";
import cors from "cors";

const wss = new ws.Server({ port: 8081 });
const app = express();
const port = 8080; // default port to listen

app.use(cors());
// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( "Hello jjjj" );
} );

 app.get("/message", (req, res) => {
    console.log("Message", req.query.message);
    if (wss) {
        wss.clients.forEach((client) => {
            client.send(req.query.message);
        });
        
    }
    res.send('"Message received"');
 });

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );

app.get("/data", ( req, res) => {
    res.send({ name: "Juan", phone: "610-417-7659"});
});

wss.on('connection', ws => {
    ws.on('message', message => {
      console.log(`Received message => ${message}`)
    })
    ws.send('Web Socket Connected');
});

