import { IInputs } from '@serverless-devs/component-interface';
import { OTSInstance } from './impl/instance';
import { GLogger } from 'base_aliyun_resource';

export default class ComponentOTSInstance {
  protected commands: any;

  constructor({ logger }: any) {
    GLogger.setLogger(logger);
    this.commands = {
      deploy: {
        help: {
          description: 'deploy command to generate the ROS template of ots instance',
          summary: 'deploy command to generate the ROS template of ots instance',
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
    GLogger.getLogger().debug(`deploy ==> input: ${JSON.stringify(inputs)}`);

    const otsInsatnce = new OTSInstance(inputs);
    return otsInsatnce.deploy();
  }

  public async remove(inputs: IInputs) {
    GLogger.getLogger().debug(`remove ==> input: ${JSON.stringify(inputs.props)}`);
  }

  public async plan(inputs: IInputs) {
    GLogger.getLogger().debug(`plan ==> input: ${JSON.stringify(inputs)}`);
  }

  public async info(inputs: IInputs) {
    GLogger.getLogger().debug(`info ==> input: ${JSON.stringify(inputs)}`);
    return inputs.props;
  }
}
