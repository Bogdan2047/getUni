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
    let info = {};
    info.students = [];
    info.admins = {};
    info.admins.list = [];
    let code;
    

    baza.forEach((item,i) => {
        if(i === 0){ 
        let obj = Object.values(item);            
            obj.forEach((item,i) => {
                if(i == 2){
                  let data = Object.values(item);  
                  data.forEach((item) =>{
                    item.forEach((value) =>{   
                        if(value.uni == 'OI'){
                          info.shortCode = value.uni;                          
                          info.uniUrl = value.urlPrefix;
                          info.students.studentUrl = value.studentUrl;
                          info.students.uni = value.uni;
                          info.admins.list.link = value.adminLink;
                        }
                    })
                  })
                }
            })
        } 

      if(item.s_key == 'USER#ADMIN'){
        if(item.p_key == 'ADM#OI#6000'){
         code = item.p_key;
        }
      }

      if(item.p_key == `${uni}#CONFIG`){
        info.uni = item.university_name;
      }
      if(item.p_key == `${uni}#MANAGER`){
        let a = item.hasAccess
        a.forEach(item =>{
          info.students.studentNumber = item;
        })   
      }
      if(item.p_key == `${uni}#2000`){

        if(item.s_key == 'STUDENT_DETAILS'){
          let b = Object.values(item);
          b.forEach((item,i) => {
            if(i == 2){
              let c = Object.values(item);
              c.forEach(i => {
                info.students.name = i;
              })
            }
          })
        }
        if(item.s_key == 'FINANCE'){
          let d = Object.values(item);
          d.forEach((item,i) => {
            if(i == 2){
              info.students.deposit = item.deposit;
            }
          })
        }
      }
    });

    let numb = info.students.studentNumber; 
    info.students.studentUrl = `https://${numb}.oi.com`;   
    

    let hash = code; 
    let adm = /ADM/;
    let find = hash.match(adm);

    let num = /6000/;
    let find2 = hash.match(num);

    find.forEach((item,i) => {
      if(i == 0){
        info.admins.shortCode = item;
      }
    })

    find2.forEach((item,i) => {
      if(i == 0){
        let id = {id:item};
        info.admins.list = id;
      }
    })

    let numb2 = info.admins.list.id;
    info.admins.list.link = `https://admin-${numb2}.oi.com`;


    info.admins.list.students = {};
  
    let arr = [info.students.studentUrl, info.students.studentNumber];
    arr.forEach((item,i) => {
        if(i == 0){
          info.admins.list.students.studentUrl = item;      
        }
        if(i == 1){
          info.admins.list.students.studentsNumber = item;       
        }
    })

return info;
}  

  const stgUsers = getAllUsersByUni('OI');
  console.log(stgUsers);