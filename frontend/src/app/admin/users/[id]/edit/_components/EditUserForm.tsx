"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateUserAction } from "@/lib/actions/(admin)/user-action";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: "user" | "admin" | "seller";
  phoneNumber?: string;
  address?: string;
  imageUrl?: string;
}

export default function EditUserForm({ user }: { user: User }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    username: user.username || "",
    role: user.role || "user",
    // phoneNumber: user.phoneNumber || "",
    // address: user.address || "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const data = new FormData();
    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("email", formData.email);
    data.append("username", formData.username);
    data.append("role", formData.role);
    // data.append("phoneNumber", formData.phoneNumber);
    // data.append("address", formData.address);

    if (imageFile) {
      data.append("image", imageFile);
    }

    const result = await updateUserAction(user._id, data);

    if (result.success) {
      alert("User updated successfully!");
      router.push("/admin/users");
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Role</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="user">User</option>
          <option value="seller">Seller</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* <div>
        <label className="block text-sm font-medium mb-1">Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows={3}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div> */}

      <div>
        <label className="block text-sm font-medium mb-1">Profile Image</label>
        {user.imageUrl && (
          <div className="mb-2">
            <img
              src={`http://localhost:5050${user.imageUrl}`}
              alt="Current profile"
              className="w-20 h-20 object-cover rounded"
            />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update User"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
