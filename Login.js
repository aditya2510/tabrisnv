const {
  Action,Page,Button, CheckBox, Composite, TextView, TextInput, RadioButton, ScrollView, Slider, Switch, ui,ImageView,NavigationView,AlertDialog,Picker
} = require('tabris');

const  constants = require('./constants');
//const BooksPageSelector = require('./BooksPageSelector');
//const AboutPage = require('./AboutPage');
const ABOUT_ACTION_TITLE = 'About';


let navigationView = new NavigationView({
 left: 0, top: 0, right: 0, bottom: 0
}).appendTo(ui.contentView);

// Create a main page and add it to the navigation
//view
let mainPage = new Page({
 title: 'NovelVista'
}).on('appear',validateLocalDB).appendTo(navigationView);


//TODO: Remove Hard coding and put percentage for image
/*let logo = new ImageView({
    left: 30,top:50,
    image: 'https://www.novelvista.com/img/tnvlogo.png',
	background: '#aaaaaa',
    scaleMode: "auto"
  }).appendTo(mainPage);*/
  
  
  const AIRPORTS = [
  {
    id: 'SFO',
    name: 'Select Course'
  },
  {
    id: 'ITIL Foundation',
    name: 'ITIL Foundation'
  },
  {
    id: 'ITIL Intermediate',
    name: 'ITIL Intermediate'
  },
  {
    id: 'ITIL Practitioner',
    name: 'ITIL Practitioner'
  },
  
  {
    id: 'PRINCE2 Certification',
    name: 'PRINCE2 Certification'
  },
  {
    id: 'PRINCE2 Agile Practitioner',
    name: 'PRINCE2 Agile Practitioner'
  },
  {
    id: 'Agile Scrum Certification',
    name: 'Agile Scrum Certification'
  },
  
   {
    id: 'Certified Scrum Product Owner',
    name: 'Certified Scrum Product Owner'
  },
  {
    id: 'DevOps Certification',
    name: 'DevOps Certification'
  },
  {
    id: 'ISO Certification',
    name: 'ISO Certification'
  },
  {
    id: 'MSP Certification',
    name: 'MSP Certification'
  },
  {							
    id: 'Lean Six Sigma',
    name: 'Lean Six Sigma'
  },

  {							
    id: 'SIAM Certification',
    name: 'SIAM Certification'
  },
  {							
    id: 'PMP Certification',
    name: 'PMP Certification'
  },
  {							
    id: 'Cloud Computing Foundation',
    name: 'Cloud Computing Foundation'
  },
  {							
    id: 'COBIT5 Certification',
    name: 'COBIT5 Certification'
  },
  {							
    id: 'AWS Certification',
    name: 'AWS Certification'
  },
  {							
    id: 'Agile ITSM Certification',
    name: 'Agile ITSM Certification'
  },
  {							
    id: 'Blockchain Certification',
    name: 'Blockchain Certification'
  },
  {							
    id: 'Other',
    name: 'Other'
  }
  
];

let pickerIp = new Picker({
  left: 20, top: 200, right: 20,
  itemCount: AIRPORTS.length,
  itemText: (index) => AIRPORTS[index].name,
  selectionIndex: 0
}).appendTo(mainPage);

//let courseNameId = "";

//picker.on('select', ({index}) => console.log('Selected ' + AIRPORTS[index].id));
  
 let textView = new TextView({
  left: 16, top: 20,
  text: 'Name:'
}).appendTo(mainPage);

let loginInput = new TextInput({
  left: [textView, 16], right: 16, baseline: textView,
  message: 'Enter Name'
}).appendTo(mainPage);


 let textView2 = new TextView({
  left: 16, top: 80,
  text: 'Email:'
}).appendTo(mainPage);

let passwordTextIp = new TextInput({
  left: [textView2, 16], right: 16, baseline: textView2,
  message: 'Enter Email'
 }).appendTo(mainPage);
 
 let textView3 = new TextView({
  left: 16, top: 140,
  text: 'Mobile:'
}).appendTo(mainPage);

let mobileTextIp = new TextInput({
  left: [textView3, 16], right: 16, baseline: textView3,
  message: 'Enter Mobile:'
  }).appendTo(mainPage);



new Button({
  id: 'reservationButton',
  text: 'Submit Data',
  background: '#8b0000',
  textColor: 'white',
  top: 300,
  left: 130,
}).on('select', login).appendTo(mainPage);

function validateLocalDB2(){
	console.log("Redirect");
	
			/*navigationView = new NavigationView({
			left: 0, top: 0, right: 0, bottom: 0,
			drawerActionVisible: true
			}).appendTo(ui.contentView);

			ui.drawer.enabled = true;
			ui.drawer.append(
			  new BooksPageSelector({
				left: 0, top: 16, right: 0, bottom: 0
			  })
			);

			new Action({
			  id: 'aboutAction',
			  title: ABOUT_ACTION_TITLE,
			  placementPriority: 'high',
			  image:  {
				src: device.platform === 'iOS' ? 'images/about-black-24dp@3x.png' : 'images/about-white-24dp@3x.png',
				scale: 3
			  }
			}).on('select', () => new AboutPage().appendTo(navigationView))
			  .appendTo(navigationView);*/
	
	
}

function validateLocalDB(){
	//check local userid and password
	//validateLocalDB2();
}


function login(){
	var name = loginInput.text;
	var pass = passwordTextIp.text;
	var body = 	{"First_Name":name,"Email":pass,
	"Course":pickerIp.itemText(pickerIp.selectionIndex),
	"Mobile":mobileTextIp.text,"Source":"SP_Infocity","City":"Pune"};
	console.log(JSON.stringify(body));
	console.log(constants.loginURL);
	fetch(constants.loginURL, { 
    method: 'POST',
    body:    JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
	})
    .then(res => res.json())
	.then(function(res) {
		console.log("Response From Server"+JSON.stringify(res));
		loginInput.text = "";
		passwordTextIp.text = "";
		pickerIp.selectionIndex = 0;
		mobileTextIp.text = "";
		//validateLocalDB2();
		new AlertDialog({
		title: res.message,
		buttons: {ok: 'Ok'}
	}).open();
		
	});
}