#!/bin/bash

# Stelle sicher, dass die Skripte ausführbar sind
echo "Mache die Skripte ausführbar..."
chmod +x start_backend.sh
chmod +x start_frontend.sh

# Starte das Backend-Skript
echo "Starte das Backend..."
./start_backend.sh &

# Warte 10 Sekunden, um sicherzustellen, dass das Backend startet
echo "Warte 10 Sekunden..."
sleep 10

# Starte das Frontend-Skript
echo "Starte das Frontend..."
./start_frontend.sh
