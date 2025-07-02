export const SECTION_ORDER = ["A", "B", "C", "D"];

const SECTION_META = {
  PCM: [
    { section: "A", label: "English", topics: "Comprehension, Grammar, Synonyms-Antonyms, Vocabulary" },
    { section: "B", label: "Mathematics", topics: "Algebra, Trigonometry, Calculus, Probability" },
    { section: "C", label: "Physics + Chemistry", topics: "Laws of Motion, Magnetism, Thermodynamics, Organic Chemistry, Atomic Structure" },
    { section: "D", label: "Aptitude + Reasoning + GK", topics: "Number Series, Blood Relation, India GK, Logical Puzzle" },
  ],
  PCB: [
    { section: "A", label: "English", topics: "Reading Passage, Tenses, One Word Substitution" },
    { section: "B", label: "Biology", topics: "Cell Structure, Genetics, Human Physiology, Botany" },
    { section: "C", label: "Physics + Chemistry", topics: "Motion, Heat, Electrochemistry, Chemical Bonding" },
    { section: "D", label: "Aptitude + Reasoning + GK", topics: "Clock & Calendar, Coding-Decoding, Static GK, Series" },
  ],
  PCMB: [
    { section: "A", label: "English", topics: "Error Detection, Fill in the Blanks, Passage-based Questions" },
    { section: "B", label: "Mathematics + Biology", topics: "Trigonometry, Differentiation, Anatomy, Plant Physiology" },
    { section: "C", label: "Physics + Chemistry", topics: "Gravitation, Magnetism, Organic Chemistry, Equilibrium" },
    { section: "D", label: "Aptitude + Reasoning + GK", topics: "Logical Sequences, Data Interpretation, Constitution, Current Affairs" },
  ],
  Commerce: [
    { section: "A", label: "English", topics: "Formal Letter, Sentence Correction, Vocabulary" },
    { section: "B", label: "Accountancy + Business Studies", topics: "Ledger, Trial Balance, Marketing, Human Resource Management" },
    { section: "C", label: "Economics", topics: "National Income, Demand-Supply, Budget, Inflation" },
    { section: "D", label: "Aptitude + Reasoning + GK", topics: "Arithmetic Aptitude, Series, Indian Economy, Awards" },
  ],
  Arts: [
    { section: "A", label: "English", topics: "Grammar, Paragraph Completion, Idioms" },
    { section: "B", label: "History + Political Science", topics: "Freedom Movement, Constitution, Fundamental Rights" },
    { section: "C", label: "Geography + Economics", topics: "Climate, Maps, Budget, GDP" },
    { section: "D", label: "Aptitude + Reasoning + GK", topics: "Series, Direction Test, Culture, Sports" },
  ],
  Others: [
    { section: "A", label: "English", topics: "Reading Skills, Parts of Speech, Word Meaning" },
    { section: "B", label: "Communication + Personality Skills", topics: "Verbal Ability, Interpersonal Skills, Public Speaking" },
    { section: "C", label: "General Knowledge", topics: "National Affairs, Scientific Facts, Current Events" },
    { section: "D", label: "Aptitude + Reasoning + GK", topics: "Verbal/Non-verbal, Basic Math, India's Heritage" },
  ],
};

export function getSectionMeta(stream) {
  const key = (stream || "").toUpperCase();
  if (SECTION_META[key]) return SECTION_META[key];
  return SECTION_META["Others"];
} 