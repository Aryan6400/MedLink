import "./AIAssist.css";
import { usePage } from "../../context/FormPageContext";
import Start from "./FormPages/Start";
import First from "./FormPages/First";
import Second from "./FormPages/Second";
import Third from "./FormPages/Third";
import Fourth from "./FormPages/Fourth";
import Verdict from "./FormPages/Verdict";
import Footer from "../Footer/Footer";

function AIAssist() {
    const { page } = usePage();

    return (
        <>
            <div className="AI-assist-page">
                {page == 0 && <Start />}
                {page == 1 && <First />}
                {page == 2 && <Second />}
                {page == 3 && <Third />}
                {page == 4 && <Fourth />}
                {page == 5 && <Verdict />}
            </div>
            <Footer />
        </>
    )
}

export default AIAssist;