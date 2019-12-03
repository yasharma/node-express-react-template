import { IQuestion } from '../models/IQuestion';

export const CSV_FORMAT = [
  'text/csv',
  'application/csv',
  'application/x-csv',
  'text/comma-separated-values',
  'text/x-comma-separated-values',
  'text/tab-separated-values',
  'application/vnd.ms-excel'
];

export const CSV_FIELDS = [
  "id",
  "question_text",
  "question_picture",
  "arabic_translation of question",
  "chapter_name_topic",
  "duration",
  "justification",
  "hint",
  "arabic_translation of hint",
  "arabic_translation of justification",
  "subject",
  "skill_profile",
  "question_type",
  "sub_topic",
  "content_type",
  "difficulty_level",
  "option_A",
  "image_option_A",
  "option_B",
  "image_option_B",
  "option_C",
  "image_option_C",
  "option_D",
  "image_option_D",
  "correct_options",
  "input_type",
  "justification_image",
  "justification_type"
];

export const isValidCsv = (fields: string[]) => {
  for (const field of fields) {
    if (!CSV_FIELDS.includes(field)) {
      return field.length === 0 ? 
        'Empty space found in one of the cell within header' : 
        `Problem with filed (${field}), check for spelling and case senstive`;
    }
  }
  return;
}

export const replace = (string: string) => {
  if (string && typeof string === 'string') {
    return string.replace(/@/g, ' ');
  }
  return string;
}

export const convertLatexToMathHtml = (latex: string) => {
  var htmlElement: any = document.getElementsByClassName('math-convert');
  if (htmlElement.length === 0) return latex;
  const mathField = (window as any).MQ.MathField(htmlElement[0]);
  mathField.latex(latex); // Renders the given LaTeX in the MathQuill field
  htmlElement[0].innerHTML;
  return latex;
}

export const isValidPattern = (row: IQuestion) => {
  if (!row) return false;
  return Object.values(row).filter(val => val.includes('@')).length > 0;
}

export const EditingValueNames = {
  NONE: 'none',
  CONTENT: 'question_text',
  OPTION_A: 'option_A',
  OPTION_B: 'option_B',
  OPTION_C: 'option_C',
  OPTION_D: 'option_D',
};