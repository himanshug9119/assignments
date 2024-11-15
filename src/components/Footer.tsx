export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-700 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold">Car Portal</h2>
            <p className="mt-2 text-sm text-indigo-200">
              Your trusted platform for managing car listings.
            </p>
          </div>

          {/* Social Links */}
          <div className="mt-6 md:mt-0">
            <h3 className="text-sm font-medium">Stay Connected</h3>
            <div className="flex space-x-6 mt-4">
              <a
                href="https://github.com/himanshug9119"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-100 transition duration-200"
                aria-label="GitHub"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.5 7.9 11.1.6.1.8-.3.8-.6v-2.3c-3.2.7-3.9-1.6-3.9-1.6-.5-1.2-1.2-1.5-1.2-1.5-.9-.6.1-.6.1-.6 1 .1 1.6 1 1.6 1 .9 1.6 2.4 1.1 3 .8.1-.7.4-1.1.6-1.4-2.5-.3-5.1-1.3-5.1-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.6.1-3.4 0 0 1-.3 3.3 1.2.9-.3 2-.4 3-.4s2.1.1 3 .4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.8.2 3.1.1 3.4.8.8 1.2 1.8 1.2 3.1 0 4.4-2.6 5.4-5.1 5.7.4.4.7 1 .7 2v3c0 .3.3.7.8.6 4.6-1.6 7.9-6 7.9-11.1C23.5 5.7 18.3.5 12 .5z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/himanshug9119"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-100 transition duration-200"
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <path d="M19 0H5C2.2 0 0 2.2 0 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5V5c0-2.8-2.2-5-5-5zm-9 19H7v-8h3v8zm-1.5-9.2c-1 0-1.8-.8-1.8-1.8 0-1 .8-1.8 1.8-1.8s1.8.8 1.8 1.8c-.1 1-.8 1.8-1.8 1.8zm10.5 9.2h-3v-4c0-1-.4-1.7-1.3-1.7-.7 0-1.1.5-1.3 1-.1.1-.1.3-.1.5v4h-3v-8h3v1c.4-.6 1.1-1.5 2.7-1.5 1.9 0 3.3 1.3 3.3 4.1v4.4z" />
                </svg>
              </a>
              <a
                href="https://linktr.ee/himanshug9119"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-100 transition duration-200"
                aria-label="Linktree"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm-.8 18H9.6v-6H7.8v-2h1.8v-.9c0-1.5 1.3-2.6 2.9-2.6.7 0 1.3.1 1.5.1v1.9h-1c-.8 0-1.2.4-1.2 1v.5h2.2l-.3 2h-1.9v6z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 text-center text-sm text-indigo-200">
          &copy; {new Date().getFullYear()} Himanshu Gupta. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
