var db = window.openDatabase("test1", "1.0", "tutorial database", 1000000); 
document.addEventListener("deviceready", onDeviceReady, false);
                     
  function onDeviceReady() {

    // Create Table
    db.transaction(populateDB, errorCB, successCB);

    // Select records
    fetchData();
  }

  function populateDB(tx){

    tx.executeSql('CREATE TABLE IF NOT EXISTS students (username TEXT NOT NULL, password TEXT NOT NULL, passwordConf TEXT NOT NULL, country TEXT NOT NULL)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS teachers (username TEXT NOT NULL, password TEXT NOT NULL, passwordConf TEXT NOT NULL, country TEXT NOT NULL, language TEXT NOT NULL, subject TEXT NOT NULL, level TEXT NOT NULL, availability TEXT NOT NULL)');
    
  }

  // Fetch all records
  function fetchData(){
    
    db.transaction(function(tx){
                    
      tx.executeSql("select * from students");
      tx.executeSql("select * from teachers");
    }, errorCB, successCB);
  }
                     
  function insertDataS(){
   
    // Insert record
    db.transaction(insertStudent, errorCB, successCB);
    alert("You are now registered. We are happy to welcome you in the family !");
  
  }

  function insertDataT(){
  
    // Insert record
    db.transaction(insertTeacher, errorCB, successCB);
    alert("You are now registered. We are happy to welcome you in the family !");
    
  }

  function insertStudent(tx){
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var passwordConf = document.getElementById('passwordConf').value;
    var country = document.getElementById('country').value;

    tx.executeSql("INSERT INTO students(username, password, passwordConf, country) VALUES (?,?,?,?)",[username, password, passwordConf, country]);
                       
                         
  }

  function insertTeacher(tx){                  
                     
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var passwordConf = document.getElementById('passwordConf').value;
    var country = document.getElementById('country').value;
   
    const form = document.getElementById("registerForm");
    form.onsubmit = submit;
    function submit(event) {
      event.preventDefault();
      console.log("form submitted", event);
      const english = document.getElementById("english");
      const spanish = document.getElementById("spanish");
      const french = document.getElementById("french");

      console.log(english.checked, spanish.checked, french.checked);

      // now you can add this object to the database
      const checkboxesValues = {
        checkbox1: english.checked,
        checkbox2: spanish.checked,
        checkbox3: french.checked
      };

      // For this example, don't actually submit the form
    }

    tx.executeSql("INSERT INTO teachers(username, password, passwordConf, country) VALUES (?,?,?,?)",[username, password, passwordConf, country]);
                      
  }

  function errorCB(err) {
    alert("Error processing SQL: "+err.code + err.message);
  }

  function successCB() {
            
  }