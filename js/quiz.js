document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.quiz').forEach(function (quiz) {
    var button = quiz.querySelector('.quiz-submit');
    var results = quiz.querySelectorAll('.quiz-result');
    var questions = quiz.querySelectorAll('.quiz-question');
    var warning = quiz.querySelector('.quiz-warning');

    if (!button) return;

    button.addEventListener('click', function () {
      var total = 0;
      var answeredAll = true;

      questions.forEach(function (q) {
        var checked = q.querySelector('input:checked');
        if (!checked) {
          answeredAll = false;
          return;
        }
        total += parseInt(checked.value, 10);
      });

      if (!answeredAll) {
        if (warning) warning.style.display = 'block';
        return;
      }
      if (warning) warning.style.display = 'none';

      results.forEach(function (r) { r.classList.remove('is-visible'); });

      results.forEach(function (r) {
        var min = parseInt(r.dataset.min, 10);
        var max = parseInt(r.dataset.max, 10);
        if (total >= min && total <= max) {
          r.classList.add('is-visible');
        }
      });

      var visible = quiz.querySelector('.quiz-result.is-visible');
      if (visible) visible.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });
});
