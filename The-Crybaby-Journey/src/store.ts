import { create } from 'zustand';

export type Era =
  | 'intro'
  | 'crybaby'
  | 'k12'
  | 'portals'
  | 'outro';

export type OutroReturnStep = 'room' | 'summary';

type StoreState = {
  currentEra: Era;
  setEra: (era: Era) => void;

  hasStarted: boolean;
  startExperience: () => void;

  outroReturnStep: OutroReturnStep;
  setOutroReturnStep: (step: OutroReturnStep) => void;

  volume: number;
  setVolume: (volume: number) => void;

  resetProgress: () => void;
};

const getSavedEra = (): Era => {
  return (localStorage.getItem('currentEra') as Era) || 'intro';
};

const getSavedStarted = () => {
  return localStorage.getItem('hasStarted') === 'true';
};

const getSavedOutroStep = (): OutroReturnStep => {
  return (localStorage.getItem('outroReturnStep') as OutroReturnStep) || 'room';
};

export const useStore = create<StoreState>((set) => ({
  currentEra: getSavedEra(),

  setEra: (era) => {
    localStorage.setItem('currentEra', era);
    set({ currentEra: era });
  },

  hasStarted: getSavedStarted(),

  startExperience: () => {
    localStorage.setItem('hasStarted', 'true');
    set({ hasStarted: true });
  },

  outroReturnStep: getSavedOutroStep(),

  setOutroReturnStep: (step) => {
    localStorage.setItem('outroReturnStep', step);
    set({ outroReturnStep: step });
  },

  volume: 0.7,

  setVolume: (volume) =>
    set({
      volume,
    }),

  resetProgress: () => {
    localStorage.removeItem('currentEra');
    localStorage.removeItem('hasStarted');
    localStorage.removeItem('outroReturnStep');

    set({
      currentEra: 'intro',
      hasStarted: false,
      outroReturnStep: 'room',
    });
  },
}));