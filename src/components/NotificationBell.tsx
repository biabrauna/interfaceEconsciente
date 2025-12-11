import { useState } from 'react';
import { useNotificacoesCount, useNotificacoes, useMarkNotificacaoAsRead } from '@/hooks/api/useNotificacoes';

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: count = 0 } = useNotificacoesCount();
  const { data: notificacoes = [] } = useNotificacoes();
  const markAsRead = useMarkNotificacaoAsRead();

  const handleNotificationClick = (id: string) => {
    markAsRead.mutate(id);
  };

  return (
    <div style={{ position: 'relative', marginLeft: '15px' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          position: 'relative',
          fontSize: '24px',
        }}
      >
        🔔
        {count > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '-5px',
              right: '-5px',
              background: '#ff4444',
              color: 'white',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {count > 9 ? '9+' : count}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '10px',
            background: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            width: '320px',
            maxHeight: '400px',
            overflowY: 'auto',
            zIndex: 1000,
          }}
        >
          <div style={{ padding: '15px', borderBottom: '1px solid #eee' }}>
            <h3 style={{ margin: 0, fontSize: '16px' }}>Notificações</h3>
          </div>

          {notificacoes.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
              Nenhuma notificação
            </div>
          ) : (
            notificacoes.slice(0, 10).map((notif) => (
              <div
                key={notif.id}
                onClick={() => handleNotificationClick(notif.id)}
                style={{
                  padding: '15px',
                  borderBottom: '1px solid #f0f0f0',
                  cursor: 'pointer',
                  background: notif.lida ? 'white' : '#f0f8ff',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#f5f5f5')}
                onMouseLeave={(e) => (e.currentTarget.style.background = notif.lida ? 'white' : '#f0f8ff')}
              >
                <div style={{ fontWeight: notif.lida ? 'normal' : 'bold', fontSize: '14px', marginBottom: '4px' }}>
                  {notif.titulo}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  {notif.mensagem}
                </div>
                <div style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>
                  {new Date(notif.createdAt).toLocaleString('pt-BR')}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
