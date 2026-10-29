# Custom WiFi NFC Stand

Ein frei personalisierbarer, **dreifarbiger WLAN-Aufsteller** mit festem QR-Code, sichtbarem WLAN-Namen und Passwort sowie einer unsichtbaren Tasche für 25-mm-NFC-Sticker.

## Schnellstart

1. `index.html` im Browser öffnen. Auf einem Webhosting einfach **den Inhalt dieses Ordners** hochladen. Es wird keine Datenbank, kein PHP und kein Python benötigt.
2. SSID, Passwort und Sprache wählen.
3. QR-Code mit einem zweiten Handy kontrollieren.
4. **Druckpaket erstellen**. Alle persönlichen Ausgaben entstehen lokal im Browser.
5. Die heruntergeladene **3MF im ElegooSlicer** oder einem kompatiblen Slicer öffnen.
6. Weiß/Schwarz/Blau zuordnen, Druckausrichtung und Schichten prüfen; **Stützen ausschalten**, da Modell gezielt ohne normale Supports geplant ist.
7. Für einen 25-mm-NFC-Tag im Tafelmodell bei **Z = 3,2 mm** nach Beendigung dieser Schicht pausieren, Tag in 26-mm-Tasche legen und weiterdrucken. Bei Layerhöhe 0,2 mm ist das typischerweise vor Beginn der Schicht bei Z = 3,4 mm. **Schichtvorschau geht vor Layernummer!**

## Inhalt des ZIP

- `index.html`, `app.js`, `style.css`, `model-data.js` – vollständig browserbasierter Konfigurator
- `vendor/` – lokal eingebundene QR-/ZIP-Bibliotheken mit Lizenznachweisen
- `nexprint-upload/Custom_WiFi_NFC_Stand_DEMO.3mf` – **öffentliche Beispiel-3MF**, ausschließlich mit fiktiven Zugangsdaten
- `nexprint-upload/DEMO_QR.png` und `DEMO_Vorschau.png` – funktionsfähige Testdaten und Illustration
- `nexprint-upload/BESCHREIBUNG_NEXPRINT_DE.md` – vorbereiteter Veröffentlichungstext
- `docs/DRUCKANLEITUNG.md`, `docs/VEROEFFENTLICHUNG.md` – ausführliche Anleitungen

## Druckmodell

- Vorderseite: etwa 116 × 181 mm, Tafeldicke 4,0 mm, Dekor 0,61 mm
- Fuß: etwa 112 × 55 mm, Tafel etwa 15° geneigt (als einzelnes Teil drucken)
- NFC-Tasche: Ø 26 mm, von Z = 2,4 bis 3,2 mm im Inneren
- Tag: 25 mm Durchmesser, Einleger vor dem Überbrücken der Tasche
- Stützen: normal **aus**. Das Dach über der NFC-Tasche ist eine etwa 26-mm-Brücke und kann je nach Material/Kühlung durchhängen.
- Demo: QR-Daten `GASTNETZ-DEMO` / `Demo1234567` **nur zur Demonstration**, keine echten Zugangsdaten.

## NFC: Einschränkung für iPhones

Der Generator liefert den QR-Code und WLAN-WSC-NDEF-Bytes (`.ndef`). Nicht jede NFC-App kann eine solche Datei importieren. Bei iPhones kann man mit NFC Tools einen WLAN-Record manuell schreiben, iOS verbindet sich durch einen solchen WLAN-Tag **aber nicht automatisch**. Die WLAN-Verbindung über den QR-Code ist auf modernen iPhones und vielen Android-Geräten die zuverlässigere Variante.

Die dem Paket beiliegende `.ndef` ist kein automatisch mit NFC Tools auf iOS importierbares Programmierkommando. Sie ist für geeignete NDEF-Schreibsoftware vorgesehen.

## Veröffentlichung und Privatsphäre

- **Nie** eine persönliche 3MF, ein persönliches ZIP oder einen QR-Code mit echten Zugangsdaten hochladen.
- Für Nexprint ausschließlich den Ordner `nexprint-upload/` verwenden; die Demo ist bewusst fiktiv.
- Einen eigenen realen Probedruck durchführen und fotografieren, bevor man eine getestete Druckqualität behauptet.
- Die browserbasierte Webseite verarbeitet WLAN-Daten ausschließlich im Browser. Keine externe Bibliothek, kein Tracking, kein Server-API-Aufruf.
- Bei Hosting über HTTPS ausliefern. Host-Logs sehen nur statische Dateizugriffe, keine SSID/Passwörter.

## Lizenz

Das Projekt verwendet bewusst **zwei verschiedene Lizenzen**:

- **Web-Konfigurator (Softwarelogik)**: MIT-Lizenz (`LICENSE`), insbesondere `index.html`, `style.css` und `app.js`. Dritte dürfen die Software auch kommerziell verwenden, müssen aber den MIT-Hinweis beibehalten.
- **3D-Modell und Modellgeometrie**: CC BY-NC 4.0 (`LICENSE-MODELS.md`), insbesondere `model-data.js`, STL/3MF-Modell-Dateien und die ursprünglichen Modellillustrationen. Nicht-kommerzieller Druck und Bearbeitung sind erlaubt; **Verkauf von Modell oder Drucken nicht**.
- **Eingebundene Bibliotheken**: Ihre eigenen Lizenztexte unter `vendor/` gelten unverändert. Diese Dateien stehen nicht unter der obigen eigenständigen MIT-Lizenz des Projekts.

Mehr unter https://creativecommons.org/licenses/by-nc/4.0/deed.de. Auch wenn die Website selbst MIT-lizenziert ist, erteilt dies **keine** gesonderte kommerzielle Nutzungsfreigabe für das 3D-Design.

## Grenzen

Browsergenerierte Texte werden aus Browser-Schriftzeichen in feine, geschlossen extrudierte 3D-Bahnen umgesetzt; für besonders lange Kennwörter werden sie kleiner. In der Druckvorschau prüfen, ob die Zeichen noch lesbar bleiben. Der QR-Code hat 4 Module Randzone, gedruckte Modulgröße je nach Datendichte. Bei zu dichten QR-Codes verweigert der Konfigurator die Ausgabe. Keine automatische Druckpause oder ein voll kalibriertes maschinenspezifisches G-Code-Profil in der generischen 3MF enthalten. Für ein wirklich direkt druckbares Nexprint-Profil die Datei selbst in ElegooSlicer slicen, Schichten kontrollieren und dort ein geprüftes Druckprofil exportieren.

**Zusätzlicher Mini-Test:** `nexprint-upload/NFC_Bruecken_Test_26mm.stl` testet die 26-mm-Brücke und NFC-Einlegepause ohne ganzen Aufsteller.
