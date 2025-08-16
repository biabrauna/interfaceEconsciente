import React, { useState } from 'react';
import uploadImage from '@/assets/images/upload (2).png';
import { useAuthState, useCreatePost } from '@/hooks/api';
import { createApiError } from '@/utils/errorHandler';

interface CloudinaryResponse {
  public_id: string;
  url: string;
}

const ImageUploader: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string>(uploadImage);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertType, setAlertType] = useState<'success' | 'error' | ''>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const { user } = useAuthState();
  const createPostMutation = useCreatePost();

  const handlePostarFoto = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (!url || !user?.id) {
      setAlertMessage('Dados incompletos para postar a foto.');
      setAlertType('error');
      setTimeout(() => setAlertMessage(''), 3000);
      return;
    }
    
    try {
      await createPostMutation.mutateAsync({
        url: url,
        userId: user.id,
        likes: 0
      });
      setAlertMessage('Foto postada com sucesso! A foto irá para análise e, em breve, seus pontos serão computados.');
      setAlertType('success');
      setUrl(''); // Reset form
      setImageUrl(uploadImage);
      setTimeout(() => setAlertMessage(''), 5000);
    } catch (error) {
      const appError = createApiError(error, 'Post photo');
      setAlertMessage(appError.message || 'Erro ao postar a foto. Tente novamente.');
      setAlertType('error');
      setTimeout(() => setAlertMessage(''), 3000);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = event.target.files?.[0];
    if (!file) {
      setErrorMessage('Por favor, selecione um arquivo para upload.');
      return;
    }
    
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Por favor, selecione apenas arquivos de imagem.');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('Arquivo muito grande. Máximo 5MB.');
      return;
    }
    
    setIsUploading(true);
    setErrorMessage('');
    
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'tonmaj4q');
    data.append('cloud_name', 'dnulz0tix');
    
    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dnulz0tix/image/upload', {
        method: 'POST',
        body: data,
      });
      
      if (!res.ok) {
        throw new Error('Erro no upload da imagem');
      }
      
      const urlData: CloudinaryResponse = await res.json();
      const imageUrl = `https://res.cloudinary.com/dnulz0tix/image/upload/v1733788670/${urlData.public_id}`;
      setUrl(imageUrl);
      
      if (!urlData.url) {
        setErrorMessage('Erro no upload da imagem');
      } else {
        setImageUrl(urlData.url);
        setErrorMessage('');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido no upload';
      setErrorMessage(`Erro no upload da imagem: ${errorMessage}`);
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
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          textAlign: 'center'
        }}>
          
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
            Compartilhe sua atitude sustentável e ganhe pontos!
          </p>

          <div style={{
            width: '100%',
            height: '300px',
            background: `url(${imageUrl}) center/cover`,
            borderRadius: '16px',
            border: '3px dashed #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '25px',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease'
          }}>
            <label
              htmlFor="file"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: '40px',
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(5px)'
              }}
            >
              <div style={{
                fontSize: '3rem',
                marginBottom: '15px',
                opacity: 0.7
              }}>
                📁
              </div>
              <span style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#4f46e5',
                textAlign: 'center'
              }}>
                📂 Escolher Foto
              </span>
            </label>
            <input
              type="file"
              id="file"
              onChange={handleFileUpload}
              style={{
                display: 'none'
              }}
              accept="image/*"
            />
          </div>

          <form onSubmit={handlePostarFoto}>
            <button 
              type="submit"
              disabled={!url || isUploading || createPostMutation.isPending}
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
              } as React.CSSProperties}
              onMouseOver={(e: React.MouseEvent<HTMLButtonElement>) => {
                if (url && !isUploading) {
                  (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
                  (e.target as HTMLButtonElement).style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.4)';
                }
              }}
              onMouseOut={(e: React.MouseEvent<HTMLButtonElement>) => {
                if (url && !isUploading) {
                  (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
                  (e.target as HTMLButtonElement).style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)';
                }
              }}
            >
              {isUploading ? '⏳ Processando...' : '🚀 Postar Foto'}
            </button>
          </form>

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
              } as React.CSSProperties}
            >
              {alertType === 'success' ? '✅' : '❌'} {alertMessage}
            </div>
          )}
          
          {errorMessage && (
            <div style={{
              marginTop: '15px',
              padding: '12px',
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              borderRadius: '8px',
              fontSize: '0.9rem'
            }}>
              {errorMessage}
            </div>
          )}
        </div>
      </div>

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
};

export default ImageUploader;