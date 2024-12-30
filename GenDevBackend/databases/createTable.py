import pandas as pd
import os

# Lade die CSV-Datei (nehmen wir an, sie heißt 'bc_streaming_offer.csv')
input_file = './data/bc_streaming_offer.csv'

# Ermittle das Verzeichnis der Eingabedatei
input_directory = os.path.dirname(os.path.abspath(input_file))

# Lade die CSV-Datei in ein DataFrame
df = pd.read_csv(input_file)

# Erstelle ein Dictionary, das für jedes Paket die zugehörigen game_ids enthält
package_to_game_ids = {}

# Durch alle Zeilen der Tabelle iterieren
for _, row in df.iterrows():
    package_id = row['streaming_package_id']
    game_id = row['game_id']
    
    if package_id not in package_to_game_ids:
        package_to_game_ids[package_id] = set()
    
    # Füge die game_id für das jeweilige Paket hinzu
    package_to_game_ids[package_id].add(int(game_id))  # Sicherstellen, dass es ein 'int' ist

# Umstrukturierte Daten als Liste von Tupeln
restructured_data = [(package_id, sorted(list(game_ids))) for package_id, game_ids in package_to_game_ids.items()]

# Umstrukturierte Daten als DataFrame
restructured_df = pd.DataFrame(restructured_data, columns=['streaming_package_id', 'covered_game_ids'])

# Konvertiere die 'covered_game_ids' in das PostgreSQL-kompatible Format
# Statt der eckigen Klammern und Anführungszeichen in der Liste verwenden wir geschweifte Klammern
restructured_df['covered_game_ids'] = restructured_df['covered_game_ids'].apply(lambda x: "{" + ",".join(map(str, x)) + "}")

# Der Pfad zur neuen CSV-Datei im gleichen Verzeichnis
output_file = os.path.join(input_directory, 'restructured_bc_streaming_offer.csv')

# Speichern der umstrukturierten Daten in einer neuen CSV-Datei (Datei wird überschrieben, wenn sie existiert)
# Keine Escape- oder Quoting-Optionen
restructured_df.to_csv(output_file, index=False, mode='w', header=True,  quotechar='"')

# Ausgabe der neuen CSV-Datei
print(f"Die umstrukturierte Datei wurde gespeichert als: {output_file}")
