import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from "@/components/ui/calendar";
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const RoomBooking = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setIsBookingOpen(true);
  };

  const handleBookRoom = () => {
    if (selectedDate) {
      toast.success(`Room booked for ${selectedDate.toLocaleDateString()}`);
      setIsBookingOpen(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto px-4 pb-8"
    >
      <div className="glass-morphism p-8 rounded-2xl">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          className="mx-auto"
        />
      </div>

      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Book a Room</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <p>Selected date: {selectedDate?.toLocaleDateString()}</p>
            <Button onClick={handleBookRoom}>
              Confirm Booking
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default RoomBooking;