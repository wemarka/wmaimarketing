
import { useState } from 'react';
import { toast } from 'sonner';
import { WebhookItem } from '../types';

export const useWebhookForm = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedWebhook, setSelectedWebhook] = useState<WebhookItem | null>(null);
  const [formState, setFormState] = useState({
    name: '',
    endpoint: '',
    eventTypes: [] as string[],
    secretKey: '',
  });

  const resetForm = () => {
    setFormState({
      name: '',
      endpoint: '',
      eventTypes: [],
      secretKey: '',
    });
    setSelectedWebhook(null);
  };

  const handleEventTypeChange = (eventId: string) => {
    setFormState(prev => {
      const eventTypes = prev.eventTypes.includes(eventId)
        ? prev.eventTypes.filter(id => id !== eventId)
        : [...prev.eventTypes, eventId];
      
      return { ...prev, eventTypes };
    });
  };

  const copySecret = (secret: string) => {
    navigator.clipboard.writeText(secret);
    toast.success('تم نسخ المفتاح السري');
  };

  return {
    isDialogOpen,
    setIsDialogOpen,
    selectedWebhook,
    setSelectedWebhook,
    formState,
    setFormState,
    resetForm,
    handleEventTypeChange,
    copySecret,
  };
};
