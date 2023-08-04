import { SLSLogStore } from '../src/impl/logstore';
import { IInputs } from '@serverless-devs/component-interface';
import { GLogger } from 'base_aliyun_resource';

GLogger.setLogger(console);

test('test sls log store', () => {
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
  const o = new SLSLogStore(input);
  expect(
    o.paramMapping({
      project: 'xl-test-project',
      name: 'xl-test-logs',
      retention_period: 15,
      shard_count: 1,
      auto_split: true,
      max_split_shard_count: 12,
      enable_web_tracking: false,
      append_meta: false,
    }),
  ).toEqual({
    ProjectName: 'xl-test-project',
    LogstoreName: 'xl-test-logs',
    TTL: 15,
    ShardCount: 1,
    AutoSplit: true,
    MaxSplitShard: 12,
    EnableTracking: false,
    AppendMeta: false,
  });
});
