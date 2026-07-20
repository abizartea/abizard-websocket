const WebSocket = require("ws");

const wss = new WebSocket.Server({
    port: 8081
});

let nowPlaying = {};

wss.on("connection", (ws) => {

    console.log("Client terhubung");

    // kirim data terakhir ke client baru
    ws.send(JSON.stringify(nowPlaying));

    ws.on("message", (msg) => {

        nowPlaying = JSON.parse(msg);

        // kirim ke semua client
        wss.clients.forEach(client => {

            if (client.readyState === WebSocket.OPEN) {

                client.send(JSON.stringify(nowPlaying));

            }

        });

    });

});

console.log("WebSocket jalan di port 8081");