const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('readings.db');

const WebSocket = require('ws');
const ws = new WebSocket("ws://localhost:3000");

ws.binaryType = "arraybuffer";

ws.onopen = () => {
	console.log("Connection opened");
}

ws.onmessage = (msg) => {
	let raw = new Int8Array(msg.data);

	// Eye tracking is in the first 

	// Bands are in the first 3 bytes
	let bands = 
	let d = new Float32Array(msg.data);
	let date = Date.now();

	console.log(d);
	return;

	// Use Transactions for fast insertions (<10k)
	db.exec("BEGIN TRANSACTION");
	let stmt = db.prepare("INSERT INTO signals VALUES (?, ?, ?)");
	d.forEach((signal, index) => {
		stmt.run(date, index, signal);
	});
	stmt.finalize(() => db.exec("END TRANSACTION"));
};

db.serialize(function() {
	db.run("CREATE TABLE IF NOT EXISTS signals (time INTEGER, channel INTEGER, val REAL)");
	db.run("CREATE TABLE IF NOT EXISTS message (time INTEGER, type INTEGER, value TEXT)");
});

// process.on('SIGINT', function() {
// 	try {
// 		db.close();
// 	} catch (e) {
// 		console.log("Couldn't close DB. good luck.");
// 	}
// });