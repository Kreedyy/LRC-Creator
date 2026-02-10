# LRC Multitool

Web alternative to [LRCGET](https://github.com/tranxuanthang/lrcget), inspired by [https://github.com/magic-akari/lrc-maker](https://github.com/magic-akari/lrc-maker).

**Support artists directly through donations**  
Download your music and stop paying for subscription based streaming services while keeping synced lyrics and claiming your digital sovereignty.

**Other tools to help own your music:**

**Music servers:**  
[Navidrome](https://github.com/navidrome/navidrome) (Create your OWN streaming service with subsonic clients that support synced lyrics e.g. [Musly](https://github.com/dddevid/musly))

[Mopidy](https://github.com/mopidy/mopidy) with [mopidy-mpd](https://github.com/mopidy/mopidy-mpd) plugin OR [MPD](https://github.com/MusicPlayerDaemon/MPD)

**Lyrics:**  
[Sptlrx](https://github.com/raitonoberu/sptlrx) (Lyrics in terminal, best used with Mopidy/MPD)

## Features

- Lyrics editing, syncing & automatic formatting
- Functionality with [LRCLIB](https://lrclib.net/)'s API (Importing & submitting lyrics)
- Upload audio via local files, link, YouTube link or SoundCloud link to use while syncing

## TODO

- [ ] Lyric editing
- [x] Functionality with [LRCLIB](https://lrclib.net/) API (GET /api/search param 'q' & POST)
- [x] Only POST lyrics if ~~fully plain or~~ fully synced (checking if every line starts with valid [mm:ss.xx], if synced POST both plain & synced by removing timestamps) LRCLIB POST requires synced lyrics anyways
- [ ] Uploading files via YouTube and SoundCloud, setSharedTrackData with the file's metadata
- [ ] MAYBE Add User-Agent header according to LRCLIB docs

## Prerequisites

- [Bun](https://bun.com/)

## Installation

Install dependencies

```sh
bun install
```

# Formatting

```sh
bun run format
```

# Development

```sh
bun run dev
```

# Building

```sh
bun run build
```
