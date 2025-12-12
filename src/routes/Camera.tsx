import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ImageUploader from "@/components/ImageUploader";

export default function Camera() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1A211A 0%, #2a3a2a 100%)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Navbar />
      <ImageUploader />
      <Footer />
    </div>
  );
}