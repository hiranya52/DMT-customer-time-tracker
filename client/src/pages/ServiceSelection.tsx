import React from 'react';
import { useLocation } from 'wouter';
import { useApp } from '../context/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { User, Car, Bike, Truck } from 'lucide-react';

export default function ServiceSelection() {
  const { t, updateCustomerDetails, customerDetails } = useApp();
  const [_, setLocation] = useLocation();

  const handleServiceSelect = (service: string) => {
    updateCustomerDetails({ transferType: service });
    setLocation('/documents');
  };

  return (
    <div className="space-y-6">
      {/* Summary Header */}
      <Card className="bg-muted/50 border-none shadow-sm">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <User size={20} />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Customer</p>
              <p className="font-semibold">{customerDetails.fullName || "Guest"}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-muted-foreground">Vehicle</p>
            <p className="font-semibold font-mono">{customerDetails.vehicleNumber || "---"}</p>
          </div>
        </CardContent>
      </Card>

      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-primary">{t.serviceSelection.title}</h2>
      </div>

      <div className="grid gap-4 max-w-md mx-auto">
        <Button 
          variant="outline" 
          className="h-16 text-lg border-2 hover:border-primary hover:bg-primary/5 transition-all justify-start px-6 gap-4"
          onClick={() => handleServiceSelect('motorbike')}
          data-testid="btn-motorbike"
        >
          <Bike className="h-6 w-6 text-primary" />
          {t.serviceSelection.motorbike}
        </Button>

        <Button 
          variant="outline" 
          className="h-16 text-lg border-2 hover:border-primary hover:bg-primary/5 transition-all justify-start px-6 gap-4"
          onClick={() => handleServiceSelect('car')}
          data-testid="btn-car"
        >
          <Car className="h-6 w-6 text-primary" />
          {t.serviceSelection.car}
        </Button>

        {/* Non-functional placeholder buttons as requested */}
        <Button 
          variant="outline" 
          disabled
          className="h-16 text-lg border-dashed justify-start px-6 gap-4 opacity-50 cursor-not-allowed"
        >
          <Car className="h-6 w-6" />
          {t.serviceSelection.dualPurpose}
        </Button>

        <Button 
          variant="outline" 
          disabled
          className="h-16 text-lg border-dashed justify-start px-6 gap-4 opacity-50 cursor-not-allowed"
        >
          <Truck className="h-6 w-6" />
          {t.serviceSelection.lorry}
        </Button>

        <Button 
          variant="outline" 
          disabled
          className="h-16 text-lg border-dashed justify-start px-6 gap-4 opacity-50 cursor-not-allowed"
        >
          <div className="h-6 w-6 border-2 border-current rounded-full" />
          {t.serviceSelection.threeWheeler}
        </Button>
      </div>

      <div className="flex justify-between pt-6">
        <Button variant="ghost" onClick={() => setLocation('/')}>
          {t.serviceSelection.back}
        </Button>
      </div>
    </div>
  );
}
