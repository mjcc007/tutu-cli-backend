/**
 * @Description: 这是一个包装类  来包装返回数据格式
 * @Author: chengcheng
 * @Date: Create in 12:50 2019/12/25
 * @Modified By:
 */

 export interface IResultVO {
  code: number;
  data: any;
  msg: string;
  success: boolean;
  currentTime: number;
 }

export class ResultVO {

  constructor( code:number, data:any, msg:string, success:boolean ) {
    this._result = {
      code: code,
      data: data,
      msg: msg,
      success: success,
      currentTime: Date.now()
    }
  }

  public static buildSuccess(data:any = null, msg:string = 'success'):IResultVO {
    return new ResultVO(20000, data, msg, true)._result;
  }
  public static buildError(code:number = -1, msg:string = 'faild', data:any = null):IResultVO {
    return new ResultVO(code, data, msg, false)._result;
  }
  public static buildCustom(code:number = -1, msg:string = 'faild', data:any = null, success:boolean = true):IResultVO {
    return new ResultVO(code, data, msg, success)._result;
  }

   private _result:IResultVO;
}




