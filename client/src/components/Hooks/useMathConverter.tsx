import { IQuestion } from '../../models/IQuestion';

export const useMathConverter = (rawItems: IQuestion[]) => {
  for(const row of rawItems) {
    row.question_text = row.content_type === 'plaintext' ? row.question_text.trim() : wrap(row.question_text.trim());
    row.justification = wrap(row.justification.trim());
    row.hint = wrap(row.hint.trim());
    row.option_A = row.input_type === 'FB-EXM' ? row.option_A.trim() : wrap(row.option_A.trim());
    row.option_B = row.input_type === 'FB-EXM' ? row.option_B.trim() : wrap(row.option_B.trim());
    row.option_C = row.input_type === 'FB-EXM' ? row.option_C.trim() : wrap(row.option_C.trim());
    row.option_D = row.input_type === 'FB-EXM' ? row.option_D.trim() : wrap(row.option_D.trim());
    row.justification = row.justification_type === 'text' ? row.justification.trim() : wrap(row.justification.trim());
  }
  return rawItems;
}

function wrap(string: string, newLineSeperator = '\n') {
  var splited_strings = string.split(newLineSeperator);
  for (var i = 0; i < splited_strings.length; i++) {
    if (splited_strings[i].length > 0) {
      splited_strings[i] = `<p>${splited_strings[i]}</p>`;
      const numberOfSign = splited_strings[i].split('@').length - 1;
      if (numberOfSign % 2 == 0) {
        for (var j = 0; j < numberOfSign; j++) {
          splited_strings[i] = splited_strings[i].replace("@", '<span class="equ" contenteditable="false" unselectable="on">');
          splited_strings[i] = splited_strings[i].replace("@", '</span>');
        }
      }
    }
  }
  return convertLatexToStaticMathHtml(splited_strings.join(newLineSeperator));
}


export const convertLatexToStaticMathHtml = (latex: string) => {
  
  const htmlElement: any =  document.getElementsByClassName('math-convert');
  if(htmlElement.length === 0) return latex;
  htmlElement[0].innerHTML = latex;
  const problems = htmlElement[0].getElementsByClassName("equ");
  for (let el = 0; el < problems.length; el++){
    (window as any).MQ.StaticMath(problems[el]);
  }
  const staticHtml = htmlElement[0].innerHTML;
  htmlElement[0].innerHTML = '';
  return staticHtml;
}