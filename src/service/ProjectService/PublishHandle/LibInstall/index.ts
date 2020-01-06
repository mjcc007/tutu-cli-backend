import * as nodefork  from 'child_process';
import * as path from "path";
import * as fs from "fs"
import config from '../../../../config';

export const npmInstall = async (path:string) => {
  return new Promise((resolve, reject) => {
    let npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    nodefork.exec(
      npmCmd + ' install' + ` --registry=${config.npm.npm_registry}`,
      {cwd: path},
      (error, stdout, stderr) => {
        console.log(error)
        if (error) reject(false)
        resolve(true)
    });
  })
}

export const npmInstallLib = async (path:string, libname:string, npmRegistry:string) => {
  return new Promise((resolve, reject) => {
    let npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    nodefork.exec(
      `${npmCmd} install ${libname} -S --registry=${npmRegistry}`,
      {cwd: path},
      (error, stdout, stderr) => {
        console.log(error)
        if (error) reject(false)
        resolve(true)
    });
  })
}


export const npmUpdateLib = async (path:string, libname:string, npmRegistry:string) => {
  return new Promise((resolve, reject) => {
    let npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    nodefork.exec(
      `${npmCmd} update ${libname} -S --registry=${npmRegistry}`,
      {cwd: path},
      (error, stdout, stderr) => {
        console.log(error)
        if (error) reject(false)
        resolve(true)
    });
  })
}



