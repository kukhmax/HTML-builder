const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'files'),
      newDirPath = path.join(__dirname, 'files-copy');


async function copyDir() {
  const files = await fs.promises.readdir(dirPath, { withFileTypes: true });
  await fs.promises.mkdir(newDirPath, { recursive: true });

  for (const file of files) {
    const sourcePath = path.join(dirPath, file.name);
    const targetPath = path.join(newDirPath, file.name);

    if (file.isFile()) {
      await fs.promises.copyFile(sourcePath, targetPath);
    } else if (file.isDirectory()) {
      await fs.promises.mkdir(targetPath, { recursive: true });
      await copyDirRecursive(sourcePath, targetPath);
    }
  }
}

async function copyDirRecursive(source, target) {
  const files = await fs.promises.readdir(source, { withFileTypes: true });

  for (const file of files) {
    const sourcePath = path.join(source, file.name);
    const targetPath = path.join(target, file.name);

    if (file.isFile()) {
      await fs.promises.copyFile(sourcePath, targetPath);
    } else if (file.isDirectory()) {
      await fs.promises.mkdir(targetPath, { recursive: true });
      await copyDirRecursive(sourcePath, targetPath);
    }
  }
}

copyDir();

