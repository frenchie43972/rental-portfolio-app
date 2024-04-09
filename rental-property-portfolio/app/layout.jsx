import '@/assets/styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Rental Properties | Kris French Portfolio',
  description: 'A sample of apps that Kris French built.',
  keywords: 'Kris French, portfolio project'
}

const MainLayout = ({children}) => {
  return (
    <html lang='en'>
      <body>
        <Navbar/>
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
    
  );
}

export default MainLayout;
