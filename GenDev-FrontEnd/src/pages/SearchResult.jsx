import React from 'react';
import '../styles/styles.css'

const ComparisonTable = () => {
  return (
    <div className="comparison-table">
      <div className="header">
        <div className="header-item"></div>
        <div className="header-item">MegaSport</div>
        <div className="header-item">Prime Video</div>
        <div className="header-item">Premium</div>
        <div className="header-item">Perfect Plus</div>
        <div className="header-item">GigaTV Cable</div>
        <div className="header-item">SMART HD...</div>
      </div>
      <div className="row">
        <div className="row-header">LeLiga</div>
        <div className="row-item"><span className="checkmark">✔️</span></div>
        <div className="row-item"><span className="checkmark">✔️</span></div>
        <div className="row-item"><span className="cross">❌</span></div>
        <div className="row-item"><span className="cross">❌</span></div>
        <div className="row-item"><span className="checkmark">✔️</span></div>
        <div className="row-item"><span className="checkmark">✔️</span></div>
      </div>
      {/* Repeat the row structure for each row in your table */}
      <div className="row">
        <div className="row-header">2. BL</div>
        <div className="row-item"><span className="checkmark">✔️</span></div>
        <div className="row-item"><span className="checkmark">✔️</span></div>
        <div className="row-item"><span className="cross">❌</span></div>
        <div className="row-item"><span className="cross">❌</span></div>
        <div className="row-item"><span className="checkmark">✔️</span></div>
        <div className="row-item"><span className="checkmark">✔️</span></div>
      </div>
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