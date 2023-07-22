import { IInputs } from '@serverless-devs/component-interface';

class BaseAliyunResource {
  protected _inputs: IInputs;
  constructor(input: IInputs) {
    this._inputs = input;
  }

  protected getProps(): any {
    return this._inputs.props;
  }

  protected getProject(): any {
    return this._inputs.resource;
  }

  protected getProjectName(): any {
    return this.getProject().name;
  }

  protected async getAccountID(): Promise<string> {
    const credential = await this._inputs.getCredential();
    return credential.AccountID as string;
  }

  protected getRosParamMap(): object {
    return {};
  }

  protected getRosValueMap(): object {
    return {};
  }

  protected getRosInitTemplateResource(): any {
    return {
      Type: '',
      Properties: {},
    };
  }

  protected customRosValueHandle(val: any): any {
    if (this.isString(val) && val.includes('Fn::GetAtt')) {
      return JSON.parse(val);
    }
    return val;
  }

  protected isObject(value: any) {
    return Object.prototype.toString.call(value) === '[object Object]';
  }

  protected isArray(value: any) {
    return Object.prototype.toString.call(value) === '[object Array]';
  }

  protected isString(value: any) {
    return Object.prototype.toString.call(value) === '[object String]';
  }

  protected paramMapping(props: object): object {
    const logger = GLogger.getLogger();
    let paramMap = this.getRosParamMap();
    let ret = {};

    for (let key in props) {
      if (!(key in paramMap)) {
        logger.error(`${key} not in ${paramMap}`);
        continue;
      }
      const newKey = paramMap[key];
      logger.debug(`key map ==>  ${key} : ${newKey}`);
      let value = props[key];
      if (this.isObject(value)) {
        ret[newKey] = this.paramMapping(value);
      } else if (this.isArray(value)) {
        let newV = new Array<object>();
        for (const o of value) {
          logger.debug(o, Object.prototype.toString.call(o));
          if (this.isString(o)) {
            newV.push(o);
          } else {
            newV.push(this.paramMapping(o));
          }
        }
        ret[newKey] = newV;
      } else {
        if (value in this.getRosValueMap()) {
          const newV = this.getRosValueMap()[value];
          logger.debug(`value map ==>  ${value} : ${newV}`);
          ret[newKey] = newV;
        } else {
          ret[newKey] = this.customRosValueHandle(value);
        }
      }
    }
    return ret;
  }

  public async deploy(): Promise<object> {
    const logger = GLogger.getLogger();
    let ret = {
      resourceTemplate: this.getRosInitTemplateResource(),
      resourceId: this.getProjectName(),
    };

    let props = this.getProps();
    const depends_on = props.depends_on as Array<string>;
    if (depends_on !== undefined) {
      delete props.depends_on;
      if (depends_on.length > 0) {
        ret.resourceTemplate.DependsOn = depends_on;
      }
    }
    ret.resourceTemplate.Properties = this.paramMapping(props);
    logger.debug(`deploy result:\n${JSON.stringify(ret)}`);
    return ret;
  }
}

class GLogger {
  private static instance: any;
  private constructor() {}

  static getLogger(): any {
    if (!GLogger.instance) {
      throw new Error('instance must be init before call getLogger');
    }
    return GLogger.instance;
  }

  static setLogger(logger: any) {
    GLogger.instance = logger;
  }
}

export { BaseAliyunResource, GLogger };
