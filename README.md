# WebDisplays-Video-Player

THIS IS NO MOD, DATAPACK, OR RESOURCE PACK. THIS IS A STANDALONE COMPANION TOOL NODE.JS SERVER

A FULLY synchronized HTML5 video player for Minecraft's WebDisplays mod (1.20.1 Forge) using Node.js and Socket.IO. This project allows all players to view the same video in perfect sync—including play, pause, and seek actions—across connected clients.

> 🔗 GitHub Repo: [Lakunake/WebDisplays-Video-Player](https://github.com/Lakunake/WebDisplays-Video-Player)

---

## 🚀 Requirements

* [Node.js](https://nodejs.org/) installed on your machine (v16+ recommended)
* A `.mp4` video file named `filmeva.mp4` placed in the `/videos/` folder

---

## 🎮 Features

* 📺 MP4 video streaming via HTML5 `<video>` tag
* 🔁 Real-time playback synchronization using Socket.IO
* ⎯️ Syncs `play`, `pause`, and `seek` events across all connected users
* 📡 Can be used over LAN, Hamachi, or hosted publicly (Railway etc.)
* ⚙️ Lightweight Node.js + Express server
* 🖱️ Custom video control zones (click-based)

---

## 🕹️ Controls

Click-based controls have been implemented for easy, mouse-only interaction:

| Zone                                   | Action                   | Sync Behavior |
| -------------------------------------- | ------------------------ | ------------- |
| **Left Edge (≤ 87px)**                 | ⏪ Rewind 5 seconds       | ✅ Synced      |
| **Right Edge (≥ screen width − 87px)** | ⏩ Skip forward 5 seconds | ✅ Synced      |
| **Center (±75px from center)**         | ⎯️ Toggle Play / Pause   | ✅ Synced      |
| **Between Left Edge and Center**       | 🔈 Decrease volume (5%)  | ❌ Local only  |
| **Between Center and Right Edge**      | 🔊 Increase volume (5%)  | ❌ Local only  |

> ⚠️ All users will see the same video at the same time except for **volume**, which is controlled individually per client.

---

## 🌐 Hosting Tutorials

> ⚠️ All commands are run from Command Prompt (CMD).
> Ensure [Node.js](https://nodejs.org/) is installed before proceeding.
> Place `videos/`, `server.js`, and `index.html` in the same folder, e.g. `C:\YourFolder\`.

### 🔌 Option 1: LAN or Public IP (Direct Hosting)

1. Run `server.js` by opening CMD in your folder and typing:

   ```bash
   node server.js
   ```
2. Make sure port `3000` is open in your firewall/router.
3. Get your **public IP** from [https://whatismyipaddress.com](https://whatismyipaddress.com)
4. Access the video from another device at:

   ```
   http://<your-public-ip>:3000
   ```

   Or if on LAN:

   ```
   http://<your-local-ip>:3000
   ```

---

### 🌍 Option 2: Hamachi (Virtual LAN)

1. Download and install [LogMeIn Hamachi](https://vpn.net).
2. Create a network, have others join it.
3. Share your **Hamachi IP address** (shown in Hamachi).
4. Run `server.js`, then visit:

   ```
   http://<your-hamachi-ip>:3000
   ```

---

### 🚂 Option 3: Hosting on Railway (Free Cloud Hosting)

1. Go to [Railway.app](https://railway.app).
2. Create a new project → Deploy from GitHub.
3. Connect your repository:
   [https://github.com/Lakunake/WebDisplays-Video-Player](https://github.com/Lakunake/WebDisplays-Video-Player)
4. Set `start` script in `package.json` to:

   ```json
   "start": "node server.js"
   ```
5. Deploy and access your video player via the Railway-provided URL.

---

## 📁 File Structure

```
/videos/filmeva.mp4     # Your synced video file
server.js               # Node.js backend for socket and file serving
index.html              # The frontend video player
```

---

## 📜 License

**Short name**: `CC BY-NC-SA 4.0`
**URL**: [https://creativecommons.org/licenses/by-nc-sa/4.0/](https://creativecommons.org/licenses/by-nc-sa/4.0/)

This project is licensed under **CC BY-NC-SA 4.0**:

* ✅ Free to use and modify
* 🔗 Must credit the original creator (**Lakunake**)
* ❌ Commercial use is **not allowed**
* ♻️ Must share any changes **if distributed or hosted publicly**

See [LICENSE](LICENSE) for more details.

---

## 🙏 Credits

Created by **Lakunake**
Built with ❤️ using Node.js, Express, and Socket.IO
