import fs from 'fs';

function fixFile(filePath, regex, replacement) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  if (regex.test(content)) {
    content = content.replace(regex, replacement);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed', filePath);
  }
}

const fixes = [
  {
    files: ['src/components/LouisianaStory.tsx', 'Websites/new-insight-main/src/components/LouisianaStory.tsx'],
    regex: /\{ loc: typeof locations\[0\]; index: number; onSelect: \(\) => void \}/g,
    replacement: '{ loc: typeof locations[0]; index: number; onSelect: () => void; key?: string | number }'
  },
  {
    files: ['src/components/Testimonials.tsx', 'Websites/new-insight-main/src/components/Testimonials.tsx'],
    regex: /\{ review: typeof reviews\[0\] \}/g,
    replacement: '{ review: typeof reviews[0]; key?: string | number }'
  },
  {
    files: ['src/components/Testimonials.tsx', 'Websites/new-insight-main/src/components/Testimonials.tsx'],
    regex: /\{ review: \{ id: number; author: string; entity: string; text: string; stars: number \} \}/g,
    replacement: '{ review: { id: number; author: string; entity: string; text: string; stars: number }; key?: string | number }'
  },
  {
    files: ['src/pages/FAQ.tsx', 'Websites/new-insight-main/src/pages/FAQ.tsx'],
    regex: /\{ faq: typeof faqs\[0\]; index: number \}/g,
    replacement: '{ faq: typeof faqs[0]; index: number; key?: string | number }'
  },
  {
    files: ['src/pages/FAQ.tsx', 'Websites/new-insight-main/src/pages/FAQ.tsx'],
    regex: /\{ faq: \{ q: string; a: string; \}; index: number \}/g,
    replacement: '{ faq: { q: string; a: string; }; index: number; key?: string | number }'
  }
];

fixes.forEach(fix => {
  fix.files.forEach(file => fixFile(file, fix.regex, fix.replacement));
});

