import { ILibInfo } from "../../dao/LibMapper";
import { IConfigInfo } from "../../dao/ConfigMapper";
export default interface LibsAndConfigsInfo {
  lib: ILibInfo,
  config: IConfigInfo
}

