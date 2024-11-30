import ProjectRoutes from './ProjectRoutes';
import './styles.css';
import { GlobalProvider } from './GlobalProvider';

function App() {
  return (
   <>
   <GlobalProvider>
      <ProjectRoutes/>
   </GlobalProvider>
   </>
  );
}

export default App;
