// import { useState, useEffect } from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { fetchMetadata } from './api';
// import MainLayout from './components/layout/MainLayout';
// import Sidebar from './components/layout/Sidebar';
// import DynamicModelList from './pages/DynamicModelList';
// import LoadingSpinner from './components/ui/LoadingSpinner';

// function App() {
//   const [metadata, setMetadata] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchMetadata()
//       .then(data => {
//         setMetadata(data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return (
//       <div className="h-screen flex items-center justify-center">
//         <LoadingSpinner />
//       </div>
//     );
//   }

//   if (!metadata) {
//     return <div className="p-8 text-error">Failed to load metadata. Is the backend running?</div>;
//   }

//   const modelNames = Object.keys(metadata);

//   return (
//     <BrowserRouter>
//       <div className="flex min-h-screen bg-[#F8FAFC]">
//         <Sidebar models={metadata} />
//         <div className="flex-1 flex flex-col">
//           <MainLayout>
//             <Routes>
//               <Route path="/" element={<Navigate to={`/${modelNames[0]?.toLowerCase()}`} replace />} />
//               {modelNames.map((model) => (
//                 <Route
//                   key={model}
//                   path={`/${model.toLowerCase()}`}
//                   element={<DynamicModelList modelName={model} metadata={metadata} />}
//                 />
//               ))}
//             </Routes>
//           </MainLayout>
//         </div>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;







// import { useState, useEffect } from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { fetchMetadata } from './api';
// import Sidebar from './components/layout/Sidebar';
// import MainLayout from './components/layout/MainLayout';
// import DynamicModelList from './pages/DynamicModelList';
// import LoadingSpinner from './components/ui/LoadingSpinner';

// function App() {
//   const [metadata, setMetadata] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchMetadata()
//       .then(data => {
//         setMetadata(data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error('Metadata fetch error:', err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return (
//       <div className="h-screen flex items-center justify-center">
//         <LoadingSpinner />
//       </div>
//     );
//   }

//   if (!metadata) {
//     return (
//       <div className="p-8 text-error">
//         Failed to load metadata. Is the backend running?
//       </div>
//     );
//   }

//   const modelNames = Object.keys(metadata);

//   return (
//     <BrowserRouter>
//       <div className="flex min-h-screen bg-[#F8FAFC]">
//         <Sidebar models={metadata} />
//         <div className="flex-1 flex flex-col">
//           <MainLayout>
//             <Routes>
//               <Route path="/" element={<Navigate to={`/${modelNames[0]?.toLowerCase()}`} replace />} />
//               {modelNames.map((model) => (
//                 <Route
//                   key={model}
//                   path={`/${model.toLowerCase()}`}
//                   element={<DynamicModelList modelName={model} metadata={metadata} />}
//                 />
//               ))}
//             </Routes>
//           </MainLayout>
//         </div>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;







// import { useState, useEffect } from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { fetchMetadata } from './api';
// import Sidebar from './components/layout/Sidebar';
// import DynamicModelList from './pages/DynamicModelList';
// import LoadingSpinner from './components/ui/LoadingSpinner';

// function App() {
//   const [metadata, setMetadata] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchMetadata()
//       .then(data => {
//         setMetadata(data);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   if (loading) {
//     return (
//       <div className="h-screen flex items-center justify-center bg-canvas-default">
//         <LoadingSpinner />
//       </div>
//     );
//   }

//   if (!metadata) {
//     return <div className="p-8 text-light-blue-text">Failed to load metadata.</div>;
//   }

//   const modelNames = Object.keys(metadata);

//   return (
//     <BrowserRouter>
//       <div className="flex h-screen bg-canvas-default overflow-hidden">
//         <Sidebar models={metadata} />
//         <main className="flex-1 overflow-y-auto p-space-6">
//           <Routes>
//             <Route path="/" element={<Navigate to={`/${modelNames[0]?.toLowerCase()}`} replace />} />
//             {modelNames.map((model) => (
//               <Route
//                 key={model}
//                 path={`/${model.toLowerCase()}`}
//                 element={<DynamicModelList modelName={model} metadata={metadata} />}
//               />
//             ))}
//           </Routes>
//         </main>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;








// import { useState, useEffect } from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { fetchMetadata } from './api';
// import Sidebar from './components/layout/Sidebar';
// import DynamicModelList from './pages/DynamicModelList';
// import LoadingSpinner from './components/ui/LoadingSpinner';
// import { ThemeProvider } from './context/ThemeContext';

// function AppContent() {
//   const [metadata, setMetadata] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchMetadata()
//       .then(data => {
//         setMetadata(data);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   if (loading) {
//     return (
//       <div className="h-screen flex items-center justify-center bg-canvas-default">
//         <LoadingSpinner />
//       </div>
//     );
//   }

//   if (!metadata) {
//     return <div className="p-8 text-light-blue-text">Failed to load metadata.</div>;
//   }

//   const modelNames = Object.keys(metadata);

//   return (
//     <BrowserRouter>
//       <div className="flex h-screen bg-canvas-default overflow-hidden">
//         <Sidebar models={metadata} />
//         <main className="flex-1 overflow-y-auto p-space-6">
//           <Routes>
//             <Route path="/" element={<Navigate to={`/${modelNames[0]?.toLowerCase()}`} replace />} />
//             {modelNames.map((model) => (
//               <Route
//                 key={model}
//                 path={`/${model.toLowerCase()}`}
//                 element={<DynamicModelList modelName={model} metadata={metadata} />}
//               />
//             ))}
//           </Routes>
//         </main>
//       </div>
//     </BrowserRouter>
//   );
// }

// function App() {
//   return (
//     <ThemeProvider>
//       <AppContent />
//     </ThemeProvider>
//   );
// }

// export default App;







// import { useState, useEffect } from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { fetchMetadata } from './api';
// import Sidebar from './components/layout/Sidebar';
// import DynamicModelList from './pages/DynamicModelList';
// import LoadingSpinner from './components/ui/LoadingSpinner';

// function App() {
//   const [metadata, setMetadata] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchMetadata()
//       .then(data => {
//         setMetadata(data);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   if (loading) {
//     return (
//       <div className="h-screen flex items-center justify-center bg-canvas-default">
//         <LoadingSpinner />
//       </div>
//     );
//   }

//   if (!metadata) {
//     return <div className="p-8 text-light-blue-text">Failed to load metadata.</div>;
//   }

//   const modelNames = Object.keys(metadata);

//   return (
//     <BrowserRouter>
//       <div className="flex h-screen bg-canvas-default overflow-hidden">
//         <Sidebar models={metadata} />
//         <main className="flex-1 overflow-y-auto p-space-6">
//           <Routes>
//             <Route path="/" element={<Navigate to={`/${modelNames[0]?.toLowerCase()}`} replace />} />
//             {modelNames.map((model) => (
//               <Route
//                 key={model}
//                 path={`/${model.toLowerCase()}`}
//                 element={<DynamicModelList modelName={model} metadata={metadata} />}
//               />
//             ))}
//           </Routes>
//         </main>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;








// import { useState, useEffect } from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { fetchMetadata } from './api';
// import Sidebar from './components/layout/Sidebar';
// import DynamicModelList from './pages/DynamicModelList';
// import Login from './pages/Login';
// import LoadingSpinner from './components/ui/LoadingSpinner';

// function App() {
//   const [metadata, setMetadata] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false); // TODO: implement real auth

//   useEffect(() => {
//     fetchMetadata()
//       .then(data => {
//         setMetadata(data);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   if (loading) {
//     return (
//       <div className="h-screen flex items-center justify-center bg-canvas-default">
//         <LoadingSpinner />
//       </div>
//     );
//   }

//   // For demo, we redirect to login if not authenticated
//   // You can change this later
//   if (!isAuthenticated) {
//     return (
//       <BrowserRouter>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="*" element={<Navigate to="/login" replace />} />
//         </Routes>
//       </BrowserRouter>
//     );
//   }

//   if (!metadata) {
//     return <div className="p-8 text-light-blue-text">Failed to load metadata.</div>;
//   }

//   const modelNames = Object.keys(metadata);

//   return (
//     <BrowserRouter>
//       <div className="flex h-screen bg-canvas-default overflow-hidden">
//         <Sidebar models={metadata} />
//         <main className="flex-1 overflow-y-auto p-space-6">
//           <Routes>
//             <Route path="/" element={<Navigate to={`/${modelNames[0]?.toLowerCase()}`} replace />} />
//             <Route path="/login" element={<Navigate to="/" replace />} />
//             {modelNames.map((model) => (
//               <Route
//                 key={model}
//                 path={`/${model.toLowerCase()}`}
//                 element={<DynamicModelList modelName={model} metadata={metadata} />}
//               />
//             ))}
//           </Routes>
//         </main>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;









import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { fetchMetadata } from './api';
import Sidebar from './components/layout/Sidebar';
import DynamicModelList from './pages/DynamicModelList';
import CreateAdmin from './pages/CreateAdmin';
import LoadingSpinner from './components/ui/LoadingSpinner';

function App() {
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // TODO: implement real auth

  useEffect(() => {
    fetchMetadata()
      .then(data => {
        setMetadata(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-canvas-default">
        <LoadingSpinner />
      </div>
    );
  }

  // For demo, we redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/create-admin" element={<CreateAdmin />} />
          <Route path="*" element={<Navigate to="/create-admin" replace />} />
        </Routes>
      </BrowserRouter>
    );
  }

  if (!metadata) {
    return <div className="p-8 text-light-blue-text">Failed to load metadata.</div>;
  }

  const modelNames = Object.keys(metadata);

  return (
    <BrowserRouter>
      <div className="flex h-screen bg-canvas-default overflow-hidden">
        <Sidebar models={metadata} />
        <main className="flex-1 overflow-y-auto p-space-6">
          <Routes>
            <Route path="/" element={<Navigate to={`/${modelNames[0]?.toLowerCase()}`} replace />} />
            <Route path="/create-admin" element={<CreateAdmin />} />
            {modelNames.map((model) => (
              <Route
                key={model}
                path={`/${model.toLowerCase()}`}
                element={<DynamicModelList modelName={model} metadata={metadata} />}
              />
            ))}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;