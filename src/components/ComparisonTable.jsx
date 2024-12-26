import React, { useState } from "react";
import "../css/comparisonTable.css";
import blackCross from "../images/blackCrossWithCircle.png";
import greenCropInCircle from "../images/greenCropInCircle.png";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; 

const ComparisonTable = ({ data, selectedTeams }) => {
  const testData = [
    {
      category: "LeLiga",
      MegaSport: true,
      PrimeVideo: true,
      Premium: false,
      GigaTV: true,
      SmartHD: true,
    },
    {
      category: "2. BL",
      MegaSport: true,
      PrimeVideo: true,
      Premium: true,
      GigaTV: true,
      SmartHD: true,
    },
    {
      category: "DFB-Pokal",
      MegaSport: true,
      PrimeVideo: false,
      Premium: true,
      GigaTV: true,
      SmartHD: true,
    },
    {
      category: "Supercup",
      MegaSport: true,
      PrimeVideo: true,
      Premium: true,
      GigaTV: true,
      SmartHD: true,
    },
    {
      category: "Premier L.",
      MegaSport: false,
      PrimeVideo: false,
      Premium: false,
      GigaTV: true,
      SmartHD: true,
    },
  ];

  const services = ["MegaSport", "PrimeVideo", "Premium", "GigaTV", "SmartHD"];

  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (category) => {
    setOpenCategory((prevCategory) => (prevCategory === category ? null : category));
  };

  return (
    <div id="comparison-table-div">
      <div id="white-box">
        <div className="comparison-table">
          <table>
            <thead>
              <tr>
                <th>Category</th>
                {services.map((service, index) => (
                  <th key={index}>
                    {service}
                    <div className="status-labels">
                      <div className="label">Live</div>
                      <div className="label">Highl.</div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {testData.map((row, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  <tr onClick={() => toggleCategory(row.category)} style={{ cursor: "pointer" }}>
                    <td>
                      <span className="category-name">
                        {row.category}
                      </span>
                      <span className="dropdown-icon">
                        {openCategory === row.category ? <FaChevronUp /> : <FaChevronDown />}
                      </span>
                    </td>
                    {services.map((service, colIndex) => (
                      <td key={colIndex}>
                        <div className="status-icons">
                          <img
                            src={greenCropInCircle}
                            alt="Crop"
                            className={`status-icon crop ${
                              row[service] ? "" : "hidden"
                            }`}
                          />
                          <img
                            src={blackCross}
                            alt="Cross"
                            className={`status-icon ${
                              !row[service] ? "" : "hidden"
                            }`}
                          />
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Bedingte Anzeige der zusätzlichen Zeile */}
                  {openCategory === row.category && (
                    <tr>
                      <td colSpan={6}>
                        <div className="additional-info">
                          <ul>
                            <li>Additional info for {row.category}</li>
                            <li>Details about the services and category...</li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  )}
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
