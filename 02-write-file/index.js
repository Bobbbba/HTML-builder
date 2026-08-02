const fs = require('fs');
const path = require('path');
const readline = require('readline');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const filePath = path.join(__dirname, 'output.txt');


console.log('Hello!');
console.log('Введите текст для записи в файл(для завершения вветите "exit" или нажмите Ctrl + C)');



const writeStream = fs.createWriteStream(filePath, { flags: 'a' })

const handleInput = (input) => {
    if (input.trim().toLowerCase() === "exit") {
        console.log('\n До свидания! Файл сохранен.');
        rl.close();
        writeStream.end();
        process.exit(0);
    }

    writeStream.write(input + '\n');
    console.log('Текст записан. Введите следующий текс( или "exit" для выхода):');
};

rl.on('line', handleInput);


rl.on('close', () => {
    console.log('\n До свидания! Файл сохранен.')
    writeStream.end();
});

writeStream.on('error', (err) => {
    console.log.error('Ошибка при записи в файл', err.message);
    rl.close();
    process.exit(1);
});

console.log(`Файл будет сохранен: ${filePath}`);


