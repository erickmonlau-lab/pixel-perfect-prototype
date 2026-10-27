import fs from 'node:fs';

const file = 'src/styles.css';
let content = fs.readFileSync(file, 'utf8');

const additionalKeyframes = `
/* ==========================================================================
   NEO-BRUTALIST VIBRANT ANIMATIONS: FLOAT & WIGGLE
   ========================================================================== */

@keyframes neoFloatSlow {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-8px) rotate(1.5deg);
  }
}

@keyframes neoFloatReverse {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(7px) rotate(-1.5deg);
  }
}

@keyframes neoWiggle {
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-6deg) scale(1.05);
  }
  75% {
    transform: rotate(6deg) scale(1.05);
  }
}

.animate-neo-float-slow {
  animation: neoFloatSlow 6s ease-in-out infinite;
  will-change: transform;
}

.animate-neo-float-reverse {
  animation: neoFloatReverse 7s ease-in-out infinite;
  will-change: transform;
}

.animate-neo-wiggle {
  animation: neoWiggle 2.5s ease-in-out infinite;
  transform-origin: bottom center;
  will-change: transform;
}

/* Subtle dot grid pattern for Neo-Brutalist sections */
.bg-neo-dots {
  background-image: radial-gradient(#0F0F12 1px, transparent 1px);
  background-size: 20px 20px;
}
`;

content += additionalKeyframes;
fs.writeFileSync(file, content, 'utf8');
console.log('Successfully appended neo animations to styles.css');
