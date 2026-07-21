import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update App state
app_state = """export default function App(){
  const [page, setPage] = useState("home");
  const [collectionCategory, setCollectionCategory] = useState("Khadlaj");"""
code = code.replace('export default function App(){\n  const [page, setPage] = useState("home");', app_state)

# 2. Update CollectionsPage signature and state
col_page_old = """function CollectionsPage({ addToCart, setViewProduct, setPage }){
  const { activeCountry } = React.useContext(CountryContext);
  const formatPrice = (price) => `${activeCountry.currency} ${(price * activeCountry.rate).toFixed(2)}`;
  const [activeCat, setActiveCat] = useState("Khadlaj");"""
  
col_page_new = """function CollectionsPage({ addToCart, setViewProduct, setPage, collectionCategory }){
  const { activeCountry } = React.useContext(CountryContext);
  const formatPrice = (price) => `${activeCountry.currency} ${(price * activeCountry.rate).toFixed(2)}`;
  const [activeCat, setActiveCat] = useState(collectionCategory || "Khadlaj");
  React.useEffect(() => {
    if(collectionCategory) setActiveCat(collectionCategory);
  }, [collectionCategory]);"""
code = code.replace(col_page_old, col_page_new)

# 3. Pass collectionCategory to CollectionsPage
pass_props = '<CollectionsPage addToCart={addToCart} setViewProduct={setViewProduct} setPage={setPage} collectionCategory={collectionCategory}/>'
code = code.replace('<CollectionsPage addToCart={addToCart} setViewProduct={setViewProduct} setPage={setPage}/>', pass_props)

# 4. Update Navbar click handler
nav_old = """                  onClick={()=>{
                    setPage(pg);
                    setMenuOpen(false);
                    window.scrollTo(0,0);
                  }}"""
nav_new = """                  onClick={()=>{
                    if(label === "Best Sellers" || label === "Perfume Spray" || label === "Perfume Oil" || label === "Master Perfumery") {
                      setCollectionCategory(label === "Perfume Spray" ? "EAU DE PARFUM" : label === "Perfume Oil" ? "Atyaab" : label);
                    } else if (pg === "collections") {
                      setCollectionCategory("Khadlaj");
                    }
                    setPage(pg);
                    setMenuOpen(false);
                    window.scrollTo(0,0);
                  }}"""
code = code.replace(nav_old, nav_new)

# Update Mobile Navbar as well
mob_nav_old = """                <a key={label} href={`#${pg}`}
                  onClick={(e)=>{
                    e.preventDefault();
                    setPage(pg);
                    setMenuOpen(false);
                    window.scrollTo(0,0);
                  }}"""
mob_nav_new = """                <a key={label} href={`#${pg}`}
                  onClick={(e)=>{
                    e.preventDefault();
                    if(label === "Best Sellers" || label === "Perfume Spray" || label === "Perfume Oil" || label === "Master Perfumery") {
                      setCollectionCategory(label === "Perfume Spray" ? "EAU DE PARFUM" : label === "Perfume Oil" ? "Atyaab" : label);
                    } else if (pg === "collections") {
                      setCollectionCategory("Khadlaj");
                    }
                    setPage(pg);
                    setMenuOpen(false);
                    window.scrollTo(0,0);
                  }}"""
code = code.replace(mob_nav_old, mob_nav_new)


# 5. Change Contact form background to PURPLE
contact_bg_old = 'background:"linear-gradient(135deg,#090909 0%,#14110B 58%,#060606 100%)"'
contact_bg_new = 'background:"linear-gradient(135deg,#251737 0%,#1A0F2E 100%)"'
code = code.replace(contact_bg_old, contact_bg_new)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Applied Navbar routing fixes and Purple background to contact form.")
