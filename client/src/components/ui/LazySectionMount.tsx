import React, { useRef, Suspense } from 'react';
import { useInView } from 'framer-motion';
import { SectionSkeleton } from './SectionSkeleton';

interface LazySectionMountProps {
  children: React.ReactNode;
  id?: string;
}

export const LazySectionMount: React.FC<LazySectionMountProps> = ({ children, id }) => {
  const ref = useRef<HTMLDivElement>(null);
  // Trigger loading when the user scrolls within 600px of the section
  const isInView = useInView(ref, { once: false, margin: "100px 0px" });

  return (
    <div id={id} ref={ref} className="relative w-full min-h-screen">
      {isInView ? (
        <Suspense fallback={<SectionSkeleton />}>
          {children}
        </Suspense>
      ) : (
        <SectionSkeleton />
      )}
    </div>
  );
};
