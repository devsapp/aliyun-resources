import logger from './common/logger';
import { InputProps } from './common/interface';
import { OTSTable } from './impl/table';

export default class ComponentOTSTable {
  /**
   * @param inputs
   * @returns
   */
  public async deploy(inputs: InputProps): Promise<object> {
    logger.debug(`deploy ==> input: ${JSON.stringify(inputs)}`);

    const otsTable = new OTSTable(inputs);
    return otsTable.deploy();
  }

  public async remove(inputs: InputProps) {
    logger.debug(`remove ==> input: ${JSON.stringify(inputs.props)}`);
  }
}
