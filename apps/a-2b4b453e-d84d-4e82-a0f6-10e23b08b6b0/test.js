// Pruebas automáticas generadas por la IA en MerkaLan. Las ejecuta GitHub Actions.
const assert = require('assert');
const pruebas = [
 {
  "nombre": "Puntuaci\u00f3n con todo correcto es 100",
  "codigo": "assert.strictEqual(L.calcularPuntuacion({a:true,b:true,c:true}), 100);"
 },
 {
  "nombre": "Puntuaci\u00f3n con todo vac\u00edo es 0",
  "codigo": "assert.strictEqual(L.calcularPuntuacion({}), 0);"
 },
 {
  "nombre": "Nivel excelente por encima de 85",
  "codigo": "assert.strictEqual(L.nivelSalud(90), 'excelente');"
 },
 {
  "nombre": "Nivel cr\u00edtico por debajo de 40",
  "codigo": "assert.strictEqual(L.nivelSalud(20), 'cr\u00edtica');"
 },
 {
  "nombre": "Prioriza fallos por peso mayor",
  "codigo": "assert.deepStrictEqual(L.priorizarMejoras({a:false,b:false,c:true},{a:1,b:3,c:2}), ['b','a']);"
 },
 {
  "nombre": "Impacto entre puntuaciones es correcto",
  "codigo": "assert.strictEqual(L.estimarImpacto(40, 75), 35);"
 },
 {
  "nombre": "Resumen devuelve primera mejora",
  "codigo": "const r = L.resumenAuditoria({a:false,b:true},{a:5,b:1}); assert.strictEqual(r.primeraMejora, 'a'); assert.strictEqual(r.fallos, 1);"
 }
];
let L = null, errorCarga = '';
try { L = require('./logica.js'); } catch (e) { errorCarga = String((e && e.message) || e); }
const res = pruebas.map(p => {
  if (!L) return { nombre: p.nombre, ok: false, error: 'La lógica no carga: ' + errorCarga };
  try { new Function('L', 'assert', p.codigo)(L, assert); return { nombre: p.nombre, ok: true }; }
  catch (e) { return { nombre: p.nombre, ok: false, error: String((e && e.message) || e).slice(0, 300) }; }
});
res.forEach(r => console.log((r.ok ? 'OK   ' : 'FALLA') + ' ' + r.nombre + (r.ok ? '' : ' -> ' + r.error)));
console.log('MERKALAN_RESULTADO ' + JSON.stringify(res));
process.exit(res.every(r => r.ok) ? 0 : 1);
