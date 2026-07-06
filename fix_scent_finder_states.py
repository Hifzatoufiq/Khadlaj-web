with open("khadlaj-perfumes (1).jsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("\r\n", "\n")

old_start = """function HomePage({ setPage, addToCart, setViewProduct }){
  const [activeCat, setActiveCat] = useState("Best Sellers");
  const [hov, setHov] = useState(null);"""

new_start = """function HomePage({ setPage, addToCart, setViewProduct }){
  const [activeCat, setActiveCat] = useState("Best Sellers");
  const [hov, setHov] = useState(null);
  const [quizStep, setQuizStep] = useState(1);
  const [quizMood, setQuizMood] = useState("");
  const [quizOccasion, setQuizOccasion] = useState("");
  const [quizResult, setQuizResult] = useState(null);

  const quizProducts = {
    "Rich & Exotic": {
      "Royal Evenings": PRODUCTS.find(p => p.id === 204) || PRODUCTS[0],
      "Daily Wear & Office": PRODUCTS.find(p => p.id === 20) || PRODUCTS[0],
      "Romantic Date Nights": PRODUCTS.find(p => p.id === 200) || PRODUCTS[0]
    },
    "Fresh & Energizing": {
      "Royal Evenings": PRODUCTS.find(p => p.id === 301) || PRODUCTS[0],
      "Daily Wear & Office": PRODUCTS.find(p => p.id === 13) || PRODUCTS[0],
      "Romantic Date Nights": PRODUCTS.find(p => p.id === 15) || PRODUCTS[0]
    },
    "Clean & Sophisticated": {
      "Royal Evenings": PRODUCTS.find(p => p.id === 208) || PRODUCTS[0],
      "Daily Wear & Office": PRODUCTS.find(p => p.id === 14) || PRODUCTS[0],
      "Romantic Date Nights": PRODUCTS.find(p => p.id === 303) || PRODUCTS[0]
    }
  };"""

if old_start in content:
    content = content.replace(old_start, new_start)
    print("Successfully defined Scent Finder quiz states!")
else:
    print("Could not find the target HomePage signature.")

with open("khadlaj-perfumes (1).jsx", "w", encoding="utf-8") as f:
    f.write(content)
