
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
    const rowList = document.querySelectorAll('#studentDetails tbody tr');
    rowList.forEach(row => {
        row.classList.remove('showResult');
    });
});

document.querySelectorAll('th').forEach(header => {
    header.addEventListener('click', function () {
        // const column = this.getAttribute('data-column');
        const tbl = document.getElementById('studentDetails');
        const rows = Array.from(tbl.querySelectorAll('tbody tr'));
        const indx = Array.from(this.parentNode.children).indexOf(this);
        const isAsc = this.classList.contains('asc');
        this.classList.toggle('asc', !isAsc);
        this.classList.toggle('desc', isAsc);

        rows.sort((a, b) => {
            const aText = a.children[indx].textContent;
            const bText = b.children[indx].textContent;
            return isAsc ? aText.localeCompare(bText, undefined, { numeric: true }) : bText.localeCompare(aText, undefined, { numeric: true });
        });

        rows.forEach(row => tbl.querySelector('tbody').appendChild(row));
    });
});