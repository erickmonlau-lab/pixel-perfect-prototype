import fs from 'fs';

const code = fs.readFileSync('src/lib/tools/registry.ts', 'utf8');

// Parse each tool definition block
const toolBlocks = code.split(/\{\s*slug:\s*"/g).slice(1);

const toolArchitecture = [];

for (const block of toolBlocks) {
  const slug = block.slice(0, block.indexOf('"'));
  const categoryMatch = block.match(/category:\s*"([^"]+)"/);
  const acceptMatch = block.match(/accept:\s*"([^"]+)"/);
  const multipleMatch = block.match(/multiple:\s*(true|false)/);
  const minFilesMatch = block.match(/minFiles:\s*([0-9]+)/);
  const autoProcessMatch = block.match(/autoProcess:\s*(true|false)/);
  const runMatch = block.match(/run:\s*([a-zA-Z0-9_]+)/);

  toolArchitecture.push({
    slug,
    category: categoryMatch ? categoryMatch[1] : '',
    accept: acceptMatch ? acceptMatch[1] : '',
    multiple: multipleMatch ? multipleMatch[1] === 'true' : false,
    minFiles: minFilesMatch ? parseInt(minFilesMatch[1]) : 1,
    autoProcess: autoProcessMatch ? autoProcessMatch[1] === 'true' : false,
    runnerName: runMatch ? runMatch[1] : null,
    specialWorkspace:
      slug === 'comparar-pdf' ? 'CompareWorkspace' :
      slug === 'rellenar-formulario-pdf' ? 'FormFillWorkspace' :
      ['unir-pdf', 'dividir-pdf', 'rotar-pdf', 'reordenar-paginas-pdf', 'extraer-paginas-pdf', 'eliminar-paginas-pdf', 'marca-de-agua', 'numerar-paginas', 'firmar-pdf', 'anadir-texto-pdf'].includes(slug) ? 'PageGrid/PageWorkspace' :
      'ToolWorkspace'
  });
}

console.log('Analyzed tool blocks:', toolArchitecture.length);
fs.writeFileSync('tool-architecture-summary.json', JSON.stringify(toolArchitecture, null, 2));
console.log('Saved tool-architecture-summary.json');
