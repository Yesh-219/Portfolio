import React from 'react';
import { SectionWrapper } from '../components/layout/SectionWrapper';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { AlertTriangle, Home } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <SectionWrapper id="404">
      <div className="text-center space-y-6 max-w-xl mx-auto">
        <Badge variant="purple" icon={<AlertTriangle className="w-3.5 h-3.5" />}>
          Signal Lost in Orbit
        </Badge>
        
        <h1 className="font-display font-extrabold text-6xl text-white">
          404
        </h1>

        <p className="font-sans text-slate-300">
          The requested page path does not exist in Yeswanth OS navigation matrix.
        </p>

        <div className="pt-2">
          <NavLink to="/">
            <Button variant="primary" leftIcon={<Home className="w-4 h-4" />}>
              Return to Home Workspace
            </Button>
          </NavLink>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default NotFoundPage;
