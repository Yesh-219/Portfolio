import React from 'react';
import { SectionWrapper } from '../components/layout/SectionWrapper';
import { GlassCard } from '../components/ui/GlassCard';
import { Badge } from '../components/ui/Badge';
import { Mail, Phone, Linkedin, Github } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const contactLinks = [
    { icon: Mail, label: 'Email', value: 'yeswanthkumarkaluva@gmail.com', href: 'mailto:yeswanthkumarkaluva@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+91 8639425584', href: 'tel:+918639425584' },
    { icon: Linkedin, label: 'LinkedIn', value: 'yeswanth-kumar-kaluva', href: 'https://www.linkedin.com/in/yeswanth-kumar-kaluva-12180625a/' },
    { icon: Github, label: 'GitHub', value: 'Yesh-219', href: 'https://github.com/Yesh-219' },
  ];

  return (
    <SectionWrapper id="contact">
      <div className="space-y-6 max-w-3xl mx-auto text-center">
        <Badge variant="teal" icon={<Mail className="w-3.5 h-3.5" />}>
          Get In Touch
        </Badge>
        <h1 className="font-display font-bold text-3xl sm:text-5xl text-white">
          Contact Me
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8">
          {contactLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="block outline-none">
                <GlassCard hover={true} className="flex items-center gap-4 p-5 text-left transition-all duration-300 hover:bg-white/10 group border-white/5 hover:border-auroraBlue/50 hover:shadow-auroraGlow">
                  <div className="w-12 h-12 rounded-xl bg-auroraBlue/10 flex items-center justify-center text-auroraBlue group-hover:bg-gradient-to-br group-hover:from-auroraBlue group-hover:to-tealAccent group-hover:text-white transition-all shadow-lg">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-slate-400 text-xs font-mono mb-1">{link.label}</p>
                    <p className="text-slate-100 text-sm font-medium truncate group-hover:text-white transition-colors">{link.value}</p>
                  </div>
                </GlassCard>
              </a>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ContactPage;
