# Direkte ChatGPT-Auswertung

Die Benutzeroberfläche braucht nur Fotos/PDFs oder optional Text. Fach, Thema, Buch, Merksätze, Wissenskarten und Übungen kommen aus der OpenAI Responses API. Es gibt keinen lokalen Generator als Ersatz bei einem API-Fehler. Bestehende Lernpakete und das klar gekennzeichnete bisherige Beispielmaterial bleiben nutzbar.

Der Server ist vorbereitet, aber ohne eingerichteten API-Zugang noch nicht aktiviert. GitHub Pages führt keinen Servercode aus. `ai-api.mjs` muss gemeinsam mit der Oberfläche auf einer bestätigten owner-private Site hinter der von Sites bereitgestellten Authentifizierung betrieben werden. Die Identitäts-Header sind nur hinter dieser vertrauenswürdigen Grenze aussagekräftig; diesen Handler nicht als öffentlichen Proxy betreiben.

## Einmalige Einrichtung

1. OpenAI Developers aktivieren und dessen `openai-platform-api-key`-Skill einschließlich des erforderlichen Zustimmungsablaufs verwenden. Keine Schlüssel im Chat, Quellcode, Frontend oder Hosting-Manifest ablegen.
2. Einen privaten Sites Worker mit dem offiziellen Worker-ESM-Starter anlegen. Eine vorhandene Site-ID unverändert wiederverwenden. `OPENAI_API_KEY` als geschützte Laufzeitvariable konfigurieren. Optional `OPENAI_MODEL`; Standard ist `gpt-4.1-mini`.
3. Aus dem Quellprojekt `node scripts/compose-worker.mjs /absolute/path/to/private-worker-checkout` ausführen. Das Skript bettet Oberfläche und Server in `worker/index.js` ein. Der Worker-ESM-Starter kopiert ausschließlich diese Datei und das Hosting-Manifest.
4. Mit den Starter-Prüfungen `bash scripts/build.sh` und `node scripts/validate-artifact.mjs` bauen, Quellstand synchronisieren und privat veröffentlichen. Vor Veröffentlichung müssen Geheimnis und Zugriff eingerichtet sein.
5. Live-Status, eine echte kleine Auswertung und die Oberfläche prüfen. Erst danach die bestätigte private URL in `dist/ai-config.mjs` als `AI_APP_URL` hinterlegen und die GitHub-Pages-Oberfläche aktualisieren. Der öffentliche Einstieg öffnet für die direkte Auswertung die private App. API-Aufrufe erfolgen dort innerhalb desselben Ursprungs; keine Geheimnisse oder privater Inhalte in URLs.

Bestehende browserlokale Daten gehören zum bisherigen Website-Ursprung. Ein Wechsel zur privaten App benötigt einmalig Sicherung/Import. Die App darf dabei nicht behaupten, Daten seien automatisch umgezogen.

## Vertrag

- `GET /api/status`: meldet authentifiziert, ob der Schlüssel konfiguriert ist. Es wird damit keine kostenpflichtige Modellanfrage ausgeführt.
- `POST /api/analyze`: höchstens sechs Dateien plus optionaler Text. Fotos werden auf dem Gerät für den Upload verkleinert. Grenze 8 MiB pro Datei/Paket, maximal 12 MiB JSON-Anfrage und 30000 Zeichen Text.
- Der Server übernimmt Modellwahl, Systemanweisungen, JSON-Schema und Limits. Der Browser kann weder Modell noch API-Ziel oder Zugangsdaten setzen.
- Antworten werden mit `store:false` angefordert und auf vollständige Inhalte, zulässige Fächer/Bücher und Textbelege geprüft. Dokumentinhalt wird als Quelldaten behandelt.
- Der Server protokolliert weder Seiteninhalt noch Schlüssel und speichert die übermittelten Dokumente nicht selbst. OpenAI verarbeitet sie für die API-Anfrage nach den dort geltenden Datenbedingungen.
- Fehler und fehlende Einrichtung liefern verständliche Fehlermeldungen; es gibt keine vorgetäuschte KI-Auswertung. Die Originalauswahl bleibt im geöffneten Dialog erhalten.

Tests verwenden ausschließlich explizite lokale Mock-Antworten und einen nicht echten Testschlüssel. Sie belegen den Integrationsvertrag; ein erfolgreicher Live-Modellaufruf kann erst nach Aktivierung nachgewiesen werden.
