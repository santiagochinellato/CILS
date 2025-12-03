const fs = require('fs');
const html = fs.readFileSync('./reports/www.estudiocils.com.ar-20251203T140606.html', 'utf8');
const match = html.match(/"categories":\{[^}]+?"performance"[^}]+?"score":([0-9.]+)[^}]+?"accessibility"[^}]+?"score":([0-9.]+)[^}]+?"best-practices"[^}]+?"score":([0-9.]+)[^}]+?"seo"[^}]+?"score":([0-9.]+)/);
if (match) {
  console.log(`Performance: ${Math.round(match[1] * 100)}`);
  console.log(`Accessibility: ${Math.round(match[2] * 100)}`);
  console.log(`Best Practices: ${Math.round(match[3] * 100)}`);
  console.log(`SEO: ${Math.round(match[4] * 100)}`);
}
