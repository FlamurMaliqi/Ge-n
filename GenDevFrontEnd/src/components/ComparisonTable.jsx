import React, { useState } from "react";
import "../css/comparison-table.css";
import blackCross from "../images/blackCrossWithCircle.png";
import greenCropInCircle from "../images/greenCropInCircle.png";
import lightGreenCropInCircle from "../images/lightGreenCropInCircle.png";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const ComparisonTable = ({ data, selectedTeams }) => {
  // Function to remove duplicate games based on team names and tournament
  const removeDuplicateGames = (data) => {
    const seenGames = new Set();
  
    return data
      .map((packages) =>
        packages
          .map((pkg) => {
            const uniqueGames = pkg.coveredGames.filter((game) => {
              const gameIdentifier = `${game.teamA}-${game.teamB}-${game.tournamentName}`;
              if (seenGames.has(gameIdentifier)) {
                return false;
              }
              seenGames.add(gameIdentifier);
              return true;
            });
  
            return uniqueGames.length > 0
              ? { ...pkg, coveredGames: uniqueGames }
              : null; 
          })
          .filter((pkg) => pkg !== null) 
      )
      .filter((packages) => packages.length > 0); 
  };

  // Function to extract all unique package names
  const getPackageNames = (data) => {
    const packageNames = new Set();

    data.forEach((packages) => {
      packages.forEach((pkg) => {
        if (pkg.packageName) {
          packageNames.add(pkg.packageName);
        }
      });
    });

    return Array.from(packageNames); 
  };

  // Function to calculate monthly price for a package
  const calculateMonthlyPrice = (pkg) => {
    if (pkg.monthlyPriceCents !== null) {
      return pkg.monthlyPriceCents / 100; 
    } else if (pkg.monthlyPriceYearlySubscriptionInCents !== null) {
      return pkg.monthlyPriceYearlySubscriptionInCents / 12 / 100; 
    }
    return "0.00"; 
  };

  // Function to get prices for each package
  const getPrices = (data) => {
    const prices = {};

    data.forEach((packages) => {
      packages.forEach((pkg) => {
        if (pkg.packageName) {
          prices[pkg.packageName] = calculateMonthlyPrice(pkg);
        }
      });
    });

    return prices;
  };

  // Remove duplicate games and get filtered data
  const filteredData = removeDuplicateGames(data);
  const services = getPackageNames(filteredData);
  const prices = getPrices(filteredData);

  // State to manage which tournament is open and pagination
  const [openTournament, setOpenTournament] = useState(null);
  const [page, setPage] = useState(0); 

  // Toggle the visibility of a tournament's games
  const toggleTournament = (tournamentName) => {
    setOpenTournament((prevTournament) =>
      prevTournament === tournamentName ? null : tournamentName
    );
  };

  // Function to create a map of tournament names and their games
  const getTournamentGamesMap = (data) => {
    const tournamentMap = new Map();

    data.forEach((packages) => {
      packages.forEach((pkg) => {
        pkg.coveredGames.forEach((game) => {
          const tournamentName = game.tournamentName;

          if (!tournamentMap.has(tournamentName)) {
            tournamentMap.set(tournamentName, {});
          }

          const tournamentPackages = tournamentMap.get(tournamentName);
          tournamentPackages[pkg.packageName] = game.gameInfos;
          tournamentMap.set(tournamentName, tournamentPackages);
        });
      });
    });

    return tournamentMap;
  };

  const tournamentMap = getTournamentGamesMap(filteredData);

  // Function to get the icon based on the status (highlight, live)
  const getIconForStatus = (games, statusType) => {
    const allTrue = games.every((game) => game?.[statusType] === true);
    const allFalse = games.every((game) => game?.[statusType] === false);
    const someTrue = games.some((game) => game?.[statusType] === true);

    if (allTrue) {
      return greenCropInCircle;
    } else if (allFalse) {
      return blackCross;
    } else if (someTrue) {
      return lightGreenCropInCircle;
    }
    return blackCross;
  };

  // Calculate the total monthly price for all packages
  const totalMonthlyPrice = Object.values(prices).reduce((total, price) => {
    if (typeof price === "number") {
      return total + price;
    }
    return total;
  }, 0);

  // Function to slice games based on the current page for pagination
  const getGamesToDisplay = (games) => {
    const startIndex = page * 5;
    const endIndex = startIndex + 5;
    return games.slice(startIndex, endIndex);
  };

  return (
    <div id="comparison-table-div">
      <div id="white-box">
        <h2 className="header-table">Beste Paket-Kombination</h2>
        <div className="comparison-table">
          <table>
            <thead>
              <tr>
                <th>Turniere</th>
                {/* Render package names dynamically as table headers */}
                {services.map((service, index) => (
                  <th key={index}>
                    {service}
                    <div className="status-labels">
                      <div className="label">Highl.</div>
                      <div className="label">Live</div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Render each tournament */}
              {Array.from(tournamentMap.keys()).map(
                (tournamentName, tournamentIndex) => (
                  <React.Fragment key={tournamentIndex}>
                    <tr
                      onClick={() => toggleTournament(tournamentName)}
                      style={{ cursor: "pointer" }}
                    >
                      <td>
                        <span className="category-name">{tournamentName}</span>
                        <span className="dropdown-icon">
                          {openTournament === tournamentName ? (
                            <FaChevronUp />
                          ) : (
                            <FaChevronDown />
                          )}
                        </span>
                      </td>
                      {/* Render status icons for each service */}
                      {services.map((service) => (
                        <td key={service}>
                          <div className="status-icons">
                            {tournamentMap.get(tournamentName)?.[service] ? (
                              <>
                                <img
                                  src={getIconForStatus(
                                    tournamentMap.get(tournamentName)[service],
                                    "highlight"
                                  )}
                                  alt="Highlight Status"
                                  className="status-icon"
                                />
                                <img
                                  src={getIconForStatus(
                                    tournamentMap.get(tournamentName)[service],
                                    "live"
                                  )}
                                  alt="Live Status"
                                  className="status-icon"
                                />
                              </>
                            ) : (
                              <div>
                                <img
                                  src={blackCross}
                                  alt="No Coverage"
                                  className="status-icon"
                                />
                                <img
                                  src={blackCross}
                                  alt="No Coverage"
                                  className="status-icon"
                                />
                              </div>
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>
                    {/* Display games when the tournament is open */}
                    {openTournament === tournamentName &&
                      services.map(
                        (service) =>
                          tournamentMap.get(tournamentName)?.[service]?.length >
                            0 && (
                            <>
                              {getGamesToDisplay(
                                tournamentMap.get(tournamentName)[service]
                              ).map((game, gameIndex) => (
                                <tr key={`${service}-${gameIndex}`}>
                                  <td>
                                    {game.teamA} vs {game.teamB}
                                  </td>
                                  {services.map((colIndex) => (
                                    <td key={`${colIndex}-${gameIndex}`}>
                                      <div className="status-icons">
                                        {tournamentMap.get(tournamentName)?.[
                                          colIndex
                                        ] ? (
                                          <>
                                            <img
                                              src={getIconForStatus(
                                                [game],
                                                "highlight"
                                              )}
                                              alt="Highlight Status"
                                              className="status-icon"
                                            />
                                            <img
                                              src={getIconForStatus(
                                                [game],
                                                "live"
                                              )}
                                              alt="Live Status"
                                              className="status-icon"
                                            />
                                          </>
                                        ) : (
                                          <div>
                                            <img
                                              src={blackCross}
                                              alt="No Coverage"
                                              className="status-icon"
                                            />
                                            <img
                                              src={blackCross}
                                              alt="No Coverage"
                                              className="status-icon"
                                            />
                                          </div>
                                        )}
                                      </div>
                                    </td>
                                  ))}
                                </tr>
                              ))}
                              {/* Pagination buttons */}
                              {tournamentMap
                                .get(tournamentName)
                                ?.hasOwnProperty(service) &&
                                tournamentMap.get(tournamentName)[service]
                                  ?.length > 5 && (
                                  <tr>
                                    <td colSpan={services.length + 1}>
                                      <div className="pagination-buttons">
                                        <button
                                          onClick={() => setPage(page - 1)}
                                          disabled={page === 0}
                                          className="pagination-button"
                                        >
                                          <FaChevronUp />
                                        </button>
                                        <button
                                          className="pagination-button"
                                          onClick={() => setPage(page + 1)}
                                          disabled={
                                            tournamentMap.get(tournamentName)[
                                              service
                                            ]?.length <= page * 5 + 5
                                          }
                                        >
                                          <FaChevronDown />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                )}
                            </>
                          )
                      )}
                  </React.Fragment>
                )
              )}
            </tbody>
          </table>
        </div>
        {/* Display the total price */}
        <div className="total-price">
          <span className="total-price-label">Gesamtpreis:</span>
          <span className="total-price-value">
            €{totalMonthlyPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable;
