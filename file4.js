var index;

function initial(){
  if(JSON.parse(localStorage.getItem('studentstrial')) == null){
    localStorage.setItem('studentstrial',"[]");
  }
  
}
function updatelist(){
  $('.listitem').remove();
  var students = JSON.parse(localStorage.getItem('studentstrial'));
  if(students.length == 0){
    $('.nostud').addClass('showelement');
    return;
  } else {
    $('.nostud').removeClass('showelement');
  }
  for(let i=0; i<students.length; i++){
    var listitem = $('<div></div>');
    listitem.addClass('listitem');
    var listname = $('<div></div>');
    listname.addClass('listname');
    listname.append('<p style="margin : 0;">NAME : '+students[i].fname+'</p>');
    var listid = $('<div></div>');
    listid.addClass('listid');
    listid.append('<p style="margin : 0;">ID : '+students[i].id+'</p>');
    var listdetail = $('<div></div>');
    listdetail.addClass('listdetail');
    listdetail.append('<button type="button" name="button" class="listbut" onclick="studetail('+i+')"><img src="info.png" width="30px" height="30px;"/></button>');
    var listedit = $('<div></div>');
    listedit.addClass('listedit');
    listedit.append('<button type="button" name="button" class="listbut" onclick="studedit('+i+')"><img src="edit.png" width="30px" height="30px;"/></button>');
    var listdel = $('<div></div>');
    listdel.addClass('listdel');
    listdel.append('<button type="button" name="button" class="listbut" onclick="studdel('+i+')"><img src="del.png" height="30px" width="30px"/></button>');
    listitem.append(listname);
    listitem.append(listid);
    listitem.append(listdetail);
    listitem.append(listedit);
    listitem.append(listdel);
    $('.listDiv').append(listitem);
  }
}
//console.log(typeof($('#addid').val()));
function addBack(){
  $('.errorId').removeClass('showelement');
  $('.addDiv').removeClass('showaddDiv');
  $('.add').show();
  $('.edit').hide();
}
function addStud(){
  $('.addDiv').addClass('showaddDiv');
   //$('.fbutton').show();
}
function studedit(n){
  var students = JSON.parse(localStorage.getItem('studentstrial'));
  $('.addHeading').text(students[n].fname);
  $('#addid').val(students[n].id);
  $('#addfname').val(students[n].fname);
  $('#addlname').val(students[n].lname);
  $('#addemail').val(students[n].email);
  $('#addftname').val(students[n].ftname);
  $('#addftnum').val(students[n].ftnum);
  $('.add').hide();
  $('.edit').show();
  index=n;
  addStud();
}
function studdel(n){
  var students = JSON.parse(localStorage.getItem('studentstrial'));
  students.splice(n,1);
  localStorage.setItem('studentstrial',JSON.stringify(students));
  updatelist()
};
function addstudent(n){
  var aid = $('#addid').val();
  var afname = $('#addfname').val();
  var alname = $('#addlname').val();
  var aemail = $('#addemail').val();
  var aftname = $('#addftname').val();
  var aftnum = $('#addftnum').val();
  var newstudent = {id:aid,fname:afname,lname:alname,email:aemail,ftname:aftname,ftnum:aftnum};
  var old = JSON.parse(localStorage.getItem('studentstrial'));
  if(n==1){
    old.splice(index,1);
    $('.add').show();
    $('.edit').hide();
  }
  old.push(newstudent);
  localStorage.setItem('studentstrial',JSON.stringify(old));
  $('#addid').val("");
  $('#addfname').val("");
  $('#addlname').val('');
  $('#addemail').val('');
  $('#addftname').val('');
  $('#addftnum').val('');
   $('.fbutton').text('Submit');
  addBack();
  updatelist();
};
function studetail(n)
{
  var students = JSON.parse(localStorage.getItem('studentstrial'));
   $('.addHeading').text(students[n].fname);
  $('#addid').val(students[n].id);
  $('#addfname').val(students[n].fname);
  $('#addlname').val(students[n].lname);
  $('#addemail').val(students[n].email);
  $('#addftname').val(students[n].ftname);
  $('#addftnum').val(students[n].ftnum);
  $('.fbutton').hide();
  $('.addDiv').addClass('showaddDiv');
};
function checkstudid(){
  var students = JSON.parse(localStorage.getItem('studentstrial'));
  var sid = $('#addid').val();
  if(students.length == 0){
    addstudent();
    return;
  } else{
    for(let i=0; i<students.length; i++){
      if(students[i].id == sid){
        $('.errorId').addClass('showelement');
        console.log("error");
        return;
      }
    }
    $('.errorId').removeClass('showelement');
    addstudent();
    return;
  }
}

$('document').ready(function(){
  initial();
  updatelist();
});