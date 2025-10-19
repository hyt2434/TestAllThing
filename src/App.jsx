import { Outlet } from 'react-router-dom';
import { Header } from './components/ui/header';
import { Footer } from './components/ui/footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-[var(--header-height)]">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
}

export default App
