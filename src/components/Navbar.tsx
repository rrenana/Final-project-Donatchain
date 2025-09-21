import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const links = [
    { name: "עמוד ראשי", path: "/" },
    { name: "עמותות / קמפיינים", path: "/campaigns" },
    { name: "אודות", path: "/about" },
  ];

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* לוגו */}
      <div className="flex items-center gap-3">
        <img src="/logo.png" alt="Logo" className="h-10 w-10" />
        <h1 className="text-xl font-bold text-green-600">Blockchain Donations</h1>
      </div>

      {/* קטגוריות בצד ימין */}
      <div className="flex gap-4">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`px-4 py-2 rounded-md text-lg font-semibold transition ${
              location.pathname === link.path
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-green-100"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
