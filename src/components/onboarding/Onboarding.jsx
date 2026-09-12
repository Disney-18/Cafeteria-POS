import { useState } from 'react';
import { ONBOARDING_STEPS } from '../../data/onboardingSteps';
import OnboardingStep from './OnboardingStep';
import Button from '../ui/Button';
import { useOnboardingStore } from '../../store/useOnboardingStore';

export default function Onboarding({ onFinish }) {
  const [index, setIndex] = useState(0);
  const completar = useOnboardingStore((s) => s.completar);
  const step = ONBOARDING_STEPS[index];
  const isLast = index === ONBOARDING_STEPS.length - 1;

  const finish = () => {
    completar();
    onFinish?.();
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-white">
      <div className="flex items-center justify-end p-4">
        <button
          onClick={finish}
          className="rounded-lg px-3 py-1.5 text-sm text-coffee-500 hover:bg-coffee-100"
        >
          Omitir
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <OnboardingStep key={index} step={step} />
      </div>

      <div className="border-t border-coffee-100 p-4">
        <div className="mb-4 flex justify-center gap-1.5">
          {ONBOARDING_STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? 'w-6 bg-coffee-500' : 'w-1.5 bg-coffee-200'
              }`}
            />
          ))}
        </div>

        <div className="flex gap-2">
          {index > 0 && (
            <Button variant="outline" onClick={() => setIndex((i) => i - 1)}>
              Atrás
            </Button>
          )}
          <Button
            variant="primary"
            className="flex-1"
            icon={isLast ? 'rocket_launch' : 'arrow_forward'}
            onClick={() => (isLast ? finish() : setIndex((i) => i + 1))}
          >
            {isLast ? 'Comenzar' : 'Siguiente'}
          </Button>
        </div>
      </div>
    </div>
  );
}
