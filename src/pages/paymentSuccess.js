import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar"
import success from "../images/success.png";

export const Paymentsuccess=()=>{
    return (
        <div className="successPay">
            <Navbar />
            <div>
                <img src={success} alt="success" />
                <h1>Congratulations your registration was Successful</h1>
                <h2>Please <Link to="/contest">Go back</Link>  and refresh contest page</h2>
            </div>
        </div>
    )
};
