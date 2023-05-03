const fs = require('fs');
const readline = require('readline');
const path = require('path');

const filename = path.join(__dirname, 'output.txt');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Создание потока записи в текстовый файл
let stream = fs.createWriteStream(filename, { flags: 'a' });

console.log('Добро пожаловать! Введите текст или введите exit для выхода.');

rl.on('line', (input) => {
  if (input === 'exit') {
    console.log('Завершение работы программы.');
    rl.close();
  } else {
    // Запись текста в файл
    stream.write(`${input}\n`);
    console.log(`Вы ввели: ${input}`);
  }
});

rl.on('SIGINT', () => {
  console.log('Завершение работы программы.');
  rl.close();
});

// Очистка ресурсов при закрытии потока записи
stream.on('close', () => {
  console.log('Поток записи закрыт.');
});
