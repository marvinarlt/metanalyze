import { ElementData } from '@app/services/Extractor';
import TitleAnalyzer from '@app/analyzers/TitleAnalyzer';
import MetaAnalyzer from '@app/analyzers/MetaAnalyzer';
import LinkAnalyzer from '@app/analyzers/LinkAnalyzer';
import AnchorAnalyzer from '@app/analyzers/AnchorAnalyzer';
import ImageAnalyzer from '@app/analyzers/ImageAnalyzer';
import HeadlineAnalyzer from '@app/analyzers/HeadlineAnalyzer';

export default class Analyzer {

  /**
   * @private
   * @readonly
   * 
   * @var {AnalyzerList} analyzers
   */
  private readonly analyzers: AnalyzerList = {
    title: new TitleAnalyzer(),
    metas: new MetaAnalyzer(),
    links: new LinkAnalyzer(),
    anchors: new AnchorAnalyzer(),
    images: new ImageAnalyzer(),
    headlines: new HeadlineAnalyzer()
  }

  /**
   * @public
   * 
   * @param {string} type
   * @param {ElementData[]} data
   * @returns {AnalyzedElementData[]}
   */
  public analyze(type: string, data: ElementData[]): AnalyzedElementData[] {
    return data.map(((element: ElementData): AnalyzedElementData => {
      const analyzedElement: AnalyzedElementData = {
        ...element,
        passed: true,
        warnings: [] as Hint[],
        errors: [] as Hint[]
      }

      if (! (type in this.analyzers)) {
        analyzedElement.passed = true;

        return analyzedElement;
      }

      this.analyzers[type].analyze(analyzedElement);

      const hasErrors = 0 < analyzedElement.errors.length;
      const hasWarnings = 0 < analyzedElement.warnings.length

      analyzedElement.passed = ! hasErrors && ! hasWarnings;

      return analyzedElement;
    }).bind(this));
  }
}

export type Hint = {
  type: string,
  attribute?: {
    name: string,
    value: string
  }
}

export type AnalyzedElementData = ElementData & {
  passed: boolean,
  warnings: Hint[],
  errors: Hint[]
}

export type TypeAnalyzer = {
  analyze(element: AnalyzedElementData): void
}

export type AnalyzerList = {
  [type: string]: TypeAnalyzer
}