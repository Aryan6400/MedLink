import { Button } from "@mui/material";
import { usePage } from "../../../context/FormPageContext";
import { Divider, Grid } from "@mui/material";
import { SearchRounded as SearchRoundedIcon } from "@mui/icons-material/";
import "./FourthPage.css";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

function Fourth() {
    const [searchInput, setSearchInput] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);
    const { setPage, symptoms, setSymptoms } = usePage();

    const searchSymptoms = async (e) => {
        setSearchInput(e.target.value);
        if (e.target.value == "") return;
        setLoading(true);
        try {
            const response = await fetch(`https://medlink-ugwj.onrender.com/search-symptoms?search=${e.target.value}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const result = await response.json();
            setSearchResult(result);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    const handleSelect = (symptom) => {
        setSymptoms([...symptoms, symptom]);
        setSearchInput("");
    };

    const removeSymptom = (index) => {
        const newData = [...symptoms];
        newData.splice(index, 1);
        setSymptoms(newData);
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSelect(e.target.value);
        }
    };

    return (
        <div className="first-page">
            <div className="start-page-img"></div>
            <div className="fourth-page-dummy">
                <div className="first-page-content">
                    <h2 style={{ margin: "0px" }}>Symptoms</h2>
                    <div className="first-page-inputs fourth-page-inputs">

                        <Grid
                            className="mainSearchContainer"
                        >
                            <Grid
                                className="searchBar"
                                onClick={() => inputRef.current.focus()}
                            >
                                <>
                                    <SearchRoundedIcon
                                        style={{ padding: "0px 10px" }}
                                        className="searchIcon"
                                        color="primary"
                                        fontSize={"medium"}
                                    />
                                    <SearchRoundedIcon
                                        style={{ padding: "0px 10px" }}
                                        className="searchIconMobile"
                                        color="primary"
                                        fontSize={"small"}
                                    />
                                    <Divider orientation="vertical" variant="middle" flexItem />
                                </>
                                <input
                                    type="search"
                                    ref={inputRef}
                                    value={searchInput}
                                    placeholder="Search your symptom"
                                    onChange={searchSymptoms}
                                    onKeyDown={handleKeyPress}
                                    className="searchInput"
                                />
                                <button
                                    onClick={!loading ? () => handleSelect(searchInput) : (_) => { }}
                                    className="searchBtnLanding"
                                >
                                    {loading ? "Loading" : "Select"}
                                </button>
                            </Grid>
                            {searchInput !== "" && !loading && searchResult.length > 0 && (
                                <ul className="searchResults">
                                    {searchResult.map((result) => (
                                        <li
                                            onClick={() => handleSelect(result.name)}
                                            key={result.id}
                                        >
                                            <p style={{ margin: "10px 0px" }}>{result.name}</p>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </Grid>
                        <div className="selected-symptom-box">
                            {symptoms.map((symptom, index) => {
                                return (
                                    <span onClick={()=>removeSymptom(index)} className="selected-symptom-card" key={index}>{symptom}</span>
                                )
                            })}
                        </div>
                        <div className="first-page-ctas">
                            <Button onClick={() => setPage(prev => prev - 1)}>Previous</Button>
                            <Button onClick={symptoms.length>0 ? () => setPage(prev => prev + 1) : ()=>{alert("Choose atleast one symptom!")}}>Predict</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Fourth;