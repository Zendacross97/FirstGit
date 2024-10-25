let h3 = document.createElement('h3');
let h_text = document.createTextNode(`Buy high quality organic fruits online`);
h3.style.fontStyle = `italic`;
h3.appendChild(h_text);

let div = document.querySelectorAll(`div`);
div[0].appendChild(h3);

let p = document.createElement('p');
let p_text = document.createTextNode(`Total fruits: 4`);
p.appendChild(p_text);
p.id = `fruits-total`;

let ul = document.querySelector(`ul`);
div[1].insertBefore(p,ul);