# Real-Time Collaborative Text Editor

A fault-tolerant, scalable, and privacy-focused collaborative text editor built using **React**, **WebRTC**, and **Yjs (CRDTs)**. Designed for seamless peer-to-peer editing with offline support and real-time synchronization — even in low-connectivity environments.

---

## ✨ Features

- 🔄 **Real-Time Collaboration**: Edits are instantly reflected across all connected users.
- 🔐 **Authentication**: Simple login via `users.json`.
- 📡 **WebRTC-Based P2P Communication**: Low latency, no central server for data.
- 💾 **Offline Editing**: Works without internet via IndexedDB; auto-syncs upon reconnection.
- 🧠 **CRDT-Based Merge Logic**: Built with the YATA algorithm (Yjs) for conflict-free merging.
- 💡 **Rich Text Support**: Basic formatting like bold, italic, lists, etc.
- 📤 **Export Options**: Save documents as PDF or Markdown.
- 🧪 **Scale Testing**: Simulates 10–50 clients using Puppeteer for resource usage analysis.

---

## 📁 Directory Structure

```
project-root/
├── public/                  # Static files
├── src/                     # Source code
│   ├── App.js               # Main app logic
│   ├── Editor.js            # Collaborative editor logic
│   ├── Login.js             # Authentication logic
│   ├── simulate_clients.js  # Puppeteer scale test script
│   ├── scale_test.py        # System metrics collection
│   └── ...                  # Styles, assets, etc.
├── users.json               # User credentials
├── package.json
└── README.md
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/real-time-collaborative-editor.git
cd real-time-collaborative-editor
```

### 2. Install dependencies

```bash
npm install --legacy-peer-deps
```

### 3. Start the development server

```bash
npm start
```

### 4. Login

Use credentials from `users.json` to log in.

---

## 📊 Scale Testing

We simulated up to 50 clients with Puppeteer, tracking CPU and memory via `psutil`.

- CPU usage peaked at ~5% for 50 clients.
- Memory usage stabilized around 66 MB.
- System remained stable and responsive.

---

## 🧠 Tech Stack

- **Frontend**: React + Quill.js
- **CRDT Engine**: Yjs (YATA algorithm)
- **Communication**: WebRTC (P2P)
- **Persistence**: IndexedDB
- **Testing**: Puppeteer + Python (psutil)

---

## 🚧 Challenges

- Designing a custom CRDT that preserves user intent during concurrent edits.
- Implementing undo/redo functionality in a P2P context.
- WebRTC debugging and ICE negotiation.
- Ensuring correct replay of offline edit queues on reconnection.

---

## 🚀 Future Enhancements

- Add commenting and annotations
- Implement version history and rollback
- Extend mobile and tablet compatibility
- Use JWT and hashed credentials for production-ready security

---

---

## 📚 Documentation

- [Project Presentation (PDF)](./docs/REAL_TIME_Presentation.pdf)

## 👥 Team 43

- Ashish Chokhani (2021102016)
- Ashutosh Srivastava (2021101056)
- Ishit Bansal (2021101083)

---

## 🛠️ Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Make your changes and commit them (`git commit -m 'Add new feature'`)
4. Push to your branch (`git push origin feature-name`)
5. Open a pull request

Please ensure your code follows the existing style and is well-documented. Include tests for any new features or bug fixes.

---

## 📄 License

This project is licensed under the IIITH License.

---

## 🙌 Acknowledgements

- [Yjs](https://github.com/yjs/yjs)
- [Quill.js](https://quilljs.com/)
- [WebRTC](https://webrtc.org/)