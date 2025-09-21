import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  Menu,
  X,
  Sun,
  Moon,
  Home,
  Users,
  Info,
  User,
  LogOut,
} from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { ngo, logout } = useAuth();

  const activeGradient = "linear-gradient(135deg, #3b6978, #8fa98f)";

  const getButtonStyle = (isActive: boolean) => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    padding: "0.6rem 1.4rem",
    fontSize: "1rem",
    fontWeight: "bold",
    borderRadius: "0.75rem",
    border: "2px solid #3b6978",
    textDecoration: "none",
    transition: "all 0.25s ease",
    background: isActive ? activeGradient : "#f9fafb",
    color: isActive ? "white" : "#333",
    boxShadow: isActive ? "0 4px 12px rgba(0,0,0,0.2)" : "none",
    cursor: "pointer",
    fontFamily: "'Heebo', sans-serif",
  });

  const dropdownStyle: React.CSSProperties = {
    position: "absolute",
    top: "100%",
    right: 0,
    background: darkMode ? "#1e293b" : "#ffffff",
    border: "1px solid #3b6978",
    borderRadius: "0.5rem",
    padding: "0.5rem",
    listStyle: "none",
    minWidth: "160px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
    zIndex: 20,
  };

  const linkStyle: React.CSSProperties = {
    display: "block",
    padding: "0.5rem",
    borderRadius: "0.5rem",
    color: darkMode ? "#f1f5f9" : "#333",
    textDecoration: "none",
    transition: "background 0.2s",
    fontFamily: "'Heebo', sans-serif",
  };

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const MenuItems = () => (
    <>
      <li>
        <Link to="/" style={getButtonStyle(location.pathname === "/")}>
          <Home size={18} />
          עמוד ראשי
        </Link>
      </li>

      {/* תורמים */}
      <li style={{ position: "relative" }}>
        <button
          onClick={() => toggleDropdown("donors")}
          style={getButtonStyle(location.pathname.startsWith("/donors"))}
        >
          <Users size={18} />
          תורמים ⌄
        </button>
        {openDropdown === "donors" && (
          <ul style={dropdownStyle}>
            <li>
              <Link to="/donors/ngo" style={linkStyle}>
                רשימת עמותות
              </Link>
            </li>
            <li>
              <Link to="/campaigns" style={linkStyle}>
                רשימת קמפיינים
              </Link>
            </li>
          </ul>
        )}
      </li>

      {/* עמותות */}
      <li style={{ position: "relative" }}>
        {ngo ? (
          <Link
            to="/ngo/home"
            style={getButtonStyle(location.pathname.startsWith("/ngo"))}
          >
            אזור אישי
          </Link>
        ) : (
          <>
            <button
              onClick={() => toggleDropdown("ngo")}
              style={getButtonStyle(location.pathname.startsWith("/ngo"))}
            >
              עמותות ⌄
            </button>
            {openDropdown === "ngo" && (
              <ul style={dropdownStyle}>
                <li>
                  <Link to="/registration/ngo" style={linkStyle}>
                    הרשמה
                  </Link>
                </li>
                <li>
                  <Link to="/login/ngo" style={linkStyle}>
                    התחברות
                  </Link>
                </li>
              </ul>
            )}
          </>
        )}
      </li>

      {/* עלינו */}
      <li style={{ position: "relative" }}>
        <button
          onClick={() => toggleDropdown("about")}
          style={getButtonStyle(location.pathname.startsWith("/about"))}
        >
          <Info size={18} />
          עלינו ⌄
        </button>
        {openDropdown === "about" && (
          <ul style={dropdownStyle}>
            <li>
              <Link to="/about" style={linkStyle}>
                מי אנחנו
              </Link>
            </li>
            <li>
              <Link to="/about/rules" style={linkStyle}>
                תקנון
              </Link>
            </li>
          </ul>
        )}
      </li>
    </>
  );

  return (
    <>
      <nav
        dir="rtl"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.8rem 2rem",
          background: darkMode
            ? "rgba(15,23,42,0.95)"
            : "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          color: darkMode ? "#f1f5f9" : "#000",
          fontFamily: "'Heebo', sans-serif",
        }}
      >
        {/* תפריט דסקטופ */}
        <ul
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            margin: 0,
            padding: 0,
            listStyle: "none",
          }}
          className="hidden md:flex"
        >
          <MenuItems />
        </ul>

        {/* לוגו + dark mode + מובייל + אייקון משתמש */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {ngo && (
            <div style={{ position: "relative" }}>
              <button
                onClick={() => toggleDropdown("user")}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: darkMode ? "#f1f5f9" : "#000",
                }}
              >
                <User size={26} />
              </button>
              {openDropdown === "user" && (
                <ul style={{ ...dropdownStyle, right: "auto", left: 0 }}>
                  <li>
                    <button
                      onClick={() => {
                        logout();
                        navigate("/");
                      }}
                      style={{
                        ...linkStyle,
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        background: activeGradient,
                        color: "white",
                      }}
                    >
                      <LogOut size={18} /> התנתקות
                    </button>
                  </li>
                </ul>
              )}
            </div>
          )}
          <img src="/logo.png" alt="לוגו" style={{ height: "56px" }} />
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: darkMode ? "#f1f5f9" : "#000",
            }}
          >
            {darkMode ? <Sun size={22} /> : <Moon size={22} />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: darkMode ? "#f1f5f9" : "#000",
            }}
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* תפריט מובייל */}
      <ul
        style={{
          overflow: "hidden",
          maxHeight: mobileOpen ? "500px" : "0px",
          opacity: mobileOpen ? 1 : 0,
          transition: "all 0.5s ease",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: mobileOpen ? "1rem" : "0 1rem",
          listStyle: "none",
          background: darkMode ? "#1e293b" : "#ffffff",
          borderTop: "1px solid #3b6978",
          fontFamily: "'Heebo', sans-serif",
        }}
        className="md:hidden"
      >
        <MenuItems />
      </ul>
    </>
  );
}
