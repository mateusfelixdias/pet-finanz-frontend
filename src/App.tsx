import Routes from '@/routes';
import { ToastContainer } from 'react-toastify';
import { PetsProvider } from './context/PetsContext';

function App() {
  return (
    <PetsProvider>
      <Routes />

      <ToastContainer />
    </PetsProvider>
  );
}

export default App;
