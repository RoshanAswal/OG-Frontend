import { Link } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar"
import failed from "../../images/failed.png";

export const PaymentFailed=()=>{
    return (
        <div className="failedPay">
            <Navbar />
            <div id="info">
                <img src={failed} alt="failed" />
                <h1>Unfortunately your registration was failed</h1>
                <h2>Please <Link to="/contest">Go back</Link>  and try again</h2>
            </div>
        </div>
    )
};
