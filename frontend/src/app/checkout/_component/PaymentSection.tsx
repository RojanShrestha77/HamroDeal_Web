// components/checkout/PaymentSection.tsx
"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { CheckCircle2, Banknote, CreditCard, Smartphone } from "lucide-react";
import { CheckoutFormData } from "../schema/checkout.schema";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { RadioGroup } from "@radix-ui/react-radio-group";

interface PaymentSectionProps {
  register: UseFormRegister<CheckoutFormData>;
  errors: FieldErrors<CheckoutFormData>;
  isCompleted: boolean;
  selectedMethod: string;
}

export function PaymentSection({
  register,
  errors,
  isCompleted,
  selectedMethod,
}: PaymentSectionProps) {
  const paymentMethods = [
    {
      value: "cash_on_delivery",
      label: "Cash on Delivery",
      description: "Pay when you receive your order",
      icon: Banknote,
    },
    {
      value: "card",
      label: "Credit/Debit Card",
      description: "Visa, MasterCard, American Express",
      icon: CreditCard,
    },
    {
      value: "online",
      label: "Online Payment",
      description: "eSewa, Khalti, IME Pay",
      icon: Smartphone,
    },
  ];

  return (
    <Card className="border-l-4 border-l-gray-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-gray-900">2. Payment Method</CardTitle>
          {isCompleted && <CheckCircle2 className="text-green-500 w-6 h-6" />}
        </div>
      </CardHeader>
      <CardContent>
        <RadioGroup defaultValue="cash_on_delivery">
          <div className="space-y-3">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              return (
                <label
                  key={method.value}
                  className={`flex items-start p-4 border rounded-lg cursor-pointer transition-all hover:bg-gray-50 ${
                    selectedMethod === method.value
                      ? "border-black bg-gray-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center h-5">
                    <input
                      type="radio"
                      {...register("paymentMethod")}
                      value={method.value}
                      className="w-4 h-4 text-black border-gray-300 focus:ring-black"
                    />
                  </div>
                  <div className="ml-3 flex items-start flex-1">
                    <Icon className="w-5 h-5 mr-2 mt-0.5 text-gray-600" />
                    <div className="flex-1">
                      <span className="font-medium text-gray-900">
                        {method.label}
                      </span>
                      <p className="text-sm text-gray-500">
                        {method.description}
                      </p>
                    </div>
                  </div>
                </label>
              );
            })}
          </div>
        </RadioGroup>
        {errors.paymentMethod && (
          <p className="text-sm text-red-500 mt-2">
            {errors.paymentMethod.message}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
