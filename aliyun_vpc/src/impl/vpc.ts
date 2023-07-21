import { BaseAliyunResource } from 'base_aliyun_resource';

export class Vpc extends BaseAliyunResource {
  protected getRosParamMap(): object {
    return {
      vpc_name: 'VpcName',
      cidr_block: 'CidrBlock',
      secondary_cidr_blocks: 'SecondaryCidrBlocks',
      description: 'Description',
    };
  }

  protected getRosInitTemplateResource(): any {
    return {
      Type: 'ALIYUN::ECS::VPC',
      Properties: {},
    };
  }

  public async deploy(): Promise<object> {
    let ret = (await super.deploy()) as any;
    ret['vpcId'] = JSON.stringify({ 'Fn::GetAtt': [ret.resourceId, 'VpcId'] });
    return ret;
  }
}
