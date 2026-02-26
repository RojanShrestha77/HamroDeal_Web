// components/checkout/NotesSection.tsx
"use client";

import { UseFormRegister } from "react-hook-form";
import { CheckoutFormData } from "../schema/checkout.schema";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/app/components/ui/textarea";

interface NotesSectionProps {
  register: UseFormRegister<CheckoutFormData>;
}

export function NotesSection({ register }: NotesSectionProps) {
  return (
    <Card className="border-l-4 border-l-gray-300">
      <CardHeader>
        <CardTitle className="text-xl text-gray-900">Order Notes (Optional)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label htmlFor="notes">
            Add any special instructions for your order
          </Label>
          <Textarea
            id="notes"
            {...register("notes")}
            placeholder="e.g., Please call before delivery, Leave at front door, etc."
            rows={4}
            className="resize-none"
          />
          <p className="text-xs text-gray-500">Maximum 500 characters</p>
        </div>
      </CardContent>
    </Card>
  );
}
