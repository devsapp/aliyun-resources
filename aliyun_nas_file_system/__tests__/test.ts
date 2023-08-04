import { NasFileSystem } from '../src/impl/nas_filesystem';
import { IInputs } from '@serverless-devs/component-interface';
import { GLogger } from 'base_aliyun_resource';

GLogger.setLogger(console);

test('test nas filesystem', () => {
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
  const o = new NasFileSystem(input);
  expect(
    o.paramMapping({
      file_system_type: 'standard',
      protocol_type: 'NFS',
      storage_type: 'Performance',
      zone_id: 'cn-hangzhou-e',
      encrypt_type: 0,
      capacity: 100,
      description: 'this is a nas desc',
    }),
  ).toEqual({
    FileSystemType: 'standard',
    ProtocolType: 'NFS',
    StorageType: 'Performance',
    ZoneId: 'cn-hangzhou-e',
    EncryptType: 0,
    Capacity: 100,
    Description: 'this is a nas desc',
  });
});
