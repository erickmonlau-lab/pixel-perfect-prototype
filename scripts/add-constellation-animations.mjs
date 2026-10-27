import fs from 'node:fs';
import path from 'node:path';

const cssPath = path.resolve('src/styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

const keyframesToAdd = `
@keyframes neoFloatA {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-9px);
  }
}

@keyframes neoFloatB {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(8px);
  }
}

@keyframes neoFloatC {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-6px);
  }
}

.animate-neo-float-a {
  animation: neoFloatA 5.5s ease-in-out infinite;
  will-change: transform;
}

.animate-neo-float-b {
  animation: neoFloatB 6.5s ease-in-out infinite;
  will-change: transform;
}

.animate-neo-float-c {
  animation: neoFloatC 7s ease-in-out infinite;
  will-change: transform;
}
`;

if (!css.includes('animate-neo-float-a')) {
  css = css.replace('.animate-neo-float-slow {', keyframesToAdd + '\n.animate-neo-float-slow {');
  fs.writeFileSync(cssPath, css, 'utf8');
  console.log('Added float keyframe variants to styles.css');
} else {
  console.log('Already present in styles.css');
}
