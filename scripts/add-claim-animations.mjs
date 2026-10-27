import fs from 'fs';

const filePath = 'src/styles.css';
let css = fs.readFileSync(filePath, 'utf8');

const heroAnimations = `

/* ============================================================
   BREADPDF HERO EDITORIAL CLAIM ANIMATIONS (Entry with Stagger)
   Respects prefers-reduced-motion
   ============================================================ */
@keyframes claimEntry1 {
  0% {
    opacity: 0;
    transform: translateY(12px) rotate(-6deg) scale(0.92);
  }
  100% {
    opacity: 1;
    transform: translateY(0) rotate(-3deg) scale(1);
  }
}

@keyframes claimEntry2 {
  0% {
    opacity: 0;
    transform: translateY(12px) rotate(6deg) scale(0.92);
  }
  100% {
    opacity: 1;
    transform: translateY(0) rotate(2deg) scale(1);
  }
}

@keyframes claimEntry3 {
  0% {
    opacity: 0;
    transform: translateY(8px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes claimArrowDraw {
  0% {
    opacity: 0;
    stroke-dashoffset: 60;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    stroke-dashoffset: 0;
    transform: scale(1);
  }
}

.animate-claim-1 {
  animation: claimEntry1 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
}

.animate-claim-2 {
  animation: claimEntry2 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both;
}

.animate-claim-3 {
  animation: claimEntry3 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both;
}

.animate-claim-arrow {
  stroke-dasharray: 60;
  animation: claimArrowDraw 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.55s both;
}

@media (prefers-reduced-motion: reduce) {
  .animate-claim-1,
  .animate-claim-2,
  .animate-claim-3,
  .animate-claim-arrow {
    animation: none !important;
    opacity: 1 !important;
    stroke-dashoffset: 0 !important;
    transform: none !important;
  }
}
`;

if (!css.includes('animate-claim-1')) {
  css += heroAnimations;
  fs.writeFileSync(filePath, css, 'utf8');
  console.log('SUCCESS: Added claim animations to src/styles.css');
} else {
  console.log('Animations already present');
}
