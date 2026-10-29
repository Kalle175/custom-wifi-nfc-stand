# Druckanleitung

## Druckvorbereitung

Der WLAN-Aufsteller besteht aus einer Fronttafel und einem separaten Standfuß. Die Fronttafel wird flach mit der bedruckten Seite nach oben gefertigt.

**Empfohlene Ausgangswerte (0,4-mm-Düse):**

| Einstellung | Ausgangswert |
| --- | --- |
| Schichthöhe | 0,20 mm |
| Wandlinien | 3 |
| Obere Schichten | 5 |
| Füllung | 15 % Gyroid |
| Stützstrukturen | Aus, bei flacher Ausrichtung |
| Materialien | PLA oder PETG; bei Mehrfarbendruck einheitlicher Materialtyp |

Temperaturen, Bauraumkühlung und Druckgeschwindigkeiten richten sich nach dem jeweiligen Filament und Druckerprofil.

Für den vierfarbigen Slicer sind drei Farben vorgesehen: Weiß für Frontplatte und Standfuß, Schwarz für QR-Code und Text und Blau für die NFC-Markierung. Im Slicer ist zu kontrollieren, dass die grafischen Teile auf der Fronttafel ausgerichtet bleiben.

## NFC-Sticker einsetzen

Die geschlossene NFC-Tasche hat einen Durchmesser von 26 mm und ist für 25-mm-Sticker vorgesehen. Sie reicht von **Z = 2,4 bis 3,2 mm**.

1. Schichtvorschau öffnen und den Abschluss der Tasche bei Z = 3,2 mm suchen.
2. Eine Pause **nach dieser Schicht**, vor der ersten Brückenschicht, setzen.
3. Druckkopf anhalten lassen; Sticker flach in die Tasche legen. Er darf nicht über die umgebende Fläche ragen.
4. Druck fortsetzen und die Überbrückung beobachten.
5. Nach dem Abkühlen den NFC-Tag testen.

Bei 0,20 mm Schichthöhe entspricht dies normalerweise dem Abschluss von Schicht 16. Die konkrete Z-Anzeige im Slicer ist maßgeblich.

**Wärmehinweis:** NFC-Sticker sind nicht für die Temperaturen aller 3D-Druckmaterialien spezifiziert. Hitze kann Antenne, Klebstoff oder Chip beschädigen. Hotend und Heizbett nicht berühren.

## Überbrückung und Druckqualität

Das Dach der NFC-Tasche ist eine rund 26 mm breite Brücke. Bei PETG und ABS kann die erste Brückenschicht durchhängen; Brückenfluss, Brückengeschwindigkeit und Kühlung sind materialabhängig einzustellen. Der beiliegende kleine NFC-Testkörper ermöglicht einen Material- und Pausentest mit geringem Verbrauch.

## Mehrfarbendruck und Mobilslicer

Die 3MF-Datei enthält das Modell und die Farbgruppen. Sie ist **kein fertig optimiertes Druckerprofil**. Vor dem Druck müssen Materialzuordnung, Druckausrichtung, Stützstrukturen und gegebenenfalls die NFC-Pause geprüft werden.

Ein Cloud-/Mobilslicer kann abweichende Stützstrukturen und Geschwindigkeiten verwenden. Für die NFC-Einlage ist deshalb ein Slicer mit einer kontrollierbaren schichtgenauen Pause erforderlich.

## WLAN-Datenschutz

Persönliche 3MF-, STL- und QR-Dateien können das WLAN-Passwort enthalten. Sie sollten nicht auf öffentliche Modellplattformen geladen werden. Für frei zugängliche Schilder ist ein separates Gast-WLAN sinnvoll.
