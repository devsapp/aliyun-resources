import logger from './common/logger';
import { InputProps } from './common/interface';
import { OTSInstance } from './impl/instance';

export default class ComponentOTSInstance {
  /**
   * @param inputs
   * @returns
   */
  public async deploy(inputs: InputProps): Promise<object> {
    logger.debug(`deploy ==> input: ${JSON.stringify(inputs)}`);

    const otsInsatnce = new OTSInstance(inputs);
    return otsInsatnce.deploy();
  }

  public async remove(inputs: InputProps) {
    logger.debug(`remove ==> input: ${JSON.stringify(inputs.props)}`);
  }
}
