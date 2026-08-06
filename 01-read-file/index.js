const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');

const readStream = fs.createReadStream(filePath, {
    encoding: 'utf8'
});

readStream.pipe(process.stdout);



readStream.on('error', (err) => {
    if (err.code === 'ENOENT') {

     console.error(`Ошибка: файл "text.txt" не найден в ${__dirname}`);
    } else {
        console.error('Ошибка чтения:', err.message);
    }
    process.exit(1);
});
