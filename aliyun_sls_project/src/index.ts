import { SLSProject } from './impl/project';
import { IInputs } from '@serverless-devs/component-interface';
import { GLogger } from 'base_aliyun_resource';

export default class ComponentSlsProject {
  protected commands: any;

  constructor({ logger }: any) {
    GLogger.setLogger(logger);
    this.commands = {
      deploy: {
        help: {
          description: 'deploy command to generate the ROS template of sls project',
          summary: 'deploy command to generate the ROS template of sls project',
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

    const slsProject = new SLSProject(inputs);
    return slsProject.deploy();
  }

  public async remove(inputs: IInputs) {
    GLogger.getLogger().debug(`remove ==> input: ${JSON.stringify(inputs.props)}`);
  }
}
