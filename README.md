# Interactive 3D Virtual Room (Three.js)

An interactive browser-based 3D environment built using Three.js and WebGL.  
This project simulates a virtual room with first-person navigation, real-time lighting, and interactive elements.

[Video Demo Link](https://drive.google.com/file/d/1iFbVepbUupYr_arYn7XwYQrDugHd1Jgi/view?usp=sharing)
---

## Features

- 🎮 First-person navigation (WASD / arrow keys)
- 🎥 Smooth camera movement with optional mouse look
- 💡 Real-time lighting and shadows
- 🪵 Textured materials (wood flooring, brick wall)
- 🖱️ Interactive objects (clickable lamp toggles lighting)
- ⚡ Lightweight setup using CDN (no build tools required)

---

## Technologies Used

- Three.js
- WebGL
- JavaScript (ES Modules)

---

## Getting Started

### 1. Clone or download the project

git clone <your-repo-url>
cd <project-folder>

---

### 2. Run a local server

Using Node:
npx serve .

OR using Python:
python3 -m http.server 8000

---

### 3. Open in browser

http://localhost:3000  
or  
http://localhost:8000  

---

## Controls

### Movement
- W / A / S / D → Move  
- Arrow keys → Move  
- Q / E → Rotate (keyboard)

### Camera
- Click screen → Enable mouse look  
- Move mouse → Look around  
- Press ESC → Exit mouse lock  

### Interaction
- Click the lamp → Toggle light on/off  

---

##  How It Works

- Uses a PerspectiveCamera to simulate first-person view  
- Movement uses direction vectors (forward/right)  
- Lighting includes ambient + point light with shadows  
- Raycasting detects object clicks  
- Textures are applied using TextureLoader  

---

## Project Structure

/project-folder
│── index.html
│── main.js

---

## Future Improvements

- Collision detection  
- Add more 3D models (GLTF)  
- UI controls  
- Multi-room navigation  
- React + Three Fiber version  

---

## Author

Made with ❤️ by Fatemeh Mashhadi  
LinkedIn: https://www.linkedin.com/in/fatemehmashhadi/
Portfolio: https://fatemeh-s-portfolio.vercel.app/

---

## License

This project is not open source and is intended for personal or educational use only. Redistribution or commercial use is not permitted without explicit permission from the author.
