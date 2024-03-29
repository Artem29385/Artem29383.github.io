let todo__enter = document.querySelector('.todos__input');
let todo__list = document.querySelector('.todo__list');
let todoArray = [];
let countLi = todo__list.getElementsByTagName('li');
let countChecked = todo__list.getElementsByClassName('custom check');
let clear = document.querySelector('.clear');
let li;
let label;
let input;
let span1;
let span2;
let btn;
let btn2;
let element
let tag
let cache;


if (localStorage.getItem('todo') != undefined) {
			todoArray= JSON.parse(localStorage.getItem('todo'));
				out();
			}


function left() {
	return countLi.length - countChecked.length; 
}
todo__enter.onkeydown = function(event) {
	if (event.key == 'Enter' && todo__enter.value.trim() != '') {               
		li = document.createElement('li');
		li.classList.add('item');
		todo__list.append(li);
		label = document.createElement('label');
		label.classList.add('toggle');
		li.append(label);
		input = document.createElement('input');
		input.type = 'checkbox';
		span1 = document.createElement('span');
		span1.classList.add('custom');
		span2 = document.createElement('span');
		span2.classList.add('text');
		span2.innerHTML = todo__enter.value;
		btn = document.createElement('button')
		btn.classList.add('removebtn');
		btn2 = document.createElement('button');
		btn2.classList.add('noclick');
		label.append(input);
		label.append(span1);
		label.append(span2);
		label.append(btn);
		label.append(btn2);  
		span2.id =  countLi.length; 
		let temp = {};
		temp.todo = todo__enter.value; 
		todo__enter.value = "";
		temp.check = false; 
		let i = todoArray.length;
		todoArray[i] = temp; 
		localStorage.setItem('todo', JSON.stringify(todoArray)); 
		document.querySelector(".todo__count").firstElementChild.innerHTML = left();  
		}
}

function out() {
	let out = '';
	let i = 0;
	for (let key in todoArray) {
		i++;
		if (todoArray[key].check === true) {
			out += '<li class = "item"> <label class = "toggle"> <input type = "checkbox" checked> <span class = "custom check"> </span> <span class = "text" id = "' + i +   '">' + todoArray[key].todo + '</span> <button class = "removebtn"> </button> <button class = "noclick"> </button> </label> </li>';
				}
				else
				{
					out += '<li class = "item"> <label class = "toggle"> <input type = "checkbox"> <span class = "custom"> </span> <span class = "text" id = "' + i +   '">' + todoArray[key].todo + '</span> <button class = "removebtn"> </button> </button> <button class = "noclick"> </button> </label> </li>';
				}

					todo__list.innerHTML = out;
			}
}


todo__list.addEventListener("click", function(event) { 

	if (event.target.className == 'removebtn') {
	element = event.target.closest('li');
	tag = event.target.previousElementSibling.innerHTML;
	cache = JSON.parse(localStorage.getItem('todo'));
	cache.forEach( function(element, index) {
		if (element.todo == tag) {
			cache.splice(index,1);
			todoArray.splice(index,1);
		}
	});
	localStorage.setItem('todo', JSON.stringify(cache));

	element.remove();}
});

document.querySelector(".todo__count").firstElementChild.innerHTML =   left();
let count = 0;
let arrtemp = [];
todo__list.addEventListener('click',  function(event) {  
	if (event.target.className == 'custom') {
		event.target.classList.add('check');
		count++;
		document.querySelector(".todo__count").firstElementChild.innerHTML--;
		tag = event.target.nextElementSibling.getAttribute('id');
	cache = JSON.parse(localStorage.getItem('todo'));
	cache.forEach( function(element, index) {
		  	if (index == tag -1) {              
		  		element.check = true;
		  		todoArray[index].check = true; 
		  		localStorage.setItem('todo', JSON.stringify(cache));
		  	}
	});
	}
	else if (event.target.className == 'custom check') {  
		tag = event.target.nextElementSibling.getAttribute('id');
		count--;
		event.target.classList.remove('check');
		document.querySelector(".todo__count").firstElementChild.innerHTML++;
		cache = JSON.parse(localStorage.getItem('todo'));
	cache.forEach( function(element, index) {
		  	if (index == tag-1) {
		  		element.check = false;
		  		todoArray[index].check = false;
		  		localStorage.setItem('todo', JSON.stringify(cache));
		  	}
	});
	}

if (document.querySelector(".todo__count").firstElementChild.innerHTML <  countLi.length) {   
			document.querySelector('.clear').style.opacity = 1;
		} else { document.querySelector('.clear').style.opacity = 0;}
});



if (document.querySelector(".todo__count").firstElementChild.innerHTML <  countLi.length) {
			document.querySelector('.clear').style.opacity = 1;
		} else { document.querySelector('.clear').style.opacity = 0;}
		

clear.onclick = function() {  
	let i = 0;
	let activeElem = todo__list.querySelectorAll('li');
		cache = JSON.parse(localStorage.getItem('todo'));
	activeElem.forEach( function(element, index) {
			if (element.querySelector('span').className == 'custom check') {
				index = index - i;
				cache.splice(index, 1);
				todoArray.splice(index,1);
				i++;

				element.remove();
			}
	});
	localStorage.setItem('todo', JSON.stringify(cache));
	
}
	let truefalse = false;
document.querySelector('.header').onclick = (event) => { 
	console.log(document.styleSheets);

	let all = todo__list.querySelectorAll('li');
	if (event.target.tagName == 'LABEL') {
					for (let elem of all) {
						(!truefalse) ? elem.querySelector('span').classList.add('check') : elem.querySelector('span').classList.remove('check');	
					}
	cache = JSON.parse(localStorage.getItem('todo'));
	cache.forEach( function(element, index) {
		if (!truefalse) { 
			element.check = true;  
		todoArray[index].check = true; 
		} 
		else 
			{ element.check = false; todoArray[index].check = false; }
	});

	(!truefalse) ? truefalse = true : truefalse = false;
	localStorage.setItem('todo', JSON.stringify(cache));
	document.querySelector(".todo__count").firstElementChild.innerHTML =   left();
	if (document.querySelector(".todo__count").firstElementChild.innerHTML <  countLi.length) {
			clear.style.opacity = 1;
		} else { clear.style.opacity = 0;}
		}
}

//Фильтры

document.querySelector('.footer').onclick = (event) => {
	let filter = [];
	let id = 0;
	let item = document.querySelectorAll('.item');
	if (event.target.innerHTML == 'Completed') {
		filter = document.querySelectorAll('.custom');
		filter.forEach( function(element) {
			if (element.className != 'custom check') {
		    id = element.nextElementSibling.getAttribute('id')-1;
			item[id].style.display = 'none';}
			else {
				id = element.nextElementSibling.getAttribute('id')-1;
				item[id].style.display = 'block';}
		});
	}
	else if (event.target.innerHTML == 'Active') {
		filter = document.querySelectorAll('.custom');
		filter.forEach( function(element) {
		   if (element.className != 'custom check') {
		    id = element.nextElementSibling.getAttribute('id')-1;
			item[id].style.display = 'block';}
			else {
				id = element.nextElementSibling.getAttribute('id')-1;
				item[id].style.display = 'none';}
		});
	}
	else if (event.target.innerHTML == 'All') {
		item.forEach(function(element) {
			element.style.display = 'block';
		});
	}
}


