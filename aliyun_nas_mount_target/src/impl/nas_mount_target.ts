import { BaseAliyunResource } from 'base_aliyun_resource';

export class NasMountTarget extends BaseAliyunResource {
  protected getRosParamMap(): object {
    return {
      file_system_id: 'FileSystemId',
      access_group_name: 'AccessGroupName',
      vswitch_id: 'VSwitchId',
      vpc_id: 'VpcId',
      status: 'Status',
      security_group_id: 'SecurityGroupId',
      network_type: 'NetworkType',
    };
  }

  protected getRosValueMap(): object {
    return {
      VPC: 'Vpc',
    };
  }

  protected getRosInitTemplateResource(): any {
    return {
      Type: 'ALIYUN::NAS::MountTarget',
      Properties: {},
    };
  }
}
