import { useState, useEffect } from 'react';
import uploadImage from '../assets/images/upload (2).png';
import api from '../services/api';

export default function ImageUploader() {
  const [imageUrl, setImageUrl] = useState(uploadImage);
  const [errorMessage, setErrorMessage] = useState('');
  const [url, setUrl] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState(''); // 'success' ou 'error'
  const [isUploading, setIsUploading] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const me = await api.get('/auth/me');
        setUserId(me.data.id);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);
 
  const handlePostarFoto = async (e) => {
    e.preventDefault();
    try{
      await api.post('/posts', {
      url: url,
      userId: userId,
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
  
  setIsUploading(true);
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
      setErrorMessage(''); // Clear any previous errors
    }
  } catch (error) {
    setErrorMessage(`Erro uploading imagem: ${error.message}`); // Handle upload errors gracefully
  } finally {
    setIsUploading(false);
  }
};

  return (
    <div style={{
      minHeight: '100vh',
      marginTop: '20%',
      marginBottom: '20%',
      padding: '20px',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        {/* Upload Container */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          textAlign: 'center'
        }}>
          
          {/* Title inside upload container */}
          <h1 style={{
            fontSize: window.innerWidth <= 768 ? '2rem' : '2.5rem',
            fontWeight: '700',
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '0 0 15px 0',
            letterSpacing: '-0.02em'
          }}>
            📸 Registrar Conquista
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: '#64748b',
            margin: '0 0 30px 0',
            fontWeight: '400',
            lineHeight: '1.6'
          }}>
            Vamos registrar suas conquistas? Registre sua coleta seletiva e incentive outros!
          </p>
          {/* Error Message */}
          {errorMessage && (
            <div style={{
              background: 'linear-gradient(45deg, #ef4444, #dc2626)',
              color: 'white',
              padding: '15px 20px',
              borderRadius: '12px',
              marginBottom: '25px',
              fontSize: '0.95rem',
              fontWeight: '500',
              boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)'
            }}>
              ❌ {errorMessage}
            </div>
          )}

          {/* Image Preview */}
          <div style={{
            position: 'relative',
            marginBottom: '30px',
            borderRadius: '16px',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            border: '2px dashed #cbd5e1',
            minHeight: '300px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
          }}>
            {isUploading && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(255, 255, 255, 0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
                backdropFilter: 'blur(5px)'
              }}>
                <div style={{
                  textAlign: 'center'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    border: '4px solid #e2e8f0',
                    borderTop: '4px solid #667eea',
                    borderRadius: '50%',
                    margin: '0 auto 15px',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  <p style={{
                    color: '#64748b',
                    fontSize: '1rem',
                    margin: 0,
                    fontWeight: '500'
                  }}>
                    Fazendo upload...
                  </p>
                </div>
              </div>
            )}
            
            <img 
              src={imageUrl} 
              alt="Uploaded image" 
              style={{
                maxWidth: '100%',
                maxHeight: '300px',
                objectFit: 'contain',
                borderRadius: '12px',
                boxShadow: imageUrl !== uploadImage ? '0 8px 25px rgba(0, 0, 0, 0.15)' : 'none'
              }}
            />
          </div>

          {/* File Input */}
          <div style={{
            marginBottom: '25px'
          }}>
            <label 
              htmlFor="file"
              style={{
                display: 'inline-block',
                padding: '15px 30px',
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                color: 'white',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                border: 'none'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
              }}
            >
              📂 Escolher Foto
            </label>
            <input
              type="file"
              id="file"
              onChange={(e) => handleFileUpload(e)}
              style={{
                display: 'none'
              }}
              accept="image/*"
            />
          </div>

          {/* Post Button */}
          <button 
            type="submit" 
            onClick={(e) => handlePostarFoto(e)}
            disabled={!url || isUploading}
            style={{
              width: '100%',
              padding: '18px 30px',
              background: url && !isUploading 
                ? 'linear-gradient(45deg, #10b981, #059669)' 
                : 'linear-gradient(45deg, #94a3b8, #64748b)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1.2rem',
              fontWeight: '600',
              cursor: url && !isUploading ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s ease',
              boxShadow: url && !isUploading 
                ? '0 4px 15px rgba(16, 185, 129, 0.3)' 
                : '0 4px 15px rgba(148, 163, 184, 0.3)',
              opacity: url && !isUploading ? 1 : 0.6
            }}
            onMouseOver={(e) => {
              if (url && !isUploading) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.4)';
              }
            }}
            onMouseOut={(e) => {
              if (url && !isUploading) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)';
              }
            }}
          >
            {isUploading ? '⏳ Processando...' : '🚀 Postar Foto'}
          </button>

          {/* Alert Messages */}
          {alertMessage && (
            <div 
              key={alertMessage}
              style={{
                marginTop: '25px',
                padding: '18px 24px',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '500',
                lineHeight: '1.5',
                background: alertType === 'success' 
                  ? 'linear-gradient(45deg, #10b981, #059669)' 
                  : 'linear-gradient(45deg, #ef4444, #dc2626)',
                color: 'white',
                boxShadow: alertType === 'success'
                  ? '0 4px 15px rgba(16, 185, 129, 0.3)'
                  : '0 4px 15px rgba(239, 68, 68, 0.3)',
                opacity: 1,
                transform: 'translateY(0)',
                transition: 'all 0.3s ease-out'
              }}
            >
              {alertType === 'success' ? '✅' : '❌'} {alertMessage}
            </div>
          )}
        </div>
      </div>

      {/* Inline CSS for animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `
      }} />
    </div>
  );
}