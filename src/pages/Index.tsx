import React from 'react';
import RoomBooking from '@/components/RoomBooking';
import { motion } from 'framer-motion';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8"
      >
        <h1 className="text-4xl font-light mb-4">
          Room Booking
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <RoomBooking />
      </motion.div>
    </div>
  );
};

export default Index;