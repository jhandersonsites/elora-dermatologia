import { ArrowRight, Info } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { whatsappUrl } from '../config/site';
import { treatments } from '../content';
import { onInterestSelected } from '../lib/interest';
import { WhatsAppIcon } from './Icons';
import { openPrivacyPolicy } from '../lib/privacy';
import { EASE_OUT } from './motion/easing';

const GENERAL_INTEREST = 'Primeira consulta / avaliação geral';
const interests = [GENERAL_INTEREST, ...treatments.map((t) => t.title)];
const periods = ['Manhã', 'Tarde', 'Sábado'];

type Values = { name: string; phone: string; interest: string; period: string; notes: string; consent: boolean };
type Errors = Partial<Record<'name' | 'phone' | 'consent', string>>;

const initialValues: Values = { name: '', phone: '', interest: GENERAL_INTEREST, period: '', notes: '', consent: false };

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = 'Informe seu nome.';
  const digits = values.phone.replace(/\D/g, '').replace(/^55(?=\d{10,11}$)/, '');
  if (digits.length < 10 || digits.length > 11) errors.phone = 'Informe um telefone com DDD, por exemplo (27) 99999-0000.';
  if (!values.consent) errors.consent = 'É preciso concordar com a política de privacidade.';
  return errors;
}

/** Light-touch Brazilian phone formatting as the visitor types. */
function formatPhone(raw: string) {
  const d = raw.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : '';
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function buildMessage(v: Values) {
  return [
    'Olá! Gostaria de solicitar um agendamento.',
    `Nome: ${v.name.trim()}`,
    `Telefone: ${v.phone}`,
    `Interesse: ${v.interest}`,
    v.period && `Período preferido: ${v.period}`,
    v.notes.trim() && `Observações: ${v.notes.trim()}`,
  ]
    .filter(Boolean)
    .join('\n');
}

/**
 * Frontend-only appointment request. It does NOT submit to a server:
 * after validation it prepares a WhatsApp message the visitor sends
 * themselves, and says so plainly. A real booking integration
 * (e.g. form service or CRM) can replace `handleSubmit` later.
 */
export function AppointmentForm() {
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [ready, setReady] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(
    () =>
      onInterestSelected((interest) => {
        if (interests.includes(interest)) setValues((v) => ({ ...v, interest }));
        setReady(false);
      }),
    [],
  );

  useEffect(() => {
    if (ready) resultRef.current?.focus();
  }, [ready]);

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstInvalid = (Object.keys(found) as (keyof Errors)[]).find((k) => found[k]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    setReady(true);
  };

  const fieldProps = (name: keyof Errors) => ({
    name,
    id: `field-${name}`,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `error-${name}` : undefined,
  });

  const errorText = (name: keyof Errors) =>
    errors[name] ? (
      <p className="form__error" id={`error-${name}`}>
        {errors[name]}
      </p>
    ) : null;

  return (
    <div className="form-card" id="agendar">
      <AnimatePresence mode="wait" initial={false}>
        {ready ? (
          <motion.div
            key="ready"
            ref={resultRef}
            tabIndex={-1}
            className="form__result"
            role="status"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <p className="eyebrow eyebrow--plain">Solicitação preparada</p>
            <p className="h3">
              Sua mensagem está pronta, <em>{values.name.trim().split(' ')[0]}.</em>
            </p>
            <p className="form__notice">
              <Info size={16} strokeWidth={1.5} aria-hidden="true" />
              <span>
                Este é um site demonstrativo: nenhum dado foi enviado a servidores. Para concluir, envie a mensagem
                abaixo pelo WhatsApp. Em um site real, o formulário pode ser integrado ao sistema de agendamento
                da clínica.
              </span>
            </p>
            <pre className="form__preview">{buildMessage(values)}</pre>
            <div className="form__actions">
              <a className="btn btn--primary" href={whatsappUrl(buildMessage(values))} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon size={18} />
                Enviar pelo WhatsApp
              </a>
              <button type="button" className="text-link" onClick={() => setReady(false)}>
                Editar dados
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            className="form"
            noValidate
            onSubmit={handleSubmit}
            aria-labelledby="form-title"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <div className="form__head">
              <h3 id="form-title" className="h3">
                Solicitar agendamento
              </h3>
              <p className="form__intro">Campos com * são obrigatórios. Leva menos de um minuto.</p>
            </div>

            <div className="form__field">
              <label htmlFor="field-name">Nome *</label>
              <input
                {...fieldProps('name')}
                type="text"
                autoComplete="name"
                value={values.name}
                onChange={(e) => set('name', e.target.value)}
                required
              />
              {errorText('name')}
            </div>

            <div className="form__field">
              <label htmlFor="field-phone">Telefone / WhatsApp *</label>
              <input
                {...fieldProps('phone')}
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                placeholder="(27) 99999-0000"
                value={values.phone}
                onChange={(e) => set('phone', formatPhone(e.target.value))}
                required
              />
              {errorText('phone')}
            </div>

            <div className="form__field">
              <label htmlFor="field-interest">Interesse</label>
              <div className="form__select">
                <select
                  id="field-interest"
                  name="interest"
                  value={values.interest}
                  onChange={(e) => set('interest', e.target.value)}
                >
                  {interests.map((interest) => (
                    <option key={interest}>{interest}</option>
                  ))}
                </select>
              </div>
            </div>

            <fieldset className="form__field form__periods">
              <legend>Período preferido</legend>
              <div className="form__chips">
                {periods.map((period) => (
                  <label key={period} className="form__chip">
                    <input
                      type="radio"
                      name="period"
                      value={period}
                      checked={values.period === period}
                      onChange={() => set('period', period)}
                    />
                    <span>{period}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="form__field">
              <label htmlFor="field-notes">Observações (opcional)</label>
              <textarea
                id="field-notes"
                name="notes"
                rows={3}
                maxLength={300}
                aria-describedby="hint-notes"
                value={values.notes}
                onChange={(e) => set('notes', e.target.value)}
              />
              <p className="form__hint" id="hint-notes">
                Por favor, não inclua informações de saúde. Elas serão tratadas em consulta.
              </p>
            </div>

            <div className="form__field">
              <label className="form__consent">
                <input
                  {...fieldProps('consent')}
                  type="checkbox"
                  checked={values.consent}
                  onChange={(e) => set('consent', e.target.checked)}
                />
                <span>
                  Li e concordo com a{' '}
                  <button type="button" className="form__inline-link" onClick={openPrivacyPolicy}>
                    política de privacidade
                  </button>
                  . *
                </span>
              </label>
              {errorText('consent')}
            </div>

            <button type="submit" className="btn btn--primary form__submit">
              Preparar solicitação
              <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
            </button>
            <p className="form__hint">
              Demonstração: o formulário não envia dados — ele prepara uma mensagem para você enviar pelo WhatsApp.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
