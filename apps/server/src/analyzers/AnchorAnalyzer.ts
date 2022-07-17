import { AnalyzedElementData, TypeAnalyzer } from '@app/analyzers/Analyzer';
import BaseAnalyzer from '@app/analyzers/BaseAnalyzer';

export default class AnchorAnalyzer extends BaseAnalyzer implements TypeAnalyzer {
  
  /**
   * @public
   * 
   * @param {AnalyzedElementData} element
   * @returns {void}
   */
  public analyze(element: AnalyzedElementData): void {
    super.hasAttribute(element, 'href');
    super.hasAttribute(element, 'title');
  }
}