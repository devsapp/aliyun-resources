import { BaseAliyunResource } from '../common/baseAliyunResource';

export class OSSBucket extends BaseAliyunResource {
  protected getRosParamMap(): object {
    return {
      bucket: 'BucketName',
      acl: 'AccessControl',
      storage_class: 'StorageClass',
      redundancy_type: 'RedundancyType',
      versioning: 'VersioningConfiguration',
      status: 'Status',
    };
  }

  protected getRosInitTemplateResource(): any {
    return {
      Type: 'ALIYUN::OSS::Bucket',
      Properties: {},
    };
  }
}
