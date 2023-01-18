const { json } = require("express");

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
  let students = [];

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

 let ff = {};

 let studentsNumber = stud.hasAccess[0];
 let unik = data.shortCode;

 let num = studentsNumber;



let finance = baza.filter((item) => {
    if(item.p_key.startsWith(`${uni}#`) && item.s_key == 'FINANCE'){
     return true
    }
})


let ii = []
for (let x = 0; x < finance.length; x++) {
    let element = finance[x];
    let j = element.data.deposit;
    ii.push(j)
}


let details = baza.filter((item) => {
    if(item.p_key.startsWith(`${uni}#`) && item.s_key == 'STUDENT_DETAILS'){
     return true
    }
})

let aa = [];
for (let i = 0; i < details.length; i++) {
    let element = details[i];
    let d = element.data.name;
    aa.push(d)
}

    ff.studentNumber = studentsNumber;
    ff.uni = unik;
    ff.name = aa;
    ff.deposit = ii;
  
  let url2 = data.studentUrl;
  
  let rep2 = url2.replace(/{STUDENT_NUMBER}/,num);

ff.studentUrl = rep2;

students.push(ff)


  let admins = {};


  let filterAdmin = baza.find((item) => {
    if(item.p_key.startsWith(`ADM#${uni}`)){
        return true
    }
  })

  let hash = filterAdmin.p_key; 
  hash.split('#');
  let find = hash.split('#');


 num = find[2];

  admins.shortCode = find[0];
  let list = [];

  let gg = {};
  gg.id = find[2]; 


let url = data.adminLink;

 let rep = url.replace(/{ADMIN_NUMBER}/, num)

 gg.link = rep;
 list.push(gg)

let tw = {}

tw.studentNumber = studentsNumber;
tw.studentUrl = rep2;
list.students = [];
list.students.push(tw)

admins.list = list;

  let inform = {};

  inform.uni = data.unis;
  inform.shortCode = data.shortCode;
  inform.uniUrl = data.urlPrefix;;
  inform.students = students;
  inform.admins = admins;
  

  return inform
}


const stgUsers = getAllUsersByUni('STG');
console.log(stgUsers);