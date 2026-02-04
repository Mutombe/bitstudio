import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, Toaster } from 'sonner';
import {
  ArrowRight, Mail, Phone, MapPin, Clock, Send,
  MessageSquare, Sparkles, CheckCircle, Globe, Github,
  Linkedin, Facebook, X
} from 'lucide-react';
import { companyInfo, services } from '../data/siteData';

// ============================================
// CONTACT HERO
// ============================================
const ContactHero = () => {
  return (
    <section className="relative min-h-[40vh] md:min-h-[50vh] flex items-center overflow-hidden pt-20 pb-10 md:pt-24 md:pb-14 lg:pt-28 lg:pb-16">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920')`,
        }}
      />
      {/* Image Overlay - Creates blend effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/95 via-[#12121a]/92 to-[#0a0a0f]/95" />
      <div className="absolute inset-0 bg-[#0a0a0f]/70" />
      <div className="absolute inset-0 mesh-bg opacity-25" />

      {/* Animated Orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[800px] h-[500px] md:h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(175, 44, 71, 0.1) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container-xl relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full glass-primary mb-4 md:mb-6 lg:mb-8"
          >
            <MessageSquare size={12} className="text-[#af2c47] md:w-[14px] md:h-[14px]" />
            <span className="text-xs md:text-sm text-white/80">Get In Touch</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="heading-xl text-white mb-4 md:mb-6 lg:mb-8"
          >
            Let's{' '}
            <span className="text-gradient">talk</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg lg:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
          >
            Whether you have a project in mind, a question about our services,
            or just want to say hello—we're here to help.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

// ============================================
// CONTACT FORM
// ============================================
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showContactOptions, setShowContactOptions] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowContactOptions(true);
  };

  const handleWhatsApp = () => {
    const phone = "263785948128";
    const serviceNames = {
      'ai-solutions': 'AI & Machine Learning',
      'web-development': 'Web Development',
      'mobile-apps': 'Mobile Applications',
      'data-analytics': 'Data Analytics',
      'process-automation': 'Process Automation',
      'cloud-security': 'Cloud & Security'
    };

    const message = `Hello Bit Studio!

My name is ${formData.name}
${formData.company ? `Company: ${formData.company}` : ''}
Email: ${formData.email}
Service Interest: ${serviceNames[formData.service] || formData.service}
${formData.budget ? `Budget Range: ${formData.budget}` : ''}

Message:
${formData.message}

Looking forward to hearing from you!`;

    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    setFormData({ name: '', email: '', company: '', service: '', budget: '', message: '' });
    setShowContactOptions(false);
    toast.success('Redirecting to WhatsApp...', { duration: 2000 });
  };

  const handleEmail = () => {
    const serviceNames = {
      'ai-solutions': 'AI & Machine Learning',
      'web-development': 'Web Development',
      'mobile-apps': 'Mobile Applications',
      'data-analytics': 'Data Analytics',
      'process-automation': 'Process Automation',
      'cloud-security': 'Cloud & Security'
    };

    const subject = `New Inquiry - ${serviceNames[formData.service] || 'General'}`;
    const body = `Hello Bit Studio,

My name is ${formData.name}
${formData.company ? `Company: ${formData.company}` : ''}
Email: ${formData.email}
Service Interest: ${serviceNames[formData.service] || formData.service}
${formData.budget ? `Budget Range: ${formData.budget}` : ''}

Message:
${formData.message}

Looking forward to hearing from you!`;

    const mailtoUrl = `mailto:${companyInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;

    setFormData({ name: '', email: '', company: '', service: '', budget: '', message: '' });
    setShowContactOptions(false);
    toast.success('Opening email client...', { duration: 2000 });
  };

  return (
    <>
      <Toaster position="top-right" richColors />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name & Email Row */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white/60 text-sm mb-2">Your Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="John Doe"
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-white/60 text-sm mb-2">Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="john@company.com"
              className="input-field"
            />
          </div>
        </div>

        {/* Company & Service Row */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white/60 text-sm mb-2">Company Name</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Your Company"
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-white/60 text-sm mb-2">Service Interest *</label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="input-field"
            >
              <option value="">Select a service</option>
              {services.map(service => (
                <option key={service.id} value={service.id}>
                  {service.title}
                </option>
              ))}
              <option value="other">Other / Not Sure</option>
            </select>
          </div>
        </div>

        {/* Budget */}
        <div>
          <label className="block text-white/60 text-sm mb-2">Budget Range</label>
          <select
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">Select budget range</option>
            <option value="< $5,000">Less than $5,000</option>
            <option value="$5,000 - $15,000">$5,000 - $15,000</option>
            <option value="$15,000 - $50,000">$15,000 - $50,000</option>
            <option value="$50,000+">$50,000+</option>
            <option value="Not sure">Not sure yet</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label className="block text-white/60 text-sm mb-2">Project Details *</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            placeholder="Tell us about your project, goals, and timeline..."
            className="input-field resize-none"
          />
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-primary w-full py-4"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              />
              Sending...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Send Message
              <Send size={16} />
            </span>
          )}
        </motion.button>
      </form>

      {/* Contact Options Modal */}
      <AnimatePresence>
        {showContactOptions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowContactOptions(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-md p-8 rounded-lg bg-[#12121a] border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowContactOptions(false)}
                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <h3 className="font-display font-bold text-xl text-white mb-2">
                How would you like to reach us?
              </h3>
              <p className="text-white/50 mb-6">
                Choose your preferred contact method
              </p>

              <div className="space-y-4">
                <button
                  onClick={handleWhatsApp}
                  className="w-full p-4 rounded-lg bg-green-600/20 border border-green-600/30 text-white hover:bg-green-600/30 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <MessageSquare size={20} />
                  WhatsApp (Instant)
                </button>
                <button
                  onClick={handleEmail}
                  className="w-full p-4 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Mail size={20} />
                  Email
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ============================================
// CONTACT INFO SECTION
// ============================================
const ContactInfo = () => {
  const contactMethods = [
    {
      icon: <Phone size={24} />,
      title: "Call Us",
      info: companyInfo.phone,
      description: "Mon-Fri from 8am to 5pm",
      action: `tel:${companyInfo.phone}`
    },
    {
      icon: <Mail size={24} />,
      title: "Email Us",
      info: companyInfo.email,
      description: "We'll respond within 24 hours",
      action: `mailto:${companyInfo.email}`
    },
    {
      icon: <MapPin size={24} />,
      title: "Visit Us",
      info: companyInfo.location,
      description: "Zimbabwe, Africa",
      action: null
    }
  ];

  return (
    <div className="space-y-6">
      {/* Contact Methods */}
      {contactMethods.map((method, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          {method.action ? (
            <a
              href={method.action}
              className="flex items-start gap-4 p-6 rounded-lg bg-[#12121a] border border-white/5 hover:border-[#af2c47]/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-lg bg-[#af2c47]/10 flex items-center justify-center text-[#af2c47] group-hover:bg-[#af2c47]/20 transition-colors">
                {method.icon}
              </div>
              <div>
                <h4 className="font-display font-medium text-white mb-1 group-hover:text-[#af2c47] transition-colors">
                  {method.title}
                </h4>
                <p className="text-white/70">{method.info}</p>
                <p className="text-white/40 text-sm">{method.description}</p>
              </div>
            </a>
          ) : (
            <div className="flex items-start gap-4 p-6 rounded-lg bg-[#12121a] border border-white/5">
              <div className="w-12 h-12 rounded-lg bg-[#af2c47]/10 flex items-center justify-center text-[#af2c47]">
                {method.icon}
              </div>
              <div>
                <h4 className="font-display font-medium text-white mb-1">
                  {method.title}
                </h4>
                <p className="text-white/70">{method.info}</p>
                <p className="text-white/40 text-sm">{method.description}</p>
              </div>
            </div>
          )}
        </motion.div>
      ))}

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="pt-6"
      >
        <p className="text-white/40 text-sm mb-4">Follow us</p>
        <div className="flex gap-4">
          {[
            { icon: <Github size={20} />, href: companyInfo.social.github },
            { icon: <Linkedin size={20} />, href: companyInfo.social.linkedin },
            { icon: <Facebook size={20} />, href: companyInfo.social.facebook }
          ].map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:text-[#af2c47] hover:bg-[#af2c47]/10 transition-all duration-300"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </motion.div>

      {/* Response Time */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="p-6 rounded-lg glass-primary"
      >
        <div className="flex items-center gap-3 mb-3">
          <Clock size={20} className="text-[#af2c47]" />
          <span className="text-white font-display font-medium">Quick Response</span>
        </div>
        <p className="text-white/60 text-sm">
          We typically respond to inquiries within 2-4 business hours during
          weekdays. For urgent matters, please call us directly.
        </p>
      </motion.div>
    </div>
  );
};

// ============================================
// MAIN CONTACT SECTION
// ============================================
const ContactSection = () => {
  return (
    <section className="section relative overflow-hidden bg-[#0a0a0f]">
      <div className="container-xl">
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Form Column */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="heading-md text-white mb-4">
                Start a conversation
              </h2>
              <p className="text-white/60">
                Fill out the form below and we'll get back to you shortly.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-lg bg-[#12121a] border border-white/5"
            >
              <ContactForm />
            </motion.div>
          </div>

          {/* Info Column */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="heading-md text-white mb-4">
                Get in touch
              </h2>
              <p className="text-white/60">
                Prefer to reach out directly? Here's how you can contact us.
              </p>
            </motion.div>

            <ContactInfo />
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// FAQ SECTION
// ============================================
const FAQSection = () => {
  const faqs = [
    {
      question: "What's your typical project timeline?",
      answer: "Project timelines vary based on scope and complexity. A simple website might take 4-6 weeks, while a complex AI solution could take 3-6 months. We'll provide a detailed timeline during our initial consultation."
    },
    {
      question: "Do you work with clients outside Zimbabwe?",
      answer: "Absolutely! We work with clients across 8 countries and are experienced in remote collaboration. Our team is comfortable working across time zones and use modern collaboration tools to ensure smooth communication."
    },
    {
      question: "What's your pricing model?",
      answer: "We offer both fixed-price and time-and-materials pricing depending on the project. For well-defined projects, we provide fixed quotes. For evolving projects, we work on a retainer or hourly basis."
    },
    {
      question: "Do you provide ongoing support?",
      answer: "Yes, we offer ongoing maintenance and support packages for all our projects. This includes bug fixes, security updates, and feature enhancements as needed."
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="section relative overflow-hidden bg-[#12121a]">
      <div className="container-lg">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#af2c47] font-display text-sm uppercase tracking-widest mb-4"
          >
            FAQ
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-md text-white"
          >
            Common questions
          </motion.h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-lg border border-white/5 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 flex items-center justify-between text-left bg-[#0a0a0f] hover:bg-white/5 transition-colors"
              >
                <span className="font-display font-medium text-white">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  className="text-[#af2c47]"
                >
                  <ArrowRight size={20} />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-white/60 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// MAIN CONTACT PAGE
// ============================================
const Contact = () => {
  return (
    <main>
      <ContactHero />
      <ContactSection />
      <FAQSection />
    </main>
  );
};

export default Contact;
