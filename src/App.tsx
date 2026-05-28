/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Envelope from './components/Envelope';
import InvitationContent from './components/InvitationContent';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);

  // Background asset URL generated using the image-generation capability
  const backgroundUrl = '/src/assets/images/wedding_chateau_bg_1779996764518.png';

  const handleOpenEnvelope = () => {
    setEnvelopeOpened(true);
  };

  return (
    <main id="wedding-invitation-app" className="relative w-full min-h-screen bg-stone-900 select-none overflow-x-hidden">
      
      {/* Background Music Player - autoPlay triggered when guests open envelope */}
      <MusicPlayer autoPlayTrigger={envelopeOpened} />

      <AnimatePresence mode="wait">
        {!envelopeOpened ? (
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

