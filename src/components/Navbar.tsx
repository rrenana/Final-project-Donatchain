import { useState } from "react"
import { Link } from "react-router-dom"
import HamburgerMenu from "./HamburgerMenu"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="Logo" className="h-10 w-10" />
        <h1 className="text-xl font-bold">Blockchain Donations</h1>
      </div>

      <div className="hidden md:flex gap-6">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <Link to="/campaigns" className="hover:text-blue-600">Campaigns</Link>
        <Link to="/about" className="hover:text-blue-600">About</Link>
      </div>

      <div className="md:hidden">
        <HamburgerMenu open={open} setOpen={setOpen} />
      </div>
    </nav>
  )
}
