import { OTSTable } from '../src/impl/table';
import { IInputs } from '@serverless-devs/component-interface';
import { GLogger } from 'base_aliyun_resource';

GLogger.setLogger(console);

test('test ots table', () => {
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
  const o = new OTSTable(input);
  expect(
    o.paramMapping({
      instance_name: 'test-inst',
      table_name: 'app-table',
      primary_key: [{ type: 'String', name: 'id' }],
      time_to_live: -1,
      max_version: 2,
      deviation_cell_version_in_sec: 43200,
    }),
  ).toEqual({
    InstanceName: 'test-inst',
    TableName: 'app-table',
    PrimaryKey: [{ Type: 'STRING', Name: 'id' }],
    TimeToLive: -1,
    MaxVersions: 2,
    DeviationCellVersionInSec: 43200,
  });
});
