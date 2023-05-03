const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }
  // проходимся по каждому файлу в папке
  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    // получаем информацию о файле
    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.error(err);
        return;
      }
      // проверяем, является ли объект файлом
      if (stats.isFile()) {
        const fileSizeInBytes = stats.size;
        const fileSizeInKb = fileSizeInBytes / 1024;
        console.log(`${file}-${path.extname(file).substr(1)}-${fileSizeInKb.toFixed(3)}kb`);
      }
    });
  });
});
