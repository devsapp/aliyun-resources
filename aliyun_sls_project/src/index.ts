import logger from './common/logger';
import { InputProps } from './common/interface';
import { SLSProject } from './impl/project';

export default class ComponentOTSInstance {
  /**
   * @param inputs
   * @returns
   */
  public async deploy(inputs: InputProps): Promise<object> {
    logger.debug(`deploy ==> input: ${JSON.stringify(inputs)}`);

    const slsProject = new SLSProject(inputs);
    return slsProject.deploy();
  }

  public async remove(inputs: InputProps) {
    logger.debug(`remove ==> input: ${JSON.stringify(inputs.props)}`);
  }
}
