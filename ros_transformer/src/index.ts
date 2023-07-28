import loadComponent from '@serverless-devs/load-component';
import { IInputs } from '@serverless-devs/component-interface';
import * as _ from 'lodash';
import { GLogger } from 'base_aliyun_resource';

export default class ComponentRosTransformer {
  protected commands: any;

  constructor({ logger }: any) {
    GLogger.setLogger(logger);
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
      logger.info('empty refs, no need create/update ros stack');
      return {};
    }
    refs.forEach((item) => {
      logger.debug('item ====>', item);
      rosTemplate.Resources[item.resourceId] = item.resourceTemplate;
    });
    logger.debug('rosTemplate ====>', JSON.stringify(rosTemplate));
    newInputs.props.template = rosTemplate;
    logger.debug('newInputs ====>', JSON.stringify(newInputs));

    const componentInst: any = await loadComponent('ros@dev');
    return await componentInst['deploy'](newInputs);
  }

  public async remove(inputs: IInputs) {
    GLogger.getLogger().debug(`remove ==> input: ${JSON.stringify(inputs)}`);
    const componentInst: any = await loadComponent(`ros@dev`);
    return await componentInst['remove'](inputs);
  }

  public async plan(inputs: IInputs) {
    GLogger.getLogger().debug(`plan ==> input: ${JSON.stringify(inputs)}`);
  }

  public async info(inputs: IInputs) {
    GLogger.getLogger().debug(`info ==> input: ${JSON.stringify(inputs)}`);
  }
}
