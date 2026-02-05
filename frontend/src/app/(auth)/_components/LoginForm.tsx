"use client";
import { loginSchema } from "@/app/schema/loginSchema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useAuth } from "@/context/AuthContext";
import { handleLogin } from "@/lib/actions/auth.action";

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [pending, setTransition] = useTransition();
  const [error, setError] = useState("");
  const { checkAuth } = useAuth();

  const {
    register, //connects the input to the form
    handleSubmit, //handles form submisson,Runs validation first ,only calls your submit function if validation passes
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    // try {
    //   console.log("Login data:", data);

    //   router.push("/dashboard");
    // } catch (error) {
    //   console.error("Login failed:", error);
    // }
    setError("");
    try {
      const result = await handleLogin(data);
      if (!result.success) {
        throw new Error(result.message);
      }

      await checkAuth();
      setTransition(() => {
        router.push("/");
      });
    } catch (e: Error | any) {
      setError(e.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        {error && <div className="text-red-500">{error}</div>}

        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-black"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              {...register("password")}
              placeholder="Enter your password"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-black"
              }`}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            {isSubmitting ? "Signing IN..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link href="/register" className="font-medium underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
