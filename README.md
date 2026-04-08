# Die Reise — Vom Ozean ins All

Eine interaktive, meditative Reise vom tiefen Ozean durch die Atmosphäre bis in die Unendlichkeit des Weltalls.

## Features

- Scroll-gesteuerte Reise durch 6 Stationen (Tiefsee → Weltraum)
- Automatische, endlose kosmische Reise mit "Repetition mit Variation"
- Integrierter Audio-Player mit zufälliger Wiedergabe
- PWA mit vollständigem Offline-Support
- Optimiert für iPad (Vollbild, Touch-Steuerung)

## Setup

### 1. MP3-Dateien hinzufügen

Lege deine 20 MP3-Dateien in den `music/` Ordner mit diesen Dateinamen:

```
music/track-01.mp3
music/track-02.mp3
...
music/track-20.mp3
```

Du kannst die Dateien auch anders benennen — passe dann einfach die `tracks.json` entsprechend an.

### 2. GitHub Repository erstellen

1. Gehe zu https://github.com/new
2. Name: `die-reise`
3. Public Repository
4. Erstelle das Repository (ohne README, .gitignore oder License)

### 3. Code hochladen

```bash
cd die-reise-repo
git remote add origin https://github.com/DEIN-USERNAME/die-reise.git
git push -u origin main
```

### 4. GitHub Pages aktivieren

1. Gehe zu Repository → Settings → Pages
2. Source: "Deploy from a branch"
3. Branch: `main`, Ordner: `/ (root)`
4. Save

Nach 1-2 Minuten ist die Seite unter `https://DEIN-USERNAME.github.io/die-reise/` erreichbar.

### 5. Auf iPad installieren

1. Öffne die URL in Safari
2. Tippe auf das Teilen-Symbol (Quadrat mit Pfeil nach oben)
3. Wähle "Zum Home-Bildschirm"
4. Die App öffnet sich im Vollbildmodus

## Steuerung

- **Scrollen/Wischen**: Aufsteigen durch die Stationen
- **Tippen**: Partikel-Burst (nur vor dem Weltraum)
- **Audio**: Hover/Tippe am unteren Bildschirmrand
- **Leertaste**: Play/Pause
- **Pfeiltasten**: Nächster/Vorheriger Track
