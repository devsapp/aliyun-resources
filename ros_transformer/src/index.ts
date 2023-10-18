import loadComponent from '@serverless-devs/load-component';
import { IInputs } from '@serverless-devs/component-interface';
import * as _ from 'lodash';
import { GLogger } from 'base_aliyun_resource';

export default class ComponentRosTransformer {
  protected commands: any;

  constructor({ logger }: any) {
    GLogger.setLogger(logger || console);
    this.commands = {
      deploy: {
        help: {
          description: 'deploy command to create or update ROS stack',
          summary: 'deploy command to create or update ROS stack',
          option: [
            [
              '-y, --assume-yes',
              'Assume that the answer to any question which would be asked is yes',
            ],
          ],
        },
      },
      remove: {
        help: {
          description: 'remove command do nothing',
          summary: 'remove command',
          option: [
            [
              '-y, --assume-yes',
              'Assume that the answer to any question which would be asked is yes',
            ],
          ],
        },
      },
      plan: {
        help: {
          description: 'Show the differences between the local and remote',
          summary: 'plan command',
        },
        verify: false,
      },
      info: {
        help: {
          description: 'Query online resource details.',
          summary: 'info command',
        },
      },
    };
  }

  public async deploy(inputs: IInputs): Promise<object> {
    const logger = GLogger.getLogger();
    logger.debug(`deploy ==> input: ${JSON.stringify(inputs)}`);
    const { props, cwd, getCredential } = inputs;
    let newInputs = { props, cwd, getCredential };
    let rosTemplate = {
      ROSTemplateFormatVersion: '2015-09-01',
      Resources: {},
      Outputs: {},
    };
    const refs = inputs.props.refs as Array<any>;
    if (refs.length == 0) {
      logger.warn('empty refs, no need create/update ros stack');
      return {};
    }
    refs.forEach((item) => {
      logger.debug('item ====>', item);
      rosTemplate.Resources[item.resourceId] = item.resourceTemplate;
      switch (item.resourceTemplate.Type) {
        case 'ALIYUN::KAFKA::Instance':
          rosTemplate.Outputs[item.resourceId] = {
            Value: { 'Fn::GetAtt': [item.resourceId, 'InstanceId'] },
            Description: 'Id of the kafka instance.',
          };
          break;
        case 'ALIYUN::ECS::VPC':
          rosTemplate.Outputs[item.resourceId] = {
            Value: { 'Fn::GetAtt': [item.resourceId, 'VpcId'] },
            Description: 'Id of created VPC.',
          };
          break;
        case 'ALIYUN::ECS::VSwitch':
          rosTemplate.Outputs[item.resourceId] = {
            Value: { 'Fn::GetAtt': [item.resourceId, 'VSwitchId'] },
            Description: 'Id of created VSwitch.',
          };
          break;
        case 'ALIYUN::ECS::SecurityGroup':
          rosTemplate.Outputs[item.resourceId] = {
            Value: { 'Fn::GetAtt': [item.resourceId, 'SecurityGroupId'] },
            Description: 'Id of created SecurityGroup.',
          };
          break;
        case 'ALIYUN::OSS::Bucket':
          rosTemplate.Outputs[item.resourceId] = {
            Value: { 'Fn::GetAtt': [item.resourceId, 'Name'] },
            Description: 'The name of Bucket',
          };
          break;
        case 'ALIYUN::OTS::Instance':
          rosTemplate.Outputs[item.resourceId] = {
            Value: { 'Fn::GetAtt': [item.resourceId, 'InstanceName'] },
            Description: 'The name of TableStore instance.',
          };
          break;
        case 'ALIYUN::OTS::Table':
          rosTemplate.Outputs[item.resourceId] = {
            Value: { 'Fn::GetAtt': [item.resourceId, 'TableName'] },
            Description: 'The name of TableStore table.',
          };
          break;
        case 'ALIYUN::SLS::Project':
          rosTemplate.Outputs[item.resourceId] = {
            Value: { 'Fn::GetAtt': [item.resourceId, 'Name'] },
            Description: 'The name of sls log project.',
          };
          break;
        case 'ALIYUN::SLS::Logstore':
          rosTemplate.Outputs[item.resourceId] = {
            Value: { 'Fn::GetAtt': [item.resourceId, 'LogstoreName'] },
            Description: 'The name of sls log store.',
          };
          break;
        case 'ALIYUN::NAS::FileSystem':
          rosTemplate.Outputs[item.resourceId] = {
            Value: { 'Fn::GetAtt': [item.resourceId, 'FileSystemId'] },
            Description: 'The id of the file system created.',
          };
          break;
        default:
          console.log(`${item.resourceTemplate.Type} is no need output`);
      }
    });
    logger.debug('\nrosTemplate ====>', JSON.stringify(rosTemplate));

    newInputs.props.template = rosTemplate;

    logger.debug('\nnewInputs ====>', JSON.stringify(newInputs));

    const componentInst: any = await loadComponent('ros@dev', { logger });
    return await componentInst['deploy'](newInputs);
  }

  public async remove(inputs: IInputs) {
    const logger = GLogger.getLogger();
    logger.debug(`remove ==> input: ${JSON.stringify(inputs)}`);
    _.unset(inputs.props, 'refs');
    logger.debug(`call ros component input: ${JSON.stringify(inputs.props)}`);
    const componentInst: any = await loadComponent(`ros@dev`, { logger });
    return await componentInst['remove'](inputs);
  }

  public async plan(inputs: IInputs) {
    GLogger.getLogger().debug(`plan ==> input: ${JSON.stringify(inputs)}`);
    _.unset(inputs.props, 'refs');
    return inputs.props;
  }

  public async info(inputs: IInputs) {
    const logger = GLogger.getLogger();
    logger.debug(`info ==> input: ${JSON.stringify(inputs)}`);
    _.unset(inputs.props, 'refs');
    const componentInst: any = await loadComponent('ros@dev', { logger });
    return await componentInst['info'](inputs);
  }
}
