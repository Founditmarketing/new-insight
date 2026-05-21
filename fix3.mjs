import fs from 'fs';

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace('{ review: typeof reviewsRow1[0] }', '{ review: typeof reviewsRow1[0]; key?: string | number }');
  fs.writeFileSync(filePath, content, 'utf8');
}

fixFile('src/components/Testimonials.tsx');
fixFile('Websites/new-insight-main/src/components/Testimonials.tsx');
