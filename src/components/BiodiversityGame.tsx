import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'player' | 'species';
  species?: 'bird' | 'butterfly' | 'fox' | 'deer' | 'rabbit';
  speed: number;
}

interface ScorePopup {
  x: number;
  y: number;
  points: number;
  opacity: number;
}

interface SpeciesCount {
  bird: number;
  butterfly: number;
  fox: number;
  deer: number;
  rabbit: number;
}

type SpeciesType = 'bird' | 'butterfly' | 'fox' | 'deer' | 'rabbit';

interface SpeciesConfig {
  points: number;
  speed: number;
  spawnWeight: number;
}

const BiodiversityGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  
  // Game state refs
  const scoreRef = useRef(0);
  const speciesCountRef = useRef<SpeciesCount>({
    bird: 0,
    butterfly: 0,
    fox: 0,
    deer: 0,
    rabbit: 0
  });
  const playerRef = useRef<GameObject>({
    x: 400,
    y: 500,
    width: 40,
    height: 40,
    type: 'player',
    speed: 5
  });
  const gameObjectsRef = useRef<GameObject[]>([]);
  const scorePopupsRef = useRef<ScorePopup[]>([]);
  const controlsRef = useRef({
    left: false,
    right: false,
    up: false,
    down: false
  });

  // Species configuration
  const speciesConfig: Record<SpeciesType, SpeciesConfig> = {
    bird: { points: 30, speed: 3, spawnWeight: 10 },      // Fastest, most points
    butterfly: { points: 25, speed: 2.5, spawnWeight: 15 },
    fox: { points: 20, speed: 2, spawnWeight: 20 },
    deer: { points: 15, speed: 1.5, spawnWeight: 25 },
    rabbit: { points: 10, speed: 1, spawnWeight: 30 }     // Slowest, least points
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;

    // Game constants
    const PLAYER_SPEED = 5;
    const SPAWN_INTERVAL = 2000;
    const TARGET_FPS = 48;
    const FRAME_INTERVAL = 1000 / TARGET_FPS;
    const speciesTypes: SpeciesType[] = ['bird', 'butterfly', 'fox', 'deer', 'rabbit'];

    // Game state
    let lastSpawnTime = 0;
    let lastFrameTime = 0;
    let frameCount = 0;
    let lastFPSUpdate = 0;
    let frameTimes: number[] = [];

    // Handle keyboard events
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          controlsRef.current.left = true;
          break;
        case 'ArrowRight':
          controlsRef.current.right = true;
          break;
        case 'ArrowUp':
          controlsRef.current.up = true;
          break;
        case 'ArrowDown':
          controlsRef.current.down = true;
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          controlsRef.current.left = false;
          break;
        case 'ArrowRight':
          controlsRef.current.right = false;
          break;
        case 'ArrowUp':
          controlsRef.current.up = false;
          break;
        case 'ArrowDown':
          controlsRef.current.down = false;
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const updatePlayer = () => {
      const player = playerRef.current;
      let newX = player.x;
      let newY = player.y;

      if (controlsRef.current.left) newX -= PLAYER_SPEED;
      if (controlsRef.current.right) newX += PLAYER_SPEED;
      if (controlsRef.current.up) newY -= PLAYER_SPEED;
      if (controlsRef.current.down) newY += PLAYER_SPEED;

      // Keep player in bounds
      newX = Math.max(0, Math.min(canvas.width - player.width, newX));
      newY = Math.max(0, Math.min(canvas.height - player.height - 100, newY));

      playerRef.current = { ...player, x: newX, y: newY };
    };

    const getRandomSpecies = (): SpeciesType => {
      const totalWeight = Object.values(speciesConfig).reduce((sum, config) => sum + config.spawnWeight, 0);
      let random = Math.random() * totalWeight;
      
      for (const species of speciesTypes) {
        random -= speciesConfig[species].spawnWeight;
        if (random <= 0) {
          return species;
        }
      }
      return speciesTypes[0];
    };

    const spawnSpecies = (currentTime: number) => {
      if (currentTime - lastSpawnTime > SPAWN_INTERVAL) {
        const species = getRandomSpecies();
        const newSpecies: GameObject = {
          x: Math.random() * (canvas.width - 40),
          y: -40,
          width: 40,
          height: 40,
          type: 'species',
          species,
          speed: speciesConfig[species].speed
        };
        gameObjectsRef.current.push(newSpecies);
        lastSpawnTime = currentTime;
      }
    };

    const updateSpecies = () => {
      gameObjectsRef.current = gameObjectsRef.current.filter(obj => {
        if (obj.type === 'species') {
          obj.y += obj.speed;
          return obj.y < canvas.height + 100;
        }
        return true;
      });
    };

    const updateScorePopups = () => {
      scorePopupsRef.current = scorePopupsRef.current
        .map(popup => ({
          ...popup,
          y: popup.y - 1,
          opacity: popup.opacity - 0.02
        }))
        .filter(popup => popup.opacity > 0);
    };

    const checkCollisions = () => {
      const player = playerRef.current;
      gameObjectsRef.current = gameObjectsRef.current.filter(obj => {
        if (obj.type === 'species' && obj.species) {
          if (
            player.x < obj.x + obj.width &&
            player.x + player.width > obj.x &&
            player.y < obj.y + obj.height &&
            player.y + player.height > obj.y
          ) {
            const points = speciesConfig[obj.species].points;
            scoreRef.current += points;
            speciesCountRef.current[obj.species]++;
            
            // Add score popup
            scorePopupsRef.current.push({
              x: obj.x + obj.width / 2,
              y: obj.y,
              points,
              opacity: 1
            });
            
            return false;
          }
        }
        return true;
      });
    };

    const getTotalSpecies = () => {
      return Object.values(speciesCountRef.current).reduce((sum, count) => sum + count, 0);
    };

    const drawGame = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background
      ctx.fillStyle = '#E8F5E9';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grass
      ctx.fillStyle = '#81C784';
      ctx.fillRect(0, canvas.height - 100, canvas.width, 100);

      // Draw player
      const player = playerRef.current;
      ctx.fillStyle = '#4CAF50';
      ctx.beginPath();
      ctx.arc(
        player.x + player.width / 2,
        player.y + player.height / 2,
        player.width / 2,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Draw species
      gameObjectsRef.current.forEach(obj => {
        if (obj.type === 'species' && obj.species) {
          switch (obj.species) {
            case 'bird':
              ctx.fillStyle = '#2196F3';
              break;
            case 'butterfly':
              ctx.fillStyle = '#E91E63';
              break;
            case 'fox':
              ctx.fillStyle = '#FF5722';
              break;
            case 'deer':
              ctx.fillStyle = '#795548';
              break;
            case 'rabbit':
              ctx.fillStyle = '#9E9E9E';
              break;
          }
          ctx.beginPath();
          ctx.arc(obj.x + obj.width / 2, obj.y + obj.height / 2, obj.width / 2, 0, Math.PI * 2);
          ctx.fill();

          // Draw the first letter
          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 20px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const letter = obj.species.charAt(0).toUpperCase();
          ctx.fillText(letter, obj.x + obj.width / 2, obj.y + obj.height / 2);
        }
      });

      // Draw score popups
      scorePopupsRef.current.forEach(popup => {
        ctx.fillStyle = `rgba(46, 125, 50, ${popup.opacity})`;
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`+${popup.points}`, popup.x, popup.y);
      });

      // Draw score and species count
      ctx.fillStyle = '#2E7D32';
      ctx.font = '24px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`${scoreRef.current} points • ${getTotalSpecies()} espèces`, 20, 40);

      // Draw FPS and frame time stats
      frameCount++;
      if (performance.now() - lastFPSUpdate > 1000) {
        const fps = Math.round((frameCount * 1000) / (performance.now() - lastFPSUpdate));
        const avgFrameTime = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
        const maxFrameTime = Math.max(...frameTimes);
        
        ctx.fillStyle = '#000';
        ctx.font = '16px Arial';
        ctx.fillText(`FPS: ${fps}`, 20, 70);
        ctx.fillText(`Avg Frame: ${avgFrameTime.toFixed(2)}ms`, 20, 90);
        ctx.fillText(`Max Frame: ${maxFrameTime.toFixed(2)}ms`, 20, 110);
        
        frameCount = 0;
        lastFPSUpdate = performance.now();
        frameTimes = [];
      }
    };

    const gameLoop = (timestamp: number) => {
      if (!gameStarted || gameOver) {
        return;
      }

      const deltaTime = timestamp - lastFrameTime;
      frameTimes.push(deltaTime);
      if (frameTimes.length > 60) frameTimes.shift(); // Keep last 60 frames

      // Update game state
      updatePlayer();
      spawnSpecies(timestamp);
      updateSpecies();
      updateScorePopups();
      checkCollisions();
      drawGame();

      lastFrameTime = timestamp;
      
      // Force 48 FPS using setTimeout
      setTimeout(() => {
        requestAnimationFrame(gameLoop);
      }, FRAME_INTERVAL);
    };

    if (gameStarted) {
      lastFrameTime = performance.now();
      lastFPSUpdate = performance.now();
      setTimeout(() => {
        requestAnimationFrame(gameLoop);
      }, FRAME_INTERVAL);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameStarted, gameOver]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    scoreRef.current = 0;
    speciesCountRef.current = {
      bird: 0,
      butterfly: 0,
      fox: 0,
      deer: 0,
      rabbit: 0
    };
    gameObjectsRef.current = [];
    scorePopupsRef.current = [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-100">
      <header className="bg-white/80 backdrop-blur-sm fixed w-full shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex items-center">
          <Link to="/" className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700">
            <ArrowLeft className="h-5 w-5" />
            <span>Retour</span>
          </Link>
        </nav>
      </header>

      <main className="container mx-auto px-4 pt-24">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h1 className="text-3xl font-bold text-emerald-800 mb-6 text-center">
              Collection de la Biodiversité
            </h1>
            
            {!gameStarted ? (
              <div className="text-center">
                <p className="text-lg text-emerald-700 mb-6">
                  Utilisez les flèches pour déplacer le ranger et collecter les différentes espèces d'animaux.<br />
                  Points et vitesse par espèce :<br />
                  <span className="text-blue-500">Oiseau : 30 points (très rapide)</span><br />
                  <span className="text-pink-500">Papillon : 25 points (rapide)</span><br />
                  <span className="text-orange-500">Renard : 20 points (moyen)</span><br />
                  <span className="text-brown-500">Cerf : 15 points (lent)</span><br />
                  <span className="text-gray-500">Lapin : 10 points (très lent)</span>
                </p>
                <button
                  onClick={startGame}
                  className="px-6 py-3 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition text-lg"
                >
                  Commencer le jeu
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <canvas
                  ref={canvasRef}
                  className="w-full border-2 border-emerald-200 rounded-lg"
                />
                {gameOver && (
                  <div className="text-center mt-4">
                    <p className="text-xl font-bold text-red-600 mb-4">Partie terminée!</p>
                    <p className="text-lg text-emerald-700 mb-4">
                      Score final: {scoreRef.current} points<br />
                      Espèces collectées: {Object.values(speciesCountRef.current).reduce((sum, count) => sum + count, 0)}
                    </p>
                    <button
                      onClick={startGame}
                      className="px-6 py-3 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition text-lg"
                    >
                      Rejouer
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BiodiversityGame; 