import React, { useState } from 'react';
import Calculator from '@/components/Calculator';
import RoomBooking from '@/components/RoomBooking';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'calculator' | 'booking'>('calculator');

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-light mb-4">
            Calculator & Room Booking
          </h1>
          <div className="flex justify-center gap-4 mb-8">
            <Button
              variant={activeTab === 'calculator' ? 'default' : 'outline'}
              onClick={() => setActiveTab('calculator')}
            >
              Calculator
            </Button>
            <Button
              variant={activeTab === 'booking' ? 'default' : 'outline'}
              onClick={() => setActiveTab('booking')}
            >
              Room Booking
            </Button>
          </div>
        </motion.div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: activeTab === 'calculator' ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'calculator' ? <Calculator /> : <RoomBooking />}
        </motion.div>
      </div>
    </div>
  );
};

export default Index;