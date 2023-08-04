import { SecurityGroup } from '../src/impl/security_group';
import { IInputs } from '@serverless-devs/component-interface';
import { GLogger } from 'base_aliyun_resource';

GLogger.setLogger(console);

test('test sg', () => {
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
  const o = new SecurityGroup(input);
  expect(
    o.paramMapping({
      name: 'xl-test-sg',
      vpc_id: 'xxxxxx',
      security_group_type: 'normal',
      description: 'a test sg',
    }),
  ).toEqual({
    SecurityGroupName: 'xl-test-sg',
    VpcId: 'xxxxxx',
    SecurityGroupType: 'normal',
    Description: 'a test sg',
  });
});
