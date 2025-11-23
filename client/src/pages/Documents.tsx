import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { useApp } from '../context/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function Documents() {
  const { t, startStep } = useApp();
  const [_, setLocation] = useLocation();
  
  // 7 documents required
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  
  const allChecked = Object.keys(checked).length === 7 && Object.values(checked).every(Boolean);

  const handleCheck = (id: number) => {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleNext = () => {
    if (allChecked) {
      startStep(1); // Start timing for step 1
      setLocation('/step-confirmation');
    }
  };

  const docs = [
    { id: 1, label: t.documents.doc1 },
    { id: 2, label: t.documents.doc2 },
    { id: 3, label: t.documents.doc3 },
    { id: 4, label: t.documents.doc4 },
    { id: 5, label: t.documents.doc5 },
    { id: 6, label: t.documents.doc6 },
    { id: 7, label: t.documents.doc7 },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-primary">{t.documents.title}</h2>
        <p className="text-muted-foreground">{t.documents.subtitle}</p>
      </div>

      <Card className="border shadow-md">
        <CardContent className="pt-6">
          <div className="space-y-4">
            {docs.map((doc) => (
              <div key={doc.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-border">
                <Checkbox 
                  id={`doc-${doc.id}`} 
                  checked={checked[doc.id] || false}
                  onCheckedChange={() => handleCheck(doc.id)}
                  className="mt-1"
                />
                <Label 
                  htmlFor={`doc-${doc.id}`}
                  className="text-sm md:text-base font-medium leading-relaxed cursor-pointer flex-grow"
                >
                  {doc.label}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center pt-4">
        <Button variant="outline" onClick={() => setLocation('/service-selection')} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          {t.documents.back}
        </Button>

        <Button 
          onClick={handleNext} 
          disabled={!allChecked}
          className="gap-2 px-8"
          data-testid="btn-next-docs"
        >
          {t.documents.next}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
