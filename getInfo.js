const DB = [
  {
    p_key: 'CONFIG',
    s_key: 'main',
    data: {
      unis: [
        {
          uni: 'STG',
          urlPrefix: 'https://stg.com',
          studentUrl: 'https://{STUDENT_NUMBER}.stg.com',
          adminLink: 'https://admin-{ADMIN_NUMBER}.stg.com',
        },
        {
          uni: 'OI',
          urlPrefix: 'https://oi.com',
          studentUrl: 'https://{STUDENT_NUMBER}.oi.com',
          adminLink: 'https://admin-{ADMIN_NUMBER}.oi.com',
        },
      ],
    },
  },

  { p_key: 'STG#CONFIG', university_name: 'Staging' },
  { p_key: 'OI#CONFIG', university_name: 'Oxford international' },

  { p_key: 'STG#1000', s_key: 'STUDENT_DETAILS', data: { name: 'name - 1' } },
  { p_key: 'OI#2000', s_key: 'STUDENT_DETAILS', data: { name: 'name - 2' } },
  { p_key: 'STG#4000', s_key: 'STUDENT_DETAILS', data: { name: 'name - 4' } },
  { p_key: 'STG#5000', s_key: 'STUDENT_DETAILS', data: { name: 'name - 5' } },

  { p_key: 'STG#1000', s_key: 'FINANCE', data: { deposit: 200 } },
  { p_key: 'OI#2000', s_key: 'FINANCE', data: { deposit: 400 } },
  { p_key: 'STG#4000', s_key: 'FINANCE', data: { deposit: 700 } },
  { p_key: 'STG#5000', s_key: 'FINANCE', data: { deposit: 100 } },

  { p_key: 'OI#MANAGER', s_key: 'main', hasAccess: ['2000'] },
  { p_key: 'STG#MANAGER', s_key: 'main', hasAccess: ['4000'] },

  { p_key: 'STG#1000', s_key: 'USER#STUDENT' },
  { p_key: 'OI#2000', s_key: 'USER#STUDENT' },
  { p_key: 'ADM#STG#3000', s_key: 'USER#ADMIN' },
  { p_key: 'STG#4000', s_key: 'USER#STUDENT' },
  { p_key: 'STG#5000', s_key: 'USER#STUDENT' },
  { p_key: 'ADM#OI#6000', s_key: 'USER#ADMIN' },
];



const getAllUsersByUni = (uni) => {

  let baza = DB;
  let students = {};

  let info = baza.find((item) => {
      if(item.p_key == 'CONFIG' && item.s_key == 'main'){
          return true
      }
  });

  let unis = info.data.unis;

  let data = unis.find((item) => {
      if(item.uni == `${uni}`){
          return true
      }
 })
 
  let name = baza.find((item) => {
      if(item.p_key && item.p_key == `${uni}#CONFIG`){
          return true
      }
 })

 data.shortCode = data.uni;
 data.unis = name.university_name;
 data.uniUrl = data.urlPrefix;
 

 let stud = baza.find((item) =>{
     if(item.p_key == `${uni}#MANAGER`){
         return true
     }
 })

 students.studentsNumber = stud.hasAccess;
 students.uni = data.shortCode;
 students.studentsUrl = data.studentUrl;

 let num = students.studentsNumber;
 

  let names = baza.find((item) => {
      if(item.p_key == `${uni}#${num}` && item.s_key == 'STUDENT_DETAILS'){
          return true
      }
  })

  let depos = baza.find((item) => {
      if(item.p_key == `${uni}#${num}` && item.s_key == 'FINANCE'){
          return true
      }
  })

  students.name = names.data.name;
  students.deposit = depos.data.deposit;
  
  let w = uni;

  let a = w.toLowerCase()

  students.studentsUrl = `https://${num}.${a}.com`;

  let admins = {};


  let datas;

  baza.forEach((item) => {
      if(item.p_key == `${uni}#${num}` && item.s_key == 'USER#STUDENT'){
          if(item.p_key == `${uni}#4000` ){
              num = '3000';
              item.p_key = `${uni}#${num}`;               
              datas = item.p_key;
          }
          if(item.p_key == `${uni}#2000`){
              num = '6000';
              item.p_key = `${uni}#${num}`;
              datas = item.p_key;
          }         
      }
  })

  let user = baza.find((item) => {
      if(item.p_key == `ADM#${datas}` && item.s_key == 'USER#ADMIN'){
          return true
      }
  })


  let hash = user.p_key; 
  let find = hash.slice(0,3);

  admins.shortCode = find;
  admins.list = [];
  admins.list.id = num;
 
  data.adminLink = `https://admin-${num}.${a}.com`;
  
 
  admins.list.link = data.adminLink;

  admins.list.students = [];
  admins.list.students.studentNumber = students.studentsNumber;
  admins.list.students.studentUrl = students.studentsUrl;

  let inform = {};

  inform.uni = data.unis;
  inform.shortCode = data.shortCode;
  inform.uniUrl = data.urlPrefix;
  inform.students = students;
  inform.admins = admins;
  

  return inform
}


const stgUsers = getAllUsersByUni('STG');
console.log(stgUsers);