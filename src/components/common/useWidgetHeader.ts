import { useContext } from 'react';
import { WidgetHeaderContext } from './WidgetHeaderContext';

export function useWidgetHeader() {
  const context = useContext(WidgetHeaderContext);

  if (!context) {
    throw new Error('useWidgetHeader must be used within a WidgetContainer');
  }

  return context;
}
