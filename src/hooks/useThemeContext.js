import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

export function useThemeContext() {
  // Consume the context
  const context = useContext(ThemeContext);
  if (context === undefined)
    throw new Error(
      'ThemeContext was used outside of the ThemeContextProvider',
    );

  return context;
}
