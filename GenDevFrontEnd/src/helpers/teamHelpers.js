export const handleInputChange = (input, suggestions, setTeamValue, setShowSuggestions, setFilteredSuggestions) => {
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

export const fetchSuggestions = async (setSuggestions) => {
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


export const handleSuggestionClick = (teamName, selectedTeams, setSelectedTeams, setTeamValue, setShowSuggestions) => {
    if (!selectedTeams.includes(teamName)) {
        setSelectedTeams([...selectedTeams, teamName]);
    }
    setTeamValue("");
    setShowSuggestions(false);
};

export const handleRemoveTeam = (teamName, selectedTeams, setSelectedTeams) => {
    setSelectedTeams(selectedTeams.filter((team) => team !== teamName));
};

export const handleSubmit = async (selectedTeams, navigate) => {
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
