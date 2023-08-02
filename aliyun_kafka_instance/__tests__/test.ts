import { KafkaInstance } from '../src/impl/kafka_instance';
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
  const o = new KafkaInstance(input);
  expect(o.paramMapping(
    {
      paid_type: 'PostPaid',
      spec_type: 'normal',
      io_max: 20,
      disk_type: 0,
      disk_size: 900,
      partition_num: 0,
      deploy_type: 5,
      name: 'xl-kaf-inst',
      zone_id: 'cn-hangzhou-g',
      vpc_id: 'xxx_vpc_id',
      vswitch_id: 'xxx_vswitch_id',
      service_version: '2.2.0',
      config: {
        'enable.vpc_sasl_ssl': false,
        'enable.acl': false,
        'kafka.log.retention.hours': 72,
        'kafka.message.max.bytes': 1
      }
    }
  )).toEqual({
    PayType: 'Hour',
    SpecType: 'normal',
    IoMax: 20,
    DiskType: 0,
    DiskSize: 900,
    PartitionNum: 0,
    DeployType: 5,
    Name: 'xl-kaf-inst',
    ZoneId: 'cn-hangzhou-g',
    VpcId: 'xxx_vpc_id',
    VSwitchId: 'xxx_vswitch_id',
    ServiceVersion: '2.2.0',
    Config: {
      'enable.vpc_sasl_ssl': false,
      'enable.acl': false,
      'kafka.log.retention.hours': 72,
      'kafka.message.max.bytes': 1
    }
  });
});