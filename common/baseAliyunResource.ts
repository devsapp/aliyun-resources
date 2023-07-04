
export interface ICredentials {
  AccountID?: string;
  AccessKeyID?: string;
  AccessKeySecret?: string;
  SecurityToken?: string;
  SecretID?: string;
  SecretKey?: string;
  SecretAccessKey?: string;
  KeyVaultName?: string;
  TenantID?: string;
  ClientID?: string;
  ClientSecret?: string;
  PrivateKeyData?: string
}

export interface InputProps {
  props: any; // 用户自定义输入
  credentials: ICredentials; // 用户秘钥
  appName: string; // 
  project: {
    component: string; // 组件名（支持本地绝对路径）
    access: string; // 访问秘钥名
    projectName: string; // 项目名
  };
  command: string; // 执行指令
  args: string; // 命令行 扩展参数
  argsObj: any;
  path: {
    configPath: string // 配置路径
  }
}


export class BaseAliyunResource {
  _inputs: InputProps;
  _engine: string
  constructor(input: InputProps) {
    this._inputs = input;
    this._engine = this._inputs.props?.engine || 'ros';
    if ('engine' in this._inputs.props) {
      delete this._inputs.props['engine'];
    }
  }

  protected getProps(): any {
    return this._inputs.props;
  }

  protected getEngine(): string {
    return this._engine
  }

  protected getAccountID(): string {
    const credentials = this._inputs.credentials
    return credentials.AccountID as string;
  }

  protected getRosParamMap(): object {
    return {}
  }

  protected getRosInitTemplate(): any {
    return {}
  }

  public async deploy(): Promise<object> {
    if (this.getEngine() !== 'ros') {
      throw new Error(`UnSupported Engine: ${this.getEngine()}`);
    }
    let ret = {
      "resource": this.getRosInitTemplate()
    };
    const props = this.getProps();
    let paramMap = this.getRosParamMap();

    for (let key in props) {
      if (!(key in paramMap)) {
        console.error(`${key} not in ${paramMap}`)
        continue;
      }
      console.debug(key + ': ' + paramMap[key]);
      ret.resource.Properties[paramMap[key]] = props[key];
    }
    return ret;
  }
}