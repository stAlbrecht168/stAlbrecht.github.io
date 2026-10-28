# Lernatlas

Lernraum für Klasse 5 am Gymnasium Niedersachsen, im Browser auf Handy, Tablet und Laptop. Die vereinfachte Oberfläche hat beim Hinzufügen neuer Seiten keine Pflichtfelder für Fach, Thema oder Quelle.

**Aktueller Stand:** Die neue Oberfläche und die sichere Serveranbindung sind implementiert. Die direkte ChatGPT-Auswertung ist noch nicht aktiviert, weil die einmalige OpenAI-Verbindung fehlt. Auf GitHub Pages ist keine Serverausführung möglich. Bis zur Aktivierung zeigt die App diesen Zustand ausdrücklich an und erstellt keine lokalen Ersatzaufgaben. Bereits gespeicherte Lernpakete und das gekennzeichnete bisherige Beispielmaterial bleiben nutzbar.

## Der einfache Ablauf

1. **Seiten hinzufügen:** Fotos oder eine PDF auswählen. Alternativ Unterrichtstext einfügen. Ein Hinweis ist optional.
2. **Mit ChatGPT auswerten:** Nach Aktivierung liest das Modell die Seiten und erkennt Fach, Thema, Buch und Quellenangaben. Daraus entstehen Merksätze, Wissenskarten und abwechslungsreiche Übungen. Bei unleserlichen oder uneindeutigen Seiten wird gezielt nachgefragt.
3. **Kurz prüfen:** Fragen, Lösungen und Textbelege sind ohne Formulararbeit aufklappbar. Unpassende Aufgaben lassen sich abwählen. Fach, Thema und Quelle können bei Bedarf korrigiert werden.
4. **Passt – speichern & üben:** Das Paket wird freigegeben und die Lernrunde startet. Alternativ nur speichern.

Alle **neu erstellten** Lernpakete werden über die OpenAI-Modellanbindung erzeugt. Der bisherige lokale Lücken-/Zahlengenerator ist im neuen Hinzufügen-Ablauf nicht verfügbar. Bei fehlender Verbindung oder API-Fehlern wird kein Modellaufruf vorgetäuscht. Der offene Dialog behält die ausgewählten Dateien.

## Einmalig verbinden

Die direkte Auswertung benötigt eine geschützte Serververbindung zu OpenAI. Die Einrichtung erfolgt über OpenAI Developers und dessen sicheren API-Key-Ablauf; API-Nutzung kann zusätzlich berechnet werden. Es gibt bewusst kein Schlüsselfeld im Browser und keinen API-Schlüssel im öffentlichen Repository. Genaue Bereitstellungsschritte stehen in [server/README.md](server/README.md).

Die private App muss vor ihrer Veröffentlichung vollständig eingerichtet sein. Erst nach bestätigter Bereitstellung wird ihre URL in `ai-config.mjs` eingetragen. Der öffentliche GitHub-Einstieg verweist dann für neue Auswertungen auf die private App. Ein eventuell nötiger Ursprungwechsel verschiebt bestehende Browserdaten nicht automatisch; dafür eine Sicherung übertragen.

## Lernen, Drucken und Wiederholen

Gespeicherte Lernpakete können direkt geübt oder als Arbeitsblatt mit separatem Lösungsblatt gedruckt werden. Kurze Antworten werden mit Musterlösung und hinterlegten Antwortvarianten verglichen. Eigene Erklärungen haben eine Musterlösung zur gemeinsamen Kontrolle, keine automatische Benotung.

Unsichere Aufgaben sind am gleichen Tag wieder fällig. Bei sicheren Antworten wachsen die Abstände auf 1, 3, 7, 14 und 30 Tage. Die vorgegebenen Arbeitstermine sind für **2026** eingetragen und bearbeitbar: Musik 02.11., Kunst 05.11., Geschichte 10.11., Physik 13.11., Erdkunde 24.11., Werte und Normen 25.11., Mathe 11.12. ICS-Export ist verfügbar.

## Bücher und Quellen

Erfasst sind Zeit für Geschichte 5 (2015), Spektrum Physik SI 5/6 (2025), MusiX 1 (2011), Seydlitz Erdkunde 5/6 (2022), Bioskop 5/6, Deutschbuch 5, Elemente der Mathematik 5 (2023), Camden Town Textbook 5 (2020) und LebensWert 1. Bei Bioskop, Deutschbuch und LebensWert ist der ISBN-Abgleich offen. Verlagslinks und ausdrücklich gekennzeichnete Themenübersichten befinden sich im Bücherregal.

Die Bücherliste liefert Quellenangaben, keine vollständigen Buchinhalte. Aufgaben verwenden die hinzugefügten behandelten Unterrichtsseiten. Für Kunst können Mappenseiten direkt hinzugefügt werden. Lehrerschmidt und Daniel Jung sind als zusätzliche Lernvideoquellen verlinkt. Videos werden nicht automatisch transkribiert; ein Transkript kann als Textmaterial mit Quellenangabe hinzugefügt werden.

## Daten und Sicherungen

Mit **Mit ChatGPT auswerten** werden die ausgewählten Inhalte an OpenAI zur Verarbeitung übertragen. Der Server fordert Antworten mit `store:false` an und speichert die Seiten nicht selbst; die Verarbeitung bei OpenAI unterliegt den dortigen API-Datenbedingungen.

Originaldateien, fertige Lernpakete, Termine und Lernfortschritt werden in IndexedDB in diesem Browser unter diesem Website-Ursprung gespeichert. Es gibt keine automatische Synchronisierung. Unter **Für Eltern** regelmäßig eine Sicherung herunterladen; sie kann die Originaldateien einschließen. Auf einem anderen Gerät die Sicherung importieren. Materialien werden über IDs zusammengeführt, Termine und Einstellungen übernommen. Beim Fortschritt gilt der neuere Stand pro Aufgabe; parallel entstandene Lernstände werden nicht addiert.

Das Löschen von Browserdaten entfernt auch den lokalen Lernatlas. Alte ChatGPT-JSON-Pakete sind über den eingeklappten Kompatibilitätsbereich in der Elternansicht weiterhin importierbar. Für den neuen Alltag sind Kopieren/Einfügen von Prompts oder JSON keine nötigen Schritte mehr.

## Dateien

Fotos: JPG, PNG, WebP, GIF, BMP. PDFs und TXT/Markdown werden ebenfalls angenommen. HEIC vorher als JPG exportieren. Höchstens sechs Dateien gleichzeitig. Fotos werden für die Übertragung auf dem Gerät verkleinert. Die Anfrage darf insgesamt 8 MiB vorbereitete Daten bzw. 12 MiB JSON und höchstens 30000 Zeichen Unterrichtstext enthalten. PDFs bei Bedarf in kleine thematische Abschnitte teilen. Handschrift, Noten, Formeln und Abbildungen immer im Ergebnis gegenprüfen.

## Entwicklung

HTML/CSS und JavaScript-Module, ohne Frontend-Build. Lokale Vorschau über einen statischen Server; Tests `npm test`, Syntaxprüfungen `npm run check`.

- `app.mjs`: Oberfläche, vereinfachter Upload, Prüfung und Training.
- `ai-client.mjs`: sichere Statusabfrage, Dateivorbereitung und Auswertungsanfrage; kein Schlüssel im Browser.
- `ai-contract.mjs`: strukturiertes Ausgabeformat und fachliche Struktur-/Belegprüfung.
- `server/ai-api.mjs`: authentifizierter Responses-API-Handler für eine owner-private Site; Standardmodell `gpt-4.1-mini`, serverseitig konfigurierbar.
- `scripts/compose-worker.mjs`: packt Frontend und Handler in den offiziellen Sites Worker-ESM-Starter.
- `engine.mjs`, `storage.mjs`, `content.mjs`, `books.mjs`: vorhandene Datenformate, Fortschritt, lokale Speicherung und Quellen.

18 automatisierte Prüfungen decken unter anderem Anmeldeschutz, Ursprungskontrolle, Dateigrenzen, JSON-Ausgabe, Textbelege, verweigerte/unvollständige Modellantworten, keine Schlüsselweitergabe, ehrlichen Einrichtungsstatus sowie vorhandene Lern- und Sicherungslogik ab. Modellantworten sind in diesen Tests ausdrücklich simuliert; eine echte API-Auswertung bleibt bis zur Aktivierung ungeprüft.

Die öffentliche Oberfläche liegt im Ordner `lernatlas/` des bestehenden GitHub-Repositorys, aktive Pages-Quelle `portfolio/n8n`. Die übrige Website wird nicht verändert.
