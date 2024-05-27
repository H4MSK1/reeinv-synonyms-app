import SynonymService from "./synonym";

describe("SynonymService", () => {
  // prepare test data
  const word = "happy";
  const synonyms = ["joyful", "glad"];

  let synonymService: SynonymService;
  beforeEach(() => {
    synonymService = new SynonymService();
  });

  it("should create synonyms bidirectionally", () => {
    // Given
    const payload = { word, synonyms };
    // When
    synonymService.addSynonyms(payload);
    // Then
    expect(synonymService.getSynonymsByWord("stubborn")).toBeUndefined();
    expect(synonymService.getSynonymsByWord("happy")).toEqual({
      word: "happy",
      synonyms: ["joyful", "glad"],
    });
    expect(synonymService.getSynonymsByWord("joyful")).toEqual({
      word: "joyful",
      synonyms: ["happy", "glad"],
    });
    expect(synonymService.getSynonymsByWord("glad")).toEqual({
      word: "glad",
      synonyms: ["happy", "joyful"],
    });
  });

  it("should return all synonyms based on filter", () => {
    // Gien
    const payload = { word, synonyms };
    // When
    synonymService.addSynonyms(payload);
    // Then
    expect(synonymService.getSynonyms({ search: "joy" })).toEqual(
      expect.arrayContaining([
        {
          word: "joyful",
          synonyms: ["happy", "glad"],
        },
      ])
    );
    expect(synonymService.getSynonyms({ search: "stubborn" })).toEqual([]);
  });
});
