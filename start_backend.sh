#!/bin/bash

cd GenDevBackend/databases

echo "Stoppe und entferne laufende Docker-Container und Volumes..."
docker-compose down -v

echo "Starte docker-compose..."
docker-compose up -d

cd ..

echo "Starte Quarkus im Dev-Modus..."
quarkus dev
