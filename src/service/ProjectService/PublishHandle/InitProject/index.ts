/**
 *
 */
import * as shell from "shelljs";
// import * as replace from "replace-in-file";
import * as path from "path";
import * as fs from "fs";
const replace = require("replace-in-file")


const LIBRARY_NAME = "library";
const LIBRARY_NAME_PALCEHOLDER = "--libraryname--"


/**
 * 根据选项初始化工程
 */
export default class InitProject {
  constructor(templatePath:string, projectsPath:string) {
    this.mTemplatePath = templatePath;
    this.mProjectPath = projectsPath;
  }


  /**
   * 初始化项目工程
   * @param projectId
   * @param libraryName
   */
  public InitProjectFromTemplate(projectId:string, libraryName:string):boolean {
    if (!this.mvFromTemplate(projectId)) {
      return false;
    };
    if (!this.removeItems(projectId)) {
      this.clean(projectId);
      return false;
    }
    if (!this.modifyContents(projectId, libraryName)) {
      this.clean(projectId);
      return false;
    }
    if (!this.renameItems(projectId, libraryName)) {
      this.clean(projectId);
      return false;
    }
    return true;
  }

  /**
   * 初始化导出模块
   * @param id
   * @param libs
   */
  public async getSrcTemp(projectId:string, libraryName:string, libs:any) {
    return new Promise((resolve, reject) => {
      let srcStrImp = "";
      let jsonConfig = "";
      let srcInit = "";
      let srcStrExp = "export { \r\n";

      libs.forEach((item:any) => {
        let name = this.getUpperCaseName(item.name);
        srcStrImp += `import ${item.name} from '${item.name}'; \r\n`
        jsonConfig += `const ${item.name}_config = ${JSON.stringify(item.config)}; \r\n`
        srcInit += `const ${name} = new ${item.name}(${item.name}_config); \r\n`
        srcStrExp += `  ${name}, \r\n`
      })
      srcStrExp += "}";
      const codeStr = srcStrImp + jsonConfig + srcInit + srcStrExp
      fs.writeFile(path.resolve(this.mProjectPath,  `./${projectId}`, `./src/${libraryName}.ts`,), codeStr, (err) => {
        if (err) {
          console.log(err)
          reject(false)
        }
        resolve(true)
      })
    })
  }

  /**
   * 清理工程
   * @param projectId
   */
  public clean(projectId:string) {
    const projectPath = path.resolve(this.mProjectPath, projectId)
    if (fs.existsSync(projectPath)) {
      shell.rm("-rf", projectPath);
    }
  }
  /**
   * copy 模板工程
   * @param projectid 项目名称
   */
  private mvFromTemplate (projectid:string):boolean {
    const projectPath = path.resolve(this.mProjectPath, projectid)
    if (!fs.existsSync(projectPath)) {
      shell.mkdir(projectPath);
    }
    if (!this.getExitResult()) return false

    shell.cp("-rf", path.resolve(this.mTemplatePath, "./*"), projectPath)
    if (!this.getExitResult()) return false

    shell.cp("-rf", path.resolve(this.mTemplatePath, "./.*"), projectPath)
    if (!this.getExitResult()) return false
    return true
  }

  /**
   * 移除相关模块
   * @param projectid
   */
  private removeItems(projectid: string):boolean {
    let ret = true
    let rmItems = this.getRmDir().concat(this.getRmFiles())
    shell.rm("-rf", rmItems.map(f => path.resolve(path.resolve(this.mProjectPath), `./${projectid}`, f)))
    ret = this.getExitResult();
    return ret
  }

  /**
   * 修改库名称
   * @param projectid
   * @param libraryName
   * @param username
   * @param usermail
   */
  private modifyContents(projectid: string, libraryName:string):boolean {
    let files = this.getModifyFiles().map(f => path.resolve(this.mProjectPath, `./${projectid}`, f))
    try {
      let nameReg = new RegExp(`${LIBRARY_NAME_PALCEHOLDER}`, 'g')
      const changes = replace.sync({
        files,
        from: [nameReg],
        to: [libraryName]
      })
      return true
    } catch (error) {
      console.error("An error occurred modifying the file: ", error)
      return false
    }
  }

  /**
   * 修改文件名称
   * @param projectId
   * @param libraryName
   */
  private renameItems(projectId:string, libraryName: string):boolean {
    this.getRenameFiles().forEach((files) => {
      let nameReg = new RegExp(`${LIBRARY_NAME_PALCEHOLDER}`, 'g')
      // Files[0] is the current filename
      // Files[1] is the new name
      let newFilename = files[1].replace(nameReg, libraryName)
      shell.mv(
        path.resolve(this.mProjectPath, `./${projectId}`, files[0]),
        path.resolve(this.mProjectPath, `./${projectId}`, newFilename)
      )
      if (!this.getExitResult()) return false
    })
    return true
  }

  private getRmDir () {
    return [
      ".git"
    ]
  }

  private getRmFiles () {
    return [
      ".all-contributorsrc",
      ".gitattributes",
    ]
  }

  private getModifyFiles () {
    return [
      "LICENSE",
      "package.json",
      "rollup.config.ts",
      `test/${LIBRARY_NAME}.test.ts`,
      "tools/gh-pages-publish.ts"
    ]
  }

  private getRenameFiles () {
    return [
      [
       `./src/${LIBRARY_NAME}.ts`,
       `./src/${LIBRARY_NAME_PALCEHOLDER}.ts`
      ],
      [
        `./test/${LIBRARY_NAME}.test.ts`,
        `./test/${LIBRARY_NAME_PALCEHOLDER}.test.ts`
      ]
    ]
  }

  private getUpperCaseName = (name:string) => {
    return name.charAt(0).toUpperCase() + name.slice(1)
  }

  private getExitResult () {
     return shell.error() === null ? true : false;
  }

  private mTemplatePath:string;
  private mProjectPath: string;
}




















