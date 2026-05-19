import { ThemeProvider } from "./contextFiles/ThemeContext";
import { useTheme } from "./contextFiles/ThemeContext";

import AppContent from "./AppContent/AppContent";

export default function Home(){
  return(
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
