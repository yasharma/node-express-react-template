
const convertToCKEditorFormatedXHTML = (htmlString)=>{
    const container = document.createElement('div');
    container.style.display = 'none';
    document.body.appendChild(container);
    container.innerHTML = htmlString;

    // container.innerHTML = htmlString;

    const equations = container.getElementsByClassName('equ');
    for (let el = 0; el < equations.length; el++){
        const { [el]: currentEqu } = equations;
        const parent = currentEqu.parentElement;
        const mathElement = document.createElement('mathquill');
        parent.replaceChild(mathElement, currentEqu);
        mathElement.appendChild(currentEqu);
      }

    const ckEditorFormatedXHTMLString = container.innerHTML;
    document.body.removeChild(container);
    return ckEditorFormatedXHTMLString;
}
export default convertToCKEditorFormatedXHTML;
