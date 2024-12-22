import React, { useState, useEffect } from 'react';
import FormInput from "./FormInput";
import "../css/quick-access-form.css";

function QuickAccessForm() {
    const [teamValue, setTeamValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false); // To control when to show suggestions

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/streaming/teams");
                if (response.ok) {
                    const data = await response.json();
                    setSuggestions(data);
                } else {
                    console.error("Failed to fetch suggestions");
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

        // Show suggestions only if the input length is greater than or equal to 3
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Input submitted:", teamValue);
    };

    const handleSuggestionClick = (teamName) => {
        setTeamValue(teamName);
        setShowSuggestions(false); // Hide suggestions after a selection
    };

    return (
        <div id="quick-access">
            <form id="quick-access-form" onSubmit={handleSubmit}>
                <FormInput
                    label="Team"
                    type="text"
                    name="teamValue"
                    id="teamValue"
                    placeholder="Team suchen"
                    value={teamValue}
                    onChange={handleInputChange}
                    required={true}
                    suggestions={filteredSuggestions}
                    showSuggestions={showSuggestions}
                    onSuggestionClick={handleSuggestionClick}
                />
                <input type="submit" value="Package suchen" className="submit button" />
            </form>
        </div>
    );
}

export default QuickAccessForm;
