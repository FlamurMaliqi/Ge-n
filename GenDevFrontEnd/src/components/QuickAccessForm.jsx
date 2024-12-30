import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from "./FormInput";
import "../css/quick-access-form.css";
import {
    handleInputChange,
    handleSuggestionClick,
    handleRemoveTeam,
    handleSubmit,
    fetchSuggestions, // Importiere fetchSuggestions
} from '../helpers/teamHelpers';

function QuickAccessForm() {
    const [teamValue, setTeamValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedTeams, setSelectedTeams] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchSuggestions(setSuggestions); // Verwende die ausgelagerte Funktion
    }, []);

    return (
        <div id="quick-access">
            <form id="quick-access-form" onSubmit={(e) => { 
                e.preventDefault(); 
                handleSubmit(selectedTeams, navigate); 
            }}>
                <FormInput
                    label="Team"
                    type="text"
                    name="teamValue"
                    id="teamValue"
                    placeholder="Search for a team"
                    value={teamValue}
                    onChange={(e) =>
                        handleInputChange(
                            e.target.value,
                            suggestions,
                            setTeamValue,
                            setShowSuggestions,
                            setFilteredSuggestions
                        )
                    }
                    required={false}
                    suggestions={filteredSuggestions}
                    showSuggestions={showSuggestions}
                    onSuggestionClick={(teamName) =>
                        handleSuggestionClick(
                            teamName,
                            selectedTeams,
                            setSelectedTeams,
                            setTeamValue,
                            setShowSuggestions
                        )
                    }
                />
                <input type="submit" value="Search Package" className="submit button" />
                
                <div className="selected-teams">
                    {selectedTeams.map((team, index) => (
                        <div key={index} className="selected-team">
                            <span>{team}</span>
                            <button
                                type="button"
                                onClick={() =>
                                    handleRemoveTeam(team, selectedTeams, setSelectedTeams)
                                }
                                className="remove-team-button"
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                </div>
            </form>
        </div>
    );
}

export default QuickAccessForm;
