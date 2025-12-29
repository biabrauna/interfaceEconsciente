import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { showToast } from '@/lib/toast';
import { useMe } from '@/hooks/api/useAuth';
import { useUser, useUpdateUser, useUploadProfilePic } from '@/hooks/api/useUsers';
import './style.css';

export default function EditarPerfil() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  // Buscar dados do usuário logado usando React Query
  const { data: currentUser } = useMe();
  const { data: userData, isLoading: loadingUserData } = useUser(currentUser?.id || '');
  const updateUserMutation = useUpdateUser();
  const uploadProfilePicMutation = useUploadProfilePic();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dataNascimento: '',
    biografia: '',
  });

  const [profilePicFile, setProfilePicFile] = useState<File | null>(null);
  const [profilePicPreview, setProfilePicPreview] = useState<string>('');

  // Preencher form quando os dados forem carregados do cache ou da API
  useEffect(() => {
    if (userData) {
      const dateValue = userData.dataNascimento
        ? new Date(userData.dataNascimento).toISOString().split('T')[0]
        : '';

      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        dataNascimento: dateValue,
        biografia: userData.biografia || '',
      });
    }
  }, [userData]);

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'econsciente');

    const response = await fetch('https://api.cloudinary.com/v1_1/dnulz0tix/image/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    return data.secure_url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);

    if (!currentUser?.id) {
      showToast.error('Usuário não autenticado');
      return;
    }

    try {
      // Upload profile picture if selected
      if (profilePicFile) {
        const url = await uploadToCloudinary(profilePicFile);
        await uploadProfilePicMutation.mutateAsync({
          userId: currentUser.id,
          url,
          name: currentUser.name || 'User',
        });
      }

      // Update profile
      await updateUserMutation.mutateAsync({
        id: currentUser.id,
        ...formData,
      });

      setSuccess(true);
      showToast.success('Perfil atualizado com sucesso!');

      setTimeout(() => {
        navigate('/Home');
      }, 1500);
    } catch (error: any) {
      console.error('Erro ao atualizar perfil:', error);
      const errorMessage = error?.message || 'Erro ao atualizar perfil. Tente novamente.';
      showToast.error(errorMessage);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Loading state
  if (loadingUserData) {
    return (
      <div className="perfil-page">
        <Navbar />
        <div className="perfil-content" style={{
          maxWidth: '600px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh'
        }}>
          <div style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.7)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
            <p>Carregando dados...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="perfil-page">
      <Navbar />

      <div className="perfil-content" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="profile-bio-card">
          <div className="bio-header">
            <span className="bio-icon">✏️</span>
            <h3 className="bio-title">Editar Perfil</h3>
          </div>

          <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Foto de Perfil
              </label>
              {profilePicPreview && (
                <div style={{ marginBottom: '10px', textAlign: 'center' }}>
                  <img
                    src={profilePicPreview}
                    alt="Preview"
                    style={{
                      width: '120px',
                      height: '120px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '3px solid #4CAF50',
                    }}
                  />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '14px',
                }}
              />
              <small style={{ color: '#666', fontSize: '12px' }}>
                Adicione uma foto de perfil e ganhe +100 pontos! 📸
              </small>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Nome
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '14px',
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '14px',
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Data de Nascimento
              </label>
              <input
                type="date"
                name="dataNascimento"
                value={formData.dataNascimento}
                onChange={handleChange}
                required
                max={new Date().toISOString().split('T')[0]}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '14px',
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Biografia
              </label>
              <textarea
                name="biografia"
                value={formData.biografia}
                onChange={handleChange}
                rows={4}
                placeholder="Conte um pouco sobre você..."
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '14px',
                  resize: 'vertical',
                }}
              />
              <small style={{ color: '#666', fontSize: '12px' }}>
                Adicione uma biografia e ganhe +50 pontos! ✍️
              </small>
            </div>

            {success && (
              <div style={{
                padding: '12px',
                background: '#d4edda',
                color: '#155724',
                borderRadius: '8px',
                marginBottom: '20px',
                textAlign: 'center',
              }}>
                ✅ Perfil atualizado com sucesso!
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="submit"
                disabled={updateUserMutation.isPending}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: updateUserMutation.isPending ? '#ccc' : '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: updateUserMutation.isPending ? 'not-allowed' : 'pointer',
                }}
              >
                {updateUserMutation.isPending ? 'Salvando...' : 'Salvar Alterações'}
              </button>

              <button
                type="button"
                onClick={() => navigate('/Perfil')}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: 'white',
                  color: '#666',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
