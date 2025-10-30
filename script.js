const GRID = document.getElementById('grid');
const SENTINEL = document.getElementById('sentinel');
const BATCH = 12;               // how many tiles per load
const LOOP_POOL = 36;           // unique images before looping/shuffling
const SIZE_WEIGHTS = {          // bias toward bigger tiles so they touch more neighbors
  "1x1": 0.30,
  "2x1": 0.20,
  "1x2": 0.20,
  "2x2": 0.24,
  "3x2": 0.03,
  "2x3": 0.03
};

// ======= Image pool (vary ratios but large) =======
const seeds = Array.from({length: LOOP_POOL}, (_, i) => `nbs_${i+1}`);
function urlFor(seed){
  const W = [1200, 1400, 1600, 1800][Math.floor(Math.random()*4)];
  const H = [900, 1100, 1300, 1600][Math.floor(Math.random()*4)];
  return `https://picsum.photos/seed/${seed}_${W}x${H}/${W}/${H}`;
}
