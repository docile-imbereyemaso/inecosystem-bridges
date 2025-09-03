import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";

export default function TvetProfiles() {
  return (
    <>
      <PageMeta
        title="INECOSYSTEM BRIDGES"
        description=""
      />
      <PageBreadcrumb pageTitle="Profile" />
  <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        <div className="space-y-6">
          {/* Header */}
          <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
            
            <div className="space-y-6 p-6 bg-white dark:bg-slate-900 text-gray-800 dark:text-white rounded-lg">
              {/* Header */}
              <div>
                <h2 className="text-2xl font-semibold mb-2">Profile Settings</h2>
                <p className="text-slate-400">
                  Manage your account information and security settings
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-4 space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Personal Information</h3>
                  <p className="text-gray-500 dark:text-slate-400">
                    Update your personal details and contact information
                  </p>

                  <div>
                    <label className="block text-gray-700 dark:text-slate-300">Username</label>
                    <input
                      value="caleb_mevis"
                      className="w-full bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-800 dark:text-white p-2 mt-1 rounded"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 dark:text-slate-300">Email Address</label>
                    <input
                      type="email"
                      value="caleb@example.com"
                      className="w-full bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-800 dark:text-white p-2 mt-1 rounded"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 dark:text-slate-300">Phone Number</label>
                    <input
                      type="tel"
                      value="+1234567890"
                      className="w-full bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-800 dark:text-white p-2 mt-1 rounded"
                      readOnly
                    />
                  </div>
                </div>

                {/* Security Settings */}
                <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-4 space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Security Settings</h3>
                  <p className="text-gray-500 dark:text-slate-400">
                    Update your password to keep your account secure
                  </p>

                  <div>
                    <label className="block text-gray-700 dark:text-slate-300">New Password</label>
                    <input
                      type="password"
                      value="••••••••"
                      className="w-full bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-800 dark:text-white p-2 mt-1 rounded"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 dark:text-slate-300">Re-type Password</label>
                    <input
                      type="password"
                      value="••••••••"
                      className="w-full bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-800 dark:text-white p-2 mt-1 rounded"
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <hr className="border-gray-200 dark:border-slate-700" />

              {/* Actions */}
              <div className="flex justify-end space-x-4">
                <button className="border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 px-4 py-2 rounded">
                  Cancel
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                  Save Changes
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}