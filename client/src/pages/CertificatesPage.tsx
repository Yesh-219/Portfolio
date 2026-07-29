import React from 'react';
import { SectionWrapper } from '../components/layout/SectionWrapper';
import { GlassCard } from '../components/ui/GlassCard';
import { Badge } from '../components/ui/Badge';
import { Award } from 'lucide-react';

export const CertificatesPage: React.FC = () => {
  return (
    <SectionWrapper id="certificates">
      <div className="space-y-6 max-w-4xl mx-auto text-center">
        <Badge variant="blue" icon={<Award className="w-3.5 h-3.5" />}>
          Certificates Foundation View
        </Badge>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-white">
          Certificates & Recognition Route
        </h1>
        <GlassCard hover={false} className="text-left space-y-3">
          <p className="text-slate-300 font-mono text-xs">
            Route: /certificates • Credentials Vault Ready
          </p>
        </GlassCard>
      </div>
    </SectionWrapper>
  );
};

export default CertificatesPage;
