import React, { useState } from 'react';
import Modal from './Modal.tsx';

const NebulaBackground: React.FC = () => (
    <div className="fixed inset-0 -z-20 bg-[#0A0A18] overflow-hidden">
      <style>{`
        @keyframes move-twinkle-back {
          from { background-position: 0 0; }
          to { background-position: -10000px 5000px; }
        }
        .stars {
          position: absolute; top: 0; left: 0; right: 0; bottom: 0;
          width: 100%; height: 100%; display: block;
          background: #000 url('data:image/png;base64,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') repeat top center;
          z-index: 0;
        }
        .twinkling {
          position: absolute; top: 0; left: 0; right: 0; bottom: 0;
          width: 100%; height: 100%; display: block;
          background: transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAQAAADa613fAAAAAXNSR0IArs4c6QAAA1FJREFUeJzt2s1vE0EQxvF3T2wS22IriV1NShHxgAd9i6eAKC3eS0uxoF6sePDi/6Def4DeKhTaCxVfBUSB4kGwUDZBUFCRItaiDY2pzOwbdzJpO93tJulu/pm5h5n3zWFm9t4k8P95rMlo9mR5DTf4ChZRcNFw6DNImDMxxohxztwahSOQMYp73MV5cU7xGCPGecazFzFLaM6cjXEy32hejbFCHAezuWSIcY04j/Max6QYZ8TZnEssZYhxHed5jeNSYoxz/M45PMuJMUYcz+U8z/MSJ8YVfs45PMeJMcbrnMc8z/MSJ8ab/M45PMuJMc7rned5jvMSJ8ZTfs45PMuJMc7pned5jvMSJ8Yrfs45PMuJMc7pned5jvMSJ8Zzfs45PMuJMbZ8z3mexznMSZwbPsV5nsdpnMGc6z/FeZ7HaZwRnM9xHqdzRjD/4zync0Yw/uM8p3NGML7jeE7njGB8x3mc0zlj/I7nOM8zljvD5zme8zzLWePzHOd5nmaN3/k8z3meZc15nsd5nsdpnXk8z/M8z7OcRzme53me5zmPcDjP8zzP8xzHgRznyc/zPMeRj+M8z/M8xzEf53mZ53me45gP8TzP8zzPcZz4Mp/nOc9znDk/z/M8z/McZ+bTfJ7neZ7nzL/5PM/zPM85M8/neZ7nOM8Z+TiP8zzPcc4Y53me53me44yxOM/zPM9xjjH+n+d5nuc4Z8znOM/zPM9xzozzOM/zPM9xzvQcz/M8z/Oc6Xmez+U8z/Oc6Zwe53mez/M8p6f5PI/L8zzP6elxHudzPZ7neU4P83ke5+U8z/OcHuc4ns/zPM9xOh/zPJ/zPM9xOp/jeJ7P8zzP6XzM8xye53me43Q+znM8n+d5ntP5mMdzOM/zPM/pPJzmeT7P8zync/iM4/kez/M8p4M5zufxPM/zPB3M4zwe5+V5nuc5HcTxfJ7neZ7TQRzn83g+z/M8p4M4zuNxHudzPZ7neU4HcJzH5Xkej/M4z+lxnsfjPJ7nOdeZPM/jcZ7nedc5nefxPM/nea8zPZ7neZ7n3dZ5PI/zPM/zrnU8j/M8z/OudTzP8zzync17reZ7nec55rOf5PM/zPOc5nufxPM/znOfMPOdzPs/zPOc5M4/nfJ7nOc45y/M8z/M85yzn8TzP8zzP85zkeJ7nOc9znOTxPM/zPOc5yZl8nvM8z3PmjPM8z/M8z5k5z/M8z/M8Z8Y8z/M8z3PG2DzP8zzPccZ4nOd5nuc5YzyO8zzPc54z/OfxPM/zPOeMfB7neZ7nOWM8z/M8z/McY0zzPM/zPMdY5g/P8zzPc5zzmOdznuZ5nveM/z7P8zzPOccZ+z7P8zzPOcdYx/M8z/McYx3P8zme53meYxwP8TzP8zzHcRwn8TzP8zzHMR/neZnnWZ7nuHme53mexznmPM/zPM9zzjM+z/M8z3OeMz7P8zzPcc6MfB7neZ7nOWM+x/M8z/McZ8xnOZ/neZ7njDnM8zzP8xznDB/meZ7nOM4Mf+M8z/M8xzlz/I7nec5zzhgf53me8zzPMeMDPM/zPM/zHGf4nOd5nuc4Z/gc53mexznP+DzP8zzPc57z5/ne53me5znP+DzPc2b+j+d5nveM/L/P8zzPc+b/Huc5z3PG/j/nOM9zxr7PczzP8xznrGM8z/M8z3OsYzjPczzP8xznOBzP8zzPcRwncJznyc/zPMeZj+M8z/M85zEfx/k8z/M853kY53mexzljPM/zPM9zxr7MczzP85xnrGM8z/M85zljPM/zPM85x/k8z/M8xzl/p3N+zveM/DudM/5OZ5z/dTrn+Z3OeM7vNE6/0znf7zR+zO80zt+dTrj/0zk/+J3G+S/n7z+/3Xj3n/m38z3n32r8jV81fv/tH4/wX59h33WJ8wAAAABJRU5ErkJggg==') repeat top center;
          z-index: 1;
          animation: move-twinkle-back 200s linear infinite;
        }
      `}</style>
      <div className="stars"></div>
      <div className="twinkling"></div>
    </div>
);


type ModalType = 'About' | 'Contact' | 'Privacy' | 'Terms' | 'DMCA';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);

  const navLinks: ModalType[] = ['About', 'Contact', 'Privacy', 'Terms', 'DMCA'];

  const getModalContent = (modal: ModalType) => {
    switch (modal) {
        case 'About': return <p>This AI Resume Builder is a modern tool designed to help you create professional resumes with ease. Powered by HSINI MOHAMED.</p>;
        case 'Contact': return <p>For inquiries, please contact us at <a href="mailto:hsini.web@gmail.com" className="text-gold underline">hsini.web@gmail.com</a> or visit <a href="https://doodax.com" target="_blank" rel="noopener noreferrer" className="text-gold underline">doodax.com</a>.</p>;
        case 'Privacy': return <p>Your privacy is important to us. All data you enter is processed locally in your browser and is not stored on our servers.</p>;
        case 'Terms': return <p>By using this service, you agree to our terms of use. This is a demonstration tool and should be used for personal, non-commercial purposes.</p>;
        case 'DMCA': return <p>If you believe your copyrighted work has been used in a way that constitutes copyright infringement, please contact us at <a href="mailto:hsini.web@gmail.com" className="text-gold underline">hsini.web@gmail.com</a>.</p>;
        default: return null;
    }
  };

  return (
    <>
      <NebulaBackground />
      <div className="relative min-h-screen text-white font-sans flex flex-col">
        <header className="py-4 px-6 bg-black/30 backdrop-blur-sm sticky top-0 z-40 no-print">
          <nav className="container mx-auto flex justify-between items-center">
            <div className="text-2xl font-bold text-gold">AI Resume Builder</div>
            <ul className="flex space-x-4">
              {navLinks.map(link => (
                <li key={link}>
                  <button onClick={() => setActiveModal(link)} className="text-gray-300 hover:text-gold transition-colors duration-200">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </header>
        
        <main className="flex-grow z-10">{children}</main>

        <footer className="py-6 px-4 bg-black/50 text-center text-gray-400 z-10 no-print">
          <p>
            Powered by <a href="https://github.com/hsinidev" target="_blank" rel="noopener noreferrer" className="text-gold font-bold hover:underline">HSINI MOHAMED</a>
          </p>
          <p className="mt-2 text-sm">
            <a href="https://doodax.com" target="_blank" rel="noopener noreferrer" className="hover:underline">doodax.com</a> | <a href="mailto:hsini.web@gmail.com" className="hover:underline">hsini.web@gmail.com</a>
          </p>
        </footer>

        {activeModal && (
            <Modal title={activeModal} isOpen={!!activeModal} onClose={() => setActiveModal(null)}>
                {getModalContent(activeModal)}
            </Modal>
        )}
      </div>
    </>
  );
};

export default Layout;
