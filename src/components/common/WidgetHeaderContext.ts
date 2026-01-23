import { createContext } from 'react';

export interface HeaderAction {
  id: string;
  element: React.ReactNode;
}

export interface WidgetHeaderContextType {
  registerAction: (action: HeaderAction) => void;
  unregisterAction: (id: string) => void;
}

export const WidgetHeaderContext = createContext<WidgetHeaderContextType | null>(null);
