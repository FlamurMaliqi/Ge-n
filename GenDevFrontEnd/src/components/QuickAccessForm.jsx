import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import FormInput from "./FormInput";
import "../css/quick-access-form.css";

function QuickAccessForm() {
    const [teamValue, setTeamValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedTeams, setSelectedTeams] = useState([]); // State for selected teams
    const navigate = useNavigate(); // Hook to navigate to other pages

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/streaming/teams");
                if (response.ok) {
                    const data = await response.json();
                    setSuggestions(data);
                } else {
                    console.error("Error fetching suggestions");
                }
            } catch (error) {
                console.error("Error fetching suggestions:", error);
            }
        };

        fetchSuggestions();
    }, []);

    const handleInputChange = (e) => {
        const input = e.target.value;
        setTeamValue(input);

        if (input.length >= 3) {
            setShowSuggestions(true);
            const filtered = suggestions.filter((team) =>
                team.toLowerCase().includes(input.toLowerCase())
            );
            setFilteredSuggestions(filtered);
        } else {
            setShowSuggestions(false);
            setFilteredSuggestions([]);
        }
    };

    const handleSuggestionClick = (teamName) => {
        if (!selectedTeams.includes(teamName)) {
            setSelectedTeams([...selectedTeams, teamName]); // Add team to selected teams
        }
        setTeamValue(""); // Clear the input field after selection
        setShowSuggestions(false); // Hide suggestions
    };

    const handleRemoveTeam = (teamName) => {
        setSelectedTeams(selectedTeams.filter((team) => team !== teamName)); // Remove team from selected list
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if any teams are selected
        if (selectedTeams.length === 0) {
            alert("Please select at least one team");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/streaming/packages", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedTeams),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Response data:', data); 

                navigate("/packages", { state: { selectedTeams, data } });
            } else {
                console.error("Error fetching packages");
            }
        } catch (error) {
            console.error("Error sending request:", error);
        }
    };

    return (
        <div id="quick-access">
            <form id="quick-access-form" onSubmit={handleSubmit}>
                <FormInput
                    label="Team"
                    type="text"
                    name="teamValue"
                    id="teamValue"
                    placeholder="Search for a team"
                    value={teamValue}
                    onChange={handleInputChange}
                    required={false}
                    suggestions={filteredSuggestions}
                    showSuggestions={showSuggestions}
                    onSuggestionClick={handleSuggestionClick}
                />
                <input type="submit" value="Search Package" className="submit button" />
                
                <div className="selected-teams">
                    {selectedTeams.map((team, index) => (
                        <div key={index} className="selected-team">
                            <span>{team}</span>
                            <button
                                type="button"
                                onClick={() => handleRemoveTeam(team)}
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
