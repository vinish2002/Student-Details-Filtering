
//------For Above Value-----
document.getElementById('above').addEventListener('change', function () {
    document.getElementById('inputVal2').style.display = 'none';
});
//------For Below Value-----
document.getElementById('below').addEventListener('change', function () {
    document.getElementById('inputVal2').style.display = 'none';
});
//------For Between Value-----
document.getElementById('between').addEventListener('change', function () {
    document.getElementById('inputVal2').style.display = 'inline-block';
});



document.getElementById('filterBtn').addEventListener('click', function () {
    const subject = document.getElementById('subject').value.toLowerCase();
    const filterType = document.querySelector('input[name="filter"]:checked').value;
    const inputVal1 = parseInt(document.getElementById('inputVal1').value);
    const inputVal2 = parseInt(document.getElementById('inputVal2').value);
    const rows = document.querySelectorAll('#studentDetails tbody tr');

    rows.forEach(row => {
        const marks = parseInt(row.querySelector(`td:nth-child(${subject === 'english' ? 3 : subject === 'maths' ? 4 : subject === 'science' ? 5 : 6})`).textContent);
        row.classList.remove('showResult');
        if (filterType === 'above' && marks > inputVal1) {
            row.classList.add('showResult');
        } else if (filterType === 'below' && marks < inputVal1) {
            row.classList.add('showResult');
        } else if (filterType === 'between' && marks >= inputVal1 && marks <= inputVal2) {
            row.classList.add('showResult');
        }
    });
});

document.getElementById('clearBtn').addEventListener('click', function () {
    const rows = document.querySelectorAll('#studentDetails tbody tr');
    rows.forEach(row => {
        row.classList.remove('showResult');
    });
});

document.querySelectorAll('th').forEach(header => {
    header.addEventListener('click', function () {
        const column = this.getAttribute('data-column');
        const table = document.getElementById('studentDetails');
        const rows = Array.from(table.querySelectorAll('tbody tr'));
        const index = Array.from(this.parentNode.children).indexOf(this);
        const isAscending = this.classList.contains('asc');
        this.classList.toggle('asc', !isAscending);
        this.classList.toggle('desc', isAscending);

        rows.sort((a, b) => {
            const aText = a.children[index].textContent;
            const bText = b.children[index].textContent;
            return isAscending ? aText.localeCompare(bText, undefined, { numeric: true }) : bText.localeCompare(aText, undefined, { numeric: true });
        });

        rows.forEach(row => table.querySelector('tbody').appendChild(row));
    });
});