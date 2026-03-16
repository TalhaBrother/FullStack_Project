import { Link } from "react-router";
import { useSelector } from "react-redux";

const Navbar = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-11 h-11 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100 group-hover:bg-slate-900 transition-colors duration-300">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            className="w-6 h-6 text-white"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                    </div>
                    <span className="text-2xl font-black text-slate-900 tracking-tighter">PROJECT<span className="text-indigo-600 text-[10px] align-top ml-1">TM</span></span>
                </Link>

                <nav className="hidden lg:flex items-center gap-10">
                    <Link to="/" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-widest">Marketplace</Link>
                    <Link to="/tutions" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-widest">Opportunities</Link>
                    <Link to="/chat" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-widest">Messages</Link>
                </nav>

                <div className="flex items-center gap-4">
                    {user ? (
                        <Link to="/profile" className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors uppercase tracking-widest">Profile</Link>
                    ) : (
                        <Link to="/login" className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors uppercase tracking-widest">Sign In</Link>
                    )}
                    <Link to="/register" className="px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-indigo-600 transition-all duration-300 shadow-xl shadow-slate-100 uppercase tracking-widest">
                        Join Now
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Navbar;