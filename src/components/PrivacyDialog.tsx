import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { site } from '../config/site';
import { PRIVACY_EVENT } from '../lib/privacy';
import './PrivacyDialog.css';

/** Privacy notice in a native modal <dialog> (focus trap and Esc built in). */
export function PrivacyDialog() {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const open = () => ref.current?.showModal();
    window.addEventListener(PRIVACY_EVENT, open);
    return () => window.removeEventListener(PRIVACY_EVENT, open);
  }, []);

  return (
    <dialog
      ref={ref}
      className="privacy"
      aria-labelledby="privacy-title"
      onClick={(event) => {
        // Close when the backdrop (the dialog element itself) is clicked.
        if (event.target === ref.current) ref.current?.close();
      }}
    >
      <div className="privacy__inner">
        <div className="privacy__top">
          <h2 id="privacy-title" className="h3">
            Política de privacidade
          </h2>
          <button type="button" className="privacy__close" onClick={() => ref.current?.close()}>
            <X size={22} strokeWidth={1.4} aria-hidden="true" />
            <span className="visually-hidden">Fechar</span>
          </button>
        </div>

        <p className="privacy__badge">Texto demonstrativo</p>

        <h3>Quais dados o formulário usa</h3>
        <p>
          O formulário de agendamento pede apenas nome, telefone e preferências de atendimento. Nesta
          demonstração, esses dados não são enviados nem armazenados por nenhum servidor: eles são usados somente
          no seu próprio navegador para montar uma mensagem de WhatsApp, que você decide se envia ou não.
        </p>

        <h3>Dados de saúde</h3>
        <p>
          Pedimos que você não informe dados de saúde no formulário. Informações clínicas são tratadas apenas em
          consulta, com o sigilo exigido pela ética médica.
        </p>

        <h3>Cookies e rastreamento</h3>
        <p>Este site demonstrativo não utiliza cookies de rastreamento nem ferramentas de publicidade.</p>

        <h3>Para um site real</h3>
        <p>
          Antes da publicação, esta política deve ser adaptada à Lei Geral de Proteção de Dados (LGPD), indicando o
          controlador dos dados, a finalidade, o prazo de armazenamento, os direitos do titular e um canal de
          contato.
        </p>

        <p className="caption">{site.demoNotice}</p>
      </div>
    </dialog>
  );
}
