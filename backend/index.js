const express = require('express'); // Підключення Express фреймворку
const { createServer } = require('node:http'); // Імпорт методу для створення HTTP сервера
const { Server } = require('socket.io'); // Імпорт Socket.IO для роботи з WebSocket

const app = express(); // Створення екземпляру Express додатку
const server = createServer(app); // Створення HTTP сервера, який використовує Express додаток
const io = new Server(server, {
	cors: {
		origin: "*", // Дозвіл на запити з будь-якого джерела
		methods: ["GET", "POST"] // Дозвіл лише на методи GET та POST
	}
}); // Створення екземпляру Socket.IO сервера з налаштуванням CORS

app.get('/', (req, res) => {
	res.send("Ok"); // Основний маршрут, який повертає текст "Ok"
});

io.on('connection', (socket) => {
	console.log('a user connected'); // Вивід у консоль при підключенні нового користувача

	// Відправлення часу сервера клієнту кожну секунду
	setInterval(() => {
		socket.emit('serverTime', { time: new Date().toTimeString() });
	}, 1000);
});

server.listen(3001, () => {
	console.log('server running at http://localhost:3001'); // Початок прослуховування сервером порту 3001 і вивід у консоль
});