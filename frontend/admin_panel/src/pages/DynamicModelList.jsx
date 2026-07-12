// import { useState, useEffect } from 'react';
// import { fetchList, createItem, updateItem, deleteItem } from '../api';
// import Modal from '../components/ui/Modal';
// import DynamicForm from '../components/ui/DynamicForm';
// import LoadingSpinner from '../components/ui/LoadingSpinner';
// import Pagination from '../components/common/Pagination';

// export default function DynamicModelList({ modelName, metadata }) {
//   const [items, setItems] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [page, setPage] = useState(1);
//   const [perPage] = useState(20);
//   const [search, setSearch] = useState('');
//   const [sort, setSort] = useState('');
//   const [order, setOrder] = useState('asc');
//   const [loading, setLoading] = useState(false);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit'
//   const [currentItem, setCurrentItem] = useState(null);

//   const modelMeta = metadata[modelName];
//   const columns = modelMeta?.columns || [];
//   const primaryKey = modelMeta?.primary_keys?.[0] || 'id';

//   // Fetch data
//   const loadData = async () => {
//     setLoading(true);
//     try {
//       const params = { page, per_page, search, sort, order };
//       const data = await fetchList(modelName, params);
//       setItems(data.items || []);
//       setTotal(data.total || 0);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, [page, search, sort, order]);

//   // Handlers
//   const handleCreate = async (data) => {
//     try {
//       await createItem(modelName, data);
//       setModalOpen(false);
//       loadData();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleUpdate = async (data) => {
//     try {
//       await updateItem(modelName, currentItem[primaryKey], data);
//       setModalOpen(false);
//       loadData();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this item?')) return;
//     try {
//       await deleteItem(modelName, id);
//       loadData();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const openCreateModal = () => {
//     setCurrentItem(null);
//     setModalMode('create');
//     setModalOpen(true);
//   };

//   const openEditModal = (item) => {
//     setCurrentItem(item);
//     setModalMode('edit');
//     setModalOpen(true);
//   };

//   // Sorting
//   const handleSort = (col) => {
//     if (sort === col) {
//       setOrder(order === 'asc' ? 'desc' : 'asc');
//     } else {
//       setSort(col);
//       setOrder('asc');
//     }
//   };

//   // Build table headers from columns, excluding those we might hide (like password)
//   const visibleColumns = columns.filter(
//     col => !col.name.startsWith('_') && col.name !== 'hashed_password'
//   );

//   return (
//     <div>
//       {/* Header actions */}
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-light tracking-[-0.01em] text-on-surface capitalize">
//           {modelName}s
//         </h1>
//         <button
//           onClick={openCreateModal}
//           className="bg-primary text-neutral text-sm font-normal px-5 py-2 rounded-sm hover:bg-tertiary hover:text-primary transition shadow-sm"
//         >
//           + Add New
//         </button>
//       </div>

//       {/* Search bar */}
//       <div className="mb-6">
//         <input
//           type="text"
//           placeholder="Search..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full md:w-80 bg-surface text-on-surface text-sm font-light rounded-sm px-4 py-3 border border-border focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted/60"
//         />
//       </div>

//       {/* Table */}
//       {loading ? (
//         <LoadingSpinner />
//       ) : (
//         <>
//           <div className="bg-surface rounded-md border border-border/50 shadow-sm overflow-x-auto">
//             <table className="w-full text-left">
//               <thead>
//                 <tr className="border-b border-border/40 bg-[#F8FAFC]/50">
//                   {visibleColumns.map((col) => (
//                     <th
//                       key={col.name}
//                       onClick={() => handleSort(col.name)}
//                       className="px-4 py-3 text-sm font-normal text-muted tracking-[-0.01em] cursor-pointer hover:text-on-surface"
//                     >
//                       {col.name}
//                       {sort === col.name && (
//                         <span className="ml-1">{order === 'asc' ? '↑' : '↓'}</span>
//                       )}
//                     </th>
//                   ))}
//                   <th className="px-4 py-3 text-sm font-normal text-muted tracking-[-0.01em]">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {items.length === 0 ? (
//                   <tr>
//                     <td colSpan={visibleColumns.length + 1} className="px-4 py-8 text-center text-muted">
//                       No items found.
//                     </td>
//                   </tr>
//                 ) : (
//                   items.map((item) => (
//                     <tr key={item[primaryKey]} className="border-b border-border/30 last:border-0 hover:bg-primary/5 transition">
//                       {visibleColumns.map((col) => (
//                         <td key={col.name} className="px-4 py-3 text-sm font-light text-on-surface">
//                           {item[col.name] !== undefined ? String(item[col.name]) : ''}
//                         </td>
//                       ))}
//                       <td className="px-4 py-3">
//                         <button
//                           onClick={() => openEditModal(item)}
//                           className="text-sm text-primary hover:text-tertiary mr-3 transition"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDelete(item[primaryKey])}
//                           className="text-sm text-error hover:opacity-70 transition"
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="mt-4">
//             <Pagination
//               page={page}
//               total={total}
//               perPage={perPage}
//               onPageChange={setPage}
//             />
//           </div>
//         </>
//       )}

//       {/* Modal */}
//       <Modal
//         isOpen={modalOpen}
//         onClose={() => setModalOpen(false)}
//         title={modalMode === 'create' ? `Create ${modelName}` : `Edit ${modelName}`}
//       >
//         <DynamicForm
//           columns={visibleColumns}
//           initialData={currentItem || {}}
//           onSubmit={modalMode === 'create' ? handleCreate : handleUpdate}
//           onCancel={() => setModalOpen(false)}
//           isEdit={modalMode === 'edit'}
//         />
//       </Modal>
//     </div>
//   );
// }






// import { useState, useEffect } from 'react';
// import { fetchList, createItem, updateItem, deleteItem } from '../api';
// import Modal from '../components/ui/Modal';
// import DynamicForm from '../components/ui/DynamicForm';
// import LoadingSpinner from '../components/ui/LoadingSpinner';
// import Pagination from '../components/common/Pagination';

// export default function DynamicModelList({ modelName, metadata }) {
//   const [items, setItems] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [page, setPage] = useState(1);
//   const [perPage] = useState(20);
//   const [search, setSearch] = useState('');
//   const [sort, setSort] = useState('');
//   const [order, setOrder] = useState('asc');
//   const [loading, setLoading] = useState(false);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit'
//   const [currentItem, setCurrentItem] = useState(null);

//   const modelMeta = metadata[modelName];
//   const columns = modelMeta?.columns || [];
//   const primaryKey = modelMeta?.primary_keys?.[0] || 'id';

//   // Load data whenever page, search, sort, order change
//   const loadData = async () => {
//     setLoading(true);
//     try {
//       const params = { page, per_page, search, sort, order };
//       const data = await fetchList(modelName, params);
//       setItems(data.items || []);
//       setTotal(data.total || 0);
//     } catch (error) {
//       console.error('Error loading data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, [page, search, sort, order]);

//   // Handlers for CRUD (currently only GET is fully implemented)
//   const handleCreate = async (data) => {
//     try {
//       await createItem(modelName, data);
//       setModalOpen(false);
//       loadData(); // refresh list
//     } catch (error) {
//       console.error('Create error:', error);
//     }
//   };

//   const handleUpdate = async (data) => {
//     try {
//       await updateItem(modelName, currentItem[primaryKey], data);
//       setModalOpen(false);
//       loadData();
//     } catch (error) {
//       console.error('Update error:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this item?')) return;
//     try {
//       await deleteItem(modelName, id);
//       loadData();
//     } catch (error) {
//       console.error('Delete error:', error);
//     }
//   };

//   const openCreateModal = () => {
//     setCurrentItem(null);
//     setModalMode('create');
//     setModalOpen(true);
//   };

//   const openEditModal = (item) => {
//     setCurrentItem(item);
//     setModalMode('edit');
//     setModalOpen(true);
//   };

//   // Sorting handler
//   const handleSort = (col) => {
//     if (sort === col) {
//       setOrder(order === 'asc' ? 'desc' : 'asc');
//     } else {
//       setSort(col);
//       setOrder('asc');
//     }
//   };

//   // Filter out columns we don't want to display
//   const visibleColumns = columns.filter(
//     col => !col.name.startsWith('_') && col.name !== 'hashed_password'
//   );

//   return (
//     <div>
//       {/* Header with Add button */}
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-light tracking-[-0.01em] text-on-surface capitalize">
//           {modelName}s
//         </h1>
//         <button
//           onClick={openCreateModal}
//           className="bg-primary text-neutral text-sm font-normal px-5 py-2 rounded-sm hover:bg-tertiary hover:text-primary transition shadow-sm"
//         >
//           + Add New
//         </button>
//       </div>

//       {/* Search bar */}
//       <div className="mb-6">
//         <input
//           type="text"
//           placeholder="Search..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full md:w-80 bg-surface text-on-surface text-sm font-light rounded-sm px-4 py-3 border border-border focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted/60"
//         />
//       </div>

//       {/* Table */}
//       {loading ? (
//         <LoadingSpinner />
//       ) : (
//         <>
//           <div className="bg-surface rounded-md border border-border/50 shadow-sm overflow-x-auto">
//             <table className="w-full text-left">
//               <thead>
//                 <tr className="border-b border-border/40 bg-[#F8FAFC]/50">
//                   {visibleColumns.map((col) => (
//                     <th
//                       key={col.name}
//                       onClick={() => handleSort(col.name)}
//                       className="px-4 py-3 text-sm font-normal text-muted tracking-[-0.01em] cursor-pointer hover:text-on-surface select-none"
//                     >
//                       {col.name}
//                       {sort === col.name && (
//                         <span className="ml-1">{order === 'asc' ? '↑' : '↓'}</span>
//                       )}
//                     </th>
//                   ))}
//                   <th className="px-4 py-3 text-sm font-normal text-muted tracking-[-0.01em]">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {items.length === 0 ? (
//                   <tr>
//                     <td colSpan={visibleColumns.length + 1} className="px-4 py-8 text-center text-muted">
//                       No items found.
//                     </td>
//                   </tr>
//                 ) : (
//                   items.map((item) => (
//                     <tr key={item[primaryKey]} className="border-b border-border/30 last:border-0 hover:bg-primary/5 transition">
//                       {visibleColumns.map((col) => (
//                         <td key={col.name} className="px-4 py-3 text-sm font-light text-on-surface">
//                           {item[col.name] !== undefined && item[col.name] !== null ? String(item[col.name]) : ''}
//                         </td>
//                       ))}
//                       <td className="px-4 py-3">
//                         <button
//                           onClick={() => openEditModal(item)}
//                           className="text-sm text-primary hover:text-tertiary mr-3 transition"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDelete(item[primaryKey])}
//                           className="text-sm text-error hover:opacity-70 transition"
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="mt-4">
//             <Pagination
//               page={page}
//               total={total}
//               perPage={perPage}
//               onPageChange={setPage}
//             />
//           </div>
//         </>
//       )}

//       {/* Modal for Create/Edit */}
//       <Modal
//         isOpen={modalOpen}
//         onClose={() => setModalOpen(false)}
//         title={modalMode === 'create' ? `Create ${modelName}` : `Edit ${modelName}`}
//       >
//         <DynamicForm
//           columns={visibleColumns}
//           initialData={currentItem || {}}
//           onSubmit={modalMode === 'create' ? handleCreate : handleUpdate}
//           onCancel={() => setModalOpen(false)}
//           isEdit={modalMode === 'edit'}
//         />
//       </Modal>
//     </div>
//   );
// }










// import { useState, useEffect } from 'react';
// import { fetchList, createItem, updateItem, deleteItem } from '../api';
// import Modal from '../components/ui/Modal';
// import DynamicForm from '../components/ui/DynamicForm';
// import LoadingSpinner from '../components/ui/LoadingSpinner';
// import Pagination from '../components/common/Pagination';

// export default function DynamicModelList({ modelName, metadata }) {
//   const [items, setItems] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [page, setPage] = useState(1);
//   const [perPage] = useState(20);
//   const [search, setSearch] = useState('');
//   const [sort, setSort] = useState('');
//   const [order, setOrder] = useState('asc');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalMode, setModalMode] = useState('create');
//   const [currentItem, setCurrentItem] = useState(null);

//   const modelMeta = metadata[modelName];
//   const columns = modelMeta?.columns || [];
//   const primaryKey = modelMeta?.primary_keys?.[0] || 'id';

//   // Load data function with logging
//   const loadData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const params = { page, per_page: perPage, search, sort, order };
//       console.log(`📡 Calling GET /api/${modelName.toLowerCase()} with:`, params);
//       const data = await fetchList(modelName, params);
//       console.log(`✅ Received ${data.items?.length || 0} items, total=${data.total}`);
//       setItems(data.items || []);
//       setTotal(data.total || 0);
//     } catch (err) {
//       console.error('❌ Failed to load data:', err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Auto-fetch when dependencies change
//   useEffect(() => {
//     loadData();
//   }, [page, search, sort, order]);

//   // Handlers for CRUD...
//   const handleCreate = async (data) => {
//     try {
//       await createItem(modelName, data);
//       setModalOpen(false);
//       loadData();
//     } catch (err) {
//       console.error('Create error:', err);
//       setError(err.message);
//     }
//   };

//   const handleUpdate = async (data) => {
//     try {
//       await updateItem(modelName, currentItem[primaryKey], data);
//       setModalOpen(false);
//       loadData();
//     } catch (err) {
//       console.error('Update error:', err);
//       setError(err.message);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Delete this item?')) return;
//     try {
//       await deleteItem(modelName, id);
//       loadData();
//     } catch (err) {
//       console.error('Delete error:', err);
//       setError(err.message);
//     }
//   };

//   const openCreateModal = () => {
//     setCurrentItem(null);
//     setModalMode('create');
//     setModalOpen(true);
//   };

//   const openEditModal = (item) => {
//     setCurrentItem(item);
//     setModalMode('edit');
//     setModalOpen(true);
//   };

//   const handleSort = (col) => {
//     if (sort === col) {
//       setOrder(order === 'asc' ? 'desc' : 'asc');
//     } else {
//       setSort(col);
//       setOrder('asc');
//     }
//   };

//   const visibleColumns = columns.filter(
//     col => !col.name.startsWith('_') && col.name !== 'hashed_password'
//   );

//   return (
//     <div>
//       {/* Header with Add & Refresh buttons */}
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-light tracking-[-0.01em] text-on-surface capitalize">
//           {modelName}s
//         </h1>
//         <div className="flex gap-3">
//           <button
//             onClick={loadData}
//             className="px-4 py-2 text-sm font-light text-primary border border-primary rounded-sm hover:bg-primary/5 transition"
//           >
//             🔄 Refresh
//           </button>
//           <button
//             onClick={openCreateModal}
//             className="bg-primary text-neutral text-sm font-normal px-5 py-2 rounded-sm hover:bg-tertiary hover:text-primary transition shadow-sm"
//           >
//             + Add New
//           </button>
//         </div>
//       </div>

//       {/* Search bar */}
//       <div className="mb-6">
//         <input
//           type="text"
//           placeholder="Search..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full md:w-80 bg-surface text-on-surface text-sm font-light rounded-sm px-4 py-3 border border-border focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted/60"
//         />
//       </div>

//       {/* Error display */}
//       {error && (
//         <div className="mb-4 p-3 bg-error/10 text-error border border-error/30 rounded-sm">
//           ❌ {error}
//         </div>
//       )}

//       {/* Loading / Table */}
//       {loading ? (
//         <LoadingSpinner />
//       ) : (
//         <>
//           <div className="bg-surface rounded-md border border-border/50 shadow-sm overflow-x-auto">
//             <table className="w-full text-left">
//               <thead>
//                 <tr className="border-b border-border/40 bg-[#F8FAFC]/50">
//                   {visibleColumns.map((col) => (
//                     <th
//                       key={col.name}
//                       onClick={() => handleSort(col.name)}
//                       className="px-4 py-3 text-sm font-normal text-muted tracking-[-0.01em] cursor-pointer hover:text-on-surface select-none"
//                     >
//                       {col.name}
//                       {sort === col.name && (
//                         <span className="ml-1">{order === 'asc' ? '↑' : '↓'}</span>
//                       )}
//                     </th>
//                   ))}
//                   <th className="px-4 py-3 text-sm font-normal text-muted tracking-[-0.01em]">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {items.length === 0 ? (
//                   <tr>
//                     <td colSpan={visibleColumns.length + 1} className="px-4 py-8 text-center text-muted">
//                       No items found.
//                     </td>
//                   </tr>
//                 ) : (
//                   items.map((item) => (
//                     <tr key={item[primaryKey]} className="border-b border-border/30 last:border-0 hover:bg-primary/5 transition">
//                       {visibleColumns.map((col) => (
//                         <td key={col.name} className="px-4 py-3 text-sm font-light text-on-surface">
//                           {item[col.name] !== undefined && item[col.name] !== null ? String(item[col.name]) : ''}
//                         </td>
//                       ))}
//                       <td className="px-4 py-3">
//                         <button
//                           onClick={() => openEditModal(item)}
//                           className="text-sm text-primary hover:text-tertiary mr-3 transition"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDelete(item[primaryKey])}
//                           className="text-sm text-error hover:opacity-70 transition"
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>

//           <div className="mt-4">
//             <Pagination
//               page={page}
//               total={total}
//               perPage={perPage}
//               onPageChange={setPage}
//             />
//           </div>
//         </>
//       )}

//       {/* Modal for Create/Edit */}
//       <Modal
//         isOpen={modalOpen}
//         onClose={() => setModalOpen(false)}
//         title={modalMode === 'create' ? `Create ${modelName}` : `Edit ${modelName}`}
//       >
//         <DynamicForm
//           columns={visibleColumns}
//           initialData={currentItem || {}}
//           onSubmit={modalMode === 'create' ? handleCreate : handleUpdate}
//           onCancel={() => setModalOpen(false)}
//           isEdit={modalMode === 'edit'}
//         />
//       </Modal>
//     </div>
//   );
// }










// import { useState, useEffect, useCallback } from 'react';
// import { fetchList, createItem, updateItem, deleteItem } from '../api';
// import Modal from '../components/ui/Modal';
// import DynamicForm from '../components/ui/DynamicForm';
// import LoadingSpinner from '../components/ui/LoadingSpinner';
// import Pagination from '../components/common/Pagination';

// export default function DynamicModelList({ modelName, metadata }) {
//   // State for data and pagination
//   const [items, setItems] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [page, setPage] = useState(1);
//   const [perPage] = useState(20);
//   const [sort, setSort] = useState('');
//   const [order, setOrder] = useState('asc');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Search state: separate input and actual query used in API
//   const [searchInput, setSearchInput] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');

//   // Modal state
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit'
//   const [currentItem, setCurrentItem] = useState(null);

//   const modelMeta = metadata[modelName];
//   const columns = modelMeta?.columns || [];
//   const primaryKey = modelMeta?.primary_keys?.[0] || 'id';

//   // Load data function
//   const loadData = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const params = { page, per_page: perPage, search: searchQuery, sort, order };
//       console.log(`📡 Fetching /api/${modelName.toLowerCase()}`, params);
//       const data = await fetchList(modelName, params);
//       setItems(data.items || []);
//       setTotal(data.total || 0);
//     } catch (err) {
//       console.error('Load error:', err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [modelName, page, perPage, searchQuery, sort, order]);

//   // Reset state when model changes
//   useEffect(() => {
//     setPage(1);
//     setSearchInput('');
//     setSearchQuery('');
//     setSort('');
//     setOrder('asc');
//     setItems([]);
//     setTotal(0);
//     setError(null);
//     // The loadData will be triggered by the next effect (dependencies change)
//   }, [modelName]);

//   // Fetch when page, sort, order, or searchQuery changes (but NOT on searchInput typing)
//   useEffect(() => {
//     loadData();
//   }, [loadData]);

//   // Handlers
//   const handleSearch = () => {
//     setSearchQuery(searchInput);
//     setPage(1); // reset to first page on new search
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   const handleSort = (col) => {
//     if (sort === col) {
//       setOrder(order === 'asc' ? 'desc' : 'asc');
//     } else {
//       setSort(col);
//       setOrder('asc');
//     }
//     setPage(1); // reset page when sorting changes
//   };

//   const openCreateModal = () => {
//     setCurrentItem(null);
//     setModalMode('create');
//     setModalOpen(true);
//   };

//   const openEditModal = (item) => {
//     setCurrentItem(item);
//     setModalMode('edit');
//     setModalOpen(true);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm(`Are you sure you want to delete this ${modelName}?`)) return;
//     try {
//       await deleteItem(modelName, id);
//       loadData(); // refresh after deletion
//     } catch (err) {
//       console.error('Delete error:', err);
//       setError(err.message);
//     }
//   };

//   const handleCreate = async (data) => {
//     try {
//       await createItem(modelName, data);
//       setModalOpen(false);
//       loadData();
//     } catch (err) {
//       console.error('Create error:', err);
//       setError(err.message);
//     }
//   };

//   const handleUpdate = async (data) => {
//     try {
//       await updateItem(modelName, currentItem[primaryKey], data);
//       setModalOpen(false);
//       loadData();
//     } catch (err) {
//       console.error('Update error:', err);
//       setError(err.message);
//     }
//   };

//   // Filter columns to display
//   const visibleColumns = columns.filter(
//     col => !col.name.startsWith('_') && col.name !== 'hashed_password'
//   );

//   return (
//     <div>
//       {/* Header with Add & Refresh */}
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-light tracking-[-0.01em] text-on-surface capitalize">
//           {modelName}s
//         </h1>
//         <div className="flex gap-3">
//           <button
//             onClick={loadData}
//             className="px-4 py-2 text-sm font-light text-primary border border-primary rounded-sm hover:bg-primary/5 transition"
//           >
//             🔄 Refresh
//           </button>
//           <button
//             onClick={openCreateModal}
//             className="bg-primary text-neutral text-sm font-normal px-5 py-2 rounded-sm hover:bg-tertiary hover:text-primary transition shadow-sm"
//           >
//             + Add New
//           </button>
//         </div>
//       </div>

//       {/* Search bar with button */}
//       <div className="mb-6 flex gap-2">
//         <input
//           type="text"
//           placeholder="Search..."
//           value={searchInput}
//           onChange={(e) => setSearchInput(e.target.value)}
//           onKeyPress={handleKeyPress}
//           className="flex-1 md:w-80 bg-surface text-on-surface text-sm font-light rounded-sm px-4 py-3 border border-border focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted/60"
//         />
//         <button
//           onClick={handleSearch}
//           className="bg-primary text-neutral text-sm font-normal px-5 py-2 rounded-sm hover:bg-tertiary hover:text-primary transition shadow-sm"
//         >
//           Search
//         </button>
//       </div>

//       {/* Error display */}
//       {error && (
//         <div className="mb-4 p-3 bg-error/10 text-error border border-error/30 rounded-sm">
//           ❌ {error}
//         </div>
//       )}

//       {/* Loading / Table */}
//       {loading ? (
//         <LoadingSpinner />
//       ) : (
//         <>
//           <div className="bg-surface rounded-md border border-border/50 shadow-sm overflow-x-auto">
//             <table className="w-full text-left">
//               <thead>
//                 <tr className="border-b border-border/40 bg-[#F8FAFC]/50">
//                   {visibleColumns.map((col) => (
//                     <th
//                       key={col.name}
//                       onClick={() => handleSort(col.name)}
//                       className="px-4 py-3 text-sm font-normal text-muted tracking-[-0.01em] cursor-pointer hover:text-on-surface select-none"
//                     >
//                       {col.name}
//                       {sort === col.name && (
//                         <span className="ml-1">{order === 'asc' ? '↑' : '↓'}</span>
//                       )}
//                     </th>
//                   ))}
//                   <th className="px-4 py-3 text-sm font-normal text-muted tracking-[-0.01em]">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {items.length === 0 ? (
//                   <tr>
//                     <td colSpan={visibleColumns.length + 1} className="px-4 py-8 text-center text-muted">
//                       No items found.
//                     </td>
//                   </tr>
//                 ) : (
//                   items.map((item) => (
//                     <tr key={item[primaryKey]} className="border-b border-border/30 last:border-0 hover:bg-primary/5 transition">
//                       {visibleColumns.map((col) => (
//                         <td key={col.name} className="px-4 py-3 text-sm font-light text-on-surface">
//                           {item[col.name] !== undefined && item[col.name] !== null ? String(item[col.name]) : ''}
//                         </td>
//                       ))}
//                       <td className="px-4 py-3">
//                         <button
//                           onClick={() => openEditModal(item)}
//                           className="text-sm text-primary hover:text-tertiary mr-3 transition"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDelete(item[primaryKey])}
//                           className="text-sm text-error hover:opacity-70 transition"
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>

//           <div className="mt-4">
//             <Pagination
//               page={page}
//               total={total}
//               perPage={perPage}
//               onPageChange={setPage}
//             />
//           </div>
//         </>
//       )}

//       {/* Modal for Create/Edit */}
//       <Modal
//         isOpen={modalOpen}
//         onClose={() => setModalOpen(false)}
//         title={modalMode === 'create' ? `Create ${modelName}` : `Edit ${modelName}`}
//       >
//         <DynamicForm
//           columns={visibleColumns}
//           initialData={currentItem || {}}
//           onSubmit={modalMode === 'create' ? handleCreate : handleUpdate}
//           onCancel={() => setModalOpen(false)}
//           isEdit={modalMode === 'edit'}
//         />
//       </Modal>
//     </div>
//   );
// }










// import { useState, useEffect, useCallback } from 'react';
// import { fetchList, createItem, updateItem, deleteItem } from '../api';
// import Modal from '../components/ui/Modal';
// import DynamicForm from '../components/ui/DynamicForm';
// import LoadingSpinner from '../components/ui/LoadingSpinner';
// import Pagination from '../components/common/Pagination';

// export default function DynamicModelList({ modelName, metadata }) {
//   // State for data and pagination
//   const [items, setItems] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [page, setPage] = useState(1);
//   const [perPage] = useState(10); // 👈 changed to 10
//   const [sort, setSort] = useState('');
//   const [order, setOrder] = useState('asc');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Filters: object where key = column name, value = filter string
//   const [filters, setFilters] = useState({});
//   const [activeFilters, setActiveFilters] = useState({}); // Applied filters (clicked Apply)

//   // Modal state
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit'
//   const [currentItem, setCurrentItem] = useState(null);

//   const modelMeta = metadata[modelName];
//   const columns = modelMeta?.columns || [];
//   const primaryKey = modelMeta?.primary_keys?.[0] || 'id';

//   // Visible columns (exclude hidden)
//   const visibleColumns = columns.filter(
//     col => !col.name.startsWith('_') && col.name !== 'hashed_password'
//   );

//   // Load data function
//   const loadData = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       // Build query params: page, per_page, sort, order, and all active filters as key=value
//       const params = {
//         page,
//         per_page: perPage,
//         sort,
//         order,
//         ...activeFilters, // spread filter key/value pairs
//       };
//       console.log(`📡 Fetching /api/${modelName.toLowerCase()}`, params);
//       const data = await fetchList(modelName, params);
//       setItems(data.items || []);
//       setTotal(data.total || 0);
//     } catch (err) {
//       console.error('Load error:', err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [modelName, page, perPage, sort, order, activeFilters]);

//   // Reset state when model changes
//   useEffect(() => {
//     setPage(1);
//     setFilters({});
//     setActiveFilters({});
//     setSort('');
//     setOrder('asc');
//     setItems([]);
//     setTotal(0);
//     setError(null);
//   }, [modelName]);

//   // Fetch when page, sort, order, or activeFilters change
//   useEffect(() => {
//     loadData();
//   }, [loadData]);

//   // Handlers for filter changes
//   const handleFilterChange = (colName, value) => {
//     setFilters(prev => ({ ...prev, [colName]: value }));
//   };

//   const applyFilters = () => {
//     // Remove empty filter values
//     const cleaned = {};
//     Object.keys(filters).forEach(key => {
//       if (filters[key] && filters[key].trim() !== '') {
//         cleaned[key] = filters[key].trim();
//       }
//     });
//     setActiveFilters(cleaned);
//     setPage(1); // reset to first page when filters applied
//   };

//   const clearFilters = () => {
//     setFilters({});
//     setActiveFilters({});
//     setPage(1);
//   };

//   // Handlers for sorting, CRUD, etc.
//   const handleSort = (col) => {
//     if (sort === col) {
//       setOrder(order === 'asc' ? 'desc' : 'asc');
//     } else {
//       setSort(col);
//       setOrder('asc');
//     }
//     setPage(1);
//   };

//   const openCreateModal = () => {
//     setCurrentItem(null);
//     setModalMode('create');
//     setModalOpen(true);
//   };

//   const openEditModal = (item) => {
//     setCurrentItem(item);
//     setModalMode('edit');
//     setModalOpen(true);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm(`Delete this ${modelName}?`)) return;
//     try {
//       await deleteItem(modelName, id);
//       loadData();
//     } catch (err) {
//       console.error('Delete error:', err);
//       setError(err.message);
//     }
//   };

//   const handleCreate = async (data) => {
//     try {
//       await createItem(modelName, data);
//       setModalOpen(false);
//       loadData();
//     } catch (err) {
//       console.error('Create error:', err);
//       setError(err.message);
//     }
//   };

//   const handleUpdate = async (data) => {
//     try {
//       await updateItem(modelName, currentItem[primaryKey], data);
//       setModalOpen(false);
//       loadData();
//     } catch (err) {
//       console.error('Update error:', err);
//       setError(err.message);
//     }
//   };

//   return (
//     <div>
//       {/* Header with Add & Refresh */}
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-light tracking-[-0.01em] text-on-surface capitalize">
//           {modelName}s
//         </h1>
//         <div className="flex gap-3">
//           <button
//             onClick={loadData}
//             className="px-4 py-2 text-sm font-light text-primary border border-primary rounded-sm hover:bg-primary/5 transition"
//           >
//             🔄 Refresh
//           </button>
//           <button
//             onClick={openCreateModal}
//             className="bg-primary text-neutral text-sm font-normal px-5 py-2 rounded-sm hover:bg-tertiary hover:text-primary transition shadow-sm"
//           >
//             + Add New
//           </button>
//         </div>
//       </div>

//       {/* Dynamic Filter Bar */}
//       <div className="mb-4 p-4 bg-surface border border-border rounded-sm">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
//           {visibleColumns.map((col) => (
//             <div key={col.name} className="flex flex-col">
//               <label className="text-xs font-normal text-muted tracking-[-0.01em] mb-1">
//                 {col.name}
//               </label>
//               <input
//                 type="text"
//                 placeholder="Filter..."
//                 value={filters[col.name] || ''}
//                 onChange={(e) => handleFilterChange(col.name, e.target.value)}
//                 className="bg-surface text-on-surface text-sm font-light rounded-sm px-3 py-2 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
//               />
//             </div>
//           ))}
//         </div>
//         <div className="flex gap-3 mt-4">
//           <button
//             onClick={applyFilters}
//             className="bg-primary text-neutral text-sm font-normal px-5 py-2 rounded-sm hover:bg-tertiary hover:text-primary transition shadow-sm"
//           >
//             Apply Filters
//           </button>
//           <button
//             onClick={clearFilters}
//             className="text-sm font-light text-muted hover:text-on-surface border border-border px-5 py-2 rounded-sm transition"
//           >
//             Clear Filters
//           </button>
//         </div>
//       </div>

//       {/* Error display */}
//       {error && (
//         <div className="mb-4 p-3 bg-error/10 text-error border border-error/30 rounded-sm">
//           ❌ {error}
//         </div>
//       )}

//       {/* Loading / Table */}
//       {loading ? (
//         <LoadingSpinner />
//       ) : (
//         <>
//           <div className="bg-surface rounded-md border border-border/50 shadow-sm overflow-x-auto">
//             <table className="w-full text-left">
//               <thead>
//                 <tr className="border-b border-border/40 bg-[#F8FAFC]/50">
//                   {visibleColumns.map((col) => (
//                     <th
//                       key={col.name}
//                       onClick={() => handleSort(col.name)}
//                       className="px-4 py-3 text-sm font-normal text-muted tracking-[-0.01em] cursor-pointer hover:text-on-surface select-none"
//                     >
//                       {col.name}
//                       {sort === col.name && (
//                         <span className="ml-1">{order === 'asc' ? '↑' : '↓'}</span>
//                       )}
//                     </th>
//                   ))}
//                   <th className="px-4 py-3 text-sm font-normal text-muted tracking-[-0.01em]">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {items.length === 0 ? (
//                   <tr>
//                     <td colSpan={visibleColumns.length + 1} className="px-4 py-8 text-center text-muted">
//                       No items found.
//                     </td>
//                   </tr>
//                 ) : (
//                   items.map((item) => (
//                     <tr key={item[primaryKey]} className="border-b border-border/30 last:border-0 hover:bg-primary/5 transition">
//                       {visibleColumns.map((col) => (
//                         <td key={col.name} className="px-4 py-3 text-sm font-light text-on-surface">
//                           {item[col.name] !== undefined && item[col.name] !== null ? String(item[col.name]) : ''}
//                         </td>
//                       ))}
//                       <td className="px-4 py-3">
//                         {/* Edit button - blue box */}
//                         <button
//                           onClick={() => openEditModal(item)}
//                           className="mr-2 px-3 py-1 text-xs font-medium text-primary bg-primary/10 border border-primary rounded-sm hover:bg-primary hover:text-white transition"
//                         >
//                           Edit
//                         </button>
//                         {/* Delete button - red box */}
//                         <button
//                           onClick={() => handleDelete(item[primaryKey])}
//                           className="px-3 py-1 text-xs font-medium text-error bg-error/10 border border-error rounded-sm hover:bg-error hover:text-white transition"
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>

//           <div className="mt-4">
//             <Pagination
//               page={page}
//               total={total}
//               perPage={perPage}
//               onPageChange={setPage}
//             />
//           </div>
//         </>
//       )}

//       {/* Modal for Create/Edit */}
//       <Modal
//         isOpen={modalOpen}
//         onClose={() => setModalOpen(false)}
//         title={modalMode === 'create' ? `Create ${modelName}` : `Edit ${modelName}`}
//       >
//         <DynamicForm
//           columns={visibleColumns}
//           initialData={currentItem || {}}
//           onSubmit={modalMode === 'create' ? handleCreate : handleUpdate}
//           onCancel={() => setModalOpen(false)}
//           isEdit={modalMode === 'edit'}
//         />
//       </Modal>
//     </div>
//   );
// }














// import { useState, useEffect, useCallback } from 'react';
// import { fetchList, createItem, updateItem, deleteItem } from '../api';
// import Modal from '../components/ui/Modal';
// import DynamicForm from '../components/ui/DynamicForm';
// import LoadingSpinner from '../components/ui/LoadingSpinner';
// import Pagination from '../components/common/Pagination';

// export default function DynamicModelList({ modelName, metadata }) {
//   const [items, setItems] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [page, setPage] = useState(1);
//   const [perPage] = useState(10);
//   const [sort, setSort] = useState('');
//   const [order, setOrder] = useState('asc');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const [filters, setFilters] = useState({});
//   const [activeFilters, setActiveFilters] = useState({});

//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalMode, setModalMode] = useState('create');
//   const [currentItem, setCurrentItem] = useState(null);

//   const modelMeta = metadata[modelName];
//   const columns = modelMeta?.columns || [];
//   const primaryKey = modelMeta?.primary_keys?.[0] || 'id';

//   const visibleColumns = columns.filter(
//     col => !col.name.startsWith('_') && col.name !== 'hashed_password'
//   );

//   const loadData = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const params = {
//         page,
//         per_page: perPage,
//         sort,
//         order,
//         ...activeFilters,
//       };
//       console.log(`📡 Fetching /api/${modelName.toLowerCase()}`, params);
//       const data = await fetchList(modelName, params);
//       setItems(data.items || []);
//       setTotal(data.total || 0);
//     } catch (err) {
//       console.error('Load error:', err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [modelName, page, perPage, sort, order, activeFilters]);

//   // Reset when model changes
//   useEffect(() => {
//     setPage(1);
//     setFilters({});
//     setActiveFilters({});
//     setSort('');
//     setOrder('asc');
//     setItems([]);
//     setTotal(0);
//     setError(null);
//   }, [modelName]);

//   // Load when dependencies change
//   useEffect(() => {
//     loadData();
//   }, [loadData]);

//   // Filter handlers
//   const handleFilterChange = (colName, value) => {
//     setFilters(prev => ({ ...prev, [colName]: value }));
//   };

//   const applyFilters = () => {
//     const cleaned = {};
//     Object.keys(filters).forEach(key => {
//       if (filters[key] && filters[key].trim() !== '') {
//         cleaned[key] = filters[key].trim();
//       }
//     });
//     setActiveFilters(cleaned);
//     setPage(1);
//   };

//   const clearFilters = () => {
//     setFilters({});
//     setActiveFilters({});
//     setPage(1);
//   };

//   const handleSort = (col) => {
//     if (sort === col) {
//       setOrder(order === 'asc' ? 'desc' : 'asc');
//     } else {
//       setSort(col);
//       setOrder('asc');
//     }
//     setPage(1);
//   };

//   const openCreateModal = () => {
//     setCurrentItem(null);
//     setModalMode('create');
//     setModalOpen(true);
//   };

//   const openEditModal = (item) => {
//     setCurrentItem(item);
//     setModalMode('edit');
//     setModalOpen(true);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm(`Delete this ${modelName}?`)) return;
//     try {
//       await deleteItem(modelName, id);
//       loadData();
//     } catch (err) {
//       console.error('Delete error:', err);
//       setError(err.message);
//     }
//   };

//   const handleCreate = async (data) => {
//     try {
//       await createItem(modelName, data);
//       setModalOpen(false);
//       loadData();
//     } catch (err) {
//       console.error('Create error:', err);
//       setError(err.message);
//     }
//   };

//   const handleUpdate = async (data) => {
//     try {
//       await updateItem(modelName, currentItem[primaryKey], data);
//       setModalOpen(false);
//       loadData();
//     } catch (err) {
//       console.error('Update error:', err);
//       setError(err.message);
//     }
//   };

//   return (
//     <div>
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-light tracking-[-0.01em] text-on-surface capitalize">
//           {modelName}s
//         </h1>
//         <div className="flex gap-3">
//           <button
//             onClick={loadData}
//             className="px-4 py-2 text-sm font-light text-primary border border-primary rounded-sm hover:bg-primary/5 transition"
//           >
//             🔄 Refresh
//           </button>
//           <button
//             onClick={openCreateModal}
//             className="bg-primary text-neutral text-sm font-normal px-5 py-2 rounded-sm hover:bg-tertiary hover:text-primary transition shadow-sm"
//           >
//             + Add New
//           </button>
//         </div>
//       </div>

//       {/* Filter Bar */}
//       <div className="mb-4 p-4 bg-surface border border-border rounded-sm">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
//           {visibleColumns.map((col) => (
//             <div key={col.name} className="flex flex-col">
//               <label className="text-xs font-normal text-muted tracking-[-0.01em] mb-1">
//                 {col.name}
//               </label>
//               {col.enum_values ? (
//                 <select
//                   value={filters[col.name] || ''}
//                   onChange={(e) => handleFilterChange(col.name, e.target.value)}
//                   className="bg-surface text-on-surface text-sm font-light rounded-sm px-3 py-2 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
//                 >
//                   <option value="">All</option>
//                   {col.enum_values.map((val) => (
//                     <option key={val} value={val}>{val}</option>
//                   ))}
//                 </select>
//               ) : (
//                 <input
//                   type="text"
//                   placeholder="Filter..."
//                   value={filters[col.name] || ''}
//                   onChange={(e) => handleFilterChange(col.name, e.target.value)}
//                   className="bg-surface text-on-surface text-sm font-light rounded-sm px-3 py-2 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
//                 />
//               )}
//             </div>
//           ))}
//         </div>
//         <div className="flex gap-3 mt-4">
//           <button
//             onClick={applyFilters}
//             className="bg-primary text-neutral text-sm font-normal px-5 py-2 rounded-sm hover:bg-tertiary hover:text-primary transition shadow-sm"
//           >
//             Apply Filters
//           </button>
//           <button
//             onClick={clearFilters}
//             className="text-sm font-light text-muted hover:text-on-surface border border-border px-5 py-2 rounded-sm transition"
//           >
//             Clear Filters
//           </button>
//         </div>
//       </div>

//       {/* Error */}
//       {error && (
//         <div className="mb-4 p-3 bg-error/10 text-error border border-error/30 rounded-sm">
//           ❌ {error}
//         </div>
//       )}

//       {/* Table */}
//       {loading ? (
//         <LoadingSpinner />
//       ) : (
//         <>
//           <div className="bg-surface rounded-md border border-border/50 shadow-sm overflow-x-auto">
//             <table className="w-full text-left">
//               <thead>
//                 <tr className="border-b border-border/40 bg-[#F8FAFC]/50">
//                   {visibleColumns.map((col) => (
//                     <th
//                       key={col.name}
//                       onClick={() => handleSort(col.name)}
//                       className="px-4 py-3 text-sm font-normal text-muted tracking-[-0.01em] cursor-pointer hover:text-on-surface select-none"
//                     >
//                       {col.name}
//                       {sort === col.name && (
//                         <span className="ml-1">{order === 'asc' ? '↑' : '↓'}</span>
//                       )}
//                     </th>
//                   ))}
//                   <th className="px-4 py-3 text-sm font-normal text-muted tracking-[-0.01em]">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {items.length === 0 ? (
//                   <tr>
//                     <td colSpan={visibleColumns.length + 1} className="px-4 py-8 text-center text-muted">
//                       No items found.
//                     </td>
//                   </tr>
//                 ) : (
//                   items.map((item) => (
//                     <tr key={item[primaryKey]} className="border-b border-border/30 last:border-0 hover:bg-primary/5 transition">
//                       {visibleColumns.map((col) => (
//                         <td key={col.name} className="px-4 py-3 text-sm font-light text-on-surface">
//                           {item[col.name] !== undefined && item[col.name] !== null ? String(item[col.name]) : ''}
//                         </td>
//                       ))}
//                       <td className="px-4 py-3">
//                         <button
//                           onClick={() => openEditModal(item)}
//                           className="mr-2 px-3 py-1 text-xs font-medium text-primary bg-primary/10 border border-primary rounded-sm hover:bg-primary hover:text-white transition"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDelete(item[primaryKey])}
//                           className="px-3 py-1 text-xs font-medium text-error bg-error/10 border border-error rounded-sm hover:bg-error hover:text-white transition"
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//           <div className="mt-4">
//             <Pagination
//               page={page}
//               total={total}
//               perPage={perPage}
//               onPageChange={setPage}
//             />
//           </div>
//         </>
//       )}

//       {/* Modal */}
//       <Modal
//         isOpen={modalOpen}
//         onClose={() => setModalOpen(false)}
//         title={modalMode === 'create' ? `Create ${modelName}` : `Edit ${modelName}`}
//       >
//         <DynamicForm
//           columns={visibleColumns}
//           initialData={currentItem || {}}
//           onSubmit={modalMode === 'create' ? handleCreate : handleUpdate}
//           onCancel={() => setModalOpen(false)}
//           isEdit={modalMode === 'edit'}
//         />
//       </Modal>
//     </div>
//   );
// }








// import { useState, useEffect, useCallback } from 'react';
// import { fetchList, createItem, updateItem, deleteItem } from '../api';
// import Modal from '../components/ui/Modal';
// import DynamicForm from '../components/ui/DynamicForm';
// import LoadingSpinner from '../components/ui/LoadingSpinner';
// import Pagination from '../components/common/Pagination';

// export default function DynamicModelList({ modelName, metadata }) {
//   const [items, setItems] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [page, setPage] = useState(1);
//   const [perPage] = useState(10);
//   const [sort, setSort] = useState('');
//   const [order, setOrder] = useState('asc');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const [filters, setFilters] = useState({});
//   const [activeFilters, setActiveFilters] = useState({});

//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalMode, setModalMode] = useState('create');
//   const [currentItem, setCurrentItem] = useState(null);

//   const modelMeta = metadata[modelName];
//   const columns = modelMeta?.columns || [];
//   const primaryKey = modelMeta?.primary_keys?.[0] || 'id';

//   const visibleColumns = columns.filter(
//     col => !col.name.startsWith('_') && col.name !== 'hashed_password'
//   );

//   const loadData = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const params = {
//         page,
//         per_page: perPage,
//         sort,
//         order,
//         ...activeFilters,
//       };
//       const data = await fetchList(modelName, params);
//       setItems(data.items || []);
//       setTotal(data.total || 0);
//     } catch (err) {
//       console.error('Load error:', err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [modelName, page, perPage, sort, order, activeFilters]);

//   // Reset when model changes
//   useEffect(() => {
//     setPage(1);
//     setFilters({});
//     setActiveFilters({});
//     setSort('');
//     setOrder('asc');
//     setItems([]);
//     setTotal(0);
//     setError(null);
//   }, [modelName]);

//   useEffect(() => {
//     loadData();
//   }, [loadData]);

//   // Filter handlers
//   const handleFilterChange = (colName, value) => {
//     setFilters(prev => ({ ...prev, [colName]: value }));
//   };

//   const applyFilters = () => {
//     const cleaned = {};
//     Object.keys(filters).forEach(key => {
//       const val = filters[key];
//       if (val !== undefined && val !== null && val.trim && val.trim() !== '') {
//         cleaned[key] = val.trim();
//       } else if (val !== undefined && val !== null && typeof val === 'string' && val !== '') {
//         cleaned[key] = val;
//       }
//     });
//     setActiveFilters(cleaned);
//     setPage(1);
//   };

//   const clearFilters = () => {
//     setFilters({});
//     setActiveFilters({});
//     setPage(1);
//   };

//   const handleSort = (col) => {
//     if (sort === col) {
//       setOrder(order === 'asc' ? 'desc' : 'asc');
//     } else {
//       setSort(col);
//       setOrder('asc');
//     }
//     setPage(1);
//   };

//   const openCreateModal = () => {
//     setCurrentItem(null);
//     setModalMode('create');
//     setModalOpen(true);
//   };

//   const openEditModal = (item) => {
//     setCurrentItem(item);
//     setModalMode('edit');
//     setModalOpen(true);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm(`Delete this ${modelName}?`)) return;
//     try {
//       await deleteItem(modelName, id);
//       loadData();
//     } catch (err) {
//       console.error('Delete error:', err);
//       setError(err.message);
//     }
//   };

//   const handleCreate = async (data) => {
//     try {
//       await createItem(modelName, data);
//       setModalOpen(false);
//       loadData();
//     } catch (err) {
//       console.error('Create error:', err);
//       setError(err.message);
//     }
//   };

//   const handleUpdate = async (data) => {
//     try {
//       await updateItem(modelName, currentItem[primaryKey], data);
//       setModalOpen(false);
//       loadData();
//     } catch (err) {
//       console.error('Update error:', err);
//       setError(err.message);
//     }
//   };

//   // Render filter input based on column type
//   const renderFilterInput = (col) => {
//     const value = filters[col.name] || '';
//     if (col.enum_values) {
//       return (
//         <select
//           value={value}
//           onChange={(e) => handleFilterChange(col.name, e.target.value)}
//           className="bg-surface text-on-surface text-sm font-light rounded-sm px-3 py-2 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
//         >
//           <option value="">All</option>
//           {col.enum_values.map((val) => (
//             <option key={val} value={val}>{val}</option>
//           ))}
//         </select>
//       );
//     }
//     if (col.is_date) {
//       return (
//         <input
//           type="date"
//           value={value}
//           onChange={(e) => handleFilterChange(col.name, e.target.value)}
//           className="bg-surface text-on-surface text-sm font-light rounded-sm px-3 py-2 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
//         />
//       );
//     }
//     if (col.is_datetime) {
//       return (
//         <input
//           type="datetime-local"
//           value={value}
//           onChange={(e) => handleFilterChange(col.name, e.target.value)}
//           className="bg-surface text-on-surface text-sm font-light rounded-sm px-3 py-2 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
//         />
//       );
//     }
//     // Default text input
//     return (
//       <input
//         type="text"
//         placeholder="Filter..."
//         value={value}
//         onChange={(e) => handleFilterChange(col.name, e.target.value)}
//         className="bg-surface text-on-surface text-sm font-light rounded-sm px-3 py-2 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
//       />
//     );
//   };

//   return (
//     <div>
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-light tracking-[-0.01em] text-on-surface capitalize">
//           {modelName}s
//         </h1>
//         <div className="flex gap-3">
//           <button
//             onClick={loadData}
//             className="px-4 py-2 text-sm font-light text-primary border border-primary rounded-sm hover:bg-primary/5 transition"
//           >
//             🔄 Refresh
//           </button>
//           <button
//             onClick={openCreateModal}
//             className="bg-primary text-neutral text-sm font-normal px-5 py-2 rounded-sm hover:bg-tertiary hover:text-primary transition shadow-sm"
//           >
//             + Add New
//           </button>
//         </div>
//       </div>

//       {/* Filter Bar */}
//       <div className="mb-4 p-4 bg-surface border border-border rounded-sm">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
//           {visibleColumns.map((col) => (
//             <div key={col.name} className="flex flex-col">
//               <label className="text-xs font-normal text-muted tracking-[-0.01em] mb-1">
//                 {col.name}
//               </label>
//               {renderFilterInput(col)}
//             </div>
//           ))}
//         </div>
//         <div className="flex gap-3 mt-4">
//           <button
//             onClick={applyFilters}
//             className="bg-primary text-neutral text-sm font-normal px-5 py-2 rounded-sm hover:bg-tertiary hover:text-primary transition shadow-sm"
//           >
//             Apply Filters
//           </button>
//           <button
//             onClick={clearFilters}
//             className="text-sm font-light text-muted hover:text-on-surface border border-border px-5 py-2 rounded-sm transition"
//           >
//             Clear Filters
//           </button>
//         </div>
//       </div>

//       {/* Error */}
//       {error && (
//         <div className="mb-4 p-3 bg-error/10 text-error border border-error/30 rounded-sm">
//           ❌ {error}
//         </div>
//       )}

//       {/* Table */}
//       {loading ? (
//         <LoadingSpinner />
//       ) : (
//         <>
//           <div className="bg-surface rounded-md border border-border/50 shadow-sm overflow-x-auto">
//             <table className="w-full text-left">
//               <thead>
//                 <tr className="border-b border-border/40 bg-[#F8FAFC]/50">
//                   {visibleColumns.map((col) => (
//                     <th
//                       key={col.name}
//                       onClick={() => handleSort(col.name)}
//                       className="px-4 py-3 text-sm font-normal text-muted tracking-[-0.01em] cursor-pointer hover:text-on-surface select-none group"
//                     >
//                       <div className="flex items-center gap-1">
//                         <span>{col.name}</span>
//                         {/* Always visible sort indicator */}
//                         <span className="text-xs opacity-40 group-hover:opacity-100 transition-opacity">
//                           {sort === col.name ? (order === 'asc' ? '↑' : '↓') : '↕'}
//                         </span>
//                       </div>
//                     </th>
//                   ))}
//                   <th className="px-4 py-3 text-sm font-normal text-muted tracking-[-0.01em]">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {items.length === 0 ? (
//                   <tr>
//                     <td colSpan={visibleColumns.length + 1} className="px-4 py-8 text-center text-muted">
//                       No items found.
//                     </td>
//                   </tr>
//                 ) : (
//                   items.map((item) => (
//                     <tr key={item[primaryKey]} className="border-b border-border/30 last:border-0 hover:bg-primary/5 transition">
//                       {visibleColumns.map((col) => (
//                         <td key={col.name} className="px-4 py-3 text-sm font-light text-on-surface">
//                           {item[col.name] !== undefined && item[col.name] !== null ? String(item[col.name]) : ''}
//                         </td>
//                       ))}
//                       <td className="px-4 py-3">
//                         <button
//                           onClick={() => openEditModal(item)}
//                           className="mr-2 px-3 py-1 text-xs font-medium text-primary bg-primary/10 border border-primary rounded-sm hover:bg-primary hover:text-white transition"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDelete(item[primaryKey])}
//                           className="px-3 py-1 text-xs font-medium text-error bg-error/10 border border-error rounded-sm hover:bg-error hover:text-white transition"
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//           <div className="mt-4">
//             <Pagination
//               page={page}
//               total={total}
//               perPage={perPage}
//               onPageChange={setPage}
//             />
//           </div>
//         </>
//       )}

//       {/* Modal */}
//       <Modal
//         isOpen={modalOpen}
//         onClose={() => setModalOpen(false)}
//         title={modalMode === 'create' ? `Create ${modelName}` : `Edit ${modelName}`}
//       >
//         <DynamicForm
//           columns={visibleColumns}
//           initialData={currentItem || {}}
//           onSubmit={modalMode === 'create' ? handleCreate : handleUpdate}
//           onCancel={() => setModalOpen(false)}
//           isEdit={modalMode === 'edit'}
//         />
//       </Modal>
//     </div>
//   );
// }












// import { useState, useEffect, useCallback } from 'react';
// import { fetchList, createItem, updateItem, deleteItem } from '../api';
// import Modal from '../components/ui/Modal';
// import DynamicForm from '../components/ui/DynamicForm';
// import LoadingSpinner from '../components/ui/LoadingSpinner';
// import Pagination from '../components/common/Pagination';

// export default function DynamicModelList({ modelName, metadata }) {
//   // ---------- State ----------
//   const [items, setItems] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [page, setPage] = useState(1);
//   const [perPage] = useState(10); // 10 items per page
//   const [sort, setSort] = useState('');
//   const [order, setOrder] = useState('asc');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Filters: { columnName: value }
//   const [filters, setFilters] = useState({});
//   const [activeFilters, setActiveFilters] = useState({});

//   // Modal state
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit'
//   const [currentItem, setCurrentItem] = useState(null);

//   // Metadata for the current model
//   const modelMeta = metadata[modelName];
//   const columns = modelMeta?.columns || [];
//   const primaryKey = modelMeta?.primary_keys?.[0] || 'id';

//   // Columns we display (exclude hidden/internal fields)
//   const visibleColumns = columns.filter(
//     col => !col.name.startsWith('_') && col.name !== 'hashed_password'
//   );

//   // ---------- Data fetching ----------
//   const loadData = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const params = {
//         page,
//         per_page: perPage,
//         sort,
//         order,
//         ...activeFilters,
//       };
//       console.log(`📡 Fetching /api/${modelName.toLowerCase()}`, params);
//       const data = await fetchList(modelName, params);
//       setItems(data.items || []);
//       setTotal(data.total || 0);
//     } catch (err) {
//       console.error('Load error:', err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [modelName, page, perPage, sort, order, activeFilters]);

//   // Reset everything when model changes
//   useEffect(() => {
//     setPage(1);
//     setFilters({});
//     setActiveFilters({});
//     setSort('');
//     setOrder('asc');
//     setItems([]);
//     setTotal(0);
//     setError(null);
//   }, [modelName]);

//   // Fetch when dependencies change
//   useEffect(() => {
//     loadData();
//   }, [loadData]);

//   // ---------- Filter handlers ----------
//   const handleFilterChange = (colName, value) => {
//     setFilters(prev => ({ ...prev, [colName]: value }));
//   };

//   const applyFilters = () => {
//     const cleaned = {};
//     Object.keys(filters).forEach(key => {
//       const val = filters[key];
//       if (val !== undefined && val !== null && val !== '') {
//         cleaned[key] = typeof val === 'string' ? val.trim() : val;
//       }
//     });
//     setActiveFilters(cleaned);
//     setPage(1); // go back to first page when filtering
//   };

//   const clearFilters = () => {
//     setFilters({});
//     setActiveFilters({});
//     setPage(1);
//   };

//   // ---------- Sorting ----------
//   const handleSort = (col) => {
//     if (sort === col) {
//       setOrder(order === 'asc' ? 'desc' : 'asc');
//     } else {
//       setSort(col);
//       setOrder('asc');
//     }
//     setPage(1);
//   };

//   // ---------- CRUD handlers ----------
//   const openCreateModal = () => {
//     setCurrentItem(null);
//     setModalMode('create');
//     setModalOpen(true);
//   };

//   const openEditModal = (item) => {
//     setCurrentItem(item);
//     setModalMode('edit');
//     setModalOpen(true);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm(`Delete this ${modelName}?`)) return;
//     try {
//       await deleteItem(modelName, id);
//       loadData();
//     } catch (err) {
//       console.error('Delete error:', err);
//       setError(err.message);
//     }
//   };

//   const handleCreate = async (data) => {
//     try {
//       await createItem(modelName, data);
//       setModalOpen(false);
//       loadData();
//     } catch (err) {
//       console.error('Create error:', err);
//       setError(err.message);
//     }
//   };

//   const handleUpdate = async (data) => {
//     try {
//       await updateItem(modelName, currentItem[primaryKey], data);
//       setModalOpen(false);
//       loadData();
//     } catch (err) {
//       console.error('Update error:', err);
//       setError(err.message);
//     }
//   };

//   // ---------- Helper: render filter input based on column type ----------
//   const renderFilterInput = (col) => {
//     const value = filters[col.name] || '';

//     // Enum -> dropdown
//     if (col.enum_values) {
//       return (
//         <select
//           value={value}
//           onChange={(e) => handleFilterChange(col.name, e.target.value)}
//           className="bg-surface text-on-surface text-sm font-light rounded-sm px-3 py-2 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
//         >
//           <option value="">All</option>
//           {col.enum_values.map((val) => (
//             <option key={val} value={val}>{val}</option>
//           ))}
//         </select>
//       );
//     }

//     // Boolean -> dropdown
//     if (col.python_type === 'bool') {
//       return (
//         <select
//           value={value}
//           onChange={(e) => handleFilterChange(col.name, e.target.value)}
//           className="bg-surface text-on-surface text-sm font-light rounded-sm px-3 py-2 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
//         >
//           <option value="">All</option>
//           <option value="true">True</option>
//           <option value="false">False</option>
//         </select>
//       );
//     }

//     // Date -> date picker
//     if (col.is_date) {
//       return (
//         <input
//           type="date"
//           value={value}
//           onChange={(e) => handleFilterChange(col.name, e.target.value)}
//           className="bg-surface text-on-surface text-sm font-light rounded-sm px-3 py-2 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
//         />
//       );
//     }

//     // DateTime -> datetime-local picker
//     if (col.is_datetime) {
//       return (
//         <input
//           type="datetime-local"
//           value={value}
//           onChange={(e) => handleFilterChange(col.name, e.target.value)}
//           className="bg-surface text-on-surface text-sm font-light rounded-sm px-3 py-2 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
//         />
//       );
//     }

//     // Default: text input
//     return (
//       <input
//         type="text"
//         placeholder="Filter..."
//         value={value}
//         onChange={(e) => handleFilterChange(col.name, e.target.value)}
//         className="bg-surface text-on-surface text-sm font-light rounded-sm px-3 py-2 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
//       />
//     );
//   };

//   // ---------- Render ----------
//   return (
//     <div>
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-light tracking-[-0.01em] text-on-surface capitalize">
//           {modelName}s
//         </h1>
//         <div className="flex gap-3">
//           <button
//             onClick={loadData}
//             className="px-4 py-2 text-sm font-light text-primary border border-primary rounded-sm hover:bg-primary/5 transition"
//           >
//             🔄 Refresh
//           </button>
//           <button
//             onClick={openCreateModal}
//             className="bg-primary text-neutral text-sm font-normal px-5 py-2 rounded-sm hover:bg-tertiary hover:text-primary transition shadow-sm"
//           >
//             + Add New
//           </button>
//         </div>
//       </div>

//       {/* Filter Bar */}
//       <div className="mb-4 p-4 bg-surface border border-border rounded-sm">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
//           {visibleColumns.map((col) => (
//             <div key={col.name} className="flex flex-col">
//               <label className="text-xs font-normal text-muted tracking-[-0.01em] mb-1">
//                 {col.name}
//               </label>
//               {renderFilterInput(col)}
//             </div>
//           ))}
//         </div>
//         <div className="flex gap-3 mt-4">
//           <button
//             onClick={applyFilters}
//             className="bg-primary text-neutral text-sm font-normal px-5 py-2 rounded-sm hover:bg-tertiary hover:text-primary transition shadow-sm"
//           >
//             Apply Filters
//           </button>
//           <button
//             onClick={clearFilters}
//             className="text-sm font-light text-muted hover:text-on-surface border border-border px-5 py-2 rounded-sm transition"
//           >
//             Clear Filters
//           </button>
//         </div>
//       </div>

//       {/* Error */}
//       {error && (
//         <div className="mb-4 p-3 bg-error/10 text-error border border-error/30 rounded-sm">
//           ❌ {error}
//         </div>
//       )}

//       {/* Table / Loading */}
//       {loading ? (
//         <LoadingSpinner />
//       ) : (
//         <>
//           <div className="bg-surface rounded-md border border-border/50 shadow-sm overflow-x-auto">
//             <table className="w-full text-left">
//               <thead>
//                 <tr className="border-b border-border/40 bg-[#F8FAFC]/50">
//                   {visibleColumns.map((col) => (
//                     <th
//                       key={col.name}
//                       onClick={() => handleSort(col.name)}
//                       className="px-4 py-3 text-sm font-normal text-muted tracking-[-0.01em] cursor-pointer hover:text-on-surface select-none group"
//                     >
//                       <div className="flex items-center gap-1">
//                         <span>{col.name}</span>
//                         {/* Sort indicator: always visible */}
//                         <span className="text-xs opacity-40 group-hover:opacity-100 transition-opacity">
//                           {sort === col.name ? (order === 'asc' ? '↑' : '↓') : '↕'}
//                         </span>
//                       </div>
//                     </th>
//                   ))}
//                   <th className="px-4 py-3 text-sm font-normal text-muted tracking-[-0.01em]">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {items.length === 0 ? (
//                   <tr>
//                     <td colSpan={visibleColumns.length + 1} className="px-4 py-8 text-center text-muted">
//                       No items found.
//                     </td>
//                   </tr>
//                 ) : (
//                   items.map((item) => (
//                     <tr key={item[primaryKey]} className="border-b border-border/30 last:border-0 hover:bg-primary/5 transition">
//                       {visibleColumns.map((col) => (
//                         <td key={col.name} className="px-4 py-3 text-sm font-light text-on-surface">
//                           {item[col.name] !== undefined && item[col.name] !== null ? String(item[col.name]) : ''}
//                         </td>
//                       ))}
//                       <td className="px-4 py-3">
//                         <button
//                           onClick={() => openEditModal(item)}
//                           className="mr-2 px-3 py-1 text-xs font-medium text-primary bg-primary/10 border border-primary rounded-sm hover:bg-primary hover:text-white transition"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDelete(item[primaryKey])}
//                           className="px-3 py-1 text-xs font-medium text-error bg-error/10 border border-error rounded-sm hover:bg-error hover:text-white transition"
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//           <div className="mt-4">
//             <Pagination
//               page={page}
//               total={total}
//               perPage={perPage}
//               onPageChange={setPage}
//             />
//           </div>
//         </>
//       )}

//       {/* Modal for Create / Edit */}
//       <Modal
//         isOpen={modalOpen}
//         onClose={() => setModalOpen(false)}
//         title={modalMode === 'create' ? `Create ${modelName}` : `Edit ${modelName}`}
//       >
//         <DynamicForm
//           columns={visibleColumns}
//           initialData={currentItem || {}}
//           onSubmit={modalMode === 'create' ? handleCreate : handleUpdate}
//           onCancel={() => setModalOpen(false)}
//           isEdit={modalMode === 'edit'}
//         />
//       </Modal>
//     </div>
//   );
// }












// import { useState, useEffect, useCallback } from 'react';
// import { fetchList, createItem, updateItem, deleteItem } from '../api';
// import Modal from '../components/ui/Modal';
// import DynamicForm from '../components/ui/DynamicForm';
// import LoadingSpinner from '../components/ui/LoadingSpinner';
// import Pagination from '../components/common/Pagination';
// import { formatDateForDisplay } from '../utils/dateUtils';

// export default function DynamicModelList({ modelName, metadata }) {
//   const [items, setItems] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [page, setPage] = useState(1);
//   const [perPage] = useState(10);
//   const [sort, setSort] = useState('');
//   const [order, setOrder] = useState('asc');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [filters, setFilters] = useState({});
//   const [activeFilters, setActiveFilters] = useState({});
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalMode, setModalMode] = useState('create');
//   const [currentItem, setCurrentItem] = useState(null);

//   const modelMeta = metadata[modelName];
//   const columns = modelMeta?.columns || [];
//   const primaryKey = modelMeta?.primary_keys?.[0] || 'id';
//   const visibleColumns = columns.filter(
//     col => !col.name.startsWith('_')
//   );

//   const loadData = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const params = { page, per_page: perPage, sort, order, ...activeFilters };
//       const data = await fetchList(modelName, params);
//       setItems(data.items || []);
//       setTotal(data.total || 0);
//     } catch (err) {
//       console.error('Load error:', err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [modelName, page, perPage, sort, order, activeFilters]);

//   useEffect(() => {
//     setPage(1);
//     setFilters({});
//     setActiveFilters({});
//     setSort('');
//     setOrder('asc');
//     setItems([]);
//     setTotal(0);
//     setError(null);
//   }, [modelName]);

//   useEffect(() => {
//     loadData();
//   }, [loadData]);

//   // Filter handlers
//   const handleFilterChange = (colName, value) => {
//     setFilters(prev => ({ ...prev, [colName]: value }));
//   };

//   const applyFilters = () => {
//     const cleaned = {};
//     Object.keys(filters).forEach(key => {
//       const val = filters[key];
//       if (val !== undefined && val !== null && val !== '') {
//         cleaned[key] = typeof val === 'string' ? val.trim() : val;
//       }
//     });
//     setActiveFilters(cleaned);
//     setPage(1);
//   };

//   const clearFilters = () => {
//     setFilters({});
//     setActiveFilters({});
//     setPage(1);
//   };

//   const handleSort = (col) => {
//     if (sort === col) {
//       setOrder(order === 'asc' ? 'desc' : 'asc');
//     } else {
//       setSort(col);
//       setOrder('asc');
//     }
//     setPage(1);
//   };

//   const openCreateModal = () => {
//     setCurrentItem(null);
//     setModalMode('create');
//     setModalOpen(true);
//   };

//   const openEditModal = (item) => {
//     setCurrentItem(item);
//     setModalMode('edit');
//     setModalOpen(true);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm(`Delete this ${modelName}?`)) return;
//     try {
//       await deleteItem(modelName, id);
//       loadData(); // refresh list
//     } catch (err) {
//       console.error('Delete error:', err);
//       setError(err.message);
//     }
//   };

//   const handleCreate = async (data) => {
//     try {
//       await createItem(modelName, data);
//       setModalOpen(false);
//       loadData(); // refreshes the list
//     } catch (err) {
//       console.error('Create error:', err);
//       setError(err.message);
//     }
//   };

//   const handleUpdate = async (data) => {
//     try {
//       await updateItem(modelName, currentItem[primaryKey], data);
//       setModalOpen(false);
//       loadData();
//     } catch (err) {
//       console.error('Update error:', err);
//       setError(err.message);
//     }
//   };

//   // Render filter input based on column type
//   const renderFilterInput = (col) => {
//     const value = filters[col.name] || '';

//     if (col.enum_values) {
//       return (
//         <select
//           value={value}
//           onChange={(e) => handleFilterChange(col.name, e.target.value)}
//           className="bg-surface text-on-surface text-sm font-light rounded-sm px-3 py-2 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
//         >
//           <option value="">All</option>
//           {col.enum_values.map((val) => (
//             <option key={val} value={val}>{val}</option>
//           ))}
//         </select>
//       );
//     }

//     if (col.python_type === 'bool') {
//       return (
//         <select
//           value={value}
//           onChange={(e) => handleFilterChange(col.name, e.target.value)}
//           className="bg-surface text-on-surface text-sm font-light rounded-sm px-3 py-2 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
//         >
//           <option value="">All</option>
//           <option value="true">True</option>
//           <option value="false">False</option>
//         </select>
//       );
//     }

//     if (col.is_date) {
//       return (
//         <input
//           type="date"
//           value={value}
//           onChange={(e) => handleFilterChange(col.name, e.target.value)}
//           className="bg-surface text-on-surface text-sm font-light rounded-sm px-3 py-2 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
//         />
//       );
//     }

//     if (col.is_datetime) {
//       return (
//         <input
//           type="datetime-local"
//           value={value}
//           onChange={(e) => handleFilterChange(col.name, e.target.value)}
//           className="bg-surface text-on-surface text-sm font-light rounded-sm px-3 py-2 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
//         />
//       );
//     }

//     return (
//       <input
//         type="text"
//         placeholder="Filter..."
//         value={value}
//         onChange={(e) => handleFilterChange(col.name, e.target.value)}
//         className="bg-surface text-on-surface text-sm font-light rounded-sm px-3 py-2 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
//       />
//     );
//   };

//   // Render table cell value with proper formatting
//   const renderCellValue = (value, col) => {
//     if (value === undefined || value === null) return '';
//     if (col.is_date) {
//       return formatDateForDisplay(value, true);
//     }
//     if (col.is_datetime) {
//       return formatDateForDisplay(value, false);
//     }
//     return String(value);
//   };

//   return (
//     <div>
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-light tracking-[-0.01em] text-on-surface capitalize">
//           {modelName}s
//         </h1>
//         <div className="flex gap-3">
//           <button
//             onClick={loadData}
//             className="px-4 py-2 text-sm font-light text-primary border border-primary rounded-sm hover:bg-primary/5 transition"
//           >
//             🔄 Refresh
//           </button>
//           <button
//             onClick={openCreateModal}
//             className="bg-primary text-neutral text-sm font-normal px-5 py-2 rounded-sm hover:bg-tertiary hover:text-primary transition shadow-sm"
//           >
//             + Add New
//           </button>
//         </div>
//       </div>

//       {/* Filter Bar */}
//       <div className="mb-4 p-4 bg-surface border border-border rounded-sm">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
//           {visibleColumns.map((col) => (
//             <div key={col.name} className="flex flex-col">
//               <label className="text-xs font-normal text-muted tracking-[-0.01em] mb-1">
//                 {col.name}
//               </label>
//               {renderFilterInput(col)}
//             </div>
//           ))}
//         </div>
//         <div className="flex gap-3 mt-4">
//           <button
//             onClick={applyFilters}
//             className="bg-primary text-neutral text-sm font-normal px-5 py-2 rounded-sm hover:bg-tertiary hover:text-primary transition shadow-sm"
//           >
//             Apply Filters
//           </button>
//           <button
//             onClick={clearFilters}
//             className="text-sm font-light text-muted hover:text-on-surface border border-border px-5 py-2 rounded-sm transition"
//           >
//             Clear Filters
//           </button>
//         </div>
//       </div>

//       {/* Error */}
//       {error && (
//         <div className="mb-4 p-3 bg-error/10 text-error border border-error/30 rounded-sm">
//           ❌ {error}
//         </div>
//       )}

//       {/* Table */}
//       {loading ? (
//         <LoadingSpinner />
//       ) : (
//         <>
//           <div className="bg-surface rounded-md border border-border/50 shadow-sm overflow-x-auto">
//             <table className="w-full text-left">
//               <thead>
//                 <tr className="border-b border-border/40 bg-[#F8FAFC]/50">
//                   {visibleColumns.map((col) => (
//                     <th
//                       key={col.name}
//                       onClick={() => handleSort(col.name)}
//                       className="px-4 py-3 text-sm font-normal text-muted tracking-[-0.01em] cursor-pointer hover:text-on-surface select-none group"
//                     >
//                       <div className="flex items-center gap-1">
//                         <span>{col.name}</span>
//                         <span className="text-xs opacity-40 group-hover:opacity-100 transition-opacity">
//                           {sort === col.name ? (order === 'asc' ? '↑' : '↓') : '↕'}
//                         </span>
//                       </div>
//                     </th>
//                   ))}
//                   <th className="px-4 py-3 text-sm font-normal text-muted tracking-[-0.01em]">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {items.length === 0 ? (
//                   <tr>
//                     <td colSpan={visibleColumns.length + 1} className="px-4 py-8 text-center text-muted">
//                       No items found.
//                     </td>
//                   </tr>
//                 ) : (
//                   items.map((item) => (
//                     <tr key={item[primaryKey]} className="border-b border-border/30 last:border-0 hover:bg-primary/5 transition">
//                       {visibleColumns.map((col) => (
//                         <td key={col.name} className="px-4 py-3 text-sm font-light text-on-surface">
//                           {renderCellValue(item[col.name], col)}
//                         </td>
//                       ))}
//                       <td className="px-4 py-3">
//                         <button
//                           onClick={() => openEditModal(item)}
//                           className="mr-2 px-3 py-1 text-xs font-medium text-primary bg-primary/10 border border-primary rounded-sm hover:bg-primary hover:text-white transition"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDelete(item[primaryKey])}
//                           className="px-3 py-1 text-xs font-medium text-error bg-error/10 border border-error rounded-sm hover:bg-error hover:text-white transition"
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//           <div className="mt-4">
//             <Pagination
//               page={page}
//               total={total}
//               perPage={perPage}
//               onPageChange={setPage}
//             />
//           </div>
//         </>
//       )}

//       {/* Modal */}
//       <Modal
//         isOpen={modalOpen}
//         onClose={() => setModalOpen(false)}
//         title={modalMode === 'create' ? `Create ${modelName}` : `Edit ${modelName}`}
//       >
//         <DynamicForm
//           columns={visibleColumns}
//           initialData={currentItem || {}}
//           onSubmit={modalMode === 'create' ? handleCreate : handleUpdate}
//           onCancel={() => setModalOpen(false)}
//           isEdit={modalMode === 'edit'}
//         />
//       </Modal>
//     </div>
//   );
// }









import { useState, useEffect, useCallback } from 'react';
import { fetchList, createItem, updateItem, deleteItem } from '../api';
import Modal from '../components/ui/Modal';
import DynamicForm from '../components/ui/DynamicForm';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Pagination from '../components/common/Pagination';
import { formatDateForDisplay } from '../utils/dateUtils';
import { 
  PlusIcon, 
  ArrowPathIcon, 
  PencilIcon, 
  TrashIcon,
  MagnifyingGlassIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

export default function DynamicModelList({ modelName, metadata }) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [sort, setSort] = useState('');
  const [order, setOrder] = useState('asc');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [activeFilters, setActiveFilters] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [currentItem, setCurrentItem] = useState(null);

  const modelMeta = metadata[modelName];
  const columns = modelMeta?.columns || [];
  const primaryKey = modelMeta?.primary_keys?.[0] || 'id';
  const visibleColumns = columns.filter(
    col => !col.name.startsWith('_')
  );

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = { page, per_page: perPage, sort, order, ...activeFilters };
      const data = await fetchList(modelName, params);
      setItems(data.items || []);
      setTotal(data.total || 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [modelName, page, perPage, sort, order, activeFilters]);

  useEffect(() => {
    setPage(1);
    setFilters({});
    setActiveFilters({});
    setSort('');
    setOrder('asc');
  }, [modelName]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handlers (create, update, delete, filter, sort) – keep same logic
  const handleFilterChange = (colName, value) => {
    setFilters(prev => ({ ...prev, [colName]: value }));
  };

  const applyFilters = () => {
    const cleaned = {};
    Object.keys(filters).forEach(key => {
      const val = filters[key];
      if (val !== undefined && val !== null && val !== '') {
        cleaned[key] = typeof val === 'string' ? val.trim() : val;
      }
    });
    setActiveFilters(cleaned);
    setPage(1);
  };

  const clearFilters = () => {
    setFilters({});
    setActiveFilters({});
    setPage(1);
  };

  const handleSort = (col) => {
    if (sort === col) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setSort(col);
      setOrder('asc');
    }
    setPage(1);
  };

  const openCreateModal = () => {
    setCurrentItem(null);
    setModalMode('create');
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setCurrentItem(item);
    setModalMode('edit');
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Delete this ${modelName}?`)) return;
    try {
      await deleteItem(modelName, id);
      loadData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCreate = async (data) => {
    try {
      await createItem(modelName, data);
      setModalOpen(false);
      loadData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async (data) => {
    try {
      await updateItem(modelName, currentItem[primaryKey], data);
      setModalOpen(false);
      loadData();
    } catch (err) {
      setError(err.message);
    }
  };

  // Render filter input (same as before)
  const renderFilterInput = (col) => {
    const value = filters[col.name] || '';
    if (col.enum_values) {
      return (
        <select
          value={value}
          onChange={(e) => handleFilterChange(col.name, e.target.value)}
          className="w-full bg-canvas-default text-light-blue-text text-sm rounded-radius-sm px-space-3 py-space-2 border border-muted-green-gray/50 focus:outline-none focus:ring-1 focus:ring-github-blue-primary"
        >
          <option value="">All</option>
          {col.enum_values.map((val) => (
            <option key={val} value={val}>{val}</option>
          ))}
        </select>
      );
    }
    if (col.python_type === 'bool') {
      return (
        <select
          value={value}
          onChange={(e) => handleFilterChange(col.name, e.target.value)}
          className="w-full bg-canvas-default text-light-blue-text text-sm rounded-radius-sm px-space-3 py-space-2 border border-muted-green-gray/50 focus:outline-none focus:ring-1 focus:ring-github-blue-primary"
        >
          <option value="">All</option>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      );
    }
    if (col.is_date) {
      return (
        <input
          type="date"
          value={value}
          onChange={(e) => handleFilterChange(col.name, e.target.value)}
          className="w-full bg-canvas-default text-light-blue-text text-sm rounded-radius-sm px-space-3 py-space-2 border border-muted-green-gray/50 focus:outline-none focus:ring-1 focus:ring-github-blue-primary"
        />
      );
    }
    if (col.is_datetime) {
      return (
        <input
          type="datetime-local"
          value={value}
          onChange={(e) => handleFilterChange(col.name, e.target.value)}
          className="w-full bg-canvas-default text-light-blue-text text-sm rounded-radius-sm px-space-3 py-space-2 border border-muted-green-gray/50 focus:outline-none focus:ring-1 focus:ring-github-blue-primary"
        />
      );
    }
    return (
      <input
        type="text"
        placeholder="Filter..."
        value={value}
        onChange={(e) => handleFilterChange(col.name, e.target.value)}
        className="w-full bg-canvas-default text-light-blue-text text-sm rounded-radius-sm px-space-3 py-space-2 border border-muted-green-gray/50 focus:outline-none focus:ring-1 focus:ring-github-blue-primary"
      />
    );
  };

  const renderCellValue = (value, col) => {
    if (value === undefined || value === null) return '';
    if (col.is_date) return formatDateForDisplay(value, true);
    if (col.is_datetime) return formatDateForDisplay(value, false);
    return String(value);
  };

  return (
    <div className="space-y-space-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-[480] text-white-text tracking-wide capitalize">
          {modelName}s
        </h1>
        <div className="flex gap-space-3">
          <button
            onClick={loadData}
            className="flex items-center gap-space-2 px-space-4 py-space-2 text-sm font-medium text-light-blue-text border border-muted-green-gray/50 rounded-radius-sm hover:bg-white/5 transition"
          >
            <ArrowPathIcon className="w-4 h-4" />
            Refresh
          </button>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-space-2 px-space-4 py-space-2 text-sm font-medium bg-success-green text-white rounded-radius-sm hover:opacity-90 transition shadow-sm"
          >
            <PlusIcon className="w-4 h-4" />
            Add New
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-space-4 bg-canvas-default border border-muted-green-gray/30 rounded-radius-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-space-3">
          {visibleColumns.map((col) => (
            <div key={col.name} className="flex flex-col">
              <label className="text-xs font-medium text-muted-gray-text mb-space-1">
                {col.name}
              </label>
              {renderFilterInput(col)}
            </div>
          ))}
        </div>
        <div className="flex gap-space-3 mt-space-4">
          <button
            onClick={applyFilters}
            className="flex items-center gap-space-2 px-space-4 py-space-2 text-sm font-medium bg-github-blue-primary text-white rounded-radius-sm hover:opacity-90 transition"
          >
            <MagnifyingGlassIcon className="w-4 h-4" />
            Apply Filters
          </button>
          <button
            onClick={clearFilters}
            className="flex items-center gap-space-2 px-space-4 py-space-2 text-sm font-medium text-muted-gray-text border border-muted-green-gray/50 rounded-radius-sm hover:bg-white/5 transition"
          >
            <XMarkIcon className="w-4 h-4" />
            Clear Filters
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="p-space-3 bg-danger-red/10 text-danger-red border border-danger-red/30 rounded-radius-sm">
          ❌ {error}
        </div>
      )}

      {/* Table */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="bg-canvas-default border border-muted-green-gray/30 rounded-radius-lg overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-muted-green-gray/30 bg-canvas-default/50">
                  {visibleColumns.map((col) => (
                    <th
                      key={col.name}
                      onClick={() => handleSort(col.name)}
                      className="px-space-4 py-space-3 text-xs font-medium text-muted-gray-text uppercase tracking-wider cursor-pointer hover:text-white-text transition group"
                    >
                      <div className="flex items-center gap-space-1">
                        <span>{col.name}</span>
                        <span className="text-xs opacity-40 group-hover:opacity-100 transition">
                          {sort === col.name ? (order === 'asc' ? '↑' : '↓') : '↕'}
                        </span>
                      </div>
                    </th>
                  ))}
                  <th className="px-space-4 py-space-3 text-xs font-medium text-muted-gray-text uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={visibleColumns.length + 1} className="px-space-4 py-space-8 text-center text-muted-gray-text">
                      No items found.
                    </td>
                  </tr>
                ) : (
                  items.map((item) => (
                    <tr key={item[primaryKey]} className="border-b border-muted-green-gray/20 last:border-0 hover:bg-white/5 transition">
                      {visibleColumns.map((col) => (
                        <td key={col.name} className="px-space-4 py-space-3 text-sm text-light-blue-text">
                          {renderCellValue(item[col.name], col)}
                        </td>
                      ))}
                      <td className="px-space-4 py-space-3">
                        <button
                          onClick={() => openEditModal(item)}
                          className="mr-space-2 p-space-1 text-github-blue-primary hover:text-white-text transition"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item[primaryKey])}
                          className="p-space-1 text-danger-red hover:text-white-text transition"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-space-4">
            <Pagination
              page={page}
              total={total}
              perPage={perPage}
              onPageChange={setPage}
            />
          </div>
        </>
      )}

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalMode === 'create' ? `Create ${modelName}` : `Edit ${modelName}`}
      >
        <DynamicForm
          columns={visibleColumns}
          initialData={currentItem || {}}
          onSubmit={modalMode === 'create' ? handleCreate : handleUpdate}
          onCancel={() => setModalOpen(false)}
          isEdit={modalMode === 'edit'}
        />
      </Modal>
    </div>
  );
}