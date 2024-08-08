'use client';

import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react';

const CloseButton = () => {
  return (
    <Button
      variant={'ghost'}
      className="absolute top-0 right-0 mt-2 mr-2 p-2 text-red-500 hover:text-white hover:bg-red-500"
      onClick={() => {
        const elements = document.getElementsByClassName('detail');
        for (let i = 0; i < elements.length; i++) {
          elements[i].removeAttribute('open');
        }
      }}
    >
      <XIcon />
    </Button>
  );
};

export default CloseButton;
