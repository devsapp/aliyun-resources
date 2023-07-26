import { BaseAliyunResource } from 'base_aliyun_resource';

export class Vswitch extends BaseAliyunResource {
  protected getRosParamMap(): object {
    return {
      vswitch_name: 'VSwitchName',
      cidr_block: 'CidrBlock',
      vpc_id: 'VpcId',
      description: 'Description',
      zone_id: 'ZoneId',
    };
  }

  protected getRosInitTemplateResource(): any {
    return {
      Type: 'ALIYUN::ECS::VSwitch',
      Properties: {},
    };
  }

  public async deploy(): Promise<object> {
    let ret = (await super.deploy()) as any;
    ret['vSwitchId'] = JSON.stringify({ 'Fn::GetAtt': [ret.resourceId, 'VSwitchId'] });
    return ret;
  }
}
