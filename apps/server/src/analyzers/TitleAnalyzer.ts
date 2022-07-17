import { AnalyzedElementData, TypeAnalyzer } from '@app/analyzers/Analyzer';

export default class TitleAnalyzer implements TypeAnalyzer {

  /**
   * @private
   * @readonly
   * 
   * @var {number} MIN_LENGTH
   */
  private readonly MIN_LENGTH: number = 50;

  /**
   * @private
   * @readonly
   * 
   * @var {number} MAX_LENGTH
   */
  private readonly MAX_LENGTH: number = 65;

  /**
   * @public
   * 
   * @param {AnalyzedElementData} element
   * @returns {void}
   */
  public analyze(element: AnalyzedElementData): void {
    this.hasContent(element);
    this.minLength(element);
    this.maxLength(element);
  }

  /**
   * @private
   * 
   * @param {AnalyzedElementData} element
   * @returns {void}
   */
  private hasContent(element: AnalyzedElementData): void {
    if (0 === element.content.length) {
      element.errors.push({
        type: 'content-missing'
      });
    }
  }

  /**
   * @private
   * 
   * @param {AnalyzedElementData} element
   * @returns {void}
   */
  private minLength(element: AnalyzedElementData): void {
    if (this.MIN_LENGTH > element.content.length) {
      element.warnings.push({
        type: 'content-too-short'
      });
    }
  }

  /**
   * @private
   * 
   * @param {AnalyzedElementData} element
   * @returns {void}
   */
  private maxLength(element: AnalyzedElementData): void {
    if (this.MAX_LENGTH < element.content.length) {
      element.warnings.push({
        type: 'content-too-long'
      });
    }
  }
}