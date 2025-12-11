import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '@/hooks/useAuth';
import { showToast } from '@/lib/toast';
import api from '../services/api';
import './style.css';

export default function EditarPerfil() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dataNascimento: '',
    biografia: '',
  });

  useEffect(() => {
    if (user?.id) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    try {
      const response = await api.get(`/usuarios/${user?.id}`);
      // Converter ISO string para formato YYYY-MM-DD
      const dateValue = response.data.dataNascimento
        ? new Date(response.data.dataNascimento).toISOString().split('T')[0]
        : '';

      setFormData({
        name: response.data.name || '',
        email: response.data.email || '',
        dataNascimento: dateValue,
        biografia: response.data.biografia || '',
      });
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      showToast.error('Erro ao carregar dados do perfil');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      await api.put(`/usuarios/${user?.id}`, formData);
      setSuccess(true);
      showToast.success('Perfil atualizado com sucesso!');

      // Verificar se veio do onboarding
      const fromOnboarding = sessionStorage.getItem('from_onboarding');

      setTimeout(() => {
        if (fromOnboarding === 'true') {
          // Não remove from_onboarding aqui, deixa o Onboarding fazer isso
          navigate('/Home');
        } else {
          navigate('/Perfil');
        }
      }, 1500);
    } catch (error: any) {
      console.error('Erro ao atualizar perfil:', error);
      const errorMessage = error?.response?.data?.message || 'Erro ao atualizar perfil. Tente novamente.';
      showToast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

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
                disabled={loading}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: loading ? '#ccc' : '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
              >
                {loading ? 'Salvando...' : 'Salvar Alterações'}
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
