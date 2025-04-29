import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SplashScreen() {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate("/Login");
        }, 1000);
    })

    return (
        <div style={{ backgroundImage: "url('./src/assets/images/inicio.png')", display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%" }}>
            <div className="App">
                <img src="./src/assets/images/logo.png" className="App-logo" alt="logo" />
            </div>
        </div>
    );
}