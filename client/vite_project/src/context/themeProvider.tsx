import React, { ReactNode, useState } from 'react';
import { ThemeContext } from './themeContext';
import { useContext } from 'react';
// import ThemeContext from './themeContext';

// interface Props {
//   children: ReactNode
// }

// const ThemeProvider = ({ children }: Props) => {
//   const [theme, setTheme] = useState('light');

//   return (
//     <ThemeContext.Provider value={theme}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export default ThemeProvider;
export const ThemeProvider: React.FC< {children:ReactNode}> = ({ children }) => {
    const [theme, setTheme] = useState<string>('light');
  
    const toggleTheme = () => {
      setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };
  
    return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  };

export const useTheme = () => useContext(ThemeContext);