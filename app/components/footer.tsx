export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200">
      {/* Main Footer Section */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
        {/* Company Info */}
        <div>
          <div className="flex items-center space-x-2">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
              className="fill-current text-primary">
              <path d="M22.672 15.226l-2.432.811..."></path>
            </svg>
            <span className="font-bold text-lg">ACME Industries Ltd.</span>
          </div>
          <p className="mt-2">
            Providing reliable tech since 1992.
          </p>
        </div>

        {/* Services */}
        <nav>
          <h6 className="text-lg font-semibold mb-2">Services</h6>
          <ul className="space-y-2">
            <li><a className="hover:text-primary" href="#">Branding</a></li>
            <li><a className="hover:text-primary" href="#">Design</a></li>
            <li><a className="hover:text-primary" href="#">Marketing</a></li>
            <li><a className="hover:text-primary" href="#">Advertisement</a></li>
          </ul>
        </nav>

        {/* Company */}
        <nav>
          <h6 className="text-lg font-semibold mb-2">Company</h6>
          <ul className="space-y-2">
            <li><a className="hover:text-primary" href="#">About us</a></li>
            <li><a className="hover:text-primary" href="#">Contact</a></li>
            <li><a className="hover:text-primary" href="#">Jobs</a></li>
            <li><a className="hover:text-primary" href="#">Press kit</a></li>
          </ul>
        </nav>

        {/* Legal */}
        <nav>
          <h6 className="text-lg font-semibold mb-2">Legal</h6>
          <ul className="space-y-2">
            <li><a className="hover:text-primary" href="#">Terms of use</a></li>
            <li><a className="hover:text-primary" href="#">Privacy policy</a></li>
            <li><a className="hover:text-primary" href="#">Cookie policy</a></li>
          </ul>
        </nav>
      </div>

      {/* Footer Bottom Section */}
      <div className="bg-gray-900 text-center py-4">
        <p className="text-sm">
          © {new Date().getFullYear()} ACME Industries Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
