import logger from './common/logger';
import { InputProps } from './common/interface';
import loadComponent from '@serverless-devs/load-component';
import * as _ from 'lodash';

export default class ComponentRosTransformer {
  /**
   * @param inputs
   * @returns
   */

  public async deploy(inputs: InputProps): Promise<object> {
    logger.debug(`deploy ==> input: ${JSON.stringify(inputs)}`);
    let newInputs = _.cloneDeep(inputs);
    let rosTemplate = {
      ROSTemplateFormatVersion: '2015-09-01',
      Resources: {},
      Outputs: {},
    };
    const refs = newInputs.props.ref as Array<any>;
    delete newInputs.props.ref;
    if (refs.length == 0) {
      logger.info('empty refs, no need create/update ros stack');
      return {};
    }
    refs.forEach((item) => {
      // logger.debug('item ====>', item);
      rosTemplate.Resources[item.resourceId] = item.resourceTemplate;
    });
    logger.debug('rosTemplate ====>', JSON.stringify(rosTemplate));
    newInputs.props.template = rosTemplate;
    logger.debug('newInputs ====>', JSON.stringify(newInputs));

    const componentInst: any = await loadComponent(`ros@dev`);
    return await componentInst['deploy'](newInputs);
  }

  public async remove(inputs: InputProps) {
    logger.debug(`remove ==> input: ${JSON.stringify(inputs.props)}`);
    return {};
  }
}
