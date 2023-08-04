import { Vswitch } from '../src/impl/vswitch';
import { IInputs } from '@serverless-devs/component-interface';
import { GLogger } from 'base_aliyun_resource';

GLogger.setLogger(console);

test('test vswitch', () => {
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
  const o = new Vswitch(input);
  expect(
    o.paramMapping({
      vswitch_name: 'xl-test-vswitch',
      cidr_block: '172.16.0.0/12',
      vpc_id: 'xxxxxx',
      zone_id: 'cn-hangzhou-k',
      description: 'a test vswitch',
    }),
  ).toEqual({
    VSwitchName: 'xl-test-vswitch',
    CidrBlock: '172.16.0.0/12',
    VpcId: 'xxxxxx',
    ZoneId: 'cn-hangzhou-k',
    Description: 'a test vswitch',
  });
});
