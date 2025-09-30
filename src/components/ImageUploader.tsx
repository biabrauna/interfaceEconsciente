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
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      paddingTop: '90px',
      paddingBottom: '90px',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      <div style={{
        maxWidth: '500px',
        width: '100%',
        margin: '0 auto'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(26, 33, 26, 0.98) 0%, rgba(42, 58, 42, 0.98) 100%)',
          borderRadius: '24px',
          padding: '32px 24px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          textAlign: 'center'
        }}>

          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #00A335 0%, #00d444 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            fontSize: '2.5rem',
            boxShadow: '0 8px 24px rgba(0, 163, 53, 0.4)',
            animation: 'pulse 2s ease-in-out infinite'
          }}>
            📸
          </div>

          <h1 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#ffffff',
            margin: '0 0 8px 0',
            letterSpacing: '-0.02em',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
          }}>
            Registrar Conquista
          </h1>

          <p style={{
            fontSize: '1rem',
            color: '#EE9300',
            margin: '0 0 28px 0',
            fontWeight: '500',
            lineHeight: '1.5'
          }}>
            Compartilhe sua atitude sustentável!
          </p>

          <div style={{
            width: '100%',
            aspectRatio: '4/3',
            maxHeight: '320px',
            background: imageUrl === uploadImage
              ? 'rgba(50, 52, 65, 0.6)'
              : `url(${imageUrl}) center/cover`,
            borderRadius: '16px',
            border: imageUrl === uploadImage
              ? '2px dashed rgba(238, 147, 0, 0.4)'
              : '2px solid rgba(0, 163, 53, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
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
                padding: '30px',
                background: imageUrl === uploadImage
                  ? 'transparent'
                  : 'rgba(0, 0, 0, 0.5)',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(5px)',
                width: '100%',
                height: '100%'
              }}
            >
              <div style={{
                fontSize: '3rem',
                marginBottom: '12px',
                filter: imageUrl === uploadImage ? 'none' : 'brightness(0) invert(1)'
              }}>
                {imageUrl === uploadImage ? '📁' : '🔄'}
              </div>
              <span style={{
                fontSize: '1rem',
                fontWeight: '600',
                color: imageUrl === uploadImage ? '#EE9300' : '#ffffff',
                textAlign: 'center',
                textShadow: imageUrl === uploadImage ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.5)'
              }}>
                {imageUrl === uploadImage ? 'Escolher Foto' : 'Trocar Foto'}
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
                padding: '16px 24px',
                background: url && !isUploading
                  ? 'linear-gradient(135deg, #EE9300 0%, #ff9e00 100%)'
                  : 'rgba(50, 52, 65, 0.8)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: url && !isUploading ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s ease',
                boxShadow: url && !isUploading
                  ? '0 4px 15px rgba(238, 147, 0, 0.3)'
                  : '0 4px 15px rgba(0, 0, 0, 0.2)',
                opacity: url && !isUploading ? 1 : 0.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              } as React.CSSProperties}
              onMouseOver={(e: React.MouseEvent<HTMLButtonElement>) => {
                if (url && !isUploading) {
                  (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
                  (e.target as HTMLButtonElement).style.boxShadow = '0 6px 20px rgba(238, 147, 0, 0.4)';
                }
              }}
              onMouseOut={(e: React.MouseEvent<HTMLButtonElement>) => {
                if (url && !isUploading) {
                  (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
                  (e.target as HTMLButtonElement).style.boxShadow = '0 4px 15px rgba(238, 147, 0, 0.3)';
                }
              }}
            >
              {isUploading ? (
                <>
                  <span style={{
                    display: 'inline-block',
                    width: '16px',
                    height: '16px',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderTopColor: 'white',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                  }}></span>
                  Processando...
                </>
              ) : (
                <>🚀 Postar Foto</>
              )}
            </button>
          </form>

          {alertMessage && (
            <div
              key={alertMessage}
              style={{
                marginTop: '20px',
                padding: '14px 18px',
                borderRadius: '12px',
                fontSize: '0.95rem',
                fontWeight: '500',
                lineHeight: '1.5',
                background: alertType === 'success'
                  ? 'rgba(0, 163, 53, 0.2)'
                  : 'rgba(220, 38, 38, 0.2)',
                color: alertType === 'success' ? '#00d444' : '#ff6b6b',
                border: alertType === 'success'
                  ? '1px solid rgba(0, 163, 53, 0.4)'
                  : '1px solid rgba(220, 38, 38, 0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                opacity: 1,
                transform: 'translateY(0)',
                transition: 'all 0.3s ease-out'
              } as React.CSSProperties}
            >
              <span style={{ fontSize: '1.2rem' }}>
                {alertType === 'success' ? '✅' : '⚠️'}
              </span>
              <span>{alertMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div style={{
              marginTop: '16px',
              padding: '14px 18px',
              background: 'rgba(220, 38, 38, 0.15)',
              border: '1px solid rgba(220, 38, 38, 0.3)',
              color: '#ff6b6b',
              borderRadius: '12px',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{ fontSize: '1.2rem' }}>⚠️</span>
              <span>{errorMessage}</span>
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