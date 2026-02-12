"use client";
import {
  UpdateUserData,
  updateUserSchema,
} from "@/app/schema/updateUserSchema";
import { Controller, useForm } from "react-hook-form";
import { handleUpdateProfile } from "@/lib/actions/auth.action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";

export default function UpdateUserForm({ user }: { user: any }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserData>({
    resolver: zodResolver(updateUserSchema),
    values: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      username: user?.username || "",
    },
  });

  const [error, setError] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (
    file: File | undefined,
    onChange: (filie: File | undefined) => void,
  ) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
    onChange(file);
  };

  const handleDismissImage = (onChange?: (file: File | undefined) => void) => {
    setPreviewImage(null);
    onChange?.(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (data: UpdateUserData) => {
    setError(null);
    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("username", data.username);
      if (data.image) {
        formData.append("image", data.image);
      }
      const response = await handleUpdateProfile(formData);
      if (!response.success) {
        throw new Error(response.message || "Update Profile failed");
      }

      handleDismissImage();
      toast.success("Profile updated successfully");
    } catch (error: Error | any) {
      toast.error(error.message || "Profile update failed");
      setError(error.message || "Profile update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full shadow-lg mb-4">
            <svg
              className="w-8 h-8 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Profile Settings
          </h1>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            Manage your personal information and account preferences
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Error Message */}
          {error && (
            <div className="mb-8 p-5 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl shadow-xl border border-gray-700 transform transition-all duration-300">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-gray-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-200">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Profile Image Card */}
            <div className="lg:col-span-4">
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-200 p-8 h-full transition-all duration-300 hover:shadow-2xl">
                <div className="flex flex-col items-center space-y-6">
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>

                    <div className="relative">
                      {previewImage ? (
                        <div className="relative">
                          <img
                            src={previewImage}
                            alt="Profile image preview"
                            className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-2xl"
                          />
                          <Controller
                            name="image"
                            control={control}
                            render={({ field: { onChange } }) => (
                              <button
                                type="button"
                                onClick={() => handleDismissImage(onChange)}
                                className="absolute top-2 right-2 bg-gradient-to-br from-gray-800 to-gray-900 text-gray-100 rounded-full w-10 h-10 flex items-center justify-center text-sm hover:from-gray-900 hover:to-black transition-all duration-300 shadow-lg transform hover:-translate-y-0.5"
                                aria-label="Remove image"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            )}
                          />
                        </div>
                      ) : user?.imageUrl ? (
                        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                          <Image
                            src={
                              process.env.NEXT_PUBLIC_API_BASE_URL +
                              user.imageUrl
                            }
                            alt="Profile Image"
                            width={160}
                            height={160}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-40 h-40 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center border-4 border-white shadow-2xl">
                          <svg
                            className="w-16 h-16 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {user?.firstName || user?.username || "User"}
                    </h2>
                    <p className="text-gray-600 font-medium">
                      {user?.email || "No email provided"}
                    </p>
                  </div>

                  <div className="w-full pt-6 border-t border-gray-200">
                    <label className="block text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide text-xs">
                      Update Profile Photo
                    </label>
                    <Controller
                      name="image"
                      control={control}
                      render={({ field: { onChange } }) => (
                        <div className="relative group">
                          <div className="flex items-center justify-center w-full">
                            <label className="cursor-pointer flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 group-hover:shadow-md">
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg
                                  className="w-10 h-10 mb-3 text-gray-400 group-hover:text-gray-600 transition-colors"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                  />
                                </svg>
                                <p className="text-sm text-gray-500 group-hover:text-gray-700 font-medium">
                                  Click to upload or drag and drop
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                  PNG, JPG, WebP up to 5MB
                                </p>
                              </div>
                              <input
                                ref={fileInputRef}
                                type="file"
                                onChange={(e) =>
                                  handleImageChange(
                                    e.target.files?.[0],
                                    onChange,
                                  )
                                }
                                accept=".jpg,.jpeg,.png,.webp"
                                className="hidden"
                              />
                            </label>
                          </div>
                        </div>
                      )}
                    />
                    {errors.image && (
                      <p className="mt-3 text-sm font-medium text-gray-900 bg-gray-100 px-3 py-2 rounded-lg border border-gray-300">
                        {errors.image.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Form Fields Card */}
            <div className="lg:col-span-8">
              <div className="space-y-8">
                {/* Personal Information Card */}
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-200 p-8 transition-all duration-300 hover:shadow-2xl">
                  <div className="flex items-center mb-8">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl mr-4 shadow">
                      <svg
                        className="w-6 h-6 text-gray-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Personal Information
                      </h2>
                      <p className="text-gray-600 mt-1">
                        Update your name and contact details
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label
                        className="block text-sm font-semibold text-gray-900 uppercase tracking-wide text-xs"
                        htmlFor="firstName"
                      >
                        First Name
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        {...register("firstName")}
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-300 hover:border-gray-400"
                        placeholder="Enter your first name"
                      />
                      {errors.firstName && (
                        <div className="flex items-center mt-3 text-gray-900 font-medium">
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="text-sm">
                            {errors.firstName.message}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label
                        className="block text-sm font-semibold text-gray-900 uppercase tracking-wide text-xs"
                        htmlFor="lastName"
                      >
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        {...register("lastName")}
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-300 hover:border-gray-400"
                        placeholder="Enter your last name"
                      />
                      {errors.lastName && (
                        <div className="flex items-center mt-3 text-gray-900 font-medium">
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="text-sm">
                            {errors.lastName.message}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Account Details Card */}
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-200 p-8 transition-all duration-300 hover:shadow-2xl">
                  <div className="flex items-center mb-8">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl mr-4 shadow">
                      <svg
                        className="w-6 h-6 text-gray-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                        />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Account Details
                      </h2>
                      <p className="text-gray-600 mt-1">
                        Manage your login credentials
                      </p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-2">
                      <label
                        className="block text-sm font-semibold text-gray-900 uppercase tracking-wide text-xs"
                        htmlFor="username"
                      >
                        Username
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                        <input
                          id="username"
                          type="text"
                          {...register("username")}
                          className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-300 hover:border-gray-400"
                          placeholder="Choose a username"
                        />
                      </div>
                      {errors.username && (
                        <div className="flex items-center mt-3 text-gray-900 font-medium">
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="text-sm">
                            {errors.username.message}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label
                        className="block text-sm font-semibold text-gray-900 uppercase tracking-wide text-xs"
                        htmlFor="email"
                      >
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <input
                          id="email"
                          type="email"
                          {...register("email")}
                          className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-300 hover:border-gray-400"
                          placeholder="your.email@example.com"
                        />
                      </div>
                      {errors.email && (
                        <div className="flex items-center mt-3 text-gray-900 font-medium">
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="text-sm">
                            {errors.email.message}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons Card */}
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-200 p-8 transition-all duration-300 hover:shadow-2xl">
                  <div className="flex flex-col sm:flex-row justify-between items-center space-y-6 sm:space-y-0">
                    <div className="text-center sm:text-left">
                      <h3 className="text-lg font-bold text-gray-900">
                        Save Your Changes
                      </h3>
                      <p className="text-gray-600 mt-1">
                        Review and update your profile information
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="px-8 py-4 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 font-bold rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl border border-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="relative px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-900 text-gray-100 font-bold rounded-xl hover:from-gray-900 hover:to-black disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-0.5 shadow-xl hover:shadow-2xl group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <span className="relative flex items-center justify-center">
                          {isSubmitting ? (
                            <>
                              <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-100"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Updating Profile...
                            </>
                          ) : (
                            <>
                              <svg
                                className="w-5 h-5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              Save Changes
                            </>
                          )}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
