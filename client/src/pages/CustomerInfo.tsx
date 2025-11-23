import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'wouter';
import { useApp } from '../context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const formSchema = z.object({
  vehicleNumber: z.string().min(2, "Vehicle number is required"),
  fullName: z.string().min(2, "Full name is required"),
  contactNumber: z.string().regex(/^[0-9]{9,10}$/, "Invalid phone number"),
  serviceType: z.enum(['one_day', 'normal'], { required_error: "Please select a service type" }),
});

export default function CustomerInfo() {
  const { t, updateCustomerDetails, customerDetails } = useApp();
  const [_, setLocation] = useLocation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vehicleNumber: customerDetails.vehicleNumber || '',
      fullName: customerDetails.fullName || '',
      contactNumber: customerDetails.contactNumber || '',
      serviceType: (customerDetails.serviceType as 'one_day' | 'normal') || 'one_day',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateCustomerDetails(values);
    // If oneway (one_day), go to page 2 (Service Selection)
    setLocation('/service-selection'); 
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-primary">{t.customerInfo.title}</h2>
        <p className="text-muted-foreground mt-2">{t.customerInfo.subtitle}</p>
      </div>

      <Card className="border-t-4 border-t-primary shadow-lg">
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              <FormField
                control={form.control}
                name="vehicleNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.customerInfo.vehicleNumber}</FormLabel>
                    <FormControl>
                      <Input placeholder={t.customerInfo.vehicleNumberPlaceholder} {...field} className="bg-background" data-testid="input-vehicle" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.customerInfo.fullName}</FormLabel>
                    <FormControl>
                      <Input placeholder={t.customerInfo.fullNamePlaceholder} {...field} className="bg-background" data-testid="input-name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.customerInfo.contactNumber}</FormLabel>
                    <FormControl>
                      <Input placeholder={t.customerInfo.contactNumberPlaceholder} {...field} type="tel" className="bg-background" data-testid="input-phone" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="serviceType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>{t.customerInfo.serviceType}</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="one_day" data-testid="radio-oneday" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            {t.customerInfo.oneDay}
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="normal" data-testid="radio-normal" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            {t.customerInfo.normal}
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full text-lg py-6" data-testid="button-submit">
                {t.customerInfo.continue}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
