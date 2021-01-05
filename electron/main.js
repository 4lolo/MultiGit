require('ts-node').register({
  compilerOptions: {
    "baseUrl": "./",
    "outDir": "./dist",
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "moduleResolution": "node",
    "importHelpers": true,
    "target": "es2015",
    "module": "CommonJS",
    "lib": [
      "es2018",
      "dom"
    ]
  }
}); // This will register the TypeScript compiler
require('./src'); // This will load our Typescript application
