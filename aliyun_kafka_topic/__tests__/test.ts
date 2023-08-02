import { KafkaTopic } from '../src/impl/kafka_topic';
import { IInputs } from '@serverless-devs/component-interface';
import { GLogger } from 'base_aliyun_resource';

GLogger.setLogger(console);


test('test oss bucket', () => {
  const input: IInputs = {
    props: {},
    command: '',
    yaml: {
      path: ''
    },
    resource: {
      name: "",
      component: "",
      access: "",
    },
    args: [],
    cwd: '',
    getCredential: () => {
      return new Promise((resolve, reject) => { });
    },
  };
  const o = new KafkaTopic(input);
  expect(o.paramMapping(
    {
      instance_id: 'inst-111',
      topic: 'xl-topic',
      local_topic: false,
      partition_num: 12,
      remark: 'test remark',
    }
  )).toEqual({
    InstanceId: 'inst-111',
    Topic: 'xl-topic',
    LocalTopic: false,
    PartitionNum: 12,
    Remark: 'test remark'
  });
});