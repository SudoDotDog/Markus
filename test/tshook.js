const tsnode = require("ts-node");

process.env = {
    ...process.env,
    NODE_ENV: 'test',
};

tsnode.register({
    project: 'typescript/tsconfig.test.json',
});