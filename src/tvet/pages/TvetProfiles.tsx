import { useEffect, useState } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";

export default function TvetProfiles() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Replace with the logged-in user's id
  const profileId = "cde3a46b-8d6c-4f5f-bf52-7fbbc63164bc";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/tvet-profiles/${profileId}`);
        const data = await response.json();
        if (response.ok) {
          setProfile(data.profile);
        } else {
          setMessage(data.message || "Failed to load profile");
        }
      } catch (error: any) {
        setMessage(error.message || "Error connecting to API");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [profileId]);

  if (loading) return <p>Loading profile...</p>;

  const handleSave = async () => {
    try {
      const payload: any = {
        username: profile.username,
        email: profile.email,
        phone: profile.phone,
      };

      // Include password fields only if new password is entered
      if (profile.newPassword) {
        payload.currentPassword = profile.currentPassword;
        payload.newPassword = profile.newPassword;
      }

      const response = await fetch(`http://localhost:5000/api/tvet-profiles/${profileId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Profile updated successfully!");
        // Clear password fields after success
        setProfile({ ...profile, currentPassword: "", newPassword: "" });
      } else {
        setMessage(data.message || "Failed to update profile");
      }
    } catch (error: any) {
      setMessage(error.message || "Error connecting to API");
    }
  };

  return (
    <>
      <PageMeta title="INECOSYSTEM BRIDGES" description="" />
      <PageBreadcrumb pageTitle="Profile" />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>

        {message && <p className="text-red-500 mb-3">{message}</p>}

        {profile && (
          <div className="space-y-6">
            {/* Username */}
            <div>
              <label>Username</label>
              <input
                type="text"
                value={profile.username}
                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>

            {/* Email */}
            <div>
              <label>Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>

            {/* Phone */}
            <div>
              <label>Phone</label>
              <input
                type="tel"
                value={profile.phone || ""}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>

            {/* Current Password */}
            <div>
              <label>Current Password</label>
              <input
                type="password"
                value={profile.currentPassword || ""}
                onChange={(e) => setProfile({ ...profile, currentPassword: e.target.value })}
                placeholder="Enter current password"
                className="w-full p-2 border rounded"
              />
            </div>

            {/* New Password */}
            <div>
              <label>New Password</label>
              <input
                type="password"
                value={profile.newPassword || ""}
                onChange={(e) => setProfile({ ...profile, newPassword: e.target.value })}
                placeholder="Enter new password"
                className="w-full p-2 border rounded"
              />
            </div>

            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </>
  );
}
