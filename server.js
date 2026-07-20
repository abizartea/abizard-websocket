const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const path = require("path");

const app = express();
const server = http.createServer(app);

const PORT = 8159;

app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// WebSocket Server
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {

    console.log("Client terhubung");

    ws.on("message", (message) => {

        console.log("Data:", message.toString());

        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });

    });

    ws.on("close", () => {
        console.log("Client keluar");
    });

});

server.listen(PORT, () => {
    console.log("ABIZARD berjalan di http://localhost:" + PORT);
});
