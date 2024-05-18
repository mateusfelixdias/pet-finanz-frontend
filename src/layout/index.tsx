import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';
import { ReactNode, useEffect, useState } from 'react';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      const isMdScreen = window.innerWidth <= 700;
      setSidebarOpen(!isMdScreen);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex w-full">
      <Sidebar isOpen={isSidebarOpen} />

      <div className="w-full min-h-screen h-full flex flex-col justify-between">
        <Header isSidebarOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />

        {children}

        <Footer />
      </div>
    </div>
  );
}
