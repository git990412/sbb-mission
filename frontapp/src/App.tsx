import {useEffect} from "react";
import axios from "axios";

function App() {
    useEffect(() => {
        axios.get("/api/sbb")
    })
    return (
        <>
        </>
    )
}

export default App
