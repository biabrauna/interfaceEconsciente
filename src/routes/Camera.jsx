import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ImageUploader from "../components/image-uploader";
import { useEffect } from "react";


export default function Camera(){
    
    useEffect(() => {
    
      }, []);

    return(
        <div>
            <Navbar/>
            <ImageUploader/>
            <Footer/>
        </div>
    )
}