import { BaseAliyunResource } from 'base_aliyun_resource';

export class KafkaTopic extends BaseAliyunResource {
  protected getRosParamMap(): object {
    return {
      instance_id: 'InstanceId',
      topic: 'Topic',
      local_topic: 'LocalTopic',
      partition_num: 'PartitionNum',
      remark: 'Remark',
    };
  }

  protected getRosInitTemplateResource(): any {
    return {
      Type: 'ALIYUN::KAFKA::Topic',
      Properties: {},
    };
  }
}
