import re

with open("khadlaj-perfumes (1).jsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update App state and definition
old_app_def = "export default function App(){\n  const [page, setPage] = useState(\"home\");"
new_app_def = """export default function App(){
  const [activeCountry, setActiveCountry] = React.useState(COUNTRIES[0]);
  const formatPrice = (price) => `${activeCountry.currency} ${(price * activeCountry.rate).toFixed(2)}`;
  const [page, setPage] = useState("home");"""

content = content.replace(old_app_def, new_app_def)

# 2. Update App return with Provider
old_app_return = """  return (
    <div style={{fontFamily:"'Montserrat',sans-serif",background:"#fff",color:"#000",minHeight:"100vh",overflowX:"hidden"}}>"""

new_app_return = """  return (
    <CountryContext.Provider value={{ activeCountry, setActiveCountry }}>
    <div style={{fontFamily:"'Montserrat',sans-serif",background:"#fff",color:"#000",minHeight:"100vh",overflowX:"hidden"}}>"""

content = content.replace(old_app_return, new_app_return)

# 3. Add context definition to ProductCard
old_pc = """function ProductCard({ p, onView }){
  const [hov, setHov] = useState(false);"""
new_pc = """function ProductCard({ p, onView }){
  const [hov, setHov] = useState(false);
  const { activeCountry } = React.useContext(CountryContext);
  const formatPrice = (price) => `${activeCountry.currency} ${(price * activeCountry.rate).toFixed(2)}`;"""

content = content.replace(old_pc, new_pc)

# 4. Add context to TikTokCard and replace price
old_tt = """function TikTokCard({ t }) {
  const [hov, setHov] = useState(false);"""
new_tt = """function TikTokCard({ t }) {
  const [hov, setHov] = useState(false);
  const { activeCountry } = React.useContext(CountryContext);
  const formatPrice = (price) => `${activeCountry.currency} ${(price * activeCountry.rate).toFixed(2)}`;"""

content = content.replace(old_tt, new_tt)
content = content.replace("AED {t.price?.toFixed(2)}", "{formatPrice(t.price)}")

# 5. Add context to CollectionsPage and replace price text
old_col = """function CollectionsPage({ addToCart, setViewProduct, setPage }){"""
new_col = """function CollectionsPage({ addToCart, setViewProduct, setPage }){
  const { activeCountry } = React.useContext(CountryContext);
  const formatPrice = (price) => `${activeCountry.currency} ${(price * activeCountry.rate).toFixed(2)}`;"""

content = content.replace(old_col, new_col)
content = content.replace("Max AED {priceMax}", "Max {formatPrice(priceMax)}")

# 6. Add context to ProductPage and replace price
old_pp = """function ProductPage({ product, addToCart, setPage, setViewProduct }){"""
new_pp = """function ProductPage({ product, addToCart, setPage, setViewProduct }){
  const { activeCountry } = React.useContext(CountryContext);
  const formatPrice = (price) => `${activeCountry.currency} ${(price * activeCountry.rate).toFixed(2)}`;"""

content = content.replace(old_pp, new_pp)
content = content.replace("AED {product.price.toFixed(2)}", "{formatPrice(product.price)}")

with open("khadlaj-perfumes (1).jsx", "w", encoding="utf-8") as f:
    f.write(content)
print("Updated successfully")
