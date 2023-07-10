import { BaseAliyunResource } from '../common/baseAliyunResource';

export class SLSLogStore extends BaseAliyunResource {
  protected getRosParamMap(): object {
    return {
      project: 'ProjectName',
      name: 'LogstoreName',
      retention_period: 'TTL',
      shard_count: 'ShardCount',
      auto_split: 'AutoSplit',
      max_split_shard_count: 'MaxSplitShard',
      retention_forever: 'PreserveStorage',
      enable_web_tracking: 'EnableTracking',
      append_meta: 'AppendMeta',
    };
  }

  protected getRosInitTemplateResource(): any {
    return {
      Type: 'ALIYUN::SLS::Logstore',
      Properties: {},
    };
  }
}
