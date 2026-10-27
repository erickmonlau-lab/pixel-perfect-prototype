import fs from 'fs';
import https from 'https';

const FONTS = [
  {
    name: 'plus-jakarta-sans-latin-700.woff2',
    url: 'https://fonts.gstatic.com/s/plusjakartasans/v12/LDIoaomQNQcsA88c7O9yZ4KMCoOg4Ko20yygg_vb.woff2'
  },
  {
    name: 'plus-jakarta-sans-latin-800.woff2',
    url: 'https://fonts.gstatic.com/s/plusjakartasans/v12/LDIoaomQNQcsA88c7O9yZ4KMCoOg4Ko20yygg_vb.woff2'
  },
  {
    name: 'inter-latin-500.woff2',
    url: 'https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7W0Q5nw.woff2'
  },
  {
    name: 'inter-latin-600.woff2',
    url: 'https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7W0Q5nw.woff2'
  }
];

async function download(item: { name: string; url: string }) {
  const dest = `public/fonts/${item.name}`;
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(item.url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          console.log(`Downloaded ${item.name} (${fs.statSync(dest).size} bytes)`);
          resolve(true);
        });
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  for (const font of FONTS) {
    await download(font);
  }
  console.log('All fonts downloaded successfully.');
}

run();
