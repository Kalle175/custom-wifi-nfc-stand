# Druckanleitung – Custom WiFi NFC Stand

## Für den ersten Druck

1. Drucker: z. B. ELEGOO Centauri Carbon 2 Combo, 0,4-mm-Düse.
2. Druckmaterial: einheitlich PLA oder PETG, bei mehrfarbiger Ausführung **alle Farben vom selben Materialtyp**.
3. Richtwerte: 0,20 mm Layer, drei Wände, fünf Deckschichten, 15 % Gyroid, 100 % Modellgröße.
4. Tafel flach mit Vorderseite oben drucken. Die Standfläche liegt flach und wird separat gefertigt.
5. **Support = AUS**. Es gibt keine normalen Außenüberhänge, die automatische Stützen erfordern. Allerdings wird die NFC-Tasche intern etwa 26 mm weit überbrückt.
6. Bei PETG/ABS: Das Überbrücken der Tasche kann schlechter aussehen als bei PLA. Brückenparameter im Slicer getrennt konfigurieren. Eine eingeschlossene Brücke ist von außen normalerweise nach ausreichend Decklagen nicht sichtbar, aber nicht garantiert perfekt.
7. NFC-Pause: Tasche beginnt bei Z=2,4 mm und endet bei Z=3,2 mm. Nach dieser Höhe pausieren, Tag einlegen und im Slicer kontrollieren, dass der folgende Layer die Tasche verschließt. Bei 0,2 mm Layerhöhe ist das typischerweise **nach Layer 16 / vor Layer 17**, je nach Slicer-Zählung.
8. Bei 25-mm-Tags ist 26 mm für die Tasche vorgesehen. Sticker darf nicht aufragen. Heiße Düse/Heizbett nicht berühren.
9. NFC-Sticker sind nicht für längeren Kontakt mit ABS-Druckbedingungen garantiert; bei PETG ebenso testen.
10. Fuß nach dem Druck auf Passung prüfen. ABS kann stärker schrumpfen.

## Druckprofil für Nexprint

Die mitgelieferte generische 3MF enthält **Geometrie und Farbzuordnung**, aber keine geprüften Drucker-/Filament-Einstellungen und keine automatisch hinterlegte Pause. Für eine echte Nexprint-Direktdruckdatei:

- `Custom_WiFi_NFC_Stand_DEMO.3mf` im **ElegooSlicer auf dem PC** importieren.
- Passendes Centauri-Carbon-2-Combo- und Filamentprofil wählen.
- Stützen ausdrücklich deaktivieren, Materialfarben korrekt zuweisen.
- Slicen und 3D-Schichtvorschau prüfen – besonders NFC-Tasche und QR-Code.
- Einen physischen Testdruck machen.
- Erst danach das **Slicer-Projekt / Druckprofil** aus ElegooSlicer für Nexprint exportieren und hochladen. Wenn das Projekt mit NFC-Tag gedruckt werden soll, Pause im passenden Slicerprofil ergänzen und testen.
- **Keine mobile Ein-Klick-Cloud-Slice-Ausgabe als geprüft verkaufen**, denn diese kann andere Support-/Profilparameter anwenden.

## PETG / ABS

Bei PETG einen Brücken-Test machen: niedrigerer Brückenfluss und passende Kühlung können das Durchhängen reduzieren. Je nach PETG-Hersteller nicht über dessen Temperaturbereich drucken. Bei ABS 100 °C Heizbett und eine geschlossene Kammer nach Herstellerprofil, geeignete Abluft/Lüftung vorsehen.

## Sicherheit

Eine persönliche 3MF enthält QR-Code und sichtbares Passwort, also vertrauliche Zugangsdaten. Nicht öffentlich hochladen. NFC-Tag kann auch bei Datenfreigabe Dritten WLAN-Zugriff ermöglichen. Nur Gastnetz dafür verwenden.

## Kostenloser kleiner Testkörper für die NFC-Einlage

`nexprint-upload/NFC_Bruecken_Test_26mm.stl` ist ein separates 42 × 42 × 4-mm-Teil mit exakt derselben 26-mm-Aussparung (Z=2,4–3,2 mm). Damit lassen sich Brücken und die Druckpause mit sehr wenig Filament ausprobieren, **bevor** der gesamte WLAN-Aufsteller gedruckt wird.
