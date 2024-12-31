#!/bin/bash

echo "Warte 30 Sekunden auf den Backend-Start..."
sleep 20

cd GenDevFrontEnd

echo "Baue die React-App..."
docker build -t react-app .

echo "Starte die React-App..."
docker run -p 3000:3000 react-app
