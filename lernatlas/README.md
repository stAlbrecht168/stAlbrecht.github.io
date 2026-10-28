# Lernatlas

Browserbasierter Lernraum für Klasse 5 am Gymnasium in Niedersachsen. Ohne Server oder API-Schlüssel nutzbar. Die Oberfläche passt sich Handy, Tablet und Laptop an.

## Start

1. Unter **Wissensbasis → Deine Bücher** das passende Buch auswählen.
2. **Seiten hinzufügen**: Thema und Seitenangabe eintragen, Fotos/PDFs hochladen und **Dateien einlesen** wählen. Alternativ Text direkt einfügen.
3. Den erkannten Text mit dem Original vergleichen. **Wissen erstellen** erzeugt Merksätze und einfache, direkt belegte Lückenaufgaben. Vorschau prüfen und speichern.
4. **Hiermit üben** startet eine Lernrunde. **Arbeitsblatt** öffnet den Druckdialog; ein Lösungsblatt kann auf separaten Seiten ergänzt werden.
5. Unter **Für Eltern** regelmäßig eine Sicherung herunterladen. Für ein weiteres Gerät die Sicherung dort importieren.

Die richtige Bücherliste umfasst Zeit für Geschichte 5 (2015), Spektrum Physik SI 5/6 (2025), MusiX 1 (2011), Seydlitz Erdkunde 5/6 (2022), Bioskop 5/6, Deutschbuch 5, Elemente der Mathematik 5 (2023), Camden Town Textbook 5 (2020) und LebensWert 1. Bei Bioskop, Deutschbuch und LebensWert ist der ISBN-Abgleich noch offen. Verlagslinks und entsprechend gekennzeichnete Themenübersichten sind im Bücherregal hinterlegt. Keine Ausleihcodes, Ausleihdaten oder Fotos der Bücherlisten sind Teil des veröffentlichten Quellcodes.

## Verständnisfragen mit ChatGPT

Im gespeicherten Material **Mit ChatGPT erweitern** wählen. Die vorbereitete Anfrage enthält den Unterrichtstext, Quell-IDs und das benötigte Ausgabeformat. Die Anfrage selbst in ChatGPT einfügen und die vollständige JSON-Antwort über **Für Eltern → ChatGPT-Aufgaben importieren** übernehmen. Der Text wird nur durch dieses bewusste Einfügen an ChatGPT weitergegeben.

Importierte Aufgaben sind bis zur Elternprüfung vom Training ausgeschlossen. Fragen, Lösungen, Tipps, Antwortvarianten und Quellenbelege lassen sich in einer normalen Formularansicht bearbeiten. Wörtliche Quellenbelege müssen im Ausgangsmaterial vorkommen; diese Prüfung allein beurteilt noch nicht die fachliche Richtigkeit. Freie Erklärungen verwenden eine Musterlösung und eine gemeinsame Selbsteinschätzung, keine automatische Benotung.

Es gibt **keine automatische KI-Anbindung** und keinen versteckten API-Schlüssel. Die lokale Ableitung erzeugt einfache Textlücken, keine semantische Zusammenfassung oder vollständige KI-Analyse. Der Mathegenerator unterstützt gezielt Rechengrundlagen mit neuen Zahlen.

## Material und Lernfortschritt

IndexedDB speichert Text, Aufgaben, Lernkarten, Originaldateien, Termine und Fortschritt in diesem Browser unter dieser Website. Es gibt **keine automatische Synchronisierung** oder Eltern-Authentifizierung. Eine Sicherung kann die Originalfotos/PDFs einschließen. Beim Import werden Materialien über ihre IDs zusammengeführt; Termine und Einstellungen werden übernommen. Bei Lernfortschritt wird der neuere Stand pro Aufgabe gewählt. Gleichzeitiges Lernen auf zwei Geräten lässt sich damit nicht verlustfrei zusammenrechnen.

Kein Tracking-Code und kein Upload der Unterrichtsseiten an GitHub, einen OCR-Server oder eine KI-API. Schriftarten und Bibliotheken werden von externen Anbietern geladen. Video- und Verlagslinks führen auf externe Seiten. Browserdaten zu löschen entfernt auch den lokalen Lernatlas. Regelmäßige Sicherungen sind deshalb sinnvoll.

## Buchseiten und Videos

Die Bücherliste enthält Titel/Editionen und teilweise verlinkte öffentliche Verlagsübersichten, **keine vollständigen Buchinhalte**. Die behandelten Seiten und Klausurthemen müssen ergänzt werden. Beispielstoff ist ausdrücklich als Beispiel gekennzeichnet und kann abgeschaltet werden. Für Kunst ist noch kein Buch genannt; Mappenseiten können direkt hinzugefügt werden.

Gedruckter Text funktioniert bei der OCR am besten. Handschrift, Formeln, Tabellen, Zeichnungen und Musiknoten benötigen eine manuelle Überprüfung. Unterstützt: JPG, PNG, WebP, GIF, BMP, PDF und TXT/Markdown als Text; HEIC vorher als JPG exportieren. Grenzen: 12 Dateien, 25 MB pro Datei, 100 MB pro Material, PDF höchstens 20 Seiten. Die Sprachdaten werden beim ersten OCR-Aufruf geladen; eine Internetverbindung wird benötigt.

Lehrerschmidt und Mathe by Daniel Jung sind als Quellen verlinkt, ergänzt um eine Themensuche innerhalb der YouTube-Kanäle. Es werden keine Videos oder Transkripte automatisch analysiert. Ein Transkript kann mit Video-URL als eigenes Material eingefügt werden. Die Wiedergabe der verlinkten Einzelvideos wurde nicht vollständig überprüft.

## Termine

Vorgegebene Termine sind als **2026** erfasst und bearbeitbar: Musik 02.11., Kunst 05.11., Geschichte 10.11., Physik 13.11., Erdkunde 24.11., Werte und Normen 25.11., Mathe 11.12. Der Lernplan priorisiert die nächste bevorstehende Arbeit. Unsichere Aufgaben werden für den gleichen Tag vorgemerkt; bei sicheren Antworten steigen die Wiederholungsabstände auf 1, 3, 7, 14 und 30 Tage. Ein ICS-Export ist verfügbar.

## Technik und Entwicklung

Statisches HTML/CSS und JavaScript-Module. Keine Build- oder Installationsschritte erforderlich. `app.mjs` enthält Oberfläche/Interaktionen, `engine.mjs` die Aufgabenlogik, `storage.mjs` IndexedDB, `reader.mjs` OCR/PDF-Import, `content.mjs` Beispielstoff und `books.mjs` die Quellenliste.

- Tesseract.js 6.0.1 und Tesseract.js Core 6.0.0, über jsDelivr; deutsche Sprachdaten von projectnaptha.com.
- PDF.js 4.10.38, über jsDelivr; Ausführung von PDF-JavaScript wird nicht verwendet, `isEvalSupported` ist deaktiviert.
- DM Sans / Manrope über Google Fonts, mit lokalen Systemschrift-Fallbacks.

Lokaler Start aus diesem Ordner: `python -m http.server 8000`. Tests: `npm test`. Syntaxprüfung: `npm run check`.

Geprüft: Termine/Berliner Tageswechsel, Rechenvarianten, strikte Kurzantwortkontrolle, Textbelege, Sperre ungeprüfter Aufgaben, Wiederholungsabstände und Backup-Validierung. Im Browser getestet: Foto-OCR, Text-PDF, Textimport, Speichern/Neuladen, KI-Import/Freigabe, Auswahlaufgabe/freie Erklärung, Druckdokument, Backup mit Originaldateien und Wiederimport sowie Layout bei 390 px.

## GitHub Pages

Diese Anwendung liegt als eigener Ordner `lernatlas/` im bestehenden Repository. Die aktive Pages-Quelle ist der Branch `portfolio/n8n`. Die übrige Website wird nicht verändert. Relative Assetpfade unterstützen die Bereitstellung unter einem Unterverzeichnis.
