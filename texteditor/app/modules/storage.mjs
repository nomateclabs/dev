
const ls = {
  get: function(i){
    return JSON.parse(localStorage.getItem(i))
  },
  set: function(i,e){
    localStorage.setItem(i, JSON.stringify(e))
    return;
  },
  del: function(i){
    localStorage.removeItem(i);
  }
}

const ss = {
  get: function(i){
    return JSON.parse(sessionStorage.getItem(i))
  },
  set: function(i,e){
    sessionStorage.setItem(i, JSON.stringify(e))
    return;
  },
  del: function(i){
    sessionStorage.removeItem(i);
  }
}

export { ls, ss }
