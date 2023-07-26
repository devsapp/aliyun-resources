import { BaseAliyunResource } from 'base_aliyun_resource';

export class NasFileSystem extends BaseAliyunResource {
  protected getRosParamMap(): object {
    return {
      file_system_type: 'FileSystemType',
      protocol_type: 'ProtocolType',
      storage_type: 'StorageType',
      zone_id: 'ZoneId',
      encrypt_type: 'EncryptType',
      capacity: 'Capacity',
      description: 'Description',
    };
  }

  protected getRosInitTemplateResource(): any {
    return {
      Type: 'ALIYUN::NAS::FileSystem',
      Properties: {},
    };
  }

  public async deploy(): Promise<object> {
    let ret = (await super.deploy()) as any;
    ret['fileSystemId'] = JSON.stringify({ 'Fn::GetAtt': [ret.resourceId, 'FileSystemId'] });
    return ret;
  }
}
