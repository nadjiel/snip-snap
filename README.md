# Snip Snap ✂

**Snip Snap** is a prototype web tool designed to streamline the process of editing videos by detecting **idle sections** (lacking or almost lacking motion or audio) and clipping them out, making the resultant media more concise and **storage-efficient**. The tool also includes a utility to **convert videos into GIFs**.

## ✨ Intended Features

The following features were envisioned for the **Snip Snap** prototype. However, most of these were not fully implemented due to the prototype demonstrating that the approach would not be viable:

- ⭕ **Idle Detection**: Analyze videos to identify idle sections based on **motion** and **audio sensitivity**.
- ❌ **Video Clipping**: Automatically remove idle sections to create a more **focused** and **engaging** video.
- ✔ **Format Conversion**: Convert videos into **GIFs** for easier sharing and reduced storage requirements.

## 🤔 Purpose

This project was created as an experimental prototype to explore the feasibility of a **client-side video processing tool**. The idea originated from the necessity to reduce the size of screen-captured videos used for creating tutorials.

One of the key focuses of the project is **privacy**. By performing all video processing directly in the browser, the tool avoids sending any content to a web server, ensuring that users' data remains local and secure. Additionally, this approach allows the tool to function without requiring an active internet connection, making it more accessible and convenient for offline use.

The goal was to make these videos more **concise** and **storage-friendly** without relying on heavy editing solutions or requiring any installations. By focusing on a lightweight, browser-based approach, the project aimed to simplify the process for users who need quick and efficient video editing.

## ⚠ Limitations

While the tool demonstrates the concept, it is not suitable for processing **larger videos** due to the limitations of its underlying technology, **ffmpeg.wasm**. For example:
- Videos longer than **1 minute** already show significant slowness in processing.
- The tool is not optimized for handling **large files efficiently**.

As a result, this approach is not viable for the intended use case of processing **long videos with big pauses**, such as the tutorials mentioned.

## 💻 Getting Started

### Prerequisites

- **Node.js** (v24 or higher)
- **NPM** (Node Package Manager)

### Installation

1. Clone the repository:

```sh
git clone https://github.com/your-username/snip-snap.git
cd snip-snap
```

2. Install dependencies:

```sh
npm install
```

### Development

To start the development server:

```sh
npm run dev
```

### Build

To build the project for production:

```sh
npm run build
```

### Preview

To preview the production build:

```sh
npm run preview
```

### Linting

To check for linting issues:

```sh
npm run lint
```

To fix linting issues:

```sh
npm run lint:fix
```

## 👨‍🏫 Usage

1. Upload a video file.
2. Use the **Convert Video** button to convert the video to a **GIF**.
3. Use the **Detect Idleness** button to analyze the video for **idle sections**.

## 🔋 Technologies Used

* **React**: Frontend framework for building the **user interface**.
* **Tailwind CSS**: Utility-first CSS framework for **styling**.
* **ffmpeg.wasm**: WebAssembly version of **FFmpeg** for **video processing**.
* **TypeScript**: Typed JavaScript for better **developer experience**.

## ⚖ License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
