import { SLSProject } from '../src/impl/project';
import { IInputs } from '@serverless-devs/component-interface';
import { GLogger } from 'base_aliyun_resource';

GLogger.setLogger(console);

test('test sls log project', () => {
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
  const o = new SLSProject(input);
  expect(
    o.paramMapping({
      name: 'xl-test-project',
      description: 'xiliu test log project',
    }),
  ).toEqual({
    Name: 'xl-test-project',
    Description: 'xiliu test log project',
  });
});
