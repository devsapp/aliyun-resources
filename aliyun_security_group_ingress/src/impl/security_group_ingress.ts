import { BaseAliyunResource } from 'base_aliyun_resource';

export class SecurityGroupIngress extends BaseAliyunResource {
  protected getRosParamMap(): object {
    return {
      security_group_id: 'SecurityGroupId',
      ip_protocol: 'IpProtocol',
      port_range: 'PortRange',
      cidr_ip: 'SourceCidrIp',
      priority: 'Priority',
      policy: 'Policy',
      nic_type: 'NicType',
      description: 'Description',
    };
  }

  protected getRosInitTemplateResource(): any {
    return {
      Type: 'ALIYUN::ECS::SecurityGroupIngress',
      Properties: {},
    };
  }
}