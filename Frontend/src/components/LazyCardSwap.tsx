import { lazy, Suspense } from 'react';

// Lazy load the heavy CardSwap component
const CardSwap = lazy(() => import('./CardSwap'));

interface LazyCardSwapProps {
  width?: number;
  height?: number;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (index: number) => void;
  skewAmount?: number;
  easing?: "elastic" | "power1";
  children: React.ReactNode;
}

const LazyCardSwap: React.FC<LazyCardSwapProps> = (props) => {
  return (
    <Suspense fallback={
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-pulse bg-gray-800 rounded-lg w-full h-full"></div>
      </div>
    }>
      <CardSwap {...props} />
    </Suspense>
  );
};

export default LazyCardSwap;
export { Card } from './CardSwap'; 