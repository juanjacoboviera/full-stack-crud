import ProjectRoutes from './ProjectRoutes';
import 'primereact/resources/primereact.min.css'; 
import "primereact/resources/themes/lara-light-cyan/theme.css";
import './styles.css';
import { GlobalProvider } from './GlobalProvider';
import { PrimeReactProvider } from 'primereact/api';
import Tailwind from "primereact/passthrough/tailwind";

function App() {

  return (
   <>
  <PrimeReactProvider value={{  pt: Tailwind }}>
    <GlobalProvider>
        <ProjectRoutes/>
    </GlobalProvider>
  </PrimeReactProvider>
   </>
  );
}

export default App;
