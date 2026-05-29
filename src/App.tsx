import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import ShopCatalog from './components/ShopCatalog'; // Pulls in your beautiful new shop catalog!
import Envelope from './components/Envelope';
import InvitationContent from './components/InvitationContent';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  // We track which screen to show: 'catalog', 'envelope', or 'opened'
  const [view, setView] = useState('catalog');

  // Direct, absolute URL from GitHub storage to guarantee the background loads
  const backgroundUrl = 'https://github.com/everafterinvites-coder/mariamandahmed/blob/main/background.jpg?raw=true';

  const handleOpenEnvelope = () => {
    setView('opened');
  };

  // 1. IF VIEW IS 'CATALOG', SHOW YOUR MAIN STOREFRONT WINDOW
  if (view === 'catalog') {
    return (
      <ShopCatalog 
        onSelectTemplate={(templateId) => {
          if (templateId === 'chateau') {
            setView('envelope'); // Sends them straight to your wedding invitation demo!
          }
        }} 
      />
    );
  }

  // 2. IF VIEW IS NOT CATALOG, SHOW THE INTERACTIVE INVITATION EXPERIENCE
  return (
    <main id="wedding-invitation-app" className="relative w-full min-h-screen bg-stone-900 select-none overflow-x-hidden">
      
      {/* Background Music Player - autoPlay triggered when guests open envelope */}
      <MusicPlayer autoPlayTrigger={view === 'opened'} />

      <AnimatePresence mode="wait">
        {view === 'envelope' ? (
          <motion.div
            key="envelope-view"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="w-full"
          >
            <Envelope onOpen={handleOpenEnvelope} backgroundUrl={backgroundUrl} />
          </motion.div>
        ) : (
          <motion.div
            key="invitation-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="w-full"
          >
            <InvitationContent backgroundUrl={backgroundUrl} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
