import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Volume2, VolumeX, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoAssistantProps {
  videoUrl?: string;
  productName: string;
}

const VideoAssistant = ({ videoUrl, productName }: VideoAssistantProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen && videoRef.current && videoUrl) {
      videoRef.current.play().catch(() => {
        // Autoplay blocked, user will need to interact
      });
    }
  }, [isOpen, videoUrl]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Olá! Gostaria de saber mais sobre: ${productName}`);
    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={handleToggle}
        className="floating-assistant"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Ver vídeo do produto"
      >
        <Play className="w-6 h-6 text-navy" fill="currentColor" />
      </motion.button>

      {/* Video Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleToggle}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            />

            {/* Video Container - 9:16 aspect ratio */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-24 right-6 z-[70] w-[280px] sm:w-[320px] rounded-2xl overflow-hidden shadow-2xl"
              style={{ aspectRatio: '9/16' }}
            >
              {videoUrl ? (
                <div className="relative w-full h-full bg-black">
                  <video
                    ref={videoRef}
                    src={videoUrl}
                    muted={isMuted}
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />

                  {/* Controls Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={handleMuteToggle}
                        className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                      >
                        {isMuted ? (
                          <VolumeX className="w-5 h-5 text-white" />
                        ) : (
                          <Volume2 className="w-5 h-5 text-white" />
                        )}
                      </button>
                      <span className="text-xs text-white/80 font-medium">
                        {productName}
                      </span>
                    </div>
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={handleToggle}
                    className="absolute top-3 right-3 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              ) : (
                /* Fallback when no video */
                <div className="w-full h-full bg-gradient-to-br from-primary to-navy-dark flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <Play className="w-8 h-8 text-white/50" />
                  </div>
                  <p className="text-white/90 font-medium mb-2">
                    Vídeo indisponível
                  </p>
                  <p className="text-white/60 text-sm mb-6">
                    para este item
                  </p>
                  <Button
                    onClick={handleWhatsApp}
                    className="bg-green-500 hover:bg-green-600 text-white gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Falar no WhatsApp
                  </Button>
                  
                  {/* Close Button */}
                  <button
                    onClick={handleToggle}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default VideoAssistant;
