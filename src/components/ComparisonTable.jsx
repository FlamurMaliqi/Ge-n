import React, { useState } from "react";
import "../css/comparisonTable.css";
import blackCross from "../images/blackCrossWithCircle.png";
import greenCropInCircle from "../images/greenCropInCircle.png";
import lightGreenCropInCircle from "../images/lightGreenCropInCircle.png";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; 

const ComparisonTable = ({ data, selectedTeams }) => {

  // Dynamisch die Services (Package-Namen) aus den Daten extrahieren
  const getPackageNames = (data) => {
    const packageNames = new Set();
  
    data.forEach((packages) => {
      packages.forEach((pkg) => {
        if (pkg.packageName) {
          packageNames.add(pkg.packageName);
        }
      });
    });
  
    return Array.from(packageNames);  // Rückgabe als Array
  };

  // Dynamisch die Services aus den Daten extrahieren
  const services = getPackageNames(data);

  const [openTournament, setOpenTournament] = useState(null);

  const toggleTournament = (tournamentName) => {
    setOpenTournament((prevTournament) => (prevTournament === tournamentName ? null : tournamentName));
  };

  const getTournamentGamesMap = (data) => {
    const tournamentMap = new Map();

    data.forEach((packages) => {
      packages.forEach((pkg) => {
        pkg.coveredGames.forEach((game) => {
          const tournamentName = game.tournamentName;

          if (tournamentMap.has(tournamentName)) {
            const existingGameInfos = tournamentMap.get(tournamentName);
            tournamentMap.set(tournamentName, [...existingGameInfos, ...game.gameInfos]);
          } else {
            tournamentMap.set(tournamentName, game.gameInfos);
          }
        });
      });
    });

    return tournamentMap;
  };

  const tournamentMap = getTournamentGamesMap(data);

  // Funktion zur Berechnung des Icons basierend auf den Zuständen der Spiele
  const getIconForStatus = (games,statusType) => {
    const allTrue = games.every(game => game?.[statusType] === true);
    const allFalse = games.every(game => game?.[statusType] === false);
    const someTrue = games.some(game => game?.[statusType] === true);

    if (allTrue) {
      return greenCropInCircle;
    } else if (allFalse) {
      return blackCross;
    } else if (someTrue) {
      return lightGreenCropInCircle;
    }
    return blackCross;  // Default fallback
  };

  return (
    <div id="comparison-table-div">
      <div id="white-box">
        <div className="comparison-table">
          <table>
            <thead>
              <tr>
                <th>Tournament</th>
                {services.map((service, index) => (
                  <th key={index}>
                    {service}
                    <div className="status-labels">
                      <div className="label">Highl.</div>  {/* Highlight zuerst */}
                      <div className="label">Live</div>    {/* Live danach */}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Wir iterieren über alle Turniere im TournamentMap */}
              {Array.from(tournamentMap.keys()).map((tournamentName, tournamentIndex) => (
                <React.Fragment key={tournamentIndex}>
                  <tr onClick={() => toggleTournament(tournamentName)} style={{ cursor: "pointer" }}>
                    <td>
                      <span className="category-name">
                        {tournamentName} {/* Turniername als Titel */}
                      </span>
                      <span className="dropdown-icon">
                        {openTournament === tournamentName ? <FaChevronUp /> : <FaChevronDown />}
                      </span>
                    </td>
                    {services.map((service, colIndex) => (
                      <td key={colIndex}>
                        <div className="status-icons">
                          {/* Highlight-Status */}
                          <img
                            src={getIconForStatus(tournamentMap.get(tournamentName),  "highlight")}
                            alt="Highlight Status"
                            className="status-icon"
                          />
                          
                          {/* Live-Status */}
                          <img
                            src={getIconForStatus(tournamentMap.get(tournamentName), "live")}
                            alt="Live Status"
                            className="status-icon"
                          />
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Bedingte Anzeige der Spiele */}
                  {openTournament === tournamentName && tournamentMap.get(tournamentName).map((game, gameIndex) => (
                    <tr key={gameIndex}>
                      <td>{game.teamA} vs {game.teamB}</td> 
                      {services.map((colIndex) => (
                        <td key={colIndex}>
                          <div className="status-icons">
                            {/* Highlight-Status */}
                            <img
                              src={getIconForStatus([game], "highlight")}
                              alt="Highlight Status"
                              className="status-icon"
                            />

                            {/* Live-Status */}
                            <img
                              src={getIconForStatus([game],"live")}
                              alt="Live Status"
                              className="status-icon"
                            />
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable;
