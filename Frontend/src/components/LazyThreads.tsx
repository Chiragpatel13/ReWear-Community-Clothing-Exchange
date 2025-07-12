import { lazy, Suspense } from 'react';

// Lazy load the heavy Threads component
const Threads = lazy(() => import('./Threads'));

interface LazyThreadsProps {
  color?: [number, number, number];
  amplitude?: number;
  distance?: number;
  enableMouseInteraction?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const LazyThreads: React.FC<LazyThreadsProps> = (props) => {
  return (
    <Suspense fallback={
      <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black animate-pulse"></div>
    }>
      <Threads {...props} />
    </Suspense>
  );
};

export default LazyThreads; 