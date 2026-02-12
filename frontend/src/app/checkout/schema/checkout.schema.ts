import {z} from "zod";

export const CheckoutSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    address: z.string().min(5, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().optional(),
    zipCode: z.string().min(1, "Zip code is required"),
    country: z.string().min(1, "Country is required"),
    paymentMethod: z.enum(["cash_on_delivery", "card", "online"], {
         message: "Please select a payment method" 
    }),
    notes: z.string().optional(),
});

export type CheckoutFormData = z.infer<typeof CheckoutSchema>;
