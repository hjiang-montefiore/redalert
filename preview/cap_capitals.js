UNIT_MODELS["destroyer_n"] = {
  len: 155,
  build: function (THREE, M, C) {
    var G=new THREE.Group(),PI=Math.PI,R=Math.random;
    function NI(g){g=g.toNonIndexed();g.computeVertexNormals();return g;}
    function tb(a,b,c,t){return NI(new THREE.CylinderGeometry(t,1,c,4,1).rotateX(PI/2).rotateZ(PI/4).scale(a*0.7071,b*0.7071,1));}
    function cv(w,h,f){var c=document.createElement("canvas");c.width=w;c.height=h;f(c.getContext("2d"),w,h);return new THREE.CanvasTexture(c);}
    function pT(w,h,bg,cx,cy,fn){return cv(w,h,function(x,W,H){var i;x.fillStyle=bg;x.fillRect(0,0,W,H);for(i=0;i<42;i++){x.globalAlpha=0.06;x.fillStyle=i%2?"#000":"#fff";x.fillRect(R()*W,R()*H,40+R()*150,18+R()*60);}x.globalAlpha=0.3;x.strokeStyle="#2e3236";x.lineWidth=1.6;for(i=1;i<cx;i++){x.beginPath();x.moveTo(i*W/cx,0);x.lineTo(i*W/cx,H);x.stroke();}for(i=1;i<cy;i++){x.beginPath();x.moveTo(0,i*H/cy);x.lineTo(W,i*H/cy);x.stroke();}x.globalAlpha=1;if(fn)fn(x,W,H);});}
    var hullT=pT(1024,256,"#6d7378",34,10,function(x,W,H){var i;x.fillStyle="#24282b";x.fillRect(0,0.17*H,W,0.15*H);x.globalAlpha=0.12;x.fillStyle="#3a2b20";for(i=0;i<40;i++)x.fillRect(R()*W,0.33*H+R()*0.26*H,2+R()*4,14+R()*64);x.globalAlpha=1;});
    var deckT=pT(512,512,"#4b5054",12,12,function(x,W,H){var i;x.globalAlpha=0.45;x.fillStyle="#2b2f32";for(i=0;i<300;i++)x.fillRect(R()*W,R()*H,3,3);x.globalAlpha=1;});
    deckT.wrapS=deckT.wrapT=THREE.RepeatWrapping;deckT.repeat.set(0.045,0.045);
    var panT=cv(128,128,function(x,w,h){var i,j;x.fillStyle="#8d8f88";x.fillRect(0,0,w,h);x.fillStyle="rgba(0,0,0,0.3)";for(i=0;i<15;i++)for(j=0;j<15;j++)x.fillRect(i*8+3,j*8+3,4,4);x.strokeStyle="rgba(255,255,255,0.16)";x.lineWidth=3;x.strokeRect(2,2,w-4,h-4);});
    var mH=new THREE.MeshStandardMaterial({map:hullT,metalness:0.3,roughness:0.6});
    var mD=new THREE.MeshStandardMaterial({map:deckT,metalness:0.25,roughness:0.72});
    var mK=new THREE.MeshStandardMaterial({color:0x23272b,metalness:0.35,roughness:0.55});
    var mW=new THREE.MeshStandardMaterial({color:0xc9ced2,metalness:0.2,roughness:0.6});
    var mS=new THREE.MeshStandardMaterial({color:0x8d9398,metalness:0.85,roughness:0.3});
    var mP=new THREE.MeshStandardMaterial({map:panT,metalness:0.3,roughness:0.6});
    var mT=new THREE.MeshStandardMaterial({color:C.team,metalness:0.3,roughness:0.55});
    function bx(a,b,c,m,x,y,z){var s=new THREE.Mesh(new THREE.BoxGeometry(a,b,c),m);s.position.set(x,y,z);G.add(s);return s;}
    function cl(rt,rb,l,sg,m,x,y,z,ax){var g=new THREE.CylinderGeometry(rt,rb,l,sg);if(ax=="z")g.rotateX(PI/2);if(ax=="x")g.rotateZ(PI/2);var s=new THREE.Mesh(g,m);s.position.set(x,y,z);G.add(s);return s;}
    function tbm(a,b,c,t,m,x,y,z){var s=new THREE.Mesh(tb(a,b,c,t),m);s.position.set(x,y,z);G.add(s);return s;}
    var stG=new THREE.CylinderGeometry(0.045,0.045,1.15,4,1,true).rotateX(PI/2);
    function rl(x0,y0,x1,y1,z){var dx=x1-x0,dy=y1-y0,L=Math.sqrt(dx*dx+dy*dy),n=Math.max(2,Math.round(L/2.6)),i,g0=new THREE.Group();g0.position.set((x0+x1)/2,(y0+y1)/2,z);g0.rotation.z=Math.atan2(dy,dx);G.add(g0);for(i=0;i<=n;i++){var s=new THREE.Mesh(stG,mW);s.position.set(-L/2+L*i/n,0,0.57);g0.add(s);}var rg=new THREE.CylinderGeometry(0.05,0.05,L,4,1,true).rotateZ(PI/2);for(i=0;i<2;i++){var b=new THREE.Mesh(rg,mW);b.position.set(0,0,0.62+i*0.5);g0.add(b);}return g0;}
    function rl2(x0,y0,x1,y1,z){rl(x0,y0,x1,y1,z);rl(x0,-y0,x1,-y1,z);}
    function bnum(s,wd,x,y,z,tl){var t=cv(256,128,function(c,w,h){c.font="bold 92px Arial";c.fillStyle="#dfe3e6";c.textAlign="center";c.fillText(s,w/2,100);});var mm=new THREE.MeshStandardMaterial({map:t,transparent:true,metalness:0.2,roughness:0.6});var g=new THREE.PlaneGeometry(wd,wd/2).rotateX(PI/2);var a=new THREE.Mesh(g,mm);a.position.set(x,-y,z);a.rotation.x=-tl;G.add(a);var b=new THREE.Mesh(new THREE.PlaneGeometry(wd,wd/2).rotateY(PI).rotateX(PI/2),mm);b.position.set(x,y,z);b.rotation.x=tl;G.add(b);}
    function wAt(s,z){var e=s.sq||1,d=(z-(s.zc||0))/s.h;if(d>=1||d<=-1)return 0.06;return Math.max(s.w*Math.pow(Math.max(1-Math.pow(Math.abs(d),2/e),0),e/2),0.06);}
    function plz(S,z,n0,n1,ins){var p=[],i,y;for(i=n0;i<=n1;i++){y=Math.max(wAt(S[i],z)-(ins||0),0.06);p.push([S[i].x,y]);}for(i=n1;i>=n0;i--){y=Math.max(wAt(S[i],z)-(ins||0),0.06);p.push([S[i].x,-y]);}return p;}
    function deck(S,z,n0,n1,ins,th){th=th||0.3;var d=new THREE.Mesh(M.slab(THREE,plz(S,z,n0,n1,ins),th),mD);d.position.z=z-th;G.add(d);return d;}
    function vls(x,y,z,nx,ny,c){var lx=nx*c,ly=ny*c;bx(lx+0.9,ly+0.9,0.5,mK,x,y,z+0.18);var t=cv(256,256,function(g,w,h){var i,j,cw=w/nx,ch=h/ny;g.fillStyle="#3e4347";g.fillRect(0,0,w,h);for(i=0;i<nx;i++)for(j=0;j<ny;j++){var px=i*cw,py=j*ch;g.fillStyle="#15181a";g.fillRect(px+cw*0.09,py+ch*0.09,cw*0.82,ch*0.82);g.fillStyle="#6c7378";g.fillRect(px+cw*0.09,py+ch*0.09,cw*0.82,ch*0.1);g.fillStyle="rgba(255,255,255,0.12)";g.fillRect(px+cw*0.4,py+ch*0.14,cw*0.2,ch*0.7);}});var p=new THREE.Mesh(new THREE.PlaneGeometry(lx,ly),new THREE.MeshStandardMaterial({map:t,metalness:0.4,roughness:0.5}));p.position.set(x,y,z+0.44);G.add(p);}
    function oct(r,m,x,y,z,yaw,pit){var s=new THREE.Mesh(new THREE.CylinderGeometry(r,r,0.34,8).rotateY(PI/8).rotateZ(PI/2),m);s.position.set(x,y,z);s.rotation.z=yaw;s.rotation.y=pit||0;G.add(s);return s;}
    function spy(r,x,y,z,yaw,pit){oct(r+0.42,mK,x,y,z,yaw,pit);oct(r,mP,x+Math.cos(yaw)*0.2,y+Math.sin(yaw)*0.2,z,yaw,pit);}
    function pad(x,y,z,lx,ly){var t=cv(256,256,function(g,w,h){var i;g.fillStyle="#41464a";g.fillRect(0,0,w,h);for(i=0;i<26;i++){g.globalAlpha=0.07;g.fillStyle=i%2?"#34383c":"#4d5257";g.fillRect(R()*w,R()*h,40+R()*90,30+R()*70);}g.globalAlpha=1;g.strokeStyle="#d5d9dd";g.lineWidth=8;g.beginPath();g.arc(w/2,h/2,w*0.29,0,7);g.stroke();g.save();g.translate(w/2,h/2);g.rotate(PI/2);g.fillStyle="#d5d9dd";g.font="bold 118px Arial";g.textAlign="center";g.fillText("H",0,42);g.restore();});var p=new THREE.Mesh(new THREE.PlaneGeometry(lx,ly),new THREE.MeshStandardMaterial({map:t,metalness:0.2,roughness:0.8}));p.position.set(x,y,z);G.add(p);return p;}
    function boat(x,y,z,L){var s=y>0?1:-1;var b=new THREE.Mesh(tb(L,L*0.33,L*0.2,0.62),mK);b.position.set(x,y,z);G.add(b);bx(L*0.2,L*0.2,L*0.11,mW,x-L*0.13,y,z+L*0.15);cl(0.09,0.09,2.9,5,mS,x+L*0.34,y-s*0.5,z+1.5,"z");cl(0.09,0.09,2.9,5,mS,x-L*0.34,y-s*0.5,z+1.5,"z");cl(0.08,0.08,1.7,5,mS,x+L*0.34,y-s*0.05,z+2.85);cl(0.08,0.08,1.7,5,mS,x-L*0.34,y-s*0.05,z+2.85);}
    function dish(r,x,y,z,yaw){var d=new THREE.Mesh(new THREE.SphereGeometry(r,12,6,0,PI*2,0,PI*0.44).rotateZ(PI/2),mW);d.position.set(x,y,z);d.rotation.z=yaw||0;G.add(d);return d;}
    var DK=7.6;
    function ciws(x,y,z,ry){cl(1.0,1.15,1.6,10,mW,x,y,z+0.8,"z");var d=new THREE.Mesh(new THREE.SphereGeometry(1.05,10,7),mW);d.position.set(x,y,z+2.15);G.add(d);var b=cl(0.3,0.34,2.4,8,mK,x+1.5,y,z+1.7,"x");b.rotation.y=-0.25;if(ry)b.rotation.z=ry;}
    // flared-bow hull, keel -1.0, sheer rising from 7.6 to 11.6 at the stem
    var S=[{x:-77.5,w:8.5,h:4.65,zc:3.65,sq:0.55},{x:-68,w:10.2,h:4.65,zc:3.65,sq:0.5},{x:-50,w:11,h:4.65,zc:3.65,sq:0.45},{x:-20,w:11.2,h:4.65,zc:3.65,sq:0.45},{x:10,w:11.1,h:4.65,zc:3.65,sq:0.45},{x:35,w:10.4,h:4.76,zc:3.76,sq:0.5},{x:52,w:9,h:5.19,zc:4.19,sq:0.58},{x:64,w:6.9,h:5.89,zc:4.89,sq:0.66},{x:72,w:3.8,h:6.49,zc:5.49,sq:0.74},{x:77.5,w:0.5,h:6.76,zc:5.76,sq:0.82}];
    G.add(new THREE.Mesh(M.loft(THREE,S,18),mH));
    bx(0.6,13.6,9.3,mH,-77.7,0,3.65);
    deck(S,DK,0,9,0.15);
    bx(1.6,17,0.7,mK,49,0,DK+0.35).rotation.y=-0.28;
    // Mk45 5in mount on a raised barbette, forward of the VLS
    cl(2.7,2.9,1.7,12,mH,58,0,DK+0.55,"z");
    var T=new THREE.Group();T.name="turret";T.position.set(58,0,DK+1.4);G.add(T);
    var tg=new THREE.Mesh(tb(7.4,4.5,2.9,0.5),mH);tg.position.set(-0.3,0,1.45);T.add(tg);
    var tsl=new THREE.Mesh(new THREE.BoxGeometry(2.6,3.9,0.25),mH);tsl.position.set(2.9,0,2.05);tsl.rotation.y=0.5;T.add(tsl);
    var bar=new THREE.Mesh(new THREE.CylinderGeometry(0.17,0.21,7.4,8).rotateZ(PI/2),mS);bar.position.set(5.4,0,1.5);T.add(bar);
    var slv=new THREE.Mesh(new THREE.CylinderGeometry(0.42,0.46,2,8).rotateZ(PI/2),mK);slv.position.set(2.7,0,1.5);T.add(slv);
    // 32-cell forward VLS and 64-cell aft VLS
    vls(44,0,DK,8,4,1.55);
    vls(-40,0,DK,8,8,1.5);
    // angular deckhouse: 01 deck, 02 deck, pilot house
    tbm(64,15.4,5.6,0.93,mH,2,0,DK+2.8);
    tbm(38,13.4,3.4,0.93,mH,8,0,DK+7.3);
    tbm(14,11.4,3.3,0.88,mH,25,0,DK+10.6);
    bx(0.35,9.8,1.5,mK,32.2,0,DK+11.4).rotation.y=-0.42;
    bx(6,0.35,1.4,mK,29,5.5,DK+11.3).rotation.x=0.3;
    bx(6,0.35,1.4,mK,29,-5.5,DK+11.3).rotation.x=-0.3;
    bx(3.2,17.6,0.4,mH,25,0,DK+12.5);
    bx(5,1.2,0.5,mT,-30,7.5,DK+5.4);bx(5,1.2,0.5,mT,-30,-7.5,DK+5.4);
    // four SPY-1D phased-array octagons
    spy(1.95,30.4,5.4,DK+8.6,0.62,-0.13);spy(1.95,30.4,-5.4,DK+8.6,-0.62,-0.13);
    spy(1.95,-8.2,6.6,DK+8.5,2.3,-0.13);spy(1.95,-8.2,-6.6,DK+8.5,-2.3,-0.13);
    // twin funnels with capped uptakes
    function fun(x){tbm(10.6,8.6,7.4,0.78,mH,x,0,DK+8.9).rotation.y=0.05;bx(9.6,7.6,0.6,mK,x,0,DK+12.9);cl(0.85,0.9,1.9,8,mK,x+1.7,2.2,DK+13.6,"z");cl(0.85,0.9,1.9,8,mK,x-1.7,-2.2,DK+13.6,"z");bx(7,0.4,1.4,mK,x,4.3,DK+9.6);bx(7,0.4,1.4,mK,x,-4.3,DK+9.6);}
    fun(-6);fun(-27);
    // mast: tripod legs, yards, SPS-67 bar, illuminators
    cl(0.34,0.44,10,6,mS,10,0,DK+13.6,"z");
    cl(0.24,0.3,7.4,6,mS,6,2.6,DK+11.5,"z").rotation.y=-0.14;
    cl(0.24,0.3,7.4,6,mS,6,-2.6,DK+11.5,"z").rotation.y=-0.14;
    bx(3.4,7,0.3,mH,9,0,DK+15.4);
    cl(0.1,0.1,9.4,4,mS,10,0,DK+16.6,"x");
    cl(0.1,0.1,6,4,mS,10,0,DK+20.2,"x");
    cl(0.16,0.2,4.6,6,mS,10,0,DK+20.6,"z");
    bx(0.5,4.4,0.9,mW,10,0,DK+23.2);
    cl(0.05,0.05,4,4,mS,7,3.4,DK+17.6,"z");cl(0.05,0.05,4,4,mS,7,-3.4,DK+17.6,"z");
    dish(1.5,25,0,DK+14.6,0);dish(1.5,-33,3.6,DK+12.8,PI);dish(1.5,-33,-3.6,DK+12.8,PI);
    cl(1.5,1.6,0.8,10,mH,25,0,DK+13.7,"z");cl(1.5,1.6,0.8,10,mH,-33,3.6,DK+11.9,"z");cl(1.5,1.6,0.8,10,mH,-33,-3.6,DK+11.9,"z");
    // twin hangar, flight deck, CIWS, Mk32 torpedo tubes
    tbm(17,14,5.4,0.95,mH,-55,0,DK+2.7);
    bx(0.5,4.6,4.4,mK,-46.4,3.6,DK+2.2);bx(0.5,4.6,4.4,mK,-46.4,-3.6,DK+2.2);
    bx(6,13.4,0.4,mH,-49,0,DK+5.6);
    ciws(-50,0,DK+5.8,0);ciws(35,0,DK+12.7,0);
    pad(-68,0,DK+0.12,15,13.6);
    bx(1,8,0.35,mW,-61.6,0,DK+0.16);
    function tt(y){var s=y>0?1:-1,i;for(i=0;i<3;i++)cl(0.32,0.32,6.4,8,mK,-30,y+s*i*0.72,DK+1.1+i*0.62,"x");}
    tt(7.6);tt(-7.6);
    boat(-17,8.6,DK+1.4,7.8);boat(-17,-8.6,DK+1.4,7.8);
    // railings, staffs, hull number
    rl2(53,7.5,70,3.4,DK);rl2(-77,7.4,-63,8.9,DK);rl2(-62,8.8,-46,9.5,DK);
    rl(-24,6.6,26,6.6,DK+5.7);rl(-24,-6.6,26,-6.6,DK+5.7);
    rl(29,5.6,29,-5.6,DK+12.7);
    cl(0.07,0.07,4,5,mS,-77,0,DK+2,"z");cl(0.07,0.07,3.4,5,mS,76,0,DK+4,"z");
    bx(0.9,0.5,1,mK,71.5,2.9,DK-0.9);bx(0.9,0.5,1,mK,71.5,-2.9,DK-0.9);
    bnum("62",6,67.5,4.3,5.4,0.16);
    return G;
  }
};
UNIT_MODELS["destroyer_p"] = {
  len: 156,
  build: function (THREE, M, C) {
    var G=new THREE.Group(),PI=Math.PI,R=Math.random;
    function NI(g){g=g.toNonIndexed();g.computeVertexNormals();return g;}
    function tb(a,b,c,t){return NI(new THREE.CylinderGeometry(t,1,c,4,1).rotateX(PI/2).rotateZ(PI/4).scale(a*0.7071,b*0.7071,1));}
    function cv(w,h,f){var c=document.createElement("canvas");c.width=w;c.height=h;f(c.getContext("2d"),w,h);return new THREE.CanvasTexture(c);}
    function pT(w,h,bg,cx,cy,fn){return cv(w,h,function(x,W,H){var i;x.fillStyle=bg;x.fillRect(0,0,W,H);for(i=0;i<42;i++){x.globalAlpha=0.06;x.fillStyle=i%2?"#000":"#fff";x.fillRect(R()*W,R()*H,40+R()*150,18+R()*60);}x.globalAlpha=0.3;x.strokeStyle="#2e3236";x.lineWidth=1.6;for(i=1;i<cx;i++){x.beginPath();x.moveTo(i*W/cx,0);x.lineTo(i*W/cx,H);x.stroke();}for(i=1;i<cy;i++){x.beginPath();x.moveTo(0,i*H/cy);x.lineTo(W,i*H/cy);x.stroke();}x.globalAlpha=1;if(fn)fn(x,W,H);});}
    var hullT=pT(1024,256,"#6d7378",34,10,function(x,W,H){var i;x.fillStyle="#24282b";x.fillRect(0,0.17*H,W,0.15*H);x.globalAlpha=0.12;x.fillStyle="#3a2b20";for(i=0;i<40;i++)x.fillRect(R()*W,0.33*H+R()*0.26*H,2+R()*4,14+R()*64);x.globalAlpha=1;});
    var deckT=pT(512,512,"#4b5054",12,12,function(x,W,H){var i;x.globalAlpha=0.45;x.fillStyle="#2b2f32";for(i=0;i<300;i++)x.fillRect(R()*W,R()*H,3,3);x.globalAlpha=1;});
    deckT.wrapS=deckT.wrapT=THREE.RepeatWrapping;deckT.repeat.set(0.045,0.045);
    var panT=cv(128,128,function(x,w,h){var i,j;x.fillStyle="#8d8f88";x.fillRect(0,0,w,h);x.fillStyle="rgba(0,0,0,0.3)";for(i=0;i<15;i++)for(j=0;j<15;j++)x.fillRect(i*8+3,j*8+3,4,4);x.strokeStyle="rgba(255,255,255,0.16)";x.lineWidth=3;x.strokeRect(2,2,w-4,h-4);});
    var mH=new THREE.MeshStandardMaterial({map:hullT,metalness:0.3,roughness:0.6});
    var mD=new THREE.MeshStandardMaterial({map:deckT,metalness:0.25,roughness:0.72});
    var mK=new THREE.MeshStandardMaterial({color:0x23272b,metalness:0.35,roughness:0.55});
    var mW=new THREE.MeshStandardMaterial({color:0xc9ced2,metalness:0.2,roughness:0.6});
    var mS=new THREE.MeshStandardMaterial({color:0x8d9398,metalness:0.85,roughness:0.3});
    var mP=new THREE.MeshStandardMaterial({map:panT,metalness:0.3,roughness:0.6});
    var mT=new THREE.MeshStandardMaterial({color:C.team,metalness:0.3,roughness:0.55});
    function bx(a,b,c,m,x,y,z){var s=new THREE.Mesh(new THREE.BoxGeometry(a,b,c),m);s.position.set(x,y,z);G.add(s);return s;}
    function cl(rt,rb,l,sg,m,x,y,z,ax){var g=new THREE.CylinderGeometry(rt,rb,l,sg);if(ax=="z")g.rotateX(PI/2);if(ax=="x")g.rotateZ(PI/2);var s=new THREE.Mesh(g,m);s.position.set(x,y,z);G.add(s);return s;}
    function tbm(a,b,c,t,m,x,y,z){var s=new THREE.Mesh(tb(a,b,c,t),m);s.position.set(x,y,z);G.add(s);return s;}
    var stG=new THREE.CylinderGeometry(0.045,0.045,1.15,4,1,true).rotateX(PI/2);
    function rl(x0,y0,x1,y1,z){var dx=x1-x0,dy=y1-y0,L=Math.sqrt(dx*dx+dy*dy),n=Math.max(2,Math.round(L/2.6)),i,g0=new THREE.Group();g0.position.set((x0+x1)/2,(y0+y1)/2,z);g0.rotation.z=Math.atan2(dy,dx);G.add(g0);for(i=0;i<=n;i++){var s=new THREE.Mesh(stG,mW);s.position.set(-L/2+L*i/n,0,0.57);g0.add(s);}var rg=new THREE.CylinderGeometry(0.05,0.05,L,4,1,true).rotateZ(PI/2);for(i=0;i<2;i++){var b=new THREE.Mesh(rg,mW);b.position.set(0,0,0.62+i*0.5);g0.add(b);}return g0;}
    function rl2(x0,y0,x1,y1,z){rl(x0,y0,x1,y1,z);rl(x0,-y0,x1,-y1,z);}
    function bnum(s,wd,x,y,z,tl){var t=cv(256,128,function(c,w,h){c.font="bold 92px Arial";c.fillStyle="#dfe3e6";c.textAlign="center";c.fillText(s,w/2,100);});var mm=new THREE.MeshStandardMaterial({map:t,transparent:true,metalness:0.2,roughness:0.6});var g=new THREE.PlaneGeometry(wd,wd/2).rotateX(PI/2);var a=new THREE.Mesh(g,mm);a.position.set(x,-y,z);a.rotation.x=-tl;G.add(a);var b=new THREE.Mesh(new THREE.PlaneGeometry(wd,wd/2).rotateY(PI).rotateX(PI/2),mm);b.position.set(x,y,z);b.rotation.x=tl;G.add(b);}
    function wAt(s,z){var e=s.sq||1,d=(z-(s.zc||0))/s.h;if(d>=1||d<=-1)return 0.06;return Math.max(s.w*Math.pow(Math.max(1-Math.pow(Math.abs(d),2/e),0),e/2),0.06);}
    function plz(S,z,n0,n1,ins){var p=[],i,y;for(i=n0;i<=n1;i++){y=Math.max(wAt(S[i],z)-(ins||0),0.06);p.push([S[i].x,y]);}for(i=n1;i>=n0;i--){y=Math.max(wAt(S[i],z)-(ins||0),0.06);p.push([S[i].x,-y]);}return p;}
    function deck(S,z,n0,n1,ins,th){th=th||0.3;var d=new THREE.Mesh(M.slab(THREE,plz(S,z,n0,n1,ins),th),mD);d.position.z=z-th;G.add(d);return d;}
    function vls(x,y,z,nx,ny,c){var lx=nx*c,ly=ny*c;bx(lx+0.9,ly+0.9,0.5,mK,x,y,z+0.18);var t=cv(256,256,function(g,w,h){var i,j,cw=w/nx,ch=h/ny;g.fillStyle="#3e4347";g.fillRect(0,0,w,h);for(i=0;i<nx;i++)for(j=0;j<ny;j++){var px=i*cw,py=j*ch;g.fillStyle="#15181a";g.fillRect(px+cw*0.09,py+ch*0.09,cw*0.82,ch*0.82);g.fillStyle="#6c7378";g.fillRect(px+cw*0.09,py+ch*0.09,cw*0.82,ch*0.1);g.fillStyle="rgba(255,255,255,0.12)";g.fillRect(px+cw*0.4,py+ch*0.14,cw*0.2,ch*0.7);}});var p=new THREE.Mesh(new THREE.PlaneGeometry(lx,ly),new THREE.MeshStandardMaterial({map:t,metalness:0.4,roughness:0.5}));p.position.set(x,y,z+0.44);G.add(p);}
    function oct(r,m,x,y,z,yaw,pit){var s=new THREE.Mesh(new THREE.CylinderGeometry(r,r,0.34,8).rotateY(PI/8).rotateZ(PI/2),m);s.position.set(x,y,z);s.rotation.z=yaw;s.rotation.y=pit||0;G.add(s);return s;}
    function spy(r,x,y,z,yaw,pit){oct(r+0.42,mK,x,y,z,yaw,pit);oct(r,mP,x+Math.cos(yaw)*0.2,y+Math.sin(yaw)*0.2,z,yaw,pit);}
    function pad(x,y,z,lx,ly){var t=cv(256,256,function(g,w,h){var i;g.fillStyle="#41464a";g.fillRect(0,0,w,h);for(i=0;i<26;i++){g.globalAlpha=0.07;g.fillStyle=i%2?"#34383c":"#4d5257";g.fillRect(R()*w,R()*h,40+R()*90,30+R()*70);}g.globalAlpha=1;g.strokeStyle="#d5d9dd";g.lineWidth=8;g.beginPath();g.arc(w/2,h/2,w*0.29,0,7);g.stroke();g.save();g.translate(w/2,h/2);g.rotate(PI/2);g.fillStyle="#d5d9dd";g.font="bold 118px Arial";g.textAlign="center";g.fillText("H",0,42);g.restore();});var p=new THREE.Mesh(new THREE.PlaneGeometry(lx,ly),new THREE.MeshStandardMaterial({map:t,metalness:0.2,roughness:0.8}));p.position.set(x,y,z);G.add(p);return p;}
    function boat(x,y,z,L){var s=y>0?1:-1;var b=new THREE.Mesh(tb(L,L*0.33,L*0.2,0.62),mK);b.position.set(x,y,z);G.add(b);bx(L*0.2,L*0.2,L*0.11,mW,x-L*0.13,y,z+L*0.15);cl(0.09,0.09,2.9,5,mS,x+L*0.34,y-s*0.5,z+1.5,"z");cl(0.09,0.09,2.9,5,mS,x-L*0.34,y-s*0.5,z+1.5,"z");cl(0.08,0.08,1.7,5,mS,x+L*0.34,y-s*0.05,z+2.85);cl(0.08,0.08,1.7,5,mS,x-L*0.34,y-s*0.05,z+2.85);}
    function dish(r,x,y,z,yaw){var d=new THREE.Mesh(new THREE.SphereGeometry(r,12,6,0,PI*2,0,PI*0.44).rotateZ(PI/2),mW);d.position.set(x,y,z);d.rotation.z=yaw||0;G.add(d);return d;}
    var DK=8;
    function seg(a,b,c,d,e,f,r,m){var dx=d-a,dy=e-b,dz=f-c,L=Math.sqrt(dx*dx+dy*dy+dz*dz);var s=new THREE.Mesh(new THREE.CylinderGeometry(r,r,L,4,1,true),m||mS);s.position.set((a+d)/2,(b+e)/2,(c+f)/2);s.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),new THREE.Vector3(dx/L,dy/L,dz/L));G.add(s);return s;}
    function tower(x,z0,z1,w0,w1,n){var i,j,cs=[[1,1],[1,-1],[-1,-1],[-1,1]];for(i=0;i<4;i++)seg(x+cs[i][0]*w0,cs[i][1]*w0,z0,x+cs[i][0]*w1,cs[i][1]*w1,z1,0.15);for(j=0;j<=n;j++){var t=j/n,w=w0+(w1-w0)*t,z=z0+(z1-z0)*t,w2=w0+(w1-w0)*(t+1/n),z2=z0+(z1-z0)*(t+1/n);for(i=0;i<4;i++){var a=cs[i],b=cs[(i+1)%4];seg(x+a[0]*w,a[1]*w,z,x+b[0]*w,b[1]*w,z,0.09);if(j<n)seg(x+a[0]*w,a[1]*w,z,x+b[0]*w2,b[1]*w2,z2,0.075);}}}
    function ak130(px,pz,nm){var T=new THREE.Group();T.position.set(px,0,pz);G.add(T);if(nm)T.name="turret";var b=new THREE.Mesh(tb(8.4,5.4,3.1,0.62),mH);b.position.set(-0.6,0,1.55);T.add(b);var f=new THREE.Mesh(new THREE.CylinderGeometry(2.7,2.7,5.2,10,1,true).scale(1,1,0.6),mH);f.position.set(2.4,0,1.7);T.add(f);var i;for(i=0;i<2;i++){var g=new THREE.Mesh(new THREE.CylinderGeometry(0.15,0.19,8.2,8).rotateZ(PI/2),mS);g.position.set(6.6,i?0.7:-0.7,1.55);T.add(g);var sl=new THREE.Mesh(new THREE.CylinderGeometry(0.42,0.45,2.2,8).rotateZ(PI/2),mK);sl.position.set(3.4,i?0.7:-0.7,1.55);T.add(sl);}return T;}
    function sanz(x,z,ry){cl(1.9,2.1,1.4,12,mH,x,0,z+0.7,"z");var a=new THREE.Group();a.position.set(x,0,z+1.6);a.rotation.z=ry||0;a.rotation.y=ry?0.5:-0.5;G.add(a);var r=new THREE.Mesh(new THREE.BoxGeometry(4.2,1.4,0.5),mK);r.position.set(1.4,0,0);a.add(r);var ms=new THREE.Mesh(new THREE.CylinderGeometry(0.26,0.26,5,8).rotateZ(PI/2),mW);ms.position.set(1.8,0,0.5);a.add(ms);var nc=new THREE.Mesh(new THREE.ConeGeometry(0.26,0.9,8).rotateZ(-PI/2),mW);nc.position.set(4.7,0,0.5);a.add(nc);var fn=new THREE.Mesh(new THREE.BoxGeometry(1.1,1.6,0.1),mW);fn.position.set(-0.2,0,0.5);a.add(fn);}
    function ak630(x,y,z){cl(0.85,0.95,1.2,10,mW,x,y,z+0.6,"z");var d=new THREE.Mesh(new THREE.SphereGeometry(0.95,10,7),mW);d.position.set(x,y,z+1.6);G.add(d);cl(0.26,0.28,1.9,8,mK,x+1.2,y,z+1.4,"x");}
    // flush-deck hull with strong sheer forward, keel -1.0
    var S=[{x:-78,w:7.6,h:4.86,zc:3.86,sq:0.55},{x:-70,w:9.1,h:4.86,zc:3.86,sq:0.5},{x:-52,w:9.6,h:4.86,zc:3.86,sq:0.45},{x:-20,w:9.7,h:4.86,zc:3.86,sq:0.45},{x:8,w:9.6,h:4.86,zc:3.86,sq:0.45},{x:34,w:9,h:4.97,zc:3.97,sq:0.5},{x:52,w:8,h:5.41,zc:4.41,sq:0.58},{x:66,w:6,h:6.22,zc:5.22,sq:0.66},{x:74,w:3.1,h:6.81,zc:5.81,sq:0.74},{x:78,w:0.45,h:7.03,zc:6.03,sq:0.82}];
    G.add(new THREE.Mesh(M.loft(THREE,S,18),mH));
    bx(0.6,12.2,9.7,mH,-78.2,0,3.85);
    deck(S,DK,0,9,0.15);
    bx(1.4,15,0.8,mK,54,0,DK+0.4).rotation.y=-0.3;
    // AK-130 twin 130mm fore (trainable) and aft (baked)
    cl(2.9,3.1,1.6,12,mH,62,0,DK+0.5,"z");
    ak130(62,DK+1.3,1);
    cl(2.9,3.1,1.6,12,mH,-62,0,DK+0.5,"z");
    ak130(-62,DK+1.3,0).rotation.z=PI;
    // SA-N-7 single-arm SAM launchers fore and aft
    tbm(11,11,2.6,0.9,mH,46,0,DK+1.3);
    sanz(46,DK+2.6,0);
    tbm(10,10,2.4,0.9,mH,-48,0,DK+1.2);
    sanz(-48,DK+2.4,PI);
    // superstructure and bridge
    tbm(46,14,5.4,0.93,mH,10,0,DK+2.7);
    tbm(22,12.2,3.6,0.92,mH,26,0,DK+7.2);
    tbm(12,10.4,3.4,0.9,mH,30,0,DK+10.7);
    bx(0.35,9,1.5,mK,35.6,0,DK+11.5).rotation.y=-0.4;
    bx(5,0.35,1.3,mK,32,5,DK+11.4).rotation.x=0.28;
    bx(5,0.35,1.3,mK,32,-5,DK+11.4).rotation.x=-0.28;
    bx(3,15.4,0.4,mH,30,0,DK+12.6);
    bx(4.4,1.1,0.5,mT,-8,7,DK+5.3);bx(4.4,1.1,0.5,mT,-8,-7,DK+5.3);
    // four KT-190 SSM tubes flanking the bridge, trained 15 deg up and outboard
    function kt(y,x){var s=y>0?1:-1,tu=new THREE.Group();tu.position.set(x,y,DK+6.6);tu.rotation.z=s*0.14;tu.rotation.y=-0.26;G.add(tu);var c1=new THREE.Mesh(new THREE.CylinderGeometry(0.92,0.92,11.5,12).rotateZ(PI/2),mH);tu.add(c1);var cp=new THREE.Mesh(new THREE.CylinderGeometry(0.98,0.98,0.5,12).rotateZ(PI/2),mK);cp.position.set(5.9,0,0);tu.add(cp);var bd=new THREE.Mesh(new THREE.BoxGeometry(1.4,2.1,2.1),mK);bd.position.set(-4.6,0,0);tu.add(bd);var i;for(i=0;i<2;i++)cl(0.13,0.13,2.1,5,mS,x-2+i*4,y+s*0.1,DK+5.6,"z");}
    kt(7.2,20);kt(7.2,10.6);kt(-7.2,20);kt(-7.2,10.6);
    // huge lattice mainmast with yards, Top Plate and Top Steer arrays
    tower(6,DK+5.4,DK+18,2.6,1.3,4);
    bx(4.6,5,0.4,mH,6,0,DK+18.2);
    cl(0.2,0.26,7,6,mS,6,0,DK+21.8,"z");
    cl(0.1,0.1,11,4,mS,6,0,DK+12.6,"x");
    cl(0.1,0.1,7.6,4,mS,6,0,DK+16.4,"x");
    seg(6,5.5,DK+12.6,6,2,DK+16.4,0.06);seg(6,-5.5,DK+12.6,6,-2,DK+16.4,0.06);
    var tp=new THREE.Mesh(new THREE.BoxGeometry(0.55,7.4,2.5),mS);tp.position.set(6,0,DK+19.8);tp.rotation.y=-0.32;G.add(tp);
    var ts=new THREE.Mesh(new THREE.BoxGeometry(0.5,5.4,2.1),mS);ts.position.set(24,0,DK+15.4);ts.rotation.y=-0.3;G.add(ts);
    tower(24,DK+10.8,DK+14.4,1.7,1.1,2);
    cl(0.05,0.05,5,4,mS,2,4.4,DK+9.4,"z");cl(0.05,0.05,5,4,mS,2,-4.4,DK+9.4,"z");
    // Front Dome / Kite Screech fire-control radomes
    function dome(x,y,z,r){cl(r*0.8,r*0.9,1,10,mH,x,y,z+0.5,"z");var d=new THREE.Mesh(new THREE.SphereGeometry(r,12,8),mW);d.position.set(x,y,z+1.5);d.scale.set(1,1,0.85);G.add(d);}
    dome(37,0,DK+14.1,2.2);dome(14,6.2,DK+5.6,1.5);dome(14,-6.2,DK+5.6,1.5);dome(-26,0,DK+7.4,1.7);dome(-58,0,DK+3.4,2);
    // single broad raked funnel
    var fu=new THREE.Mesh(tb(12,10.6,7.4,0.72),mH);fu.position.set(-11,0,DK+6.6);fu.rotation.y=0.08;G.add(fu);
    bx(9.4,8,0.6,mK,-11.6,0,DK+10.5);
    cl(1,1.1,1.8,10,mK,-10.6,2.4,DK+11.2,"z");cl(1,1.1,1.8,10,mK,-12.6,-2.4,DK+11.2,"z");
    bx(6,9.6,0.5,mT,-11.4,0,DK+8.6);
    // aft deckhouse, telescopic hangar and helipad
    tbm(16,12.6,4.4,0.94,mH,-30,0,DK+2.2);
    bx(9,10.6,3.6,mK,-33,0,DK+2.2);
    pad(-44,0,DK+0.12,13,12.4);
    ak630(20,7.9,DK+5.6);ak630(20,-7.9,DK+5.6);ak630(-24,6.6,DK+4.5);ak630(-24,-6.6,DK+4.5);
    boat(-2,8.1,DK+1.4,7.4);boat(-2,-8.1,DK+1.4,7.4);
    function tt(y){var s=y>0?1:-1,i;for(i=0;i<2;i++)cl(0.36,0.36,7.4,8,mK,2,y+s*i*0.8,DK+1.2+i*0.7,"x");}
    tt(7.8);tt(-7.8);
    // railings, staffs, hull number
    rl2(56,6.6,72,2.9,DK);rl2(-76,6.4,-56,8.3,DK);rl2(-52,8.5,-38,8.6,DK);
    rl(-30,6.6,-14,6.6,DK+5.5);rl(-30,-6.6,-14,-6.6,DK+5.5);
    rl(32,5,32,-5,DK+12.8);
    cl(0.07,0.07,4.2,5,mS,-77,0,DK+2.1,"z");cl(0.07,0.07,3.6,5,mS,77,0,DK+4.4,"z");
    bx(0.9,0.5,1,mK,72,2.4,DK-1);bx(0.9,0.5,1,mK,72,-2.4,DK-1);
    bnum("678",6.4,68,3.9,5.8,0.16);
    return G;
  }
};
UNIT_MODELS["destroyer_c"] = {
  len: 157,
  build: function (THREE, M, C) {
    var G=new THREE.Group(),PI=Math.PI,R=Math.random;
    function NI(g){g=g.toNonIndexed();g.computeVertexNormals();return g;}
    function tb(a,b,c,t){return NI(new THREE.CylinderGeometry(t,1,c,4,1).rotateX(PI/2).rotateZ(PI/4).scale(a*0.7071,b*0.7071,1));}
    function cv(w,h,f){var c=document.createElement("canvas");c.width=w;c.height=h;f(c.getContext("2d"),w,h);return new THREE.CanvasTexture(c);}
    function pT(w,h,bg,cx,cy,fn){return cv(w,h,function(x,W,H){var i;x.fillStyle=bg;x.fillRect(0,0,W,H);for(i=0;i<42;i++){x.globalAlpha=0.06;x.fillStyle=i%2?"#000":"#fff";x.fillRect(R()*W,R()*H,40+R()*150,18+R()*60);}x.globalAlpha=0.3;x.strokeStyle="#2e3236";x.lineWidth=1.6;for(i=1;i<cx;i++){x.beginPath();x.moveTo(i*W/cx,0);x.lineTo(i*W/cx,H);x.stroke();}for(i=1;i<cy;i++){x.beginPath();x.moveTo(0,i*H/cy);x.lineTo(W,i*H/cy);x.stroke();}x.globalAlpha=1;if(fn)fn(x,W,H);});}
    var hullT=pT(1024,256,"#6d7378",34,10,function(x,W,H){var i;x.fillStyle="#24282b";x.fillRect(0,0.17*H,W,0.15*H);x.globalAlpha=0.12;x.fillStyle="#3a2b20";for(i=0;i<40;i++)x.fillRect(R()*W,0.33*H+R()*0.26*H,2+R()*4,14+R()*64);x.globalAlpha=1;});
    var deckT=pT(512,512,"#4b5054",12,12,function(x,W,H){var i;x.globalAlpha=0.45;x.fillStyle="#2b2f32";for(i=0;i<300;i++)x.fillRect(R()*W,R()*H,3,3);x.globalAlpha=1;});
    deckT.wrapS=deckT.wrapT=THREE.RepeatWrapping;deckT.repeat.set(0.045,0.045);
    var panT=cv(128,128,function(x,w,h){var i,j;x.fillStyle="#8d8f88";x.fillRect(0,0,w,h);x.fillStyle="rgba(0,0,0,0.3)";for(i=0;i<15;i++)for(j=0;j<15;j++)x.fillRect(i*8+3,j*8+3,4,4);x.strokeStyle="rgba(255,255,255,0.16)";x.lineWidth=3;x.strokeRect(2,2,w-4,h-4);});
    var mH=new THREE.MeshStandardMaterial({map:hullT,metalness:0.3,roughness:0.6});
    var mD=new THREE.MeshStandardMaterial({map:deckT,metalness:0.25,roughness:0.72});
    var mK=new THREE.MeshStandardMaterial({color:0x23272b,metalness:0.35,roughness:0.55});
    var mW=new THREE.MeshStandardMaterial({color:0xc9ced2,metalness:0.2,roughness:0.6});
    var mS=new THREE.MeshStandardMaterial({color:0x8d9398,metalness:0.85,roughness:0.3});
    var mP=new THREE.MeshStandardMaterial({map:panT,metalness:0.3,roughness:0.6});
    var mT=new THREE.MeshStandardMaterial({color:C.team,metalness:0.3,roughness:0.55});
    function bx(a,b,c,m,x,y,z){var s=new THREE.Mesh(new THREE.BoxGeometry(a,b,c),m);s.position.set(x,y,z);G.add(s);return s;}
    function cl(rt,rb,l,sg,m,x,y,z,ax){var g=new THREE.CylinderGeometry(rt,rb,l,sg);if(ax=="z")g.rotateX(PI/2);if(ax=="x")g.rotateZ(PI/2);var s=new THREE.Mesh(g,m);s.position.set(x,y,z);G.add(s);return s;}
    function tbm(a,b,c,t,m,x,y,z){var s=new THREE.Mesh(tb(a,b,c,t),m);s.position.set(x,y,z);G.add(s);return s;}
    var stG=new THREE.CylinderGeometry(0.045,0.045,1.15,4,1,true).rotateX(PI/2);
    function rl(x0,y0,x1,y1,z){var dx=x1-x0,dy=y1-y0,L=Math.sqrt(dx*dx+dy*dy),n=Math.max(2,Math.round(L/2.6)),i,g0=new THREE.Group();g0.position.set((x0+x1)/2,(y0+y1)/2,z);g0.rotation.z=Math.atan2(dy,dx);G.add(g0);for(i=0;i<=n;i++){var s=new THREE.Mesh(stG,mW);s.position.set(-L/2+L*i/n,0,0.57);g0.add(s);}var rg=new THREE.CylinderGeometry(0.05,0.05,L,4,1,true).rotateZ(PI/2);for(i=0;i<2;i++){var b=new THREE.Mesh(rg,mW);b.position.set(0,0,0.62+i*0.5);g0.add(b);}return g0;}
    function rl2(x0,y0,x1,y1,z){rl(x0,y0,x1,y1,z);rl(x0,-y0,x1,-y1,z);}
    function bnum(s,wd,x,y,z,tl){var t=cv(256,128,function(c,w,h){c.font="bold 92px Arial";c.fillStyle="#dfe3e6";c.textAlign="center";c.fillText(s,w/2,100);});var mm=new THREE.MeshStandardMaterial({map:t,transparent:true,metalness:0.2,roughness:0.6});var g=new THREE.PlaneGeometry(wd,wd/2).rotateX(PI/2);var a=new THREE.Mesh(g,mm);a.position.set(x,-y,z);a.rotation.x=-tl;G.add(a);var b=new THREE.Mesh(new THREE.PlaneGeometry(wd,wd/2).rotateY(PI).rotateX(PI/2),mm);b.position.set(x,y,z);b.rotation.x=tl;G.add(b);}
    function wAt(s,z){var e=s.sq||1,d=(z-(s.zc||0))/s.h;if(d>=1||d<=-1)return 0.06;return Math.max(s.w*Math.pow(Math.max(1-Math.pow(Math.abs(d),2/e),0),e/2),0.06);}
    function plz(S,z,n0,n1,ins){var p=[],i,y;for(i=n0;i<=n1;i++){y=Math.max(wAt(S[i],z)-(ins||0),0.06);p.push([S[i].x,y]);}for(i=n1;i>=n0;i--){y=Math.max(wAt(S[i],z)-(ins||0),0.06);p.push([S[i].x,-y]);}return p;}
    function deck(S,z,n0,n1,ins,th){th=th||0.3;var d=new THREE.Mesh(M.slab(THREE,plz(S,z,n0,n1,ins),th),mD);d.position.z=z-th;G.add(d);return d;}
    function vls(x,y,z,nx,ny,c){var lx=nx*c,ly=ny*c;bx(lx+0.9,ly+0.9,0.5,mK,x,y,z+0.18);var t=cv(256,256,function(g,w,h){var i,j,cw=w/nx,ch=h/ny;g.fillStyle="#3e4347";g.fillRect(0,0,w,h);for(i=0;i<nx;i++)for(j=0;j<ny;j++){var px=i*cw,py=j*ch;g.fillStyle="#15181a";g.fillRect(px+cw*0.09,py+ch*0.09,cw*0.82,ch*0.82);g.fillStyle="#6c7378";g.fillRect(px+cw*0.09,py+ch*0.09,cw*0.82,ch*0.1);g.fillStyle="rgba(255,255,255,0.12)";g.fillRect(px+cw*0.4,py+ch*0.14,cw*0.2,ch*0.7);}});var p=new THREE.Mesh(new THREE.PlaneGeometry(lx,ly),new THREE.MeshStandardMaterial({map:t,metalness:0.4,roughness:0.5}));p.position.set(x,y,z+0.44);G.add(p);}
    function oct(r,m,x,y,z,yaw,pit){var s=new THREE.Mesh(new THREE.CylinderGeometry(r,r,0.34,8).rotateY(PI/8).rotateZ(PI/2),m);s.position.set(x,y,z);s.rotation.z=yaw;s.rotation.y=pit||0;G.add(s);return s;}
    function spy(r,x,y,z,yaw,pit){oct(r+0.42,mK,x,y,z,yaw,pit);oct(r,mP,x+Math.cos(yaw)*0.2,y+Math.sin(yaw)*0.2,z,yaw,pit);}
    function pad(x,y,z,lx,ly){var t=cv(256,256,function(g,w,h){var i;g.fillStyle="#41464a";g.fillRect(0,0,w,h);for(i=0;i<26;i++){g.globalAlpha=0.07;g.fillStyle=i%2?"#34383c":"#4d5257";g.fillRect(R()*w,R()*h,40+R()*90,30+R()*70);}g.globalAlpha=1;g.strokeStyle="#d5d9dd";g.lineWidth=8;g.beginPath();g.arc(w/2,h/2,w*0.29,0,7);g.stroke();g.save();g.translate(w/2,h/2);g.rotate(PI/2);g.fillStyle="#d5d9dd";g.font="bold 118px Arial";g.textAlign="center";g.fillText("H",0,42);g.restore();});var p=new THREE.Mesh(new THREE.PlaneGeometry(lx,ly),new THREE.MeshStandardMaterial({map:t,metalness:0.2,roughness:0.8}));p.position.set(x,y,z);G.add(p);return p;}
    function boat(x,y,z,L){var s=y>0?1:-1;var b=new THREE.Mesh(tb(L,L*0.33,L*0.2,0.62),mK);b.position.set(x,y,z);G.add(b);bx(L*0.2,L*0.2,L*0.11,mW,x-L*0.13,y,z+L*0.15);cl(0.09,0.09,2.9,5,mS,x+L*0.34,y-s*0.5,z+1.5,"z");cl(0.09,0.09,2.9,5,mS,x-L*0.34,y-s*0.5,z+1.5,"z");cl(0.08,0.08,1.7,5,mS,x+L*0.34,y-s*0.05,z+2.85);cl(0.08,0.08,1.7,5,mS,x-L*0.34,y-s*0.05,z+2.85);}
    function dish(r,x,y,z,yaw){var d=new THREE.Mesh(new THREE.SphereGeometry(r,12,6,0,PI*2,0,PI*0.44).rotateZ(PI/2),mW);d.position.set(x,y,z);d.rotation.z=yaw||0;G.add(d);return d;}
    var DK=8;
    function ciws(x,y,z,aft){cl(1.05,1.2,1.5,10,mW,x,y,z+0.75,"z");var d=new THREE.Mesh(tb(2.1,2.4,1.5,0.55),mW);d.position.set(x,y,z+2.1);G.add(d);cl(0.3,0.34,2.6,10,mK,x+(aft?-1.6:1.6),y,z+2,"x");}
    function hq10(x,y,z,aft){var b=new THREE.Mesh(tb(3.4,5.6,2.4,0.85),mK);b.position.set(x,y,z+1.2);b.rotation.y=aft?0.22:-0.22;G.add(b);var i,j;for(i=0;i<6;i++)for(j=0;j<4;j++)cl(0.24,0.24,0.3,6,mS,x+(aft?-1.75:1.75),y-1.9+i*0.76,z+0.55+j*0.5,"x");}
    // stealth hull: knuckled sides, flare forward, keel -1.0
    var S=[{x:-78.5,w:8.4,h:4.86,zc:3.86,sq:0.55},{x:-70,w:10,h:4.86,zc:3.86,sq:0.5},{x:-50,w:10.6,h:4.86,zc:3.86,sq:0.45},{x:-16,w:10.7,h:4.86,zc:3.86,sq:0.45},{x:12,w:10.5,h:4.86,zc:3.86,sq:0.45},{x:38,w:9.8,h:4.97,zc:3.97,sq:0.5},{x:54,w:8.6,h:5.41,zc:4.41,sq:0.58},{x:66,w:6.4,h:6.05,zc:5.05,sq:0.66},{x:74,w:3.3,h:6.59,zc:5.59,sq:0.74},{x:78.5,w:0.45,h:6.81,zc:5.81,sq:0.82}];
    G.add(new THREE.Mesh(M.loft(THREE,S,18),mH));
    bx(0.6,13.5,9.7,mH,-78.7,0,3.85);
    deck(S,DK,0,9,0.15);
    bx(1.5,16,0.8,mK,53,0,DK+0.4).rotation.y=-0.3;
    // H/PJ-38 130mm stealth mount
    cl(2.8,3,1.5,12,mH,60,0,DK+0.45,"z");
    var T=new THREE.Group();T.name="turret";T.position.set(60,0,DK+1.2);G.add(T);
    var tg=new THREE.Mesh(tb(8,4.6,3.2,0.42),mH);tg.position.set(-0.8,0,1.6);T.add(tg);
    var tn=new THREE.Mesh(tb(3.4,3.2,2.2,0.5),mH);tn.position.set(3.2,0,1.5);tn.rotation.y=0.12;T.add(tn);
    var bar=new THREE.Mesh(new THREE.CylinderGeometry(0.17,0.22,8.6,8).rotateZ(PI/2),mS);bar.position.set(7,0,1.5);T.add(bar);
    var slv=new THREE.Mesh(new THREE.CylinderGeometry(0.44,0.48,2.4,8).rotateZ(PI/2),mK);slv.position.set(3.9,0,1.5);T.add(slv);
    // 32 cells forward, 32 aft
    vls(44,0,DK,8,4,1.75);
    vls(-32,0,DK,8,4,1.75);
    // integrated deckhouse: sloped sides, four Type 346A AESA faces
    tbm(62,15,6,0.86,mH,6,0,DK+3);
    tbm(30,12.4,4.2,0.88,mH,20,0,DK+8.1);
    tbm(15,10.6,3.6,0.86,mH,28,0,DK+12);
    bx(0.35,8.8,1.6,mK,34.6,0,DK+12.8).rotation.y=-0.44;
    bx(6,0.35,1.4,mK,31,4.9,DK+12.7).rotation.x=0.3;
    bx(6,0.35,1.4,mK,31,-4.9,DK+12.7).rotation.x=-0.3;
    bx(3.2,15.6,0.4,mH,28,0,DK+13.9);
    spy(2.35,29.6,4.9,DK+9.3,0.6,-0.14);spy(2.35,29.6,-4.9,DK+9.3,-0.6,-0.14);
    spy(2.35,8.6,5.9,DK+9.2,2.36,-0.14);spy(2.35,8.6,-5.9,DK+9.2,-2.36,-0.14);
    bx(4.6,1.2,0.5,mT,-22,7.2,DK+5.9);bx(4.6,1.2,0.5,mT,-22,-7.2,DK+5.9);
    // enclosed mast, Type 518 array, satcom radomes
    tbm(7.6,7.6,9,0.42,mH,13,0,DK+13.5);
    cl(0.26,0.34,7,6,mS,13,0,DK+21.4,"z");
    cl(0.1,0.1,8.4,4,mS,13,0,DK+19.4,"x");
    bx(0.5,6,2.2,mS,13,0,DK+18.2).rotation.y=-0.3;
    var d1=new THREE.Mesh(new THREE.SphereGeometry(1.7,12,8),mW);d1.position.set(1,4.4,DK+9.6);G.add(d1);
    var d2=new THREE.Mesh(new THREE.SphereGeometry(1.7,12,8),mW);d2.position.set(1,-4.4,DK+9.6);G.add(d2);
    cl(1.5,1.6,0.9,10,mH,1,4.4,DK+8.4,"z");cl(1.5,1.6,0.9,10,mH,1,-4.4,DK+8.4,"z");
    dish(1.6,-2,0,DK+11.4,PI);cl(1.4,1.5,0.9,10,mH,-2,0,DK+10.3,"z");
    // single funnel with team band
    tbm(13,9.6,6.4,0.76,mH,-14,0,DK+6.2);
    bx(10,7.4,0.6,mK,-14,0,DK+9.6);
    cl(0.95,1,1.7,10,mK,-12.6,2.1,DK+10.3,"z");cl(0.95,1,1.7,10,mK,-15.4,-2.1,DK+10.3,"z");
    // hangar, flight deck, CIWS and HQ-10
    tbm(18,14.4,5.6,0.95,mH,-52,0,DK+2.8);
    bx(0.5,4.8,4.6,mK,-43.2,0,DK+2.3);
    bx(6.4,13.6,0.4,mH,-46,0,DK+5.8);
    ciws(-47,0,DK+6,1);hq10(-56,0,DK+5.8,0);
    ciws(38,0,DK+14.1,0);
    pad(-68,0,DK+0.12,15,13.6);
    bx(1,8,0.35,mW,-61.6,0,DK+0.16);
    function tt(y){var s=y>0?1:-1,i;for(i=0;i<3;i++)cl(0.3,0.3,6.2,8,mK,-24,y+s*i*0.7,DK+1.1+i*0.6,"x");}
    tt(7.4);tt(-7.4);
    boat(-8,8.1,DK+1.5,7.6);boat(-8,-8.1,DK+1.5,7.6);
    bx(1.6,1.6,1.4,mK,-38,7.2,DK+0.7);bx(1.6,1.6,1.4,mK,-38,-7.2,DK+0.7);
    // railings, staffs, hull number
    rl2(55,7,72,3,DK);rl2(-77,7.2,-64,8.6,DK);rl2(-62,8.8,-44,9.2,DK);
    rl(-28,6.8,-4,6.8,DK+6.1);rl(-28,-6.8,-4,-6.8,DK+6.1);
    rl(31,5.2,31,-5.2,DK+14.1);
    cl(0.07,0.07,4.2,5,mS,-77.6,0,DK+2.1,"z");cl(0.07,0.07,3.6,5,mS,77.5,0,DK+4.6,"z");
    bx(0.9,0.5,1,mK,72,2.6,DK-1);bx(0.9,0.5,1,mK,72,-2.6,DK-1);
    bnum("172",6.4,68,4.4,5.9,0.16);
    return G;
  }
};
UNIT_MODELS["cruiser_n"] = {
  len: 173,
  build: function (THREE, M, C) {
    var G=new THREE.Group(),PI=Math.PI,R=Math.random;
    function NI(g){g=g.toNonIndexed();g.computeVertexNormals();return g;}
    function tb(a,b,c,t){return NI(new THREE.CylinderGeometry(t,1,c,4,1).rotateX(PI/2).rotateZ(PI/4).scale(a*0.7071,b*0.7071,1));}
    function cv(w,h,f){var c=document.createElement("canvas");c.width=w;c.height=h;f(c.getContext("2d"),w,h);return new THREE.CanvasTexture(c);}
    function pT(w,h,bg,cx,cy,fn){return cv(w,h,function(x,W,H){var i;x.fillStyle=bg;x.fillRect(0,0,W,H);for(i=0;i<42;i++){x.globalAlpha=0.06;x.fillStyle=i%2?"#000":"#fff";x.fillRect(R()*W,R()*H,40+R()*150,18+R()*60);}x.globalAlpha=0.3;x.strokeStyle="#2e3236";x.lineWidth=1.6;for(i=1;i<cx;i++){x.beginPath();x.moveTo(i*W/cx,0);x.lineTo(i*W/cx,H);x.stroke();}for(i=1;i<cy;i++){x.beginPath();x.moveTo(0,i*H/cy);x.lineTo(W,i*H/cy);x.stroke();}x.globalAlpha=1;if(fn)fn(x,W,H);});}
    var hullT=pT(1024,256,"#6d7378",34,10,function(x,W,H){var i;x.fillStyle="#24282b";x.fillRect(0,0.17*H,W,0.15*H);x.globalAlpha=0.12;x.fillStyle="#3a2b20";for(i=0;i<40;i++)x.fillRect(R()*W,0.33*H+R()*0.26*H,2+R()*4,14+R()*64);x.globalAlpha=1;});
    var deckT=pT(512,512,"#4b5054",12,12,function(x,W,H){var i;x.globalAlpha=0.45;x.fillStyle="#2b2f32";for(i=0;i<300;i++)x.fillRect(R()*W,R()*H,3,3);x.globalAlpha=1;});
    deckT.wrapS=deckT.wrapT=THREE.RepeatWrapping;deckT.repeat.set(0.045,0.045);
    var panT=cv(128,128,function(x,w,h){var i,j;x.fillStyle="#8d8f88";x.fillRect(0,0,w,h);x.fillStyle="rgba(0,0,0,0.3)";for(i=0;i<15;i++)for(j=0;j<15;j++)x.fillRect(i*8+3,j*8+3,4,4);x.strokeStyle="rgba(255,255,255,0.16)";x.lineWidth=3;x.strokeRect(2,2,w-4,h-4);});
    var mH=new THREE.MeshStandardMaterial({map:hullT,metalness:0.3,roughness:0.6});
    var mD=new THREE.MeshStandardMaterial({map:deckT,metalness:0.25,roughness:0.72});
    var mK=new THREE.MeshStandardMaterial({color:0x23272b,metalness:0.35,roughness:0.55});
    var mW=new THREE.MeshStandardMaterial({color:0xc9ced2,metalness:0.2,roughness:0.6});
    var mS=new THREE.MeshStandardMaterial({color:0x8d9398,metalness:0.85,roughness:0.3});
    var mP=new THREE.MeshStandardMaterial({map:panT,metalness:0.3,roughness:0.6});
    var mT=new THREE.MeshStandardMaterial({color:C.team,metalness:0.3,roughness:0.55});
    function bx(a,b,c,m,x,y,z){var s=new THREE.Mesh(new THREE.BoxGeometry(a,b,c),m);s.position.set(x,y,z);G.add(s);return s;}
    function cl(rt,rb,l,sg,m,x,y,z,ax){var g=new THREE.CylinderGeometry(rt,rb,l,sg);if(ax=="z")g.rotateX(PI/2);if(ax=="x")g.rotateZ(PI/2);var s=new THREE.Mesh(g,m);s.position.set(x,y,z);G.add(s);return s;}
    function tbm(a,b,c,t,m,x,y,z){var s=new THREE.Mesh(tb(a,b,c,t),m);s.position.set(x,y,z);G.add(s);return s;}
    var stG=new THREE.CylinderGeometry(0.045,0.045,1.15,4,1,true).rotateX(PI/2);
    function rl(x0,y0,x1,y1,z){var dx=x1-x0,dy=y1-y0,L=Math.sqrt(dx*dx+dy*dy),n=Math.max(2,Math.round(L/2.6)),i,g0=new THREE.Group();g0.position.set((x0+x1)/2,(y0+y1)/2,z);g0.rotation.z=Math.atan2(dy,dx);G.add(g0);for(i=0;i<=n;i++){var s=new THREE.Mesh(stG,mW);s.position.set(-L/2+L*i/n,0,0.57);g0.add(s);}var rg=new THREE.CylinderGeometry(0.05,0.05,L,4,1,true).rotateZ(PI/2);for(i=0;i<2;i++){var b=new THREE.Mesh(rg,mW);b.position.set(0,0,0.62+i*0.5);g0.add(b);}return g0;}
    function rl2(x0,y0,x1,y1,z){rl(x0,y0,x1,y1,z);rl(x0,-y0,x1,-y1,z);}
    function bnum(s,wd,x,y,z,tl){var t=cv(256,128,function(c,w,h){c.font="bold 92px Arial";c.fillStyle="#dfe3e6";c.textAlign="center";c.fillText(s,w/2,100);});var mm=new THREE.MeshStandardMaterial({map:t,transparent:true,metalness:0.2,roughness:0.6});var g=new THREE.PlaneGeometry(wd,wd/2).rotateX(PI/2);var a=new THREE.Mesh(g,mm);a.position.set(x,-y,z);a.rotation.x=-tl;G.add(a);var b=new THREE.Mesh(new THREE.PlaneGeometry(wd,wd/2).rotateY(PI).rotateX(PI/2),mm);b.position.set(x,y,z);b.rotation.x=tl;G.add(b);}
    function wAt(s,z){var e=s.sq||1,d=(z-(s.zc||0))/s.h;if(d>=1||d<=-1)return 0.06;return Math.max(s.w*Math.pow(Math.max(1-Math.pow(Math.abs(d),2/e),0),e/2),0.06);}
    function plz(S,z,n0,n1,ins){var p=[],i,y;for(i=n0;i<=n1;i++){y=Math.max(wAt(S[i],z)-(ins||0),0.06);p.push([S[i].x,y]);}for(i=n1;i>=n0;i--){y=Math.max(wAt(S[i],z)-(ins||0),0.06);p.push([S[i].x,-y]);}return p;}
    function deck(S,z,n0,n1,ins,th){th=th||0.3;var d=new THREE.Mesh(M.slab(THREE,plz(S,z,n0,n1,ins),th),mD);d.position.z=z-th;G.add(d);return d;}
    function vls(x,y,z,nx,ny,c){var lx=nx*c,ly=ny*c;bx(lx+0.9,ly+0.9,0.5,mK,x,y,z+0.18);var t=cv(256,256,function(g,w,h){var i,j,cw=w/nx,ch=h/ny;g.fillStyle="#3e4347";g.fillRect(0,0,w,h);for(i=0;i<nx;i++)for(j=0;j<ny;j++){var px=i*cw,py=j*ch;g.fillStyle="#15181a";g.fillRect(px+cw*0.09,py+ch*0.09,cw*0.82,ch*0.82);g.fillStyle="#6c7378";g.fillRect(px+cw*0.09,py+ch*0.09,cw*0.82,ch*0.1);g.fillStyle="rgba(255,255,255,0.12)";g.fillRect(px+cw*0.4,py+ch*0.14,cw*0.2,ch*0.7);}});var p=new THREE.Mesh(new THREE.PlaneGeometry(lx,ly),new THREE.MeshStandardMaterial({map:t,metalness:0.4,roughness:0.5}));p.position.set(x,y,z+0.44);G.add(p);}
    function oct(r,m,x,y,z,yaw,pit){var s=new THREE.Mesh(new THREE.CylinderGeometry(r,r,0.34,8).rotateY(PI/8).rotateZ(PI/2),m);s.position.set(x,y,z);s.rotation.z=yaw;s.rotation.y=pit||0;G.add(s);return s;}
    function spy(r,x,y,z,yaw,pit){oct(r+0.42,mK,x,y,z,yaw,pit);oct(r,mP,x+Math.cos(yaw)*0.2,y+Math.sin(yaw)*0.2,z,yaw,pit);}
    function pad(x,y,z,lx,ly){var t=cv(256,256,function(g,w,h){var i;g.fillStyle="#41464a";g.fillRect(0,0,w,h);for(i=0;i<26;i++){g.globalAlpha=0.07;g.fillStyle=i%2?"#34383c":"#4d5257";g.fillRect(R()*w,R()*h,40+R()*90,30+R()*70);}g.globalAlpha=1;g.strokeStyle="#d5d9dd";g.lineWidth=8;g.beginPath();g.arc(w/2,h/2,w*0.29,0,7);g.stroke();g.save();g.translate(w/2,h/2);g.rotate(PI/2);g.fillStyle="#d5d9dd";g.font="bold 118px Arial";g.textAlign="center";g.fillText("H",0,42);g.restore();});var p=new THREE.Mesh(new THREE.PlaneGeometry(lx,ly),new THREE.MeshStandardMaterial({map:t,metalness:0.2,roughness:0.8}));p.position.set(x,y,z);G.add(p);return p;}
    function boat(x,y,z,L){var s=y>0?1:-1;var b=new THREE.Mesh(tb(L,L*0.33,L*0.2,0.62),mK);b.position.set(x,y,z);G.add(b);bx(L*0.2,L*0.2,L*0.11,mW,x-L*0.13,y,z+L*0.15);cl(0.09,0.09,2.9,5,mS,x+L*0.34,y-s*0.5,z+1.5,"z");cl(0.09,0.09,2.9,5,mS,x-L*0.34,y-s*0.5,z+1.5,"z");cl(0.08,0.08,1.7,5,mS,x+L*0.34,y-s*0.05,z+2.85);cl(0.08,0.08,1.7,5,mS,x-L*0.34,y-s*0.05,z+2.85);}
    function dish(r,x,y,z,yaw){var d=new THREE.Mesh(new THREE.SphereGeometry(r,12,6,0,PI*2,0,PI*0.44).rotateZ(PI/2),mW);d.position.set(x,y,z);d.rotation.z=yaw||0;G.add(d);return d;}
    var DK=7.8;
    function seg(a,b,c,d,e,f,r,m){var dx=d-a,dy=e-b,dz=f-c,L=Math.sqrt(dx*dx+dy*dy+dz*dz);var s=new THREE.Mesh(new THREE.CylinderGeometry(r,r,L,4,1,true),m||mS);s.position.set((a+d)/2,(b+e)/2,(c+f)/2);s.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),new THREE.Vector3(dx/L,dy/L,dz/L));G.add(s);return s;}
    function ciws(x,y,z){cl(1,1.15,1.6,10,mW,x,y,z+0.8,"z");var d=new THREE.Mesh(new THREE.SphereGeometry(1.05,10,7),mW);d.position.set(x,y,z+2.15);G.add(d);var b=cl(0.3,0.34,2.4,8,mK,x+1.5,y,z+1.7,"x");b.rotation.y=-0.25;}
    function mk45(px,pz,nm){var T=new THREE.Group();T.position.set(px,0,pz);G.add(T);if(nm)T.name="turret";var g=new THREE.Mesh(tb(7.2,4.4,2.8,0.5),mH);g.position.set(-0.3,0,1.4);T.add(g);var sl=new THREE.Mesh(new THREE.BoxGeometry(2.5,3.8,0.25),mH);sl.position.set(2.8,0,2);sl.rotation.y=0.5;T.add(sl);var b=new THREE.Mesh(new THREE.CylinderGeometry(0.17,0.21,7.2,8).rotateZ(PI/2),mS);b.position.set(5.3,0,1.45);T.add(b);var s2=new THREE.Mesh(new THREE.CylinderGeometry(0.42,0.46,2,8).rotateZ(PI/2),mK);s2.position.set(2.6,0,1.45);T.add(s2);return T;}
    // Spruance-derived hull, keel -1.0, sheer to 11.4 at the stem
    var S=[{x:-86.5,w:7.3,h:4.76,zc:3.76,sq:0.55},{x:-78,w:8.7,h:4.76,zc:3.76,sq:0.5},{x:-58,w:9.3,h:4.76,zc:3.76,sq:0.45},{x:-20,w:9.4,h:4.76,zc:3.76,sq:0.45},{x:14,w:9.3,h:4.76,zc:3.76,sq:0.45},{x:42,w:8.7,h:4.86,zc:3.86,sq:0.5},{x:60,w:7.7,h:5.35,zc:4.35,sq:0.58},{x:74,w:5.6,h:6.11,zc:5.11,sq:0.66},{x:82,w:2.9,h:6.65,zc:5.65,sq:0.74},{x:86.5,w:0.45,h:6.92,zc:5.92,sq:0.82}];
    G.add(new THREE.Mesh(M.loft(THREE,S,18),mH));
    bx(0.6,11.7,9.5,mH,-86.7,0,3.75);
    deck(S,DK,0,9,0.15);
    bx(1.4,14.6,0.8,mK,60,0,DK+0.4).rotation.y=-0.3;
    // 5in Mk45 fore (trainable) and aft (baked)
    cl(2.6,2.8,1.6,12,mH,66,0,DK+0.5,"z");mk45(66,DK+1.3,1);
    cl(2.6,2.8,1.6,12,mH,-68,0,DK+0.5,"z");mk45(-68,DK+1.3,0).rotation.z=PI;
    // two 61-cell Mk41 VLS blocks
    vls(52,0,DK,8,8,1.42);
    vls(-52,0,DK,8,8,1.42);
    // long slab-sided superstructure running most of the hull
    tbm(96,13.8,6.2,0.97,mH,0,0,DK+3.1);
    tbm(52,12,3.6,0.96,mH,10,0,DK+8);
    tbm(24,11,3.4,0.95,mH,-38,0,DK+8);
    tbm(14,10.2,3.4,0.9,mH,32,0,DK+11.5);
    bx(0.35,8.6,1.6,mK,38.6,0,DK+12.3).rotation.y=-0.42;
    bx(6,0.35,1.4,mK,35,4.7,DK+12.2).rotation.x=0.3;
    bx(6,0.35,1.4,mK,35,-4.7,DK+12.2).rotation.x=-0.3;
    bx(3.2,15,0.4,mH,32,0,DK+13.4);
    bx(5.4,1.2,0.5,mT,-44,6.6,DK+5.9);bx(5.4,1.2,0.5,mT,-44,-6.6,DK+5.9);
    // SPY-1A octagons: two on the forward deckhouse, two facing aft
    spy(2,33.4,4.8,DK+9.2,0.6,-0.13);spy(2,33.4,-4.8,DK+9.2,-0.6,-0.13);
    spy(2,-40,5.6,DK+9.2,2.36,-0.13);spy(2,-40,-5.6,DK+9.2,-2.36,-0.13);
    // twin funnels
    function fun(x){tbm(12,9,7.6,0.76,mH,x,0,DK+9.6).rotation.y=0.06;bx(10.2,7.8,0.6,mK,x,0,DK+13.6);cl(0.9,0.95,1.9,8,mK,x+1.8,2.3,DK+14.4,"z");cl(0.9,0.95,1.9,8,mK,x-1.8,-2.3,DK+14.4,"z");bx(7.6,0.4,1.5,mK,x,4.5,DK+10.4);bx(7.6,0.4,1.5,mK,x,-4.5,DK+10.4);}
    fun(-4);fun(-26);
    // fore pole mast and main tripod lattice with yards
    cl(0.3,0.4,12,6,mS,16,0,DK+15.6,"z");
    seg(16,0,DK+11.6,12,3,DK+21,0.13);seg(16,0,DK+11.6,12,-3,DK+21,0.13);
    cl(0.1,0.1,10,4,mS,16,0,DK+16.4,"x");
    cl(0.1,0.1,6.4,4,mS,16,0,DK+19.6,"x");
    bx(3.6,6.4,0.35,mH,16,0,DK+21.4);
    cl(0.2,0.24,5,6,mS,16,0,DK+24,"z");
    bx(0.5,4.6,1,mW,16,0,DK+26.6);
    cl(0.28,0.34,9,6,mS,-16,0,DK+15.6,"z");
    seg(-16,0,DK+11.6,-20,3.4,DK+19.4,0.12);seg(-16,0,DK+11.6,-20,-3.4,DK+19.4,0.12);
    cl(0.1,0.1,9,4,mS,-16,0,DK+16.6,"x");
    cl(0.05,0.05,5,4,mS,-11,4,DK+13.6,"z");cl(0.05,0.05,5,4,mS,-11,-4,DK+13.6,"z");
    // SPG-62 illuminators fore and aft
    dish(1.5,30,0,DK+14.6,0);cl(1.4,1.5,0.9,10,mH,30,0,DK+13.6,"z");
    dish(1.5,-44,4.2,DK+12.6,PI);cl(1.4,1.5,0.9,10,mH,-44,4.2,DK+11.6,"z");
    dish(1.5,-44,-4.2,DK+12.6,PI);cl(1.4,1.5,0.9,10,mH,-44,-4.2,DK+11.6,"z");
    dish(1.5,22,0,DK+11.6,0);cl(1.4,1.5,0.9,10,mH,22,0,DK+10.6,"z");
    ciws(26,0,DK+13.5);ciws(-62,0,DK+6.2);
    // hangar, flight deck, Harpoon canisters at the stern quarters
    tbm(15,12.4,5.2,0.95,mH,-60,0,DK+2.6);
    bx(0.5,4.2,4.2,mK,-52.6,2.6,DK+2.1);bx(0.5,4.2,4.2,mK,-52.6,-2.6,DK+2.1);
    pad(-76,0,DK+0.12,14,12.4);
    bx(1,7.6,0.35,mW,-69.6,0,DK+0.16);
    function harp(y){var s=y>0?1:-1,g0=new THREE.Group();g0.position.set(-74,y,DK+1.6);g0.rotation.z=s*0.5;g0.rotation.y=-0.55;G.add(g0);var i,j;for(i=0;i<2;i++)for(j=0;j<2;j++){var c1=new THREE.Mesh(new THREE.BoxGeometry(5.4,1.05,1.05),mW);c1.position.set(0,(i-0.5)*1.15,(j-0.5)*1.15+0.6);g0.add(c1);}}
    harp(6.2);harp(-6.2);
    function tt(y){var s=y>0?1:-1,i;for(i=0;i<3;i++)cl(0.3,0.3,6.2,8,mK,-30,y+s*i*0.7,DK+1.1+i*0.6,"x");}
    tt(7);tt(-7);
    boat(4,7.8,DK+1.4,7.4);boat(4,-7.8,DK+1.4,7.4);
    // railings, staffs, hull number
    rl2(58,6.6,80,2.6,DK);rl2(-85,6.2,-72,7.6,DK);rl2(-70,7.8,-58,8.1,DK);
    rl(-48,6.4,-2,6.4,DK+6.3);rl(-48,-6.4,-2,-6.4,DK+6.3);
    rl(35,5,35,-5,DK+13.6);
    cl(0.07,0.07,4.2,5,mS,-85.6,0,DK+2.1,"z");cl(0.07,0.07,3.6,5,mS,85.5,0,DK+4.6,"z");
    bx(0.9,0.5,1,mK,79,2.2,DK-1);bx(0.9,0.5,1,mK,79,-2.2,DK-1);
    bnum("63",6,76,3.4,5.6,0.16);
    return G;
  }
};
UNIT_MODELS["cruiser_p"] = {
  len: 186,
  build: function (THREE, M, C) {
    var G=new THREE.Group(),PI=Math.PI,R=Math.random;
    function NI(g){g=g.toNonIndexed();g.computeVertexNormals();return g;}
    function tb(a,b,c,t){return NI(new THREE.CylinderGeometry(t,1,c,4,1).rotateX(PI/2).rotateZ(PI/4).scale(a*0.7071,b*0.7071,1));}
    function cv(w,h,f){var c=document.createElement("canvas");c.width=w;c.height=h;f(c.getContext("2d"),w,h);return new THREE.CanvasTexture(c);}
    function pT(w,h,bg,cx,cy,fn){return cv(w,h,function(x,W,H){var i;x.fillStyle=bg;x.fillRect(0,0,W,H);for(i=0;i<42;i++){x.globalAlpha=0.06;x.fillStyle=i%2?"#000":"#fff";x.fillRect(R()*W,R()*H,40+R()*150,18+R()*60);}x.globalAlpha=0.3;x.strokeStyle="#2e3236";x.lineWidth=1.6;for(i=1;i<cx;i++){x.beginPath();x.moveTo(i*W/cx,0);x.lineTo(i*W/cx,H);x.stroke();}for(i=1;i<cy;i++){x.beginPath();x.moveTo(0,i*H/cy);x.lineTo(W,i*H/cy);x.stroke();}x.globalAlpha=1;if(fn)fn(x,W,H);});}
    var hullT=pT(1024,256,"#6d7378",34,10,function(x,W,H){var i;x.fillStyle="#24282b";x.fillRect(0,0.17*H,W,0.15*H);x.globalAlpha=0.12;x.fillStyle="#3a2b20";for(i=0;i<40;i++)x.fillRect(R()*W,0.33*H+R()*0.26*H,2+R()*4,14+R()*64);x.globalAlpha=1;});
    var deckT=pT(512,512,"#4b5054",12,12,function(x,W,H){var i;x.globalAlpha=0.45;x.fillStyle="#2b2f32";for(i=0;i<300;i++)x.fillRect(R()*W,R()*H,3,3);x.globalAlpha=1;});
    deckT.wrapS=deckT.wrapT=THREE.RepeatWrapping;deckT.repeat.set(0.045,0.045);
    var panT=cv(128,128,function(x,w,h){var i,j;x.fillStyle="#8d8f88";x.fillRect(0,0,w,h);x.fillStyle="rgba(0,0,0,0.3)";for(i=0;i<15;i++)for(j=0;j<15;j++)x.fillRect(i*8+3,j*8+3,4,4);x.strokeStyle="rgba(255,255,255,0.16)";x.lineWidth=3;x.strokeRect(2,2,w-4,h-4);});
    var mH=new THREE.MeshStandardMaterial({map:hullT,metalness:0.3,roughness:0.6});
    var mD=new THREE.MeshStandardMaterial({map:deckT,metalness:0.25,roughness:0.72});
    var mK=new THREE.MeshStandardMaterial({color:0x23272b,metalness:0.35,roughness:0.55});
    var mW=new THREE.MeshStandardMaterial({color:0xc9ced2,metalness:0.2,roughness:0.6});
    var mS=new THREE.MeshStandardMaterial({color:0x8d9398,metalness:0.85,roughness:0.3});
    var mP=new THREE.MeshStandardMaterial({map:panT,metalness:0.3,roughness:0.6});
    var mT=new THREE.MeshStandardMaterial({color:C.team,metalness:0.3,roughness:0.55});
    function bx(a,b,c,m,x,y,z){var s=new THREE.Mesh(new THREE.BoxGeometry(a,b,c),m);s.position.set(x,y,z);G.add(s);return s;}
    function cl(rt,rb,l,sg,m,x,y,z,ax){var g=new THREE.CylinderGeometry(rt,rb,l,sg);if(ax=="z")g.rotateX(PI/2);if(ax=="x")g.rotateZ(PI/2);var s=new THREE.Mesh(g,m);s.position.set(x,y,z);G.add(s);return s;}
    function tbm(a,b,c,t,m,x,y,z){var s=new THREE.Mesh(tb(a,b,c,t),m);s.position.set(x,y,z);G.add(s);return s;}
    var stG=new THREE.CylinderGeometry(0.045,0.045,1.15,4,1,true).rotateX(PI/2);
    function rl(x0,y0,x1,y1,z){var dx=x1-x0,dy=y1-y0,L=Math.sqrt(dx*dx+dy*dy),n=Math.max(2,Math.round(L/2.6)),i,g0=new THREE.Group();g0.position.set((x0+x1)/2,(y0+y1)/2,z);g0.rotation.z=Math.atan2(dy,dx);G.add(g0);for(i=0;i<=n;i++){var s=new THREE.Mesh(stG,mW);s.position.set(-L/2+L*i/n,0,0.57);g0.add(s);}var rg=new THREE.CylinderGeometry(0.05,0.05,L,4,1,true).rotateZ(PI/2);for(i=0;i<2;i++){var b=new THREE.Mesh(rg,mW);b.position.set(0,0,0.62+i*0.5);g0.add(b);}return g0;}
    function rl2(x0,y0,x1,y1,z){rl(x0,y0,x1,y1,z);rl(x0,-y0,x1,-y1,z);}
    function bnum(s,wd,x,y,z,tl){var t=cv(256,128,function(c,w,h){c.font="bold 92px Arial";c.fillStyle="#dfe3e6";c.textAlign="center";c.fillText(s,w/2,100);});var mm=new THREE.MeshStandardMaterial({map:t,transparent:true,metalness:0.2,roughness:0.6});var g=new THREE.PlaneGeometry(wd,wd/2).rotateX(PI/2);var a=new THREE.Mesh(g,mm);a.position.set(x,-y,z);a.rotation.x=-tl;G.add(a);var b=new THREE.Mesh(new THREE.PlaneGeometry(wd,wd/2).rotateY(PI).rotateX(PI/2),mm);b.position.set(x,y,z);b.rotation.x=tl;G.add(b);}
    function wAt(s,z){var e=s.sq||1,d=(z-(s.zc||0))/s.h;if(d>=1||d<=-1)return 0.06;return Math.max(s.w*Math.pow(Math.max(1-Math.pow(Math.abs(d),2/e),0),e/2),0.06);}
    function plz(S,z,n0,n1,ins){var p=[],i,y;for(i=n0;i<=n1;i++){y=Math.max(wAt(S[i],z)-(ins||0),0.06);p.push([S[i].x,y]);}for(i=n1;i>=n0;i--){y=Math.max(wAt(S[i],z)-(ins||0),0.06);p.push([S[i].x,-y]);}return p;}
    function deck(S,z,n0,n1,ins,th){th=th||0.3;var d=new THREE.Mesh(M.slab(THREE,plz(S,z,n0,n1,ins),th),mD);d.position.z=z-th;G.add(d);return d;}
    function vls(x,y,z,nx,ny,c){var lx=nx*c,ly=ny*c;bx(lx+0.9,ly+0.9,0.5,mK,x,y,z+0.18);var t=cv(256,256,function(g,w,h){var i,j,cw=w/nx,ch=h/ny;g.fillStyle="#3e4347";g.fillRect(0,0,w,h);for(i=0;i<nx;i++)for(j=0;j<ny;j++){var px=i*cw,py=j*ch;g.fillStyle="#15181a";g.fillRect(px+cw*0.09,py+ch*0.09,cw*0.82,ch*0.82);g.fillStyle="#6c7378";g.fillRect(px+cw*0.09,py+ch*0.09,cw*0.82,ch*0.1);g.fillStyle="rgba(255,255,255,0.12)";g.fillRect(px+cw*0.4,py+ch*0.14,cw*0.2,ch*0.7);}});var p=new THREE.Mesh(new THREE.PlaneGeometry(lx,ly),new THREE.MeshStandardMaterial({map:t,metalness:0.4,roughness:0.5}));p.position.set(x,y,z+0.44);G.add(p);}
    function oct(r,m,x,y,z,yaw,pit){var s=new THREE.Mesh(new THREE.CylinderGeometry(r,r,0.34,8).rotateY(PI/8).rotateZ(PI/2),m);s.position.set(x,y,z);s.rotation.z=yaw;s.rotation.y=pit||0;G.add(s);return s;}
    function spy(r,x,y,z,yaw,pit){oct(r+0.42,mK,x,y,z,yaw,pit);oct(r,mP,x+Math.cos(yaw)*0.2,y+Math.sin(yaw)*0.2,z,yaw,pit);}
    function pad(x,y,z,lx,ly){var t=cv(256,256,function(g,w,h){var i;g.fillStyle="#41464a";g.fillRect(0,0,w,h);for(i=0;i<26;i++){g.globalAlpha=0.07;g.fillStyle=i%2?"#34383c":"#4d5257";g.fillRect(R()*w,R()*h,40+R()*90,30+R()*70);}g.globalAlpha=1;g.strokeStyle="#d5d9dd";g.lineWidth=8;g.beginPath();g.arc(w/2,h/2,w*0.29,0,7);g.stroke();g.save();g.translate(w/2,h/2);g.rotate(PI/2);g.fillStyle="#d5d9dd";g.font="bold 118px Arial";g.textAlign="center";g.fillText("H",0,42);g.restore();});var p=new THREE.Mesh(new THREE.PlaneGeometry(lx,ly),new THREE.MeshStandardMaterial({map:t,metalness:0.2,roughness:0.8}));p.position.set(x,y,z);G.add(p);return p;}
    function boat(x,y,z,L){var s=y>0?1:-1;var b=new THREE.Mesh(tb(L,L*0.33,L*0.2,0.62),mK);b.position.set(x,y,z);G.add(b);bx(L*0.2,L*0.2,L*0.11,mW,x-L*0.13,y,z+L*0.15);cl(0.09,0.09,2.9,5,mS,x+L*0.34,y-s*0.5,z+1.5,"z");cl(0.09,0.09,2.9,5,mS,x-L*0.34,y-s*0.5,z+1.5,"z");cl(0.08,0.08,1.7,5,mS,x+L*0.34,y-s*0.05,z+2.85);cl(0.08,0.08,1.7,5,mS,x-L*0.34,y-s*0.05,z+2.85);}
    function dish(r,x,y,z,yaw){var d=new THREE.Mesh(new THREE.SphereGeometry(r,12,6,0,PI*2,0,PI*0.44).rotateZ(PI/2),mW);d.position.set(x,y,z);d.rotation.z=yaw||0;G.add(d);return d;}
    var DK=9.4;
    function seg(a,b,c,d,e,f,r,m){var dx=d-a,dy=e-b,dz=f-c,L=Math.sqrt(dx*dx+dy*dy+dz*dz);var s=new THREE.Mesh(new THREE.CylinderGeometry(r,r,L,4,1,true),m||mS);s.position.set((a+d)/2,(b+e)/2,(c+f)/2);s.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),new THREE.Vector3(dx/L,dy/L,dz/L));G.add(s);return s;}
    function tower(x,z0,z1,w0,w1,n){var i,j,cs=[[1,1],[1,-1],[-1,-1],[-1,1]];for(i=0;i<4;i++)seg(x+cs[i][0]*w0,cs[i][1]*w0,z0,x+cs[i][0]*w1,cs[i][1]*w1,z1,0.16);for(j=0;j<=n;j++){var t=j/n,w=w0+(w1-w0)*t,z=z0+(z1-z0)*t,w2=w0+(w1-w0)*(t+1/n),z2=z0+(z1-z0)*(t+1/n);for(i=0;i<4;i++){var a=cs[i],b=cs[(i+1)%4];seg(x+a[0]*w,a[1]*w,z,x+b[0]*w,b[1]*w,z,0.1);if(j<n)seg(x+a[0]*w,a[1]*w,z,x+b[0]*w2,b[1]*w2,z2,0.08);}}}
    function ak630(x,y,z){cl(0.85,0.95,1.2,10,mW,x,y,z+0.6,"z");var d=new THREE.Mesh(new THREE.SphereGeometry(0.95,10,7),mW);d.position.set(x,y,z+1.6);G.add(d);cl(0.26,0.28,1.9,8,mK,x+1.2,y,z+1.4,"x");}
    function dome(x,y,z,r){cl(r*0.8,r*0.9,1.1,10,mH,x,y,z+0.55,"z");var d=new THREE.Mesh(new THREE.SphereGeometry(r,12,8),mW);d.position.set(x,y,z+1.6);d.scale.set(1,1,0.88);G.add(d);}
    var S=[{x:-93,w:8.1,h:5.62,zc:4.62,sq:0.55},{x:-84,w:10.1,h:5.62,zc:4.62,sq:0.5},{x:-60,w:11.4,h:5.62,zc:4.62,sq:0.45},{x:-20,w:11.6,h:5.62,zc:4.62,sq:0.45},{x:15,w:11.5,h:5.62,zc:4.62,sq:0.45},{x:45,w:10.8,h:5.73,zc:4.73,sq:0.5},{x:65,w:9.6,h:6.27,zc:5.27,sq:0.58},{x:80,w:6.9,h:7.08,zc:6.08,sq:0.66},{x:89,w:3.5,h:7.68,zc:6.68,sq:0.74},{x:93,w:0.5,h:7.95,zc:6.95,sq:0.82}];
    G.add(new THREE.Mesh(M.loft(THREE,S,18),mH));
    bx(0.6,13,11.1,mH,-93.2,0,4.55);
    deck(S,DK,0,9,0.15);
    bx(1.6,17,0.9,mK,58,0,DK+0.45).rotation.y=-0.3;
    // AK-130 twin 130mm on the forecastle
    cl(3,3.2,1.7,12,mH,74,0,DK+0.55,"z");
    var T=new THREE.Group();T.name="turret";T.position.set(74,0,DK+1.4);G.add(T);
    var tgh=new THREE.Mesh(tb(8.6,5.6,3.2,0.62),mH);tgh.position.set(-0.6,0,1.6);T.add(tgh);
    var tfr=new THREE.Mesh(new THREE.CylinderGeometry(2.8,2.8,5.6,10,1,true).scale(1,1,0.6),mH);tfr.position.set(2.6,0,1.75);T.add(tfr);
    var q;for(q=0;q<2;q++){var gb=new THREE.Mesh(new THREE.CylinderGeometry(0.16,0.2,8.4,8).rotateZ(PI/2),mS);gb.position.set(6.8,q?0.75:-0.75,1.6);T.add(gb);var gs=new THREE.Mesh(new THREE.CylinderGeometry(0.44,0.47,2.3,8).rotateZ(PI/2),mK);gs.position.set(3.5,q?0.75:-0.75,1.6);T.add(gs);}
    // SIGNATURE: sixteen SS-N-12 tubes in eight angled pairs along the foredeck
    function ssn(x,y){var s=y>0?1:-1,i;var cr=new THREE.Mesh(tb(9,5.6,1.6,0.8),mH);cr.position.set(x,y-s*1.2,DK+0.8);G.add(cr);for(i=0;i<2;i++){var tu=new THREE.Group();tu.position.set(x,y+s*i*2.4,DK+3.6+i*0.15);tu.rotation.z=s*0.06;tu.rotation.y=-0.3;G.add(tu);var c1=new THREE.Mesh(new THREE.CylinderGeometry(1.12,1.12,12.4,10).rotateZ(PI/2),mH);tu.add(c1);var cp=new THREE.Mesh(new THREE.CylinderGeometry(1.18,1.18,0.55,10).rotateZ(PI/2),mK);cp.position.set(6.4,0,0);tu.add(cp);var bd=new THREE.Mesh(new THREE.BoxGeometry(1.6,2.5,2.5),mK);bd.position.set(-5.2,0,0);tu.add(bd);var rg=new THREE.Mesh(new THREE.CylinderGeometry(1.22,1.22,0.35,10).rotateZ(PI/2),mK);rg.position.set(1,0,0);tu.add(rg);}}
    ssn(8,6.9);ssn(19,6.9);ssn(30,6.9);ssn(41,6.9);
    ssn(8,-6.9);ssn(19,-6.9);ssn(30,-6.9);ssn(41,-6.9);
    // SA-N-4 point defence bins fore and aft
    cl(2.3,2.5,1.5,12,mH,60,0,DK+0.75,"z");cl(1.9,2,0.5,12,mK,60,0,DK+1.7,"z");
    cl(2.3,2.5,1.5,12,mH,-66,0,DK+0.75,"z");cl(1.9,2,0.5,12,mK,-66,0,DK+1.7,"z");
    // superstructure and bridge
    tbm(64,15,6.2,0.9,mH,18,0,DK+3.1);
    tbm(26,12.6,4,0.9,mH,38,0,DK+8.2);
    tbm(13,11,3.6,0.88,mH,44,0,DK+12);
    bx(0.4,9.2,1.6,mK,50.4,0,DK+12.8).rotation.y=-0.42;
    bx(5.6,0.4,1.4,mK,47,5.1,DK+12.7).rotation.x=0.3;
    bx(5.6,0.4,1.4,mK,47,-5.1,DK+12.7).rotation.x=-0.3;
    bx(3.4,16.4,0.45,mH,44,0,DK+13.9);
    bx(5,1.2,0.5,mT,-2,7.8,DK+6.1);bx(5,1.2,0.5,mT,-2,-7.8,DK+6.1);
    // tall pyramid lattice mast with yards and Top Steer array
    tower(22,DK+6.2,DK+23,4.4,1.3,5);
    bx(5,5.6,0.45,mH,22,0,DK+23.3);
    cl(0.22,0.3,8,6,mS,22,0,DK+27.4,"z");
    cl(0.11,0.11,13,4,mS,22,0,DK+13.4,"x");
    cl(0.11,0.11,9,4,mS,22,0,DK+18.4,"x");
    var ts=new THREE.Mesh(new THREE.BoxGeometry(0.6,8.4,2.9),mS);ts.position.set(22,0,DK+25.2);ts.rotation.y=-0.32;G.add(ts);
    seg(22,6.5,DK+13.4,22,2.4,DK+18.4,0.07);seg(22,-6.5,DK+13.4,22,-2.4,DK+18.4,0.07);
    cl(0.05,0.05,6,4,mS,12,5,DK+11,"z");cl(0.05,0.05,6,4,mS,12,-5,DK+11,"z");
    // big Top Dome director aft plus Front Dome directors
    tbm(20,14.4,5,0.9,mH,-40,0,DK+2.5);
    tbm(12,11,4,0.88,mH,-44,0,DK+7);
    dome(-44,0,DK+9,3.5);
    dome(51,0,DK+13.9,2.2);
    dome(28,6.4,DK+6.3,1.6);dome(28,-6.4,DK+6.3,1.6);
    dome(-24,0,DK+7.4,1.8);
    // SA-N-6 revolver launcher hatches on the after deck
    var i,j;for(i=0;i<4;i++)for(j=0;j<2;j++){var hx=-20-i*7.6,hy=(j?1:-1)*5.2;cl(2,2.1,0.45,10,mK,hx,hy,DK+0.2,"z");cl(1.55,1.55,0.55,10,mH,hx,hy,DK+0.3,"z");}
    // broad funnel with twin uptakes and team band
    var fu=new THREE.Mesh(tb(15,12,9.2,0.72),mH);fu.position.set(4,0,DK+7.8);fu.rotation.y=0.07;G.add(fu);
    bx(11.6,9.2,0.65,mK,3.4,0,DK+12.6);
    cl(1.15,1.25,2,10,mK,5.6,2.8,DK+13.5,"z");cl(1.15,1.25,2,10,mK,1.6,-2.8,DK+13.5,"z");
    bx(7.4,11,0.6,mT,3.6,0,DK+10.4);
    bx(8,0.45,1.6,mK,4,5.6,DK+8.6);bx(8,0.45,1.6,mK,4,-5.6,DK+8.6);
    // fantail: hangar door, helipad, AK-630 battery
    bx(0.6,7.4,5,mK,-70.4,0,DK+2.4);
    tbm(14,13,5.2,0.94,mH,-76,0,DK+2.6);
    pad(-81,0,DK+0.14,15,13);
    ak630(-6,8.4,DK+5.9);ak630(-6,-8.4,DK+5.9);ak630(-14,8.2,DK+5.9);ak630(-14,-8.2,DK+5.9);ak630(-56,7.4,DK+0.6);ak630(-56,-7.4,DK+0.6);
    boat(-32,8.8,DK+1.5,8.4);boat(-32,-8.8,DK+1.5,8.4);
    function tt(y){var s=y>0?1:-1,i;for(i=0;i<3;i++)cl(0.36,0.36,7.6,8,mK,-30,y+s*i*0.8,DK+1.2+i*0.7,"x");}
    tt(8.6);tt(-8.6);
    // railings, staffs, hull number
    rl2(62,8.6,84,4.6,DK);rl2(-92,6.2,-72,8.6,DK);rl2(-70,9,-50,9.6,DK);
    rl(-14,7.4,10,7.4,DK+6.4);rl(-14,-7.4,10,-7.4,DK+6.4);
    rl(47,5.2,47,-5.2,DK+14.1);
    cl(0.08,0.08,4.6,5,mS,-92,0,DK+2.3,"z");cl(0.08,0.08,4,5,mS,92,0,DK+5,"z");
    bx(1,0.6,1.1,mK,86,3,DK-1.2);bx(1,0.6,1.1,mK,86,-3,DK-1.2);
    bnum("011",7,82,4.9,6.6,0.16);
    return G;
  }
};
UNIT_MODELS["cruiser_c"] = {
  len: 180,
  build: function (THREE, M, C) {
    var G=new THREE.Group(),PI=Math.PI,R=Math.random;
    function NI(g){g=g.toNonIndexed();g.computeVertexNormals();return g;}
    function tb(a,b,c,t){return NI(new THREE.CylinderGeometry(t,1,c,4,1).rotateX(PI/2).rotateZ(PI/4).scale(a*0.7071,b*0.7071,1));}
    function cv(w,h,f){var c=document.createElement("canvas");c.width=w;c.height=h;f(c.getContext("2d"),w,h);return new THREE.CanvasTexture(c);}
    function pT(w,h,bg,cx,cy,fn){return cv(w,h,function(x,W,H){var i;x.fillStyle=bg;x.fillRect(0,0,W,H);for(i=0;i<42;i++){x.globalAlpha=0.06;x.fillStyle=i%2?"#000":"#fff";x.fillRect(R()*W,R()*H,40+R()*150,18+R()*60);}x.globalAlpha=0.3;x.strokeStyle="#2e3236";x.lineWidth=1.6;for(i=1;i<cx;i++){x.beginPath();x.moveTo(i*W/cx,0);x.lineTo(i*W/cx,H);x.stroke();}for(i=1;i<cy;i++){x.beginPath();x.moveTo(0,i*H/cy);x.lineTo(W,i*H/cy);x.stroke();}x.globalAlpha=1;if(fn)fn(x,W,H);});}
    var hullT=pT(1024,256,"#6d7378",34,10,function(x,W,H){var i;x.fillStyle="#24282b";x.fillRect(0,0.17*H,W,0.15*H);x.globalAlpha=0.12;x.fillStyle="#3a2b20";for(i=0;i<40;i++)x.fillRect(R()*W,0.33*H+R()*0.26*H,2+R()*4,14+R()*64);x.globalAlpha=1;});
    var deckT=pT(512,512,"#4b5054",12,12,function(x,W,H){var i;x.globalAlpha=0.45;x.fillStyle="#2b2f32";for(i=0;i<300;i++)x.fillRect(R()*W,R()*H,3,3);x.globalAlpha=1;});
    deckT.wrapS=deckT.wrapT=THREE.RepeatWrapping;deckT.repeat.set(0.045,0.045);
    var panT=cv(128,128,function(x,w,h){var i,j;x.fillStyle="#8d8f88";x.fillRect(0,0,w,h);x.fillStyle="rgba(0,0,0,0.3)";for(i=0;i<15;i++)for(j=0;j<15;j++)x.fillRect(i*8+3,j*8+3,4,4);x.strokeStyle="rgba(255,255,255,0.16)";x.lineWidth=3;x.strokeRect(2,2,w-4,h-4);});
    var mH=new THREE.MeshStandardMaterial({map:hullT,metalness:0.3,roughness:0.6});
    var mD=new THREE.MeshStandardMaterial({map:deckT,metalness:0.25,roughness:0.72});
    var mK=new THREE.MeshStandardMaterial({color:0x23272b,metalness:0.35,roughness:0.55});
    var mW=new THREE.MeshStandardMaterial({color:0xc9ced2,metalness:0.2,roughness:0.6});
    var mS=new THREE.MeshStandardMaterial({color:0x8d9398,metalness:0.85,roughness:0.3});
    var mP=new THREE.MeshStandardMaterial({map:panT,metalness:0.3,roughness:0.6});
    var mT=new THREE.MeshStandardMaterial({color:C.team,metalness:0.3,roughness:0.55});
    function bx(a,b,c,m,x,y,z){var s=new THREE.Mesh(new THREE.BoxGeometry(a,b,c),m);s.position.set(x,y,z);G.add(s);return s;}
    function cl(rt,rb,l,sg,m,x,y,z,ax){var g=new THREE.CylinderGeometry(rt,rb,l,sg);if(ax=="z")g.rotateX(PI/2);if(ax=="x")g.rotateZ(PI/2);var s=new THREE.Mesh(g,m);s.position.set(x,y,z);G.add(s);return s;}
    function tbm(a,b,c,t,m,x,y,z){var s=new THREE.Mesh(tb(a,b,c,t),m);s.position.set(x,y,z);G.add(s);return s;}
    var stG=new THREE.CylinderGeometry(0.045,0.045,1.15,4,1,true).rotateX(PI/2);
    function rl(x0,y0,x1,y1,z){var dx=x1-x0,dy=y1-y0,L=Math.sqrt(dx*dx+dy*dy),n=Math.max(2,Math.round(L/2.6)),i,g0=new THREE.Group();g0.position.set((x0+x1)/2,(y0+y1)/2,z);g0.rotation.z=Math.atan2(dy,dx);G.add(g0);for(i=0;i<=n;i++){var s=new THREE.Mesh(stG,mW);s.position.set(-L/2+L*i/n,0,0.57);g0.add(s);}var rg=new THREE.CylinderGeometry(0.05,0.05,L,4,1,true).rotateZ(PI/2);for(i=0;i<2;i++){var b=new THREE.Mesh(rg,mW);b.position.set(0,0,0.62+i*0.5);g0.add(b);}return g0;}
    function rl2(x0,y0,x1,y1,z){rl(x0,y0,x1,y1,z);rl(x0,-y0,x1,-y1,z);}
    function bnum(s,wd,x,y,z,tl){var t=cv(256,128,function(c,w,h){c.font="bold 92px Arial";c.fillStyle="#dfe3e6";c.textAlign="center";c.fillText(s,w/2,100);});var mm=new THREE.MeshStandardMaterial({map:t,transparent:true,metalness:0.2,roughness:0.6});var g=new THREE.PlaneGeometry(wd,wd/2).rotateX(PI/2);var a=new THREE.Mesh(g,mm);a.position.set(x,-y,z);a.rotation.x=-tl;G.add(a);var b=new THREE.Mesh(new THREE.PlaneGeometry(wd,wd/2).rotateY(PI).rotateX(PI/2),mm);b.position.set(x,y,z);b.rotation.x=tl;G.add(b);}
    function wAt(s,z){var e=s.sq||1,d=(z-(s.zc||0))/s.h;if(d>=1||d<=-1)return 0.06;return Math.max(s.w*Math.pow(Math.max(1-Math.pow(Math.abs(d),2/e),0),e/2),0.06);}
    function plz(S,z,n0,n1,ins){var p=[],i,y;for(i=n0;i<=n1;i++){y=Math.max(wAt(S[i],z)-(ins||0),0.06);p.push([S[i].x,y]);}for(i=n1;i>=n0;i--){y=Math.max(wAt(S[i],z)-(ins||0),0.06);p.push([S[i].x,-y]);}return p;}
    function deck(S,z,n0,n1,ins,th){th=th||0.3;var d=new THREE.Mesh(M.slab(THREE,plz(S,z,n0,n1,ins),th),mD);d.position.z=z-th;G.add(d);return d;}
    function vls(x,y,z,nx,ny,c){var lx=nx*c,ly=ny*c;bx(lx+0.9,ly+0.9,0.5,mK,x,y,z+0.18);var t=cv(256,256,function(g,w,h){var i,j,cw=w/nx,ch=h/ny;g.fillStyle="#3e4347";g.fillRect(0,0,w,h);for(i=0;i<nx;i++)for(j=0;j<ny;j++){var px=i*cw,py=j*ch;g.fillStyle="#15181a";g.fillRect(px+cw*0.09,py+ch*0.09,cw*0.82,ch*0.82);g.fillStyle="#6c7378";g.fillRect(px+cw*0.09,py+ch*0.09,cw*0.82,ch*0.1);g.fillStyle="rgba(255,255,255,0.12)";g.fillRect(px+cw*0.4,py+ch*0.14,cw*0.2,ch*0.7);}});var p=new THREE.Mesh(new THREE.PlaneGeometry(lx,ly),new THREE.MeshStandardMaterial({map:t,metalness:0.4,roughness:0.5}));p.position.set(x,y,z+0.44);G.add(p);}
    function oct(r,m,x,y,z,yaw,pit){var s=new THREE.Mesh(new THREE.CylinderGeometry(r,r,0.34,8).rotateY(PI/8).rotateZ(PI/2),m);s.position.set(x,y,z);s.rotation.z=yaw;s.rotation.y=pit||0;G.add(s);return s;}
    function spy(r,x,y,z,yaw,pit){oct(r+0.42,mK,x,y,z,yaw,pit);oct(r,mP,x+Math.cos(yaw)*0.2,y+Math.sin(yaw)*0.2,z,yaw,pit);}
    function pad(x,y,z,lx,ly){var t=cv(256,256,function(g,w,h){var i;g.fillStyle="#41464a";g.fillRect(0,0,w,h);for(i=0;i<26;i++){g.globalAlpha=0.07;g.fillStyle=i%2?"#34383c":"#4d5257";g.fillRect(R()*w,R()*h,40+R()*90,30+R()*70);}g.globalAlpha=1;g.strokeStyle="#d5d9dd";g.lineWidth=8;g.beginPath();g.arc(w/2,h/2,w*0.29,0,7);g.stroke();g.save();g.translate(w/2,h/2);g.rotate(PI/2);g.fillStyle="#d5d9dd";g.font="bold 118px Arial";g.textAlign="center";g.fillText("H",0,42);g.restore();});var p=new THREE.Mesh(new THREE.PlaneGeometry(lx,ly),new THREE.MeshStandardMaterial({map:t,metalness:0.2,roughness:0.8}));p.position.set(x,y,z);G.add(p);return p;}
    function boat(x,y,z,L){var s=y>0?1:-1;var b=new THREE.Mesh(tb(L,L*0.33,L*0.2,0.62),mK);b.position.set(x,y,z);G.add(b);bx(L*0.2,L*0.2,L*0.11,mW,x-L*0.13,y,z+L*0.15);cl(0.09,0.09,2.9,5,mS,x+L*0.34,y-s*0.5,z+1.5,"z");cl(0.09,0.09,2.9,5,mS,x-L*0.34,y-s*0.5,z+1.5,"z");cl(0.08,0.08,1.7,5,mS,x+L*0.34,y-s*0.05,z+2.85);cl(0.08,0.08,1.7,5,mS,x-L*0.34,y-s*0.05,z+2.85);}
    function dish(r,x,y,z,yaw){var d=new THREE.Mesh(new THREE.SphereGeometry(r,12,6,0,PI*2,0,PI*0.44).rotateZ(PI/2),mW);d.position.set(x,y,z);d.rotation.z=yaw||0;G.add(d);return d;}
    var DK=9.2;
    function ciws(x,y,z,aft){cl(1.1,1.25,1.6,10,mW,x,y,z+0.8,"z");var d=new THREE.Mesh(tb(2.2,2.5,1.6,0.55),mW);d.position.set(x,y,z+2.2);G.add(d);cl(0.32,0.36,2.8,10,mK,x+(aft?-1.7:1.7),y,z+2.1,"x");}
    function hq10(x,y,z,aft){var b=new THREE.Mesh(tb(3.6,6,2.6,0.85),mK);b.position.set(x,y,z+1.3);b.rotation.y=aft?0.24:-0.24;G.add(b);var i,j;for(i=0;i<6;i++)for(j=0;j<4;j++)cl(0.25,0.25,0.3,6,mS,x+(aft?-1.85:1.85),y-2.05+i*0.82,z+0.6+j*0.52,"x");}
    // tumblehome stealth hull, keel -1.0, knuckle rising to a flared stem
    var S=[{x:-90,w:8.3,h:5.51,zc:4.51,sq:0.55},{x:-80,w:10.1,h:5.51,zc:4.51,sq:0.48},{x:-56,w:11.2,h:5.51,zc:4.51,sq:0.44},{x:-18,w:11.3,h:5.51,zc:4.51,sq:0.44},{x:14,w:11.2,h:5.51,zc:4.51,sq:0.46},{x:44,w:10.5,h:5.62,zc:4.62,sq:0.5},{x:62,w:9.2,h:6.11,zc:5.11,sq:0.58},{x:76,w:6.5,h:6.92,zc:5.92,sq:0.66},{x:85,w:3.3,h:7.46,zc:6.46,sq:0.74},{x:90,w:0.5,h:7.68,zc:6.68,sq:0.82}];
    G.add(new THREE.Mesh(M.loft(THREE,S,18),mH));
    bx(0.6,13.4,10.7,mH,-90.2,0,4.35);
    deck(S,DK,0,9,0.15);
    bx(1.6,17,0.9,mK,62,0,DK+0.45).rotation.y=-0.32;
    // H/PJ-38 130mm stealth mount on a faceted barbette
    var bb=new THREE.Mesh(tb(7,6.4,1.7,0.8),mH);bb.position.set(70,0,DK+0.85);G.add(bb);
    var T=new THREE.Group();T.name="turret";T.position.set(70,0,DK+1.7);G.add(T);
    var tg=new THREE.Mesh(tb(8.6,4.9,3.4,0.4),mH);tg.position.set(-0.9,0,1.7);T.add(tg);
    var tn=new THREE.Mesh(tb(3.6,3.4,2.3,0.5),mH);tn.position.set(3.4,0,1.6);tn.rotation.y=0.12;T.add(tn);
    var bar=new THREE.Mesh(new THREE.CylinderGeometry(0.18,0.23,9,8).rotateZ(PI/2),mS);bar.position.set(7.4,0,1.6);T.add(bar);
    var slv=new THREE.Mesh(new THREE.CylinderGeometry(0.46,0.5,2.5,8).rotateZ(PI/2),mK);slv.position.set(4.1,0,1.6);T.add(slv);
    // 64 cells forward, 48 cells aft
    vls(50,0,DK,8,8,1.75);
    vls(-42,0,DK,8,6,1.75);
    // integrated deckhouse with tumblehome faces and four large AESA arrays
    tbm(76,16.4,6.4,0.82,mH,4,0,DK+3.2);
    tbm(40,13,4.4,0.84,mH,22,0,DK+8.6);
    tbm(16,11,3.8,0.84,mH,34,0,DK+12.7);
    bx(0.4,9,1.7,mK,41,0,DK+13.5).rotation.y=-0.46;
    bx(6.4,0.4,1.5,mK,37,5,DK+13.4).rotation.x=0.32;
    bx(6.4,0.4,1.5,mK,37,-5,DK+13.4).rotation.x=-0.32;
    bx(3.4,16,0.45,mH,34,0,DK+14.7);
    spy(2.6,35.4,5.2,DK+9.7,0.58,-0.16);spy(2.6,35.4,-5.2,DK+9.7,-0.58,-0.16);
    spy(2.6,7.6,6.2,DK+9.6,2.4,-0.16);spy(2.6,7.6,-6.2,DK+9.6,-2.4,-0.16);
    bx(5.4,1.3,0.55,mT,-26,7.9,DK+6.3);bx(5.4,1.3,0.55,mT,-26,-7.9,DK+6.3);
    // enclosed integrated mast block with X-band faces and radomes
    var mb=new THREE.Mesh(tb(13,11,9.4,0.5),mH);mb.position.set(17,0,DK+15.5);G.add(mb);
    spy(1.5,21.4,2.4,DK+16.6,0.5,-0.2);spy(1.5,21.4,-2.4,DK+16.6,-0.5,-0.2);
    spy(1.5,12.6,2.6,DK+16.6,2.5,-0.2);spy(1.5,12.6,-2.6,DK+16.6,-2.5,-0.2);
    var cap=new THREE.Mesh(tb(6,5.4,2.2,0.7),mH);cap.position.set(17,0,DK+21.3);G.add(cap);
    cl(0.24,0.32,7.4,6,mS,17,0,DK+26,"z");
    cl(0.1,0.1,7.6,4,mS,17,0,DK+24,"x");
    var d1=new THREE.Mesh(new THREE.SphereGeometry(1.9,12,8),mW);d1.position.set(-6,4.8,DK+10.6);G.add(d1);
    var d2=new THREE.Mesh(new THREE.SphereGeometry(1.9,12,8),mW);d2.position.set(-6,-4.8,DK+10.6);G.add(d2);
    cl(1.7,1.8,1,10,mH,-6,4.8,DK+9.3,"z");cl(1.7,1.8,1,10,mH,-6,-4.8,DK+9.3,"z");
    dish(1.8,-16,0,DK+11.9,PI);cl(1.6,1.7,1,10,mH,-16,0,DK+10.7,"z");
    // faceted funnel with team band
    var fu=new THREE.Mesh(tb(14,10.4,6.6,0.7),mH);fu.position.set(-18,0,DK+6.6);G.add(fu);
    bx(10.6,7.8,0.6,mK,-18,0,DK+10.1);
    cl(1,1.1,1.8,10,mK,-16.4,2.3,DK+10.8,"z");cl(1,1.1,1.8,10,mK,-19.6,-2.3,DK+10.8,"z");
    // twin-helicopter hangar, big flight deck, aft weapons
    tbm(20,15.6,6,0.93,mH,-60,0,DK+3);
    bx(0.5,5,5,mK,-50.2,3.9,DK+2.5);bx(0.5,5,5,mK,-50.2,-3.9,DK+2.5);
    bx(7,14.6,0.45,mH,-54,0,DK+6.2);
    ciws(-55,0,DK+6.4,1);hq10(-65,0,DK+6.2,0);
    ciws(38,0,DK+15,0);
    pad(-76,0,DK+0.14,17,15);
    bx(1.1,8.6,0.4,mW,-68,0,DK+0.18);
    function tt(y){var s=y>0?1:-1,i;for(i=0;i<3;i++)cl(0.3,0.3,6.6,8,mK,-32,y+s*i*0.72,DK+1.2+i*0.62,"x");}
    tt(8);tt(-8);
    boat(-10,8.8,DK+1.6,8);boat(-10,-8.8,DK+1.6,8);
    bx(1.8,1.8,1.5,mK,-46,7.8,DK+0.75);bx(1.8,1.8,1.5,mK,-46,-7.8,DK+0.75);
    // railings, staffs, hull number
    rl2(64,8.2,82,3.9,DK);rl2(-88,6.6,-74,8.9,DK);rl2(-72,9.2,-52,9.6,DK);
    rl(-34,7.2,-6,7.2,DK+6.5);rl(-34,-7.2,-6,-7.2,DK+6.5);
    rl(37,5.2,37,-5.2,DK+15);
    cl(0.08,0.08,4.6,5,mS,-89,0,DK+2.3,"z");cl(0.08,0.08,4,5,mS,89,0,DK+5,"z");
    bx(1,0.6,1.1,mK,83,2.8,DK-1.2);bx(1,0.6,1.1,mK,83,-2.8,DK-1.2);
    bnum("101",7,79,4.6,6.4,0.16);
    return G;
  }
};
