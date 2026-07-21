async function fetchProducts() {
  const url = "https://khadlaj-perfumes.com/search?type=product&options%5Bunavailable_products%5D=last&options%5Bprefix%5D=none&q=la+fede*+product_type%3A*";
  try {
    const response = await fetch(url);
    const html = await response.text();
    const regex = /<a[^>]*class="[^"]*product-title[^"]*"[^>]*>([^<]+)<\/a>/gi;
    let match;
    const products = new Set();
    while ((match = regex.exec(html)) !== null) {
      products.add(match[1].trim());
    }
    // If the above fails, let's try a broader regex for any title
    const fallbackRegex = /<a[^>]*href="\/products\/[^"]*"[^>]*>([^<]+)<\/a>/gi;
    while ((match = fallbackRegex.exec(html)) !== null) {
      const txt = match[1].trim();
      if(txt && txt.length > 3 && !txt.includes("<")) {
          products.add(txt);
      }
    }
    console.log(Array.from(products));
  } catch (err) {
    console.error(err);
  }
}
fetchProducts();
