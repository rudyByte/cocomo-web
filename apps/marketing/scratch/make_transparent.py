import os
from PIL import Image

path = r"d:\e transfer\1PROJECTS\cocomoWeb\cocomo\apps\marketing\public\logo-icon.png"

if os.path.exists(path):
    img = Image.open(path).convert("RGBA")
    datas = img.getdata()
    
    newData = []
    for item in datas:
        # If pixel is very close to white, make it transparent
        # We check if R, G, B are all above 240
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            newData.append((255, 255, 255, 0)) # transparent
        else:
            newData.append(item)
            
    img.putdata(newData)
    
    # Get the bounding box of non-transparent pixels to crop tightly
    bbox = img.getbbox()
    if bbox:
        img_cropped = img.crop(bbox)
        # Resize or pad to make it a perfect square so object-fit doesn't stretch/distort
        w, h = img_cropped.size
        max_dim = max(w, h)
        square_img = Image.new("RGBA", (max_dim, max_dim), (255, 255, 255, 0))
        # Center the cropped image inside the square
        offset = ((max_dim - w) // 2, (max_dim - h) // 2)
        square_img.paste(img_cropped, offset)
        
        square_img.save(path, "PNG")
        print(f"Successfully processed logo-icon: cropped bbox={bbox}, square_dim={max_dim}")
    else:
        img.save(path, "PNG")
        print("Processed logo-icon without cropping (bbox empty)")
else:
    print("logo-icon.png not found")
