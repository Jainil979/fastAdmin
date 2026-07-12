// export default function Modal({ isOpen, onClose, title, children }) {
//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
//       <div className="bg-surface rounded-md shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
//         <div className="flex items-center justify-between px-6 py-4 border-b border-border">
//           <h2 className="text-xl font-light tracking-[-0.01em] text-on-surface">{title}</h2>
//           <button onClick={onClose} className="text-muted hover:text-on-surface transition">
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>
//         <div className="p-6">{children}</div>
//       </div>
//     </div>
//   );
// }




// import { XMarkIcon } from '@heroicons/react/24/outline';

// export default function Modal({ isOpen, onClose, title, children }) {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark-canvas/75 backdrop-blur-sm p-space-4">
//       <div className="bg-canvas-default-light rounded-radius-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="flex items-center justify-between px-space-6 py-space-4 border-b border-border-default">
//           <h2 className="text-xl font-[480] text-primary-text-dark">{title}</h2>
//           <button onClick={onClose} className="text-secondary-text hover:text-primary-text-dark transition">
//             <XMarkIcon className="w-6 h-6" />
//           </button>
//         </div>
//         <div className="p-space-6">{children}</div>
//       </div>
//     </div>
//   );
// }







// import { XMarkIcon } from '@heroicons/react/24/outline';
// import { useTheme } from '../../context/ThemeContext';

// export default function Modal({ isOpen, onClose, title, children }) {
//   const { theme } = useTheme();
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark-canvas/75 backdrop-blur-sm p-space-4">
//       <div className={`rounded-radius-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto ${
//         theme === 'dark'
//           ? 'bg-canvas-default border border-muted-green-gray/30'
//           : 'bg-canvas-default-light border border-border-default'
//       }`}>
//         <div className={`flex items-center justify-between px-space-6 py-space-4 border-b ${
//           theme === 'dark' ? 'border-muted-green-gray/30' : 'border-border-default'
//         }`}>
//           <h2 className={`text-xl font-[480] ${
//             theme === 'dark' ? 'text-white-text' : 'text-primary-text-dark'
//           }`}>
//             {title}
//           </h2>
//           <button 
//             onClick={onClose} 
//             className={`${theme === 'dark' ? 'text-muted-gray-text hover:text-white-text' : 'text-secondary-text hover:text-primary-text-dark'} transition`}
//           >
//             <XMarkIcon className="w-6 h-6" />
//           </button>
//         </div>
//         <div className="p-space-6">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// }






import { XMarkIcon } from '@heroicons/react/24/outline';

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark-canvas/75 backdrop-blur-sm p-space-4">
      <div className="bg-canvas-default border border-muted-green-gray/30 rounded-radius-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-space-6 py-space-4 border-b border-muted-green-gray/30">
          <h2 className="text-xl font-[480] text-white-text">{title}</h2>
          <button onClick={onClose} className="text-muted-gray-text hover:text-white-text transition">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="p-space-6">{children}</div>
      </div>
    </div>
  );
}