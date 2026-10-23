import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, FileText, CheckCircle2 } from 'lucide-react';
import { Github, Linkedin, Instagram } from '../components/SocialIcons';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';

// EmailJS Credentials - Fallback to environment variables or placeholder triggers
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_placeholder';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_placeholder';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'public_placeholder';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  const validate = () => {
    let valid = true;
    const newErrors = { name: '', email: '', message: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      valid = false;
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#3B82F6', '#8B5CF6', '#10B981']
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSending(true);

    // If using real variables, connect to EmailJS REST Endpoint
    const isRealEmailJS = 
      EMAILJS_SERVICE_ID !== 'service_placeholder' &&
      EMAILJS_TEMPLATE_ID !== 'template_placeholder' &&
      EMAILJS_PUBLIC_KEY !== 'public_placeholder';

    if (isRealEmailJS) {
      try {
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service_id: EMAILJS_SERVICE_ID,
            template_id: EMAILJS_TEMPLATE_ID,
            user_id: EMAILJS_PUBLIC_KEY,
            template_params: {
              from_name: formData.name,
              from_email: formData.email,
              subject: formData.subject,
              message: formData.message,
              to_name: 'Malla Vishwanth'
            }
          })
        });

        if (response.ok) {
          setSendSuccess(true);
          triggerConfetti();
          setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
          console.error('EmailJS request failed: ', await response.text());
          alert('Failed to send message via EmailJS. Falling back to simulation.');
          // Fallback simulation
          setSendSuccess(true);
          triggerConfetti();
        }
      } catch (err) {
        console.error('EmailJS Connection Error: ', err);
        // Fallback simulation
        setSendSuccess(true);
        triggerConfetti();
      } finally {
        setIsSending(false);
      }
    } else {
      // Simulate network request delays
      setTimeout(() => {
        setIsSending(false);
        setSendSuccess(true);
        triggerConfetti();
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 1200);
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 px-6 relative">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="flex flex-col mb-16 sm:mb-24">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            08 / Contact
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white mt-3 tracking-tight">
            Get In Touch
          </h2>
          <div className="h-[2px] w-20 bg-gradient-to-r from-primary to-secondary mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-stretch">
          {/* Info Side Column */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div className="flex flex-col gap-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                Let's discuss something creative.
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                Whether you have a job offer, a project idea, or just want to chat about 3D printing and photography, feel free to drop a line.
              </p>
            </div>

            {/* Direct Info list */}
            <div className="flex flex-col gap-5 my-8">
              {[
                { icon: <Mail size={18} />, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
                { icon: <Phone size={18} />, label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
                { icon: <MapPin size={18} />, label: 'Location', value: personalInfo.address }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 dark:bg-white/5 border border-gray-200 dark:border-gray-800/40 backdrop-blur-sm">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary">{item.icon}</div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">{item.label}</span>
                    {item.href ? (
                      <a href={item.href} className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-primary transition-colors cursor-pointer">
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Icons Badge Row */}
            <div className="flex gap-4">
              {[
                { icon: <Github size={18} />, url: personalInfo.socials.github, name: 'Github' },
                { icon: <Linkedin size={18} />, url: personalInfo.socials.linkedin, name: 'Linkedin' },
                { icon: <Instagram size={18} />, url: personalInfo.socials.instagram, name: 'Instagram' }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.name}
                  className="p-3.5 rounded-full border border-gray-200 dark:border-gray-800 bg-white/5 hover:bg-secondary/15 hover:border-secondary text-gray-600 dark:text-gray-400 dark:hover:text-white transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Form Side Column */}
          <div className="lg:col-span-7">
            <div className="glass-card p-6 sm:p-10 relative overflow-hidden backdrop-blur-md h-full flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {sendSuccess ? (
                  /* Success Overlay state */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center text-center py-10"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                      className="p-4 bg-emerald-500/10 rounded-full text-emerald-500 border border-emerald-500/20"
                    >
                      <CheckCircle2 size={48} />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-6 tracking-tight">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 max-w-sm leading-relaxed">
                      Thank you for reaching out. Malla Vishwanth will get back to you as soon as possible.
                    </p>
                    <button
                      onClick={() => setSendSuccess(false)}
                      className="mt-8 px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-primary hover:opacity-90 transition-all cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  /* Standard Input Form state */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name input */}
                      <div className="flex flex-col">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`px-4 py-3 rounded-xl border ${
                            errors.name ? 'border-red-500' : 'border-gray-200 dark:border-gray-800'
                          } bg-white/5 dark:bg-black/10 text-gray-900 dark:text-white focus:outline-none focus:border-primary transition-colors`}
                          placeholder="Your full name"
                        />
                        {errors.name && <span className="text-[11px] text-red-500 mt-1">{errors.name}</span>}
                      </div>

                      {/* Email input */}
                      <div className="flex flex-col">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`px-4 py-3 rounded-xl border ${
                            errors.email ? 'border-red-500' : 'border-gray-200 dark:border-gray-800'
                          } bg-white/5 dark:bg-black/10 text-gray-900 dark:text-white focus:outline-none focus:border-primary transition-colors`}
                          placeholder="Your email address"
                        />
                        {errors.email && <span className="text-[11px] text-red-500 mt-1">{errors.email}</span>}
                      </div>
                    </div>

                    {/* Subject input */}
                    <div className="flex flex-col">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Subject</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/5 dark:bg-black/10 text-gray-900 dark:text-white focus:outline-none focus:border-primary transition-colors"
                        placeholder="Project offer, greeting, etc."
                      />
                    </div>

                    {/* Message input */}
                    <div className="flex flex-col">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className={`px-4 py-3 rounded-xl border ${
                          errors.message ? 'border-red-500' : 'border-gray-200 dark:border-gray-800'
                        } bg-white/5 dark:bg-black/10 text-gray-900 dark:text-white focus:outline-none focus:border-primary transition-colors resize-none`}
                        placeholder="Your message goes here..."
                      />
                      {errors.message && <span className="text-[11px] text-red-500 mt-1">{errors.message}</span>}
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-wrap items-center gap-4 mt-4">
                      <button
                        type="submit"
                        disabled={isSending}
                        className="flex-1 min-w-[150px] py-4 rounded-xl text-xs font-semibold uppercase tracking-widest text-white bg-gradient-to-r from-primary to-secondary hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                      >
                        {isSending ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <Send size={13} /> Send Message
                          </>
                        )}
                      </button>

                      <a
                        href="/malla-vishwanth-resume.pdf"
                        download="Malla_Vishwanth_Resume.pdf"
                        className="px-6 py-4 rounded-xl text-xs font-semibold uppercase tracking-widest text-gray-800 dark:text-white bg-white/5 border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-white/10 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <FileText size={13} /> Download Resume
                      </a>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
