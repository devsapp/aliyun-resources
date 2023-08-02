import { OSSBucket } from '../src/impl/oss';
import { IInputs } from '@serverless-devs/component-interface';
import { GLogger } from 'base_aliyun_resource';

GLogger.setLogger(console);


test('test oss bucket', () => {
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
  const o = new OSSBucket(input);
  expect(o.paramMapping(
    {
      bucket: "xl-test-bucket",
      acl: "private",
      storage_class: "Standard",
      redundancy_type: "ZRS",
      versioning:
        { status: "Enabled" }
    }
  )).toEqual({
    BucketName: "xl-test-bucket",
    AccessControl: "private",
    StorageClass: "Standard",
    RedundancyType: "ZRS",
    VersioningConfiguration: {
      Status: "Enabled"
    }
  });
});