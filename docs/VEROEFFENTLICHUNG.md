# Veröffentlichungscheckliste – Nexprint, Printables, MakerWorld

## Nexprint

1. Nutzerkonto auf https://www.nexprint.com erstellen / anmelden.
2. **Nur** die generische Demo-3MF `nexprint-upload/Custom_WiFi_NFC_Stand_DEMO.3mf` verwenden. Der QR-Code hat ausschließlich fiktive Daten.
3. Coverbild `DEMO_Cover.png` und erklärende Modellansicht `DEMO_Vorschau.png` hochladen. Im Beschreibungstext klar kenntlich machen, dass dies Visualisierungen sind.
4. Text aus `BESCHREIBUNG_NEXPRINT_DE.md` übernehmen und den Link zu deinem öffentlich gehosteten Konfigurator ergänzen.
5. Im ElegooSlicer **erst einen echten Druck testen** und dann ein maschinenspezifisches 3MF-Druckprofil erstellen. Ohne dieses sollte man die Option „Ein-Klick-Druck“ nicht als zuverlässig darstellen.
6. Eigenes echtes Foto des erfolgreichen Drucks ergänzen. Für manche Nexprint-Events wird ausdrücklich ein Foto verlangt.
7. Als Standard eine **Support-freie** Profilvariante bereitstellen; Pause nur in einem als „mit NFC-Einlage“ markierten Profil.
8. Lizenz und Rechte vor Upload festlegen. Die privaten WLAN-Daten dürfen niemals in der Demo vorkommen.

## Webseite hosten

- Alle Dateien aus dem Projektordner (mit `vendor`, `model-data.js`) auf statisches Webhosting hochladen. Funktioniert mit einfachem Webspace / GitHub Pages.
- **Keine** PHP-/Python-API nötig. Keine Übertragung von SSID oder Passwort an einen fremden Dienst.
- HTTPS aktivieren; `index.html` ist Startseite.
- Der Download wird direkt im Browser erzeugt. Kompatibilität in aktuellen Chromium-, Firefox- und Safari-Versionen testen.

## Fallstricke

- Der Demo-3MF ist ein **Geometrie-Projekt, kein validiertes Centauri-Carbon-2-G-Code-Profil**.
- Der Handy-Cloud-Slicer kann automatische Stützen hinzufügen und Laufzeiten verlängern; Nutzer ausdrücklich auf PC-Slicer hinweisen.
- iPhone-WLAN per NFC-Tag funktioniert nicht ohne Zusatzlösung; QR-Code bleibt universell.
- Die sichtbaren Zugangsdaten sowie QR-Code sind bewusst Teil des Modells. Geheime Haupt-WLAN-Daten nicht öffentlich ausgeben.
