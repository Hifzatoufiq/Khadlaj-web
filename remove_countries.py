with open("khadlaj-perfumes (1).jsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("\r\n", "\n")

# Replace COUNTRIES array
old_countries = """const COUNTRIES = [
  { name:"UAE",      flagUrl:"https://flagcdn.com/w40/ae.png", currency:"AED", rate:1 },
  { name:"Saudi",    flagUrl:"https://flagcdn.com/w40/sa.png", currency:"SAR", rate:1.02 },
  { name:"Kuwait",   flagUrl:"https://flagcdn.com/w40/kw.png", currency:"KWD", rate:0.08 },
  { name:"Bahrain",  flagUrl:"https://flagcdn.com/w40/bh.png", currency:"BHD", rate:0.10 },
  { name:"India",    flagUrl:"https://flagcdn.com/w40/in.png", currency:"INR", rate:22.5 },
  { name:"Egypt",    flagUrl:"https://flagcdn.com/w40/eg.png", currency:"EGP", rate:13.2 },
  { name:"Malaysia", flagUrl:"https://flagcdn.com/w40/my.png", currency:"MYR", rate:1.25 },
  { name:"UK",       flagUrl:"https://flagcdn.com/w40/gb.png", currency:"GBP", rate:0.21 },
  { name:"USA",      flagUrl:"https://flagcdn.com/w40/us.png", currency:"USD", rate:0.27 },
  { name:"Global",   flagUrl:"global", currency:"USD", rate:0.27 },
];"""

new_countries = """const COUNTRIES = [
  { name:"UAE",      flagUrl:"https://flagcdn.com/w40/ae.png", currency:"AED", rate:1 },
  { name:"Kuwait",   flagUrl:"https://flagcdn.com/w40/kw.png", currency:"KWD", rate:0.08 },
  { name:"India",    flagUrl:"https://flagcdn.com/w40/in.png", currency:"INR", rate:22.5 },
  { name:"Egypt",    flagUrl:"https://flagcdn.com/w40/eg.png", currency:"EGP", rate:13.2 },
  { name:"Malaysia", flagUrl:"https://flagcdn.com/w40/my.png", currency:"MYR", rate:1.25 },
  { name:"UK",       flagUrl:"https://flagcdn.com/w40/gb.png", currency:"GBP", rate:0.21 },
  { name:"USA",      flagUrl:"https://flagcdn.com/w40/us.png", currency:"USD", rate:0.27 },
  { name:"Global",   flagUrl:"global", currency:"USD", rate:0.27 },
];"""

if old_countries in content:
    content = content.replace(old_countries, new_countries)
    print("Successfully removed Saudi and Bahrain!")
else:
    print("Could not find the target COUNTRIES array.")

with open("khadlaj-perfumes (1).jsx", "w", encoding="utf-8") as f:
    f.write(content)
