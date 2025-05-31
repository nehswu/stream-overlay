## 📄 `README.md`

# Modular Overlay System for Firebot / OBS

A lightweight, modular overlay system designed for streaming platforms like **OBS**, **Streamlabs**, and tools like **Firebot**.

Supports:
- WebSocket-triggered overlays (`mic`, `runners`, `cucco`)
- Dynamic character selection
- Speed control for runners
- Auto-stop for cucco raid
- Works headlessly on Raspberry Pi
- Fully modular — easy to extend with new overlays

---

## 📁 Folder Structure

```log
stream-overlay/
├── index.html                  # Main overlay container page
├── test-panel.html             # Dev UI for testing triggers
├── server.js                   # WebSocket + HTTP trigger server
├── package.json                # Node.js dependencies and scripts
├── config.example.json         # Example config file (public)
├── .gitignore                  # Hides private config from Git
├── overlays/
│   ├── mic-mute.html           # Static mic mute indicator
│   ├── runners.html            # Animated character runner with speed
│   └── cucco.html              # Cucco raid animation with auto-stop
└── assets/
    ├── mic-mute.png
    └── runners/
        ├── r2d2.gif
        └── murloc.gif
    └── cucco/
        ├── cucco1.gif
        ├── cucco2.gif
        ├── cucco1.wav
        └── cucco2.wav
```

---

## 🛠️ Installation & Setup

### 1. Clone the repo
```bash
git clone https://github.com/yourname/stream-overlay.git
cd stream-overlay
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the server
```bash
npm start
```

Your overlays will be available at:
```log
http://localhost:3000/index.html
http://localhost:3000/test-panel.html
```

---

## 🔐 Configuration

To customize overlay paths (e.g., host them remotely), create your own:
```bash
cp config.example.json config.json
```

Create `config.json` with your custom iframe URLs:

```json
{
    "mic": "overlays/mic-mute.html",
    "runners": "overlays/runners.html",
    "cucco": "overlays/cucco.html"
}
```

> ⚠️ Add `config.json` to `.gitignore` if you're publishing this publicly

---

## 🎮 Trigger Overlays

You can trigger overlays using:
- ✅ Test Panel (in browser)
- ✅ Firebot’s **Send HTTP Request** action
- ✅ Any tool that can send POST requests

### Sample JSON Payload

```json
{
    "show": ["mic", "runners", "cucco"],
    "data": {
        "runners": {
        "char": "murloc",
        "charVelocity": 6
        }
    }
}
```


### Send via cURL
```bash
curl -X POST http://localhost:3000/trigger \
-H "Content-Type: application/json" \
-d '{
    "show": ["mic", "runners"],
    "data": {
        "runners": {
        "char": "r2d2",
        "charVelocity": 4
        }
    }
    }'
```


---

## 🧪 Test Panel Usage

Open in browser:
```log
http://localhost:3000/test-panel.html
```

Use checkboxes and dropdowns to:
- Toggle overlays
- Select character
- Set speed
- Enable/disable auto-send

Click **"Send Trigger"** to broadcast overlay updates.

---

## 🐍 Run on Raspberry Pi

This system runs great on a headless Pi — perfect for low-power overlay hosting.

### Steps:

1. Copy all files to your Pi
2. Install Node.js:
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. Start server:
```bash
npm install
npm start
```

4. Access overlays from OBS:


#### Browser Source URL: 

    http://<pi-ip>:3000/index.html


---

## 🔌 Open Required Port on Pi for LAN Access

```bash
    sudo ufw allow from 192.168.0.0/24 to any port 3000
    sudo ufw enable
```

---

## 📦 Customize Your Own Overlays

Want to add a new overlay?
1. Create new HTML file in `/overlays/`
2. Add its path to `config.json`
3. Listen for `postMessage()` inside your overlay:

```js
window.addEventListener('message', function(event) {
  const msg = event.data;
  if (msg.overlay === 'my-overlay' && msg.show) {
    document.body.style.display = 'block';
  } else {
    document.body.style.display = 'none';
  }
});
```

---

## 📝 Notes

- All overlays are preloaded as iframes → instant response after first load
- Uses `postMessage()` for fast, local communication
- No iframe reload needed – messages handled dynamically
- Safe for deployment – uses relative paths by default
- Easily expandable – just add more overlays to config

---

## 🧩 Want to Contribute?

Feel free to fork this repo and submit PRs for:
- New overlay types
- More characters
- Mobile control panel
- Sound volume sliders
- Integration with StreamElements or StreamLabs

---

## 🙌 Thanks!

Built with ❤️ for streamers who want full control over their overlays.


---