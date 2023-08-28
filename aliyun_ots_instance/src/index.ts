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
    return await this.exec(inputs, 'deploy');
  }

  public async remove(inputs: IInputs) {
    return await this.exec(inputs, 'remove');
  }

  public async plan(inputs: IInputs) {
    return await this.exec(inputs, 'plan');
  }

  public async info(inputs: IInputs) {
    return await this.exec(inputs, 'info');
  }

  public async exec(inputs: IInputs, command: string) {
    GLogger.getLogger().debug(`${command} ==> input: ${JSON.stringify(inputs)}`);

    const otsInstance = new OTSInstance(inputs);
    return await otsInstance.deploy();
  }
}
