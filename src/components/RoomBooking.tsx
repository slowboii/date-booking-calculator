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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ROOMS = [
  { id: '1', name: 'Conference Room A', capacity: 10 },
  { id: '2', name: 'Meeting Room B', capacity: 6 },
  { id: '3', name: 'Board Room', capacity: 15 },
  { id: '4', name: 'Small Meeting Room', capacity: 4 },
];

const RoomBooking = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedRoom, setSelectedRoom] = useState<string>('');
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setIsBookingOpen(true);
  };

  const handleBookRoom = () => {
    if (selectedDate && selectedRoom) {
      const room = ROOMS.find(r => r.id === selectedRoom);
      toast.success(`${room?.name} booked for ${selectedDate.toLocaleDateString()}`);
      setIsBookingOpen(false);
      setSelectedRoom('');
    } else {
      toast.error('Please select a room');
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
            <Select value={selectedRoom} onValueChange={setSelectedRoom}>
              <SelectTrigger>
                <SelectValue placeholder="Select a room" />
              </SelectTrigger>
              <SelectContent>
                {ROOMS.map((room) => (
                  <SelectItem key={room.id} value={room.id}>
                    {room.name} (Capacity: {room.capacity})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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