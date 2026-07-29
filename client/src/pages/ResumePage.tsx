import React from 'react';
import { SectionWrapper } from '../components/layout/SectionWrapper';
import { GlassCard } from '../components/ui/GlassCard';
import { Badge } from '../components/ui/Badge';
import { FileText } from 'lucide-react';

export const ResumePage: React.FC = () => {
  return (
    <SectionWrapper id="resume">
      <div className="space-y-6 max-w-4xl mx-auto text-center">
        <Badge variant="blue" icon={<FileText className="w-3.5 h-3.5" />}>
          Resume Glass Viewer View
        </Badge>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-white">
          Resume Route
        </h1>
        <GlassCard hover={false} className="text-left space-y-3">
          <p className="text-slate-300 font-mono text-xs">
            Route: /resume • Glass PDF Inspection Ready
          </p>
        </GlassCard>
      </div>
    </SectionWrapper>
  );
};

export default ResumePage;
