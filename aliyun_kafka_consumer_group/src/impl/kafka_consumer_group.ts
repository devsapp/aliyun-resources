import { BaseAliyunResource } from 'base_aliyun_resource';

export class KafkaConsumerGroup extends BaseAliyunResource {
  protected getRosParamMap(): object {
    return {
      instance_id: 'InstanceId',
      consumer_id: 'ConsumerId',
      description: 'Remark',
    };
  }

  protected getRosInitTemplateResource(): any {
    return {
      Type: 'ALIYUN::KAFKA::ConsumerGroup',
      Properties: {},
    };
  }
}
