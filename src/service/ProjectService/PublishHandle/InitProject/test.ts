import * as path from "path";
import config from '../../../../config';
import * as shell from "shelljs";
import * as fs from "fs";
import InitProject from './index';

// test cp [ok]
// console.log(path.resolve(config.publish.projects_path))
// if (!fs.existsSync(path.resolve(config.publish.projects_path, 'test'))) {
//   shell.mkdir(path.resolve(config.publish.projects_path, 'test'));
// }
// shell.cp("-rf", path.resolve(config.publish.template_path, "./*"), path.resolve(config.publish.projects_path, 'test'))
// shell.cp("-rf", path.resolve(config.publish.template_path, "./.*"), path.resolve(config.publish.projects_path, 'test'))


// test remove files [ok]
let initProject = new InitProject(config.publish.template_path, config.publish.projects_path);
// initProject.removeItems('test')
let ret = initProject.InitProjectFromTemplate('test', "cctest");

console.log(ret)

// initProject.clean("test");

