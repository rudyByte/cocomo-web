import os
from PIL import Image

brain_dir = r"C:\Users\ASUS\AppData\Local\Temp" # Wait, the appDataDir from metadata is C:\Users\ASUS\.gemini\antigravity
# Let's check the path: C:\Users\ASUS\.gemini\antigravity\brain\6bd0e15a-e241-4372-ad56-f50f21e08fae
path = r"C:\Users\ASUS\.gemini\antigravity\brain\6bd0e15a-e241-4372-ad56-f50f21e08fae"

for f in ["media__1784802882348.png", "media__1784802856235.png", "media__1784801544926.png"]:
    full_path = os.path.join(path, f)
    if os.path.exists(full_path):
        img = Image.open(full_path)
        print(f"{f}: size={img.size}, mode={img.mode}")
    else:
        print(f"{f} does not exist")
