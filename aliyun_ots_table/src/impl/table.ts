import { BaseAliyunResource } from 'base_aliyun_resource';

export class OTSTable extends BaseAliyunResource {
  protected getRosParamMap(): object {
    return {
      instance_name: 'InstanceName',
      table_name: 'TableName',
      primary_key: 'PrimaryKey',
      type: 'Type',
      name: 'Name',
      time_to_live: 'TimeToLive',
      max_version: 'MaxVersions',
      deviation_cell_version_in_sec: 'DeviationCellVersionInSec',
    };
  }

  protected getRosValueMap(): object {
    return {
      Integer: 'INTEGER',
      String: 'STRING',
      Binary: 'BINARY',
    };
  }

  protected getRosInitTemplateResource(): any {
    return {
      Type: 'ALIYUN::OTS::Table',
      Properties: {},
    };
  }
}
