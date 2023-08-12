import { KafkaConsumerGroup } from '../src/impl/kafka_consumer_group';
import { IInputs } from '@serverless-devs/component-interface';
import { GLogger } from 'base_aliyun_resource';

GLogger.setLogger(console);

test('test kafka topic', () => {
  const input: IInputs = {
    props: {},
    command: '',
    yaml: {
      path: '',
    },
    resource: {
      name: '',
      component: '',
      access: '',
    },
    args: [],
    cwd: '',
    getCredential: () => {
      return new Promise((resolve, reject) => {});
    },
  };
  const o = new KafkaConsumerGroup(input);
  expect(
    o.paramMapping({
      instance_id: 'inst-111',
      consumer_id: 'consumer-111',
      description: 'test desc',
    }),
  ).toEqual({
    InstanceId: 'inst-111',
    ConsumerId: 'consumer-111',
    Remark: 'test desc',
  });
});
