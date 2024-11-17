import React from 'react';
import '../styles/quick-access-form.css';

function QuickAccessForm() {
    return (
        <div id="quick-access">
            <form id="quick-access-form">
                <div className="form-input-wrapper">
                    <label htmlFor="fromStopName">Abfahrtsort</label>
                    <input
                        type="text"
                        name="fromStopName"
                        id="fromStopName"
                        placeholder="Abfahrtsort"
                        value="Berlin"
                        className="form-input"
                        readOnly
                    />
                </div>

                <div className="form-input-wrapper">
                    <label htmlFor="toStopName">Ankunftsort</label>
                    <input
                        type="text"
                        name="toStopName"
                        id="toStopName"
                        placeholder="Ankunftsort"
                        value="München"
                        className="form-input"
                        readOnly
                    />
                </div>

                <div className="form-input-wrapper">
                    <label>Zeit
                        <select
                            className="form-input"
                            id="time"
                            value="Abfahrt"
                            disabled
                        >
                            <option value="Abfahrt">Abfahrt</option>
                            <option value="Ankunft">Ankunft</option>
                        </select>
                    </label>
                </div>

                <div className="form-input-wrapper">
                    <label htmlFor="time">Abfahrtszeit</label>
                    <input
                        type="text"
                        id="time"
                        value="16.11.2024 15:00"
                        className="form-input"
                        readOnly
                    />
                </div>

                <div className="form-input-wrapper">
                    <label htmlFor="pax">Personen</label>
                    <input
                        type="number"
                        name="pax"
                        id="pax"
                        placeholder="20"
                        value={1}
                        className="form-input"
                        readOnly
                    />
                </div>

                <input type="submit" value="Verbindungen suchen" className="submit button" disabled />
            </form>
        </div>
    );
}

export default QuickAccessForm;
