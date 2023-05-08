const fs = require('fs');
const path = require('path');

const stylesDir = path.join(__dirname, 'styles');
const distDir = path.join(__dirname, 'project-dist');

// Создаем папку project-dist, если она не существует
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// Получаем список файлов в папке styles
const files = fs.readdirSync(stylesDir);

// Фильтруем файлы, оставляя только файлы с расширением .css
const cssFiles = files.filter(file => path.extname(file) === '.css');

// Собираем содержимое всех файлов в единый файл bundle.css
const bundleContent = cssFiles.reduce((acc, file) => {
  const filePath = path.join(stylesDir, file);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return acc + '\n' + fileContent;
}, '');

// Записываем содержимое в файл bundle.css в папке project-dist
const bundlePath = path.join(distDir, 'bundle.css');
fs.writeFileSync(bundlePath, bundleContent, 'utf-8');

console.log('Styles have been merged into bundle.css');
