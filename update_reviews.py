
import re
with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    text = f.read()

new_reviews = '''const REVIEWS = [
  { name: "Verified Buyer", country: "Dubai", stars: 5, text: "The perfumes are really good I went to Original testor stores, stores like afnan & Rasasi but this perfume brand blew my mind. The perfumes were really good and strong in the initial smelling. Good discounts & good perfumes.", url: "" },
  { name: "Verified Buyer", country: "Online", stars: 5, text: "Hareem al sultan the viral perfume oil is from khadlaj perfumes, they do have a great collection of exotic perfumes and oils. Most products comes in a very good package.", url: "" },
  { name: "Verified Buyer", country: "Dubai", stars: 5, text: "Nice perfume amezing long lasting fragrance, value of money,And very kind and supportive staff, Very nice experience with khadlaj", url: "" },
  { name: "Verified Buyer", country: "Online", stars: 5, text: "Amazing fragrances depends on mood , type , flavour and long lasting. Have purchased their all time famous klassik is much more to give to your mood while interacting with other people And done lot of repeated purchases", url: "" }
];'''

new_text = re.sub(r'const REVIEWS = \[[\s\S]*?\];', new_reviews, text)
with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(new_text)
print('Updated REVIEWS')

