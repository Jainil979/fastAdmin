// export default function Pagination({ page, total, perPage, onPageChange }) {
//   const totalPages = Math.ceil(total / perPage);
//   if (totalPages <= 1) return null;

//   return (
//     <div className="flex items-center justify-between text-sm font-light text-muted">
//       <span>
//         Showing {((page - 1) * perPage) + 1}–{Math.min(page * perPage, total)} of {total}
//       </span>
//       <div className="flex gap-2">
//         <button
//           onClick={() => onPageChange(Math.max(1, page - 1))}
//           disabled={page === 1}
//           className="px-3 py-1 border border-border rounded-sm disabled:opacity-50 hover:bg-primary/5 transition"
//         >
//           Previous
//         </button>
//         <span className="px-3 py-1">{page}</span>
//         <button
//           onClick={() => onPageChange(Math.min(totalPages, page + 1))}
//           disabled={page === totalPages}
//           className="px-3 py-1 border border-border rounded-sm disabled:opacity-50 hover:bg-primary/5 transition"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }





// export default function Pagination({ page, total, perPage, onPageChange }) {
//   const totalPages = Math.ceil(total / perPage);
//   if (totalPages <= 1) return null;

//   return (
//     <div className="flex items-center justify-between text-sm font-light text-muted">
//       <span>
//         Showing {((page - 1) * perPage) + 1}–{Math.min(page * perPage, total)} of {total}
//       </span>
//       <div className="flex gap-2">
//         <button
//           onClick={() => onPageChange(Math.max(1, page - 1))}
//           disabled={page === 1}
//           className="px-3 py-1 border border-border rounded-sm disabled:opacity-50 hover:bg-primary/5 transition"
//         >
//           Previous
//         </button>
//         <span className="px-3 py-1">{page}</span>
//         <button
//           onClick={() => onPageChange(Math.min(totalPages, page + 1))}
//           disabled={page === totalPages}
//           className="px-3 py-1 border border-border rounded-sm disabled:opacity-50 hover:bg-primary/5 transition"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }









// import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

// export default function Pagination({ page, total, perPage, onPageChange }) {
//   const totalPages = Math.ceil(total / perPage);
//   if (totalPages <= 1) return null;

//   return (
//     <div className="flex items-center justify-between text-sm text-muted-gray-text">
//       <span>
//         Showing {((page - 1) * perPage) + 1}–{Math.min(page * perPage, total)} of {total}
//       </span>
//       <div className="flex gap-space-2">
//         <button
//           onClick={() => onPageChange(Math.max(1, page - 1))}
//           disabled={page === 1}
//           className="p-space-2 border border-muted-green-gray/30 rounded-radius-sm disabled:opacity-40 hover:bg-white/5 transition"
//         >
//           <ChevronLeftIcon className="w-5 h-5" />
//         </button>
//         <span className="px-space-3 py-space-1 bg-canvas-default border border-muted-green-gray/30 rounded-radius-sm text-light-blue-text">
//           {page}
//         </span>
//         <button
//           onClick={() => onPageChange(Math.min(totalPages, page + 1))}
//           disabled={page === totalPages}
//           className="p-space-2 border border-muted-green-gray/30 rounded-radius-sm disabled:opacity-40 hover:bg-white/5 transition"
//         >
//           <ChevronRightIcon className="w-5 h-5" />
//         </button>
//       </div>
//     </div>
//   );
// }










import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function Pagination({ page, total, perPage, onPageChange }) {
  const totalPages = Math.ceil(total / perPage);
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between text-sm text-muted-gray-text">
      <span>
        Showing {((page - 1) * perPage) + 1}–{Math.min(page * perPage, total)} of {total}
      </span>
      <div className="flex gap-space-2">
        <button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="p-space-2 border border-muted-green-gray/30 rounded-radius-sm disabled:opacity-40 hover:bg-white/5 transition"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        <span className="px-space-3 py-space-1 bg-canvas-default border border-muted-green-gray/30 rounded-radius-sm text-light-blue-text">
          {page}
        </span>
        <button
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="p-space-2 border border-muted-green-gray/30 rounded-radius-sm disabled:opacity-40 hover:bg-white/5 transition"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}