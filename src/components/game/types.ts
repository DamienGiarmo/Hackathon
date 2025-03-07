export interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  type: 'player' | 'poacher' | 'deer' | 'bullet';
  direction: 'left' | 'right' | 'up';
}

export interface GameState {
  score: number;
  lives: number;
  gameOver: boolean;
  paused: boolean;
}

export interface GameControls {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
  shooting: boolean;
} 