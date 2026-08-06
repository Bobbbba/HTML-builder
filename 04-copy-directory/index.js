const fs = require('fs').promises;
const path = require('path');

async function copyDir() {
  const sourceDir = path.join(__dirname, 'files');
  const destDir = path.join(__dirname, 'files-copy');

  try {
    await fs.access(sourceDir);

    try {
      await fs.access(destDir);
      await removeDirectoryRecursive(destDir);
    } catch (err) {}

    await fs.mkdir(destDir, { recursive: true });

    await copyDirectoryRecursive(sourceDir, destDir);

    console.log('Папка успешно создана!');
  } catch (error) {
    console.error('Ошибка при копировании папки:', error.message);
    throw error;
  }
}

async function removeDirectoryRecursive(dirPath) {
    try {
        const items = await fs.readdir(dirPath, { withFileTypes: true });

        for (const item of items) {
            const itemPath = path.join(dirPath, item.name);

            if (item.isDirectory()) {

                await removeDirectoryRecursive(itemPath);
            } else {
                await fs.unlink(itemPath);
            }
        }
        await fs.rmdir(dirPath);
    } catch (error) {
        console.log(`Ошибка при удалении ${dirPath}:`, error.message);
        throw error;
    }
}

async function copyDirectoryRecursive(source, dest) {
    try {
        await fs.mkdir(dest, { recursive: true });

        const items = await fs.readdir(source, { withFileTypes: true });

        for (const item of items) {
            const sourcePath = path.join(source, item.name);
            const destPath = path.join(dest, item.name);

            if (item.isDirectory()) {
                await copyDirectoryRecursive(sourcePath, destPath);
            } else {
                await fs.copyFile(sourcePath, destPath);
            }
        }
    } catch (error) {
        console.error(`Ошибка при копировании ${source} в ${dest}`, error.massage);
        throw error;
    }
}

copyDir().catch(console.error)




