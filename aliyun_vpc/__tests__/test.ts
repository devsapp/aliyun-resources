import { Vpc } from '../src/impl/vpc';
import { IInputs } from '@serverless-devs/component-interface';
import { GLogger } from 'base_aliyun_resource';

GLogger.setLogger(console);

test('test vpc', () => {
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
  const o = new Vpc(input);
  expect(
    o.paramMapping({
      vpc_name: 'xl-test-vpc',
      cidr_block: '172.16.0.0 / 12',
      secondary_cidr_blocks: ['172.16.0.0/12'],
      description: 'a test vpc',
    }),
  ).toEqual({
    VpcName: 'xl-test-vpc',
    CidrBlock: '172.16.0.0 / 12',
    SecondaryCidrBlocks: ['172.16.0.0/12'],
    Description: 'a test vpc',
  });
});
