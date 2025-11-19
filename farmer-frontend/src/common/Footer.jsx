const FarmerFooter = () => {
  return (
    <footer className="bg-green-900 text-white mt-10 shadow-lg  w-full">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 p-8 w-full">
        
        {/* About */}
        <div>
          <h2 className="text-2xl font-bold mb-3">Farmer Portal</h2>
          <p className="text-sm text-gray-300">
            Helping farmers with tools, knowledge, and resources 
            to improve productivity and sustainability.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-green-400">Session</a></li>
            <li><a href="#" className="hover:text-green-400">Land Condition</a></li>
            <li><a href="#" className="hover:text-green-400">Water</a></li>
            <li><a href="#" className="hover:text-green-400">Fertilizer</a></li>
            <li><a href="#" className="hover:text-green-400">Seeds</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <p className="text-sm">Address: Village Road, India</p>
          <p className="text-sm">Phone: +91 9876543210</p>
          <p className="text-sm">Email: support@farmerportal.com</p>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex flex-wrap gap-4 text-sm">
            <a href="#" className="hover:text-green-400">Facebook</a>
            <a href="#" className="hover:text-green-400">Twitter</a>
            <a href="#" className="hover:text-green-400">Instagram</a>
            <a href="#" className="hover:text-green-400">LinkedIn</a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-green-950 text-center text-gray-400 py-4 text-sm w-full">
        © {new Date().getFullYear()} Farmer Portal. All rights reserved.
      </div>
    </footer>
  );
};

export default FarmerFooter;
