import logger from './common/logger';
import { InputProps } from './common/interface';
import { SLSLogStore } from './impl/logstore';

export default class ComponentOTSInstance {
  /**
   * @param inputs
   * @returns
   */
  public async deploy(inputs: InputProps): Promise<object> {
    logger.debug(`deploy ==> input: ${JSON.stringify(inputs)}`);

    const slsLogStore = new SLSLogStore(inputs);
    return slsLogStore.deploy();
  }

  public async remove(inputs: InputProps) {
    logger.debug(`remove ==> input: ${JSON.stringify(inputs.props)}`);
  }
}
