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
      className="w-full max-w-6xl mx-auto px-4 pb-8"
    >
      <div className="glass-morphism p-8 rounded-2xl">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          className="mx-auto scale-125 transform origin-top"
          classNames={{
            months: "flex flex-col sm:flex-row space-y-4 sm:space-x-8 sm:space-y-0",
            month: "space-y-6",
            table: "w-full border-collapse space-y-2",
            head_row: "flex w-full",
            head_cell: "text-muted-foreground rounded-md w-12 font-normal text-base",
            row: "flex w-full mt-3",
            cell: "relative p-0 text-center text-base focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
            day: "h-12 w-12 p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground",
            day_range_end: "day-range-end",
            day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
            day_today: "bg-accent text-accent-foreground",
            day_outside: "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
            day_disabled: "text-muted-foreground opacity-50",
            day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
            day_hidden: "invisible",
          }}
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