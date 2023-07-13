import { BaseAliyunResource } from 'base_aliyun_resource';

export class OTSInstance extends BaseAliyunResource {
  /* Cluster type, the default is SSD. 
      This parameter specifies the specification of the ots instance.
      When the value is SSD, the ots instance is a high - performance instance.
      When the value is HYBRID, the ots instance is a capacity instance
 */
  protected getRosParamMap(): object {
    return {
      name: 'InstanceName',
      accessed_by: 'Network',
      instance_type: 'ClusterType',
      description: 'Description',
    };
  }

  protected getRosValueMap(): object {
    return {
      Any: 'NORMAL',
      Vpc: 'VPC',
      ConsoleOrVpc: 'VPC_CONSOLE',
      HighPerformance: 'SSD',
      Capacity: 'HYBRID',
    };
  }

  protected getRosInitTemplateResource(): any {
    return {
      Type: 'ALIYUN::OTS::Instance',
      Properties: {},
    };
  }
}
