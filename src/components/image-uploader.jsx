import { useState } from 'react';
import uploadImage from '../assets/images/upload (2).png';
import api from '../services/api';
import { useParams } from 'react-router-dom';
export default function ImageUploader() {
  const [imageUrl, setImageUrl] = useState(uploadImage);
  const [errorMessage, setErrorMessage] = useState('');
  const [url, setUrl] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState(''); // 'success' ou 'error'
  const { id } = useParams();
 
    const handlePostarFoto = async (e) => {
      e.preventDefault();
      try{
        await api.post('https://api-register-users-rrgg-one.vercel.app/posts', {
        url: url,
        userId: id,
        likes: 0
      });
      setAlertMessage('Foto postada com sucesso! A foto irá para análise e, em breve, seus pontos serão computados.');
      setAlertType('success');
      setTimeout(() => setAlertMessage(''), 5000); // Alerta desaparece após 3 segundos
    } catch (error) {
      setAlertMessage('Erro ao postar a foto. Tente novamente.');
      setAlertType('error');
      console.log(error);
      setTimeout(() => setAlertMessage(''), 3000);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      setErrorMessage('Please select a file to upload.'); // Handle no file selected
      return;
    }
    
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "tonmaj4q"); // Replace with your Cloudinary preset
    data.append("cloud_name", "dnulz0tix"); // Replace with your Cloudinary cloud name

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dnulz0tix/image/upload", {
        method: "POST",
        body: data,
      });

      const urlData = await res.json();
      console.log(urlData.public_id);
      setUrl(`https://res.cloudinary.com/dnulz0tix/image/upload/v1733788670/${urlData.public_id}`)
      console.log(url);
      if (!urlData.url) {
        setErrorMessage('Erro uploading imagem'); // Handle Cloudinary error
      } else {
        setImageUrl(urlData.url); // Update state with the uploaded image URL
      }
    } catch (error) {
      setErrorMessage(`Erro uploading imagem: ${error.message}`); // Handle upload errors gracefully
    }
  };



  return (
    <div className="image-uploader">
      <p>Vamos registrar suas conquistas? Registre sua coleta seletiva e incentive outros!</p>
      <div className="container-image">
        <div className="file-upload">
          <div className="upload-container">
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {(
              // biome-ignore lint/a11y/noRedundantAlt: <explanation>
              imageUrl && <img src={imageUrl} alt="Uploaded image" className="image" />
            )}
            <input
              type="file"
              className="file-input"
              id="file"
              onChange={(e) => handleFileUpload(e)}
            />
            
            <button type="submit" className="upload-button" onClick={(e) =>handlePostarFoto(e)}>Postar foto</button>
            {alertMessage && (
        <div className={`alert ${alertType}`}>
          {alertMessage}
        </div>
      )}
          </div>
        </div>

      </div>
    </div>
  );
}
