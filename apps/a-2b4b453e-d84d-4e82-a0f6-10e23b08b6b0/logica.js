function calcularPuntuacion(checks) {
  if (!checks || typeof checks !== 'object') return 0;
  const claves = Object.keys(checks);
  if (claves.length === 0) return 0;
  let suma = 0;
  for (const k of claves) {
    const v = checks[k];
    if (v === true) suma += 1;
    else if (typeof v === 'number') suma += Math.max(0, Math.min(1, v));
  }
  return Math.round((suma / claves.length) * 100);
}

function nivelSalud(puntos) {
  if (typeof puntos !== 'number' || isNaN(puntos)) return 'sin datos';
  if (puntos < 0) puntos = 0;
  if (puntos > 100) puntos = 100;
  if (puntos >= 85) return 'excelente';
  if (puntos >= 65) return 'buena';
  if (puntos >= 40) return 'mejorable';
  return 'crítica';
}

function priorizarMejoras(checks, pesos) {
  if (!checks || typeof checks !== 'object') return [];
  const p = pesos || {};
  const fallos = [];
  for (const k of Object.keys(checks)) {
    const v = checks[k];
    const ok = v === true || (typeof v === 'number' && v >= 1);
    if (!ok) {
      const peso = typeof p[k] === 'number' ? p[k] : 1;
      fallos.push({ clave: k, peso: peso });
    }
  }
  fallos.sort(function (a, b) { return b.peso - a.peso; });
  return fallos.map(function (f) { return f.clave; });
}

function estimarImpacto(puntosActuales, puntosObjetivo) {
  if (typeof puntosActuales !== 'number' || typeof puntosObjetivo !== 'number') return 0;
  const a = Math.max(0, Math.min(100, puntosActuales));
  const b = Math.max(0, Math.min(100, puntosObjetivo));
  return Math.round(b - a);
}

function resumenAuditoria(checks, pesos) {
  const puntos = calcularPuntuacion(checks);
  const nivel = nivelSalud(puntos);
  const mejoras = priorizarMejoras(checks, pesos);
  return {
    puntos: puntos,
    nivel: nivel,
    total: checks && typeof checks === 'object' ? Object.keys(checks).length : 0,
    fallos: mejoras.length,
    primeraMejora: mejoras.length > 0 ? mejoras[0] : null
  };
}

if (typeof module !== 'undefined') module.exports = { calcularPuntuacion, nivelSalud, priorizarMejoras, estimarImpacto, resumenAuditoria };
