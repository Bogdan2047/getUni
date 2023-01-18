
  let depos = baza.find((item) => {
      if(item.p_key == `${uni}#${num}` && item.s_key == 'FINANCE'){
          return true
      }
  })