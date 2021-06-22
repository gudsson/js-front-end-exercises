document.addEventListener('DOMContentLoaded', e => {
  function doMath(num1, num2, operator) {
    const operations = {
      '+': (num1, num2) => { return +num1 + +num2 },
      '-': (num1, num2) => { return +num1 - +num2 },
      '*': (num1, num2) => { return +num1 * +num2 },
      '/': (num1, num2) => { return +num1 / +num2 },
    }
    return operations[operator](num1, num2);
  }

  document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    
    let firstNumber = document.getElementById('first-number').value;
    let secondNumber = document.getElementById('second-number').value;
    let operatorSign = document.getElementById('operator').value;
    let res = doMath(firstNumber, secondNumber, operatorSign);

    document.getElementById('result').textContent = String(res);
  });
});