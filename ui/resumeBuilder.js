/*
This is empty on purpose! Your code to build the resume will go here.
 */


var bio = {
"name" : "Nikhil Prakash",
"role" : "Web Application developer",
	"contacts": {
		"mobile": "8296452165",
		"email": "nikhil07prakash@gmail.com",
		"location": "Bangalore",
		},
	"skills": [
	"C", "Python", "HTML", "CSS", "Javascript", "Algorithmic Problem Solving","Linux" ],
}

var education = {
	"school": {
		"name": "R V College of Engineering",
		"city": "Bangalore",
		"Degree": "Bachelors",
		"Majors": "TE",
		}	
}
var work = {
	"jobs": [
	"Jobless"],
}	

var projects = {
	"projects": {
		"title": "Web application",
	}
}

/************************BUILDING RESUME*****************************************/


var name = "Nikhil Prakash";
var role = "Web Developer";

var format = HTMLheaderName.replace("%data%",name);
var format2 = HTMLheaderRole.replace("%data%",role);

$("#header").prepend(format2);
$("#header").prepend(format);


var mobile = 8296452165;
var email = "nikhil07prakash@gmail.com";
var image = "/ui/fry.jpg"
var branch = "Telecommuncation Eng.";
var message = "I am a passionate coder and I code to create and solve computational problems. Looking forward to be an active member of Ecell,RVCE. ";

var format = HTMLwelcomeMsg.replace("%data%",message);
$("#header").append(format);
var format = HTMLmobile.replace("%data%",mobile);
$("#topContacts").append(format);
var format = HTMLemail.replace("%data%",email);
$("#topContacts").append(format);
var format = HTMLbranch.replace("%data%",branch);
$("#topContacts").append(format);
var format = HTMLsemester.replace("%data%","First");
$("#topContacts").append(format);
var format = HTMLbioPic.replace("%data%",image);
$("#header").append(format);

if(bio.skills.length > 0) {
   $("#header").append(HTMLskillsStart);

   var formatskill = HTMLskills.replace("%data%",bio.skills[0]);
   $("#skills").append(formatskill);
   formatskill = HTMLskills.replace("%data%",bio.skills[1]);
   $("#skills").append(formatskill);
   formatskill = HTMLskills.replace("%data%",bio.skills[2]);
   $("#skills").append(formatskill);
   formatskill = HTMLskills.replace("%data%",bio.skills[3]);
   $("#skills").append(formatskill);
   formatskill = HTMLskills.replace("%data%",bio.skills[4]);
   $("#skills").append(formatskill);
   formatskill = HTMLskills.replace("%data%",bio.skills[6]);
   $("#skills").append(formatskill);
   formatskill = HTMLskills.replace("%data%",bio.skills[5]);
   $("#skills").append(formatskill);
}

$("#education").append(HTMLschoolStart);
var school1= "DAV Public School, Bandhabahal";
var format = HTMLschoolName.replace("%data%",school1);
$(".education-entry:last").append(format);
format = HTMLschoolDegree.replace("%data%","10th standard");
$(".education-entry:last").append(format);
format = HTMLschoolLocation.replace("%data%","Bandhabahal, Odisha");
$(".education-entry:last").append(format);
format = HTMLschoolName2.replace("%data%","Narayana Junior College, Hyderabad");
$(".education-entry:last").append(format);
format = HTMLschoolDegree.replace("%data%","12th standard");
$(".education-entry:last").append(format);
format = HTMLschoolLocation.replace("%data%","Hyderabad, Telangana");
$(".education-entry:last").append(format);
format = HTMLschoolName3.replace("%data%","RV College of Engineering, Bangalore");
$(".education-entry:last").append(format);
format = HTMLschoolDegree.replace("%data%","Bachelors of Engineering");
$(".education-entry:last").append(format);
format = HTMLschoolLocation.replace("%data%","Bangalore, Karnataka");
$(".education-entry:last").append(format);


$(".education-entry:last").append(HTMLonlineClasses);
var format = HTMLonlineTitle3.replace("%data%","Introdcution to Modern Application Development");
$(".education-entry:last").append(format);
format = HTMLonlineSchool.replace("%data%","IIT Madras");
$(".education-entry:last").append(format);
var format = HTMLonlineTitle1.replace("%data%","An Introduction to Interactive Programming in Python");
$(".education-entry:last").append(format);
format = HTMLonlineSchool.replace("%data%","Rice University");
$(".education-entry:last").append(format);
var format = HTMLonlineTitle2.replace("%data%","Introdcution to Linux");
$(".education-entry:last").append(format);
format = HTMLonlineSchool.replace("%data%","Linux Foundation");
$(".education-entry:last").append(format);

var job=0;
for(job in work.jobs) {
  $("#workExperience").append(HTMLworkStart);
  
  var formattedEmployer = HTMLworkEmployer.replace("%data%",work.jobs[job]);
  var formattedDescription = HTMLprojectDescription.replace("%data%","Doesn't have any professional work right now!");
  $(".work-entry:last").append(formattedEmployer);
  $(".work-entry:last").append(formattedDescription);
}

var format = HTMLmobile.replace("%data%",mobile);
$("#lets-connect").append(format);
var format = HTMLemail.replace("%data%",email);
$("#lets-connect").append(format);
var format = HTMLbranch.replace("%data%",branch);
$("#topContacts").append(format);
var format = HTMLtwitter.replace("%data%","@imnix07");
$("#lets-connect").append(format);
format = HTMLfacebook.replace("%data%","nix.prakash");
$("#lets-connect").append(format);


$("mapDiv").append(googleMap);

var elem2 = document.getElementById('madi');
var marginleft = 0;
function moveRight() {
    if(marginleft < 600){
    marginleft = marginleft + 2;
    elem2.style.marginLeft = marginleft + 'px';
}
}

elem2.onclick = function () {
   setInterval(moveRight,50);  
};

var elem2 = document.getElementById('madi');
var marginleft = 0;
function moveRight() {
    if(marginleft < 650) {
    marginleft = marginleft + 10;
    elem2.style.marginLeft = marginleft + 'px';}
}

elem2.onclick = function () {
   setInterval(moveRight,50);  
};

