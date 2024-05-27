import {
  SynonymMap,
  SynonymServiceInterface,
  Synonym,
  SynonymsFilter,
  Optional,
} from "@/types";
import { isEmpty } from "@/utils/is-empty";

export default class SynonymService implements SynonymServiceInterface {
  #synonymMap: SynonymMap = new Map();

  /**
   * Adds synonyms bidirectionally and updates transitive synonyms.
   * @param {Synonym} synonym The synonym model.
   * @returns {void}
   */
  public addSynonyms({ word, synonyms }: Synonym): void {
    synonyms.forEach((synonym) => {
      this.addSynonymBidirectionally(word, synonym);
      this.updateTransitiveSynonyms(word, synonym);
    });
  }

  /**
   * Gets all synonyms based on filter.
   * @param {SynonymsFilter} filter The search filter.
   * @returns {Synonym[]}
   */
  public getSynonyms(filter?: SynonymsFilter): Synonym[] {
    const { search } = filter ?? {};
    const data: Synonym[] = [];

    for (const [word, synonyms] of this.#synonymMap.entries()) {
      if (
        isEmpty(search) ||
        word.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      ) {
        data.push({ word, synonyms: Array.from(synonyms) });
      }
    }

    return data;
  }

  public getSynonymsByWord(word: string): Optional<Synonym> {
    if (!this.#synonymMap.has(word)) {
      return undefined;
    }
    const synonyms = Array.from(this.#synonymMap.get(word) ?? []);
    return { word, synonyms };
  }

  public clearSynonyms(): void {
    this.#synonymMap.clear();
  }

  private addSynonymBidirectionally(word: string, synonym: string): void {
    this.addToSynonymMap(word, synonym);
    this.addToSynonymMap(synonym, word);
  }

  /**
   * Adds a synonym to the associated word's synonym set.
   * @param {string} word
   * @param {string} synonym
   * @returns {void}
   */
  private addToSynonymMap(word: string, synonym: string): void {
    if (!this.#synonymMap.has(word)) {
      this.#synonymMap.set(word, new Set([synonym]));
      return;
    }

    this.#synonymMap.get(word)?.add(synonym);
  }

  /**
   * Updates transitive synonyms for a word with transitive rule implementation.
   * @param {string} word
   * @param {string} newSynonym
   * @returns {void}
   */
  private updateTransitiveSynonyms(word: string, newSynonym: string): void {
    // According to the the transitive rule implementation:
    // When {word} is synonymous with {newSynonym}
    // and {existingSynonym} is synonymous with {word},
    // then {existingSynonym} should be synonymous with {newSynonym} bidirectionally.
    this.#synonymMap.get(word)?.forEach((existingSynonym) => {
      const hasExistingSynonymSet = () =>
        this.#synonymMap.get(existingSynonym)?.has(newSynonym);

      // If it's a new synonym for this word and a transitive synonym set
      // doesn't exist, add the new synonym bidirectionally too.
      if (existingSynonym !== newSynonym && !hasExistingSynonymSet()) {
        this.addSynonymBidirectionally(existingSynonym, newSynonym);
      }
    });
  }
}
