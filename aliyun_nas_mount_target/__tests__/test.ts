import { NasMountTarget } from '../src/impl/nas_mount_target';
import { IInputs } from '@serverless-devs/component-interface';
import { GLogger } from 'base_aliyun_resource';

GLogger.setLogger(console);


test('test nas mount target', () => {
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
  const o = new NasMountTarget(input);
  expect(o.paramMapping(
    {
      file_system_id: 'xxxx',
      access_group_name: 'DEFAULT_VPC_GROUP_NAME',
      vswitch_id: 'yyyy',
      status: 'Active',
      security_group_id: 'zzzzz'
    }
  )).toEqual({
    FileSystemId: 'xxxx',
    AccessGroupName: 'DEFAULT_VPC_GROUP_NAME',
    VSwitchId: 'yyyy',
    Status: 'Active',
    SecurityGroupId: 'zzzzz'
  });
});