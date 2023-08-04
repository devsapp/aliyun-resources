import { SecurityGroupEgress } from '../src/impl/security_group_egress';
import { IInputs } from '@serverless-devs/component-interface';
import { GLogger } from 'base_aliyun_resource';

GLogger.setLogger(console);

test('test sg egress', () => {
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
  const o = new SecurityGroupEgress(input);
  expect(
    o.paramMapping({
      security_group_id: 'xxxx',
      ip_protocol: 'tcp',
      port_range: '80/80',
      cidr_ip: '0.0.0.0/0',
      priority: 1,
      policy: 'accept',
      nic_type: 'internet',
      description: 'a test sg egress',
    }),
  ).toEqual({
    SecurityGroupId: 'xxxx',
    IpProtocol: 'tcp',
    PortRange: '80/80',
    DestCidrIp: '0.0.0.0/0',
    Priority: 1,
    Policy: 'accept',
    NicType: 'internet',
    Description: 'a test sg egress',
  });
});
