import * as fs from 'fs';
import { Icon } from './icon/icon';


console.log();
fs.writeFileSync('./a.svg', Icon('test'));
