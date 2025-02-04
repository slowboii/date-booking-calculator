import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleNumber = (num: string) => {
    setDisplay(prev => prev === '0' ? num : prev + num);
    setEquation(prev => prev + num);
  };

  const handleOperator = (op: string) => {
    setDisplay('0');
    setEquation(prev => prev + ' ' + op + ' ');
  };

  const handleEqual = () => {
    try {
      const result = eval(equation);
      setDisplay(result.toString());
      setEquation(result.toString());
      toast.success('Calculation completed!');
    } catch (error) {
      toast.error('Invalid calculation');
      handleClear();
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
  };

  const buttons = [
    '7', '8', '9', '÷',
    '4', '5', '6', '×',
    '1', '2', '3', '-',
    '0', '.', '=', '+'
  ];

  const getOperator = (op: string) => {
    switch (op) {
      case '÷': return '/';
      case '×': return '*';
      default: return op;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto p-6"
    >
      <div className="calculator-display">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="calculator-button col-span-4"
          onClick={handleClear}
        >
          Clear
        </motion.button>
        {buttons.map((btn, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="calculator-button aspect-square"
            onClick={() => {
              if (btn === '=') handleEqual();
              else if ('+-×÷'.includes(btn)) handleOperator(getOperator(btn));
              else handleNumber(btn);
            }}
          >
            {btn}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default Calculator;