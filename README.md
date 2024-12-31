# CHECK24 GenDev Streaming Package Comparison Challenge

## Overview

This project is a solution for the CHECK24 Best Combination Challenge from Flamur Maliqi.


##  Architecture

The project is structured as follows:

Backend (Quarkus):

1. Get Available Teams
- URL: /teams
- Method: GET
- Description: Liefert eine Liste aller verfügbaren Teams.


Response:

```
[
  "Deutschland",
  "Schottland"
]
```


2. Generate Streaming Package Coverage
- URL: /packages
- Method: POST
- Description: Gibt die Streaming-Pakete und deren Abdeckung für die angegebenen Teams zurück("Alle Spiele" is also a option").
Request Body:

```
[
  "Deutschland",
  "Schottland"
]

```

Response:

```
[
  [
    {
      "packageName": "MagentaTV - MegaSport",
      "monthlyPriceCents": null,
      "monthlyPriceYearlySubscriptionInCents": 6000,
      "coveredGames": [
        {
          "tournamentName": "UEFA Champions League 24/25",
          "gameInfos": [
            {
              "teamA": "Aston Villa",
              "teamB": "Bayern München",
              "live": true,
              "highlight": true
            },
            {
              "teamA": "FC Barcelona",
              "teamB": "Bayern München",
              "live": true,
              "highlight": true
            }
          ]
        },
        {
          "tournamentName": "Bundesliga 23/24",
          "gameInfos": [
            {
              "teamA": "Bayern München",
              "teamB": "RB Leipzig",
              "live": true,
              "highlight": true
            },
            {
              "teamA": "SC Freiburg",
              "teamB": "Bayern München",
              "live": true,
              "highlight": true
            }
          ]
        },
        {
          "tournamentName": "Bundesliga 24/25",
          "gameInfos": [
            {
              "teamA": "FC St. Pauli",
              "teamB": "Bayern München",
              "live": true,
              "highlight": true
            },
            {
              "teamA": "Bayern München",
              "teamB": "VfL Bochum",
              "live": true,
              "highlight": true
            }
          ]
        },
        {
          "tournamentName": "DFB Pokal 24/25",
          "gameInfos": [
            {
              "teamA": "FSV Mainz",
              "teamB": "Bayern München",
              "live": true,
              "highlight": true
            },
            {
              "teamA": "SSV Ulm 1846",
              "teamB": "Bayern München",
              "live": true,
              "highlight": true
            }
          ]
        }
      ]
    }
  ]
]
```

Frontend (React):

- Fetches data from the backend via API calls.

- Uses the GET endpoint to retrieve all available teams (including the option "Alle Spiele").

- Sends a selected list of teams to the POST endpoint to determine the best package combinations.

- Displays the resulting package combinations on a new page in a tabular format.



## How to Run the Project

Option 1: Watch the Demo Video

A detailed walkthrough of the application is available on YouTube: https://youtu.be/y1O-aGmKCb0.

Option 2: Run Locally

To run the project locally, follow these steps:

1. Clone the repository to your local machine.

2. Navigate to the project root directory.

3. Run the start_all.sh script:

```
./start_all.sh
```

This script will start both the frontend and backend services.

4. Access the application in your web browser at http://localhost:3000.
