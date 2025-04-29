import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function SplashScreen() {
    const navigate = useNavigate();
    const timeoutRef = useRef(null);

    useEffect(() => {
        // Clear any existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Set new timeout
        timeoutRef.current = setTimeout(() => {
            navigate("/Login");
        }, 1000);

        // Cleanup function
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [navigate]);

    return (
        <div
            style={{
                backgroundImage: "url('./src/assets/images/inicio.png')",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                width: "100vw"
            }}
        >
            <div className="App">
                <img
                    src="./src/assets/images/logo.png"
                    className="App-logo"
                    alt="logo"
                />
            </div>
        </div>
    );
}