import React from "react";

const Documentation: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-700 text-white py-8 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-4xl font-extrabold">
            Car Manager Documentation
          </h1>
          <p className="mt-3 text-sm sm:text-lg">
            A complete guide to set up, use, and contribute to the Car Manager
            project.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Introduction */}
        {/* Other sections remain unchanged */}
        {/* Introduction */}
        <section id="introduction" className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6">
            Introduction
          </h2>
          <p className="leading-relaxed text-base sm:text-lg">
            <strong>Car Manager</strong> is a modern web application for
            managing vehicle inventory with ease. It allows users to add, edit,
            and delete cars, search listings, and view detailed car information.
            Powered by the MENN stack (MongoDB, Express, Node.js, Next.js), the
            application offers secure and scalable solutions for car inventory
            management.
          </p>
        </section>

        {/* Features */}
        <section id="features" className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6">
            Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
                Secure User Management
              </h3>
              <p>
                Authentication and authorization using JWT and bcrypt for user
                security.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
                Responsive UI
              </h3>
              <p>Mobile-first design ensuring usability across all devices.</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
                Efficient Search
              </h3>
              <p>
                Search and filter functionality to find vehicles by title,
                description, or tags.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
                RESTful APIs
              </h3>
              <p>
                Comprehensive API endpoints for managing car data effectively.
              </p>
            </div>
          </div>
        </section>
        {/* Getting Started */}
        <section id="getting-started" className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6">
            Getting Started
          </h2>
          <p className="mb-4">
            Follow the steps below to set up and run the project locally:
          </p>
          <ol className="list-decimal list-inside space-y-2 sm:space-y-4 text-base sm:text-lg">
            <li>
              <strong>Clone the Repository:</strong>{" "}
              <code className="bg-gray-100 px-2 py-1 rounded text-sm sm:text-base">
                git clone https://github.com/himanshug9119/carmanager
              </code>
            </li>
            <li>
              <strong>Install Dependencies:</strong>{" "}
              <code className="bg-gray-100 px-2 py-1 rounded text-sm sm:text-base">
                npm install
              </code>
            </li>
            <li>
              <strong>Set Environment Variables:</strong> Configure a{" "}
              <code>.env</code> file with:
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <code>MONGO_URI</code>: MongoDB connection string.
                </li>
                <li>
                  <code>JWT_SECRET</code>: Secret key for token generation.
                </li>
                <li>
                  <code>PORT</code>: Backend server port (default: 5000).
                </li>
                <li>
                  <strong>Firebase Configuration:</strong> Add the following
                  variables for Firebase integration:
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <code>VITE_FIREBASE_API_KEY</code>: Firebase API Key.
                    </li>
                    <li>
                      <code>VITE_FIREBASE_AUTH_DOMAIN</code>: Firebase Auth
                      Domain.
                    </li>
                    <li>
                      <code>VITE_FIREBASE_PROJECT_ID</code>: Firebase Project
                      ID.
                    </li>
                    <li>
                      <code>VITE_FIREBASE_STORAGE_BUCKET</code>: Firebase
                      Storage Bucket.
                    </li>
                    <li>
                      <code>VITE_FIREBASE_MESSAGING_SENDER_ID</code>: Firebase
                      Messaging Sender ID.
                    </li>
                    <li>
                      <code>VITE_FIREBASE_APP_ID</code>: Firebase App ID.
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <strong>Start the Development Server:</strong>{" "}
              <code className="bg-gray-100 px-2 py-1 rounded text-sm sm:text-base">
                npm run dev
              </code>
            </li>
            <li>
              <strong>Access the Application:</strong>{" "}
              <code className="bg-gray-100 px-2 py-1 rounded text-sm sm:text-base">
                http://localhost:5173
              </code>
            </li>
          </ol>
        </section>

        {/* Other sections remain unchanged */}
        {/* API Endpoints */}
        <section id="api-endpoints" className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6">
            API Endpoints
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="text-left px-4 sm:px-6 py-2 sm:py-3">
                    Endpoint
                  </th>
                  <th className="text-left px-4 sm:px-6 py-2 sm:py-3">
                    Method
                  </th>
                  <th className="text-left px-4 sm:px-6 py-2 sm:py-3">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 sm:px-6 py-2 sm:py-4 border-b">
                    /api/cars
                  </td>
                  <td className="px-4 sm:px-6 py-2 sm:py-4 border-b">GET</td>
                  <td className="px-4 sm:px-6 py-2 sm:py-4 border-b">
                    Fetch all cars
                  </td>
                </tr>
                <tr>
                  <td className="px-4 sm:px-6 py-2 sm:py-4 border-b">
                    /api/cars/:id
                  </td>
                  <td className="px-4 sm:px-6 py-2 sm:py-4 border-b">GET</td>
                  <td className="px-4 sm:px-6 py-2 sm:py-4 border-b">
                    Fetch car by ID
                  </td>
                </tr>
                <tr>
                  <td className="px-4 sm:px-6 py-2 sm:py-4 border-b">
                    /api/cars
                  </td>
                  <td className="px-4 sm:px-6 py-2 sm:py-4 border-b">POST</td>
                  <td className="px-4 sm:px-6 py-2 sm:py-4 border-b">
                    Create a new car
                  </td>
                </tr>
                <tr>
                  <td className="px-4 sm:px-6 py-2 sm:py-4 border-b">
                    /api/cars/:id
                  </td>
                  <td className="px-4 sm:px-6 py-2 sm:py-4 border-b">PUT</td>
                  <td className="px-4 sm:px-6 py-2 sm:py-4 border-b">
                    Update an existing car
                  </td>
                </tr>
                <tr>
                  <td className="px-4 sm:px-6 py-2 sm:py-4 border-b">
                    /api/cars/:id
                  </td>
                  <td className="px-4 sm:px-6 py-2 sm:py-4 border-b">DELETE</td>
                  <td className="px-4 sm:px-6 py-2 sm:py-4 border-b">
                    Delete a car
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Contribution */}
        <section id="contribution">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6">
            Contribution
          </h2>
          <p>
            Contributions are welcome! Please fork the repository, make your
            changes, and submit a pull request.
          </p>
        </section>
      </main>
    </div>
  );
};

export default Documentation;
