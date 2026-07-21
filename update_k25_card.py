import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the entire CSS block from .k25-card { up to the media queries
old_css = r'''  \.k25-card \{.*?\.k25-card:hover \.k25-card-btn::after \{ width: 100%; \}'''

new_css = '''  .k25-card { 
    width: 380px; margin: 0 20px; scroll-snap-align: center;
    background: linear-gradient(145deg, #2A1A40, #180F25); 
    border: 1px solid rgba(184,146,42,0.25);
    border-radius: 200px 200px 20px 20px;
    overflow: hidden; position: relative; 
    transition: all 0.7s cubic-bezier(0.2, 0.8, 0.2, 1); 
    display: flex; flex-direction: column; 
    align-items: center; align-self: stretch; justify-content: flex-start;
    box-shadow: inset 0 0 40px rgba(184,146,42,0.03), 0 15px 35px rgba(0,0,0,0.3);
  }
  .k25-card:hover { 
    transform: translateY(-12px) scale(1.02); 
    box-shadow: inset 0 0 60px rgba(184,146,42,0.1), 0 30px 60px rgba(0,0,0,0.5), 0 0 30px rgba(184,146,42,0.2);
    border-color: rgba(184,146,42,0.8);
  }
  
  .k25-card-img-wrapper { 
    height: 420px; width: 100%; position: relative; 
    background: radial-gradient(circle at 50% 50%, rgba(184,146,42,0.12) 0%, transparent 65%); 
    flex-shrink: 0; 
    display: flex; align-items: center; justify-content: center;
    border-radius: 200px 200px 0 0;
    overflow: visible;
  }
  
  .k25-card-img-wrapper img { 
    height: 85%; object-fit: contain; display: block; 
    filter: drop-shadow(0 20px 30px rgba(0,0,0,0.6));
    transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.8s ease;
    animation: lafedeFloat 6s ease-in-out infinite;
  }
  .k25-card:hover .k25-card-img-wrapper img { 
    transform: scale(1.12) translateY(-15px); 
    filter: drop-shadow(0 30px 45px rgba(0,0,0,0.8)) brightness(1.15); 
  }
  
  .k25-card-content { 
    padding: 10px 30px 40px; text-align: center; position: relative; z-index: 2;
    display: flex; flex-direction: column; align-items: center; justify-content: flex-start;
    width: 100%; background: transparent;
    flex-grow: 1; transition: all 0.6s ease;
  }
  
  .k25-card-title { 
    font-family: 'Playfair Display', serif; font-size: 34px; color: #fff; margin-bottom: 6px; letter-spacing: 3px;
    background: linear-gradient(to right, #ffffff, #C8A97E, #ffffff); -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-size: 200% auto; animation: shine 5s linear infinite;
  }
  .k25-card-subtitle { font-size: 10px; color: #C8A97E; letter-spacing: 5px; margin-bottom: 20px; text-transform: uppercase; font-weight: 500; }
  .k25-card-desc { font-family: 'Montserrat', sans-serif; font-size: 12px; color: rgba(255,255,255,0.65); line-height: 1.8; margin-bottom: 30px; padding: 0 10px; }
  
  /* Creative Animated Button */
  .k25-card-btn { 
    margin-top: auto; position: relative; overflow: hidden; z-index: 1;
    padding: 14px 34px; background: transparent; border: 1px solid rgba(200,169,126,0.3); 
    border-radius: 30px;
    color: #C8A97E; font-family: 'Montserrat', sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; cursor: pointer; transition: all 0.4s; 
  }
  .k25-card:hover .k25-card-btn { 
    background: #C8A97E; color: #180F25; border-color: #C8A97E; box-shadow: 0 5px 20px rgba(200,169,126,0.4);
  }
  @keyframes shine {
    to { background-position: 200% center; }
  }'''

content = re.sub(old_css, new_css, content, flags=re.DOTALL)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("k25 card styled successfully.")
