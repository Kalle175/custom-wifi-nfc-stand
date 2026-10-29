# Custom WiFi NFC Stand

Ein personalisierbarer WLAN-Aufsteller für den 3D-Druck – mit QR-Code, ausgeschriebenen Zugangsdaten und Platz für einen unsichtbaren NFC-Sticker.

**[Konfigurator öffnen](https://kalle175.github.io/custom-wifi-nfc-stand/)**

## Funktionen

- WLAN-Name, Passwort, Verschlüsselung und Sprache festlegen
- WLAN-QR-Code direkt im Browser erzeugen
- Dreifarbiges 3MF-Modell und STL-Einzelteile herunterladen
- NFC-WLAN-Datensatz und Schreibbefehle für NTAG215 erstellen
- Keine Anmeldung, keine externe QR-Code-API und keine Übermittlung der eingegebenen WLAN-Daten

Die Modelle lassen sich in gängigen Slicern vorbereiten. Das Grunddesign besteht aus einer geneigten Fronttafel und einem kompakten, separat gedruckten Standfuß. Die Vorderseite enthält einen QR-Code, Netzwerkname, Passwort und ein NFC-Symbol.

## Verwendung

1. [Konfigurator](https://kalle175.github.io/custom-wifi-nfc-stand/) öffnen und WLAN-Daten eingeben.
2. Sprache und Sicherheitsmodus auswählen.
3. QR-Code über die Vorschau kontrollieren und das Druckpaket herunterladen.
4. Die 3MF-Datei im Slicer öffnen, Materialien zuordnen und die Schichtvorschau prüfen.
5. Mit geeignetem Druckprofil slicen. Bei Bedarf eine Pause für den NFC-Tag setzen.

Die ausführlichen Druckempfehlungen stehen unter [Druckanleitung](docs/DRUCKANLEITUNG.md).

## Modellgeometrie

Texte und QR-Code werden beim Export als geschlossene 3D-Körper mit gemeinsamen Kanten erzeugt. Vor dem Drucken die Druckdatei im Slicer prüfen.

## Modelldaten

| Eigenschaft | Wert |
| --- | --- |
| Fronttafel | 116 × 181 mm |
| Neigung | ca. 15° |
| Standfuß | 112 × 55 mm |
| NFC-Tasche | Ø 26 mm für 25-mm-Sticker |
| NFC-Tasche, Z-Höhe | 2,4–3,2 mm |
| Farbaufteilung | Weiß / Schwarz / Blau |
| Empfohlene Schichthöhe | 0,20 mm |

Die Modelle enthalten keine automatisch eingerichtete Druckpause und kein maschinenspezifisches G-Code-Profil. Die Stützstrukturen sollten im Slicer geprüft werden; für die vorgesehene flache Druckausrichtung sind keine allgemeinen Supports notwendig. Die NFC-Tasche erfordert eine freie Überbrückung von rund 26 mm.

## NFC und Smartphone-Kompatibilität

Ein optionaler NFC-Sticker kann während einer Druckpause eingesetzt und anschließend überdruckt werden. Unterstützte Tag-Schreibmethoden unterscheiden sich je nach Gerät und App.

Ein gewöhnlicher WLAN-NFC-Datensatz stellt **auf iPhones keine automatische WLAN-Verbindung** her. Dafür ist der WLAN-QR-Code vorgesehen. Auf Android hängt die NFC-Unterstützung vom Gerät und der Software ab.

## Datenschutz

Die Konfiguration und die Dateierzeugung laufen lokal im Browser. Das Projekt verwendet keine serverseitige Verarbeitung der eingegebenen Daten, keine Analysewerkzeuge und keine externen QR-Code-Dienste.

**Achtung:** Das generierte Schild, der QR-Code und die heruntergeladenen Dateien enthalten das WLAN-Passwort. Für öffentlich zugängliche Schilder empfiehlt sich ein separates Gastnetz. Persönliche Druckdateien sollten nicht öffentlich geteilt werden.

Die enthaltenen Beispieldateien verwenden ausschließlich fiktive WLAN-Daten.

## Dateien

- `index.html`, `style.css`, `app.js` – Browser-Konfigurator
- `model-data.js` – Geometrie des Grundmodells
- `vendor/` – lokal eingebundene Bibliotheken und deren Lizenzen
- `nexprint-upload/` – neutrales Beispielmodell und Abbildungen
- `docs/DRUCKANLEITUNG.md` – Druck- und NFC-Einlegehinweise

## Lizenzen

- **Web-Konfigurator:** [MIT](LICENSE)
- **3D-Modell und Modellgeometrie:** [CC BY-NC 4.0](LICENSE-MODELS.md) – keine kommerzielle Verwendung ohne zusätzliche Genehmigung
- **Drittanbieter-Bibliotheken:** separate Lizenzhinweise in `vendor/`

© 2026 Kalle175
