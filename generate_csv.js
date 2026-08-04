const fs = require('fs');

// Read the bundle file
const bundleCode = fs.readFileSync('bundle-v207.js', 'utf8');

// The bundle is minified/compiled, so extracting the array perfectly is tricky.
// We can use a regex to find objects that look like products.
// Or we can just use the source khadlaj-perfumes (1).jsx!
const sourceCode = fs.readFileSync('khadlaj-perfumes (1).jsx', 'utf8');

// Find the PRODUCTS array
const productsMatch = sourceCode.match(/const products\s*=\s*(\[[\s\S]*?\]);\s*const collectionsData/);
let products = [];
if (productsMatch) {
    try {
        // Evaluate it in a safe context
        const code = `
            const React = { createElement: () => null };
            const window = {};
            ${productsMatch[1]}
        `;
        products = eval(code);
    } catch (e) {
        console.error("Eval failed:", e);
    }
}

if (!products || products.length === 0) {
    console.log("Failed to extract products.");
    process.exit(1);
}

const csvRows = [];
// CSV Header
csvRows.push([
    'Handle', 'Title', 'Body (HTML)', 'Vendor', 'Type', 'Tags', 'Published',
    'Option1 Name', 'Option1 Value', 'Variant SKU', 'Variant Inventory Tracker',
    'Variant Inventory Qty', 'Variant Inventory Policy', 'Variant Fulfillment Service',
    'Variant Price', 'Variant Compare At Price', 'Variant Requires Shipping', 'Variant Taxable',
    'Image Src', 'Image Position', 'Status'
].join(','));

function escapeCsv(val) {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
}

function generateHandle(title) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

products.forEach(p => {
    const handle = generateHandle(p.name);
    const title = p.name;
    const body = p.desc || '';
    const vendor = 'Khadlaj Perfumes';
    const type = p.category || 'Perfume';
    const tags = p.tags ? p.tags.join(',') : '';
    const published = 'TRUE';
    const option1Name = 'Title';
    const option1Value = 'Default Title';
    const sku = p.id ? String(p.id) : '';
    const tracker = 'shopify';
    const qty = '100';
    const policy = 'deny';
    const fulfillment = 'manual';
    const price = p.price ? String(p.price) : '150';
    const comparePrice = p.oldPrice ? String(p.oldPrice) : '';
    const reqShipping = 'TRUE';
    const taxable = 'TRUE';
    
    // Fix image URL to be absolute
    let imgSrc = p.img || '';
    if (imgSrc.startsWith('/assets/')) {
        imgSrc = 'https://hifzatoufiq.github.io/Khadlaj-web' + imgSrc;
    }
    
    const status = 'active';

    csvRows.push([
        handle, title, body, vendor, type, tags, published,
        option1Name, option1Value, sku, tracker, qty, policy, fulfillment,
        price, comparePrice, reqShipping, taxable,
        imgSrc, '1', status
    ].map(escapeCsv).join(','));
});

fs.writeFileSync('shopify_products_import.csv', csvRows.join('\n'));
console.log(`Successfully wrote ${products.length} products to shopify_products_import.csv`);
