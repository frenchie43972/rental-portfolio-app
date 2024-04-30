import '@/assets/styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const metadata = {
  title: 'Rental Properties | Kris French Portfolio',
  description: 'A sample of apps that Kris French built.',
  keywords: 'Kris French, portfolio project'
}

const MainLayout = ({children}) => {
  return (
    <AuthProvider>
      <html lang='en'>
        <body>
          <Navbar/>
          <main>
            {children}
          </main>
          <Footer />
          <ToastContainer/>
        </body>
      </html>
    </AuthProvider>
    
    
  );
}

export default MainLayout;
