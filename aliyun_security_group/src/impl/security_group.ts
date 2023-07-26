import { BaseAliyunResource } from 'base_aliyun_resource';

export class SecurityGroup extends BaseAliyunResource {
  protected getRosParamMap(): object {
    return {
      name: 'SecurityGroupName',
      security_group_type: 'SecurityGroupType',
      vpc_id: 'VpcId',
      description: 'Description',
    };
  }

  protected getRosInitTemplateResource(): any {
    return {
      Type: 'ALIYUN::ECS::SecurityGroup',
      Properties: {},
    };
  }

  public async deploy(): Promise<object> {
    let ret = (await super.deploy()) as any;
    ret['securityGroupId'] = JSON.stringify({ 'Fn::GetAtt': [ret.resourceId, 'SecurityGroupId'] });
    return ret;
  }
}
