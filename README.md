# Spotify Clone

A minimal local Spotify-style web player that lists MP3 files from the `Songs/` folder and provides basic playback controls (play/pause, previous/next, seek). This is a small front-end project intended for learning JavaScript, DOM manipulation and working with the Web Audio `Audio` element.

## Features
- Dynamically lists `.mp3` files from the `Songs/` directory
- Play / pause, previous / next track
- Click or drag seekbar to seek within a track
- Shows current time and duration
- Simple Spotify-like UI (HTML + CSS)

## Requirements
- A static file server to serve the project root (the app fetches `Songs/` directory listing). Recommended options:
  - VS Code Live Server extension (serves at `http://127.0.0.1:5500` by default)
  - Python (if installed):

```bash
# from project root
python -m http.server 5500
# or on some systems
py -m http.server 5500
```

## Quick Start
1. Open the project folder in VS Code.
2. Start Live Server or run the Python command above from the project root.
3. Open your browser at `http://127.0.0.1:5500`.

The app will fetch the `Songs/` directory listing and populate the left-hand song list. Click a song's play icon or use the main player controls.

## Files
- `index.html` — Main UI and markup for the player
- `style.css` — Styling for the layout and player
- `main.js` — Application logic (fetches songs, builds list, manages playback and seeking)
- `Songs/` — Place your `.mp3` files here (some example files are included)

## How it works (brief)
- `getsongs()` performs a `fetch` to the running server at `http://127.0.0.1:5500/Songs/` and parses the returned HTML to extract links to `.mp3` files.
- `makesongbars()` builds the song list in the sidebar and attaches data attributes with the audio URL to each play button.
- Playback is handled using the `Audio` element created in `main.js`. Controls are implemented in `playpause()`, `prev()`, `next()`, and `playaudio()`.
- The seekbar supports both clicking and dragging (see `seekbarenable()` implementation).

## Notes and tips
- The project depends on the server returning a directory index for `Songs/`. If your server does not produce an HTML directory listing, `getsongs()` will not find `.mp3` links.
- The code assumes files in `Songs/` are reachable via relative URL `/Songs/<file>.mp3`.
- If you add files with spaces, the app decodes `%20` for display.

## Possible improvements
- Read ID3 metadata (title, artist, cover art) for a richer UI
- Make the UI responsive for small screens
- Add playlists, shuffle and repeat modes
- Use the File System Access API to allow adding local files without a server

## License
MIT
