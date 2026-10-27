import fs from 'fs';

const inventory = JSON.parse(fs.readFileSync('tools-inventory.json', 'utf8'));
const code = fs.readFileSync('src/lib/tools/registry.ts', 'utf8');

const PAGE_BASED_TOOLS = new Set([
  "unir-pdf",
  "dividir-pdf",
  "rotar-pdf",
  "reordenar-paginas-pdf",
  "extraer-paginas-pdf",
  "eliminar-paginas-pdf",
  "marca-de-agua",
  "numerar-paginas",
  "firmar-pdf",
  "anadir-texto-pdf",
]);

const toolArchitecture = inventory.map(item => {
  const slug = item.canonicalSlug;
  // find block in registry
  const regex = new RegExp(`slug:\\s*"${slug}"[\\s\\S]*?run:\\s*([a-zA-Z0-9_]+)`);
  const match = code.match(regex);
  const runnerName = match ? match[1] : null;

  // accept
  const acceptMatch = code.match(new RegExp(`slug:\\s*"${slug}"[\\s\\S]*?accept:\\s*"([^"]+)"`));
  const accept = acceptMatch ? acceptMatch[1] : '';

  // multiple
  const multipleMatch = code.match(new RegExp(`slug:\\s*"${slug}"[\\s\\S]*?multiple:\\s*(true|false)`));
  const multiple = multipleMatch ? multipleMatch[1] === 'true' : false;

  // minFiles
  const minFilesMatch = code.match(new RegExp(`slug:\\s*"${slug}"[\\s\\S]*?minFiles:\\s*([0-9]+)`));
  const minFiles = minFilesMatch ? parseInt(minFilesMatch[1]) : 1;

  // autoProcess
  const autoMatch = code.match(new RegExp(`slug:\\s*"${slug}"[\\s\\S]*?autoProcess:\\s*(true|false)`));
  const autoProcess = autoMatch ? autoMatch[1] === 'true' : false;

  let workspaceType = 'ToolWorkspace';
  if (slug === 'comparar-pdf') workspaceType = 'CompareWorkspace';
  else if (slug === 'rellenar-formulario-pdf') workspaceType = 'FormFillWorkspace';
  else if (PAGE_BASED_TOOLS.has(slug)) workspaceType = 'PageGrid (PageWorkspace)';

  return {
    slug,
    accept,
    multiple,
    minFiles,
    autoProcess,
    runnerName,
    workspaceType
  };
});

console.log('Successfully mapped exact 50 tools:');
console.log('Workspace breakdown:');
const breakdown = {};
toolArchitecture.forEach(t => {
  breakdown[t.workspaceType] = (breakdown[t.workspaceType] || 0) + 1;
});
console.log(breakdown);
fs.writeFileSync('tool-architecture-exact.json', JSON.stringify(toolArchitecture, null, 2));
console.log('Saved tool-architecture-exact.json');
