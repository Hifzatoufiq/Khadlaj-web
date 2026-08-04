import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Lower the reveal threshold to 40%
old_threshold = r'''      const percent = transparentCount / \(pixels\.length / 4\);
      // Increased threshold so they have to scratch at least 60% of the card
      if \(percent > 0\.60\) \{'''

new_threshold = '''      const percent = transparentCount / (pixels.length / 4);
      if (percent > 0.40) {'''

content = re.sub(old_threshold, new_threshold, content)

# 2. Lower the timeout
old_timeout = r'''                  <ScratchCard code="KHADLAJ10" onReveal=\(\(\) => \{
                     setTimeout\(\(\) => setPopupState\("revealed"\), 800\);
                  \}\} />'''

new_timeout = '''                  <ScratchCard code="KHADLAJ10" onReveal={() => {
                     setTimeout(() => setPopupState("revealed"), 400);
                  }} />'''

content = re.sub(old_timeout, new_timeout, content)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated scratch reveal threshold and timeout successfully.")
