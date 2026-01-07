// models/product.model.ts
import mongoose, { Schema, Document } from "mongoose";

const ProductMongoSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0
    },
    images: {
      type: [String],
      required: true,
      validate: {
        validator: (arr: string[]) => arr.length >= 1,
        message: "At least one image is required"
      }
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Electronics",
        "Fashion",
        "Home & Kitchen",
        "Beauty & Personal Care",
        "Sports & Outdoors",
        "Books",
        "Toys & Games",
        "Health",
        "Automotive",
        "Other"
      ],
      default: "Other"
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

export interface IProduct extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  category: "Electronics" | "Fashion" | "Home & Kitchen" | "Beauty & Personal Care" | "Sports & Outdoors" | "Books" | "Toys & Games" | "Health" | "Automotive" | "Other";
  sellerId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export const ProductModel = mongoose.model<IProduct>("Product", ProductMongoSchema);