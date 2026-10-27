import fs from 'node:fs';

const file = 'src/styles.css';
let content = fs.readFileSync(file, 'utf8');

const rootRegex = /:root\s*\{[\s\S]*?--sidebar-ring:\s*oklch\([^)]+\);\s*\}/;
const newRoot = `:root {
  --radius: 0.875rem;

  --brand-red: #EC3C2D;
  --brand-black: #0F0F12;
  --brand-bg: #EDEDF0;
  --brand-coral: #FFF5F2;
  --favorite-amber: #F59E0B;
  --favorite-foreground: #FFFFFF;
  --border-neutral: #0F0F12;

  --motion-instant: 80ms;
  --motion-fast: 120ms;
  --motion-short: 160ms;
  --motion-normal: 200ms;
  --motion-medium: 280ms;
  --motion-slow: 360ms;
  --motion-emphasis: 450ms;

  --background: #EDEDF0;
  --foreground: #0F0F12;
  --surface: #FFFFFF;
  --card: #FFFFFF;
  --card-foreground: #0F0F12;
  --popover: #FFFFFF;
  --popover-foreground: #0F0F12;
  --primary: #EC3C2D;
  --primary-foreground: #FFFFFF;
  --primary-dark: #D43426;
  --primary-soft: #FEECEB;
  --navy: #0F0F12;
  --navy-foreground: #FFFFFF;
  --fam-optimizar: #0F0F12;
  --fam-optimizar-soft: #EDEDF0;
  --fam-organizar: #0F0F12;
  --fam-organizar-soft: #EDEDF0;
  --fam-convertir: #0F0F12;
  --fam-convertir-soft: #EDEDF0;
  --fam-editar: #0F0F12;
  --fam-editar-soft: #EDEDF0;
  --fam-seguridad: #0F0F12;
  --fam-seguridad-soft: #EDEDF0;
  --fam-inteligencia: #0F0F12;
  --fam-inteligencia-soft: #EDEDF0;
  --secondary: #EDEDF0;
  --secondary-foreground: #0F0F12;
  --muted: #EDEDF0;
  --muted-foreground: #475569;
  --accent: #EDEDF0;
  --accent-foreground: #0F0F12;
  --destructive: #EC3C2D;
  --destructive-foreground: #FFFFFF;
  --destructive-soft: #FEECEB;
  --success: #0F0F12;
  --success-soft: #EDEDF0;
  --warning: #F59E0B;
  --warning-soft: #FEF3C7;
  --border: #0F0F12;
  --input: #0F0F12;
  --ring: #EC3C2D;
  --sidebar: #FFFFFF;
  --sidebar-foreground: #0F0F12;
  --sidebar-primary: #EC3C2D;
  --sidebar-primary-foreground: #FFFFFF;
  --sidebar-accent: #EDEDF0;
  --sidebar-accent-foreground: #0F0F12;
  --sidebar-border: #0F0F12;
  --sidebar-ring: #EC3C2D;
}`;

if (!rootRegex.test(content)) {
  console.error('rootRegex did not match');
  process.exit(1);
}
content = content.replace(rootRegex, newRoot);

// Also add Neo-brutalist utility classes
const neoUtilities = `
/* ==========================================================================
   NEO-BRUTALIST DESIGN UTILITIES
   Strict Palette: Black (#0F0F12), White (#FFFFFF), Red (#EC3C2D), Gray (#EDEDF0)
   Hard 2px Black Borders & Hard Offset Shadows
   ========================================================================== */

@utility neo-card-white {
  background-color: #FFFFFF;
  color: #0F0F12;
  border: 2px solid #0F0F12;
  border-radius: 1rem;
  box-shadow: 4px 4px 0 #0F0F12;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

@utility neo-card-black {
  background-color: #0F0F12;
  color: #FFFFFF;
  border: 2px solid #0F0F12;
  border-radius: 1rem;
  box-shadow: 4px 4px 0 #0F0F12;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

@utility neo-card-red {
  background-color: #EC3C2D;
  color: #FFFFFF;
  border: 2px solid #0F0F12;
  border-radius: 1rem;
  box-shadow: 4px 4px 0 #0F0F12;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

@utility neo-btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #EC3C2D;
  color: #FFFFFF;
  font-weight: 800;
  border: 2px solid #0F0F12;
  border-radius: 0.875rem;
  box-shadow: 4px 4px 0 #0F0F12;
  transition: transform 0.12s ease, box-shadow 0.12s ease, background-color 0.12s ease;
  cursor: pointer;
  user-select: none;
  &:hover {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0 #0F0F12;
    background-color: #D43426;
  }
  &:active {
    transform: translate(4px, 4px);
    box-shadow: 0 0 0 #0F0F12;
  }
}

@utility neo-btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #FFFFFF;
  color: #0F0F12;
  font-weight: 800;
  border: 2px solid #0F0F12;
  border-radius: 0.875rem;
  box-shadow: 4px 4px 0 #0F0F12;
  transition: transform 0.12s ease, box-shadow 0.12s ease, background-color 0.12s ease;
  cursor: pointer;
  user-select: none;
  &:hover {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0 #0F0F12;
    background-color: #F4F4F6;
  }
  &:active {
    transform: translate(4px, 4px);
    box-shadow: 0 0 0 #0F0F12;
  }
}

@utility neo-btn-black {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #0F0F12;
  color: #FFFFFF;
  font-weight: 800;
  border: 2px solid #0F0F12;
  border-radius: 0.875rem;
  box-shadow: 4px 4px 0 #0F0F12;
  transition: transform 0.12s ease, box-shadow 0.12s ease, background-color 0.12s ease;
  cursor: pointer;
  user-select: none;
  &:hover {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0 #0F0F12;
    background-color: #27272A;
  }
  &:active {
    transform: translate(4px, 4px);
    box-shadow: 0 0 0 #0F0F12;
  }
}

@utility neo-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.8rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  border: 2px solid #0F0F12;
  box-shadow: 2px 2px 0 #0F0F12;
}
`;

content += neoUtilities;

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully updated styles.css with neo-brutalist variables & utilities');
