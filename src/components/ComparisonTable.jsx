import React from "react";
import "../css/comparisonTable.css";
import blackCross from "../images/blackCrossWithCircle.png";
import greenCropInCircle from "../images/greenCropInCircle.png";

const ComparisonTable = () => {
  const data = [
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
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td>{row.category}</td>
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable;
