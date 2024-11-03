import './custom.css';

const entry = {
    Id: "",
    name: "",
    bounty: 0,
    status: "",
    crew: ""
};

function New() {

    const addNewPirate = ()=> {
        console.log("The new pirate is: ", entry)

        fetch("pirates", {
            method: "POST",
            body: JSON.stringify(entry),
            headers: {
                "content-type": "application/json"
            }
        }).then(r => {
            console.log("Response for adding new pirate: ", r)
            window.location = "/";
        }).catch(e => console.log("Error adding new pirate: ", e))
    }

    const newData = (e) => {
        const name_ = e.target.name;
        let v_ = e.target.value

        if (name_ === "bounty") {
            v_ = Number(v_)
        }

        entry[name_] = v_;

        // Make sure the pirate status isn't empty (in case we don't changing the status in the form)
        if (entry["status"] == "") {
            entry["status"] = "Alive";
        }

        console.log("The new pirate is: ", entry)
    }


    return (
        <section className="m-20">
            <div className="back-btn" onClick={() => { window.location.href = "/" }}>X</div>

            <h1>Add Pirate</h1>
            <div className="mt-10">
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" id="name" onChange={newData} />
            </div>
            <div className="mt-10">
                <label htmlFor="bounty">Bounty: </label>
                <input type="number" name="bounty" id="bounty" onChange={newData} />
            </div>
            <div className="mt-10">
                <label htmlFor="status">Status: </label>
                <select name="status" id="status" onChange={newData}>
                    <option value="Alive" selected="selected">Alive</option>
                    <option value="Dead">Dead</option>
                    <option value="Captured">Captured</option>
                </select>
            </div>
            <div className="mt-10">
                <label htmlFor="crew">Crew: </label>
                <input type="text" name="crew" id="crew" onChange={newData} />
            </div>
            <div className="mt-30 row p20 justify-btw">
                <div className="btn add" onClick={addNewPirate}>Add</div>
            </div>
        </section>
    );
    
}

export default New;