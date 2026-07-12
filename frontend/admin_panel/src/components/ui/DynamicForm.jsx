
// import { useState } from 'react';
// import { formatDateForInput } from '../../utils/dateUtils';

// export default function DynamicForm({ columns, initialData = {}, onSubmit, onCancel, isEdit }) {

//   // Filter columns based on mode
//   const filteredColumns = columns.filter((col) => {
//     if (isEdit) {
//       // In edit mode: show all remaining columns (editable)
//       return col.required_for_create === true;
//     } else {
//       // In create mode: show only columns that are required_for_create
//       return col.required_for_create === true;
//     }
//   });

//   // Initialize form data
//   const [formData, setFormData] = useState(() => {
//     const initial = {};
//     filteredColumns.forEach((col) => {
//       let value = initialData[col.name] !== undefined ? initialData[col.name] : '';

//       // Format date/datetime for input fields
//       if (col.is_date && value) {
//         value = formatDateForInput(value, true);
//       } else if (col.is_datetime && value) {
//         value = formatDateForInput(value, false);
//       }

//       // For booleans, default to false if not set
//       if (col.python_type === 'bool') {
//         initial[col.name] = value ?? false;
//       } else {
//         initial[col.name] = value;
//       }
//     });
//     return initial;
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const submitData = {};
//     filteredColumns.forEach((col) => {
//       submitData[col.name] = formData[col.name];
//     });
//     onSubmit(submitData);
//   };

//   // Determine input type for standard fields
//   const getInputType = (col) => {
//     const type = col.python_type?.toLowerCase() || '';
//     if (type.includes('int')) return 'number';
//     if (type.includes('float')) return 'number';
//     if (type.includes('bool')) return 'checkbox';
//     return 'text';
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       {filteredColumns.map((col) => {
//         const isRequired = col.required_for_create === true;
//         const value = formData[col.name] ?? '';
//         const fieldId = `field-${col.name}`;

//         return (
//           <div key={col.name} className="space-y-1">
//             <label htmlFor={fieldId} className="block text-sm font-normal text-muted tracking-[-0.01em]">
//               {col.name}
//               {isRequired && <span className="text-error ml-1">*</span>}
//             </label>

//             {col.enum_values ? (
//               <select
//                 id={fieldId}
//                 name={col.name}
//                 value={value}
//                 onChange={handleChange}
//                 required={isRequired}
//                 className="w-full bg-surface text-on-surface text-sm font-light rounded-sm px-4 py-3 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
//               >
//                 <option value="">Select...</option>
//                 {col.enum_values.map((val) => (
//                   <option key={val} value={val}>
//                     {val}
//                   </option>
//                 ))}
//               </select>
//             ) : col.is_date ? (
//               <input
//                 id={fieldId}
//                 type="date"
//                 name={col.name}
//                 value={value}
//                 onChange={handleChange}
//                 required={isRequired}
//                 className="w-full bg-surface text-on-surface text-sm font-light rounded-sm px-4 py-3 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
//               />
//             ) : col.is_datetime ? (
//               <input
//                 id={fieldId}
//                 type="datetime-local"
//                 name={col.name}
//                 value={value}
//                 onChange={handleChange}
//                 required={isRequired}
//                 className="w-full bg-surface text-on-surface text-sm font-light rounded-sm px-4 py-3 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
//               />
//             ) : col.python_type === 'bool' ? (
//               <input
//                 id={fieldId}
//                 type="checkbox"
//                 name={col.name}
//                 checked={!!value}
//                 onChange={handleChange}
//                 className="rounded-sm border-border focus:ring-primary h-5 w-5"
//               />
//             ) : (
//               <input
//                 id={fieldId}
//                 type={getInputType(col)}
//                 name={col.name}
//                 value={value}
//                 onChange={handleChange}
//                 required={isRequired}
//                 className="w-full bg-surface text-on-surface text-sm font-light rounded-sm px-4 py-3 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
//               />
//             )}
//           </div>
//         );
//       })}

//       <div className="flex justify-end gap-3 pt-4 border-t border-border">
//         <button
//           type="button"
//           onClick={onCancel}
//           className="px-5 py-2 text-sm font-normal text-muted hover:text-on-surface border border-border rounded-sm transition"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           className="px-5 py-2 text-sm font-normal text-neutral bg-primary rounded-sm hover:bg-tertiary hover:text-primary transition shadow-sm"
//         >
//           {isEdit ? 'Update' : 'Create'}
//         </button>
//       </div>
//     </form>
//   );
// }







// import { useState } from 'react';
// import { formatDateForInput } from '../../utils/dateUtils';

// export default function DynamicForm({ columns, initialData = {}, onSubmit, onCancel, isEdit }) {
//   // Filter columns based on mode
//   const filteredColumns = columns.filter((col) => {
//     // Always skip auto-increment primary keys and timestamps
//     // if (col.primary_key && col.autoincrement) return false;
//     // if (col.name === 'created_at' || col.name === 'updated_at') return false;

//     if (isEdit) {
//       // In edit mode: show all remaining columns (all editable fields)
//       return col.required_for_create === true;
//     } else {
//       // In create mode: show only columns that are required_for_create
//       return col.required_for_create === true;
//     }
//   });

//   // Initialize form data
//   const [formData, setFormData] = useState(() => {
//     const initial = {};
//     filteredColumns.forEach((col) => {
//       let value = initialData[col.name] !== undefined ? initialData[col.name] : '';

//       // Format date/datetime for input fields
//       if (col.is_date && value) {
//         value = formatDateForInput(value, true);
//       } else if (col.is_datetime && value) {
//         value = formatDateForInput(value, false);
//       }

//       // For booleans, default to false if not set
//       if (col.python_type === 'bool') {
//         initial[col.name] = value ?? false;
//       } else {
//         initial[col.name] = value;
//       }
//     });
//     return initial;
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const submitData = {};
//     filteredColumns.forEach((col) => {
//       submitData[col.name] = formData[col.name];
//     });
//     onSubmit(submitData);
//   };

//   // Determine input type for standard fields
//   const getInputType = (col) => {
//     const type = col.python_type?.toLowerCase() || '';
//     if (type.includes('int')) return 'number';
//     if (type.includes('float')) return 'number';
//     if (type.includes('bool')) return 'checkbox';
//     return 'text';
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       {filteredColumns.map((col) => {
//         const isRequired = col.required_for_create === true;
//         const value = formData[col.name] ?? '';
//         const fieldId = `field-${col.name}`;

//         return (
//           <div key={col.name} className="space-y-1">
//             <label htmlFor={fieldId} className="block text-sm font-normal text-muted tracking-[-0.01em]">
//               {col.name}
//               {isRequired && <span className="text-error ml-1">*</span>}
//             </label>

//             {col.enum_values ? (
//               <select
//                 id={fieldId}
//                 name={col.name}
//                 value={value}
//                 onChange={handleChange}
//                 required={isRequired}
//                 className="w-full bg-surface text-on-surface text-sm font-light rounded-sm px-4 py-3 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
//               >
//                 <option value="">Select...</option>
//                 {col.enum_values.map((val) => (
//                   <option key={val} value={val}>{val}</option>
//                 ))}
//               </select>
//             ) : col.is_date ? (
//               <input
//                 id={fieldId}
//                 type="date"
//                 name={col.name}
//                 value={value}
//                 onChange={handleChange}
//                 required={isRequired}
//                 className="w-full bg-surface text-on-surface text-sm font-light rounded-sm px-4 py-3 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
//               />
//             ) : col.is_datetime ? (
//               <input
//                 id={fieldId}
//                 type="datetime-local"
//                 name={col.name}
//                 value={value}
//                 onChange={handleChange}
//                 required={isRequired}
//                 className="w-full bg-surface text-on-surface text-sm font-light rounded-sm px-4 py-3 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
//               />
//             ) : col.python_type === 'bool' ? (
//               <input
//                 id={fieldId}
//                 type="checkbox"
//                 name={col.name}
//                 checked={!!value}
//                 onChange={handleChange}
//                 className="rounded-sm border-border focus:ring-primary h-5 w-5"
//               />
//             ) : (
//               <input
//                 id={fieldId}
//                 type={getInputType(col)}
//                 name={col.name}
//                 value={value}
//                 onChange={handleChange}
//                 required={isRequired}
//                 className="w-full bg-surface text-on-surface text-sm font-light rounded-sm px-4 py-3 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
//               />
//             )}
//           </div>
//         );
//       })}

//       <div className="flex justify-end gap-3 pt-4 border-t border-border">
//         <button
//           type="button"
//           onClick={onCancel}
//           className="px-5 py-2 text-sm font-normal text-muted hover:text-on-surface border border-border rounded-sm transition"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           className="px-5 py-2 text-sm font-normal text-neutral bg-primary rounded-sm hover:bg-tertiary hover:text-primary transition shadow-sm"
//         >
//           {isEdit ? 'Update' : 'Create'}
//         </button>
//       </div>
//     </form>
//   );
// }









// import { useState } from 'react';
// import { formatDateForInput } from '../../utils/dateUtils';

// export default function DynamicForm({ columns, initialData = {}, onSubmit, onCancel, isEdit }) {
//   const filteredColumns = columns.filter((col) => {
//     if (col.primary_key && col.autoincrement) return false;
//     if (col.name === 'created_at' || col.name === 'updated_at') return false;
//     if (isEdit) return true;
//     return col.required_for_create === true;
//   });

//   const [formData, setFormData] = useState(() => {
//     const initial = {};
//     filteredColumns.forEach((col) => {
//       let value = initialData[col.name] !== undefined ? initialData[col.name] : '';
//       if (col.is_date && value) value = formatDateForInput(value, true);
//       else if (col.is_datetime && value) value = formatDateForInput(value, false);
//       if (col.python_type === 'bool') initial[col.name] = value ?? false;
//       else initial[col.name] = value;
//     });
//     return initial;
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const submitData = {};
//     filteredColumns.forEach(col => {
//       submitData[col.name] = formData[col.name];
//     });
//     onSubmit(submitData);
//   };

//   const getInputType = (col) => {
//     const type = col.python_type?.toLowerCase() || '';
//     if (type.includes('int') || type.includes('float')) return 'number';
//     if (type.includes('bool')) return 'checkbox';
//     return 'text';
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-space-4">
//       {filteredColumns.map((col) => {
//         const isRequired = col.required_for_create === true;
//         const value = formData[col.name] ?? '';
//         const fieldId = `field-${col.name}`;

//         return (
//           <div key={col.name} className="space-y-space-1">
//             <label htmlFor={fieldId} className="block text-sm font-medium text-primary-text-dark">
//               {col.name}
//               {isRequired && <span className="text-danger-red ml-space-1">*</span>}
//             </label>

//             {col.enum_values ? (
//               <select
//                 id={fieldId}
//                 name={col.name}
//                 value={value}
//                 onChange={handleChange}
//                 required={isRequired}
//                 className="w-full bg-white text-primary-text-dark text-sm rounded-radius-sm px-space-4 py-space-3 border border-border-default focus:outline-none focus:ring-2 focus:ring-github-blue-primary/50"
//               >
//                 <option value="">Select...</option>
//                 {col.enum_values.map((val) => (
//                   <option key={val} value={val}>{val}</option>
//                 ))}
//               </select>
//             ) : col.is_date ? (
//               <input
//                 id={fieldId}
//                 type="date"
//                 name={col.name}
//                 value={value}
//                 onChange={handleChange}
//                 required={isRequired}
//                 className="w-full bg-white text-primary-text-dark text-sm rounded-radius-sm px-space-4 py-space-3 border border-border-default focus:outline-none focus:ring-2 focus:ring-github-blue-primary/50"
//               />
//             ) : col.is_datetime ? (
//               <input
//                 id={fieldId}
//                 type="datetime-local"
//                 name={col.name}
//                 value={value}
//                 onChange={handleChange}
//                 required={isRequired}
//                 className="w-full bg-white text-primary-text-dark text-sm rounded-radius-sm px-space-4 py-space-3 border border-border-default focus:outline-none focus:ring-2 focus:ring-github-blue-primary/50"
//               />
//             ) : col.python_type === 'bool' ? (
//               <input
//                 id={fieldId}
//                 type="checkbox"
//                 name={col.name}
//                 checked={!!value}
//                 onChange={handleChange}
//                 className="rounded-radius-sm border-border-default focus:ring-2 focus:ring-github-blue-primary/50 h-5 w-5"
//               />
//             ) : (
//               <input
//                 id={fieldId}
//                 type={getInputType(col)}
//                 name={col.name}
//                 value={value}
//                 onChange={handleChange}
//                 required={isRequired}
//                 className="w-full bg-white text-primary-text-dark text-sm rounded-radius-sm px-space-4 py-space-3 border border-border-default focus:outline-none focus:ring-2 focus:ring-github-blue-primary/50"
//               />
//             )}
//           </div>
//         );
//       })}

//       <div className="flex justify-end gap-space-3 pt-space-4 border-t border-border-default">
//         <button
//           type="button"
//           onClick={onCancel}
//           className="px-space-4 py-space-2 text-sm font-medium text-secondary-text hover:text-primary-text-dark border border-border-default rounded-radius-sm transition"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           className="px-space-4 py-space-2 text-sm font-medium bg-github-blue-primary text-white rounded-radius-sm hover:opacity-90 transition shadow-sm"
//         >
//           {isEdit ? 'Update' : 'Create'}
//         </button>
//       </div>
//     </form>
//   );
// }












// import { useState } from 'react';
// import { formatDateForInput } from '../../utils/dateUtils';
// import { useTheme } from '../../context/ThemeContext';

// export default function DynamicForm({ columns, initialData = {}, onSubmit, onCancel, isEdit }) {
//   const { theme } = useTheme();
//   const isDark = theme === 'dark';

//   const filteredColumns = columns.filter((col) => {
//     if (col.primary_key && col.autoincrement) return false;
//     if (col.name === 'created_at' || col.name === 'updated_at') return false;
//     if (isEdit) return true;
//     return col.required_for_create === true;
//   });

//   const [formData, setFormData] = useState(() => {
//     const initial = {};
//     filteredColumns.forEach((col) => {
//       let value = initialData[col.name] !== undefined ? initialData[col.name] : '';
//       if (col.is_date && value) value = formatDateForInput(value, true);
//       else if (col.is_datetime && value) value = formatDateForInput(value, false);
//       if (col.python_type === 'bool') initial[col.name] = value ?? false;
//       else initial[col.name] = value;
//     });
//     return initial;
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const submitData = {};
//     filteredColumns.forEach(col => {
//       submitData[col.name] = formData[col.name];
//     });
//     onSubmit(submitData);
//   };

//   const getInputType = (col) => {
//     const type = col.python_type?.toLowerCase() || '';
//     if (type.includes('int') || type.includes('float')) return 'number';
//     if (type.includes('bool')) return 'checkbox';
//     return 'text';
//   };

//   const inputClass = `w-full text-sm rounded-radius-sm px-space-4 py-space-3 border focus:outline-none focus:ring-2 focus:ring-github-blue-primary/50 ${
//     isDark
//       ? 'bg-canvas-default text-light-blue-text border-muted-green-gray/50'
//       : 'bg-white text-primary-text-dark border-border-default'
//   }`;

//   return (
//     <form onSubmit={handleSubmit} className="space-y-space-4">
//       {filteredColumns.map((col) => {
//         const isRequired = col.required_for_create === true;
//         const value = formData[col.name] ?? '';
//         const fieldId = `field-${col.name}`;

//         return (
//           <div key={col.name} className="space-y-space-1">
//             <label htmlFor={fieldId} className={`block text-sm font-medium ${
//               isDark ? 'text-light-blue-text' : 'text-primary-text-dark'
//             }`}>
//               {col.name}
//               {isRequired && <span className="text-accent-danger ml-space-1">*</span>}
//             </label>

//             {col.enum_values ? (
//               <select
//                 id={fieldId}
//                 name={col.name}
//                 value={value}
//                 onChange={handleChange}
//                 required={isRequired}
//                 className={inputClass}
//               >
//                 <option value="">Select...</option>
//                 {col.enum_values.map((val) => (
//                   <option key={val} value={val}>{val}</option>
//                 ))}
//               </select>
//             ) : col.is_date ? (
//               <input
//                 id={fieldId}
//                 type="date"
//                 name={col.name}
//                 value={value}
//                 onChange={handleChange}
//                 required={isRequired}
//                 className={inputClass}
//               />
//             ) : col.is_datetime ? (
//               <input
//                 id={fieldId}
//                 type="datetime-local"
//                 name={col.name}
//                 value={value}
//                 onChange={handleChange}
//                 required={isRequired}
//                 className={inputClass}
//               />
//             ) : col.python_type === 'bool' ? (
//               <input
//                 id={fieldId}
//                 type="checkbox"
//                 name={col.name}
//                 checked={!!value}
//                 onChange={handleChange}
//                 className={`rounded-radius-sm focus:ring-2 focus:ring-github-blue-primary/50 h-5 w-5 ${
//                   isDark ? 'bg-canvas-default border-muted-green-gray/50' : 'bg-white border-border-default'
//                 }`}
//               />
//             ) : (
//               <input
//                 id={fieldId}
//                 type={getInputType(col)}
//                 name={col.name}
//                 value={value}
//                 onChange={handleChange}
//                 required={isRequired}
//                 className={inputClass}
//               />
//             )}
//           </div>
//         );
//       })}

//       <div className={`flex justify-end gap-space-3 pt-space-4 border-t ${
//         isDark ? 'border-muted-green-gray/30' : 'border-border-default'
//       }`}>
//         <button
//           type="button"
//           onClick={onCancel}
//           className={`px-space-4 py-space-2 text-sm font-medium rounded-radius-sm transition ${
//             isDark
//               ? 'text-muted-gray-text hover:text-white-text border border-muted-green-gray/50 hover:bg-white/5'
//               : 'text-secondary-text hover:text-primary-text-dark border border-border-default hover:bg-subtle-neutral-surface'
//           }`}
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           className="px-space-4 py-space-2 text-sm font-medium bg-github-blue-primary text-white rounded-radius-sm hover:opacity-90 transition shadow-sm"
//         >
//           {isEdit ? 'Update' : 'Create'}
//         </button>
//       </div>
//     </form>
//   );
// }













import { useState } from 'react';
import { formatDateForInput } from '../../utils/dateUtils';

export default function DynamicForm({ columns, initialData = {}, onSubmit, onCancel, isEdit }) {
  const filteredColumns = columns.filter((col) => {
    // if (isEdit) return true;
    return col.required_for_create === true;
  });

  const [formData, setFormData] = useState(() => {
    const initial = {};
    filteredColumns.forEach((col) => {
      let value = initialData[col.name] !== undefined ? initialData[col.name] : '';
      if (col.is_date && value) value = formatDateForInput(value, true);
      else if (col.is_datetime && value) value = formatDateForInput(value, false);
      if (col.python_type === 'bool') initial[col.name] = value ?? false;
      else initial[col.name] = value;
    });
    return initial;
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {};
    filteredColumns.forEach(col => {
      submitData[col.name] = formData[col.name];
    });
    onSubmit(submitData);
  };

  const getInputType = (col) => {
    const type = col.python_type?.toLowerCase() || '';
    if (type.includes('int') || type.includes('float')) return 'number';
    if (type.includes('bool')) return 'checkbox';
    return 'text';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-space-4">
      {filteredColumns.map((col) => {
        const isRequired = col.required_for_create === true;
        const value = formData[col.name] ?? '';
        const fieldId = `field-${col.name}`;

        return (
          <div key={col.name} className="space-y-space-1">
            <label htmlFor={fieldId} className="block text-sm font-[400] text-light-blue-text">
              {col.name}
              {isRequired && <span className="text-danger-red ml-space-1">*</span>}
            </label>

            {col.enum_values ? (
              <select
                id={fieldId}
                name={col.name}
                value={value}
                onChange={handleChange}
                required={isRequired}
                className="w-full bg-canvas-default text-light-blue-text text-sm rounded-radius-sm px-space-4 py-space-3 border border-muted-green-gray/50 focus:outline-none focus:ring-2 focus:ring-github-blue-primary/50"
              >
                <option value="">Select...</option>
                {col.enum_values.map((val) => (
                  <option key={val} value={val}>{val}</option>
                ))}
              </select>
            ) : col.is_date ? (
              <input
                id={fieldId}
                type="date"
                name={col.name}
                value={value}
                onChange={handleChange}
                required={isRequired}
                className="w-full bg-canvas-default text-light-blue-text text-sm rounded-radius-sm px-space-4 py-space-3 border border-muted-green-gray/50 focus:outline-none focus:ring-2 focus:ring-github-blue-primary/50"
              />
            ) : col.is_datetime ? (
              <input
                id={fieldId}
                type="datetime-local"
                name={col.name}
                value={value}
                onChange={handleChange}
                required={isRequired}
                className="w-full bg-canvas-default text-light-blue-text text-sm rounded-radius-sm px-space-4 py-space-3 border border-muted-green-gray/50 focus:outline-none focus:ring-2 focus:ring-github-blue-primary/50"
              />
            ) : col.python_type === 'bool' ? (
              <input
                id={fieldId}
                type="checkbox"
                name={col.name}
                checked={!!value}
                onChange={handleChange}
                className="rounded-radius-sm border border-muted-green-gray/50 focus:ring-2 focus:ring-github-blue-primary/50 h-5 w-5"
              />
            ) : (
              <input
                id={fieldId}
                type={getInputType(col)}
                name={col.name}
                value={value}
                onChange={handleChange}
                required={isRequired}
                className="w-full bg-canvas-default text-light-blue-text text-sm rounded-radius-sm px-space-4 py-space-3 border border-muted-green-gray/50 focus:outline-none focus:ring-2 focus:ring-github-blue-primary/50"
              />
            )}
          </div>
        );
      })}

      <div className="flex justify-end gap-space-3 pt-space-4 border-t border-muted-green-gray/30">
        <button
          type="button"
          onClick={onCancel}
          className="px-space-4 py-space-2 text-sm font-[400] text-muted-gray-text hover:text-white-text border border-muted-green-gray/50 rounded-radius-sm hover:bg-white/5 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-space-4 py-space-2 text-sm font-[500] bg-github-blue-primary text-white rounded-radius-sm hover:opacity-90 transition shadow-sm"
        >
          {isEdit ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
}