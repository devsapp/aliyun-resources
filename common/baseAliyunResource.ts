import { InputProps } from './interface';
export class BaseAliyunResource {
  _inputs: InputProps;
  constructor(input: InputProps) {
    this._inputs = input;
  }

  protected getProps(): any {
    return this._inputs.props;
  }

  protected getProject(): any {
    return this._inputs.project;
  }

  protected getProjectName(): any {
    return this.getProject().projectName;
  }

  protected getAccountID(): string {
    const credentials = this._inputs.credentials;
    return credentials.AccountID as string;
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

  protected paramMapping(props: object): object {
    let paramMap = this.getRosParamMap();
    let ret = {};

    for (let key in props) {
      if (!(key in paramMap)) {
        console.error(`${key} not in ${paramMap}`);
        continue;
      }
      const newKey = paramMap[key];
      console.debug(key + ': ' + newKey);
      let value = props[key];
      if (Object.prototype.toString.call(value) === '[object Object]') {
        ret[newKey] = this.paramMapping(value);
      } else {
        if (value in this.getRosValueMap()) {
          ret[newKey] = this.getRosValueMap()[value];
        } else {
          ret[newKey] = value;
        }
      }
    }
    return ret;
  }

  public async deploy(): Promise<object> {
    let ret = {
      resourceTemplate: this.getRosInitTemplateResource(),
      resourceId: this.getProjectName(),
    };

    const props = this.getProps();
    ret.resourceTemplate.Properties = this.paramMapping(props);
    return ret;
  }
}
