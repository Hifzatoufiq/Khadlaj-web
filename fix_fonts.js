const fs = require('fs');

let content = fs.readFileSync('c:/web/khadlaj-perfumes (1).jsx', 'utf8');

// 1. Remove italic from Scent Finder
content = content.replace(/style=\{\{fontStyle:"italic"\}\}/g, 'style={{fontStyle:"normal"}}');

// 2. Add fontWeight:600 to subtitles
// Subtitles match: fontSize:8 or 9 or 10, letterSpacing:3 to 6, color:"#B8922A"
const subtitleRegex = /(<p\s+style=\{\{)([^}]*fontSize:9[^}]*color:"#B8922A"[^}]*)(\}\}>)/g;

content = content.replace(subtitleRegex, (match, p1, p2, p3) => {
    if (!p2.includes('fontWeight')) {
        return `${p1}fontWeight:600,${p2}${p3}`;
    }
    return match;
});

const subtitleRegex2 = /(<p\s+style=\{\{)([^}]*fontSize:10[^}]*color:"#3c1152"[^}]*)(\}\}>)/g;
content = content.replace(subtitleRegex2, (match, p1, p2, p3) => {
    if (!p2.includes('fontWeight')) {
        return `${p1}fontWeight:600,${p2}${p3}`;
    }
    return match;
});

const subtitleRegex3 = /(<p\s+style=\{\{)([^}]*fontSize:8[^}]*color:"#B8922A"[^}]*)(\}\}>)/g;
content = content.replace(subtitleRegex3, (match, p1, p2, p3) => {
    if (!p2.includes('fontWeight')) {
        return `${p1}fontWeight:600,${p2}${p3}`;
    }
    return match;
});

fs.writeFileSync('c:/web/khadlaj-perfumes (1).jsx', content, 'utf8');
console.log('Fonts updated successfully!');
