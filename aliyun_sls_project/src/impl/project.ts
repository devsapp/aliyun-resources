import { BaseAliyunResource } from 'base_aliyun_resource';

export class SLSProject extends BaseAliyunResource {
  protected getRosParamMap(): object {
    return {
      name: 'Name',
      description: 'Description',
    };
  }

  protected getRosInitTemplateResource(): any {
    return {
      Type: 'ALIYUN::SLS::Project',
      Properties: {},
    };
  }
}
