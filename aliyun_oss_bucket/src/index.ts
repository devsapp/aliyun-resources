import logger from './common/logger';
import { InputProps } from './common/interface';
import { OSSBucket } from './impl/oss';

export default class ComponentOSSBucket {
  /**
   * @param inputs
   * @returns
   */
  public async deploy(inputs: InputProps): Promise<object> {
    logger.debug(`deploy ==> input: ${JSON.stringify(inputs)}`);

    const ossBucket = new OSSBucket(inputs);
    return ossBucket.deploy();
  }

  public async remove(inputs: InputProps) {
    logger.debug(`remove ==> input: ${JSON.stringify(inputs.props)}`);
  }
}
