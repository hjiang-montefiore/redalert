// Run a JavaScriptCore shell script under Node: node jscnode.js SCRIPT -- args...
const fs=require('fs'),vm=require('vm'),path=require('path');
const script=path.resolve(process.argv[2]);
let args=process.argv.slice(3); if(args[0]==='--') args=args.slice(1);
const ctx={arguments:args,console};
ctx.globalThis=ctx; ctx.self=ctx;
const stack=[script];
ctx.callerSourceOrigin=()=> 'file://'+stack[stack.length-1];
ctx.print=(...a)=>process.stdout.write(a.join(' ')+'\n');
ctx.printErr=(...a)=>process.stderr.write(a.join(' ')+'\n');
ctx.readFile=(p)=>fs.readFileSync(p,'utf8');
ctx.read=ctx.readFile;
ctx.writeFile=(p,s)=>{fs.writeFileSync(p,s);return s.length;};
ctx.preciseTime=()=>Date.now()/1000;
ctx.quit=(c)=>process.exit(c||0);
vm.createContext(ctx);
ctx.load=(p)=>{p=path.resolve(p);stack.push(p);try{return vm.runInContext(fs.readFileSync(p,'utf8'),ctx,{filename:p});}finally{stack.pop();}};
ctx.load(script);
