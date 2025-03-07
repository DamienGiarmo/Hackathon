import React, { useState } from "react";
import {
  Trees,
  Bird,
  Fish,
  Flower2,
  Bug,
  Sprout,
  AlertTriangle,
  TrendingDown,
  Leaf,
} from "lucide-react";

function Home() {
  const [showActions, setShowActions] = useState(false);

  const actions = [
    "Plantez des espèces locales dans votre jardin - 1m² peut abriter jusqu'à 20 espèces différentes",
    "Créez des refuges pour la faune sauvage - 80% des oiseaux européens sont en déclin",
    "Évitez les pesticides chimiques - Responsables de 40% du déclin des insectes",
    "Participez aux programmes de science citoyenne - +2 millions d'observations en France en 2023",
    "Soutenez les corridors écologiques - 30% des espèces ont besoin de corridors pour survivre",
  ];

  return (
    <>
      {showActions && (
        <section
          id="actions"
          className="bg-white rounded-2xl p-8 shadow-xl mb-16"
        >
          <h2 className="text-2xl font-semibold mb-6 text-emerald-800">
            5 Actions pour Protéger la Biodiversité
          </h2>
          <div className="grid gap-4">
            {actions.map((action, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition"
              >
                <Sprout className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                <p className="text-emerald-900">{action}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="text-center py-16">
        <div className="bg-red-50 rounded-lg p-4 mb-8 inline-flex items-center gap-2">
          <AlertTriangle className="text-red-600 h-5 w-5" />
          <span className="text-red-700 font-medium">
            68% des espèces sauvages ont disparu depuis 1970
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-6">
          Protégeons la richesse de notre planète
        </h1>
        <p className="text-xl text-emerald-700 mb-8">
          La France métropolitaine abrite 180 000 espèces, soit 10% de la
          biodiversité mondiale. Chaque espèce compte, chaque écosystème est
          précieux.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white rounded-xl p-6 shadow-lg transform hover:scale-[1.05] transition">
            <Bird className="h-[48px] w-[48px] text-[rgb(16,185,129)] mx-auto mb-[16px]" />
            <h3 className="text-lg font-semibold mb-2">Faune</h3>
            <p className="text-gray-600">
              1 million d'espèces menacées d'extinction d'ici 2050
            </p>
            <p className="text-sm text-red-600 mt-2"> -30% depuis les années</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg transform hover:scale-105 transition">
            <Flower2 className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Flore</h3>
            <p className="text-gray-600">40% des plantes menacées en France</p>
            <p className="text-sm text-red-600 mt-2">
              15% déjà disparues localement
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg transform hover:scale-105 transition">
            <Bug className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Insectes</h3>
            <p className="text-gray-600">75% de déclin en 27 ans en Europe</p>
            <p className="text-sm text-red-600 mt-2">
              -2.5% de biomasse chaque année
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 text-center">
        <div className="bg-emerald-800 text-white rounded-2xl p-8 md:p-12 transform hover:scale-[1.02] transition">
          <Fish className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Rejoignez le mouvement</h2>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto mb-6">
            La protection de la biodiversité nécessite une action immédiate.
            D'ici 2030, nous devons protéger 30% des terres et des mers.
          </p>
          <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-emerald-700 rounded-lg p-4">
              <TrendingDown className="h-8 w-8 mx-auto mb-2" />
              <p className="font-bold text-2xl">-68%</p>
              <p className="text-sm">Déclin global depuis 1970</p>
            </div>
            <div className="bg-emerald-700 rounded-lg p-4">
              <Leaf className="h-8 w-8 mx-auto mb-2" />
              <p className="font-bold text-2xl">30%</p>
              <p className="text-sm">Objectif de protection 2030</p>
            </div>
            <div className="bg-emerald-700 rounded-lg p-4">
              <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
              <p className="font-bold text-2xl">1/4</p>
              <p className="text-sm">Espèces menacées</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-8 py-16">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-emerald-800">
            Impact Économique
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-2">
              <span className="text-emerald-600">•</span>
              <p>
                44 000 milliards € de valeur économique dépendent de la nature
              </p>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600">•</span>
              <p>
                Les insectes pollinisateurs représentent 153 milliards € par an
              </p>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600">•</span>
              <p>50% du PIB mondial dépend directement de la nature</p>
            </li>
          </ul>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-emerald-800">
            Solutions Naturelles
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-2">
              <span className="text-emerald-600">•</span>
              <p>Les forêts absorbent 30% des émissions de CO2</p>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600">•</span>
              <p>Les zones humides filtrent 90% des polluants de l'eau</p>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600">•</span>
              <p>Les mangroves réduisent de 80% la force des vagues</p>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

export default Home;
