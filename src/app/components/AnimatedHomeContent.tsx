'use client'

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const AnimatedHomeContent: React.FC = () => {
  return (
    <>
      <motion.h1 
        className="text-4xl font-bold mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        補助金クラウド
      </motion.h1>
      <motion.p 
        className="text-xl mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        パッと見つかる、すぐに申請
      </motion.p>
      <Link href="/login">
        <motion.a 
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          はじめる
        </motion.a>
      </Link>
    </>
  );
};

export default AnimatedHomeContent;