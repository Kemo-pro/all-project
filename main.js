/* Start Animated Fonts */

// Function To Brake the Link
function brakeChain() {

// The Normal Link
let chain = document.getElementById("chain");
chain.innerHTML = "&#xf0c1;";

// Brake The Link
setTimeout(() => {
chain.innerHTML = "&#xf127;";
}, 1000);

}

// Call Function
brakeChain();

// Animate After 2 Seconds
setInterval(brakeChain, 2000);

// Function Animate The Charge Buttery
function chargeBattery(){

// Base Of Battery
let battery = document.getElementById('battery')
battery.innerHTML = "&#xf244;";

// 25% Charged Of Battery
setTimeout(() => {
battery.innerHTML = "&#xf243;";
}, 1000)

// 50% Battery Charge
setTimeout(() => {
battery.innerHTML = "&#xf242;";
}, 2000)

// 75% Battery charge
setTimeout(() => {
battery.innerHTML = "&#xf241;";
}, 3000)

// 100% Battery Charge
setTimeout(() => {
battery.innerHTML = "&#xf240;";
}, 4000)
}

// Run Function 
chargeBattery()

// Animited after 1 second
setInterval(chargeBattery,5000)

// Function Animate Hourglass
function hourglassTip(){

// Glass
let hourglass = document.getElementById('hourglass');
hourglass.innerHTML = '&#xf251'

// half sand down
setTimeout(()=>{
hourglass.innerHTML = '&#xf252';
},1000)

// Full Sand Down
setTimeout(()=>{
hourglass.innerHTML = '&#xf253';
},2000)
}

// Run Function
hourglassTip()

// Animate After 3 seconds
setInterval(hourglassTip,3000)

/* End Animated Fonts  */

/* Start Animated Counter */
const counters = document.querySelectorAll('.counter');
const speed= 200;

counters.forEach(counter => {

const updateCount = () => {
const target = +counter.getAttribute('data-target');
const count = +counter.innerText;
const inc = target / speed;

if(count < target){
counter.innerText = count + inc;
setTimeout(updateCount,1)
}else{
count.innerText = target;
}
}

updateCount()
})
/* End Animated Counter  */

/* Start Book List  */
// Book Class: Represents a Book
class Book{
constructor(title, author, isbn){
this.title = title;
this.author = author;
this.isbn = isbn;
}
}
// UI Class: Handle UI Tasks
class UI{
static displayBooks() {
const books = Store.getBooks()

books.forEach((book) => UI.addBookToList(book))
};

// Add Book Method
static addBookToList(book){
const list = document.querySelector('#book-list')
const row = document.createElement('tr')

row.innerHTML = `
<td>${book.title}</td>
<td>${book.author}</td>
<td>${book.isbn}</td>
<td><a href="#" class="btn btn-danger btn-sm delete">X</a>
</td>
`;
list.appendChild(row)
};

// Delete Book Method
static deleteBook(el){
if(el.classList.contains('delete')){
el.parentElement.parentElement.remove()
}
}
// Show Alert
static showAlert(message,className){

const div = document.createElement('div');
div.className = `alert alert-${className}`;
div.appendChild(document.createTextNode(message))
const container = document.querySelector('.container');
const form = document.querySelector('#book-form')
container.insertBefore(div,form)
// Vanish in 3 Seconds
setTimeout(() => document.querySelector('.alert').remove(),3000)
}

// Clear Fields Method;

static clearFields(){
document.querySelector('#title').value = ''
document.querySelector('#author').value = ''
document.querySelector('#isbn').value = ''
}

};
// Store Class: Handle Storage
class Store{

static getBooks(){
let books;
if(localStorage.getItem('books') === null){
books = [];
}else{
books = JSON.parse(localStorage.getItem('books'))
};
return books;
};

static addBook(book){
const books = Store.getBooks();
books.push(book)
localStorage.setItem('books', JSON.stringify(books))
}

static removeBook(isbn){
const books = Store.getBooks();
books.forEach((book,index) => {
if(book.isbn === isbn){
books.splice(index,1)
}
localStorage.setItem('books', JSON.stringify(books))
})

}
}


// Event: Display Book
document.addEventListener('DOMContentLoaded',UI.displayBooks)


// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
e.preventDefault()

// Get Form Values
const title = document.querySelector('#title').value;
const author = document.querySelector('#author').value;
const isbn = document.querySelector('#isbn').value;

// Validate
if(title === '' || author === '' || isbn === ''){
UI.showAlert('Please fill in all fields','danger')
}else{

// Instatiate Book
const book = new Book(title,author,isbn);

// Add The Book To UI
UI.addBookToList(book)

// Add Book To store
Store.addBook(book)

// Show Succses massege
UI.showAlert('Book Added', 'success')

// Clear Fields
UI.clearFields()
}

})

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
// Remove Book From UI
UI.deleteBook(e.target)

// Remove Book From Store
Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

// Delete Book massege
UI.showAlert('Book Removed', 'success')
})
/* End Book List  */

/* Start Book Marker  */

// Listen For Form Submit
document.getElementById("myForm").addEventListener("submit", saveBookmark);

// Function Save Bookmark
function saveBookmark(e) {
// Get Form Values
var siteName = document.getElementById("siteName").value;
var siteUrl = document.getElementById("siteUrl").value;

if(!validateForm(siteName,siteUrl)){
return false
}

var bookmark = {
name: siteName,
url: siteUrl,
};

// Put Bookmark Data To LocalStorage
if (localStorage.getItem("bookmarks") === null) {
// init array
var bookmarks = [];

// Add Input Value To array
bookmarks.push(bookmark);

// Set To LocalStorage
localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
} else {
// Get bookmarks From LocalStorage
var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

// Add bookmark to array
bookmarks.push(bookmark);

// Add to LocalStorage
localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

// Clear Form
document.getElementById('myForm').reset()

// Re-fetchBookmarks
fetchBookmarks();

// Call Validate Form
validateForm();

// Prevent Form From Submiting
e.preventDefault();
}

// Delete bookmark Function
function deleteBookmark(url) {
// Get bookmarks From LocalStorage
var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

// Loop Through bookmarks
bookmarks.forEach((e) => {
if (e.url == url) {
// Delete from array
bookmarks.splice(e, 1);
}
});

// Add to LocalStorage
localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

// Re-fetchBookmarks
fetchBookmarks();
}

// fetchBookmarks Function
function fetchBookmarks() {
// Get bookmarks From LocalStorage
var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

// Get output ID
var bookmarksResults = document.getElementById("bookmarkerResults");

// Bulid Output
bookmarksResults.innerHTML = "";

// Loop through bookmarks Data
bookmarks.forEach((e) => {
// Get Name From Data
var name = e.name;

// Get URL From Data
var url = e.url;

// Put Data To OutPut
bookmarksResults.innerHTML +=
'<div class="well">' +
"<h3>" +name +

' <a class="btn btn-primary" target="_blank" href="' +url +'">Visit</a> ' +

" <a onclick=\"deleteBookmark('" +url +'\')" class="btn btn-danger" href="#">Delete</a> ' +

"</h3>";
("</div>");
});
}

// Validate Form Function
function validateForm(siteName,siteUrl) {
if (!siteName || !siteUrl) {
alert("Please Fill The Inputs");
return false;
}

var expression =
/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
var regex = new RegExp(expression);

if (!siteUrl.match(regex)) {
alert("Please use a valid URL");
return false;
}
return true;
}
/* End Book Marker  */

/* Start Blury Lodaing */

// DOM Element
const loadText = document.querySelector('.loading-text');
const bg = document.querySelector('.bg');

// Start from loading
let load = 0;

// set init time
let init = setInterval(blurring ,30)

// Function of Blurring
function blurring(){
load++

if(load > 99){
clearInterval(init)
}

loadText.innerText = `${load}%`;
loadText.style.opacity = scale(load, 0, 100, 1, 0)
bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`
}

// https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (num, in_min, in_max, out_min, out_max) => {
return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
}

/* End Blury Lodaing */

/* Start Blury Lodaing */

// DOM Element
const heade = document.getElementById('header');
const tit = document.getElementById('title');
const excerpt = document.getElementById('excerpt');
const profile_img = document.getElementById('profile-img');
const nam = document.getElementById('name');
const dat = document.getElementById('date');

// Get Animated class
const animated_bgs = document.querySelectorAll('.animated-bg');
const animated_bg_texts = document.querySelectorAll('.animated-bg-text');

// Get Data Function
function getData(){

// Put img in the page
heade.innerHTML = '<img src="./istockphoto-1389603578-1024x1024.jpg" alt="">';

// put title text in the page
tit.innerHTML = 'Lorem ipsum dolor sit amet.';

// put paragraph text in the page
excerpt.innerHTML = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque, exercitationem?';

// Put profile img in page
profile_img.innerHTML = '<img src="https://randomuser.me/api/portraits/men/45.jpg" alt="">';

// put user info to the page
nam.innerHTML = 'Jone Doe';
dat.innerHTML = 'Oct 08, 2020';

// Show Content in page
animated_bgs.forEach((animate) => animate.classList.remove('animated-bg'));
animated_bg_texts.forEach((text) => text.classList.remove('animated-bg-text'));
};

// Show Content after this time
setTimeout(getData,2500)
/* End Blury Lodaing */

/* Start Count Down */
const countDown = document.querySelector('.countdown');

// // Set Lunch Date
const launchDate = new Date('Jan 1, 2024 13:00:00').getTime();
// Update Every Second
const intiVal = setInterval( () => {

// Get Today Day And Time (ms)
const now = new Date().getTime();

// Get Distance From now to lunch date
const distance = now- launchDate ;

// Time Caulculation
const days = Math.floor(distance / (1000 * 60 * 60 * 24));
const hours = Math.floor( (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
const mins = Math.floor( (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 ));
const sec = Math.floor( (distance % (1000 * 60 * 60 * 24)) / (1000 ));

// Display Results
countDown.innerHTML = `
<div>${days}<span>Days</span></div>
<div>${hours} <span> Hours</span></div>
<div>${mins} <span> Minutes</span></div>
<div>${sec} <span> Secound</span></div>
`;

// If Launch Date Passed
if(distance < 0){
//Stop CountDown
clearInterval(intiVal)
// Style OutPut And Text
countDown.style.color = '#17a2b8';
countDown.innerHTML = 'Lunched!'
}
}, 1000)
/* End Count Down */

/* Start Drag & Drop */
const fill = document.querySelector('.fill');
const empties = document.querySelectorAll('.empty');

// Fill Listeners
fill.addEventListener('dragstart',dragStart);
fill.addEventListener('dragend',dragEnd);


// Loop Through Empties and call drag
for(const empty of empties){
empty.addEventListener('dragover',dragOver)
empty.addEventListener('dragenter',dragEnter)
empty.addEventListener('dragleave',dragLeave)
empty.addEventListener('drop',dragDrop)

}

// Drags Function
function dragStart(){
this.className += ' hold';

setTimeout(()=> this.className = 'invisible',0)
}

function dragEnd(){
this.className = 'fill'
}

function dragOver(e){
e.preventDefault()
}

function dragEnter(e){
e.preventDefault()
this.className += ' hoverd'
}

function dragLeave(){
this.className = 'empty'
}

function dragDrop(){
this.className = 'empty';
this.append(fill)
}
/* End Drag & Drop */  

/* Start Facts Number */
let fact = document.getElementById('fact');
let factText = document.getElementById('factText');
let numberInput = document.getElementById('numberInput');

// Function getFactAjax
function getFactAjax(){
let number = numberInput.value;

let xhr = new XMLHttpRequest();
xhr.open('GET', 'http://numbersapi.com/'+number);

xhr.onload = function(){

if(this.status == 200 && number != ''){
fact.style.display = 'block';
factText.innerText = this.responseText
}

}
xhr.send()
}

numberInput.addEventListener('input', getFactAjax)
/* End Facts Number */

/* Start Filterable App */

// get input element
let filterInput = document.getElementById('filterInput');

// Add event listener
filterInput.addEventListener('keyup',filterNames)

// Function 
function filterNames(){

// Get Value Of Input
let filterValue = document.getElementById('filterInput').value.toUpperCase();

// Get Names UL
let names = document.getElementById("names")

// Get items li
let li = names.querySelectorAll('li.collection-item');

// Loop On ul Li
for(let i = 0; i<=li.length;i++){

let a = li[i].getElementsByTagName('a')[0];

// if matches
if(a.innerHTML.toLocaleUpperCase().indexOf(filterValue)>-1){

li[i].style.display = '';

}
else{
li[i].style.display = 'none'
}

}
}
/* End Filterable App */

/* Start Full Screen */

// // Variables
let sliderImage = document.querySelectorAll('.slide'),
arrowRight = document.querySelector('#arrow-right'),
arrowLeft = document.querySelector('#arrow-left'),
current = 0;

// Functions

// Clear All Images
function reset(){
for(let i = 0; i < sliderImage.length; i++){
sliderImage[i].style.display = 'none';
}
}

// init slider
function startSlide(){
reset()
sliderImage[0].style.display = 'block'
}

// Show Prev
function slideLeft(){
reset()
sliderImage[current - 1].style.display = "block";
current--;
}

// Show Next
function slideRight(){
reset()
sliderImage[current + 1].style.display = "block";
current++;
}


// // Events
arrowLeft.addEventListener('click', function (){
if(current === 0){
current = sliderImage.length;
}
slideLeft()
})

arrowRight.addEventListener('click', function (){
if(current === sliderImage.length-1){
current = -1;
}
slideRight()
})

startSlide()
/* End Full Screen */

/* Start Live User Filter */ 

// DOM elemnt 
const result = document.getElementById('result');
const input = document.getElementById('filter');
const listItems = [];

// Event to input
input.addEventListener('input', (m) => fliterData(m.target.value))

// Get Data Function
async function getData(){

// Fetch link of data
const res = await fetch('https://randomuser.me/api?results=50');

// change data to json
const { results } = await res.json();

// Clear the result
result.innerHTML = ''

// Loop Through data Users
results.forEach(user => {

// creat the li Element
const li = document.createElement('li')

// push it to array
listItems.push(li)

// Put data to li element
li.innerHTML = `
<img class="mg" src="${user.picture.large}" alt = "${user.name.first}">
<div class="user-info">
<h4>${user.name.first} ${user.name.last}</h4>
<p>${user.location.city}, ${user.location.country}</p>
</div>
`;

// apper to the page
result.appendChild(li)
});
}

// Function of get Matchy Word
function fliterData(search){

// Loop Through Array of Data
listItems.forEach( item=> {

// Check if input value match data
if(item.innerText.toLowerCase().includes(search.toLowerCase())){
item.classList.remove('hide')
}else{
item.classList.add('hide')
}

})
}

// Run
getData()
/* End Live User Filter */

/* Start Landing Page */

// DOM Elements
const time = document.getElementById('time');
const greeting = document.getElementById('greeting');
const na = document.getElementById('name');
const foucs = document.getElementById('foucs');

// Show Time
function showTime(){
let today = new Date();
let hours = today.getHours();
let minutes = today.getMinutes();
let second = today.getSeconds();

// Set AM Or PM
const amPm = hours >= 12 ? 'PM' : 'AM';

// 12H Formate
hours = hours % 12 || 12;

// outPut Time 
time.innerHTML = `${hours}<span>:</span>${addZero(minutes)}<span>:</span>${addZero(second)} ${amPm}`;

setTimeout(showTime,1000)
};

// Add Zero
function addZero(n){
return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set BackGround & Greeting
function setBgGreet(){
let today = new Date();
let hours = today.getHours();

if(hours < 12){
// Morning
document.body.style.backgroundImage = "url('./istockphoto-1737349668-1024x1024.jpg')";
greeting.textContent = 'Good Morning'
}else if(hours < 18){
// AfterNoon
document.body.style.backgroundImage = "url('../img/after noon.jpg')";
greeting.textContent = 'Good Afternoon'
}else{
// Night
document.body.style.backgroundImage = "url('../img/night.jpg')";
greeting.textContent = 'Good Night'
}
}


// Get Name
function getName(){
if(localStorage.getItem('name') === null){
na.textContent = '[Enter Name]' 
}else{
na.textContent = localStorage.getItem('name')
}
}

// Set Name
function setName(e){
if(e.type === 'keypress'){

if(e.which == 13 || e.keyCode == 13){
localStorage.setItem('name', e.target.innerText)
na.blur()
}

}else{
localStorage.setItem('name', e.target.innerText)
}
}

// Set Foucs
function setName(e){
if(e.type === 'keypress'){

if(e.which == 13 || e.keyCode == 13){
localStorage.setItem('foucs', e.target.innerText)
foucs.blur()
}

}else{
localStorage.setItem('foucs', e.target.innerText)
}
}

// Get Foucs
function getFoucs(){
if(localStorage.getItem('foucs') === null){
foucs.textContent = '[Enter Foucs]'
}else{
foucs.textContent = localStorage.getItem('foucs')
}
}

// EVENTS
na.addEventListener('keypress', setName)
na.addEventListener('blur', setName)

foucs.addEventListener('keypress', setName)
foucs.addEventListener('blur', setName)

// Run
showTime()
setBgGreet()
getName()
getFoucs()

/* End Landing Page */

/* Start Modal */ 

// Get Modal Element
var modal = document.getElementById('simpleModal');
// Get open Modal Content
var modalBtn = document.getElementById('btn');
// Get CloseBtn
var closeBtn = document.getElementsByClassName('closeBtn')[0];

// Listen For open Click
modalBtn.addEventListener('click',openModal);
// Listen For Close Click
closeBtn.addEventListener('click',closeModal)
// Listen For OutSide Click
window.addEventListener('click',clickOutside)

// Function To OpenModal
function openModal(){
modal.style.display = 'block'
};
// Function To CloseModal
function closeModal(){
modal.style.display = 'none'
};
// Function To OpenModal
function clickOutside(e){
if(e.target == modal){
modal.style.display = 'block';
}
};

/* End Modal */ 

/* Start Modern Img */ 
const curren = document.querySelector('#current');
const imgs = document.querySelectorAll('.imgs img');
const opacity = 0.4;

imgs[0].style.opacity = opacity;

// Loop Through Imgs
imgs.forEach(img => img.addEventListener('click' , imgClick))

function imgClick(e){
// Reset Opacity
imgs.forEach(img => img.style.opacity = 1)
// Change current img to src 
curren.src = e.target.src

// Add Fade-in Class To Imgs
curren.classList.add('fade-in')

// Set Time Out
setTimeout(() => curren.classList.remove('fade-in'),500)

// change opacity
e.target.style.opacity = opacity;
}
/* End Modern Img */ 

/* Start Music Player */
// Variables
const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const titl = document.querySelector('#title');
const cover = document.querySelector('#cover');

// Song Titles
const songs = ['Dede','Aloomk','Marwan Pablo'];

// Keep Track of The Songs
let songIndex = 1;

// Init load song info DOM
loadSongs(songs[songIndex])

// Function to Upadate Song Details
function loadSongs(song){
// Change Title
titl.innerText = song;
// Change Audio Src
audio.src = `Music/${song}.mp3`;
// Change Audio Src
cover.src = `images/${song}.jfif`;
}

// playSong Function
function playSong(){
musicContainer.classList.add('play')
playBtn.querySelector('i.fa').classList.remove('fa-play')
playBtn.querySelector('i.fa').classList.add('fa-pause')

audio.play()
}

// pauseSong Function
function pauseSong(){
musicContainer.classList.remove('play')
playBtn.querySelector('i.fa').classList.remove('fa-pause')
playBtn.querySelector('i.fa').classList.add('fa-play')

audio.pause()
}


// prevSong Function
function prevSong(){
songIndex--
if(songIndex < 0){
songIndex = songs.length - 1
}

loadSongs(songs[songIndex])
playSong()
}

// nextSong Function
function nextSong(){
songIndex++
if(songIndex > songs.length - 1){
songIndex = 0
}

loadSongs(songs[songIndex])
playSong()
}

// Update Time Line Of song
function updateProgress(e){
const {duration,currentTime} = e.srcElement;
const progressPercent = (currentTime / duration) * 100;
progress.style.width = `${progressPercent}%`
}

// setProgress Function
function setProgress(e){
const width = this.clientWidth
const clickX = e.offsetX
const duration = audio.duration;

audio.currentTime = (clickX / width) * duration 
}

// Event Listeners
playBtn.addEventListener('click', () => {

// isPlaying Condition
const isPlaying = musicContainer.classList.contains('play')

if(isPlaying){
pauseSong()
}else{
playSong()
}
})

// Change Songs Events 
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate',updateProgress)
progressContainer.addEventListener('click',setProgress)
audio.addEventListener('ended',nextSong)
/* End Music Player */

/* Start Random Choice */

// DOM Element
const tagsEl = document.getElementById('tags');
const textarea = document.querySelector('textarea')

// Method to foucs
textarea.focus()

// EventListener
textarea.addEventListener('keyup', (e) => {

// Call the Function
creatTags(e.target.value)

// Condition if press on enter
if(e.key === 'Enter'){

// To Clear value of textarea
setTimeout(() => {
e.target.value = ''
},10)

// call function
randomSelect()
}

});

// Creat Tags Function
function creatTags(input){

// Split choice
const tags = input.split(',').filter(tag => tag.trim() !== '').map(tag => tag.trim())

// make inner html 
tagsEl.innerHTML = ''

// Loop Through tags and load through page
tags.forEach(tag => {

// Creat the element
const tagEl = document.createElement('span');

// add class name
tagEl.classList.add('tag')

// put every value to span
tagEl.innerText = tag

// apper span on the page
tagsEl.appendChild(tagEl)
})
}

// Random Select Function
function randomSelect(){

// Init the Time
const taime = 30

// Set interVal To Repeat it
const interval = setInterval(() => {

// the function
const randomTag = pickRandomTag()

// add class to tags
hightlightTag(randomTag)

// add time out to remove class
setTimeout(() => {
unHightlightTag(randomTag)
},100)
}, 100);

// time out to clear repeat
setTimeout(() => {
clearInterval(interval)

// the choice
setTimeout(() => {
const randomTag = pickRandomTag()
hightlightTag(randomTag)
},100)

}, taime * 100)
}

// function to pick the random choice
function pickRandomTag(){
// Get All Tags
const tags = document.querySelectorAll('.tag')
// make the random choice
return tags[Math.floor(Math.random() * tags.length)]
}

// set highlight to add highlight function
function hightlightTag(tag){
// add class of highlight
tag.classList.add('highlight')
}

// set highlight to removr highlight function
function unHightlightTag(tag){
// remove class of highlight
tag.classList.remove('highlight')
}

/* End Random Choice */

/* Start Rating App */

// init rating
const ratings = {
sony: 4.7,
samsung: 3.4,
vizio: 2.3,
philips: 3.7,
panasonic: 4.1
};
const totalStars = 5;

// Run GetRatings when DOM Loaded
document.addEventListener('DOMContentLoaded',getRatings)

// Form Elements
const productSelect = document.getElementById('product-select');
const ratingControl = document.getElementById('rating-control');

// init product
let product;

// Product select change
productSelect.addEventListener('change', (e) => {
product = e.target.value 

// Enable Rating Control
ratingControl.disabled = false

ratingControl.value = ratings[product]
})

// Enable to Change rating
ratingControl.addEventListener('blur', (e) => {
const rating = e.target.value;

if(rating > 5){
alert('Please Rate From 1 - 5')
return;
};

// change by rating
ratings[product] = rating

getRatings()


})


// Get Ratings
function getRatings(){
// LOOP
for(let rating in ratings){

// Start Persantge
const starPercentage = (ratings[rating] / totalStars)*100;

// persantg Rounded
const starPercentageRounded = `${Math.round(starPercentage / 10)*10}%`;

// Set Stars limit to the persantege

document.querySelector(`.${rating} .stars-inner`).style.width = starPercentageRounded;

// Add number rating
document.querySelector(`.${rating} .numbers-rating`).innerHTML = ratings[rating];
}
}

/* End Rating App */

/* Start Richest Ten Pepole */

// Dom Elements
const darggable_list = document.getElementById('draggable-list');
const checkBtn = document.getElementById('check');
// Values Variable
const richesPeople = [
'Elon Musk',
'Jeff Bezos',
'Bernard Arnault',
'Mark Zuckerberg',
'Larry Page',
'Bill Gates',
'Steve Ballmer',
'Larry Ellison',
'Kareem Ebrahim',
'Ahemd Hossam'
];

// Store To Last thing
let listIte = [];

let dragStartIndex;

creatList()


// Insert List Items Into The DOM
function creatList(){

[...richesPeople]
.map( a => ({ value:a , sort: Math.random()}))
.sort((a , b) => a.sort - b.sort)
.map(a => a.value)
.forEach((person,index) => {
// Creat 10 li
const listItem = document.createElement('li');

// Set Index value to Data-index 
listItem.setAttribute('data-index',index);

// Put richest people in DOM
listItem.innerHTML = `
<span class="number">${index + 1}</span>
<div class= "draggable" draggable= "true">
<p class="person-name">${person}</p>
<i class= "fa fa-grip-lines"></i>
</div>
`;

// Push Items To Lists
listIte.push(listItem)

// Show This On Screen
darggable_list.appendChild(listItem)
});

// Call Function Drag & Drop Events
addEventListeners()
}

// Drag Start Function
function dragStar(){
// console.log('Event:','Start')
dragStartIndex = +this.closest('li').getAttribute('data-index')

}

// Drag Enter Function
function dragEnte(){
// console.log('Event:','Enter')
this.classList.add('over')
}

// Drag Leave Function
function dragLeav(){
// console.log('Event:','Leave')
this.classList.remove('over')
}

// Drag over Function
function dragOve(e){
// console.log('Event:','Over')
e.preventDefault()
}

// Drag Drop Function
function dragDro(){
// console.log('Event: ','Drop')
const dragEndIndex = +this.getAttribute('data-index');
swapItems(dragStartIndex,dragEndIndex);

this.classList.remove('over')
}


// Function Swap Items
function swapItems(from,to){
const itemOne = listIte[from].querySelector('.draggable');
const itemTwo = listIte[to].querySelector('.draggable');

listIte[from].appendChild(itemTwo)
listIte[to].appendChild(itemOne)
}

// Cheack Order Function
function checkOrder(){

listIte.forEach((listItem,index) => {
const personName = listItem.querySelector('.draggable').innerText.trim();

if(personName !== richesPeople[index]){
listItem.classList.add('wrong')
}else{
listItem.classList.remove('wrong')
listItem.classList.add('right')
}

})

}

// Function Of Events Drag And Drop
function addEventListeners(){
const draggables = document.querySelectorAll('.draggable');
const dragListItems = document.querySelectorAll('.draggable-list li');

draggables.forEach(draggable => {
// Event Drag Start
draggable.addEventListener('dragstart', dragStar)
})

dragListItems.forEach(item => {
// Event Drag Over
item.addEventListener('dragover', dragOve)
// Event Drag Drop
item.addEventListener('drop', dragDro)
// Event Drag Enter
item.addEventListener('dragenter', dragEnte)
// Event Drag Leave
item.addEventListener('dragleave', dragLeav)

})
} 

checkBtn.addEventListener('click', checkOrder)
/* End Richest Ten Pepole */  

/* Start Speed Writer */
window.addEventListener('load',ini)
//Global Variables

// Avilable Levels
const levels = 5;

// To Change Level
const currentLevel = levels;

let tim = currentLevel;
let score = 0;
let isPlaying;

// Doms Element
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#tim');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const words = [
'name',
'hos',
'kemo',
'Aisel',
'ahmed',
'hamsa',
'sami',
'mone',
'battool'
];

// Initlize game
function ini(){
// Show Second in UI
seconds.innerHTML = currentLevel;
// Load Word From Array
showWord(words)

// Start Matching With Word Input
wordInput.addEventListener('input', startMatch)

// Call CountDown
setInterval(countdown, 1000)

// Cheack Status
setInterval(cheackStatus,50)
};

// Start Match
function startMatch(){

if(matchWords()){
isPlaying = true
tim = currentLevel + 1;
showWord(words);
wordInput.value = '';
score++;
}

// If Score -1 Display Zero
if(score === -1 ){
scoreDisplay.innerHTML = 0
}else{
scoreDisplay.innerHTML = score;
}

}

// Match Current Word To The InputWord
function matchWords(){
if(wordInput.value === currentWord.innerHTML){
message.textContent = 'Correct!!';
return true;
}else{
message.textContent = '';
return false;
}
}

// Pick and show random word
function showWord(words){
// Generate random arr index
const ranIndex = Math.floor(Math.random() * words.length)

// Out Put Random Word
currentWord.innerHTML = words[ranIndex]
}

// Countdown timer 
function countdown(){
// Make Sure If Time is Not Run Out
if(tim > 0){
// Decremeant
tim--;
}else if(tim === 0){
// Game is Over
isPlaying = false;
}
// Show Time In the Page
timeDisplay.innerHTML = tim
}

// Cheack Status Game
function cheackStatus(){
if(!isPlaying && tim === 0){
message.textContent = 'Game Over!'
score = -1;
}
}
/* End Speed Writer */

/* Start Speak */ 

// init speechSynthesis API
const synth = window.speechSynthesis;

// DOM Elements
const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");
const body = document.querySelector('.speak')
// Init voices array
let voices = [];

const getVoices = () => {
voices = synth.getVoices();

// Loop Throug voices
voices.forEach((voice) => {
// Creat voice element
const option = document.createElement("option");
// fill option with voices
option.textContent = voice.name + "(" + voice.lang + ")";
// set attributs to option
option.setAttribute("data-lang", voice.lang);
option.setAttribute("data-name", voice.name);
voiceSelect.appendChild(option);
});
};

getVoices();
if (synth.onvoiceschanged !== undefined) {
synth.onvoiceschanged = getVoices;
}

// Speak
const speak = () => {

// Cheack if Speaking
if(synth.speaking){
console.error('already')
return;
}

if(textInput.value !== ''){
// Add background image
body.style.background = '#141414 url(./wave.gif)'
body.style.backgroundRepeat = 'repeat-x'
body.style.backgroundSize = '100% 100%'
// Get Speak Text
const speakText = new SpeechSynthesisUtterance(textInput.value)

// Speak End
speakText.onend = e =>{
console.log('Done Speaking')
body.style.background = '#141414'
}

// Speak error
speakText.onerror = e =>{
console.error('Wrong')
};

// Selected voice
const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name')

// Loop Throug voices
voices.forEach(voice =>{
if(voice.name === selectedVoice){
speakText.voice = voice;
}
})
// set pitch and rate
speakText.rate = rate.value;
speakText.pitch = pitch.value;

// Speak
synth.speak(speakText)
}
}

// Event Listenr

// Text form submit
textForm.addEventListener('submit', e => {
e.preventDefault()
speak()
textInput.blur()
})

// Rate change 
rate.addEventListener('change',e => rateValue.textContent = rate.value)
// pitch
pitch.addEventListener('change',e => pitchValue.textContent = pitch.value)
// voice select
voiceSelect.addEventListener('change', e => speak())
/* End Speak */ 

/* Start Touch Slider */

// Variables 
const slidr = document.querySelector('.slidr-container');
const slids = Array.from(document.querySelectorAll('.slid'));
// Values 
let isDraging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;
let currentIndex = 0;

// Loop Through Slides
slids.forEach((slid,index) => {
// Select imgs
const slideImage = document.querySelector('img');
slideImage.addEventListener('dragstart', (e) => e.preventDefault())

// Touch Events
slid.addEventListener('touchstart', touchStart(index))
slid.addEventListener('touchend', touchEnd)
slid.addEventListener('touchmove', touchMove)

// Mouse Events
slid.addEventListener('mousedown', touchStart(index))
slid.addEventListener('mouseup', touchEnd)
slid.addEventListener('mouseleave', touchEnd)
slid.addEventListener('mousemove', touchMove)

})

// Display Context Menue
window.oncontextmenu = function (e){
e.preventDefault()
e.stopPropagation()
return false
}

// Touch Start Function
function touchStart(index){
return function(event){

currentIndex = index
startPos = getPositionX(event)
isDraging = true
animationID = requestAnimationFrame(animation)
slidr.classList.add('grabbing')

};
};

// Touch End Function
function touchEnd(){
// To Can not move
isDraging = false

// To Switch
const movedBy = currentTranslate - prevTranslate
if(movedBy < -100 && currentIndex < slids.length - 1) currentIndex += 1
if(movedBy > 100 && currentIndex > 0) currentIndex -= 1
setPositionByIndex()

// To stop Animated Method
cancelAnimationFrame(animationID)
slidr.classList.remove('grabbing')
}

// Touch Move Function
function touchMove(event){

if(isDraging){
const currentPosition = getPositionX(event);
currentTranslate = prevTranslate + currentPosition - startPos;
}

}

// The degree of position
function getPositionX(event){
return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

// Animation degree
function animation(){
setSliderPosition()
if(isDraging) requestAnimationFrame(animation)
}

// the Dinamic Degree of slide
function setSliderPosition(){
slidr.style.transform = `translateX(${currentTranslate}px)`;
}

// the Next Index Function
function setPositionByIndex(){
currentTranslate = currentIndex * -window.innerWidth;
prevTranslate = currentTranslate
setSliderPosition()
}
/* End Touch Slider */

/* Start Auto Writer */ 
class TypeWriter {
constructor(txtElement, words, wait = 3000) {
this.txtElement = txtElement;
this.words = words;
this.txt = '';
this.wordIndex = 0;
this.wait = parseInt(wait, 10);
this.type();
this.isDeleting = false;
}

type() {
// Current index of word
const current = this.wordIndex % this.words.length;
// Get full text of current word
const fullTxt = this.words[current];

// Check if deleting
if(this.isDeleting) {
// Remove char
this.txt = fullTxt.substring(0, this.txt.length - 1);
} else {
// Add char
this.txt = fullTxt.substring(0, this.txt.length + 1);
}

// Insert txt into element
this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

// Initial Type Speed
let typeSpeed = 300;

if(this.isDeleting) {
typeSpeed /= 2;
}

// If word is complete
if(!this.isDeleting && this.txt === fullTxt) {
// Make pause at end
typeSpeed = this.wait;
// Set delete to true
this.isDeleting = true;
} else if(this.isDeleting && this.txt === '') {
this.isDeleting = false;
// Move to next word
this.wordIndex++;
// Pause before start typing
typeSpeed = 500;
}

setTimeout(() => this.type(), typeSpeed);
}
}


// Init On DOM Load
document.addEventListener('DOMContentLoaded', initee);

// Init App
function initee() {
const txtElement = document.querySelector('.txt-type');
const words = JSON.parse(txtElement.getAttribute('data-words'));
const wait = txtElement.getAttribute('data-wait');
// Init TypeWriter
new TypeWriter(txtElement, words, wait);
}
/* End Auto Writer */ 

/* Start Weight Conventer */
document.getElementById('outPut').style.visibility ='hidden'

document.getElementById("lbsInput").addEventListener('input',function(e){
document.getElementById('outPut').style.visibility ='visible'
let pounds = e.target.value;
document.getElementById('gramsOutput').innerHTML=pounds/0.0022046;
document.getElementById('kgOutput').innerHTML=pounds/2.2046;
document.getElementById('ozOutput').innerHTML=pounds*16;
})
/* End Weigt Conventer*/  

/* Start Zip Code */ 
// Listen For Submit 
document.querySelector('#zipForm').addEventListener('submit',getLocationInfo)
document.querySelector(".code").addEventListener("click", deleteLocation);
function getLocationInfo(e){
// Get Zip Value from input
const zip = document.querySelector('.zip').value;

// Make request
fetch(`https://api.zippopotam.us/us/${zip}`).then(res => {

if(res.status != 200){
document.querySelector('#output').innerHTML = `
<article class="message is-danger"><div class=" message-body">Invalid zip, pls try again</div></article>
`
throw Error(res.statusText)
}else{

return res.json()
}

}).then(data => {
// Show location info
let output = "";

data.places.forEach(place => {
output += `
<article class="message is-primary">
<div class="message-header">
<p>Location Info</p>
<button class="delete"></button>
</div>
<div class="message-body">
<ul>
<li><strong>City: </strong>${place["place name"]}</li>
<li><strong>State: </strong>${place["state"]}</li>
<li><strong>Longitude: </strong>${place["longitude"]}</li>
<li><strong>Latitude: </strong>${place["latitude"]}</li>
</ul>
</div>
</article>
`;

});

// Insert into output div
document.querySelector("#output").innerHTML = output;
})
.catch(err => console.log(err))

e.preventDefault()
}

function deleteLocation(e){
if(e.target.className == 'delete'){
document.querySelector(".message").remove();
document.querySelector(".zip").value = "";
document.querySelector(".icon-check").remove();
}
}
/* End Zip Code */ 
