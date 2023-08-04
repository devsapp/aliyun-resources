import { OTSInstance } from '../src/impl/instance';
import { IInputs } from '@serverless-devs/component-interface';
import { GLogger } from 'base_aliyun_resource';

GLogger.setLogger(console);

test('test ots instance', () => {
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
  const o = new OTSInstance(input);
  expect(
    o.paramMapping({
      name: 'xl-test-inst',
      accessed_by: 'Any',
      description: 'xiliu test instance',
      instance_type: 'HighPerformance',
    }),
  ).toEqual({
    InstanceName: 'xl-test-inst',
    Network: 'NORMAL',
    Description: 'xiliu test instance',
    ClusterType: 'SSD',
  });
});
