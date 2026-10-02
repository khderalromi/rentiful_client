"use client";

import { motion } from "framer-motion";

interface MapFallbackProps {
  onRetry: () => void;
}

export default function MapFallback({ onRetry }: MapFallbackProps) {
  return (
    // الحاوية الخارجية بدون خلفية سوداء لتاخذ لون الصفحة الطبيعي
    <div className="relative flex items-center justify-center w-full h-full min-h-[60vh] overflow-hidden rounded-xl">
      
      {/* الأجرام المضيئة الناعمة لتناسب الخلفية الفاتحة */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-100 dark:bg-red-900/20 rounded-full blur-[80px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          rotate: [0, -90, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-sky-100 dark:bg-sky-900/20 rounded-full blur-[100px] pointer-events-none"
      />

      {/* البطاقة الزجاجية الفاخرة (متوافقة مع الوضع الفاتح والداكن) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center p-8 border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-black/40 backdrop-blur-3xl rounded-[2.5rem] shadow-2xl max-w-sm w-full text-center"
      >
        {/* الأيقونة الطافية */}
        <motion.div
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center justify-center w-20 h-20 mb-6 border border-gray-100 dark:border-white/10 bg-gradient-to-br from-red-50 to-white dark:from-white/10 dark:to-transparent rounded-[1.5rem] shadow-sm"
        >
          <svg className="w-10 h-10 text-red-500 drop-shadow-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </motion.div>

        {/* النصوص */}
        <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white tracking-wide">
          Connection Lost
        </h3>
        <p className="mb-8 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          We couldn't retrieve the properties map. The connection might be unstable.
        </p>

        {/* زر إعادة المحاولة */}
        <motion.button
          animate={{ boxShadow: ["0px 0px 0px rgba(239,68,68,0)", "0px 0px 15px rgba(239,68,68,0.15)", "0px 0px 0px rgba(239,68,68,0)"] }}
          transition={{ duration: 2, repeat: Infinity }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="w-full py-3 px-4 bg-gray-900 hover:bg-gray-800 dark:bg-white/10 dark:hover:bg-white/20 text-white dark:text-white text-sm font-medium rounded-2xl border border-transparent dark:border-white/10 transition-colors"
        >
          Retry Connection
        </motion.button>
      </motion.div>
    </div>
  );
}