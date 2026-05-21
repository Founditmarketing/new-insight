import fs from 'fs';
import path from 'path';

function fixFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Fix: Cannot find namespace 'React'
  if (!content.includes("import React") && (content.includes("React.") || content.includes("key="))) {
    // If we only add import React when needed, wait, let's just add it to all TSX files if they use React.something
    if (content.match(/React\./)) {
      content = "import React from 'react';\n" + content;
      changed = true;
    }
  }
  
  // Actually, we should just explicitly add `key?: React.Key | string | number` to the component props 
  // or add `import React from 'react';` which usually fixes JSX IntrinsicAttributes.
  // Wait, let's just add it to all files missing it if it has TS errors.
  const filesMissingReact = [
    'src/components/CTA.tsx',
    'src/components/Hero.tsx',
    'src/components/LouisianaStory.tsx',
    'src/components/PremiumEstimator.tsx',
    'src/pages/Careers.tsx',
    'src/pages/Contact.tsx',
    'Websites/new-insight-main/src/components/CTA.tsx',
    'Websites/new-insight-main/src/components/Hero.tsx',
    'Websites/new-insight-main/src/components/LouisianaStory.tsx',
    'Websites/new-insight-main/src/components/PremiumEstimator.tsx',
    'Websites/new-insight-main/src/pages/Careers.tsx',
    'Websites/new-insight-main/src/pages/Contact.tsx'
  ];

  if (filesMissingReact.includes(filePath) && !content.includes("import React")) {
    content = "import React from 'react';\n" + content;
    changed = true;
  }

  // CarrierShowcase fix
  if (filePath.includes('CarrierShowcase.tsx')) {
    if (content.includes('const carriers = [')) {
      content = content.replace(
        'const carriers = [',
        'type Carrier = { name: string; style?: string; color?: string; hasIcon?: boolean; badge?: boolean; };\nconst carriers: Carrier[] = ['
      );
      changed = true;
    }
  }

  // Fix key issues by adding `import React from 'react';` to FAQ and Testimonials too
  const keyIssueFiles = [
    'src/pages/FAQ.tsx',
    'src/components/Testimonials.tsx',
    'Websites/new-insight-main/src/pages/FAQ.tsx',
    'Websites/new-insight-main/src/components/Testimonials.tsx'
  ];
  if (keyIssueFiles.includes(filePath) && !content.includes("import React")) {
    content = "import React from 'react';\n" + content;
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed', filePath);
  }
}

const allFiles = [
  'src/components/CarrierShowcase.tsx',
  'src/components/CTA.tsx',
  'src/components/Hero.tsx',
  'src/components/LouisianaStory.tsx',
  'src/components/PremiumEstimator.tsx',
  'src/components/Testimonials.tsx',
  'src/pages/Careers.tsx',
  'src/pages/Contact.tsx',
  'src/pages/FAQ.tsx',
  'Websites/new-insight-main/src/components/CarrierShowcase.tsx',
  'Websites/new-insight-main/src/components/CTA.tsx',
  'Websites/new-insight-main/src/components/Hero.tsx',
  'Websites/new-insight-main/src/components/LouisianaStory.tsx',
  'Websites/new-insight-main/src/components/PremiumEstimator.tsx',
  'Websites/new-insight-main/src/components/Testimonials.tsx',
  'Websites/new-insight-main/src/pages/Careers.tsx',
  'Websites/new-insight-main/src/pages/Contact.tsx',
  'Websites/new-insight-main/src/pages/FAQ.tsx'
];

allFiles.forEach(fixFile);
