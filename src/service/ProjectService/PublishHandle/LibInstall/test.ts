import * as path from "path";
import config from '../../../../config';
import { npmInstall, npmLib } from './index';



npmInstall(path.resolve(config.publish.projects_path, "./test")).then(
  (ret) => {
    console.log(ret)
  }
).catch(
  (err) => {
    console.log(err)
  }
);

npmLib(path.resolve(config.publish.projects_path, "./test"), "east-china-sea-project").then((ret) => {
  console.log(ret)
}).catch((ret) => {
  console.log(ret)
})

