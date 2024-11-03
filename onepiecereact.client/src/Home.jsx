import { useEffect, useState } from 'react';
import './custom.css';
import SearchFilter from './Search.jsx';

function Home() {
    const [pirates, setPirates] = useState(); // State to hold pirates data
    const [pid, setPid] = useState(""); // State to hold the ID of the pirate to delete

    // Function to toggle delete modal visibility
    const handleModal = (hide) => {
        const deleteModal = document.querySelector(".delete-modal");
        if (deleteModal) {
            if (hide) {
                deleteModal.classList.add("hidden");
            } else {
                deleteModal.classList.remove("hidden");
            }
        }
    };

    // Function to open delete modal for a specific pirate
    const openDeleteModal = (id) => {
        setPid(id);
        handleModal(false);
    };

    // Function to delete a pirate by ID
    const deletePirate = () => {
        fetch("pirates/" + pid, {
            method: "DELETE",
        }).then(r => {
            console.log("Response for deleting a pirate: ", r);
            handleModal(true);
            window.location.reload(); // Refresh the page after deletion
        }).catch(e => console.log("Error deleting a pirate: ", e));
    };

    // Populate pirates data when the component mounts
    useEffect(() => {
        populatePiratesData();
    }, []);

    // Show loading message if pirates data is undefined
    const contents = pirates === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Bounty</th>
                    <th>Status</th>
                    <th>Crew</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {pirates.map(pirate =>
                    <tr key={pirate.Id}>
                        <td>{pirate.name}</td>
                        <td>{pirate.bounty}</td>
                        <td>{pirate.status}</td>
                        <td>{pirate.crew}</td>
                        <td><center><div className="btn cancel" onClick={() => { window.location.href = "/edit?id=" + pirate.Id }}>Edit</div></center></td>
                        <td><center><div className="btn delete" onClick={() => { openDeleteModal(pirate.Id); }}>Delete</div></center></td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <main>
            <div className="add-btn" onClick={() => { window.location.href = "/new" }}>+</div>

            <div>
                <h1 id="tableLabel">Pirates List</h1>

                <SearchFilter setPirates={setPirates} /> {/* Pass setPirates to allow SearchFilter to update the list */}

                {contents}

                <section className="delete-modal hidden">
                    <div className="modal-item">
                        <h3>Delete Pirate</h3>
                        <p>Are you sure you want to delete this pirate?</p>
                        <div className="row mt-20 justify-btw">
                            <div className="btn cancel" onClick={() => { handleModal(true); }}>Cancel</div>
                            <div className="btn delete" onClick={deletePirate}>Delete</div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );

    // Function to populate pirates data from the server
    async function populatePiratesData() {
        const response = await fetch('pirates');
        const data = await response.json();
        setPirates(data); // Set the pirates state with the fetched data
    }
}

export default Home;
