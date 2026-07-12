// import { NavLink } from 'react-router-dom';

// export default function Sidebar({ models }) {
//   return (
//     <aside className="w-64 h-screen bg-surface border-r border-border/60 flex flex-col p-6">
//       <div className="text-xl font-light tracking-[-0.01em] text-primary mb-8">
//         FastAdmin
//       </div>
//       <nav className="space-y-1">
//         {Object.keys(models).map((model) => (
//           <NavLink
//             key={model}
//             to={`/${model.toLowerCase()}`}
//             className={({ isActive }) =>
//               `block px-4 py-2 rounded-sm text-sm font-light tracking-[-0.01em] transition ${
//                 isActive
//                   ? 'bg-primary/10 text-primary font-normal'
//                   : 'text-muted hover:text-on-surface hover:bg-primary/5'
//               }`
//             }
//           >
//             {model}s
//           </NavLink>
//         ))}
//       </nav>
//     </aside>
//   );
// }






// import { NavLink } from 'react-router-dom';
// import { 
//   HomeIcon, 
//   UsersIcon, 
//   CubeIcon, 
//   ShoppingBagIcon,
//   Cog6ToothIcon,
//   DocumentTextIcon,
//   FolderIcon
// } from '@heroicons/react/24/outline';

// // Map model names to icons (you can extend)
// const iconMap = {
//   users: UsersIcon,
//   products: CubeIcon,
//   orders: ShoppingBagIcon,
//   posts: DocumentTextIcon,
//   categories: FolderIcon,
//   settings: Cog6ToothIcon,
// };

// export default function Sidebar({ models }) {
//   return (
//     <aside className="w-64 bg-canvas-default border-r border-muted-green-gray/30 flex flex-col shrink-0">
//       <div className="p-space-6 border-b border-muted-green-gray/30">
//         <h1 className="text-xl font-light text-white-text tracking-wide">FastAdmin</h1>
//       </div>
//       <nav className="flex-1 p-space-4 space-y-space-1 overflow-y-auto">
//         {Object.keys(models).map((model) => {
//           const Icon = iconMap[model.toLowerCase()] || DocumentTextIcon;
//           return (
//             <NavLink
//               key={model}
//               to={`/${model.toLowerCase()}`}
//               className={({ isActive }) =>
//                 `flex items-center gap-space-3 px-space-3 py-space-2 rounded-radius-sm text-sm font-medium transition-colors ${
//                   isActive
//                     ? 'bg-github-blue-primary/20 text-white-text'
//                     : 'text-muted-gray-text hover:bg-white/5 hover:text-white-text'
//                 }`
//               }
//             >
//               <Icon className="w-5 h-5" />
//               <span>{model}</span>
//             </NavLink>
//           );
//         })}
//       </nav>
//     </aside>
//   );
// }







// import { NavLink } from 'react-router-dom';
// import { 
//   HomeIcon, 
//   UsersIcon, 
//   CubeIcon, 
//   ShoppingBagIcon,
//   Cog6ToothIcon,
//   DocumentTextIcon,
//   FolderIcon,
//   SunIcon,
//   MoonIcon,
//   Squares2X2Icon
// } from '@heroicons/react/24/outline';
// import { useTheme } from '../../context/ThemeContext';

// const iconMap = {
//   users: UsersIcon,
//   products: CubeIcon,
//   orders: ShoppingBagIcon,
//   posts: DocumentTextIcon,
//   categories: FolderIcon,
//   settings: Cog6ToothIcon,
//   dashboard: Squares2X2Icon,
// };

// export default function Sidebar({ models }) {
//   const { theme, toggleTheme } = useTheme();
//   const isDark = theme === 'dark';

//   return (
//     <aside className="w-64 bg-canvas-default border-r border-muted-green-gray/30 flex flex-col shrink-0">
//       {/* Brand */}
//       <div className="p-space-6 border-b border-muted-green-gray/30 flex items-center gap-space-3">
//         <Squares2X2Icon className="w-6 h-6 text-github-blue-primary" />
//         <h1 className="text-xl font-[480] text-white-text tracking-wide">FastAdmin</h1>
//       </div>

//       {/* Models section */}
//       <div className="flex-1 overflow-y-auto p-space-4">
//         <h2 className="text-xs font-medium text-muted-gray-text uppercase tracking-wider mb-space-3">
//           Models
//         </h2>
//         <nav className="space-y-space-1">
//           {Object.keys(models).map((model) => {
//             const Icon = iconMap[model.toLowerCase()] || DocumentTextIcon;
//             return (
//               <NavLink
//                 key={model}
//                 to={`/${model.toLowerCase()}`}
//                 className={({ isActive }) =>
//                   `flex items-center gap-space-3 px-space-3 py-space-2 rounded-radius-sm text-sm font-medium transition-colors ${
//                     isActive
//                       ? 'bg-github-blue-primary/20 text-white-text'
//                       : 'text-muted-gray-text hover:bg-white/5 hover:text-white-text'
//                   }`
//                 }
//               >
//                 <Icon className="w-5 h-5" />
//                 <span>{model}</span>
//               </NavLink>
//             );
//           })}
//         </nav>
//       </div>

//       {/* Theme toggle */}
//       <div className="p-space-4 border-t border-muted-green-gray/30">
//         <button
//           onClick={toggleTheme}
//           className="flex items-center gap-space-3 w-full px-space-3 py-space-2 rounded-radius-sm text-sm font-medium text-muted-gray-text hover:bg-white/5 hover:text-white-text transition-colors"
//         >
//           {isDark ? (
//             <>
//               <SunIcon className="w-5 h-5" />
//               <span>Light Mode</span>
//             </>
//           ) : (
//             <>
//               <MoonIcon className="w-5 h-5" />
//               <span>Dark Mode</span>
//             </>
//           )}
//         </button>
//       </div>
//     </aside>
//   );
// }













import { NavLink } from 'react-router-dom';
import {
  Squares2X2Icon,
  UsersIcon,
  CubeIcon,
  ShoppingBagIcon,
  DocumentTextIcon,
  FolderIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

const iconMap = {
  users: UsersIcon,
  products: CubeIcon,
  orders: ShoppingBagIcon,
  posts: DocumentTextIcon,
  categories: FolderIcon,
  settings: Cog6ToothIcon,
};

export default function Sidebar({ models }) {
  return (
    <aside className="w-64 bg-canvas-default border-r border-muted-green-gray/30 flex flex-col shrink-0">
      {/* Brand */}
      <div className="px-space-6 py-space-4 border-b border-muted-green-gray/30 flex items-center gap-space-3">
        <Squares2X2Icon className="w-6 h-6 text-github-blue-primary" />
        <span className="text-xl font-[480] text-white-text tracking-wide">FastAdmin</span>
      </div>

      {/* Models */}
      <nav className="flex-1 overflow-y-auto p-space-4">
        <h2 className="text-xs font-[400] text-muted-gray-text uppercase tracking-wider mb-space-3">
          Models
        </h2>
        <div className="space-y-space-1">
          {Object.keys(models).map((model) => {
            const Icon = iconMap[model.toLowerCase()] || DocumentTextIcon;
            return (
              <NavLink
                key={model}
                to={`/${model.toLowerCase()}`}
                className={({ isActive }) =>
                  `flex items-center gap-space-3 px-space-3 py-space-2 rounded-radius-sm text-sm font-[400] transition-colors ${
                    isActive
                      ? 'bg-github-blue-primary/20 text-white-text'
                      : 'text-muted-gray-text hover:bg-white/5 hover:text-white-text'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span>{model}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}