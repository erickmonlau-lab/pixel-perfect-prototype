import fs from 'fs';

// Slugs of the 50 tools extracted from registry.ts
const toolSlugs = [
  "comprimir-pdf",
  "unir-pdf",
  "dividir-pdf",
  "pdf-a-jpg",
  "jpg-a-pdf",
  "rotar-pdf",
  "extraer-paginas-pdf",
  "eliminar-paginas-pdf",
  "extraer-texto-pdf",
  "pdf-a-word",
  "word-a-pdf",
  "marca-de-agua",
  "numerar-paginas",
  "ocr-pdf",
  "reparar-pdf",
  "proteger-pdf",
  "desbloquear-pdf",
  "firmar-pdf",
  "pdf-a-excel",
  "comparar-pdf",
  "resumir-pdf",
  "extraer-datos",
  "pdf-a-powerpoint",
  "pdf-a-webp",
  "qr-pdf",
  "censurar-pdf",
  "recortar-pdf",
  "pdf-a-markdown",
  "pdf-a-pdfa",
  "excel-a-pdf",
  "reordenar-paginas-pdf",
  "aplanar-pdf",
  "eliminar-metadatos-pdf",
  "pdf-a-png",
  "png-a-pdf",
  "redimensionar-pdf",
  "editar-metadatos-pdf",
  "anadir-texto-pdf",
  "insertar-paginas-pdf",
  "optimizar-pdf-para-impresion",
  "webp-a-pdf",
  "markdown-a-pdf",
  "powerpoint-a-pdf",
  "svg-a-pdf",
  "extraer-imagenes-pdf",
  "dividir-pdf-por-tamano",
  "eliminar-paginas-en-blanco",
  "imagen-a-webp",
  "sanear-pdf",
  "rellenar-formulario-pdf"
];

// Read tool-slugs.ts to get CA and EN slugs
const toolSlugsCode = fs.readFileSync('src/lib/tools/tool-slugs.ts', 'utf8');

// Parse CA and EN mappings
function parseSlugs(block) {
  const map = {};
  const regex = /"([a-z0-9-]+)":\s*"([a-z0-9-]+)"/g;
  let match;
  while ((match = regex.exec(block)) !== null) {
    map[match[1]] = match[2];
  }
  return map;
}

const caBlock = toolSlugsCode.slice(toolSlugsCode.indexOf('"ca": {'), toolSlugsCode.indexOf('"en": {'));
const enBlock = toolSlugsCode.slice(toolSlugsCode.indexOf('"en": {'));

const caSlugs = parseSlugs(caBlock);
const enSlugs = parseSlugs(enBlock);

const inventory = toolSlugs.map(slug => {
  const caSlug = caSlugs[slug] || slug;
  const enSlug = enSlugs[slug] || slug;
  return {
    canonicalSlug: slug,
    routes: {
      es: `/es/herramientas/${slug}`,
      ca: `/ca/eines/${caSlug}`,
      en: `/en/tools/${enSlug}`
    }
  };
});

console.log('Total tools in inventory:', inventory.length);
fs.writeFileSync('tools-inventory.json', JSON.stringify(inventory, null, 2));
console.log('Saved tools-inventory.json');
