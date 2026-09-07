/* ============ spriteart_hd.js — hand-finished hero models ============
   Loaded after the generated art pack; entries here override it.
   Quality bar: soft airbrushed shading, real proportions, fine detail.  */

SPRITE_DRAW["fighter_n"] = {
  l: 40, w: 27,
  draw: function (ctx, C) {
    /* F-16C Fighting Falcon, plan view, nose +X. 2.66 px per metre.      */
    var TOP = "#7d838a", LIT = "#8f959c", SHD = "#686e75", DRK = "#585e65";
    var OUT = "rgba(22,26,30,0.55)";
    function o(w) { ctx.strokeStyle = OUT; ctx.lineWidth = w || 0.7; ctx.stroke(); }

    /* ---- horizontal stabilators ---- */
    function stab(sgn) {
      ctx.beginPath();
      ctx.moveTo(-12.6, sgn * 2.2);
      ctx.lineTo(-16.4, sgn * 8.0);
      ctx.lineTo(-18.6, sgn * 8.3);
      ctx.lineTo(-18.9, sgn * 2.5);
      ctx.closePath();
    }
    for (var s = -1; s <= 1; s += 2) {
      stab(s);
      var g0 = ctx.createLinearGradient(0, s * 2, 0, s * 8.5);
      g0.addColorStop(0, SHD); g0.addColorStop(1, DRK);
      ctx.fillStyle = g0; ctx.fill(); o();
    }

    /* ---- wings: cropped delta w/ LERX flowing from the fuselage ---- */
    function wing(sgn) {
      ctx.beginPath();
      ctx.moveTo(13.5, sgn * 1.6);                 // LERX start beside canopy
      ctx.quadraticCurveTo(7.5, sgn * 2.6, 2.2, sgn * 3.6);   // strake curve
      ctx.lineTo(-6.2, sgn * 12.6);                // leading edge, 40deg sweep
      ctx.lineTo(-9.3, sgn * 12.6);                // cropped tip chord
      ctx.lineTo(-10.6, sgn * 4.4);                // trailing edge
      ctx.lineTo(-11.3, sgn * 2.2);                // root TE fillet
      ctx.closePath();
    }
    for (s = -1; s <= 1; s += 2) {
      wing(s);
      var g1 = ctx.createLinearGradient(4, 0, -10, s * 13);
      g1.addColorStop(0, s < 0 ? LIT : TOP);
      g1.addColorStop(1, s < 0 ? TOP : SHD);
      ctx.fillStyle = g1; ctx.fill(); o();
      /* flaperon + LE flap panel lines */
      ctx.strokeStyle = "rgba(30,34,38,0.35)"; ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(-8.6, s * 4.6); ctx.lineTo(-7.9, s * 11.8); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-0.2, s * 4.6); ctx.lineTo(-5.6, s * 10.4); ctx.stroke();
      /* wingtip missile rail + AIM-120 */
      ctx.fillStyle = "#9aa0a6";
      ctx.fillRect(-9.8, s * 12.7 - 0.5, 4.6, 1.0);
      ctx.fillStyle = "#c5cad0";
      ctx.fillRect(-8.6, s * 13.4 - 0.55, 7.6, 1.1);
      ctx.beginPath(); ctx.moveTo(-1.0, s * 13.4 - 0.55);
      ctx.lineTo(0.8, s * 13.4); ctx.lineTo(-1.0, s * 13.4 + 0.55);
      ctx.closePath(); ctx.fillStyle = "#d4d9de"; ctx.fill();
      ctx.strokeStyle = "rgba(22,26,30,0.4)"; ctx.lineWidth = 0.4;
      ctx.strokeRect(-8.6, s * 13.4 - 0.55, 7.6, 1.1);
      /* fins on the missile tail */
      ctx.fillStyle = "#aeb4ba";
      ctx.fillRect(-8.4, s * 13.4 - 1.0, 1.1, 2.0);
    }

    /* ---- fuselage ---- */
    ctx.beginPath();
    ctx.moveTo(20.0, 0);                            // radome tip
    ctx.quadraticCurveTo(19.2, -1.5, 15.0, -2.1);
    ctx.quadraticCurveTo(6.0, -2.9, -2.0, -2.6);
    ctx.quadraticCurveTo(-12.0, -2.2, -18.6, -1.6); // aft taper
    ctx.lineTo(-19.6, -1.25);
    ctx.lineTo(-19.6, 1.25);
    ctx.lineTo(-18.6, 1.6);
    ctx.quadraticCurveTo(-12.0, 2.2, -2.0, 2.6);
    ctx.quadraticCurveTo(6.0, 2.9, 15.0, 2.1);
    ctx.quadraticCurveTo(19.2, 1.5, 20.0, 0);
    ctx.closePath();
    var g2 = ctx.createLinearGradient(0, -3, 0, 3);
    g2.addColorStop(0, LIT); g2.addColorStop(0.45, TOP); g2.addColorStop(1, SHD);
    ctx.fillStyle = g2; ctx.fill(); o(0.8);

    /* dorsal spine highlight */
    ctx.strokeStyle = "rgba(190,196,202,0.5)"; ctx.lineWidth = 0.8;
    ctx.beginPath(); ctx.moveTo(7.5, 0); ctx.lineTo(-17.5, 0); ctx.stroke();
    /* fuselage panel seams */
    ctx.strokeStyle = "rgba(30,34,38,0.30)"; ctx.lineWidth = 0.5;
    [12.5, 5.5, -3.5, -12.2].forEach(function (px) {
      ctx.beginPath(); ctx.moveTo(px, -2.35); ctx.lineTo(px, 2.35); ctx.stroke();
    });
    /* intake lip shadow under the LERX */
    ctx.strokeStyle = "rgba(20,24,28,0.45)"; ctx.lineWidth = 0.9;
    ctx.beginPath(); ctx.moveTo(11.0, 2.0); ctx.quadraticCurveTo(8.0, 2.75, 5.0, 2.8); ctx.stroke();

    /* ---- vertical tail seen from above: root fairing + tip line ---- */
    ctx.fillStyle = DRK;
    ctx.beginPath();
    ctx.moveTo(-11.5, -0.65); ctx.lineTo(-18.8, -0.5);
    ctx.lineTo(-18.8, 0.5); ctx.lineTo(-11.5, 0.65);
    ctx.closePath(); ctx.fill();
    ctx.strokeStyle = "rgba(200,206,212,0.6)"; ctx.lineWidth = 0.5;
    ctx.beginPath(); ctx.moveTo(-12.2, 0); ctx.lineTo(-18.4, 0); ctx.stroke();

    /* ---- canopy: smoked bubble w/ specular streak ---- */
    ctx.beginPath();
    ctx.moveTo(14.8, -0.2);
    ctx.quadraticCurveTo(14.2, -1.75, 11.0, -1.9);
    ctx.quadraticCurveTo(8.2, -1.9, 7.4, 0);
    ctx.quadraticCurveTo(8.2, 1.9, 11.0, 1.9);
    ctx.quadraticCurveTo(14.2, 1.75, 14.8, 0.2);
    ctx.closePath();
    var g3 = ctx.createLinearGradient(8, -2, 12, 2);
    g3.addColorStop(0, "#3a444e"); g3.addColorStop(0.5, "#1d242b"); g3.addColorStop(1, "#12171c");
    ctx.fillStyle = g3; ctx.fill();
    ctx.strokeStyle = "rgba(226,232,238,0.65)"; ctx.lineWidth = 0.5;
    ctx.beginPath(); ctx.moveTo(13.6, -0.9); ctx.quadraticCurveTo(11.0, -1.35, 8.9, -1.0); ctx.stroke();
    ctx.strokeStyle = OUT; ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(14.8, -0.2); ctx.quadraticCurveTo(14.2, -1.75, 11.0, -1.9);
    ctx.quadraticCurveTo(8.2, -1.9, 7.4, 0); ctx.quadraticCurveTo(8.2, 1.9, 11.0, 1.9);
    ctx.quadraticCurveTo(14.2, 1.75, 14.8, 0.2);
    ctx.stroke();

    /* ---- radome ---- */
    ctx.beginPath();
    ctx.moveTo(20.0, 0);
    ctx.quadraticCurveTo(19.3, -1.35, 16.2, -1.8);
    ctx.lineTo(16.2, 1.8);
    ctx.quadraticCurveTo(19.3, 1.35, 20.0, 0);
    ctx.closePath();
    ctx.fillStyle = "#63676c"; ctx.fill(); o(0.5);

    /* ---- nozzle ---- */
    ctx.fillStyle = "#3f4348";
    ctx.beginPath(); ctx.ellipse(-19.7, 0, 0.9, 1.25, 0, 0, 6.2832); ctx.fill();
    ctx.strokeStyle = "#20242a"; ctx.lineWidth = 0.5;
    ctx.beginPath(); ctx.ellipse(-19.7, 0, 0.9, 1.25, 0, 0, 6.2832); ctx.stroke();
    ctx.fillStyle = "#17191d";
    ctx.beginPath(); ctx.ellipse(-19.9, 0, 0.5, 0.8, 0, 0, 6.2832); ctx.fill();

    /* ---- faction identification: low-visibility roundel + fin flash ---- */
    ctx.save();
    ctx.globalAlpha = 0.85;
    ctx.strokeStyle = C.main; ctx.lineWidth = 0.9;
    ctx.beginPath(); ctx.arc(-4.2, 7.8, 1.7, 0, 6.2832); ctx.stroke();
    ctx.fillStyle = C.main;
    ctx.beginPath(); ctx.arc(-4.2, 7.8, 0.7, 0, 6.2832); ctx.fill();
    ctx.fillRect(-17.9, -0.5, 2.4, 1.0);
    ctx.restore();
    /* formation light strips */
    ctx.fillStyle = "rgba(210,220,190,0.5)";
    ctx.fillRect(3.0, -2.75, 3.2, 0.5);
    ctx.fillRect(3.0, 2.25, 3.2, 0.5);
  }
};
