import fs from 'fs';

function fixFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  const replaceTarget = `interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {`;
  const replaceWith = `import { HTMLMotionProps } from 'motion/react';\ninterface MagneticButtonProps extends HTMLMotionProps<"button"> {`;

  if (content.includes(replaceTarget)) {
    content = content.replace(replaceTarget, replaceWith);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed', filePath);
  }
}

fixFile('src/components/MagneticButton.tsx');
fixFile('Websites/new-insight-main/src/components/MagneticButton.tsx');
