// components/checkout/ShippingSection.tsx
"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { CheckCircle2 } from "lucide-react";
import { CheckoutFormData } from "../schema/checkout.schema";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/app/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

interface ShippingSectionProps {
  register: UseFormRegister<CheckoutFormData>;
  errors: FieldErrors<CheckoutFormData>;
  isCompleted: boolean;
}

export function ShippingSection({
  register,
  errors,
  isCompleted,
}: ShippingSectionProps) {
  return (
    <Card className="border-l-4 border-l-gray-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-gray-900">1. Shipping Information</CardTitle>
          {isCompleted && <CheckCircle2 className="text-green-500 w-6 h-6" />}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Full Name and Phone (2 columns on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="fullName"
              type="text"
              placeholder="John Doe"
              {...register("fullName")}
              className={errors.fullName ? "border-red-500" : ""}
            />
            {errors.fullName && (
              <p className="text-sm text-red-500">{errors.fullName.message}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">
              Phone <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="9812345678"
              {...register("phone")}
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* Address (full width) */}
        <div className="space-y-2">
          <Label htmlFor="address">
            Address <span className="text-red-500">*</span>
          </Label>
          <Input
            id="address"
            type="text"
            placeholder="Street address"
            {...register("address")}
            className={errors.address ? "border-red-500" : ""}
          />
          {errors.address && (
            <p className="text-sm text-red-500">{errors.address.message}</p>
          )}
        </div>

        {/* City, State, Zip Code (3 columns on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* City */}
          <div className="space-y-2">
            <Label htmlFor="city">
              City <span className="text-red-500">*</span>
            </Label>
            <Input
              id="city"
              type="text"
              placeholder="Kathmandu"
              {...register("city")}
              className={errors.city ? "border-red-500" : ""}
            />
            {errors.city && (
              <p className="text-sm text-red-500">{errors.city.message}</p>
            )}
          </div>

          {/* State */}
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              type="text"
              placeholder="Bagmati"
              {...register("state")}
            />
          </div>

          {/* Zip Code */}
          <div className="space-y-2">
            <Label htmlFor="zipCode">
              Zip Code <span className="text-red-500">*</span>
            </Label>
            <Input
              id="zipCode"
              type="text"
              placeholder="44600"
              {...register("zipCode")}
              className={errors.zipCode ? "border-red-500" : ""}
            />
            {errors.zipCode && (
              <p className="text-sm text-red-500">{errors.zipCode.message}</p>
            )}
          </div>
        </div>

        {/* Country (full width) */}
        <div className="space-y-2">
          <Label htmlFor="country">
            Country <span className="text-red-500">*</span>
          </Label>
          <Input
            id="country"
            type="text"
            placeholder="Nepal"
            {...register("country")}
            className={errors.country ? "border-red-500" : ""}
          />
          {errors.country && (
            <p className="text-sm text-red-500">{errors.country.message}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
