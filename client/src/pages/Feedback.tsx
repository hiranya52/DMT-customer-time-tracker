import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { useApp } from '../context/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Smile, Meh, Frown } from 'lucide-react';

export default function Feedback() {
  const { t } = useApp();
  const [_, setLocation] = useLocation();
  const [rating, setRating] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Reset after 3 seconds and go home
    setTimeout(() => {
      window.location.href = '/'; // Full reload to reset app state for demo
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
          <Smile size={48} />
        </div>
        <h2 className="text-3xl font-bold text-primary mb-2">{t.feedback.thankYou}</h2>
        <p className="text-muted-foreground">Your feedback helps us improve our service.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-primary">{t.feedback.title}</h2>
        <p className="text-muted-foreground">{t.feedback.subtitle}</p>
      </div>

      <Card>
        <CardContent className="pt-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            <div className="flex justify-center gap-4 sm:gap-8">
              <button
                type="button"
                onClick={() => setRating('bad')}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${rating === 'bad' ? 'bg-red-100 text-red-600 scale-110 ring-2 ring-red-200' : 'hover:bg-muted text-muted-foreground'}`}
              >
                <Frown size={48} strokeWidth={1.5} />
                <span className="text-sm font-medium">Bad</span>
              </button>

              <button
                type="button"
                onClick={() => setRating('neutral')}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${rating === 'neutral' ? 'bg-yellow-100 text-yellow-600 scale-110 ring-2 ring-yellow-200' : 'hover:bg-muted text-muted-foreground'}`}
              >
                <Meh size={48} strokeWidth={1.5} />
                <span className="text-sm font-medium">Okay</span>
              </button>

              <button
                type="button"
                onClick={() => setRating('good')}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${rating === 'good' ? 'bg-green-100 text-green-600 scale-110 ring-2 ring-green-200' : 'hover:bg-muted text-muted-foreground'}`}
              >
                <Smile size={48} strokeWidth={1.5} />
                <span className="text-sm font-medium">Good</span>
              </button>
            </div>

            <div className="space-y-2">
              <Textarea 
                placeholder={t.feedback.placeholder} 
                className="min-h-[120px] resize-none text-base p-4"
              />
            </div>

            <Button type="submit" className="w-full text-lg py-6" disabled={!rating}>
              {t.feedback.submit}
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}
