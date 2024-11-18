import React, { useState, useEffect } from 'react';
import '../css/quick-access-form.css';

function QuickAccessForm() {
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState('');
    const [teamSuggestions, setTeamSuggestions] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const minInputLength = 3;

    // API-Aufruf, um die Liste der Teams zu bekommen
    useEffect(() => {
        fetch('http://localhost:8080/api/streaming/teams')
            .then((response) => response.json())
            .then((data) => {
                setTeams(data);
                setSelectedTeam(data[0] || '');
            })
            .catch((error) => {
                console.error('Error fetching teams:', error);
            });
    }, []);

    // Event-Handler für die Eingabe des Teamnamens
    const handleInputChange = (e) => {
        const input = e.target.value;
        setInputValue(input);

        if (input.length >= minInputLength) {
            // Filtere die Teams basierend auf der Eingabe
            const filteredTeams = teams.filter((team) =>
                team.toLowerCase().includes(input.toLowerCase())
            );
            setTeamSuggestions(filteredTeams);
        } else {
            setTeamSuggestions([]);
        }
    };

    // Event-Handler für das Auswählen eines Teams aus den Vorschlägen
    const handleSuggestionClick = (team) => {
        setInputValue(team);
        setSelectedTeam(team);
        setTeamSuggestions([]);
    };

    // Event-Handler für das Auswahländerung des Teams
    const handleSelectChange = (e) => {
        setSelectedTeam(e.target.value);
    };

    return (
        <div id="quick-access">
            <form id="quick-access-form">
                <div className="form-input-wrapper">
                    <label htmlFor="team">Team</label>
                    <input
                        type="text"
                        id="team"
                        name="team"
                        value={inputValue}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="Team auswählen"
                    />
                    {teamSuggestions.length > 0 && (
                        <ul className="suggestions-list">
                            {teamSuggestions.map((team, index) => (
                                <li
                                    key={index}
                                    className="suggestion-item"
                                    onClick={() => handleSuggestionClick(team)}
                                >
                                    {team}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <input
                    type="submit"
                    value="Package suchen"
                    className="submit button"
                    disabled={!selectedTeam} // Button nur aktiv, wenn ein Team ausgewählt wurde
                />
            </form>
        </div>
    );
}

export default QuickAccessForm;