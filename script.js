class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playBark() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(280, now);
    osc.frequency.exponentialRampToValueAtTime(95, now + 0.15);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  }

  playMeow() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(460, now);
    osc.frequency.linearRampToValueAtTime(820, now + 0.14);
    osc.frequency.linearRampToValueAtTime(420, now + 0.28);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.22, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.28);
  }

  playSqueak() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1300, now);
    osc.frequency.exponentialRampToValueAtTime(2100, now + 0.08);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.08);
  }

  playBounce() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(170, now);
    osc.frequency.exponentialRampToValueAtTime(50, now + 0.12);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.12);
  }

  playLaserZap() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(1800, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.06);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.06);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.06);
  }

  playPurr() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(32, now);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.35);
  }

  playTugRumble() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(105, now);
    osc.frequency.linearRampToValueAtTime(135, now + 0.1);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.1);
  }
}

const soundEngine = new SoundEngine();

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let width = 0;
let height = 0;
let floorYMin = 0;
let floorYMax = 0;

function resizeCanvas() {
  width = canvas.parentElement.clientWidth;
  height = canvas.parentElement.clientHeight;
  canvas.width = width;
  canvas.height = height;
  floorYMin = height * 0.48;
  floorYMax = height * 0.94;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function getDepthScale(y) {
  const normY = Math.max(0, Math.min(1, (y - floorYMin) / (floorYMax - floorYMin)));
  return 0.62 + normY * 0.53;
}

function getScreenCoords(x, y, z = 0) {
  const scale = getDepthScale(y);
  const screenX = x;
  const screenY = y - z * scale;
  return { screenX, screenY, scale };
}

let activeToyType = 'ball';
let dogHappiness = 88;
let catHappiness = 82;

const mousePos = { 
  x: width / 2, 
  y: (floorYMin + floorYMax) / 2, 
  isDown: false, 
  isDragging: false, 
  vx: 0, 
  vy: 0 
};

const dogHappyBar = document.getElementById('dogHappyBar');
const catHappyBar = document.getElementById('catHappyBar');
const dogActionTag = document.getElementById('dogActionTag');
const catActionTag = document.getElementById('catActionTag');
const actionBannerText = document.getElementById('actionBannerText');

function updateBanner(text, iconClass = "fa-solid fa-face-smile") {
  actionBannerText.innerText = text;
  document.getElementById('actionBannerIcon').className = `${iconClass} text-mustard`;
}

class Particle {
  constructor(x, y, symbol) {
    this.x = x;
    this.y = y;
    this.symbol = symbol;
    this.vx = (Math.random() - 0.5) * 5;
    this.vy = -Math.random() * 4 - 2;
    this.life = 1.0;
    this.decay = Math.random() * 0.025 + 0.015;
    this.size = Math.random() * 12 + 14;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= this.decay;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.life);
    ctx.font = `${this.size}px sans-serif`;
    ctx.fillText(this.symbol, this.x, this.y);
    ctx.restore();
  }
}

const particles = [];
function spawnParticles(x, y, symbol, count = 3) {
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(x + (Math.random() - 0.5) * 20, y + (Math.random() - 0.5) * 20, symbol));
  }
}

function drawRoomBackground(ctx) {
  ctx.fillStyle = '#DAC19C';
  ctx.fillRect(0, 0, width, floorYMin);

  const wallGrad = ctx.createLinearGradient(0, 0, 0, floorYMin);
  wallGrad.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
  wallGrad.addColorStop(1, 'rgba(0, 0, 0, 0.08)');
  ctx.fillStyle = wallGrad;
  ctx.fillRect(0, 0, width, floorYMin);

  ctx.fillStyle = '#C3684D';
  ctx.fillRect(0, floorYMin - 16, width, 16);
  ctx.fillStyle = '#A3533B';
  ctx.fillRect(0, floorYMin - 16, width, 4);

  ctx.fillStyle = '#E2C39B';
  ctx.fillRect(0, floorYMin, width, height - floorYMin);

  ctx.strokeStyle = '#D4B083';
  ctx.lineWidth = 1.5;

  const floorHeight = height - floorYMin;
  const numPlanks = 10;
  for (let i = 1; i <= numPlanks; i++) {
    const y = floorYMin + (i / numPlanks) * floorHeight;
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
  }

  const numPerspectiveSeams = 14;
  for (let i = 0; i < numPerspectiveSeams; i++) {
    const topX = (i / numPerspectiveSeams) * width;
    const bottomX = (width / 2) + (topX - width / 2) * 1.4;
    ctx.beginPath(); ctx.moveTo(topX, floorYMin); ctx.lineTo(bottomX, height); ctx.stroke();
  }

  const rugX = width * 0.5;
  const rugY = floorYMin + (floorYMax - floorYMin) * 0.5;
  const rugRx = Math.min(width * 0.38, 280);
  const rugRy = Math.min((floorYMax - floorYMin) * 0.45, 65);

  ctx.save();
  ctx.beginPath();
  ctx.ellipse(rugX, rugY, rugRx, rugRy, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#AFE2CF';
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#313A70';
  ctx.stroke();

  ctx.beginPath();
  ctx.ellipse(rugX, rugY, rugRx * 0.78, rugRy * 0.78, 0, 0, Math.PI * 2);
  ctx.strokeStyle = '#FFB300';
  ctx.lineWidth = 3.5;
  ctx.stroke();
  ctx.restore();

  const bedX = Math.max(90, width * 0.14);
  const bedY = floorYMin + 25;
  ctx.save();
  ctx.fillStyle = '#C3684D';
  ctx.beginPath(); ctx.ellipse(bedX, bedY, 65, 25, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#FBF7F1';
  ctx.beginPath(); ctx.ellipse(bedX, bedY - 3, 52, 18, 0, 0, Math.PI * 2); ctx.fill();
  ctx.restore();

  const catTreeX = Math.min(width - 90, width * 0.86);
  const catTreeBaseY = floorYMin + 35;
  ctx.save();
  ctx.fillStyle = '#AFE2CF';
  ctx.fillRect(catTreeX - 45, catTreeBaseY - 10, 90, 15);
  ctx.fillStyle = '#C3A37C';
  ctx.fillRect(catTreeX - 10, catTreeBaseY - 140, 20, 130);
  ctx.strokeStyle = '#9A7B56';
  ctx.lineWidth = 2;
  for (let py = catTreeBaseY - 135; py < catTreeBaseY - 10; py += 8) {
    ctx.beginPath(); ctx.moveTo(catTreeX - 10, py); ctx.lineTo(catTreeX + 10, py); ctx.stroke();
  }
  ctx.fillStyle = '#C9888F';
  ctx.beginPath(); ctx.roundRect(catTreeX - 50, catTreeBaseY - 155, 100, 18, 8); ctx.fill();
  ctx.strokeStyle = '#313A70';
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(catTreeX - 30, catTreeBaseY - 137); ctx.lineTo(catTreeX - 30, catTreeBaseY - 100); ctx.stroke();
  ctx.fillStyle = '#FFB300';
  ctx.beginPath(); ctx.arc(catTreeX - 30, catTreeBaseY - 95, 8, 0, Math.PI * 2); ctx.fill();
  ctx.restore();

  ctx.save();
  const frameX = width * 0.5 - 32;
  const frameY = 25;
  ctx.fillStyle = '#C3684D'; ctx.fillRect(frameX, frameY, 64, 45);
  ctx.fillStyle = '#FBF7F1'; ctx.fillRect(frameX + 4, frameY + 4, 56, 37);
  ctx.font = '18px sans-serif'; ctx.fillText('🐶❤️🐱', frameX + 9, frameY + 28);
  ctx.restore();
}

class ToyItem {
  constructor(type, x, y) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.z = 20;
    this.vx = (Math.random() - 0.5) * 8;
    this.vy = (Math.random() - 0.5) * 6;
    this.vz = 5;
    this.radius = 16;
    this.active = true;
    this.isHeld = false;
    this.trail = [];
  }

  update() {
    if (this.isHeld) return;

    if (this.type === 'mouse' && this.active) {
      if (Math.random() < 0.08) {
        this.vx = (Math.random() - 0.5) * 11;
        this.vy = (Math.random() - 0.5) * 8;
        soundEngine.playSqueak();
      }
    }

    this.vz -= 0.42;
    this.x += this.vx;
    this.y += this.vy;
    this.z += this.vz;

    this.vx *= 0.96;
    this.vy *= 0.96;

    if (this.z <= 0) {
      this.z = 0;
      if (Math.abs(this.vz) > 1.5) {
        this.vz = -this.vz * 0.55;
        soundEngine.playBounce();
      } else {
        this.vz = 0;
      }
    }

    this.x = Math.max(40, Math.min(width - 40, this.x));
    this.y = Math.max(floorYMin + 15, Math.min(floorYMax - 15, this.y));

    if (this.type === 'yarn' && (Math.abs(this.vx) > 0.4 || Math.abs(this.vy) > 0.4)) {
      this.trail.push({ x: this.x, y: this.y });
      if (this.trail.length > 25) this.trail.shift();
    }
  }

  draw(ctx) {
    const { screenX, screenY, scale } = getScreenCoords(this.x, this.y, this.z);
    const shadowCoords = getScreenCoords(this.x, this.y, 0);

    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath();
    ctx.ellipse(shadowCoords.screenX, shadowCoords.screenY, 14 * scale, 6 * scale, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.translate(screenX, screenY);
    ctx.scale(scale, scale);

    if (this.type === 'ball') {
      ctx.beginPath(); ctx.arc(0, 0, 14, 0, Math.PI * 2);
      ctx.fillStyle = '#CCFF00'; ctx.fill();
      ctx.lineWidth = 2.5; ctx.strokeStyle = '#FFFFFF'; ctx.stroke();
      ctx.beginPath(); ctx.arc(0, 0, 9, 0.4, 2.6); ctx.stroke();

    } else if (this.type === 'bone') {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(-12, -4, 24, 8);
    ctx.beginPath();
    ctx.arc(-12, -5, 5, 0, Math.PI * 2); 
    ctx.arc(-12, 5, 5, 0, Math.PI * 2);
    ctx.arc(12, -5, 5, 0, Math.PI * 2); 
    ctx.arc(12, 5, 5, 0, Math.PI * 2);
    ctx.fill();
}
     

    } else if (this.type === 'yarn') {
      ctx.beginPath(); ctx.arc(0, 0, 15, 0, Math.PI * 2);
      ctx.fillStyle = '#C9888F'; ctx.fill();
      ctx.lineWidth = 2; ctx.strokeStyle = '#313A70'; ctx.stroke();

    } else if (this.type === 'mouse') {
      ctx.fillStyle = '#98A1A6';
      ctx.beginPath(); ctx.ellipse(0, 0, 12, 8, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#C9888F';
      ctx.beginPath(); ctx.arc(-4, -6, 4, 0, Math.PI * 2); ctx.arc(4, -6, 4, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#C9888F'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(-12, 0); ctx.quadraticCurveTo(-18, -6, -20, -2); ctx.stroke();
    }

    ctx.restore();

    if (this.type === 'yarn' && this.trail.length > 1) {
      ctx.save();
      ctx.strokeStyle = '#C9888F';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      const first = getScreenCoords(this.trail[0].x, this.trail[0].y, 0);
      ctx.moveTo(first.screenX, first.screenY);
      for (let p of this.trail) {
        const sc = getScreenCoords(p.x, p.y, 0);
        ctx.lineTo(sc.screenX, sc.screenY);
      }
      ctx.stroke();
      ctx.restore();
    }
  }
}

let activeToyInstance = null;

function drawLaserPointer(ctx) {
  if (activeToyType !== 'laser') return;

  const lx = mousePos.x;
  const ly = Math.max(floorYMin + 10, Math.min(floorYMax - 10, mousePos.y));
  const { screenX, screenY, scale } = getScreenCoords(lx, ly, 0);

  ctx.save();
  ctx.fillStyle = 'rgba(255, 0, 0, 0.35)';
  ctx.beginPath(); ctx.arc(screenX, screenY, 12 * scale, 0, Math.PI * 2); ctx.fill();

  ctx.fillStyle = '#FF0033';
  ctx.beginPath(); ctx.arc(screenX, screenY, 5 * scale, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath(); ctx.arc(screenX, screenY, 2 * scale, 0, Math.PI * 2); ctx.fill();

  ctx.strokeStyle = 'rgba(255, 0, 50, 0.25)';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(mousePos.x, mousePos.y - 60); ctx.lineTo(screenX, screenY); ctx.stroke();
  ctx.restore();
}

class Dog {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.z = 0;
    this.targetX = x;
    this.targetY = y;
    this.vx = 0;
    this.vy = 0;
    this.vz = 0;
    this.facing = 1;
    this.state = 'ROAMING';
    this.roamTimer = Math.floor(Math.random() * 80) + 40;
    this.trickTimer = 0;
    this.rotation = 0;
    this.tailWag = 0;
    this.walkCycle = 0;
  }

  triggerAction(actionName, targetX, targetY) {
    if (actionName === 'FETCH_BALL') {
      this.state = 'FETCHING';
      this.targetX = targetX;
      this.targetY = targetY;
      soundEngine.playBark();
      dogActionTag.innerText = "Sprinting!";
      updateBanner("Barnaby sprints to fetch the tennis ball across the room!", "fa-solid fa-dog");
    } else if (actionName === 'CHEW_BONE') {
      this.state = 'FETCHING';
      this.targetX = targetX;
      this.targetY = targetY;
      soundEngine.playBark();
      dogActionTag.innerText = "Targeting!";
      updateBanner("Barnaby trots over to grab the squeaky bone!", "fa-solid fa-bone");
    } else if (actionName === 'TUG_ROPE') {
      this.state = 'TUGGING';
      soundEngine.playTugRumble();
      dogActionTag.innerText = "Tugging!";
      updateBanner("Tug-of-War! Pull with Barnaby across the room floor!", "fa-solid fa-hand-rock");
    } else if (actionName === 'PETTED') {
      soundEngine.playBark();
      const sc = getScreenCoords(this.x, this.y, this.z);
      spawnParticles(sc.screenX, sc.screenY - 35, '❤️', 5);
      dogHappiness = Math.min(100, dogHappiness + 15);
      dogActionTag.innerText = "Loved!";
      updateBanner("You petted Barnaby! He's super happy!", "fa-solid fa-heart");
    }
  }

  pickNewRoamTarget() {
    this.targetX = Math.random() * (width - 120) + 60;
    this.targetY = Math.random() * (floorYMax - floorYMin - 30) + floorYMin + 15;
    this.roamTimer = Math.floor(Math.random() * 120) + 60;
  }

  update() {
    this.tailWag += 0.28;

    if (this.state === 'ROAMING') {
      dogActionTag.innerText = "Roaming";
      this.roamTimer--;

      if (this.roamTimer <= 0) {
        this.pickNewRoamTarget();
        if (Math.random() < 0.25) {
          this.state = 'PLAY_BOW';
          this.trickTimer = 40;
          soundEngine.playBark();
        }
      }

      const dx = this.targetX - this.x;
      const dy = this.targetY - this.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 15) {
        this.walkCycle += 0.2;
        const speed = 2.8;
        this.vx = (dx / dist) * speed;
        this.vy = (dy / dist) * speed;
        this.x += this.vx;
        this.y += this.vy;
        if (Math.abs(dx) > 2) this.facing = dx >= 0 ? 1 : -1;
      } else {
        this.vx = 0; this.vy = 0;
        const targetX = activeToyInstance ? activeToyInstance.x : cat.x;
        this.facing = targetX >= this.x ? 1 : -1;
      }

      if (activeToyInstance && (activeToyType === 'ball' || activeToyType === 'bone')) {
        this.triggerAction(activeToyType === 'ball' ? 'FETCH_BALL' : 'CHEW_BONE', activeToyInstance.x, activeToyInstance.y);
      }

    } else if (this.state === 'PLAY_BOW') {
      dogActionTag.innerText = "Play Bow";
      this.trickTimer--;
      if (this.trickTimer <= 0) this.state = 'ROAMING';

    } else if (this.state === 'FETCHING') {
      this.walkCycle += 0.35;
      const target = activeToyInstance ? activeToyInstance : { x: this.targetX, y: this.targetY };
      const dx = target.x - this.x;
      const dy = target.y - this.y;
      const dist = Math.hypot(dx, dy);

      if (Math.abs(dx) > 2) this.facing = dx >= 0 ? 1 : -1;

      if (dist > 25) {
        const speed = 7.5;
        this.x += (dx / dist) * speed;
        this.y += (dy / dist) * speed;

        if (dist < 80 && this.z <= 0) {
          this.vz = 6;
        }
      } else {
        if (activeToyType === 'ball') {
          if (activeToyInstance) activeToyInstance.isHeld = true;
          this.state = 'CHEWING';
          this.trickTimer = 60;
          dogHappiness = Math.min(100, dogHappiness + 12);
          soundEngine.playBark();
          const sc = getScreenCoords(this.x, this.y, this.z);
          spawnParticles(sc.screenX, sc.screenY - 30, '🎾', 3);
        } else {
          this.state = 'CHEWING';
          this.trickTimer = 80;
          soundEngine.playSqueak();
          const sc = getScreenCoords(this.x, this.y, this.z);
          spawnParticles(sc.screenX, sc.screenY - 30, '🦴', 3);
        }
      }

    } else if (this.state === 'CHEWING') {
      dogActionTag.innerText = "Chewing!";
      this.trickTimer--;
      if (Math.random() < 0.1) soundEngine.playSqueak();

      if (this.trickTimer <= 0) {
        if (activeToyInstance) {
          activeToyInstance = null;
        }
        this.state = 'ROAMING';
      }
    } else if (this.state === 'TUGGING') {
      dogActionTag.innerText = "Tugging!";
      if (Math.random() < 0.15) soundEngine.playTugRumble();
      if (!mousePos.isDown) {
        this.state = 'ROAMING';
      }
    }

    this.vz -= 0.4;
    this.z += this.vz;
    if (this.z <= 0) {
      this.z = 0;
      this.vz = 0;
    }

    this.x = Math.max(50, Math.min(width - 50, this.x));
    this.y = Math.max(floorYMin + 10, Math.min(floorYMax - 10, this.y));
  }

  draw(ctx) {
    const { screenX, screenY, scale } = getScreenCoords(this.x, this.y, this.z);
    const shadow = getScreenCoords(this.x, this.y, 0);

    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.beginPath();
    ctx.ellipse(shadow.screenX, shadow.screenY, 28 * scale, 12 * scale, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.translate(screenX, screenY);
    ctx.scale(scale * this.facing, scale);

    ctx.strokeStyle = '#C3684D';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-25, -15);
    ctx.quadraticCurveTo(-35 + Math.sin(this.tailWag) * 8, -30, -30, -35);
    ctx.stroke();

    const legOffset = Math.sin(this.walkCycle) * 6;
    ctx.fillStyle = '#A3533B';
    ctx.fillRect(-18 + legOffset, -10, 8, 14);
    ctx.fillRect(10 - legOffset, -10, 8, 14);

    ctx.fillStyle = '#C3684D';
    ctx.fillRect(-14 - legOffset, -10, 8, 14);
    ctx.fillRect(14 + legOffset, -10, 8, 14);

    ctx.fillStyle = '#C3684D';
    ctx.beginPath();
    ctx.ellipse(0, -20, 28, 18, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(22, -32, 16, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#FBF7F1';
    ctx.beginPath();
    ctx.ellipse(30, -28, 9, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#3D3D3D';
    ctx.beginPath();
    ctx.arc(36, -30, 3.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(24, -36, 2.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#A3533B';
    ctx.beginPath();
    ctx.ellipse(14, -30, 6, 12, 0.3, 0, Math.PI * 2);
    ctx.fill();

    if (this.state === 'CHEWING' && activeToyInstance) {
      ctx.font = '16px sans-serif';
      ctx.fillText(activeToyType === 'ball' ? '🎾' : '🦴', 28, -20);
    }

    ctx.restore();
  }
}

class Cat {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.z = 0;
    this.targetX = x;
    this.targetY = y;
    this.vx = 0;
    this.vy = 0;
    this.vz = 0;
    this.facing = -1;
    this.state = 'ROAMING';
    this.roamTimer = Math.floor(Math.random() * 90) + 30;
    this.tailWag = 0;
    this.walkCycle = 0;
    this.pounceTimer = 0;
  }

  triggerAction(actionName, targetX, targetY) {
    if (actionName === 'CHASE_LASER' || actionName === 'PLAY_TOY') {
      this.state = 'CHASING';
      this.targetX = targetX;
      this.targetY = targetY;
      catActionTag.innerText = "Pouncing!";
      if (Math.random() < 0.3) soundEngine.playMeow();
    } else if (actionName === 'PETTED') {
      soundEngine.playPurr();
      const sc = getScreenCoords(this.x, this.y, this.z);
      spawnParticles(sc.screenX, sc.screenY - 30, '✨', 5);
      catHappiness = Math.min(100, catHappiness + 15);
      catActionTag.innerText = "Purring!";
      updateBanner("Mimi is purring happily from your gentle pets!", "fa-solid fa-cat");
    }
  }

  pickNewRoamTarget() {
    this.targetX = Math.random() * (width - 120) + 60;
    this.targetY = Math.random() * (floorYMax - floorYMin - 30) + floorYMin + 15;
    this.roamTimer = Math.floor(Math.random() * 100) + 50;
  }

  update() {
    this.tailWag += 0.15;

    if (activeToyType === 'laser' && mousePos.isDown) {
      this.triggerAction('CHASE_LASER', mousePos.x, mousePos.y);
    } else if (activeToyInstance && ['yarn', 'mouse', 'wand'].includes(activeToyType)) {
      this.triggerAction('PLAY_TOY', activeToyInstance.x, activeToyInstance.y);
    }

    if (this.state === 'ROAMING') {
      catActionTag.innerText = "Exploring";
      this.roamTimer--;
      if (this.roamTimer <= 0) {
        this.pickNewRoamTarget();
      }

      const dx = this.targetX - this.x;
      const dy = this.targetY - this.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 15) {
        this.walkCycle += 0.18;
        const speed = 2.2;
        this.x += (dx / dist) * speed;
        this.y += (dy / dist) * speed;
        if (Math.abs(dx) > 2) this.facing = dx >= 0 ? 1 : -1;
      } else {
        this.facing = dog.x >= this.x ? 1 : -1;
      }

    } else if (this.state === 'CHASING') {
      this.walkCycle += 0.4;
      const dx = this.targetX - this.x;
      const dy = this.targetY - this.y;
      const dist = Math.hypot(dx, dy);

      if (Math.abs(dx) > 2) this.facing = dx >= 0 ? 1 : -1;

      if (dist > 20) {
        const speed = 6.8;
        this.x += (dx / dist) * speed;
        this.y += (dy / dist) * speed;

        if (dist < 60 && this.z <= 0) {
          this.vz = 5.5;
        }
      } else {
        this.state = 'POUNCING';
        this.pounceTimer = 35;
        catHappiness = Math.min(100, catHappiness + 10);
        if (activeToyType === 'laser') {
          soundEngine.playLaserZap();
        } else {
          soundEngine.playMeow();
        }
        const sc = getScreenCoords(this.x, this.y, this.z);
        spawnParticles(sc.screenX, sc.screenY - 25, '🐾', 3);
      }

    } else if (this.state === 'POUNCING') {
      catActionTag.innerText = "Playing!";
      this.pounceTimer--;
      if (this.pounceTimer <= 0) {
        this.state = 'ROAMING';
        if (activeToyInstance && activeToyType !== 'mouse') {
          activeToyInstance = null;
        }
      }
    }

    this.vz -= 0.4;
    this.z += this.vz;
    if (this.z <= 0) {
      this.z = 0;
      this.vz = 0;
    }

    this.x = Math.max(50, Math.min(width - 50, this.x));
    this.y = Math.max(floorYMin + 10, Math.min(floorYMax - 10, this.y));
  }

  draw(ctx) {
    const { screenX, screenY, scale } = getScreenCoords(this.x, this.y, this.z);
    const shadow = getScreenCoords(this.x, this.y, 0);

    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath();
    ctx.ellipse(shadow.screenX, shadow.screenY, 22 * scale, 9 * scale, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.translate(screenX, screenY);
    ctx.scale(scale * this.facing, scale);

    ctx.strokeStyle = '#C9888F';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-20, -12);
    ctx.quadraticCurveTo(-32 + Math.cos(this.tailWag) * 10, -25, -28, -38);
    ctx.stroke();

    const legOffset = Math.sin(this.walkCycle) * 5;
    ctx.fillStyle = '#A36870';
    ctx.fillRect(-12 + legOffset, -8, 6, 12);
    ctx.fillRect(8 - legOffset, -8, 6, 12);

    ctx.fillStyle = '#C9888F';
    ctx.fillRect(-9 - legOffset, -8, 6, 12);
    ctx.fillRect(11 + legOffset, -8, 6, 12);

    ctx.fillStyle = '#C9888F';
    ctx.beginPath();
    ctx.ellipse(0, -16, 22, 14, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(16, -26, 13, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(10, -34); ctx.lineTo(14, -45); ctx.lineTo(19, -36); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(18, -36); ctx.lineTo(23, -45); ctx.lineTo(26, -33); ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath(); ctx.arc(22, -23, 4, 0, Math.PI * 2); ctx.fill();

    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(22, -23); ctx.lineTo(30, -26);
    ctx.moveTo(22, -23); ctx.lineTo(30, -21);
    ctx.stroke();

    ctx.fillStyle = '#313A70';
    ctx.beginPath(); ctx.arc(20, -29, 2.2, 0, Math.PI * 2); ctx.fill();

    ctx.restore();
  }
}

const dog = new Dog(width * 0.35, (floorYMin + floorYMax) * 0.6);
const cat = new Cat(width * 0.65, (floorYMin + floorYMax) * 0.6);

const soundToggle = document.getElementById('soundToggle');
const soundLabel = document.getElementById('soundLabel');
const soundIcon = document.getElementById('soundIcon');

soundToggle.addEventListener('click', () => {
  soundEngine.muted = !soundEngine.muted;
  if (soundEngine.muted) {
    soundLabel.innerText = "Sound: OFF";
    soundIcon.className = "fa-solid fa-volume-xmark";
  } else {
    soundLabel.innerText = "Sound: ON";
    soundIcon.className = "fa-solid fa-volume-high";
    soundEngine.init();
  }
});

document.getElementById('clearRoomBtn').addEventListener('click', () => {
  dog.x = width * 0.35;
  dog.y = (floorYMin + floorYMax) * 0.6;
  dog.state = 'ROAMING';
  dogHappiness = 88;

  cat.x = width * 0.65;
  cat.y = (floorYMin + floorYMax) * 0.6;
  cat.state = 'ROAMING';
  catHappiness = 82;

  activeToyInstance = null;
  updateBanner("Pets reset to starting positions!", "fa-solid fa-rotate-left");
});

document.querySelectorAll('[data-toy]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.toy-btn, .toy-btn-cat').forEach(b => b.classList.remove('active-toy'));
    const targetBtn = e.currentTarget;
    targetBtn.classList.add('active-toy');
    activeToyType = targetBtn.getAttribute('data-toy');

    if (['ball', 'bone', 'yarn', 'mouse'].includes(activeToyType)) {
      activeToyInstance = new ToyItem(activeToyType, width * 0.5, (floorYMin + floorYMax) * 0.5);
    } else {
      activeToyInstance = null;
    }

    updateBanner(`Active Toy selected: ${activeToyType.toUpperCase()}`, "fa-solid fa-gamepad");
  });
});

function handlePointerDown(e) {
  soundEngine.init();
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX || (e.touches && e.touches[0].clientX);
  const y = e.clientY || (e.touches && e.touches[0].clientY);
  mousePos.x = x - rect.left;
  mousePos.y = y - rect.top;
  mousePos.isDown = true;

  const dDog = Math.hypot(mousePos.x - dog.x, mousePos.y - dog.y);
  const dCat = Math.hypot(mousePos.x - cat.x, mousePos.y - cat.y);

  if (dDog < 50) {
    dog.triggerAction('PETTED');
  } else if (dCat < 50) {
    cat.triggerAction('PETTED');
  } else if (['ball', 'bone', 'yarn', 'mouse'].includes(activeToyType)) {
    activeToyInstance = new ToyItem(activeToyType, mousePos.x, Math.max(floorYMin + 15, Math.min(floorYMax - 15, mousePos.y)));
    if (['ball', 'bone'].includes(activeToyType)) {
      dog.triggerAction(activeToyType === 'ball' ? 'FETCH_BALL' : 'CHEW_BONE', activeToyInstance.x, activeToyInstance.y);
    } else {
      cat.triggerAction('PLAY_TOY', activeToyInstance.x, activeToyInstance.y);
    }
  }
}

function handlePointerMove(e) {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX || (e.touches && e.touches[0].clientX);
  const y = e.clientY || (e.touches && e.touches[0].clientY);
  mousePos.x = x - rect.left;
  mousePos.y = y - rect.top;
}

function handlePointerUp() {
  mousePos.isDown = false;
}

canvas.addEventListener('mousedown', handlePointerDown);
canvas.addEventListener('mousemove', handlePointerMove);
window.addEventListener('mouseup', handlePointerUp);

canvas.addEventListener('touchstart', handlePointerDown, { passive: true });
canvas.addEventListener('touchmove', handlePointerMove, { passive: true });
window.addEventListener('touchend', handlePointerUp);

function animate() {
  ctx.clearRect(0, 0, width, height);

  drawRoomBackground(ctx);

  dogHappyBar.style.width = `${dogHappiness}%`;
  catHappyBar.style.width = `${catHappiness}%`;

  if (activeToyInstance) {
    activeToyInstance.update();
    activeToyInstance.draw(ctx);
  }

  drawLaserPointer(ctx);

  const entities = [dog, cat];
  entities.sort((a, b) => a.y - b.y);

  entities.forEach(entity => {
    entity.update();
    entity.draw(ctx);
  });

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].draw(ctx);
    if (particles[i].life <= 0) particles.splice(i, 1);
  }

  requestAnimationFrame(animate);
}

animate();
