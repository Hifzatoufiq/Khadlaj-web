import os
import sys
import json
import urllib.request
import urllib.error

def upload_theme(store_domain, access_token, zip_url="https://github.com/Hifzatoufiq/Khadlaj-web/raw/main/khadlaj-theme.zip", theme_name="Khadlaj Luxury Theme - Live"):
    if not store_domain.endswith(".myshopify.com"):
        store_domain = f"{store_domain}.myshopify.com"
    
    url = f"https://{store_domain}/admin/api/2024-01/themes.json"
    
    headers = {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": access_token.strip(),
        "User-Agent": "Shopify-Theme-Uploader"
    }
    
    payload = {
        "theme": {
            "name": theme_name,
            "src": zip_url,
            "role": "main"  # Automatically publish theme
        }
    }
    
    req = urllib.request.Request(url, data=json.dumps(payload).encode('utf-8'), headers=headers, method="POST")
    
    try:
        print(f"Uploading theme to {store_domain}...")
        with urllib.request.urlopen(req) as response:
            res_data = json.loads(response.read().decode('utf-8'))
            theme_id = res_data.get("theme", {}).get("id")
            print(f"SUCCESS! Theme uploaded and set as LIVE (Theme ID: {theme_id})")
            return res_data
    except urllib.error.HTTPError as e:
        error_body = e.read().decode('utf-8')
        print(f"HTTP Error {e.code}: {e.reason}")
        print(f"Details: {error_body}")
        return None
    except Exception as e:
        print(f"Error: {e}")
        return None

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python upload_to_shopify.py store_domain access_token")
        sys.exit(1)
    
    store = sys.argv[1]
    token = sys.argv[2]
    upload_theme(store, token)
