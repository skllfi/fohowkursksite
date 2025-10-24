'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Send, Check } from 'lucide-react';

export default function ClientButton() {
  const [sent, setSent] = useState(false);

  const handleClick = () => {
    if (sent) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
    }, 3000);
  };

  return (
    <Button
      onClick={handleClick}
      className="w-full transition-all"
      disabled={sent}
      aria-live="polite"
    >
      {sent ? (
        <>
          <Check className="mr-2 h-4 w-4" /> Message Sent
        </>
      ) : (
        <>
          <Send className="mr-2 h-4 w-4" /> Send Message
        </>
      )}
    </Button>
  );
}
