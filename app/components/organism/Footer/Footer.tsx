import Link from "next/link";

const Footer: React.FC = () => (
  <footer className="bg-gray-800 text-white py-8">
    <div className="container mx-auto px-4">
      {/* Footer Links */}
      <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center space-y-4 sm:space-y-0">
        <div className="flex space-x-6">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/about" className="hover:underline">
            About Us
          </Link>
          <Link href="/login" className="hover:underline">
            Login
          </Link>
          <Link href="/signup" className="hover:underline">
            Register
          </Link>
        </div>
        {/* Copyright Section */}
        <div className="text-sm">
          © {new Date().getFullYear()} Linking Hearts. All rights reserved.
        </div>
      </div>

      {/* Social Media Links */}
      <div className="flex justify-center space-x-6 mt-4">
        <a href="#" aria-label="Facebook" className="hover:text-gray-400">
          {/* Facebook Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="h-6 w-6"
            viewBox="0 0 24 24"
          >
            <path d="M24 12a12 12 0 1 0-13.875 11.865v-8.385h-2.938v-3.48h2.938V9.845c0-2.91 1.742-4.509 4.414-4.509 1.28 0 2.616.229 2.616.229v2.875h-1.474c-1.453 0-1.905.902-1.905 1.825v2.21h3.238l-.518 3.48h-2.72v8.384A12 12 0 0 0 24 12" />
          </svg>
        </a>
        <a href="#" aria-label="Twitter" className="hover:text-gray-400">
          {/* Twitter Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="h-6 w-6"
            viewBox="0 0 24 24"
          >
            <path d="M24 4.557a9.85 9.85 0 0 1-2.828.775 4.948 4.948 0 0 0 2.165-2.724 9.865 9.865 0 0 1-3.127 1.195 4.924 4.924 0 0 0-8.389 4.49A13.978 13.978 0 0 1 1.671 3.149 4.918 4.918 0 0 0 3.15 9.725a4.902 4.902 0 0 1-2.23-.617v.062a4.924 4.924 0 0 0 3.946 4.827 4.933 4.933 0 0 1-2.224.084 4.927 4.927 0 0 0 4.6 3.417A9.868 9.868 0 0 1 0 19.54a13.91 13.91 0 0 0 7.548 2.212c9.057 0 14.01-7.507 14.01-14.01 0-.213-.005-.425-.014-.636A10.025 10.025 0 0 0 24 4.557" />
          </svg>
        </a>
        <a href="#" aria-label="Instagram" className="hover:text-gray-400">
          {/* Instagram Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="h-6 w-6"
            viewBox="0 0 24 24"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.96.24 2.402.404a4.834 4.834 0 0 1 1.753 1.146 4.834 4.834 0 0 1 1.146 1.753c.164.442.35 1.232.404 2.402.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.96-.404 2.402a4.834 4.834 0 0 1-1.146 1.753 4.834 4.834 0 0 1-1.753 1.146c-.442.164-1.232.35-2.402.404-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.96-.24-2.402-.404a4.834 4.834 0 0 1-1.753-1.146 4.834 4.834 0 0 1-1.146-1.753c-.164-.442-.35-1.232-.404-2.402-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.054-1.17.24-1.96.404-2.402A4.834 4.834 0 0 1 4.02 2.637a4.834 4.834 0 0 1 1.753-1.146c.442-.164 1.232-.35 2.402-.404C8.416 2.175 8.796 2.163 12 2.163m0-2.163C8.741 0 8.332.014 7.053.072 5.766.13 4.775.34 3.993.661 3.18 1 2.428 1.53 1.782 2.174a6.957 6.957 0 0 0-1.513 2.211C.268 5.103.058 6.094 0 7.381.014 8.66 0 9.068 0 12c0 2.932.014 3.34.072 4.619.058 1.287.268 2.278.661 3.062a6.957 6.957 0 0 0 1.513 2.211c.644.646 1.394 1.175 2.211 1.513.784.321 1.775.531 3.062.661C8.332 23.986 8.741 24 12 24s3.668-.014 4.947-.072c1.287-.058 2.278-.268 3.062-.661a6.957 6.957 0 0 0 2.211-1.513c.646-.644 1.175-1.394 1.513-2.211.321-.784.531-1.775.661-3.062.058-1.287.072-1.695.072-4.619s-.014-3.34-.072-4.619c-.058-1.287-.268-2.278-.661-3.062a6.957 6.957 0 0 0-1.513-2.211A6.957 6.957 0 0 0 20.008.661c-.784-.321-1.775-.531-3.062-.661C15.668.014 15.259 0 12 0z" />
            <path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.998 3.998 0 1 1 0-7.996 3.998 3.998 0 0 1 0 7.996zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
          </svg>
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
