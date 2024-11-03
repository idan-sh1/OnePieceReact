import { useEffect, useState } from "react";
import './custom.css';

const entry = {
    Id: "",
    name: "",
    bounty: 0,
    status: "",
    crew: ""
};

function Edit() {

    const [data, setData] = useState({});
    //const [name, setname] = useState("");
    //const [bounty, setBounty] = useState(0);
    //const [status, setstatus] = useState("");
    //const [crew, setcrew] = useState("");
    const [pid, setPid] = useState("");

    const updatePirate = ()=> {
        console.log("The updated pirate is: ", entry)

        fetch("pirates/" + pid, {
            method: "PUT",
            body: JSON.stringify(entry),
            headers: {
                "content-type": "application/json"
            }
        }).then(r => {
            console.log("Response for updating new pirate: ", r)
            window.location = "/";
        }).catch(e => console.log("Error updating new pirate: ", e))
    }

    const newData = (e) => {
        const name_ = e.target.name;
        let v_ = e.target.value

        if (name_ === "bounty") {
            v_ = Number(v_)
        }

        entry[name_] = v_;

        console.log("The updated pirate is: ", entry)
    }

    useEffect(() => {
        let id_ = window.location.search;
        if (id_) {
            id_ = id_.split("=")[1];
        }

        if (id_) {
            setPid(id_);

            fetch("pirates/" + id_).then(r => r.json()).then(d => {
                console.log("Pirate for update: ", d);
                //setBounty(d.bounty);
                setData(d);
                Object.assign(entry, d);
            }).catch(e => console.log("Error getting pirate for update: ", e));
        }

    }, []);

    // Set status defauld value to the current pirate's status in the database

    var isAlive = "";
    var isDead = "";
    var isCaptured = "";


    if (data.status == "Alive") {
        isAlive = "selected";
    } else if (data.status == "Dead") {
        isDead = "selected";
    } else if(data.status == "Captured") {
        isCaptured = "selected";
    }

    return (
        <section className="m-20">
            <div className="back-btn" onClick={() => { window.location.href = "/" }}>X</div>

            <h1>Update Pirate</h1>
            <div className="mt-10">
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" id="name" defaultValue={data.name} onChange={newData} />
            </div>
            <div className="mt-10">
                <label htmlFor="bounty">Bounty: </label>
                <input type="number" name="bounty" id="bounty" defaultValue={data.bounty} onChange={newData} />
            </div>
            <div className="mt-10">
                <label htmlFor="status">Status: </label>
                <select name="status" id="status" onChange={newData}>
                    <option value="Alive" selected={isAlive}>Alive</option>
                    <option value="Dead" selected={isDead}>Dead</option>
                    <option value="Captured" selected={isCaptured}>Captured</option>
                </select>
            </div>
            <div className="mt-10">
                <label htmlFor="crew">Crew: </label>
                <input type="text" name="crew" id="crew" defaultValue={data.crew} onChange={newData} />
            </div>
            <div className="mt-30 row p20 justify-btw">
                <div className="btn add" onClick={updatePirate}>Update</div>
            </div>
        </section>
    );
    
}

export default Edit;