const colors = ['#ffffff','#000000','#ff3b30','#ff9500','#ffcc00','#34c759','#5ac8fa','#007aff','#5856d6','#ff2d55'];
let selectedColor = colors[2];

const palette = document.getElementById('palette');
const gridEl = document.getElementById('grid');
const clearBtn = document.getElementById('clearBtn');
const gridSizeInput = document.getElementById('gridSize');

function buildPalette(){
  palette.innerHTML = '';
  colors.forEach(c=>{
    const btn = document.createElement('div');
    btn.className = 'color-swatch';
    btn.style.background = c;
    btn.title = c;
    if(c===selectedColor) btn.classList.add('selected');
    btn.addEventListener('click', ()=>{
      selectedColor = c;
      document.querySelectorAll('.color-swatch').forEach(s=>s.classList.remove('selected'));
      btn.classList.add('selected');
    });
    palette.appendChild(btn);
  });
}

function buildGrid(size=16){
  gridEl.innerHTML = '';
  gridEl.style.gridTemplateColumns = `repeat(${size}, 28px)`;
  gridEl.style.gridTemplateRows = `repeat(${size}, 28px)`;
  for(let i=0;i<size*size;i++){
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.index = i;
    cell.addEventListener('click', ()=>{
      cell.style.background = selectedColor;
    });
    cell.addEventListener('contextmenu', (e)=>{
      e.preventDefault();
      cell.style.background = '';
    });
    gridEl.appendChild(cell);
  }
}

clearBtn.addEventListener('click', ()=>{
  document.querySelectorAll('.cell').forEach(c=> c.style.background='');
});

gridSizeInput.addEventListener('change', ()=>{
  const v = parseInt(gridSizeInput.value) || 16;
  const size = Math.min(64, Math.max(4, v));
  buildGrid(size);
});

buildPalette();
buildGrid(parseInt(gridSizeInput.value,10) || 16);
