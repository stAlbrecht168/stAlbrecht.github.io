// Eigenständig formulierte Beispiele. Die tatsächlichen Arbeitsthemen sind noch unbekannt.
export const SUBJECTS = [
  { id: 'musik', label: 'Musik', color: '#9b73cc', icon: 'music' },
  { id: 'kunst', label: 'Kunst', color: '#de9267', icon: 'palette' },
  { id: 'geschichte', label: 'Geschichte', color: '#c39c53', icon: 'landmark' },
  { id: 'physik', label: 'Physik', color: '#678bc9', icon: 'atom' },
  { id: 'erdkunde', label: 'Erdkunde', color: '#649d77', icon: 'globe' },
  { id: 'werte', label: 'Werte und Normen', color: '#c87e9a', icon: 'heart' },
  { id: 'mathe', label: 'Mathe', color: '#418e92', icon: 'calculator' },
  { id: 'biologie', label: 'Biologie', color: '#789c52', icon: 'leaf' },
  { id: 'deutsch', label: 'Deutsch', color: '#b46e61', icon: 'book' },
  { id: 'englisch', label: 'Englisch', color: '#7b82b5', icon: 'globe' },
];

export const DEFAULT_EXAMS = [
  { id: 'exam-musik', subject: 'musik', date: '2026-11-02', topic: '' },
  { id: 'exam-kunst', subject: 'kunst', date: '2026-11-05', topic: '' },
  { id: 'exam-geschichte', subject: 'geschichte', date: '2026-11-10', topic: '' },
  { id: 'exam-physik', subject: 'physik', date: '2026-11-13', topic: '' },
  { id: 'exam-erdkunde', subject: 'erdkunde', date: '2026-11-24', topic: '' },
  { id: 'exam-werte', subject: 'werte', date: '2026-11-25', topic: '' },
  { id: 'exam-mathe', subject: 'mathe', date: '2026-12-11', topic: '' },
];

const unit = (id, subject, title, facts, questions, exercises) => ({
  id, subject, title, source: 'Beispielmaterial · Lernatlas', demo: true,
  text: facts.join('\n\n'),
  cards: questions.map((q, i) => ({ id: `${id}-card-${i + 1}`, question: q[0], answer: q[1], quote: facts[q[2]] })),
  exercises: exercises.map((q, i) => ({ id: `${id}-exercise-${i + 1}`, ...q, quote: facts[q.fact] })).map(({ fact, ...q }) => q),
});

export const DEMO_UNITS = [
  unit('demo-musik', 'musik', 'Notenwerte und Takt', [
    'Im 4/4-Takt enthält jeder Takt vier Viertelschläge.',
    'Eine Viertelnote dauert einen Viertelschlag. Eine halbe Note dauert zwei Viertelschläge. Eine ganze Note dauert vier Viertelschläge.',
    'Zwei halbe Noten dauern zusammen genauso lange wie eine ganze Note.',
    'Notenwerte beschreiben die Dauer von Tönen. Die Tonhöhe zeigt dagegen, wie hoch oder tief ein Ton klingt.',
  ], [
    ['Wie viele Viertelschläge enthält ein 4/4-Takt?', 'Vier Viertelschläge.', 0],
    ['Wie lange dauert eine halbe Note in Viertelschlägen?', 'Zwei Viertelschläge.', 1],
    ['Was beschreiben Notenwerte?', 'Die Dauer von Tönen.', 3],
  ], [
    { type: 'choice', prompt: 'Wie viele Viertelschläge dauert eine ganze Note?', options: ['1', '2', '4', '8'], answer: '4', explanation: 'Eine ganze Note füllt im 4/4-Takt einen ganzen Takt mit vier Viertelschlägen.', hint: 'Denke an die vier Schläge im 4/4-Takt.', fact: 1 },
    { type: 'short', prompt: 'Wie viele halbe Noten dauern zusammen so lange wie eine ganze Note? Schreibe eine Zahl.', answer: '2', explanation: 'Zwei halbe Noten ergeben zusammen vier Viertelschläge: 2 + 2 = 4.', hint: 'Eine halbe Note dauert zwei, eine ganze Note vier Viertelschläge.', fact: 2 },
    { type: 'choice', prompt: 'Was beschreibt ein Notenwert?', options: ['Die Lautstärke', 'Die Dauer eines Tons', 'Die Farbe eines Instruments'], answer: 'Die Dauer eines Tons', explanation: 'Notenwerte geben an, wie lange ein Ton dauert.', hint: 'Es geht um kurz und lang.', fact: 3 },
    { type: 'self', prompt: 'Klatsche vier gleichmäßige Schläge. Erkläre dann, wie du dazu zwei halbe Noten zählen würdest.', answer: 'Jede halbe Note dauert zwei Schläge: Die erste umfasst die Schläge 1 und 2, die zweite die Schläge 3 und 4.', explanation: 'Vergleiche deine Erklärung mit der Musterlösung. Lass dir bei Bedarf von einem Erwachsenen zuhören.', hint: 'Teile die vier Schläge in zwei gleich große Gruppen.', fact: 2 },
  ]),
  unit('demo-kunst', 'kunst', 'Farben mischen', [
    'Für diesen einfachen Farbkreis mit Malfarben verwenden wir Rot, Gelb und Blau als Grundfarben.',
    'Mischt man Gelb und Blau, erhält man Grün. Aus Rot und Gelb entsteht Orange. Aus Blau und Rot entsteht Violett.',
    'Grün, Orange und Violett heißen in diesem Farbkreis Sekundärfarben, weil sie jeweils aus zwei Grundfarben entstehen.',
    'Welche Farbe beim Mischen genau entsteht, hängt auch von den verwendeten Malfarben und ihren Mengen ab.',
  ], [
    ['Welche Grundfarben verwendet unser Beispiel-Farbkreis?', 'Rot, Gelb und Blau.', 0],
    ['Welche Farbe entsteht aus Gelb und Blau?', 'Grün.', 1],
    ['Warum heißt Orange hier Sekundärfarbe?', 'Orange entsteht aus zwei Grundfarben: Rot und Gelb.', 2],
  ], [
    { type: 'choice', prompt: 'Welche Farbe entsteht im Beispiel aus Rot und Gelb?', options: ['Grün', 'Violett', 'Orange'], answer: 'Orange', explanation: 'Rot und Gelb ergeben beim Mischen im Beispiel Orange.', hint: 'Die gesuchte Farbe erinnert an eine Orange.', fact: 1 },
    { type: 'short', prompt: 'Welche Farbe entsteht im Beispiel aus Gelb und Blau?', answer: 'Grün', explanation: 'Gelb und Blau ergeben Grün.', hint: 'Denke an die Farbe von Gras.', fact: 1 },
    { type: 'choice', prompt: 'Welche Gruppe enthält nur Sekundärfarben unseres Farbkreises?', options: ['Rot, Gelb, Blau', 'Grün, Orange, Violett', 'Blau, Grün, Rot'], answer: 'Grün, Orange, Violett', explanation: 'Jede dieser drei Farben entsteht aus zwei Grundfarben.', hint: 'Grundfarben gehören nicht in die gesuchte Gruppe.', fact: 2 },
    { type: 'self', prompt: 'Du möchtest ein grünes Blatt malen, hast aber nur die drei Grundfarben. Beschreibe deinen Plan.', answer: 'Ich mische Gelb und Blau. Ich teste die Mischung auf einem Restpapier und verändere bei Bedarf die Mengen.', explanation: 'Entscheidend ist die Mischung aus Gelb und Blau. Deine genaue Formulierung darf anders sein.', hint: 'Welche zwei Grundfarben ergeben Grün?', fact: 1 },
  ]),
  unit('demo-geschichte', 'geschichte', 'Spuren der Vergangenheit', [
    'Historische Quellen geben uns Hinweise auf die Vergangenheit.',
    'Ein alter Brief ist eine schriftliche Quelle. Ein altes Werkzeug ist eine Sachquelle. Ein altes Gemälde kann eine Bildquelle sein.',
    'Bei einer Quelle fragen wir zum Beispiel: Wer hat sie hergestellt? Wann ist sie entstanden? Wozu wurde sie verwendet?',
    'Eine einzelne Quelle zeigt oft nur einen Ausschnitt. Deshalb vergleichen Historikerinnen und Historiker mehrere Quellen.',
  ], [
    ['Was verraten uns historische Quellen?', 'Sie geben Hinweise auf die Vergangenheit.', 0],
    ['Zu welcher Quellenart gehört ein altes Werkzeug?', 'Zu den Sachquellen.', 1],
    ['Warum vergleichen wir mehrere Quellen?', 'Eine einzelne Quelle zeigt oft nur einen Ausschnitt.', 3],
  ], [
    { type: 'choice', prompt: 'Welche Quellenart ist ein alter Brief?', options: ['Eine Sachquelle', 'Eine schriftliche Quelle', 'Eine Wettervorhersage'], answer: 'Eine schriftliche Quelle', explanation: 'Der Brief überliefert Informationen in geschriebener Form.', hint: 'Wie enthält ein Brief seine Informationen?', fact: 1 },
    { type: 'short', prompt: 'Ein altes Werkzeug ist eine … Ergänze die Quellenart mit einem Wort.', answer: 'Sachquelle', explanation: 'Ein Werkzeug ist ein Gegenstand und gehört zu den Sachquellen.', hint: 'Die Bezeichnung beginnt mit „Sach“.', fact: 1 },
    { type: 'choice', prompt: 'Warum sollte man mehrere Quellen vergleichen?', options: ['Weil jede Quelle alles zeigt', 'Weil eine einzelne Quelle oft nur einen Ausschnitt zeigt', 'Weil alte Dinge immer falsch sind'], answer: 'Weil eine einzelne Quelle oft nur einen Ausschnitt zeigt', explanation: 'Mehrere Quellen können unterschiedliche Blickwinkel und zusätzliche Hinweise liefern.', hint: 'Kann ein einzelner Brief die gesamte Vergangenheit abbilden?', fact: 3 },
    { type: 'self', prompt: 'Du findest einen alten Brief auf dem Dachboden. Formuliere zwei Fragen, die dir beim Untersuchen helfen.', answer: 'Zum Beispiel: Wer hat den Brief geschrieben? Wann ist er entstanden? An wen war er gerichtet? Warum wurde er geschrieben?', explanation: 'Es gibt mehrere passende Antworten. Zwei sinnvolle Fragen zur Entstehung oder Verwendung reichen.', hint: 'Denke an die Fragewörter wer, wann und wozu.', fact: 2 },
  ]),
  unit('demo-physik', 'physik', 'Licht und Schatten', [
    'Eine Lichtquelle sendet selbst Licht aus. Eine eingeschaltete Lampe und die Sonne sind Lichtquellen.',
    'Der Mond sendet selbst kein sichtbares Licht aus. Er ist sichtbar, weil er Sonnenlicht zurückwirft.',
    'Trifft Licht auf einen lichtundurchlässigen Gegenstand, kann dahinter ein Schatten entstehen, weil der Gegenstand das Licht aufhält.',
    'Für einen Schattenversuch an der Wand brauchen wir eine Lichtquelle, einen lichtundurchlässigen Gegenstand und die Wand als Schirm.',
  ], [
    ['Was ist eine Lichtquelle?', 'Etwas, das selbst Licht aussendet.', 0],
    ['Warum sehen wir den Mond?', 'Er wirft Sonnenlicht zurück.', 1],
    ['Wie kann ein Schatten entstehen?', 'Ein lichtundurchlässiger Gegenstand hält Licht auf.', 2],
  ], [
    { type: 'choice', prompt: 'Welches Beispiel ist eine Lichtquelle?', options: ['Ein Spiegel', 'Eine eingeschaltete Lampe', 'Der Mond'], answer: 'Eine eingeschaltete Lampe', explanation: 'Die eingeschaltete Lampe sendet selbst Licht aus.', hint: 'Gesucht ist etwas, das selbst leuchtet.', fact: 0 },
    { type: 'short', prompt: 'Was wirft der Mond laut Beispieltext zurück? Ergänze ein Wort.', answer: 'Sonnenlicht', explanation: 'Der Mond wird von der Sonne beleuchtet und wirft Sonnenlicht zurück.', hint: 'Das gesuchte Wort besteht aus „Sonne“ und „Licht“.', fact: 1 },
    { type: 'choice', prompt: 'Warum entsteht hinter einem lichtundurchlässigen Gegenstand ein Schatten?', options: ['Er hält Licht auf', 'Er erzeugt zusätzliches Licht', 'Die Wand leuchtet selbst'], answer: 'Er hält Licht auf', explanation: 'Das Licht gelangt nicht durch den Gegenstand in den Bereich dahinter.', hint: 'Was bedeutet „lichtundurchlässig“?', fact: 2 },
    { type: 'self', prompt: 'Beschreibe einen Schattenversuch mit Taschenlampe, Buch und Wand. Nenne die Aufgabe jedes Teils.', answer: 'Die Taschenlampe ist die Lichtquelle. Das Buch hält Licht auf. Die Wand ist der Schirm, auf dem der Schatten sichtbar wird.', explanation: 'Alle drei Aufgaben sollten in deiner Erklärung vorkommen.', hint: 'Ordne Lichtquelle, Hindernis und Schirm zu.', fact: 3 },
  ]),
  unit('demo-erdkunde', 'erdkunde', 'Karten lesen', [
    'Die vier Haupthimmelsrichtungen heißen Norden, Osten, Süden und Westen.',
    'Auf vielen Karten liegt Norden oben. Prüfe zur Sicherheit den Nordpfeil oder andere Angaben zur Ausrichtung.',
    'Die Legende einer Karte erklärt die verwendeten Zeichen und Farben.',
    'Beim Maßstab 1 : 10 000 entsprechen 1 cm auf der Karte 10 000 cm in Wirklichkeit. Das sind 100 m.',
  ], [
    ['Welche vier Haupthimmelsrichtungen gibt es?', 'Norden, Osten, Süden und Westen.', 0],
    ['Wozu dient die Legende?', 'Sie erklärt die Zeichen und Farben auf der Karte.', 2],
    ['Was bedeutet 1 cm bei einem Maßstab von 1 : 10 000?', '100 m in Wirklichkeit.', 3],
  ], [
    { type: 'choice', prompt: 'Wo erfährst du, was ein Kartenzeichen bedeutet?', options: ['In der Legende', 'An der Farbe des Hefters', 'Immer am Kartenrand ohne Erklärung'], answer: 'In der Legende', explanation: 'Die Legende erläutert Kartenzeichen und Farben.', hint: 'Der gesuchte Begriff steht im dritten Absatz.', fact: 2 },
    { type: 'short', prompt: 'Maßstab 1 : 10 000: Wie viele Meter sind 1 cm auf der Karte? Schreibe nur die Zahl.', answer: '100', explanation: '10 000 cm geteilt durch 100 ergeben 100 m.', hint: '100 cm sind 1 m.', fact: 3 },
    { type: 'choice', prompt: 'Welche Aussage zur Nordrichtung ist richtig?', options: ['Norden ist auf jeder Karte immer oben', 'Die Ausrichtung sollte man prüfen', 'Norden und Süden bedeuten dasselbe'], answer: 'Die Ausrichtung sollte man prüfen', explanation: 'Viele Karten sind nach Norden ausgerichtet, aber man muss die Angaben der jeweiligen Karte beachten.', hint: 'Der Nordpfeil hilft dir.', fact: 1 },
    { type: 'self', prompt: 'Du möchtest auf einer unbekannten Karte den Weg zu einem Bahnhof finden. Welche zwei Angaben prüfst du zuerst?', answer: 'Zum Beispiel: Ich prüfe die Legende, um das Bahnhofszeichen zu erkennen, und die Ausrichtung, um die Himmelsrichtungen zu kennen. Für Entfernungen prüfe ich auch den Maßstab.', explanation: 'Mehrere sinnvolle Wege sind möglich. Wichtig ist, dass du die Angaben mit ihrem Zweck verbindest.', hint: 'Denke an Zeichen, Himmelsrichtungen und Entfernungen.', fact: 2 },
  ]),
  unit('demo-werte', 'werte', 'Regeln und gutes Zusammenleben', [
    'Regeln beschreiben, wie sich Menschen in einer bestimmten Situation verhalten sollen.',
    'Werte sind Vorstellungen davon, was Menschen wichtig finden, zum Beispiel Ehrlichkeit, Hilfsbereitschaft oder Gerechtigkeit.',
    'Bei einem Kompromiss suchen Beteiligte eine gemeinsame Lösung und geben dabei jeweils einen Teil ihrer Wünsche auf.',
    'In einem Streit hilft es, einander ausreden zu lassen, die eigene Sicht ruhig zu erklären und nach einer gemeinsamen Lösung zu suchen.',
  ], [
    ['Was beschreibt eine Regel?', 'Wie man sich in einer bestimmten Situation verhalten soll.', 0],
    ['Was sind Werte?', 'Vorstellungen davon, was Menschen wichtig finden.', 1],
    ['Was ist ein Kompromiss?', 'Eine gemeinsame Lösung, bei der Beteiligte jeweils einen Teil ihrer Wünsche aufgeben.', 2],
  ], [
    { type: 'choice', prompt: 'Welches Beispiel ist eine Regel?', options: ['Ehrlichkeit ist mir wichtig', 'Wir lassen andere ausreden', 'Blau ist meine Lieblingsfarbe'], answer: 'Wir lassen andere ausreden', explanation: 'Dieser Satz beschreibt ein gewünschtes Verhalten in einer Situation.', hint: 'Eine Regel sagt, wie man handeln soll.', fact: 0 },
    { type: 'short', prompt: 'Wie heißt eine gemeinsame Lösung, bei der beide Seiten einen Teil ihrer Wünsche aufgeben?', answer: 'Kompromiss', explanation: 'Bei einem Kompromiss kommen sich die Beteiligten entgegen.', hint: 'Der Begriff beginnt mit „Kom“.', fact: 2 },
    { type: 'choice', prompt: 'Welches Beispiel nennt der Text als Wert?', options: ['Ein Lineal', 'Ehrlichkeit', 'Ein Stundenplan'], answer: 'Ehrlichkeit', explanation: 'Ehrlichkeit kann Menschen wichtig sein und ist ein Beispiel für einen Wert.', hint: 'Es geht um eine Vorstellung vom guten Zusammenleben.', fact: 1 },
    { type: 'self', prompt: 'Zwei Kinder wollen in der Pause unterschiedliche Spiele spielen. Schlage eine faire Lösung vor und begründe sie.', answer: 'Zum Beispiel: Sie spielen heute das eine und morgen das andere Spiel, wenn beide zustimmen. So werden beide Wünsche berücksichtigt. Auch andere begründete Lösungen sind möglich.', explanation: 'Diese Aufgabe hat mehrere mögliche Antworten. Prüfe, ob du beide Kinder berücksichtigst und deine Idee begründest.', hint: 'Müssen beide Kinder etwas beitragen oder nachgeben?', fact: 2 },
  ]),
  unit('demo-mathe', 'mathe', 'Punkt vor Strich und Klammern', [
    'Bei Rechenaufgaben werden zuerst die Klammern berechnet.',
    'Danach werden Multiplikation und Division ausgeführt. Erst danach folgen Addition und Subtraktion. Diese Regel heißt Punkt vor Strich.',
    'Rechenzeichen mit gleichem Rang werden von links nach rechts bearbeitet.',
    'Beispiel: 2 + 3 · 4 = 2 + 12 = 14. Mit Klammern ändert sich der Rechenweg: (2 + 3) · 4 = 5 · 4 = 20.',
  ], [
    ['Was berechnest du zuerst?', 'Die Klammern.', 0],
    ['Was bedeutet Punkt vor Strich?', 'Multiplikation und Division kommen vor Addition und Subtraktion.', 1],
    ['Wie rechnest du bei gleichem Rang?', 'Von links nach rechts.', 2],
  ], [
    { type: 'choice', prompt: 'Was ist das Ergebnis von 2 + 3 · 4?', options: ['20', '14', '24', '9'], answer: '14', explanation: 'Zuerst 3 · 4 = 12, dann 2 + 12 = 14.', hint: 'Multipliziere zuerst.', fact: 3 },
    { type: 'short', prompt: 'Berechne (2 + 3) · 4. Schreibe nur das Ergebnis.', answer: '20', explanation: 'Zuerst die Klammer: 2 + 3 = 5. Dann 5 · 4 = 20.', hint: 'Die Klammer kommt vor der Multiplikation.', fact: 3 },
    { type: 'choice', prompt: 'Berechne 18 : 3 · 2. Welches Ergebnis stimmt?', options: ['3', '12', '27'], answer: '12', explanation: 'Division und Multiplikation haben den gleichen Rang. Von links nach rechts: 18 : 3 = 6, dann 6 · 2 = 12.', hint: 'Multiplikation kommt nicht grundsätzlich vor Division. Beachte die Reihenfolge von links nach rechts.', fact: 2 },
    { type: 'self', prompt: 'Ein Kind rechnet 2 + 3 · 4 = 20. Erkläre freundlich, wie es zu diesem Fehler gekommen sein könnte und wie es richtig geht.', answer: 'Vielleicht hat es zuerst 2 + 3 gerechnet. Ohne Klammern gilt Punkt vor Strich: erst 3 · 4 = 12, dann 2 + 12 = 14. Mit der Klammer (2 + 3) · 4 wäre 20 richtig.', explanation: 'Eine gute Erklärung nennt die Rechenregel und zeigt den korrekten Rechenweg.', hint: 'Vergleiche die Aufgabe mit und ohne Klammer.', fact: 3 },
  ]),
];

// Verweise auf Originalanbieter. Videos werden weder heruntergeladen noch automatisch transkribiert.
export const RESOURCES = [
  { id: 'schmidt-overview', provider: 'Lehrerschmidt', title: 'Mathematik nach Themen', url: 'https://www.lehrer-schmidt.de/mathematik/', topics: ['Grundrechenarten', 'Größen', 'Geometrie'], subject: 'mathe' },
  { id: 'schmidt-order', provider: 'Lehrerschmidt', title: 'Punkt vor Strich', url: 'https://www.youtube.com/watch?v=zEvWRs6BWos', topics: ['Punkt vor Strich', 'Rechenregeln'], subject: 'mathe' },
  { id: 'schmidt-brackets', provider: 'Lehrerschmidt', title: 'Rechnen mit Klammern', url: 'https://www.youtube.com/watch?v=99szI22KyYE', topics: ['Klammern', 'Rechenregeln'], subject: 'mathe' },
  { id: 'schmidt-units', provider: 'Lehrerschmidt', title: 'Längenmaße mit Wertetabelle', url: 'https://www.youtube.com/watch?v=-493P7bOZW4', topics: ['Größen', 'Längen', 'Einheiten'], subject: 'mathe' },
  { id: 'schmidt-channel', provider: 'Lehrerschmidt', title: 'Zum YouTube-Kanal', url: 'https://www.youtube.com/@lehrerschmidt', topics: ['Mathematik', 'Erklärvideos'], subject: 'mathe' },
  { id: 'jung-channel', provider: 'Mathe by Daniel Jung', title: 'Zum YouTube-Kanal', url: 'https://www.youtube.com/@MathebyDanielJung', topics: ['Mathematik', 'Erklärvideos'], subject: 'mathe' },
  { id: 'jung-overview', provider: 'Mathe by Daniel Jung', title: 'Angebote und Themen entdecken', url: 'https://danieljung.io/mathe-by-daniel-jung/', topics: ['Mathematik', 'Themenübersicht'], subject: 'mathe' },
];
