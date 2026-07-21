const fs = require('fs');

async function run() {
  let html = '<html><head><meta charset="utf-8"></head><body style="background:#fff; color:#000; font-family:sans-serif;"><h1>Image Review</h1><div style="display:flex; flex-direction:column; gap: 40px;">';
  for(let page=1; page<=3; page++) {
    const res = await fetch('https://khadlaj-perfumes.com/collections/la-fede-eau-de-parfume/products.json?page=' + page);
    const json = await res.json();
    for(let p of json.products) {
      let title = p.title.replace(/"/g, '&quot;');
      html += '<div><h2 style="margin-bottom:10px;">' + title + '</h2><div style="display:flex; gap: 20px; overflow-x:auto;">';
      p.images.forEach((img, i) => {
        html += '<div style="text-align:center; min-width: 150px;"><img src="' + img.src + '" width="150" height="150" style="object-fit:contain; border: 1px solid #ccc;"/><br/><strong>Index: ' + i + '</strong></div>';
      });
      html += '</div></div><hr/>';
    }
  }
  html += '</div></body></html>';
  fs.writeFileSync('review_images.html', html, 'utf8');
  console.log('Saved review_images.html');
}
run();
