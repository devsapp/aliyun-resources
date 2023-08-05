import { BaseAliyunResource } from 'base_aliyun_resource';

export class KafkaInstance extends BaseAliyunResource {
  protected getRosParamMap(): object {
    return {
      paid_type: 'PayType',
      spec_type: 'SpecType',
      io_max_spec: 'IoMaxSpec',
      io_max: 'IoMax',
      disk_type: 'DiskType',
      disk_size: 'DiskSize',
      partition_num: 'PartitionNum',
      deploy_type: 'DeployType',
      name: 'Name',
      zone_id: 'ZoneId',
      vpc_id: 'VpcId',
      vswitch_id: 'VSwitchId',
      service_version: 'ServiceVersion',
      config: 'Config',
      'enable.vpc_sasl_ssl': 'enable.vpc_sasl_ssl',
      'enable.acl': 'enable.acl',
      'kafka.log.retention.hours': 'kafka.log.retention.hours',
      'kafka.message.max.bytes': 'kafka.message.max.bytes',
    };
  }

  protected getRosValueMap(): object {
    return {
      PrePaid: 'Month',
      PostPaid: 'Hour',
    };
  }

  protected getRosInitTemplateResource(): any {
    return {
      Type: 'ALIYUN::KAFKA::Instance',
      Properties: {},
    };
  }

  public async deploy(): Promise<object> {
    let ret = (await super.deploy()) as any;
    let props = ret.resourceTemplate.Properties;
    props.DeployOption = {
      Name: props.Name,
      ZoneId: props.ZoneId,
      VpcId: props.VpcId,
      VSwitchId: props.VSwitchId,
      ServiceVersion: props.ServiceVersion,
      Config: props.Config,
    };
    delete props.Name;
    delete props.ZoneId;
    delete props.VpcId;
    delete props.VSwitchId;
    delete props.ServiceVersion;
    delete props.Config;

    if (props.DeployType == 5) {
      props.DeployOption.DeployModule = 'vpc';
    } else {
      props.DeployOption.DeployModule = 'eip';
    }

    ret['instanceId'] = JSON.stringify({ 'Fn::GetAtt': [ret.resourceId, 'InstanceId'] });
    return ret;
  }
}
