import Logo from "../atoms/Logo";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center">
        <div className="w-16 h-16">
            <Logo />
        </div>
    </div>
  )
}
