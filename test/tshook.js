const tsnode = require("ts-node")
tsnode.register({
    compilerOptions: {
        sourceMap: true,
        jsx: "react",
        strict: true,
        noImplicitReturns: true,
        noImplicitAny: true,
        module: "commonjs",
        experimentalDecorators: true,
        emitDecoratorMetadata: true,
        moduleResolution: "node",
        target: "es6",
        lib: [
            "dom",
            "es2016",
            "es2017",
            "es6",
        ]
    },
});