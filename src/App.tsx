import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Trees, GamepadIcon } from "lucide-react";
import Home from "./pages/Home";
import Games from "./pages/Games";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-100">
        <header className="bg-white/80 backdrop-blur-sm fixed w-full shadow-sm">
          <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Trees className="text-emerald-600 h-6 w-6" />
              <span className="text-xl font-semibold text-emerald-800">
                BiodiversiVie
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <Link
                to="/games"
                className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full hover:bg-emerald-200 transition flex items-center gap-2"
              >
                <GamepadIcon className="h-5 w-5" />
                Mini-jeux
              </Link>
              <button
                onClick={() =>
                  window.scrollTo({
                    top: document.querySelector("section")?.offsetTop || 0,
                    behavior: "smooth",
                  })
                }
                className="px-4 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition"
              >
                Agir maintenant
              </button>
            </div>
          </nav>
        </header>

        <main className="container mx-auto px-4 pt-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Games />} />
          </Routes>
        </main>

        <footer className="bg-emerald-900 text-emerald-100 py-8">
          <div className="container mx-auto px-4 text-center">
            <p>
              © 2024 BiodiversiVie - Ensemble pour la protection de notre
              biodiversité
            </p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
