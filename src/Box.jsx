/*eslint react/prop-types: "off"*/

import { useState } from 'react';
import { Button } from './Button.jsx';

export function Box({ children }) {
  // Container - has a button and when pressed shows the children
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <Button isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && children}
    </div>
  );
}
