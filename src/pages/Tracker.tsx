import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Bird, PawPrint, Beer as Deer } from 'lucide-react';
import L from 'leaflet';

// Fix for default marker icons in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const animalData = [
  {
    id: 1,
    species: "Loup gris",
    count: 624,
    location: [45.1885, 5.7245],
    description: "Population en augmentation dans les Alpes françaises"
  },
  {
    id: 2,
    species: "Lynx boréal",
    count: 150,
    location: [46.6034, 6.0242],
    description: "Principalement présent dans le massif du Jura"
  },
  {
    id: 3,
    species: "Gypaète barbu",
    count: 71,
    location: [45.9237, 6.8694],
    description: "Espèce en cours de réintroduction dans les Alpes"
  }
];

const speciesStats = [
  {
    name: "Mammifères suivis",
    count: "43 espèces",
    icon: Deer,
    change: "+12% depuis 2020"
  },
  {
    name: "Oiseaux observés",
    count: "276 espèces",
    icon: Bird,
    change: "+8% depuis 2020"
  },
  {
    name: "Points d'observation",
    count: "1,247",
    icon: PawPrint,
    change: "+156 en 2024"
  }
];

function Tracker() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-emerald-800 mb-2">Suivi de la Faune Sauvage</h1>
          <p className="text-gray-600">Surveillance et protection des espèces en France métropolitaine</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {speciesStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center gap-4">
                <stat.icon className="h-8 w-8 text-emerald-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">{stat.name}</h3>
                  <p className="text-2xl font-bold text-emerald-600">{stat.count}</p>
                  <p className="text-sm text-emerald-700">{stat.change}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <MapContainer center={[46.2276, 2.2137]} zoom={6}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {animalData.map((animal) => (
              <Marker key={animal.id} position={animal.location as [number, number]}>
                <Popup>
                  <div className="p-2">
                    <h3 className="font-semibold">{animal.species}</h3>
                    <p className="text-sm text-gray-600">{animal.description}</p>
                    <p className="text-sm font-semibold text-emerald-600 mt-1">
                      Population: {animal.count} individus
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <div className="grid gap-6 mb-8">
          {animalData.map((animal) => (
            <div key={animal.id} className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-emerald-800">{animal.species}</h3>
                  <p className="text-gray-600">{animal.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-emerald-600">{animal.count}</p>
                  <p className="text-sm text-gray-500">individus recensés</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tracker;