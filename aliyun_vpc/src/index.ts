import { IInputs } from '@serverless-devs/component-interface';
import { Vpc } from './impl/vpc';
import { GLogger } from 'base_aliyun_resource';

export default class ComponentVpc {
  protected commands: any;

  constructor({ logger }: any) {
    GLogger.setLogger(logger || console);
    this.commands = {
      deploy: {
        help: {
          description: 'deploy command to generate the ROS template of oss bucket',
          summary: 'deploy command to generate the ROS template of oss bucket',
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

    const vpc = new Vpc(inputs);
    return vpc.deploy();
  }

  public async remove(inputs: IInputs) {
    GLogger.getLogger().debug(`remove ==> input: ${JSON.stringify(inputs)}`);
  }

  public async plan(inputs: IInputs) {
    GLogger.getLogger().debug(`plan ==> input: ${JSON.stringify(inputs)}`);
  }
}
