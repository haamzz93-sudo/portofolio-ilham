import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ExternalLink, Code2, Send, CheckCircle, Phone, MessageCircle } from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { SOCIAL_LINKS, PERSONAL_INFO } from '../utils/constants';
import { useLanguage } from '../context/LanguageContext';
import './Contact.css';

export const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = t.contact.errors.nameReq;
    if (!formData.email.trim()) newErrors.email = t.contact.errors.emailReq;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = t.contact.errors.emailInvalid;
    if (!formData.message.trim()) newErrors.message = t.contact.errors.msgReq;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    }
  };

  return (
    <section id="contact" className="section section--alt">
      <div className="container container--narrow">
        <SectionHeading title={t.contact.title} subtitle={t.contact.subtitle} />

        <div className="contact__grid">
          <motion.div
            className="contact__info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="contact__info-title">{t.contact.talkHeading}</h3>
            <p className="contact__info-text">{t.contact.infoText}</p>

            <div className="contact__links">
              {/* Email */}
              <a href={SOCIAL_LINKS.email} className="contact__link">
                <Mail size={20} />
                <span>{PERSONAL_INFO.emailPersonal}</span>
              </a>
              {/* Academic Email */}
              <a href={`mailto:${PERSONAL_INFO.emailAcademic}`} className="contact__link">
                <Mail size={20} />
                <span>{PERSONAL_INFO.emailAcademic}</span>
              </a>
              {/* WhatsApp */}
              <a
                href={`https://wa.me/62${PERSONAL_INFO.phone.replace(/^0/, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact__link"
              >
                <MessageCircle size={20} />
                <span>{PERSONAL_INFO.phone}</span>
              </a>
              {/* LinkedIn */}
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact__link"
              >
                <ExternalLink size={20} />
                <span>LinkedIn</span>
              </a>
              {/* GitHub */}
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact__link"
              >
                <Code2 size={20} />
                <span>GitHub · IlhamEkaa93</span>
              </a>
            </div>
          </motion.div>

          <motion.form
            className="contact__form glass"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {isSubmitted ? (
              <div className="contact__success">
                <CheckCircle size={48} />
                <h3>{t.contact.successTitle}</h3>
                <p>{t.contact.successMsg}</p>
              </div>
            ) : (
              <>
                <div className="contact__field">
                  <input
                    type="text"
                    name="name"
                    placeholder={t.contact.namePlaceholder}
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <span className="contact__error">{errors.name}</span>}
                </div>
                <div className="contact__field">
                  <input
                    type="email"
                    name="email"
                    placeholder={t.contact.emailPlaceholder}
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <span className="contact__error">{errors.email}</span>}
                </div>
                <div className="contact__field">
                  <textarea
                    name="message"
                    placeholder={t.contact.messagePlaceholder}
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                  />
                  {errors.message && <span className="contact__error">{errors.message}</span>}
                </div>
                <button type="submit" className="btn btn--primary" style={{ width: '100%' }}>
                  <Send size={18} />
                  {t.contact.sendBtn}
                </button>
              </>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};
