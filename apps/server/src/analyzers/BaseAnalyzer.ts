import { AnalyzedElementData } from '@app/analyzers/Analyzer';

export default class BaseAnalyzer {

  /**
   * @protected
   * 
   * @param {AnalyzedElementData} element
   * @returns {void}
   */
  protected hasAttribute(element: AnalyzedElementData, attributeName: string): void {
    const attribute = element.attributes.find(attribute => attributeName === attribute.name);

    if (! attribute) {
      element.errors.push({
        type: 'attribute-missing',
        attribute: {
          name: attributeName,
          value: ''
        }
      });
      return;
    }

    if (0 === attribute.value.length) {
      element.errors.push({
        type: 'attribute-empty',
        attribute
      });
    }
  }
}