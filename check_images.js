fetch('https://khadlaj-perfumes.com/collections/la-fede-eau-de-parfume/products.json?page=1')
  .then(res => res.json())
  .then(json => {
    json.products.slice(0, 5).forEach(p => {
      console.log('Product:', p.title);
      p.images.forEach((img, i) => console.log('  Img ' + i + ': ' + img.src));
    });
  });
