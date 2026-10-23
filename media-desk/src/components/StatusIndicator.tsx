import React from 'react';
import type { FilterProcessState } from '../types/loan';

export interface StatusIndicatorProps {
  state: FilterProcessState;
  children: (state: FilterProcessState) => React.ReactNode;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ state, children }) => {
  return (
    <div className="status-indicator-bar" role="status" aria-live="polite">
      {children(state)}
    </div>
  );
};