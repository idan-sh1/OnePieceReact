import React, { useEffect, useState } from 'react';

const SearchFilter = ({ setPirates }) => { // Accept setPirates as a prop to update pirate list

    // Set up initial state
    const [entry, setEntry] = useState({
        name: '',
        min_bounty: null,
        max_bounty: null,
        status: '',
        crew: ''
    });

    const [message, setMessage] = useState('');

    // Handle input changes
    const searchData = (e) => {
        const name_ = e.target.name;
        let v_ = e.target.value;

        // Handle number fields specifically
        if (name_ === "min_bounty" || name_ === "max_bounty") {
            v_ = v_ ? Number(v_) : null; // Convert to number or set to null
        }

        setEntry((prevEntry) => ({
            ...prevEntry,
            [name_]: v_ // Update specific field in entry
        }));

        console.log("The new pirate is: ", { ...entry, [name_]: v_ });
    };

    // Function to clear search data
    const clearSearch = () => {
        setEntry({
            name: '',
            min_bounty: null,
            max_bounty: null,
            status: '',
            crew: ''
        });
        setMessage(''); // Clear the message
        fetchAllPirates(); // Fetch all pirates when clearing the search
    };

    // Function to run the search
    const runSearch = () => {
        console.log("Running search with: ", entry);

        if (!entry.name && !entry.min_bounty && !entry.max_bounty && !entry.status && !entry.crew) {
            // If all fields are empty, fetch all pirates
            fetchAllPirates();
            return;
        }

        fetch("pirates/search", {
            method: "POST", // Use POST to send the body
            body: JSON.stringify(entry),
            headers: {
                "Content-Type": "application/json" // Use "Content-Type" instead of "content-type"
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json(); // Parse the JSON response
            })
            .then(data => {
                console.log("Response for running search: ", data);
                setPirates(data); // Update the pirates list with filtered data
                //setMessage("Data is filtered");
            })
            .catch(e => {
                console.log("Error running search: ", e);
                setMessage("Error filtering data");
            });
    };

    // Function to fetch all pirates
    const fetchAllPirates = () => {
        fetch('pirates')
            .then(response => response.json())
            .then(data => {
                setPirates(data); // Update the pirates list with all data
                //setMessage("All pirates retrieved");
            })
            .catch(e => {
                console.log("Error fetching all pirates: ", e);
                setMessage("Error fetching pirates");
            });
    };

    return (
        <section className="m-20">
            <div>
                <h2>Search</h2>
            </div>

            <div className="mt-10">
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" id="name" value={entry.name} onChange={searchData} />
            </div>
            <div className="mt-10">
                <label htmlFor="bounty">Bounty: </label>
                <input type="number" name="min_bounty" placeholder="min." id="min_bounty" value={entry.min_bounty !== null ? entry.min_bounty : ''} onChange={searchData} />
                <input type="number" name="max_bounty" placeholder="max." id="max_bounty" value={entry.max_bounty !== null ? entry.max_bounty : ''} onChange={searchData} />
            </div>
            <div className="mt-10">
                <label htmlFor="status">Status: </label>
                <select name="status" id="status" value={entry.status} onChange={searchData}>
                    <option value="">All</option>
                    <option value="Alive">Alive</option>
                    <option value="Dead">Dead</option>
                    <option value="Captured">Captured</option>
                </select>
            </div>
            <div className="mt-10">
                <label htmlFor="crew">Crew: </label>
                <input type="text" name="crew" id="crew" value={entry.crew} onChange={searchData} />
            </div>
            <div className="row mt-30 justify-ctr">
                <div className="btn cancel" onClick={clearSearch}>Clear</div>
                <div className="btn search" onClick={runSearch}>Search</div>
            </div>
            <p>{message}</p> {/* Display any messages to the user */}
        </section>
    );
};

export default SearchFilter;
