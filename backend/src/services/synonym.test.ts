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
      happy: ["joyful", "glad"],
    });
    expect(synonymService.getSynonymsByWord("joyful")).toEqual({
      joyful: ["happy", "glad"],
    });
    expect(synonymService.getSynonymsByWord("glad")).toEqual({
      glad: ["happy", "joyful"],
    });
  });

  it("should return all synonyms based on filter", () => {
    // Gien
    const payload = { word, synonyms };
    // When
    synonymService.addSynonyms(payload);
    // Then
    expect(synonymService.getSynonyms({ search: "joy" })).toEqual({
      joyful: ["happy", "glad"],
    });
    expect(synonymService.getSynonyms({ search: "stubborn" })).toBeUndefined();
  });

  it("should update the transitive synonyms", () => {
    // @todo, write this..
    expect(1).toBe(1);
  });
});
