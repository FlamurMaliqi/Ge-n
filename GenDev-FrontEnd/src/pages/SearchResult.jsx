import React from 'react';
import '../styles/styles.css';

const ComparisonTable = () => {
  return (
    <div className="comparison-table">
      <div className="header">
        <div className="header-item"></div>
        <div className="header-item">
          <div className="header-content">
            <div>MegaSport</div>
            <div className="sub-content">Live &nbsp;&nbsp; Highl.</div>
          </div>
        </div>
        <div className="header-item">
          <div className="header-content">
            <div>Prime Video</div>
            <div className="sub-content">Live &nbsp;&nbsp; Highl.</div>
          </div>
        </div>
        <div className="header-item">
          <div className="header-content">
            <div>Premium</div>
            <div className="sub-content">Live &nbsp;&nbsp; Highl.</div>
          </div>
        </div>
        <div className="header-item">
          <div className="header-content">
            <div>Perfect Plus</div>
            <div className="sub-content">Live &nbsp;&nbsp; Highl.</div>
          </div>
        </div>
        <div className="header-item">
          <div className="header-content">
            <div>GigaTV Cable</div>
            <div className="sub-content">Live &nbsp;&nbsp; Highl.</div>
          </div>
        </div>
        <div className="header-item">
          <div className="header-content">
            <div>SMART HD...</div>
            <div className="sub-content">Live &nbsp;&nbsp; Highl.</div>
          </div>
        </div>
      </div>
      {/* Rows and Footer code remain the same */}
      <div className="row">
        <div className="row-header">LeLiga</div>
        <div className="row-item">
        <div className="sub-content">
          <span className="checkmark">✔️</span>️ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span className="checkmark">✔️</span>️</div>
        </div>
        <div className="row-item">
          <span className="checkmark">✔️</span>️ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span className="checkmark">✔️</span>
        </div>
        <div className="row-item">
        <span className="checkmark">✔️</span>️ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span className="checkmark">✔️</span>️
        </div>
        <div className="row-item">
          <span className="cross">❌</span>️ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span className="cross">❌</span>️
        </div>
        <div className="row-item">
          <span className="cross">❌</span>️ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span className="cross">❌</span>️
        </div>
        <div className="row-item">
          <span className="cross">❌</span>️ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span className="cross">❌</span>️
        </div>
      </div>
      {/* Repeat the row structure as needed */}
      <div className="footer">
        <div className="footer-item"></div>
        <div className="footer-item"><button>Details</button></div>
        <div className="footer-item"><button>Details</button></div>
        <div className="footer-item"><button>Details</button></div>
        <div className="footer-item"><button>Details</button></div>
        <div className="footer-item"><button>Details</button></div>
        <div className="footer-item"><button>Details</button></div>
      </div>
    </div>
  );
};

export default ComparisonTable;
