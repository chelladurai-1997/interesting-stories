"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Header from "../components/organism/Header/Header";

interface CompletedSections {
  basicInfo: boolean;
  personalDetails: boolean;
  educationOccupation: boolean;
  horoscope: boolean;
  expectation: boolean;
  familyDetails: boolean;
  contactDetails: boolean;
}

interface User {
  id: string;
  username: string;
  mobile: string;
  completedSections: CompletedSections;
}

type ApprovalStatus = "approved" | "rejected";

const AdminUserApproval: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/admin/users/pending-approval");
        if (!response.ok) {
          throw new Error("Failed to fetch users.");
        }

        const responseData = await response.json();
        const data: User[] = responseData.data;
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
        setLoading(false);
        toast.error("Failed to fetch users.");
      }
    };

    fetchUsers();
  }, []);

  const handleApproval = async (userId: string, status: ApprovalStatus) => {
    try {
      const response = await fetch("/api/admin/users/approve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user status.");
      }

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      toast.success(`User ${status} successfully.`);
    } catch (err) {
      console.error(
        "Failed to update user status:",
        err instanceof Error ? err.message : "Unknown error"
      );
      toast.error("Failed to update user status.");
    }
  };

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section>
      <Header />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">User Approval</h1>
        {users.length === 0 ? (
          <div>No users awaiting approval.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="hidden sm:table-row">
                  <th className="px-4 py-2 border-b">Username</th>
                  <th className="px-4 py-2 border-b">Mobile</th>
                  <th className="px-4 py-2 border-b">Completed Sections</th>
                  <th className="px-4 py-2 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="flex flex-col sm:table-row border-b sm:border-none"
                  >
                    <td className="px-4 py-2 sm:border-b sm:w-auto w-full">
                      <span className="font-semibold sm:hidden">
                        Username:{" "}
                      </span>
                      {user.username}
                    </td>
                    <td className="px-4 py-2 sm:border-b sm:w-auto w-full">
                      <span className="font-semibold sm:hidden">Mobile: </span>
                      {user.mobile}
                    </td>
                    <td className="px-4 py-2 sm:border-b sm:w-auto w-full">
                      <span className="font-semibold sm:hidden">
                        Completed Sections:{" "}
                      </span>
                      {Object.keys(user.completedSections)
                        .filter(
                          (section) =>
                            user.completedSections[
                              section as keyof CompletedSections
                            ]
                        )
                        .join(", ")}
                    </td>
                    <td className="px-4 py-2 sm:border-b sm:w-auto w-full flex flex-col sm:flex-row sm:justify-end gap-2">
                      <button
                        onClick={() => handleApproval(user.id, "approved")}
                        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 w-full sm:w-auto"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleApproval(user.id, "rejected")}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 w-full sm:w-auto"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminUserApproval;
