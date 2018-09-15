const tsnode = require("ts-node");

process.env = Object.assign(process.env, {
    NODE_ENV: 'test',
});

tsnode.register({
    project: 'typescript/tsconfig.test.json',
});