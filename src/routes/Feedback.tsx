import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { showToast } from '@/lib/toast';
import './Feedback.css';

export default function Feedback() {
  const [formData, setFormData] = useState({
    type: 'bug',
    subject: '',
    message: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.subject || !formData.message) {
      showToast.warning('Preencha todos os campos obrigatórios');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulando envio (pode implementar backend depois)
      await new Promise(resolve => setTimeout(resolve, 1500));

      showToast.success('Feedback enviado com sucesso! Obrigado pela contribuição 🌱');

      setFormData({
        type: 'bug',
        subject: '',
        message: '',
        email: '',
      });
    } catch (error) {
      showToast.error('Erro ao enviar feedback. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="feedback-page">
      <Navbar />

      <div className="feedback-container">
        <div className="feedback-header">
          <h1 className="feedback-title">
            <span className="feedback-icon">💬</span>
            Envie seu Feedback
          </h1>
          <p className="feedback-subtitle">
            Reportar bugs, sugerir melhorias ou compartilhar sua experiência
          </p>
        </div>

        <form className="feedback-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="type">Tipo de Feedback *</label>
            <select
              id="type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              required
            >
              <option value="bug">🐛 Reportar Bug</option>
              <option value="feature">💡 Sugerir Funcionalidade</option>
              <option value="improvement">⭐ Melhoria</option>
              <option value="other">💬 Outro</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="subject">Assunto *</label>
            <input
              id="subject"
              type="text"
              placeholder="Breve descrição do seu feedback"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
              maxLength={100}
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Mensagem *</label>
            <textarea
              id="message"
              placeholder="Descreva em detalhes seu feedback..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={6}
              maxLength={1000}
            />
            <span className="char-count">{formData.message.length}/1000</span>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email (opcional)</label>
            <input
              id="email"
              type="email"
              placeholder="seu@email.com (caso queira resposta)"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="feedback-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Feedback'}
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}
