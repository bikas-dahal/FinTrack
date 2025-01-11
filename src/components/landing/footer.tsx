const Footer = () => {
    return (
      <footer className="bg-gray-200 dark:bg-gray-800 py-6 text-center text-gray-700 dark:text-gray-300">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} FinTrack. All rights reserved.</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;