'use client' // Використання клієнтського режиму для оптимізації завантаження

import React, { useEffect, useState } from 'react'; // Імпортування React, хуків useEffect та useState
import io from 'socket.io-client'; // Імпортування клієнтської бібліотеки Socket.IO

const Home = () => {
  const [serverTime, setServerTime] = useState(''); // Стан для зберігання часу сервера

  useEffect(() => {
    const socket = io('http://localhost:3001'); // Підключення до Socket.IO сервера

    socket.on('connect', () => {
      console.log('connected to socket server'); // Виведення повідомлення при успішному підключенні
    });

    // Підписка на подію 'serverTime' для отримання часу з сервера
    socket.on('serverTime', (data) => {
      setServerTime(data.time); // Оновлення стану часу сервера
    });

    return () => {
      socket.disconnect(); // Відключення від сокета при розмонтовуванні компонента
    };
  }, []); // Порожній масив залежностей, щоб ефект виконувався один раз при монтажі

  return <div>Hello, server time is: {serverTime}</div>; // Відображення часу сервера у компоненті
};

export default Home; // Експорт компонента Home